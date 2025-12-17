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

export function OrderDetailClient({ order, isAdmin }: OrderDetailClientProps) {
    const router = useRouter();
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
                throw new Error("Güncelleme başarısız");
            }

            toast.success("Sipariş güncellendi");
            router.refresh();
        } catch (error) {
            toast.error("Güncelleme sırasında hata oluştu");
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
                throw new Error("Yükleme başarısız");
            }

            toast.success("Dosyalar yüklendi");
            router.refresh();
        } catch (error) {
            toast.error("Dosya yüklenirken hata oluştu");
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    }

    const formattedComments = order.comments.map((c) => ({
        ...c,
        createdAt: c.createdAt.toISOString(),
    }));

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <Link
                        href="/orders"
                        className="inline-flex items-center text-zinc-400 hover:text-white transition-colors mb-4"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Siparişlere Dön
                    </Link>
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold text-white">{order.title}</h1>
                        <Badge className={ORDER_STATUS_COLORS[order.status]}>
                            {ORDER_STATUS_LABELS[order.status]}
                        </Badge>
                    </div>
                    {isAdmin && (
                        <p className="text-zinc-400 mt-1">
                            Müşteri: {order.customer.name || order.customer.email}
                        </p>
                    )}
                </div>

                {order.price && (
                    <div className="text-right">
                        <p className="text-sm text-zinc-400">Fiyat</p>
                        <p className="text-2xl font-bold text-violet-400">
                            ₺{Number(order.price).toLocaleString("tr-TR")}
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
                                <CardTitle className="text-white text-lg">Açıklama</CardTitle>
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
                            <CardTitle className="text-white text-lg">Dosyalar</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="original" className="w-full">
                                <TabsList className="bg-zinc-800 w-full justify-start">
                                    <TabsTrigger value="original" className="data-[state=active]:bg-zinc-700">
                                        Orijinal ({originalFiles.length})
                                    </TabsTrigger>
                                    <TabsTrigger value="preview" className="data-[state=active]:bg-zinc-700">
                                        Önizleme ({previewFiles.length})
                                    </TabsTrigger>
                                    <TabsTrigger value="final" className="data-[state=active]:bg-zinc-700">
                                        Final ({finalFiles.length})
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="original" className="mt-4">
                                    <FileList files={originalFiles} />
                                </TabsContent>
                                <TabsContent value="preview" className="mt-4 space-y-4">
                                    <FileList files={previewFiles} showPreview />
                                    {isAdmin && (
                                        <div className="pt-4 border-t border-zinc-800">
                                            <Label className="text-zinc-400 text-sm">
                                                Önizleme Dosyası Yükle
                                            </Label>
                                            <input
                                                type="file"
                                                accept="image/*"
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
                                                        Önizleme Yükle
                                                    </span>
                                                </Button>
                                            </label>
                                        </div>
                                    )}
                                </TabsContent>
                                <TabsContent value="final" className="mt-4 space-y-4">
                                    <FileList files={finalFiles} />
                                    {isAdmin && (
                                        <div className="pt-4 border-t border-zinc-800">
                                            <Label className="text-zinc-400 text-sm">
                                                Final Dosyası Yükle
                                            </Label>
                                            <input
                                                type="file"
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
                                                        Final Dosyası Yükle
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
                                Mesajlar & Revizyon Talepleri
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
                            <CardTitle className="text-white text-lg">Sipariş Bilgileri</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm text-zinc-400">Sipariş No</p>
                                <p className="text-white font-mono">{order.id.slice(0, 8)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-zinc-400">Oluşturulma</p>
                                <p className="text-white">
                                    {new Date(order.createdAt).toLocaleDateString("tr-TR", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-zinc-400">Son Güncelleme</p>
                                <p className="text-white">
                                    {new Date(order.updatedAt).toLocaleDateString("tr-TR", {
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
                                    Sipariş Yönetimi
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-zinc-400">Durum</Label>
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
                                    <Label className="text-zinc-400">Fiyat (₺)</Label>
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
                                            Güncelleniyor...
                                        </>
                                    ) : (
                                        "Güncelle"
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
}: {
    files: Array<{
        id: string;
        name: string;
        url: string;
        size: number | null;
    }>;
    showPreview?: boolean;
}) {
    if (files.length === 0) {
        return (
            <div className="text-center py-8 text-zinc-500">
                Henüz dosya yüklenmemiş
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
