import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { sanitizeString } from "@/lib/sanitize";

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

export async function GET(request: Request) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "50");
        const status = searchParams.get("status");
        const priority = searchParams.get("priority");

        const isAdmin = session.user.role === "ADMIN";
        const where: Record<string, unknown> = isAdmin ? {} : { customerId: session.user.id };

        // Add optional filters
        if (status) where.status = status;
        if (priority) where.priority = priority;

        // Get total count for pagination
        const total = await prisma.order.count({ where });

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
            skip: (page - 1) * limit,
            take: limit,
        });

        return NextResponse.json({
            orders,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                hasMore: page * limit < total,
            }
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json(
            { error: "An error occurred while fetching orders" },
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

        // Sanitize user inputs
        const sanitizedTitle = validatedData.title ? sanitizeString(validatedData.title) : undefined;
        const sanitizedDescription = validatedData.description ? sanitizeString(validatedData.description) : undefined;
        const sanitizedCustomProduct = validatedData.customProduct ? sanitizeString(validatedData.customProduct) : undefined;

        // Calculate estimated delivery (default 24-48h, but let's say 48h for safety)
        const estimatedDelivery = new Date();
        estimatedDelivery.setHours(estimatedDelivery.getHours() + 48);

        // Determine price based on service type (fixed prices)
        const SERVICE_PRICES: Record<string, number> = {
            "Approval Sample (Existing DST)": 25,
            "Fix Your DST + Sample": 35,
            "New Digitizing + Sample": 60,
        };
        const orderPrice = SERVICE_PRICES[validatedData.serviceType || ""] || 25;

        let order = await prisma.order.create({
            data: {
                title: sanitizedTitle || "Yeni Sipariş",
                description: sanitizedDescription,
                machineBrand: validatedData.machineBrand,
                serviceType: validatedData.serviceType,
                productType: validatedData.productType,
                garmentType: validatedData.garmentType,
                isNotSure: validatedData.isNotSure,
                customProduct: sanitizedCustomProduct,
                addKnockdownStitch: validatedData.addKnockdownStitch,
                priority: validatedData.priority,
                estimatedDelivery: estimatedDelivery,
                customerId: session.user.id,
                status: "ORDERED", // Yeni akış: Sipariş alındı
                price: orderPrice,
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
                { error: `Validation error: ${error.issues[0].message}` },
                { status: 400 }
            );
        }

        console.error("Order creation core error:", error);
        return NextResponse.json(
            { error: "Order creation failed [v2]. Please check your data." },
            { status: 500 }
        );
    }
}
