import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { createCommentNotification } from "@/lib/notifications";

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
                content: validatedData.content,
                orderId: validatedData.orderId,
                userId: session.user.id,
            },
            include: {
                user: {
                    select: { id: true, name: true, email: true, role: true },
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

            // Refetch comment with files
            const updatedComment = await prisma.comment.findUnique({
                where: { id: comment.id },
                include: {
                    user: {
                        select: { id: true, name: true, email: true, role: true },
                    },
                    files: {
                        select: { id: true, name: true, url: true, size: true },
                    },
                },
            });

            if (updatedComment) {
                // Send Email Notification
                const { sendNewCommentEmail } = await import("@/lib/mail");
                const recipientEmail = isAdmin ? order.customer.email : "admin@nakis.com";
                const senderName = session.user.name || session.user.email || "User";

                if (recipientEmail) {
                    await sendNewCommentEmail(
                        recipientEmail,
                        order.title || `Order #${order.id.slice(-6).toUpperCase()}`,
                        senderName,
                        validatedData.content
                    ).catch(console.error);
                }

                // Create In-App Notification
                if (isAdmin) {
                    await createCommentNotification(
                        order.customerId,
                        "New Message | Yeni Mesaj",
                        `${senderName}: ${validatedData.content}`,
                        `/orders/${order.id}`
                    );
                } else {
                    const admins = await prisma.user.findMany({ where: { role: "ADMIN" } });
                    for (const admin of admins) {
                        await createCommentNotification(
                            admin.id,
                            "New Message | Yeni Mesaj",
                            `${senderName}: ${validatedData.content}`,
                            `/admin/orders/${order.id}`
                        );
                    }
                }

                return NextResponse.json({
                    ...updatedComment,
                    attachments: updatedComment.files.map((file: { id: string; name: string; url: string; size: number | null }) => ({
                        ...file,
                        url: `/api/files/${file.id}`,
                    })),
                }, { status: 201 });
            }
        }

        // Send Email Notification
        const { sendNewCommentEmail } = await import("@/lib/mail");
        const recipientEmail = isAdmin ? order.customer.email : "admin@nakis.com";
        const senderName = session.user.name || session.user.email || "User";

        if (recipientEmail) {
            await sendNewCommentEmail(
                recipientEmail,
                order.title || `Order #${order.id.slice(-6).toUpperCase()}`,
                senderName,
                validatedData.content
            ).catch(console.error);
        }

        // Create In-App Notification
        if (isAdmin) {
            await createCommentNotification(
                order.customerId,
                "New Message | Yeni Mesaj",
                `${senderName}: ${validatedData.content}`,
                `/orders/${order.id}`
            );
        } else {
            const admins = await prisma.user.findMany({ where: { role: "ADMIN" } });
            for (const admin of admins) {
                await createCommentNotification(
                    admin.id,
                    "New Message | Yeni Mesaj",
                    `${senderName}: ${validatedData.content}`,
                    `/admin/orders/${order.id}`
                );
            }
        }

        return NextResponse.json({
            ...comment,
            attachments: comment.files.map((file: { id: string; name: string; url: string; size: number | null }) => ({
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
