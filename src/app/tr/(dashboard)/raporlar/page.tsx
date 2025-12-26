import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { ReportsClient } from "@/app/(en)/(dashboard)/reports/reports-client";

async function getStats() {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
        return null;
    }

    const [totalOrders, paidOrders, recentOrders, allOrders] = await Promise.all([
        prisma.order.count(),
        prisma.order.findMany({ where: { status: "COMPLETED" } }),
        prisma.order.findMany({
            take: 5,
            orderBy: { createdAt: "desc" },
            include: { customer: { select: { name: true, email: true, image: true } } }
        }),
        prisma.order.findMany({
            select: { createdAt: true, status: true, price: true },
            orderBy: { createdAt: "asc" }
        })
    ]);

    const totalRevenue = paidOrders.reduce((sum, order) => sum + (order.price || 0), 0);

    return {
        totalOrders,
        paidOrdersCount: paidOrders.length,
        totalRevenue,
        recentOrders,
        allOrders
    };
}

export default async function ReportsPage() {
    const stats = await getStats();

    if (!stats) {
        redirect("/tr/giris");
    }

    return <ReportsClient stats={stats} language="tr" />;
}
