"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Package, Search, EyeOff, Eye, Rocket, Filter, ChevronDown, X, SlidersHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ORDER_STATUS_LABELS, ORDER_STATUS_LABELS_TR, ORDER_STATUS_COLORS } from "@/types";
import { useState, useMemo } from "react";
import { toast } from "sonner";

interface Order {
    id: string;
    title: string | null;
    description: string | null;
    status: string;
    price: number | null;
    hidden: boolean;
    createdAt: string;
    customer: { name: string | null; email: string };
    priority: string;
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
        filters: "Filters",
        status: "Status",
        priority: "Priority",
        dateRange: "Date Range",
        minPrice: "Min Price",
        maxPrice: "Max Price",
        clearFilters: "Clear",
        allStatuses: "All Statuses",
        allPriorities: "All Priorities",
        urgent: "Urgent",
        normal: "Normal",
        startDate: "Start",
        endDate: "End",
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
        filters: "Filtreler",
        status: "Durum",
        priority: "Öncelik",
        dateRange: "Tarih Aralığı",
        minPrice: "Min Fiyat",
        maxPrice: "Max Fiyat",
        clearFilters: "Temizle",
        allStatuses: "Tüm Durumlar",
        allPriorities: "Tüm Öncelikler",
        urgent: "Acil",
        normal: "Normal",
        startDate: "Başlangıç",
        endDate: "Bitiş",
    },
};

