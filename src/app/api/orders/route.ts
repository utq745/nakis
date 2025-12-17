import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";

const createOrderSchema = z.object({
    title: z.string().min(1, "Başlık gerekli"),
    description: z.string().optional(),
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

        const order = await prisma.order.create({
            data: {
                title: validatedData.title,
                description: validatedData.description,
                customerId: session.user.id,
                status: "PENDING",
            },
        });

        // TODO: Send email notification to admin

        return NextResponse.json(order, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.errors[0].message },
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
