"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { ORDER_STATUS_COLORS, OrderStatus } from "@/types";

interface DashboardContentProps {
    stats: {
        total: number;
        pending: number;
        inProgress: number;
        completed: number;
    };
    recentOrders: any[];
    isAdmin: boolean;
}

export function DashboardContent({ stats, recentOrders, isAdmin }: DashboardContentProps) {
    const { t, language } = useLanguage();
    const dateLocale = language === "tr" ? "tr-TR" : "en-US";

    return (
        <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">
                            {t.dashboard.totalOrders}
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
                            {t.dashboard.pending}
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
                            {t.dashboard.inProgress}
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
                            {t.dashboard.completed}
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
                    <CardTitle className="text-white">{t.dashboard.recentOrders}</CardTitle>
                </CardHeader>
                <CardContent>
                    {recentOrders.length === 0 ? (
                        <div className="text-center py-8">
                            <Package className="mx-auto h-12 w-12 text-zinc-600" />
                            <p className="mt-4 text-zinc-400">{t.dashboard.noOrders}</p>
                            {!isAdmin && (
                                <Link
                                    href="/orders/new"
                                    className="mt-4 inline-block text-violet-400 hover:text-violet-300"
                                >
                                    {t.dashboard.createFirstOrder} →
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
                                        <Badge className={ORDER_STATUS_COLORS[order.status as OrderStatus]}>
                                            {(t.status as any)[order.status] || order.status}
                                        </Badge>
                                        <span className="text-sm text-zinc-500">
                                            {new Date(order.createdAt).toLocaleDateString(dateLocale)}
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
