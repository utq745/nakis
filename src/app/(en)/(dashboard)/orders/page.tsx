import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Package } from "lucide-react";
import Link from "next/link";
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from "@/types";

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

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">
                        {isAdmin ? "All Orders" : "My Orders"}
                    </h1>
                    <p className="text-zinc-400">
                        {isAdmin
                            ? "View and manage all customer orders"
                            : "View your embroidery digitizing orders"}
                    </p>
                </div>
                {!isAdmin && (
                    <Link href="/orders/new">
                        <Button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500">
                            <Plus className="mr-2 h-4 w-4" />
                            New Order
                        </Button>
                    </Link>
                )}
            </div>

            {/* Orders List */}
            {orders.length === 0 ? (
                <Card className="bg-zinc-900 border-zinc-800">
                    <CardContent className="flex flex-col items-center justify-center py-16">
                        <Package className="h-16 w-16 text-zinc-600" />
                        <h3 className="mt-4 text-lg font-medium text-white">
                            No orders yet
                        </h3>
                        <p className="mt-2 text-zinc-400">
                            {isAdmin
                                ? "No customer orders yet"
                                : "Get started by creating your first embroidery order"}
                        </p>
                        {!isAdmin && (
                            <Link href="/orders/new" className="mt-4">
                                <Button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create Order
                                </Button>
                            </Link>
                        )}
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {orders.map((order: typeof orders[number]) => (
                        <Link key={order.id} href={`/orders/${order.id}`}>
                            <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer group">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-1">
                                            <h3 className="font-semibold text-white group-hover:text-violet-400 transition-colors">
                                                {order.title}
                                            </h3>
                                            {isAdmin && (
                                                <p className="text-sm text-zinc-400">
                                                    Customer: {order.customer.name || order.customer.email}
                                                </p>
                                            )}
                                            {order.description && (
                                                <p className="text-sm text-zinc-500 line-clamp-2">
                                                    {order.description}
                                                </p>
                                            )}
                                        </div>
                                        <Badge className={ORDER_STATUS_COLORS[order.status as keyof typeof ORDER_STATUS_COLORS]}>
                                            {ORDER_STATUS_LABELS[order.status as keyof typeof ORDER_STATUS_LABELS]}
                                        </Badge>
                                    </div>

                                    <div className="mt-4 flex items-center gap-6 text-sm text-zinc-500">
                                        <span>
                                            {order._count.files} files
                                        </span>
                                        <span>
                                            {order._count.comments} comments
                                        </span>
                                        {order.price && (
                                            <span className="text-violet-400 font-medium">
                                                ${Number(order.price).toLocaleString("en-US")}
                                            </span>
                                        )}
                                        <span className="ml-auto">
                                            {new Date(order.createdAt).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
