import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";

const createCommentSchema = z.object({
    content: z.string().min(1, "Yorum boş olamaz"),
    orderId: z.string(),
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
            return NextResponse.json({ error: "Sipariş bulunamadı" }, { status: 404 });
        }

        const isAdmin = session.user.role === "ADMIN";
        if (!isAdmin && order.customerId !== session.user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

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
            },
        });

        // Update order to REVISION status if customer requests revision
        if (!isAdmin && order.status === "PRICED") {
            await prisma.order.update({
                where: { id: validatedData.orderId },
                data: { status: "REVISION" },
            });
        }

        // Send Email Notification
        const { sendNewCommentEmail } = await import("@/lib/mail");
        const recipientEmail = isAdmin ? order.customer.email : "admin@nakis.com";
        const senderName = session.user.name || session.user.email || "Kullanıcı";

        if (recipientEmail) {
            await sendNewCommentEmail(
                recipientEmail,
                order.title,
                senderName,
                validatedData.content
            ).catch(console.error);
        }

        return NextResponse.json(comment, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.issues?.[0]?.message || "Geçersiz veri" },
                { status: 400 }
            );
        }

        console.error("Error creating comment:", error);
        return NextResponse.json(
            { error: "Yorum eklenirken hata oluştu" },
            { status: 500 }
        );
    }
}
