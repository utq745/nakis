import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { createCommentNotification } from "@/lib/notifications";
import { sanitizeString } from "@/lib/sanitize";

const createCommentSchema = z.object({
    content: z.string().min(1, "Comment cannot be empty"),
    orderId: z.string(),
    fileIds: z.array(z.string()).optional(),
});

export async function POST(request: Request) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const validatedData = createCommentSchema.parse(body);

        // Sanitize comment content
        const sanitizedContent = sanitizeString(validatedData.content);

        // Check order access
        const order = await prisma.order.findUnique({
            where: { id: validatedData.orderId },
            include: {
                customer: {
                    select: { email: true }
                }
            }
        });

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        const isAdmin = session.user.role === "ADMIN";
        if (!isAdmin && order.customerId !== session.user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        // Create comment
        const comment = await prisma.comment.create({
            data: {
                content: sanitizedContent,
                orderId: validatedData.orderId,
                userId: session.user.id,
            },
            include: {
                user: {
                    select: { id: true, name: true, email: true, role: true, image: true },
                },
                files: {
                    select: { id: true, name: true, url: true, size: true },
                },
            },
        });

        // Link files to comment if any
        if (validatedData.fileIds && validatedData.fileIds.length > 0) {
            await prisma.file.updateMany({
                where: {
                    id: { in: validatedData.fileIds },
                    orderId: validatedData.orderId,
                },
                data: {
                    commentId: comment.id,
                    type: "comment",
                },
            });
        }

        // Notification logic
        const { sendNewCommentEmail } = await import("@/lib/mail");
        const senderName = session.user.name || session.user.email || "User";
        const orderSubtitle = order.title || `Order #${order.id.slice(-6).toUpperCase()}`;

        if (isAdmin) {
            // Admin commented -> Notify customer
            if (order.customer.email) {
                // We need to fetch customer language if not in include.
                const customer = await prisma.user.findUnique({ where: { id: order.customerId }, select: { language: true } });
                const customerLocale = customer?.language === "tr" ? "tr" : "en";
                await sendNewCommentEmail(
                    order.customer.email,
                    orderSubtitle,
                    senderName,
                    validatedData.content,
                    customerLocale
                ).catch(console.error);

                await createCommentNotification(
                    order.customerId,
                    "New Message | Yeni Mesaj",
                    `${senderName}: ${validatedData.content}`,
                    `/orders/${order.id}`
                );
            }
        } else {
            // Customer commented -> Notify all admins
            const admins = await prisma.user.findMany({ where: { role: "ADMIN" } });
            for (const admin of admins) {
                if (admin.email) {
                    const adminLocale = admin.language === "tr" ? "tr" : "en";
                    await sendNewCommentEmail(
                        admin.email,
                        orderSubtitle,
                        senderName,
                        validatedData.content,
                        adminLocale
                    ).catch(console.error);
                }
                await createCommentNotification(
                    admin.id,
                    "New Message | Yeni Mesaj",
                    `${senderName}: ${validatedData.content}`,
                    `/orders/${order.id}`
                );
            }
        }

        // Return comment with attachments
        const finalComment = await prisma.comment.findUnique({
            where: { id: comment.id },
            include: {
                user: { select: { id: true, name: true, email: true, role: true, image: true } },
                files: { select: { id: true, name: true, url: true, size: true } },
            },
        });

        if (!finalComment) throw new Error("Comment created but could not be refetched");

        return NextResponse.json({
            ...finalComment,
            attachments: finalComment.files.map((file) => ({
                ...file,
                url: `/api/files/${file.id}`,
            })),
        }, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.issues?.[0]?.message || "Invalid data" },
                { status: 400 }
            );
        }

        console.error("Error creating comment:", error);
        return NextResponse.json(
            { error: "Failed to add comment" },
            { status: 500 }
        );
    }
}
