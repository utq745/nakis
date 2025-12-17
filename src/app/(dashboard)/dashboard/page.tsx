import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from "@/types";

async function getOrderStats(userId: string, isAdmin: boolean) {
    const where = isAdmin ? {} : { customerId: userId };

    const [total, pending, inProgress, completed] = await Promise.all([
        prisma.order.count({ where }),
        prisma.order.count({ where: { ...where, status: "PENDING" } }),
        prisma.order.count({ where: { ...where, status: "IN_PROGRESS" } }),
        prisma.order.count({ where: { ...where, status: "COMPLETED" } }),
    ]);

    return { total, pending, inProgress, completed };
}

async function getRecentOrders(userId: string, isAdmin: boolean) {
    const where = isAdmin ? {} : { customerId: userId };

    return prisma.order.findMany({
        where,
        include: {
            customer: {
                select: { name: true, email: true },
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
        <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">
                            {isAdmin ? "Toplam Sipariş" : "Siparişlerim"}
                        </CardTitle>
                        <Package className="h-5 w-5 text-violet-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-white">{stats.total}</div>
                    </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">
                            Beklemede
                        </CardTitle>
                        <Clock className="h-5 w-5 text-yellow-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-white">{stats.pending}</div>
                    </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">
                            Devam Ediyor
                        </CardTitle>
                        <AlertCircle className="h-5 w-5 text-purple-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-white">{stats.inProgress}</div>
                    </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">
                            Tamamlandı
                        </CardTitle>
                        <CheckCircle2 className="h-5 w-5 text-green-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-white">{stats.completed}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Orders */}
            <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                    <CardTitle className="text-white">Son Siparişler</CardTitle>
                </CardHeader>
                <CardContent>
                    {recentOrders.length === 0 ? (
                        <div className="text-center py-8">
                            <Package className="mx-auto h-12 w-12 text-zinc-600" />
                            <p className="mt-4 text-zinc-400">Henüz sipariş bulunmuyor</p>
                            {!isAdmin && (
                                <Link
                                    href="/orders/new"
                                    className="mt-4 inline-block text-violet-400 hover:text-violet-300"
                                >
                                    İlk siparişinizi oluşturun →
                                </Link>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {recentOrders.map((order) => (
                                <Link
                                    key={order.id}
                                    href={`/orders/${order.id}`}
                                    className="flex items-center justify-between p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
                                >
                                    <div className="flex-1">
                                        <h3 className="font-medium text-white">{order.title}</h3>
                                        {isAdmin && (
                                            <p className="text-sm text-zinc-400">
                                                {order.customer.name || order.customer.email}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Badge className={ORDER_STATUS_COLORS[order.status]}>
                                            {ORDER_STATUS_LABELS[order.status]}
                                        </Badge>
                                        <span className="text-sm text-zinc-500">
                                            {new Date(order.createdAt).toLocaleDateString("tr-TR")}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
