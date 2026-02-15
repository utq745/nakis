import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { DashboardContent } from "./dashboard-content";

async function getOrderStats(userId: string, isAdmin: boolean) {
    const where = isAdmin ? {} : { customerId: userId };
    const pendingStatuses = ["ORDERED", "PRICED", "APPROVAL_AWAITING", "REVISION", "PAYMENT_PENDING"];

    const [total, pending, inProgress, completed] = await Promise.all([
        prisma.order.count({ where }),
        prisma.order.count({ where: { ...where, status: { in: pendingStatuses } } }),
        prisma.order.count({ where: { ...where, status: "IN_PROGRESS" } }),
        prisma.order.count({ where: { ...where, status: { in: ["COMPLETED", "DELIVERED"] } } }),
    ]);

    return { total, pending, inProgress, completed };
}

async function getRecentOrders(userId: string, isAdmin: boolean) {
    const where = isAdmin ? {} : { customerId: userId };

    return prisma.order.findMany({
        where,
        include: {
            customer: {
                select: { name: true, email: true, image: true },
            },
        },
        orderBy: { createdAt: "desc" },
        take: 5,
    });
}

export default async function DashboardPage() {
    const session = await auth();
    const isAdmin = session?.user?.role === "ADMIN";
    const userId = session?.user?.id!;

    const stats = await getOrderStats(userId, isAdmin);
    const recentOrders = await getRecentOrders(userId, isAdmin);

    return (
        <DashboardContent
            stats={stats}
            recentOrders={recentOrders}
            isAdmin={isAdmin}
        />
    );
}
