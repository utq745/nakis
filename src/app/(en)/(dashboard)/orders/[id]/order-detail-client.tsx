"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    ArrowLeft,
    FileIcon,
    Download,
    Upload,
    Loader2,
    Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import { CommentSection } from "@/components/orders/comment-section";
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS, type OrderStatus } from "@/types";

interface OrderDetailClientProps {
    order: {
        id: string;
        title: string;
        description: string | null;
        status: OrderStatus;
        price: { toString: () => string } | null;
        customerId: string;
        customer: {
            id: string;
            name: string | null;
            email: string;
            role: "CUSTOMER" | "ADMIN";
        };
        files: Array<{
            id: string;
            name: string;
            url: string;
            type: string;
            size: number | null;
            createdAt: Date;
        }>;
        comments: Array<{
            id: string;
            content: string;
            orderId: string;
            userId: string;
            createdAt: Date;
            user: {
                id: string;
                name: string | null;
                email: string;
                role: "CUSTOMER" | "ADMIN";
            };
        }>;
        createdAt: Date;
        updatedAt: Date;
    };
    isAdmin: boolean;
}

import { useLanguage } from "@/components/providers/language-provider";

export function OrderDetailClient({ order, isAdmin }: OrderDetailClientProps) {
    const router = useRouter();
    const { t, language } = useLanguage();
    const [isUpdating, setIsUpdating] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [status, setStatus] = useState<OrderStatus>(order.status);
    const [price, setPrice] = useState(order.price?.toString() || "");

    const originalFiles = order.files.filter((f) => f.type === "original");
    const previewFiles = order.files.filter((f) => f.type === "preview");
    const finalFiles = order.files.filter((f) => f.type === "final");

    async function handleUpdateOrder() {
        setIsUpdating(true);
        try {
            const response = await fetch(`/api/orders/${order.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    status,
                    price: price ? parseFloat(price) : undefined,
                }),
            });

            if (!response.ok) {
                throw new Error(t.orders.updateError);
            }

            toast.success(t.orders.updateSuccess);
            router.refresh();
        } catch (error) {
            toast.error(t.orders.updateError);
            console.error(error);
        } finally {
            setIsUpdating(false);
        }
    }

    async function handleFileUpload(
        e: React.ChangeEvent<HTMLInputElement>,
        type: string
    ) {
        if (!e.target.files?.length) return;

        setIsUploading(true);
        try {
            const formData = new FormData();
            Array.from(e.target.files).forEach((file) => {
                formData.append("files", file);
            });
            formData.append("orderId", order.id);
            formData.append("type", type);

            const response = await fetch("/api/files/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(t.orders.uploadError);
            }

            toast.success(t.orders.uploadSuccess);
            router.refresh();
        } catch (error) {
            toast.error(t.orders.uploadError);
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    }

    const formattedComments = order.comments.map((c) => ({
        ...c,
        createdAt: c.createdAt.toISOString(),
    }));

    const dateLocale = language === "tr" ? "tr-TR" : "en-US";
    const prefix = language === "tr" ? "/tr" : "";

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <Link
                        href={`${prefix}/orders`}
                        className="inline-flex items-center text-zinc-400 hover:text-white transition-colors mb-4"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {t.orders.backToOrders}
                    </Link>
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold text-white">{order.title}</h1>
                        <Badge className={ORDER_STATUS_COLORS[order.status]}>
                            {ORDER_STATUS_LABELS[order.status]}
                        </Badge>
                    </div>
                    {isAdmin && (
                        <p className="text-zinc-400 mt-1">
                            {t.orders.customerName}: {order.customer.name || order.customer.email}
                        </p>
                    )}
                </div>

                {order.price && (
                    <div className="text-right">
                        <p className="text-sm text-zinc-400">{t.orders.price}</p>
                        <p className="text-2xl font-bold text-violet-400">
                            ₺{Number(order.price).toLocaleString(dateLocale)}
                        </p>
                    </div>
                )}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Description */}
                    {order.description && (
                        <Card className="bg-zinc-900 border-zinc-800">
                            <CardHeader>
                                <CardTitle className="text-white text-lg">{t.orders.description}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-zinc-300 whitespace-pre-wrap">
                                    {order.description}
                                </p>
                            </CardContent>
                        </Card>
                    )}

                    {/* Files */}
                    <Card className="bg-zinc-900 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-white text-lg">{t.orders.files}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="original" className="w-full">
                                <TabsList className="bg-zinc-800 w-full justify-start">
                                    <TabsTrigger value="original" className="data-[state=active]:bg-zinc-700">
                                        {t.orders.original} ({originalFiles.length})
                                    </TabsTrigger>
                                    <TabsTrigger value="preview" className="data-[state=active]:bg-zinc-700">
                                        {t.orders.preview} ({previewFiles.length})
                                    </TabsTrigger>
                                    <TabsTrigger value="final" className="data-[state=active]:bg-zinc-700">
                                        {t.orders.final} ({finalFiles.length})
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="original" className="mt-4">
                                    <FileList files={originalFiles} emptyText={t.orders.noFiles} />
                                </TabsContent>
                                <TabsContent value="preview" className="mt-4 space-y-4">
                                    <FileList files={previewFiles} showPreview emptyText={t.orders.noFiles} />
                                    {isAdmin && (
                                        <div className="pt-4 border-t border-zinc-800">
                                            <Label className="text-zinc-400 text-sm">
                                                {t.orders.previewUploadLabel}
                                            </Label>
                                            <input
                                                type="file"
                                                accept=".dst,.dts,image/*,.pdf,.ai,.eps,.svg"
                                                onChange={(e) => handleFileUpload(e, "preview")}
                                                className="hidden"
                                                id="preview-upload"
                                                disabled={isUploading}
                                            />
                                            <label htmlFor="preview-upload">
                                                <Button
                                                    asChild
                                                    variant="outline"
                                                    className="mt-2 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                                                    disabled={isUploading}
                                                >
                                                    <span>
                                                        {isUploading ? (
                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        ) : (
                                                            <Upload className="mr-2 h-4 w-4" />
                                                        )}
                                                        {t.orders.uploadPreview}
                                                    </span>
                                                </Button>
                                            </label>
                                        </div>
                                    )}
                                </TabsContent>
                                <TabsContent value="final" className="mt-4 space-y-4">
                                    <FileList files={finalFiles} emptyText={t.orders.noFiles} />
                                    {isAdmin && (
                                        <div className="pt-4 border-t border-zinc-800">
                                            <Label className="text-zinc-400 text-sm">
                                                {t.orders.finalUploadLabel}
                                            </Label>
                                            <input
                                                type="file"
                                                accept=".dst,.dts,image/*,.pdf,.ai,.eps,.svg"
                                                multiple
                                                onChange={(e) => handleFileUpload(e, "final")}
                                                className="hidden"
                                                id="final-upload"
                                                disabled={isUploading}
                                            />
                                            <label htmlFor="final-upload">
                                                <Button
                                                    asChild
                                                    variant="outline"
                                                    className="mt-2 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                                                    disabled={isUploading}
                                                >
                                                    <span>
                                                        {isUploading ? (
                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        ) : (
                                                            <Upload className="mr-2 h-4 w-4" />
                                                        )}
                                                        {t.orders.uploadFinal}
                                                    </span>
                                                </Button>
                                            </label>
                                        </div>
                                    )}
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>

                    {/* Comments */}
                    <Card className="bg-zinc-900 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-white text-lg">
                                {t.orders.messages}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CommentSection orderId={order.id} initialComments={formattedComments} />
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Order Info */}
                    <Card className="bg-zinc-900 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-white text-lg">{t.orders.orderInfo}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm text-zinc-400">{t.orders.orderNo}</p>
                                <p className="text-white font-mono">{order.id.slice(0, 8)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-zinc-400">{t.orders.created}</p>
                                <p className="text-white">
                                    {new Date(order.createdAt).toLocaleDateString(dateLocale, {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-zinc-400">{t.orders.updated}</p>
                                <p className="text-white">
                                    {new Date(order.updatedAt).toLocaleDateString(dateLocale, {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Admin Controls */}
                    {isAdmin && (
                        <Card className="bg-zinc-900 border-zinc-800">
                            <CardHeader>
                                <CardTitle className="text-white text-lg">
                                    {t.orders.management}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-zinc-400">{t.orders.status}</Label>
                                    <Select
                                        value={status}
                                        onValueChange={(value) => setStatus(value as OrderStatus)}
                                    >
                                        <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-zinc-800 border-zinc-700">
                                            {Object.entries(ORDER_STATUS_LABELS).map(([key, label]) => (
                                                <SelectItem
                                                    key={key}
                                                    value={key}
                                                    className="text-white focus:bg-zinc-700"
                                                >
                                                    {label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-zinc-400">{t.orders.price} (₺)</Label>
                                    <Input
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="0.00"
                                        className="bg-zinc-800 border-zinc-700 text-white"
                                    />
                                </div>

                                <Button
                                    onClick={handleUpdateOrder}
                                    disabled={isUpdating}
                                    className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500"
                                >
                                    {isUpdating ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            {t.common.loading}
                                        </>
                                    ) : (
                                        t.common.update
                                    )}
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}

function FileList({
    files,
    showPreview = false,
    emptyText,
}: {
    files: Array<{
        id: string;
        name: string;
        url: string;
        size: number | null;
    }>;
    showPreview?: boolean;
    emptyText: string;
}) {
    if (files.length === 0) {
        return (
            <div className="text-center py-8 text-zinc-500">
                {emptyText}
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {files.map((file) => (
                <div key={file.id}>
                    {showPreview && file.url.match(/\.(jpg|jpeg|png|gif|webp)$/i) && (
                        <div className="mb-2 rounded-lg overflow-hidden bg-zinc-800">
                            <img
                                src={file.url}
                                alt={file.name}
                                className="w-full h-auto max-h-64 object-contain"
                            />
                        </div>
                    )}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50">
                        <div className="flex items-center gap-3">
                            {showPreview ? (
                                <ImageIcon className="h-5 w-5 text-violet-400" />
                            ) : (
                                <FileIcon className="h-5 w-5 text-violet-400" />
                            )}
                            <div>
                                <p className="text-sm text-white">{file.name}</p>
                                {file.size && (
                                    <p className="text-xs text-zinc-500">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                )}
                            </div>
                        </div>
                        <a href={file.url} target="_blank" rel="noopener noreferrer">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-zinc-400 hover:text-white"
                            >
                                <Download className="h-4 w-4" />
                            </Button>
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
}
