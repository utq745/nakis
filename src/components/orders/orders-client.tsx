"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Package, Search, EyeOff, Eye } from "lucide-react";
import Link from "next/link";
import { ORDER_STATUS_LABELS, ORDER_STATUS_LABELS_TR, ORDER_STATUS_COLORS } from "@/types";
import { useState, useMemo } from "react";
import { toast } from "sonner";

interface Order {
    id: string;
    title: string;
    description: string | null;
    status: string;
    price: number | null;
    hidden: boolean;
    createdAt: string;
    customer: { name: string | null; email: string };
    _count: { files: number; comments: number };
}

interface OrdersClientProps {
    orders: Order[];
    isAdmin: boolean;
    locale?: "en" | "tr";
}

const texts = {
    en: {
        allOrders: "All Orders",
        myOrders: "My Orders",
        search: "Search...",
        newOrder: "New Order",
        orders: "All Orders",
        completed: "Completed",
        cancelled: "Cancelled",
        hidden: "Hidden",
        noActiveOrders: "No orders",
        noCompletedOrders: "No completed orders",
        noCancelledOrders: "No cancelled orders",
        noHiddenOrders: "No hidden orders",
        files: "files",
        messages: "messages",
        needsPrice: "Price Pending",
        orderRestored: "Order restored",
        orderHidden: "Order hidden",
        updateFailed: "Failed to update order",
        showOrder: "Show order",
        hideOrder: "Hide order",
    },
    tr: {
        allOrders: "Tüm Siparişler",
        myOrders: "Siparişlerim",
        search: "Ara...",
        newOrder: "Yeni Sipariş",
        orders: "Tüm Siparişler",
        completed: "Tamamlananlar",
        cancelled: "İptal Edilenler",
        hidden: "Gizlenenler",
        noActiveOrders: "Sipariş yok",
        noCompletedOrders: "Tamamlanan sipariş yok",
        noCancelledOrders: "İptal edilen sipariş yok",
        noHiddenOrders: "Gizlenen sipariş yok",
        files: "dosya",
        messages: "mesaj",
        needsPrice: "Fiyat Bekleniyor",
        orderRestored: "Sipariş gösterildi",
        orderHidden: "Sipariş gizlendi",
        updateFailed: "Sipariş güncellenemedi",
        showOrder: "Siparişi göster",
        hideOrder: "Siparişi gizle",
    },
};

