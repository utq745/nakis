import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";

const updateOrderSchema = z.object({
    status: z.enum(["PENDING", "PRICED", "IN_PROGRESS", "REVISION", "PAYMENT_PENDING", "COMPLETED", "CANCELLED"]).optional(),
    price: z.number().nonnegative().nullable().optional(),
    hidden: z.boolean().optional(),
});

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;

        const order = await prisma.order.findUnique({
            where: { id },
            include: {
                customer: {
                    select: { id: true, name: true, email: true, role: true },
                },
                files: {
                    orderBy: { createdAt: "desc" },
                },
                comments: {
                    include: {
                        user: {
                            select: { id: true, name: true, email: true, role: true },
                        },
                        files: {
                            select: { id: true, name: true, url: true, size: true },
                        },
                    },
                    orderBy: { createdAt: "asc" },
                },
            },
        });

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        // Check access
        const isAdmin = session.user.role === "ADMIN";
        if (!isAdmin && order.customerId !== session.user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        // Transform file URLs in comments to use API endpoint
        const transformedOrder = {
            ...order,
            files: order.files.map(file => ({
                ...file,
                url: `/api/files/${file.id}`,
            })),
            comments: order.comments.map(comment => ({
                ...comment,
                attachments: comment.files.map(file => ({
                    ...file,
                    url: `/api/files/${file.id}`,
                })),
            })),
        };

        return NextResponse.json(transformedOrder);
    } catch (error) {
        console.error("Error fetching order:", error);
        return NextResponse.json(
            { error: "Failed to fetch order" },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();
        const validatedData = updateOrderSchema.parse(body);

        // Check if user is customer or admin
        const isAdmin = session.user.role === "ADMIN";

        // Get current order to check if status changed and check permissions
        const currentOrder = await prisma.order.findUnique({
            where: { id },
            select: { status: true, price: true, customerId: true }
        });

        if (!currentOrder) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        // Only admin can update price
        if (!isAdmin && (validatedData.price !== undefined || validatedData.hidden !== undefined)) {
            return NextResponse.json({ error: "Only admins can update price or visibility" }, { status: 403 });
        }

        // Status update rules:
        if (validatedData.status && validatedData.status !== currentOrder.status) {
            if (!isAdmin) {
                // Customer can ONLY transition from PRICED to IN_PROGRESS (Approval)
                const isAcceptingPrice = currentOrder.status === "PRICED" && validatedData.status === "IN_PROGRESS";

                if (currentOrder.customerId !== session.user.id) {
                    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
                }

                if (!isAcceptingPrice) {
                    return NextResponse.json({ error: "You can only approve a priced order." }, { status: 403 });
                }
            }
        } else if (!isAdmin && Object.keys(validatedData).length > 0) {
            // No status change but other updates attempted by non-admin
            if (currentOrder.customerId !== session.user.id) {
                return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
            }
        }
        // Auto-set status to PRICED when price is entered and current status is PENDING
        // Only if user didn't manually change the status (status is same as current)
        if (validatedData.price && validatedData.price > 0 &&
            currentOrder.status === "PENDING" &&
            (!validatedData.status || validatedData.status === "PENDING")) {
            validatedData.status = "PRICED";
        }

        const order = await prisma.order.update({
            where: { id },
            data: validatedData,
            include: {
                customer: {
                    select: { email: true, name: true }
                }
            }
        });

        // If status changed, create a system message
        if (validatedData.status && validatedData.status !== currentOrder.status) {
            const statusLabels: Record<string, { en: string; tr: string }> = {
                PENDING: { en: "Pending", tr: "Beklemede" },
                PRICED: { en: "Priced", tr: "Fiyatlandırıldı" },
                IN_PROGRESS: { en: "In Progress", tr: "İşleniyor" },
                REVISION: { en: "Revision", tr: "Revizyon" },
                PAYMENT_PENDING: { en: "Payment Pending", tr: "Ödeme Bekleniyor" },
                COMPLETED: { en: "Completed", tr: "Tamamlandı" },
                CANCELLED: { en: "Cancelled", tr: "İptal Edildi" },
            };

            const newStatusLabel = statusLabels[validatedData.status] || { en: validatedData.status, tr: validatedData.status };

            // Create bilingual system message
            const systemMessageContent = `📋 Order Status Changed: ${newStatusLabel.en} | Sipariş Durumu Değişti: ${newStatusLabel.tr}`;

            await prisma.comment.create({
                data: {
                    content: systemMessageContent,
                    orderId: id,
                    userId: session.user.id,
                    isSystem: true,
                },
            });
        }

        // Send email notification to customer
        if (order.customer.email && (validatedData.status || validatedData.price)) {
            const { sendOrderStatusUpdatedEmail } = await import("@/lib/mail");
            await sendOrderStatusUpdatedEmail(
                order.customer.email,
                order.title,
                order.status,
                validatedData.price ?? undefined
            ).catch(console.error);
        }

        return NextResponse.json(order);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.issues[0].message },
                { status: 400 }
            );
        }

        console.error("Error updating order:", error);
        return NextResponse.json(
            { error: "Failed to update order" },
            { status: 500 }
        );
    }
}
