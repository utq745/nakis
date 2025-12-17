import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Providers } from "@/components/providers";
import { OrderDetailClient } from "./order-detail-client";

async function getOrder(id: string, userId: string, isAdmin: boolean) {
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

    if (!order) return null;

    // Check access
    if (!isAdmin && order.customerId !== userId) {
        return null;
    }

    return order;
}

export default async function OrderDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const session = await auth();
    if (!session?.user) {
        return notFound();
    }

    const { id } = await params;
    const isAdmin = session.user.role === "ADMIN";
    const order = await getOrder(id, session.user.id, isAdmin);

    if (!order) {
        return notFound();
    }

    return (
        <Providers>
            <OrderDetailClient order={order} isAdmin={isAdmin} />
        </Providers>
    );
}
