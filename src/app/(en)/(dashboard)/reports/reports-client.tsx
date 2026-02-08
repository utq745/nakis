"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    ShoppingCart,
    CreditCard,
    TrendingUp,
    Calendar,
    ArrowUpRight,
    ChevronDown
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ReportsClientProps {
    stats: any;
    language: 'en' | 'tr';
}

const STATUS_MAP = {
    en: {
        "ORDERED": "Order Received",
        "PRICED": "Priced",
        "APPROVAL_AWAITING": "Awaiting Preview Approval",
        "REVISION": "Revision Requested",
        "IN_PROGRESS": "In Progress",
        "PAYMENT_PENDING": "Payment Pending",
        "COMPLETED": "Completed",
        "DELIVERED": "Delivered",
        "CANCELLED": "Cancelled",
    },
    tr: {
        "ORDERED": "Sipariş Alındı",
        "PRICED": "Fiyatlandırıldı",
        "APPROVAL_AWAITING": "Önizleme Bekliyor",
        "REVISION": "Revizyon İstendi",
        "IN_PROGRESS": "İşleniyor",
        "PAYMENT_PENDING": "Ödeme Bekliyor",
        "COMPLETED": "Tamamlandı",
        "DELIVERED": "Teslim Edildi",
        "CANCELLED": "İptal",
    }
};

const RANGE_LABELS = {
    en: {
        3: "Last 3 Months",
        6: "Last 6 Months",
        12: "Last 12 Months"
    },
    tr: {
        3: "Son 3 Ay",
        6: "Son 6 Ay",
        12: "Son 12 Ay"
    }
};