export function OrdersClient({ orders, isAdmin, locale = "en" }: OrdersClientProps) {
    const t = texts[locale];
    const statusLabels = locale === "tr" ? ORDER_STATUS_LABELS_TR : ORDER_STATUS_LABELS;
    const [searchQuery, setSearchQuery] = useState("");
    const [localOrders, setLocalOrders] = useState(orders);

    // Filter orders by tab and search
    const { allOrders: allOrdersFiltered, completedOrders, cancelledOrders, hiddenOrders } = useMemo(() => {
        const filtered = localOrders.filter((order) => {
            if (!searchQuery) return true;
            const query = searchQuery.toLowerCase();
            return (
                order.title.toLowerCase().includes(query) ||
                order.id.toLowerCase().includes(query) ||
                order.customer.name?.toLowerCase().includes(query) ||
                order.customer.email.toLowerCase().includes(query)
            );
        });

        // Sort function to prioritize WAITING_PRICE and PRICE_ACCEPTED for admin
        const sortOrders = (orders: typeof filtered) => {
            if (!isAdmin) return orders;
            return [...orders].sort((a, b) => {
                const aPriority = a.status === "WAITING_PRICE" || a.status === "PRICE_ACCEPTED" ? 1 : 0;
                const bPriority = b.status === "WAITING_PRICE" || b.status === "PRICE_ACCEPTED" ? 1 : 0;
                if (aPriority !== bPriority) return bPriority - aPriority;
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            });
        };

        return {
            allOrders: sortOrders(filtered.filter(
                (o) => o.status !== "COMPLETED" && o.status !== "CANCELLED" && !o.hidden
            )),
            completedOrders: filtered.filter(
                (o) => o.status === "COMPLETED" && !o.hidden
            ),
            cancelledOrders: filtered.filter(
                (o) => o.status === "CANCELLED" && !o.hidden
            ),
            hiddenOrders: filtered.filter((o) => o.hidden),
        };
    }, [localOrders, searchQuery, isAdmin]);

    async function toggleHidden(orderId: string, currentHidden: boolean) {
        try {
            const response = await fetch(`/api/orders/${orderId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ hidden: !currentHidden }),
            });

            if (!response.ok) throw new Error();

            setLocalOrders((prev) =>
                prev.map((o) =>
                    o.id === orderId ? { ...o, hidden: !currentHidden } : o
                )
            );
            toast.success(currentHidden ? t.orderRestored : t.orderHidden);
        } catch {
            toast.error(t.updateFailed);
        }
    }

    function OrderCard({ order }: { order: Order }) {
        const needsPrice = order.status === "WAITING_PRICE" && !order.price;
        const isPriced = !isAdmin && order.status === "PRICED";
        const isAwaitingApproval = !isAdmin && order.status === "APPROVAL_AWAITING";
        const isPaymentPending = !isAdmin && order.status === "PAYMENT_PENDING";
        const isOrangeAlert = isAwaitingApproval || isPaymentPending;
        const isAdminPriority = isAdmin && (order.status === "WAITING_PRICE" || order.status === "PRICE_ACCEPTED");
        const basePath = locale === "tr" ? "/tr" : "";

        return (
            <div className="relative group">
                <Link href={`${basePath}/orders/${order.id}`}>
                    <Card
                        className={`border transition-all cursor-pointer duration-200 hover:scale-[1.01] ${isPriced
                            ? "bg-blue-950/30 border-blue-500/50 hover:border-blue-400 hover:bg-blue-900/40 shadow-lg shadow-blue-500/10 animate-pulse"
                            : isOrangeAlert
                                ? "bg-orange-950/30 border-orange-500/50 hover:border-orange-400 hover:bg-orange-900/40 shadow-lg shadow-orange-500/10 animate-pulse"
                                : isAdminPriority
                                    ? "bg-violet-950/30 border-violet-500/50 hover:border-violet-400 hover:bg-violet-900/40 shadow-lg shadow-violet-500/10 animate-pulse"
                                    : needsPrice
                                        ? "bg-amber-950/30 border-amber-700/50 hover:border-amber-600 hover:bg-amber-900/40"
                                        : "bg-zinc-900 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/80"
                            }`}
                    >
                        <CardContent className="py-3 px-4">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-medium text-white transition-colors truncate mb-1">
                                        {order.title}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-mono text-zinc-500">
                                            #{order.id.slice(0, 8)}
                                        </span>
                                        {!isPriced && !isOrangeAlert && (isAdmin || order.status !== "WAITING_PRICE") && (
                                            <Badge
                                                className={`text-xs ${ORDER_STATUS_COLORS[
                                                    order.status as keyof typeof ORDER_STATUS_COLORS
                                                ]
                                                    } ${isAdminPriority ? "animate-pulse" : ""}`}
                                            >
                                                {
                                                    statusLabels[
                                                    order.status as keyof typeof statusLabels
                                                    ]
                                                }
                                            </Badge>
                                        )}
                                        {needsPrice && (
                                            <Badge className="bg-amber-600 text-white text-xs">
                                                {t.needsPrice}
                                            </Badge>
                                        )}
                                        {isPriced && (
                                            <Badge className="bg-blue-600 text-white text-xs animate-pulse">
                                                💰 {locale === "tr" ? "Onay Bekliyor" : "Awaiting Approval"}
                                            </Badge>
                                        )}
                                        {isAwaitingApproval && (
                                            <Badge className="bg-orange-600 text-white text-xs animate-pulse">
                                                🖼️ {locale === "tr" ? "Önizleme Onayı" : "Preview Approval"}
                                            </Badge>
                                        )}
                                        {isPaymentPending && (
                                            <Badge className="bg-orange-600 text-white text-xs animate-pulse">
                                                💳 {locale === "tr" ? "Ödeme Bekleniyor" : "Payment Pending"}
                                            </Badge>
                                        )}
                                        {isAdmin && (
                                            <span className="text-xs text-zinc-500">
                                                • {order.customer.name || order.customer.email}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="text-right shrink-0">
                                    {order.price && (
                                        <p className={`text-sm font-medium ${isPriced ? "text-blue-400 font-bold" : isOrangeAlert ? "text-orange-400 font-bold" : "text-violet-400"}`}>
                                            ${Number(order.price).toLocaleString("en-US")}
                                        </p>
                                    )}
                                    <p className="text-xs text-zinc-500">
                                        {new Date(order.createdAt).toLocaleDateString(
                                            locale === "tr" ? "tr-TR" : "en-US",
                                            {
                                                day: "numeric",
                                                month: "short",
                                            }
                                        )}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
                {isAdmin && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                            e.preventDefault();
                            toggleHidden(order.id, order.hidden);
                        }}
                        className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-all text-zinc-400 hover:text-white hover:bg-zinc-700/80"
                        title={order.hidden ? t.showOrder : t.hideOrder}
                    >
                        {order.hidden ? (
                            <Eye className="h-4 w-4" />
                        ) : (
                            <EyeOff className="h-4 w-4" />
                        )}
                    </Button>
                )}
            </div>
        );
    }

    function EmptyState({ message }: { message: string }) {
        return (
            <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="flex flex-col items-center justify-center py-12">
                    <Package className="h-12 w-12 text-zinc-600" />
                    <p className="mt-3 text-sm text-zinc-400">{message}</p>
                </CardContent>
            </Card>
        );
    }

    const basePath = locale === "tr" ? "/tr" : "";

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-bold text-white">
                        {isAdmin ? t.allOrders : t.myOrders}
                    </h1>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                        <Input
                            placeholder={t.search}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 w-48 bg-zinc-900 border-zinc-700 h-9 text-sm"
                        />
                    </div>
                    {!isAdmin && (
                        <Link href={`${basePath}/orders/new`}>
                            <Button
                                size="sm"
                                className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500"
                            >
                                <Plus className="mr-1 h-4 w-4" />
                                {t.newOrder}
                            </Button>
                        </Link>
                    )}
                </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="orders" className="w-full">
                <TabsList className="bg-zinc-800 w-full justify-start">
                    <TabsTrigger
                        value="orders"
                        className="text-zinc-300 data-[state=active]:bg-zinc-700 data-[state=active]:text-white"
                    >
                        {t.orders} ({allOrdersFiltered.length})
                    </TabsTrigger>
                    <TabsTrigger
                        value="completed"
                        className="text-zinc-300 data-[state=active]:bg-zinc-700 data-[state=active]:text-white"
                    >
                        {t.completed} ({completedOrders.length})
                    </TabsTrigger>
                    <TabsTrigger
                        value="cancelled"
                        className="text-zinc-300 data-[state=active]:bg-zinc-700 data-[state=active]:text-white"
                    >
                        {t.cancelled} ({cancelledOrders.length})
                    </TabsTrigger>
                    {isAdmin && (
                        <TabsTrigger
                            value="hidden"
                            className="text-zinc-300 data-[state=active]:bg-zinc-700 data-[state=active]:text-white"
                        >
                            {t.hidden} ({hiddenOrders.length})
                        </TabsTrigger>
                    )}
                </TabsList>

                <TabsContent value="orders" className="mt-4">
                    {allOrdersFiltered.length === 0 ? (
                        <EmptyState message={t.noActiveOrders} />
                    ) : (
                        <div className="grid gap-3">
                            {allOrdersFiltered.map((order) => (
                                <OrderCard key={order.id} order={order} />
                            ))}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="completed" className="mt-4">
                    {completedOrders.length === 0 ? (
                        <EmptyState message={t.noCompletedOrders} />
                    ) : (
                        <div className="grid gap-3">
                            {completedOrders.map((order) => (
                                <OrderCard key={order.id} order={order} />
                            ))}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="cancelled" className="mt-4">
                    {cancelledOrders.length === 0 ? (
                        <EmptyState message={t.noCancelledOrders} />
                    ) : (
                        <div className="grid gap-3">
                            {cancelledOrders.map((order) => (
                                <OrderCard key={order.id} order={order} />
                            ))}
                        </div>
                    )}
                </TabsContent>

                {isAdmin && (
                    <TabsContent value="hidden" className="mt-4">
                        {hiddenOrders.length === 0 ? (
                            <EmptyState message={t.noHiddenOrders} />
                        ) : (
                            <div className="grid gap-3">
                                {hiddenOrders.map((order) => (
                                    <OrderCard key={order.id} order={order} />
                                ))}
                            </div>
                        )}
                    </TabsContent>
                )}
            </Tabs>
        </div>
    );
}
