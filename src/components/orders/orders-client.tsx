"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Package, Search, EyeOff, Eye, Rocket, Filter, ChevronDown, X, SlidersHorizontal, Trash2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { ORDER_STATUS_LABELS, ORDER_STATUS_LABELS_TR, ORDER_STATUS_COLORS } from "@/types";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { ActionConfirmDialog } from "./action-confirm-dialog";

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
        deleteSelected: "Delete Selected",
        selected: "selected",
        confirmBulkDelete: "Are you sure you want to delete {count} orders? This action cannot be undone.",
        bulkDeleteSuccess: "Orders deleted successfully",
        bulkDeleteError: "Failed to delete orders",
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
        deleteSelected: "Seçilenleri Sil",
        selected: "seçildi",
        confirmBulkDelete: "{count} siparişi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.",
        bulkDeleteSuccess: "Siparişler başarıyla silindi",
        bulkDeleteError: "Siparişler silinemedi",
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
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isBulkDeleting, setIsBulkDeleting] = useState(false);
    const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false);

    const { allOrders: allOrdersFiltered, completedOrders, cancelledOrders, hiddenOrders } = useMemo(() => {
        const filtered = localOrders.filter((order) => {
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchesSearch = (order.title?.toLowerCase().includes(query) ?? false) ||
                    order.id.toLowerCase().includes(query) ||
                    order.customer.name?.toLowerCase().includes(query) ||
                    order.customer.email.toLowerCase().includes(query);
                if (!matchesSearch) return false;
            }
            if (statusFilter !== "all" && order.status !== statusFilter) return false;
            if (priorityFilter !== "all" && order.priority !== priorityFilter) return false;
            if (startDate) {
                const sDate = new Date(startDate);
                if (new Date(order.createdAt) < sDate) return false;
            }
            if (endDate) {
                const eDate = new Date(endDate);
                eDate.setHours(23, 59, 59, 999);
                if (new Date(order.createdAt) > eDate) return false;
            }
            if (minPrice && (order.price === null || order.price < parseFloat(minPrice))) return false;
            if (maxPrice && (order.price === null || order.price > parseFloat(maxPrice))) return false;
            return true;
        });

        const sortOrders = (orders: typeof filtered) => {
            if (!isAdmin) return orders;
            return [...orders].sort((a, b) => {
                const aPriorityStatus = (a.status === "ORDERED" && !a.price) || a.status === "REVISION" ? 1 : 0;
                const bPriorityStatus = (b.status === "ORDERED" && !b.price) || b.status === "REVISION" ? 1 : 0;
                if (aPriorityStatus !== bPriorityStatus) return bPriorityStatus - aPriorityStatus;
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            });
        };

        return {
            allOrders: sortOrders(filtered.filter(
                (o) => o.status !== "COMPLETED" && o.status !== "DELIVERED" && o.status !== "CANCELLED" && !o.hidden
            )),
            completedOrders: filtered.filter(
                (o) => (o.status === "COMPLETED" || o.status === "DELIVERED") && !o.hidden
            ),
            cancelledOrders: filtered.filter(
                (o) => o.status === "CANCELLED" && !o.hidden
            ),
            hiddenOrders: filtered.filter((o) => o.hidden),
        };
    }, [localOrders, searchQuery, isAdmin, statusFilter, priorityFilter, startDate, endDate, minPrice, maxPrice]);

    async function toggleHidden(orderId: string, currentHidden: boolean) {
        try {
            const response = await fetch(`/api/orders/${orderId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ hidden: !currentHidden }),
            });
            if (!response.ok) throw new Error();
            setLocalOrders((prev) =>
                prev.map((o) => o.id === orderId ? { ...o, hidden: !currentHidden } : o)
            );
            toast.success(currentHidden ? t.orderRestored : t.orderHidden);
        } catch {
            toast.error(t.updateFailed);
        }
    }

    async function handleBulkDelete() {
        if (selectedIds.length === 0) return;
        setIsBulkDeleting(true);
        try {
            const response = await fetch(`/api/orders?ids=${selectedIds.join(",")}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error();
            setLocalOrders((prev) => prev.filter((o) => !selectedIds.includes(o.id)));
            toast.success(t.bulkDeleteSuccess);
            setSelectedIds([]);
            setIsBulkDeleteDialogOpen(false);
        } catch {
            toast.error(t.bulkDeleteError);
        } finally {
            setIsBulkDeleting(false);
        }
    }

    function toggleSelection(orderId: string) {
        setSelectedIds((prev) =>
            prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]
        );
    }

    function OrderCard({ order }: { order: Order }) {
        const needsPrice = isAdmin && order.status === "ORDERED" && !order.price;
        const isAdminActionRequired = isAdmin && (order.status === "REVISION" || (order.status === "ORDERED" && !order.price));
        const basePath = locale === "tr" ? "/tr" : "";
        const isSelected = selectedIds.includes(order.id);

        return (
            <div className="relative group flex items-start gap-2">
                {isAdmin && (
                    <div className="pt-4 px-1">
                        <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => toggleSelection(order.id)}
                            className="border-muted-foreground/30 data-[state=checked]:bg-violet-500 data-[state=checked]:border-violet-500"
                        />
                    </div>
                )}
                <Link href={`${basePath}/orders/${order.id}`} className="flex-1">
                    <Card
                        className={`border transition-all cursor-pointer duration-200 hover:scale-[1.005] ${isSelected ? "border-violet-500 bg-violet-500/5 shadow-md shadow-violet-500/5" : ""} ${isAdminActionRequired
                            ? "bg-violet-500/5 border-violet-500/50 hover:border-violet-400 hover:bg-violet-500/10"
                            : needsPrice
                                ? "bg-amber-500/5 border-amber-700/50 hover:border-amber-600"
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
                                        <span className="text-xs font-mono text-muted-foreground">#{order.id.slice(-8)}</span>
                                        {!isAdminActionRequired && (
                                            <Badge className={`text-xs ${ORDER_STATUS_COLORS[order.status as keyof typeof ORDER_STATUS_COLORS]}`}>
                                                {statusLabels[order.status as keyof typeof statusLabels]}
                                            </Badge>
                                        )}
                                        {needsPrice && <Badge className="bg-amber-600 text-white text-xs">{t.needsPrice}</Badge>}
                                        {isAdmin && <span className="text-xs text-muted-foreground">• {order.customer.name || order.customer.email}</span>}
                                    </div>
                                </div>
                                <div className="text-right shrink-0">
                                    {order.price && <p className="text-sm font-medium text-violet-400">${Number(order.price).toLocaleString("en-US")}</p>}
                                    <p className="text-xs text-muted-foreground">
                                        {new Date(order.createdAt).toLocaleDateString(locale === "tr" ? "tr-TR" : "en-US", { day: "numeric", month: "short" })}
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
                    >
                        {order.hidden ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
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
            {isAdmin && selectedIds.length > 0 && (
                <div className="sticky top-20 z-40 flex items-center justify-between p-3 rounded-xl bg-violet-600 shadow-xl shadow-violet-500/20 text-white animate-in slide-in-from-top-4 duration-300">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center size-6 rounded-full bg-white/20 text-xs font-bold">{selectedIds.length}</div>
                        <span className="text-sm font-medium">{t.selected}</span>
                        <div className="h-4 w-px bg-white/20 mx-1" />
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedIds([])}
                            className="text-white/80 hover:text-white hover:bg-white/10 h-8 px-2 text-xs"
                        >
                            {t.clearFilters}
                        </Button>
                    </div>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setIsBulkDeleteDialogOpen(true)}
                        className="bg-red-500 hover:bg-red-600 text-white border-none h-8 px-3 text-xs gap-1.5 font-bold"
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                        {t.deleteSelected}
                    </Button>
                </div>
            )}

            <div className="flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-bold text-foreground">{isAdmin ? t.allOrders : t.myOrders}</h1>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder={t.search}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 w-40 sm:w-48 bg-background border-border h-9 text-sm text-foreground"
                        />
                    </div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className={`h-9 border-border bg-background relative ${(statusFilter !== "all" || priorityFilter !== "all" || startDate || endDate || minPrice || maxPrice) ? "border-violet-500/50 text-violet-400 bg-violet-500/5" : ""}`}
                            >
                                <SlidersHorizontal className="h-4 w-4 mr-2" />
                                <span className="hidden sm:inline">{t.filters}</span>
                                {(statusFilter !== "all" || priorityFilter !== "all" || startDate || endDate || minPrice || maxPrice) && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-violet-500 rounded-full border-2 border-background" />}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 p-4 bg-popover border-border shadow-xl">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-semibold text-foreground text-sm flex items-center gap-2"><Filter className="h-4 w-4" />{t.filters}</h4>
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
                                            <SelectTrigger className="h-8 text-xs bg-background border-border"><SelectValue placeholder={t.allStatuses} /></SelectTrigger>
                                            <SelectContent className="bg-popover border-border">
                                                <SelectItem value="all">{t.allStatuses}</SelectItem>
                                                {Object.entries(statusLabels).map(([key, label]) => <SelectItem key={key} value={key}>{label}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] uppercase tracking-wider text-muted-foreground px-1">{t.priority}</Label>
                                        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                                            <SelectTrigger className="h-8 text-xs bg-background border-border"><SelectValue placeholder={t.allPriorities} /></SelectTrigger>
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
                                        <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="h-8 text-[10px] bg-background border-border" />
                                        <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="h-8 text-[10px] bg-background border-border" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase tracking-wider text-muted-foreground px-1">{t.minPrice} / {t.maxPrice} ($)</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <Input type="number" placeholder="0" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="h-8 text-xs bg-background border-border" />
                                        <Input type="number" placeholder="1000+" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="h-8 text-xs bg-background border-border" />
                                    </div>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                    {!isAdmin && (
                        <Link href={`${basePath}/orders/new`}>
                            <Button size="sm" className="h-9 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 shadow-md">
                                <Plus className="mr-1 h-4 w-4" /><span className="hidden xs:inline">{t.newOrder}</span>
                            </Button>
                        </Link>
                    )}
                </div>
            </div>

            <Tabs defaultValue="orders" className="w-full">
                <TabsList className="bg-muted w-full justify-start p-1 rounded-xl">
                    <TabsTrigger value="orders" className="rounded-lg">{t.orders} ({allOrdersFiltered.length})</TabsTrigger>
                    <TabsTrigger value="completed" className="rounded-lg">{t.completed} ({completedOrders.length})</TabsTrigger>
                    <TabsTrigger value="cancelled" className="rounded-lg">{t.cancelled} ({cancelledOrders.length})</TabsTrigger>
                    {isAdmin && <TabsTrigger value="hidden" className="rounded-lg">{t.hidden} ({hiddenOrders.length})</TabsTrigger>}
                </TabsList>

                <TabsContent value="orders" className="mt-4">
                    {allOrdersFiltered.length === 0 ? <EmptyState message={t.noActiveOrders} /> : <div className="grid gap-3">{allOrdersFiltered.map((o) => <OrderCard key={o.id} order={o} />)}</div>}
                </TabsContent>
                <TabsContent value="completed" className="mt-4">
                    {completedOrders.length === 0 ? <EmptyState message={t.noCompletedOrders} /> : <div className="grid gap-3">{completedOrders.map((o) => <OrderCard key={o.id} order={o} />)}</div>}
                </TabsContent>
                <TabsContent value="cancelled" className="mt-4">
                    {cancelledOrders.length === 0 ? <EmptyState message={t.noCancelledOrders} /> : <div className="grid gap-3">{cancelledOrders.map((o) => <OrderCard key={o.id} order={o} />)}</div>}
                </TabsContent>
                {isAdmin && (
                    <TabsContent value="hidden" className="mt-4">
                        {hiddenOrders.length === 0 ? <EmptyState message={t.noHiddenOrders} /> : <div className="grid gap-3">{hiddenOrders.map((o) => <OrderCard key={o.id} order={o} />)}</div>}
                    </TabsContent>
                )}
            </Tabs>

            <ActionConfirmDialog
                isOpen={isBulkDeleteDialogOpen}
                onOpenChange={setIsBulkDeleteDialogOpen}
                onConfirm={handleBulkDelete}
                isPending={isBulkDeleting}
                title={locale === "tr" ? "Siparişleri Sil" : "Delete Orders"}
                description={t.confirmBulkDelete.replace("{count}", selectedIds.length.toString())}
                confirmText={t.deleteSelected}
                cancelText={locale === "tr" ? "Vazgeç" : "Cancel"}
                variant="destructive"
            />
        </div>
    );
}