export function OrdersClient({ orders, isAdmin, locale = "en" }: OrdersClientProps) {
    const t = texts[locale];
    const statusLabels = locale === "tr" ? ORDER_STATUS_LABELS_TR : ORDER_STATUS_LABELS;
    const [searchQuery, setSearchQuery] = useState("");
    const [localOrders, setLocalOrders] = useState(orders);
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [priorityFilter, setPriorityFilter] = useState<string>("all");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [minPrice, setMinPrice] = useState<string>("");
    const [maxPrice, setMaxPrice] = useState<string>("");

    // Filter orders by tab and search
    const { allOrders: allOrdersFiltered, completedOrders, cancelledOrders, hiddenOrders } = useMemo(() => {
        const filtered = localOrders.filter((order) => {
            // Search Query
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchesSearch = (order.title?.toLowerCase().includes(query) ?? false) ||
                    order.id.toLowerCase().includes(query) ||
                    order.customer.name?.toLowerCase().includes(query) ||
                    order.customer.email.toLowerCase().includes(query);
                if (!matchesSearch) return false;
            }

            // Status Filter (Manual selection in popover)
            if (statusFilter !== "all" && order.status !== statusFilter) return false;

            // Priority Filter
            if (priorityFilter !== "all" && order.priority !== priorityFilter) return false;

            // Date Range Filter
            if (startDate) {
                const sDate = new Date(startDate);
                if (new Date(order.createdAt) < sDate) return false;
            }
            if (endDate) {
                const eDate = new Date(endDate);
                eDate.setHours(23, 59, 59, 999);
                if (new Date(order.createdAt) > eDate) return false;
            }

            // Price Range Filter
            if (minPrice && (order.price === null || order.price < parseFloat(minPrice))) return false;
            if (maxPrice && (order.price === null || order.price > parseFloat(maxPrice))) return false;

            return true;
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
                            ? "bg-blue-500/5 border-blue-500/50 hover:border-blue-400 hover:bg-blue-500/10 shadow-lg shadow-blue-500/10 animate-pulse"
                            : isOrangeAlert
                                ? "bg-orange-500/5 border-orange-500/50 hover:border-orange-400 hover:bg-orange-500/10 shadow-lg shadow-orange-500/10 animate-pulse"
                                : isAdminPriority
                                    ? "bg-violet-500/5 border-violet-500/50 hover:border-violet-400 hover:bg-violet-500/10 shadow-lg shadow-violet-500/10 animate-pulse"
                                    : needsPrice
                                        ? "bg-amber-500/5 border-amber-700/50 hover:border-amber-600 hover:bg-amber-500/10"
                                        : "bg-card border-border hover:border-violet-500/40 hover:bg-accent/30"
                            }`}
                    >
                        <CardContent className="py-3 px-4">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-medium text-foreground transition-colors truncate mb-1 flex items-center gap-2">
                                        {order.title || `Order #${order.id.slice(-6).toUpperCase()}`}
                                        {order.priority === "URGENT" && (
                                            <Rocket className="w-3.5 h-3.5 text-red-500 fill-red-500/20" />
                                        )}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-mono text-muted-foreground">
                                            #{order.id.slice(-8)}
                                        </span>
                                        {!isPriced && !isOrangeAlert && !isAdminPriority && (isAdmin || order.status !== "WAITING_PRICE") && (
                                            <Badge
                                                className={`text-xs ${ORDER_STATUS_COLORS[
                                                    order.status as keyof typeof ORDER_STATUS_COLORS
                                                ]
                                                    }`}
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
                                            <span className="text-xs text-muted-foreground">
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
                                    <p className="text-xs text-muted-foreground">
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
                        className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-all text-muted-foreground hover:text-foreground hover:bg-accent"
                        title={order.hidden ? t.showOrder : t.hideOrder}
                        aria-label={order.hidden ? t.showOrder : t.hideOrder}
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
            <Card className="bg-card border-border">
                <CardContent className="flex flex-col items-center justify-center py-12">
                    <Package className="h-12 w-12 text-muted-foreground/50" />
                    <p className="mt-3 text-sm text-muted-foreground">{message}</p>
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
                    <h1 className="text-xl font-bold text-foreground">
                        {isAdmin ? t.allOrders : t.myOrders}
                    </h1>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder={t.search}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 w-40 sm:w-48 bg-background border-border h-9 text-sm text-foreground placeholder:text-muted-foreground"
                        />
                    </div>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className={`h-9 border-border bg-background relative ${(statusFilter !== "all" || priorityFilter !== "all" || startDate || endDate || minPrice || maxPrice)
                                    ? "border-violet-500/50 text-violet-400 bg-violet-500/5"
                                    : ""
                                    }`}
                            >
                                <SlidersHorizontal className="h-4 w-4 mr-2" />
                                <span className="hidden sm:inline">{t.filters}</span>
                                {(statusFilter !== "all" || priorityFilter !== "all" || startDate || endDate || minPrice || maxPrice) && (
                                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-violet-500 rounded-full border-2 border-background" />
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 p-4 bg-popover border-border shadow-xl">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-semibold text-foreground text-sm flex items-center gap-2">
                                        <Filter className="h-4 w-4" />
                                        {t.filters}
                                    </h4>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            setStatusFilter("all");
                                            setPriorityFilter("all");
                                            setStartDate("");
                                            setEndDate("");
                                            setMinPrice("");
                                            setMaxPrice("");
                                        }}
                                        className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                                    >
                                        {t.clearFilters}
                                    </Button>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] uppercase tracking-wider text-muted-foreground px-1">{t.status}</Label>
                                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                                            <SelectTrigger className="h-8 text-xs bg-background border-border">
                                                <SelectValue placeholder={t.allStatuses} />
                                            </SelectTrigger>
                                            <SelectContent className="bg-popover border-border">
                                                <SelectItem value="all">{t.allStatuses}</SelectItem>
                                                {Object.entries(statusLabels).map(([key, label]) => (
                                                    <SelectItem key={key} value={key}>{label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] uppercase tracking-wider text-muted-foreground px-1">{t.priority}</Label>
                                        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                                            <SelectTrigger className="h-8 text-xs bg-background border-border">
                                                <SelectValue placeholder={t.allPriorities} />
                                            </SelectTrigger>
                                            <SelectContent className="bg-popover border-border">
                                                <SelectItem value="all">{t.allPriorities}</SelectItem>
                                                <SelectItem value="NORMAL">{t.normal}</SelectItem>
                                                <SelectItem value="URGENT">{t.urgent}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase tracking-wider text-muted-foreground px-1">{t.dateRange}</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="relative">
                                            <Input
                                                type="date"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                                className="h-8 text-[10px] pl-2 pr-1 bg-background border-border"
                                            />
                                            <span className="absolute -top-4 right-1 text-[8px] text-muted-foreground">{t.startDate}</span>
                                        </div>
                                        <div className="relative">
                                            <Input
                                                type="date"
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                                className="h-8 text-[10px] pl-2 pr-1 bg-background border-border"
                                            />
                                            <span className="absolute -top-4 right-1 text-[8px] text-muted-foreground">{t.endDate}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase tracking-wider text-muted-foreground px-1">{t.minPrice} / {t.maxPrice} ($)</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <Input
                                            type="number"
                                            placeholder="0"
                                            value={minPrice}
                                            onChange={(e) => setMinPrice(e.target.value)}
                                            className="h-8 text-xs bg-background border-border"
                                        />
                                        <Input
                                            type="number"
                                            placeholder="1000+"
                                            value={maxPrice}
                                            onChange={(e) => setMaxPrice(e.target.value)}
                                            className="h-8 text-xs bg-background border-border"
                                        />
                                    </div>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>

                    {!isAdmin && (
                        <Link href={`${basePath}/orders/new`}>
                            <Button
                                size="sm"
                                className="h-9 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 shadow-md shadow-violet-500/10"
                            >
                                <Plus className="mr-1 h-4 w-4" />
                                <span className="hidden xs:inline">{t.newOrder}</span>
                            </Button>
                        </Link>
                    )}
                </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="orders" className="w-full">
                <TabsList className="bg-muted w-full justify-start p-1 rounded-xl">
                    <TabsTrigger
                        value="orders"
                        className="rounded-lg data-[state=active]:bg-background data-[state=active]:text-foreground text-muted-foreground"
                    >
                        {t.orders} ({allOrdersFiltered.length})
                    </TabsTrigger>
                    <TabsTrigger
                        value="completed"
                        className="rounded-lg data-[state=active]:bg-background data-[state=active]:text-foreground text-muted-foreground"
                    >
                        {t.completed} ({completedOrders.length})
                    </TabsTrigger>
                    <TabsTrigger
                        value="cancelled"
                        className="rounded-lg data-[state=active]:bg-background data-[state=active]:text-foreground text-muted-foreground"
                    >
                        {t.cancelled} ({cancelledOrders.length})
                    </TabsTrigger>
                    {isAdmin && (
                        <TabsTrigger
                            value="hidden"
                            className="rounded-lg data-[state=active]:bg-background data-[state=active]:text-foreground text-muted-foreground"
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
