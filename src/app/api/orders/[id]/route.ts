import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";

const updateOrderSchema = z.object({
    status: z.enum(["PENDING", "PRICED", "IN_PROGRESS", "REVISION", "COMPLETED", "CANCELLED"]).optional(),
    price: z.number().positive().optional(),
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
                    },
                    orderBy: { createdAt: "asc" },
                },
            },
        });

        if (!order) {
            return NextResponse.json({ error: "Sipariş bulunamadı" }, { status: 404 });
        }

        // Check access
        const isAdmin = session.user.role === "ADMIN";
        if (!isAdmin && order.customerId !== session.user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        return NextResponse.json(order);
    } catch (error) {
        console.error("Error fetching order:", error);
        return NextResponse.json(
            { error: "Sipariş alınırken hata oluştu" },
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

        // Only admin can update status and price
        if (session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const order = await prisma.order.update({
            where: { id },
            data: validatedData,
        });

        return NextResponse.json(order);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.errors[0].message },
                { status: 400 }
            );
        }

        console.error("Error updating order:", error);
        return NextResponse.json(
            { error: "Sipariş güncellenirken hata oluştu" },
            { status: 500 }
        );
    }
}
