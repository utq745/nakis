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
    designWidth: z.number().positive().optional(),
    designHeight: z.number().positive().optional(),
    designUnit: z.enum(["mm", "inch"]).optional(),
    capType: z.enum(["Constructed", "Unconstructed"]).optional(),
    capPlacement: z.enum(["Front", "Side", "Back"]).optional(),
    productType: z.string().optional(),
    garmentType: z.string().optional(),
    isNotSure: z.boolean().default(false),
    customProduct: z.string().optional(),
    addKnockdownStitch: z.boolean().default(false),
    priority: z.enum(["NORMAL", "URGENT"]).default("NORMAL"),
}).superRefine((data, ctx) => {
    if (data.serviceType !== "New Digitizing + Sample") return;

    const hasWidth = typeof data.designWidth === "number" && data.designWidth > 0;
    const hasHeight = typeof data.designHeight === "number" && data.designHeight > 0;

    if (!hasWidth && !hasHeight) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "For New Digitizing + Sample, provide at least one valid size (width or height).",
            path: ["designWidth"],
        });
    }
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
        const sizeParts: string[] = [];
        if (validatedData.designWidth) sizeParts.push(`W:${validatedData.designWidth}`);
        if (validatedData.designHeight) sizeParts.push(`H:${validatedData.designHeight}`);
        const sizeLine = sizeParts.length > 0 && validatedData.designUnit
            ? `Design Size: ${sizeParts.join(" ")} ${validatedData.designUnit}`
            : undefined;
        const capLine = validatedData.capType && validatedData.capPlacement
            ? `Cap Details: ${validatedData.capType}, ${validatedData.capPlacement}`
            : undefined;
        const combinedDescription = [sizeLine, capLine, sanitizedDescription].filter(Boolean).join("\n\n") || undefined;

        // Calculate estimated delivery (default 24-48h, but let's say 48h for safety)
        const estimatedDelivery = new Date();
        estimatedDelivery.setHours(estimatedDelivery.getHours() + 48);

        // Determine price based on service type (fixed prices)
        const SERVICE_PRICES: Record<string, number> = {
            "Approval Sample (Existing DST)": 25,
            "Fix Your DST + Sample": 35,
            "New Digitizing + Sample": 0, // Package 3: Price will be determined by Admin
        };
        const orderPrice = SERVICE_PRICES[validatedData.serviceType || ""] || 0;

        let order = await prisma.order.create({
            data: {
                title: sanitizedTitle || "Yeni Sipariş",
                machineBrand: validatedData.machineBrand,
                serviceType: validatedData.serviceType,
                description: combinedDescription,
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
        if (session.user.id) {
            const mail = await import("@/lib/mail");

            // Fetch user language for personalized email
            const dbUser = await prisma.user.findUnique({
                where: { id: session.user.id },
                select: { language: true, email: true }
            });

            if (dbUser?.email) {
                const userLocale = dbUser.language === "tr" ? "tr" : "en";

                // Notify Customer
                await mail.sendOrderCreatedEmail(
                    dbUser.email,
                    projectTitle,
                    userLocale
                ).catch((err) => console.error("Failed to send customer email:", err));

                // Notify Admin
                await mail.sendOrderCreatedEmail(
                    "admin@nakis.com",
                    projectTitle,
                    userLocale,
                    true
                ).catch((err) => console.error("Failed to send admin email:", err));
            }
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

export async function DELETE(request: Request) {
    try {
        const session = await auth();
        if (session?.user?.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const ids = searchParams.get("ids")?.split(",") || [];

        if (ids.length === 0) {
            return NextResponse.json({ error: "No IDs provided" }, { status: 400 });
        }

        // We delete from database. 
        // Note: Cascade deletion in schema should handle related files, comments, etc records.
        // If we want to delete PHYSICAL files from R2/Disk, it would be slow here.
        // For bulk delete, we usually just want to clear the entries.

        const result = await prisma.order.deleteMany({
            where: {
                id: { in: ids }
            }
        });

        return NextResponse.json({ success: true, count: result.count });
    } catch (error) {
        console.error("Error bulk deleting orders:", error);
        return NextResponse.json(
            { error: "Bulk deletion failed" },
            { status: 500 }
        );
    }
}
