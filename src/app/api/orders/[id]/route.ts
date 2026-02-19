import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { createOrderNotification } from "@/lib/notifications";

const updateOrderSchema = z.object({
    status: z.enum(["ORDERED", "IN_PROGRESS", "PRICED", "REVISION", "COMPLETED", "DELIVERED", "CANCELLED"]).optional(),
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

        const isNewDigitizingOrder = currentOrder.serviceType === "New Digitizing + Sample";

        // NEW WORKFLOW: Status update rules
        if (validatedData.status && validatedData.status !== currentOrder.status) {
            // Closed state guard
            if (currentOrder.status === "CANCELLED") {
                return NextResponse.json(
                    { error: "Cancelled orders cannot be updated to a different status." },
                    { status: 400 }
                );
            }

            // PRICED status is only valid for New Digitizing workflow
            if (validatedData.status === "PRICED" && !isNewDigitizingOrder) {
                return NextResponse.json(
                    { error: "PRICED status is only allowed for New Digitizing + Sample orders." },
                    { status: 400 }
                );
            }
            if (validatedData.status === "REVISION" && !isNewDigitizingOrder) {
                return NextResponse.json(
                    { error: "REVISION status is only allowed for New Digitizing + Sample orders." },
                    { status: 400 }
                );
            }

            // Customer can cancel only from ORDERED or PRICED (price rejection flow)
            if (
                validatedData.status === "CANCELLED" &&
                !["ORDERED", "PRICED"].includes(currentOrder.status)
            ) {
                return NextResponse.json(
                    { error: `Order can only be cancelled from ORDERED or PRICED status. Current status: ${currentOrder.status}` },
                    { status: 400 }
                );
            }

            if (isAdmin) {
                // Admin-side transitions for the new workflow
                const from = currentOrder.status;
                const to = validatedData.status;
                const isAllowedAdminTransition =
                    (from === "ORDERED" && to === "IN_PROGRESS") ||
                    (from === "ORDERED" && to === "CANCELLED") ||
                    (from === "IN_PROGRESS" && to === "PRICED" && isNewDigitizingOrder) ||
                    (from === "PRICED" && to === "IN_PROGRESS" && isNewDigitizingOrder) ||
                    (from === "PRICED" && to === "CANCELLED" && isNewDigitizingOrder) ||
                    (from === "IN_PROGRESS" && to === "COMPLETED") ||
                    (from === "REVISION" && to === "IN_PROGRESS" && isNewDigitizingOrder) ||
                    (from === "COMPLETED" && to === "DELIVERED");

                if (!isAllowedAdminTransition) {
                    return NextResponse.json(
                        { error: `Invalid admin status transition: ${from} -> ${to}` },
                        { status: 400 }
                    );
                }
            }

            if (!isAdmin) {
                // Check if user owns the order
                if (currentOrder.customerId !== session.user.id) {
                    console.error(`[PATCH_ORDER] 403 OWNERSHIP MISMATCH! Owner=${currentOrder.customerId}, User=${session.user.id}`);
                    return NextResponse.json({ error: "Unauthorized: Order belongs to another user." }, { status: 403 });
                }

                // Customer allowed transitions:
                // 1. ORDERED -> CANCELLED (cancel before work starts)
                // 2. PRICED -> IN_PROGRESS (accept quote, only for "New Digitizing + Sample")
                // 3. PRICED -> CANCELLED (reject quote, only for "New Digitizing + Sample")
                // 4. IN_PROGRESS -> REVISION (only for "New Digitizing + Sample")
                const isCancelling = currentOrder.status === "ORDERED" && validatedData.status === "CANCELLED";
                const isRejectingQuote = currentOrder.status === "PRICED" && validatedData.status === "CANCELLED"
                    && isNewDigitizingOrder;
                const isAcceptingQuote = currentOrder.status === "PRICED" && validatedData.status === "IN_PROGRESS"
                    && isNewDigitizingOrder;
                const isRequestingRevision = currentOrder.status === "IN_PROGRESS" && validatedData.status === "REVISION"
                    && isNewDigitizingOrder;

                console.log(`[PATCH_ORDER] isCancelling=${isCancelling}, isRejectingQuote=${isRejectingQuote}, isAcceptingQuote=${isAcceptingQuote}, isRequestingRevision=${isRequestingRevision}`);
                console.log(`[PATCH_ORDER] currentOrder.status="${currentOrder.status}", validatedData.status="${validatedData.status}", serviceType="${currentOrder.serviceType}"`);

                if (!isCancelling && !isRejectingQuote && !isAcceptingQuote && !isRequestingRevision) {
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

        console.log(`[PATCH_ORDER] Final data to update:`, JSON.stringify(finalData));

        const order = await prisma.order.update({
            where: { id },
            data: finalData,
            include: {
                customer: {
                    select: { email: true, name: true, language: true }
                }
            }
        });

        // If status changed, create a system message
        if (validatedData.status && validatedData.status !== currentOrder.status) {
            const statusLabels: Record<string, { en: string; tr: string }> = {
                ORDERED: { en: "Order Received", tr: "Sipariş Alındı" },
                IN_PROGRESS: { en: "In Progress", tr: "Sipariş Hazırlanıyor" },
                PRICED: { en: "Priced", tr: "Fiyatlandırıldı" },
                REVISION: { en: "Revision Requested", tr: "Revizyon İstendi" },
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
        // Send email notification to customer & admin
        if (order.customer.email && validatedData.status) {
            const mail = await import("@/lib/mail");
            const userLocale = order.customer.language === "tr" ? "tr" : "en";
            const orderTitle = order.title || `Order #${order.id.slice(-6).toUpperCase()}`;

            switch (validatedData.status) {
                case "CANCELLED":
                    await mail.sendOrderCancelledEmail(order.customer.email, orderTitle, userLocale).catch(console.error);
                    await mail.sendOrderCancelledEmail("admin@nakis.com", orderTitle, userLocale, true).catch(console.error);
                    break;
                case "IN_PROGRESS":
                    await mail.sendOrderInProgressEmail(order.customer.email, orderTitle, userLocale).catch(console.error);
                    break;
                case "REVISION":
                    await mail.sendOrderRevisionEmail(order.customer.email, orderTitle, userLocale).catch(console.error);
                    await mail.sendOrderRevisionEmail("admin@nakis.com", orderTitle, userLocale, true).catch(console.error);
                    break;
                case "COMPLETED":
                    await mail.sendOrderCompletedEmail(order.customer.email, orderTitle, userLocale).catch(console.error);
                    await mail.sendOrderCompletedEmail("admin@nakis.com", orderTitle, userLocale, true).catch(console.error);
                    break;
                case "DELIVERED":
                    await mail.sendOrderDeliveredEmail(order.customer.email, orderTitle, userLocale).catch(console.error);
                    break;
            }
        }

        // Create In-App Notification
        if (validatedData.status && validatedData.status !== currentOrder.status) {
            const statusLabels: Record<string, { en: string; tr: string }> = {
                ORDERED: { en: "Order Received", tr: "Sipariş Alındı" },
                IN_PROGRESS: { en: "In Progress", tr: "Sipariş Hazırlanıyor" },
                PRICED: { en: "Priced", tr: "Fiyatlandırıldı" },
                REVISION: { en: "Revision Requested", tr: "Revizyon İstendi" },
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
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const { id } = await params;
        const { searchParams } = new URL(request.url);
        const deleteFiles = searchParams.get("deleteFiles") === "true";

        // Get order and its files
        const order = await prisma.order.findUnique({
            where: { id },
            include: { files: true }
        });

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        if (deleteFiles && order.files.length > 0) {
            const { DeleteObjectCommand } = await import("@aws-sdk/client-s3");
            const { s3Client, R2_BUCKET_NAME } = await import("@/lib/s3");
            const { unlink, rmdir } = await import("fs/promises");
            const { existsSync } = await import("fs");
            const { join } = await import("path");

            for (const file of order.files) {
                // 1. Delete from R2
                try {
                    await s3Client.send(new DeleteObjectCommand({
                        Bucket: R2_BUCKET_NAME,
                        Key: file.url,
                    }));
                } catch (s3Error) {
                    console.error(`Error deleting file ${file.id} from S3:`, s3Error);
                }

                // 2. Delete from Local Disk
                const urlPath = file.url;
                const filename = urlPath.includes("/") ? urlPath.split("/").pop() || "" : urlPath;
                const securePath = join(process.cwd(), "uploads", file.orderId, file.type, filename);
                const publicPath = join(process.cwd(), "public", urlPath);
                const oldPublicPath = join(process.cwd(), "public", "uploads", file.orderId, file.type, filename);

                if (existsSync(securePath)) await unlink(securePath).catch(() => { });
                if (existsSync(publicPath)) await unlink(publicPath).catch(() => { });
                if (existsSync(oldPublicPath)) await unlink(oldPublicPath).catch(() => { });
            }

            // Cleaning up empty local directories
            const orderUploadsDir = join(process.cwd(), "uploads", order.id);
            if (existsSync(orderUploadsDir)) {
                await rmdir(orderUploadsDir, { recursive: true }).catch(() => { });
            }
        }

        // Delete from database (onDelete: Cascade in schema should handle related comments, wilcomData, and files)
        await prisma.order.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting order:", error);
        return NextResponse.json(
            { error: "Failed to delete order" },
            { status: 500 }
        );
    }
}
