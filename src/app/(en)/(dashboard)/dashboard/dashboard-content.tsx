"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
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
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            {t.dashboard.totalOrders}
                        </CardTitle>
                        <Package className="h-5 w-5 text-violet-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-foreground">{stats.total}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            {t.dashboard.pending}
                        </CardTitle>
                        <Clock className="h-5 w-5 text-yellow-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-foreground">{stats.pending}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            {t.dashboard.inProgress}
                        </CardTitle>
                        <AlertCircle className="h-5 w-5 text-purple-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-foreground">{stats.inProgress}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            {t.dashboard.completed}
                        </CardTitle>
                        <CheckCircle2 className="h-5 w-5 text-green-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-foreground">{stats.completed}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Orders */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-foreground">{t.dashboard.recentOrders}</CardTitle>
                </CardHeader>
                <CardContent>
                    {recentOrders.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="mt-4 text-muted-foreground">{t.dashboard.noOrders}</p>
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
                                    className="flex items-center justify-between p-4 rounded-lg bg-accent/50 hover:bg-accent transition-colors"
                                >
                                    <div className="flex items-center gap-4 flex-1">
                                        {isAdmin && (
                                            <Avatar className="h-10 w-10 border border-zinc-700">
                                                {order.customer.image && (
                                                    <AvatarImage src={order.customer.image} alt={order.customer.name || ""} />
                                                )}
                                                <AvatarFallback className="bg-accent text-muted-foreground text-xs font-bold">
                                                    {(order.customer.name || order.customer.email || "U")[0].toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                        )}
                                        <div className="min-w-0">
                                            <h3 className="font-medium text-foreground truncate">{order.title}</h3>
                                            {isAdmin && (
                                                <p className="text-sm text-muted-foreground truncate">
                                                    {order.customer.name || order.customer.email}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Badge className={ORDER_STATUS_COLORS[order.status as OrderStatus]}>
                                            {(t.status as any)[order.status] || order.status}
                                        </Badge>
                                        <span className="text-sm text-muted-foreground">
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