export function ReportsClient({ stats, language }: ReportsClientProps) {
    const [range, setRange] = useState<3 | 6 | 12>(12);
    const [chartMode, setChartMode] = useState<'monthly' | 'yearly'>('monthly');

    const now = new Date();
    const months = Array.from({ length: range }, (_, i) => {
        const d = new Date(now.getFullYear(), now.getMonth() - (range - 1 - i), 1);
        return {
            label: d.toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US', { month: 'short' }),
            year: d.getFullYear(),
            month: d.getMonth(),
            revenue: 0
        };
    });

    stats.allOrders.forEach((order: any) => {
        const d = new Date(order.createdAt);
        const monthItem = months.find(m => m.year === d.getFullYear() && m.month === d.getMonth());
        if (monthItem && order.status === "COMPLETED") {
            monthItem.revenue += order.price || 0;
        }
    });

    return (
        <div className="p-6 space-y-8 max-w-7xl mx-auto min-h-screen">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        {language === 'tr' ? 'Finansal Raporlar' : 'Financial Reports'}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        {language === 'tr' ? 'İşletme performansınız ve sipariş istatistiklerine genel bakış.' : 'Overview of your business performance and order statistics.'}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-[180px] bg-card text-muted-foreground border-border hover:bg-accent hover:text-foreground transition-all group px-4 flex justify-between">
                                <span className="flex items-center">
                                    <Calendar className="mr-2 h-4 w-4 text-violet-400 group-hover:scale-110 transition-transform" />
                                    {RANGE_LABELS[language][range]}
                                </span>
                                <ChevronDown className="h-4 w-4 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[180px] bg-card border-border text-muted-foreground">
                            {[3, 6, 12].map((r) => (
                                <DropdownMenuItem
                                    key={r}
                                    onClick={() => setRange(r as any)}
                                    className={cn(
                                        "focus:bg-accent focus:text-foreground cursor-pointer",
                                        range === r && "bg-accent text-foreground"
                                    )}
                                >
                                    {RANGE_LABELS[language][r as 3 | 6 | 12]}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-card border-border relative overflow-hidden group shadow-sm">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <ShoppingCart className="h-24 w-24 text-violet-400" />
                    </div>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            {language === 'tr' ? 'Toplam Sipariş' : 'Total Orders'}
                        </CardTitle>
                        <ShoppingCart className="h-4 w-4 text-violet-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-foreground">{stats.totalOrders}</div>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <span className="text-violet-400 flex items-center font-medium">
                                <ArrowUpRight className="h-3 w-3" /> %12
                            </span>
                            {language === 'tr' ? 'geçen aya göre' : 'than last month'}
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-card border-border relative overflow-hidden group shadow-sm">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <CreditCard className="h-24 w-24 text-emerald-500" />
                    </div>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            {language === 'tr' ? 'Ödenen Siparişler' : 'Paid Orders'}
                        </CardTitle>
                        <CreditCard className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-foreground">{stats.paidOrdersCount}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            %{((stats.paidOrdersCount / (stats.totalOrders || 1)) * 100).toFixed(1)} {language === 'tr' ? 'dönüşüm oranı' : 'conversion rate'}
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-card border-border relative overflow-hidden group shadow-sm">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <TrendingUp className="h-24 w-24 text-fuchsia-500" />
                    </div>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            {language === 'tr' ? 'Toplam Gelir' : 'Total Revenue'}
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-fuchsia-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-foreground">${stats.totalRevenue.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <span className="text-fuchsia-500 flex items-center font-medium">
                                <ArrowUpRight className="h-3 w-3" /> $2.4k
                            </span>
                            {language === 'tr' ? 'bu hafta' : 'this week'}
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Chart Section */}
                <Card className="lg:col-span-8 bg-card border-border h-fit shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 pb-2">
                        <div>
                            <CardTitle className="text-lg font-semibold text-foreground">
                                {language === 'tr' ? 'Gelir Trendi' : 'Revenue Trend'}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                                {language === 'tr' ? 'Aylık gelir dağılımı' : 'Monthly revenue distribution'}
                            </p>
                        </div>
                        <div className="flex gap-1 bg-accent/50 p-1 rounded-lg">
                            <Button
                                onClick={() => setChartMode('monthly')}
                                variant="ghost"
                                size="sm"
                                className={cn(
                                    "h-7 text-xs px-3 transition-all duration-200",
                                    chartMode === 'monthly'
                                        ? "bg-accent text-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground hover:bg-accent/80"
                                )}
                            >
                                {language === 'tr' ? 'Aylık' : 'Monthly'}
                            </Button>
                            <Button
                                onClick={() => setChartMode('yearly')}
                                variant="ghost"
                                size="sm"
                                className={cn(
                                    "h-7 text-xs px-3 transition-all duration-200",
                                    chartMode === 'yearly'
                                        ? "bg-accent text-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground hover:bg-accent/80"
                                )}
                            >
                                {language === 'tr' ? 'Yıllık' : 'Yearly'}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <div className="h-[300px] w-full flex items-end justify-between gap-2 px-1">
                            {months.map((m, i) => {
                                const maxRevenue = Math.max(...months.map(x => x.revenue), 100);
                                const height = (m.revenue / maxRevenue) * 100;
                                return (
                                    <div key={i} className="flex-1 flex flex-col items-center group relative">
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-violet-600 text-foreground text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap shadow-xl">
                                            ${m.revenue.toLocaleString()}
                                        </div>
                                        <div
                                            className="w-full bg-gradient-to-t from-violet-600/20 to-violet-500/80 group-hover:to-violet-400 transition-all duration-300 rounded-t-sm"
                                            style={{ height: `${Math.max(height, 5)}%` }}
                                        />
                                        <div className="text-[10px] text-muted-foreground mt-3 rotate-[-45deg] md:rotate-0 group-hover:text-foreground transition-colors">{m.label}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Orders Section */}
                <Card className="lg:col-span-4 bg-card border-border shadow-sm">
                    <CardHeader className="border-b border-border/50 pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-semibold text-foreground">
                                {language === 'tr' ? 'Son Siparişler' : 'Recent Orders'}
                            </CardTitle>
                            <Link href={`${language === 'tr' ? '/tr' : ''}/orders`} className="text-sm text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-1 group">
                                {language === 'tr' ? 'Tümü' : 'All'}
                                <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-2 px-2">
                        <div className="space-y-1">
                            {stats.recentOrders.map((order: any) => (
                                <Link
                                    key={order.id}
                                    href={`${language === 'tr' ? '/tr' : ''}/orders/${order.id}`}
                                    className="flex items-center justify-between group bg-accent/20 hover:bg-accent/50 p-3 rounded-lg transition-all border border-border/50 hover:border-violet-500/20"
                                >
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9 border border-border shrink-0">
                                            {order.customer.image && (
                                                <AvatarImage src={order.customer.image} alt={order.customer.name || ""} />
                                            )}
                                            <AvatarFallback className="bg-card text-[10px] font-bold text-muted-foreground">
                                                {(order.customer.name || order.customer.email || "U")[0].toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-foreground group-hover:text-foreground transition-colors truncate">
                                                {order.title || (language === 'tr' ? `Sipariş #${order.id.slice(-6).toUpperCase()}` : `Order #${order.id.slice(-6).toUpperCase()}`)}
                                            </p>
                                            <p className="text-xs text-muted-foreground truncate">{order.customer.email}</p>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0 ml-4">
                                        <p className="text-sm font-bold text-foreground">${order.price || 0}</p>
                                        <Badge
                                            variant="outline"
                                            className={cn(
                                                "text-[9px] px-1 py-0 border-border font-medium",
                                                order.status === "COMPLETED" ? "text-emerald-400 bg-emerald-400/5" :
                                                    order.status === "CANCELLED" ? "text-red-400 bg-red-400/5" : "text-amber-400 bg-amber-400/5"
                                            )}
                                        >
                                            {STATUS_MAP[language][order.status as keyof typeof STATUS_MAP['en']] || order.status}
                                        </Badge>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
