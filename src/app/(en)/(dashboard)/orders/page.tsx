import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { OrdersClient } from "@/components/orders/orders-client";

async function getOrders(userId: string, isAdmin: boolean) {
    const where = isAdmin ? {} : { customerId: userId };

    return prisma.order.findMany({
        where,
        include: {
            customer: {
                select: { name: true, email: true },
            },
            _count: {
                select: { files: true, comments: true },
            },
        },
        orderBy: { createdAt: "desc" },
    });
}

export default async function OrdersPage() {
    const session = await auth();
    const isAdmin = session?.user?.role === "ADMIN";
    const userId = session?.user?.id!;

    const orders = await getOrders(userId, isAdmin);

    // Serialize dates for client component
    const serializedOrders = orders.map((order) => ({
        ...order,
        createdAt: order.createdAt.toISOString(),
        updatedAt: order.updatedAt.toISOString(),
    }));

    return <OrdersClient orders={serializedOrders} isAdmin={isAdmin} locale="en" />;
}
