import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";

const createOrderSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    machineBrand: z.string().optional(),
    serviceType: z.string().optional(),
    productType: z.string().optional(),
    garmentType: z.string().optional(),
    isNotSure: z.boolean().default(false),
    customProduct: z.string().optional(),
    addKnockdownStitch: z.boolean().default(false),
    priority: z.enum(["NORMAL", "URGENT"]).default("NORMAL"),
});

export async function GET() {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const isAdmin = session.user.role === "ADMIN";
        const where = isAdmin ? {} : { customerId: session.user.id };

        const orders = await prisma.order.findMany({
            where,
            include: {
                customer: {
                    select: { id: true, name: true, email: true },
                },
                _count: {
                    select: { files: true, comments: true },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json(
            { error: "Siparişler alınırken hata oluştu" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const validatedData = createOrderSchema.parse(body);

        // Calculate estimated delivery (default 24-48h, but let's say 48h for safety)
        const estimatedDelivery = new Date();
        estimatedDelivery.setHours(estimatedDelivery.getHours() + 48);

        let order = await prisma.order.create({
            data: {
                title: validatedData.title || "Yeni Sipariş",
                description: validatedData.description,
                machineBrand: validatedData.machineBrand,
                serviceType: validatedData.serviceType,
                productType: validatedData.productType,
                garmentType: validatedData.garmentType,
                isNotSure: validatedData.isNotSure,
                customProduct: validatedData.customProduct,
                addKnockdownStitch: validatedData.addKnockdownStitch,
                priority: validatedData.priority,
                estimatedDelivery: estimatedDelivery,
                customerId: session.user.id,
                status: "WAITING_PRICE",
            },
        });

        // If title was not provided, use the Order ID as title
        if (!validatedData.title) {
            order = await prisma.order.update({
                where: { id: order.id },
                data: { title: `Order #${order.id.slice(-6).toUpperCase()}` } // Shortened ID for better UX
            });
        }

        const projectTitle = order.title || "Yeni Sipariş";

        // Send email notifications
        if (session.user.email) {
            const { sendOrderCreatedEmail } = await import("@/lib/mail");

            // Notify Customer
            await sendOrderCreatedEmail(
                session.user.email,
                projectTitle
            ).catch((err) => console.error("Failed to send customer email:", err));

            // Notify Admin
            await sendOrderCreatedEmail(
                "admin@nakis.com",
                `YENİ SİPARİŞ: ${projectTitle}`
            ).catch((err) => console.error("Failed to send admin email:", err));
        }

        // Create In-App Notification for Admins
        const { createOrderNotification } = await import("@/lib/notifications");
        const admins = await prisma.user.findMany({ where: { role: "ADMIN" } });
        for (const admin of admins) {
            await createOrderNotification(
                admin.id,
                "New Order | Yeni Sipariş",
                `${session.user.name || session.user.email} placed a new order: ${projectTitle}`,
                `/orders/${order.id}`
            );
        }

        return NextResponse.json(order, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.issues[0].message },
                { status: 400 }
            );
        }

        console.error("Error creating order:", error);
        return NextResponse.json(
            { error: "Sipariş oluşturulurken hata oluştu" },
            { status: 500 }
        );
    }
}
