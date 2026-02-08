import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { createOrderNotification } from "@/lib/notifications";

const updateOrderSchema = z.object({
    status: z.enum(["ORDERED", "PRICED", "APPROVAL_AWAITING", "REVISION", "IN_PROGRESS", "PAYMENT_PENDING", "COMPLETED", "DELIVERED", "CANCELLED"]).optional(),
    price: z.number().nonnegative().nullable().optional(),
    hidden: z.boolean().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    machineBrand: z.string().optional(),
    serviceType: z.string().optional(),
    productType: z.string().optional(),
    garmentType: z.string().optional(),
    isNotSure: z.boolean().optional(),
    customProduct: z.string().optional(),
    addKnockdownStitch: z.boolean().optional(),
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
                    select: { id: true, name: true, email: true, role: true, image: true },
                },
                files: {
                    orderBy: { createdAt: "desc" },
                },
                comments: {
                    include: {
                        user: {
                            select: { id: true, name: true, email: true, role: true, image: true },
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
            files: order.files.map((file: any) => ({
                ...file,
                url: `/api/files/${file.id}`,
            })),
            comments: order.comments.map((comment: any) => ({
                ...comment,
                attachments: comment.files.map((file: any) => ({
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

        console.log(`[PATCH_ORDER] User: ${session.user.email} (ID: ${session.user.id}, Role: ${session.user.role})`);
        console.log(`[PATCH_ORDER] Order: ${id}`);
        console.log(`[PATCH_ORDER] Data:`, JSON.stringify(validatedData));

        // Get current order to check if status changed and check permissions
        const currentOrder = await prisma.order.findUnique({
            where: { id },
            select: { status: true, price: true, customerId: true, serviceType: true }
        });

        if (!currentOrder) {
            console.error(`[PATCH_ORDER] Order not found: ${id}`);
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        console.log(`[PATCH_ORDER] Current Status: ${currentOrder.status}, OwnerID: ${currentOrder.customerId}`);

        // Only admin can update price
        if (!isAdmin && (validatedData.price !== undefined || validatedData.hidden !== undefined)) {
            console.error(`[PATCH_ORDER] 403: Customer ${session.user.email} tried to update restricted fields`);
            return NextResponse.json({ error: "Only admins can update price or visibility" }, { status: 403 });
        }

        // NEW WORKFLOW: Status update rules
        if (validatedData.status && validatedData.status !== currentOrder.status) {
            if (!isAdmin) {
                // Check if user owns the order
                if (currentOrder.customerId !== session.user.id) {
                    console.error(`[PATCH_ORDER] 403 OWNERSHIP MISMATCH! Owner=${currentOrder.customerId}, User=${session.user.id}`);
                    return NextResponse.json({ error: "Unauthorized: Order belongs to another user." }, { status: 403 });
                }

                // Customer allowed transitions:
                // 1. APPROVAL_AWAITING -> IN_PROGRESS (approve preview)
                // 2. APPROVAL_AWAITING -> REVISION (request revision)
                // 3. ORDERED -> CANCELLED (cancel before work starts)
                // 4. PRICED -> IN_PROGRESS (accept quote)
                // 5. PRICED -> CANCELLED (decline quote)
                // 6. PAYMENT_PENDING -> COMPLETED (complete payment)
                const isApprovingPreview = currentOrder.status === "APPROVAL_AWAITING" && validatedData.status === "IN_PROGRESS";
                const isRequestingRevision = currentOrder.status === "APPROVAL_AWAITING" && validatedData.status === "REVISION";
                const isCancelling = validatedData.status === "CANCELLED" && (currentOrder.status === "ORDERED" || currentOrder.status === "PRICED");
                const isAcceptingQuote = currentOrder.status === "PRICED" && validatedData.status === "IN_PROGRESS";
                const isCompletingPayment = currentOrder.status === "PAYMENT_PENDING" && validatedData.status === "COMPLETED";

                console.log(`[PATCH_ORDER] isApprovingPreview=${isApprovingPreview}, isRequestingRevision=${isRequestingRevision}, isCancelling=${isCancelling}, isAcceptingQuote=${isAcceptingQuote}, isCompletingPayment=${isCompletingPayment}`);
                console.log(`[PATCH_ORDER] currentOrder.status="${currentOrder.status}", validatedData.status="${validatedData.status}"`);

                if (!isApprovingPreview && !isRequestingRevision && !isCancelling && !isAcceptingQuote && !isCompletingPayment) {
                    console.error(`[PATCH_ORDER] 403 INVALID TRANSITION: ${currentOrder.status} -> ${validatedData.status}`);
                    return NextResponse.json({ error: `Forbidden status change: ${currentOrder.status} to ${validatedData.status}` }, { status: 403 });
                }
            }
        } else if (!isAdmin && Object.keys(validatedData).length > 0) {
            // No status change but other updates attempted by non-admin
            console.log(`[PATCH_ORDER] Simple update by customer. Checking ownership...`);
            if (currentOrder.customerId !== session.user.id) {
                console.error(`[PATCH_ORDER] 403 OWNERSHIP MISMATCH (non-status): Owner=${currentOrder.customerId}, User=${session.user.id}`);
                return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
            }
        }

        // Handle cancelledAt timestamp
        const finalData: any = { ...validatedData };
        if (validatedData.status === "CANCELLED" && currentOrder.status !== "CANCELLED") {
            finalData.cancelledAt = new Date();
        } else if (validatedData.status && validatedData.status !== "CANCELLED" && currentOrder.status === "CANCELLED") {
            finalData.cancelledAt = null;
        }

        // Add revision fee for Package 1 (Approval Sample) - $10 extra per revision
        if (validatedData.status === "REVISION" &&
            currentOrder.status === "APPROVAL_AWAITING" &&
            currentOrder.serviceType === "Approval Sample (Existing DST)" &&
            currentOrder.price) {
            finalData.price = currentOrder.price + 10;
            console.log(`[PATCH_ORDER] Revision fee added: $${currentOrder.price} + $10 = $${finalData.price}`);
        }

        console.log(`[PATCH_ORDER] Final data to update:`, JSON.stringify(finalData));

        const order = await prisma.order.update({
            where: { id },
            data: finalData,
            include: {
                customer: {
                    select: { email: true, name: true }
                }
            }
        });

        // If status changed, create a system message
        if (validatedData.status && validatedData.status !== currentOrder.status) {
            const statusLabels: Record<string, { en: string; tr: string }> = {
                ORDERED: { en: "Order Received", tr: "Sipariş Alındı" },
                PRICED: { en: "Quote Sent", tr: "Fiyat Teklifi Gönderildi" },
                APPROVAL_AWAITING: { en: "Awaiting Preview Approval", tr: "Önizleme Onayı Bekleniyor" },
                REVISION: { en: "Revision Requested", tr: "Revizyon İstendi" },
                IN_PROGRESS: { en: "In Progress", tr: "Sipariş Hazırlanıyor" },
                PAYMENT_PENDING: { en: "Payment Pending", tr: "Ödeme Bekleniyor" },
                COMPLETED: { en: "Completed", tr: "Tamamlandı" },
                DELIVERED: { en: "Delivered", tr: "Teslim Edildi" },
                CANCELLED: { en: "Cancelled", tr: "İptal Edildi" },
            };

            const newStatusLabel = statusLabels[validatedData.status] || { en: validatedData.status, tr: validatedData.status };

            // Create bilingual system message
            const systemMessageContent = `Order Status Changed: ${newStatusLabel.en} | Sipariş Durumu Değişti: ${newStatusLabel.tr}`;

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
                order.title || `Order #${order.id.slice(-6).toUpperCase()}`,
                order.status,
                validatedData.price ?? undefined
            ).catch(console.error);
        }

        // Create In-App Notification
        if (validatedData.status && validatedData.status !== currentOrder.status) {
            const statusLabels: Record<string, { en: string; tr: string }> = {
                ORDERED: { en: "Order Received", tr: "Sipariş Alındı" },
                PRICED: { en: "Quote Sent", tr: "Fiyat Teklifi Gönderildi" },
                APPROVAL_AWAITING: { en: "Awaiting Preview Approval", tr: "Önizleme Onayı Bekleniyor" },
                REVISION: { en: "Revision Requested", tr: "Revizyon İstendi" },
                IN_PROGRESS: { en: "In Progress", tr: "Sipariş Hazırlanıyor" },
                PAYMENT_PENDING: { en: "Payment Pending", tr: "Ödeme Bekleniyor" },
                COMPLETED: { en: "Completed", tr: "Tamamlandı" },
                DELIVERED: { en: "Delivered", tr: "Teslim Edildi" },
                CANCELLED: { en: "Cancelled", tr: "İptal Edildi" },
            };
            const newStatusLabel = statusLabels[validatedData.status] || { en: validatedData.status, tr: validatedData.status };

            if (isAdmin) {
                // Notify Customer
                await createOrderNotification(
                    order.customerId,
                    "Order Update | Sipariş Güncellemesi",
                    `Order status changed to: ${newStatusLabel.en} | Sipariş durumu değişti: ${newStatusLabel.tr}`,
                    `/orders/${id}`
                );
            } else {
                // User is customer, notify Admins
                const admins = await prisma.user.findMany({ where: { role: "ADMIN" } });
                for (const admin of admins) {
                    await createOrderNotification(
                        admin.id,
                        "Order Update | Sipariş Güncellemesi",
                        `Customer ${order.customer.name || order.customer.email} updated order to ${newStatusLabel.en}`,
                        `/orders/${id}`
                    );
                }
            }
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
