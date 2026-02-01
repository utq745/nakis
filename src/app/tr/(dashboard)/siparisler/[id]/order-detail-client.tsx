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
    CheckCircle2,
    Image as ImageIcon,
    ChevronDown,
    CreditCard,
    Lock,
    Trash2,
    Eye,
    Send,
    DollarSign,
    ClipboardList,
    X,
    Archive,
    RefreshCcw,
    FilePlus,
    Package,
} from "lucide-react";
import { toast } from "sonner";
import { CommentSection } from "@/components/orders/comment-section";
import { WilcomSection } from "@/components/orders/wilcom-section";
import { ORDER_STATUS_LABELS_TR as ORDER_STATUS_LABELS, ORDER_STATUS_COLORS, type OrderStatus } from "@/types";
import { useLanguage } from "@/components/providers/language-provider";
import { ActionConfirmDialog } from "@/components/orders/action-confirm-dialog";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface WilcomColor {
    code: string;
    name: string;
    hex: string;
    stitches: number;
    threadUsedM: number;
    chart: string;
}

interface WilcomColorSequenceItem {
    stop: number;
    colorCode: string;
    colorName: string;
    hex: string;
    stitches: number;
    threadUsedM: number;
}

interface WilcomData {
    id: string;
    designName: string;
    title: string | null;
    heightMm: number;
    widthMm: number;
    stitchCount: number;
    colorCount: number;
    colorway: string | null;
    machineFormat: string | null;
    machineRuntime: string | null;
    colorChanges: number | null;
    stops: number | null;
    trims: number | null;
    maxStitchMm: number | null;
    minStitchMm: number | null;
    maxJumpMm: number | null;
    totalThreadM: number | null;
    totalBobbinM: number | null;
    colors: WilcomColor[];
    colorSequence: WilcomColorSequenceItem[];
    designImageUrl: string | null;
    operatorApprovalPdf: string | null;
    customerApprovalPdf: string | null;
    wilcomPdfUrl: string | null;
    createdAt: string;
    updatedAt: string;
}

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
            notes: string | null;
        };
        serviceType: string | null;
        files: Array<{
            id: string;
            name: string;
            url: string;
            type: string;
            size: number | null;
            createdAt: string;
        }>;
        comments: Array<{
            id: string;
            content: string;
            orderId: string;
            userId: string;
            createdAt: string;
            user: {
                id: string;
                name: string | null;
                email: string;
                role: "CUSTOMER" | "ADMIN";
            };
        }>;
        wilcomData: WilcomData | null;
        createdAt: string;
        updatedAt: string;
    };
    isAdmin: boolean;
}

export function OrderDetailClient({ order, isAdmin }: OrderDetailClientProps) {
    const router = useRouter();
    const { t, language } = useLanguage();
    const [isUpdating, setIsUpdating] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [status, setStatus] = useState<OrderStatus>(order.status);
    const [price, setPrice] = useState(order.price?.toString() || "");
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [fileToDelete, setFileToDelete] = useState<string | null>(null);
    const [isDeletingFile, setIsDeletingFile] = useState(false);
    const [isApprovingPrice, setIsApprovingPrice] = useState(false);
    const [isDecliningPrice, setIsDecliningPrice] = useState(false);
    const [isDeclineDialogOpen, setIsDeclineDialogOpen] = useState(false);
    const [isApprovingPreview, setIsApprovingPreview] = useState(false);
    const [isSendingPreview, setIsSendingPreview] = useState(false);
    const [hasNewPreviewFiles, setHasNewPreviewFiles] = useState(false);
    const [customerNotes, setCustomerNotes] = useState(order.customer.notes || "");
    const [isUpdatingNotes, setIsUpdatingNotes] = useState(false);
    const [isRevisionDialogOpen, setIsRevisionDialogOpen] = useState(false);
    const [revisionMessage, setRevisionMessage] = useState("");
    const [isSubmittingRevision, setIsSubmittingRevision] = useState(false);
    const [selectedRevisionFiles, setSelectedRevisionFiles] = useState<File[]>([]);
    const [stitchCount, setStitchCount] = useState<number | "">("");
    const [isSendingQuote, setIsSendingQuote] = useState(false);
    const [isPriceExplainerOpen, setIsPriceExplainerOpen] = useState(false);

    const calculatePrice = (stitches: number) => {
        let digitizing = 0;
        let approval = 0;
        let extra = 0;

        if (stitches <= 7000) {
            digitizing = 25;
            approval = 25;
        } else if (stitches < 30000) {
            digitizing = 25;
            approval = 25;
            extra = 3 * Math.ceil((stitches - 7000) / 1000);
        } else {
            digitizing = 120;
            approval = 35;
        }

        return {
            total: digitizing + approval + extra,
            digitizing,
            approval,
            extra
        };
    };

    const breakdown = stitchCount !== "" ? calculatePrice(Number(stitchCount)) : null;

    async function handleSendQuote() {
        if (!price) {
            toast.error("Lütfen bir fiyat girin.");
            return;
        }

        setIsSendingQuote(true);
        try {
            const response = await fetch(`/api/orders/${order.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    status: "PRICED",
                    price: parseFloat(price),
                }),
            });

            if (!response.ok) throw new Error("Fiyat teklifi gönderilemedi.");

            toast.success("Fiyat teklifi müşteriye gönderildi.");
            setStatus("PRICED");
            setTimeout(() => router.refresh(), 1000);
        } catch (error) {
            toast.error("İşlem sırasında bir hata oluştu.");
            console.error(error);
        } finally {
            setIsSendingQuote(false);
        }
    }

    async function handleAcceptQuote() {
        setIsApprovingPrice(true);
        try {
            const response = await fetch(`/api/orders/${order.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "IN_PROGRESS" }),
            });

            if (!response.ok) throw new Error("Teklif onaylanamadı.");

            toast.success("Fiyat teklifini onayladınız. Siparişiniz hazırlanıyor.");
            setStatus("IN_PROGRESS");
            setTimeout(() => router.refresh(), 1000);
        } catch (error) {
            toast.error("İşlem sırasında bir hata oluştu.");
            console.error(error);
        } finally {
            setIsApprovingPrice(false);
        }
    }

    const originalFiles = order.files.filter((f) => f.type === "original");
    const previewFiles = order.files.filter((f) => f.type === "preview");
    const finalFiles = order.files.filter((f) => f.type === "final");

    function handleDeleteFile(fileId: string) {
        setFileToDelete(fileId);
        setIsDeleteDialogOpen(true);
    }

    async function performDelete() {
        if (!fileToDelete) return;

        setIsDeletingFile(true);
        try {
            const response = await fetch(`/api/files/${fileToDelete}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Silme işlemi başarısız");
            }

            toast.success(t.common?.deleteSuccess || "Dosya silindi");
            setIsDeleteDialogOpen(false);
            setFileToDelete(null);
            router.refresh();
        } catch (error: any) {
            toast.error(error.message || "Dosya silinirken hata oluştu");
            console.error(error);
        } finally {
            setIsDeletingFile(false);
        }
    }

    async function handleUpdateOrder() {
        setIsUpdating(true);
        try {
            const response = await fetch(`/api/orders/${order.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    status,
                }),
            });

            if (!response.ok) {
                throw new Error("Güncelleme başarısız");
            }

            toast.success("Sipariş güncellendi");

            // Kullanıcının başarı mesajını görmesi için 2 saniye bekleyelim
            setTimeout(() => {
                window.location.reload();
                setIsUpdating(false);
            }, 2000);
        } catch (error) {
            toast.error("Güncelleme sırasında hata oluştu");
            console.error(error);
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
                const errorData = await response.json();
                throw new Error(errorData.error || "Yükleme başarısız");
            }

            toast.success("Dosyalar yüklendi");
            if (type === "preview") {
                setHasNewPreviewFiles(true);
                router.refresh();
            } else if (type === "final") {
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                router.refresh();
            }
        } catch (error: any) {
            toast.error(error.message || "Dosya yüklenirken hata oluştu");
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    }

    async function handleCancelOrder() {
        setIsDecliningPrice(true);
        try {
            const response = await fetch(`/api/orders/${order.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "CANCELLED" }),
            });

            if (!response.ok) throw new Error("İptal işlemi başarısız");

            toast.success("Sipariş iptal edildi.");

            setStatus("CANCELLED");
            setIsDeclineDialogOpen(false);

            setTimeout(() => {
                router.refresh();
                setIsDecliningPrice(false);
            }, 1000);
        } catch (error) {
            toast.error("İşlem sırasında hata oluştu");
            console.error(error);
            setIsDecliningPrice(false);
        }
    }

    async function handlePreviewApproval() {
        setIsApprovingPreview(true);
        try {
            const response = await fetch(`/api/orders/${order.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "IN_PROGRESS" }),
            });

            if (!response.ok) throw new Error("Önizleme onayı başarısız");

            toast.success("Tasarım önizlemesi onaylandı.");

            // Update local state for immediate feedback
            setStatus("IN_PROGRESS");

            setTimeout(() => {
                router.refresh();
                setIsApprovingPreview(false);
            }, 1000);
        } catch (error) {
            toast.error("İşlem sırasında hata oluştu");
            console.error(error);
            setIsApprovingPreview(false);
        }
    }

    async function handleRevisionRequest() {
        if (!revisionMessage.trim()) {
            toast.error("Lütfen revizyon notlarınızı girin.");
            return;
        }

        setIsSubmittingRevision(true);
        try {
            let uploadedFileIds: string[] = [];

            // 1. Upload files if any
            if (selectedRevisionFiles.length > 0) {
                const formData = new FormData();
                selectedRevisionFiles.forEach((file) => {
                    formData.append("files", file);
                });
                formData.append("orderId", order.id);
                formData.append("type", "comment");

                const uploadRes = await fetch("/api/files/upload", {
                    method: "POST",
                    body: formData,
                });

                if (uploadRes.ok) {
                    const uploadData = await uploadRes.json();
                    uploadedFileIds = uploadData.files.map((f: any) => f.id);
                }
            }

            // 2. Create comment
            const commentRes = await fetch("/api/comments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    content: revisionMessage,
                    orderId: order.id,
                    fileIds: uploadedFileIds,
                }),
            });

            if (!commentRes.ok) throw new Error("Mesaj gönderilemedi");

            // 3. Update order status to REVISION
            const orderRes = await fetch(`/api/orders/${order.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "REVISION" }),
            });

            if (!orderRes.ok) throw new Error("Durum güncellenemedi");

            toast.success("Revizyon talebiniz başarıyla iletildi.");
            setIsRevisionDialogOpen(false);

            // Reload to show new status and message
            setTimeout(() => {
                window.location.reload();
            }, 1000);

        } catch (error) {
            toast.error("Hata oluştu, lütfen tekrar deneyin.");
            console.error(error);
        } finally {
            setIsSubmittingRevision(false);
        }
    }

    async function handleSendPreview() {
        setIsSendingPreview(true);
        try {
            const response = await fetch(`/api/orders/${order.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "APPROVAL_AWAITING" }),
            });

            if (!response.ok) throw new Error("Önizleme gönderilemedi");

            toast.success(t.orders.previewSent);

            // Update local state for immediate feedback
            setStatus("APPROVAL_AWAITING");
            setHasNewPreviewFiles(false); // Reset after sending

            setTimeout(() => {
                router.refresh();
                setIsSendingPreview(false);
            }, 1000);
        } catch (error) {
            toast.error(t.orders.updateError);
            console.error(error);
            setIsSendingPreview(false);
        }
    }

    async function handleUpdateCustomerNotes() {
        setIsUpdatingNotes(true);
        try {
            const response = await fetch(`/api/admin/users/${order.customer.id}/notes`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ notes: customerNotes }),
            });

            if (!response.ok) throw new Error("Notlar güncellenemedi");

            toast.success("Müşteri notları güncellendi");
            router.refresh();
        } catch (error) {
            toast.error("Notlar güncellenemedi");
            console.error(error);
        } finally {
            setIsUpdatingNotes(false);
        }
    }

    const formattedComments = order.comments;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <Link
                        href="/tr/siparisler"
                        className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-4"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Siparişlere Dön
                    </Link>
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold text-foreground">{order.title}</h1>
                        <Badge className={ORDER_STATUS_COLORS[order.status]}>
                            {ORDER_STATUS_LABELS[order.status]}
                        </Badge>
                    </div>
                </div>
            </div>

            {/* Admin - New Order Received Banner */}
            {isAdmin && status === "ORDERED" && (
                <Card className="border-blue-500/50 bg-blue-500/5 overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-full bg-blue-500/20 text-blue-400">
                                    <Package className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground">
                                        Yeni sipariş alındı
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {order.serviceType === "New Digitizing + Sample"
                                            ? "Bu sipariş için fiyat teklifi hazırlamanız gerekiyor. Lütfen vuruş sayısını girin."
                                            : order.serviceType === "Approval Sample (Existing DST)"
                                                ? "Bu sipariş Paket 1 (Onay Örneği). Önizleme dosyalarını yükleyip müşteriye gönderin."
                                                : "Bu sipariş için çalışmaya başlayın ve final dosyalarını hazırlayın."}
                                    </p>
                                </div>
                            </div>

                            {order.serviceType === "New Digitizing + Sample" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 rounded-xl bg-accent/50 border border-border">
                                    <div className="space-y-2">
                                        <Label className="text-xs text-muted-foreground uppercase tracking-wider">Vuruş Sayısı (Stitch Count)</Label>
                                        <Input
                                            type="number"
                                            value={stitchCount}
                                            onChange={(e) => {
                                                const val = e.target.value === "" ? "" : Number(e.target.value);
                                                setStitchCount(val);
                                                if (val !== "") {
                                                    const b = calculatePrice(val);
                                                    setPrice(b.total.toString());
                                                }
                                            }}
                                            placeholder="Örn: 15000"
                                            className="bg-background border-border"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs text-muted-foreground uppercase tracking-wider">Fiyat ($)</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                type="number"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                className="bg-background border-border font-bold text-violet-500"
                                            />
                                            <Button
                                                onClick={handleSendQuote}
                                                disabled={isSendingQuote || !price}
                                                className="bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-500/20 px-6"
                                            >
                                                {isSendingQuote ? <Loader2 className="h-4 w-4 animate-spin" /> : "Teklif Gönder"}
                                            </Button>
                                        </div>
                                    </div>

                                    {breakdown && (
                                        <div className="md:col-span-2 lg:col-span-1 p-3 rounded-lg bg-violet-500/5 border border-violet-500/10 flex flex-col justify-center">
                                            <p className="text-xs font-semibold text-violet-400 mb-1">HESAPLAMA DETAYI:</p>
                                            <div className="grid grid-cols-3 gap-2 text-[10px] text-muted-foreground">
                                                <div>Digitizing: <span className="text-foreground font-medium">${breakdown.digitizing}</span></div>
                                                <div>Approval: <span className="text-foreground font-medium">${breakdown.approval}</span></div>
                                                {breakdown.extra > 0 && <div>Extra: <span className="text-foreground font-medium">${breakdown.extra}</span></div>}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Customer - Order Received Banner */}
            {!isAdmin && status === "ORDERED" && (
                <Card className="border-blue-500/50 bg-blue-500/5 overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4 text-center md:text-left">
                                <div className="p-3 rounded-full bg-blue-500/20 text-blue-400">
                                    <Loader2 className="h-6 w-6 animate-spin" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground">
                                        {order.serviceType === "New Digitizing + Sample" ? "Fiyat Teklifi Bekleniyor" : "Siparişiniz Alındı"}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {order.serviceType === "New Digitizing + Sample"
                                            ? "Tasarımınız inceleniyor. Vuruş sayısına göre en kısa sürede fiyat teklifimiz gönderilecektir."
                                            : "Siparişiniz inceleniyor. Yakında size dönüş yapılacaktır."}
                                    </p>
                                </div>
                            </div>
                            <Button
                                onClick={() => setIsDeclineDialogOpen(true)}
                                disabled={isDecliningPrice}
                                variant="outline"
                                className="w-full md:w-auto border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white transition-all gap-2"
                            >
                                <X className="h-4 w-4" />
                                Siparişi İptal Et
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Customer - Price Quote Approval Banner */}
            {!isAdmin && status === "PRICED" && (
                <Card className="border-cyan-500/50 bg-cyan-500/5 overflow-hidden shadow-2xl shadow-cyan-500/10">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4 text-center md:text-left">
                                <div className="p-3 rounded-full bg-cyan-500/20 text-cyan-400">
                                    <DollarSign className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground">
                                        Fiyat Teklifiniz Hazır
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Bu tasarım için belirlenen toplam ücret: <span className="text-cyan-400 font-bold">${Number(order.price).toLocaleString("en-US")}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                                <Button
                                    onClick={() => setIsDeclineDialogOpen(true)}
                                    variant="outline"
                                    className="w-full sm:w-auto border-zinc-500/50 text-zinc-400 hover:bg-zinc-800 transition-all gap-2"
                                >
                                    <X className="h-4 w-4" />
                                    Reddet
                                </Button>
                                <Button
                                    onClick={handleAcceptQuote}
                                    disabled={isApprovingPrice}
                                    className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/20 transition-all gap-2"
                                >
                                    {isApprovingPrice ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Onaylanıyor...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle2 className="h-4 w-4" />
                                            Teklifi Kabul Et
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Admin Waiting for Preview Approval Banner */}
            {isAdmin && status === "APPROVAL_AWAITING" && (
                <Card className="border-orange-500/50 bg-orange-500/5 overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-full bg-orange-500/20 text-orange-400">
                                <ImageIcon className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-foreground">
                                    Müşteri önizlemeyi inceliyor
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Önizleme dosyaları gönderildi. Müşterinin onayı bekleniyor.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Admin Revision Requested Banner */}
            {isAdmin && status === "REVISION" && (
                <Card className="border-red-500/50 bg-red-500/5 overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-full bg-red-500/20 text-red-400">
                                <RefreshCcw className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-foreground">
                                    Müşteri revizyon talep etti
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Müşteriden gelen mesajı kontrol edin ve gerekli güncellemeleri yaparak yeni önizleme dosyalarını yükleyin.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Admin Final Files Upload Warning Banner */}
            {isAdmin && status === "IN_PROGRESS" && (
                <Card className="border-purple-500/50 bg-purple-500/5 overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-full bg-purple-500/20 text-purple-400">
                                <Send className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-foreground">
                                    Final dosyalarını göndermeniz bekleniyor
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Müşteri önizlemeyi onayladı. Şimdi final dosyalarını yükleyin.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Preview Approval Banner for Customer */}
            {!isAdmin && status === "APPROVAL_AWAITING" && (
                <Card className="border-orange-500/50 bg-orange-500/5 overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4 text-center md:text-left">
                                <div className="p-3 rounded-full bg-orange-500/20 text-orange-400">
                                    <ImageIcon className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground">
                                        {t.orders.previewApprovalTitle}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {t.orders.previewApprovalDesc}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                                <Button
                                    onClick={() => setIsRevisionDialogOpen(true)}
                                    variant="outline"
                                    className="w-full sm:w-auto border-orange-500/50 text-orange-500 hover:bg-orange-600 hover:text-white dark:hover:bg-orange-500 transition-all gap-2"
                                >
                                    <RefreshCcw className="h-4 w-4" />
                                    {t.orders.requestRevision}
                                </Button>
                                <Button
                                    onClick={handlePreviewApproval}
                                    disabled={isApprovingPreview}
                                    className="w-full sm:w-auto bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-500/20 transition-all gap-2"
                                >
                                    {isApprovingPreview ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            {t.common.loading}
                                        </>
                                    ) : (
                                        <>
                                            <ImageIcon className="h-4 w-4" />
                                            {t.orders.approvePreview}
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Payment Banner for Customer */}
            {!isAdmin && status === "PAYMENT_PENDING" && (
                <Card className="border-fuchsia-500/50 bg-fuchsia-500/5 overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4 text-center md:text-left">
                                <div className="p-3 rounded-full bg-fuchsia-500/20 text-fuchsia-400">
                                    <CreditCard className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground">
                                        {t.orders.payButton}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {t.orders.paymentPendingDesc}
                                    </p>
                                </div>
                            </div>
                            <Link href={`/tr/siparisler/${order.id}/payment`} className="w-full md:w-auto">
                                <Button className="w-full md:w-auto bg-fuchsia-600 hover:bg-fuchsia-500 text-white gap-2">
                                    <CreditCard className="h-4 w-4" />
                                    {t.orders.payButton}
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Files */}
                    {/* Files */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-foreground text-lg">Dosyalar</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="original" className="w-full">
                                <TabsList className="bg-accent w-full justify-start">
                                    <TabsTrigger value="original" className="text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground">
                                        Müşteri Dosyaları ({originalFiles.length})
                                    </TabsTrigger>
                                    <TabsTrigger value="preview" className="text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground">
                                        Önizleme ({previewFiles.length})
                                    </TabsTrigger>
                                    <TabsTrigger value="final" className="text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground">
                                        Final ({finalFiles.length})
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="original" className="mt-4">
                                    <FileList
                                        files={originalFiles}
                                        isAdmin={isAdmin}
                                        onDelete={handleDeleteFile}
                                        canDelete={isAdmin && order.status !== "PAYMENT_PENDING" && order.status !== "COMPLETED"}
                                    />
                                </TabsContent>
                                <TabsContent value="preview" className="mt-4 space-y-4">
                                    <FileList
                                        files={previewFiles}
                                        showPreview
                                        isAdmin={isAdmin}
                                        onDelete={handleDeleteFile}
                                        canDelete={isAdmin && order.status !== "PAYMENT_PENDING" && order.status !== "COMPLETED"}
                                    />
                                    {isAdmin && (
                                        <div className="pt-4 border-t border-border">
                                            <Label className="text-muted-foreground text-sm">
                                                Önizleme Dosyası Yükle
                                            </Label>
                                            <input
                                                type="file"
                                                accept=".dst,.dts,image/*,.pdf,.ai,.eps,.svg"
                                                onChange={(e) => handleFileUpload(e, "preview")}
                                                className="hidden"
                                                id="preview-upload"
                                                disabled={isUploading}
                                            />
                                            <div className="flex items-center justify-between gap-3 mt-2">
                                                <label htmlFor="preview-upload" className="flex-1">
                                                    <Button
                                                        asChild
                                                        variant="outline"
                                                        className="w-full border-violet-500 bg-violet-600 text-white hover:bg-violet-500 hover:text-white"
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
                                                {hasNewPreviewFiles && (
                                                    <Button
                                                        onClick={handleSendPreview}
                                                        disabled={isSendingPreview}
                                                        className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white"
                                                    >
                                                        {isSendingPreview ? (
                                                            <>
                                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                                {t.common.loading}
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Send className="mr-2 h-4 w-4" />
                                                                {t.orders.sendPreview}
                                                            </>
                                                        )}
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </TabsContent>
                                <TabsContent value="final" className="mt-4 space-y-4">
                                    <FileList
                                        files={finalFiles}
                                        isLocked={!isAdmin && !["COMPLETED", "DELIVERED", "COMPLETED"].includes(status)}
                                        isAdmin={isAdmin}
                                        onDelete={handleDeleteFile}
                                        canDelete={isAdmin && !["PAYMENT_PENDING", "COMPLETED", "DELIVERED", "COMPLETED"].includes(order.status)}
                                    />
                                    {/* Müşteri Toplu İndirme Butonu */}
                                    {!isAdmin && finalFiles.length > 1 && ["COMPLETED", "DELIVERED", "COMPLETED"].includes(status) && (
                                        <div className="pt-4 border-t border-border">
                                            <Button
                                                onClick={() => {
                                                    const link = document.createElement('a');
                                                    link.href = `/api/orders/${order.id}/download-finals`;
                                                    link.download = `${order.title || 'Sipariş'}_Finals.zip`;
                                                    document.body.appendChild(link);
                                                    link.click();
                                                    document.body.removeChild(link);
                                                    toast.success("Dosyalar indiriliyor...");
                                                }}
                                                variant="outline"
                                                className="w-full border-emerald-500 bg-emerald-600 text-white hover:bg-emerald-500 hover:text-white"
                                            >
                                                <Archive className="mr-2 h-4 w-4" />
                                                Tümünü İndir (ZIP)
                                            </Button>
                                        </div>
                                    )}
                                    {isAdmin && (
                                        <div className="pt-4 border-t border-border">
                                            <Label className="text-muted-foreground text-sm">
                                                Final Dosyası Yükle
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
                                                    className="mt-2 border-violet-500 bg-violet-600 text-white hover:bg-violet-500 hover:text-white"
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

                    {/* Wilcom Design Data - Admin Only, visible after preview approval */}
                    {isAdmin && ["IN_PROGRESS", "PAYMENT_PENDING", "COMPLETED", "DELIVERED", "COMPLETED"].includes(order.status) && (
                        <WilcomSection
                            orderId={order.id}
                            wilcomData={order.wilcomData}
                            isAdmin={isAdmin}
                            status={order.status}
                        />
                    )}

                    {/* Comments */}
                    <CommentSection orderId={order.id} initialComments={formattedComments} status={status} />
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Order Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-foreground text-lg">Sipariş Bilgileri</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-0">
                            {isAdmin && (
                                <div className="flex justify-between items-center py-1.5 border-b border-border">
                                    <span className="text-foreground font-medium">Müşteri</span>
                                    <span className="text-sm text-muted-foreground">{order.customer.name || order.customer.email}</span>
                                </div>
                            )}
                            <div className="flex justify-between items-center py-1.5 border-b border-border">
                                <span className="text-foreground font-medium">Sipariş No</span>
                                <span className="text-sm text-muted-foreground font-mono">{order.id.slice(-8)}</span>
                            </div>
                            <div className="flex justify-between items-center py-1.5 border-b border-border">
                                <span className="text-foreground font-medium">Oluşturulma</span>
                                <span className="text-sm text-muted-foreground">
                                    {new Date(order.createdAt).toLocaleDateString("tr-TR", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-1.5 border-b border-border">
                                <span className="text-foreground font-medium">Son Güncelleme</span>
                                <span className="text-sm text-muted-foreground">
                                    {new Date(order.updatedAt).toLocaleDateString("tr-TR", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </span>
                            </div>
                            {finalFiles.length > 0 && (
                                <div className="flex justify-between items-center py-1.5 border-b border-border">
                                    <span className="text-foreground font-medium">Sipariş Teslimi</span>
                                    <span className="text-sm text-muted-foreground">
                                        {new Date(Math.max(...finalFiles.map(f => new Date(f.createdAt).getTime()))).toLocaleDateString("tr-TR", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </span>
                                </div>
                            )}
                            {order.price && (
                                <div className="flex justify-between items-center py-1.5">
                                    <span className="text-foreground font-medium">Fiyat</span>
                                    <span className="text-lg font-bold text-violet-500">
                                        ${Number(order.price).toLocaleString("en-US")}
                                    </span>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Description - Moved to sidebar */}
                    {order.description && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-foreground text-lg">Açıklama</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground whitespace-pre-wrap text-sm">
                                    {order.description}
                                </p>
                            </CardContent>
                        </Card>
                    )}

                    {/* Admin Controls */}
                    {isAdmin && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-foreground text-lg">
                                    Sipariş Yönetimi
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="space-y-1">
                                    <Label className="text-muted-foreground text-xs">Durum</Label>
                                    <Select
                                        value={status}
                                        onValueChange={(value) => setStatus(value as OrderStatus)}
                                        disabled={order.status === "COMPLETED"}
                                    >
                                        <SelectTrigger className="w-full bg-accent hover:bg-blue-50 dark:hover:bg-accent/80 border-border text-foreground h-9 transition-colors">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-popover border-border">
                                            {Object.entries(ORDER_STATUS_LABELS).map(([key, label]) => (
                                                <SelectItem
                                                    key={key}
                                                    value={key}
                                                    className="text-foreground"
                                                >
                                                    {label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Button
                                    onClick={handleUpdateOrder}
                                    disabled={isUpdating || order.status === "COMPLETED"}
                                    className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    {/* Müşteri Notları (CRM) - Sadece Admin */}
                    {isAdmin && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-foreground text-lg flex items-center gap-2">
                                    <ClipboardList className="h-5 w-5 text-violet-400" />
                                    Müşteri Notları
                                </CardTitle>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Buraya alacağınız notları müşteri göremez.
                                </p>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <textarea
                                    value={customerNotes}
                                    onChange={(e) => setCustomerNotes(e.target.value)}
                                    placeholder="Müşteri hakkında dâhili notlar..."
                                    className="w-full bg-accent border-border text-foreground text-sm rounded-lg p-3 min-h-[100px] focus:ring-violet-500 focus:border-violet-500"
                                />
                                <Button
                                    onClick={handleUpdateCustomerNotes}
                                    disabled={isUpdatingNotes}
                                    className="w-full bg-accent hover:bg-accent/80 text-foreground border border-border"
                                >
                                    {isUpdatingNotes ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        "Notları Kaydet"
                                    )}
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {/* FAQ Section - Only for customers */}
                    {!isAdmin && (
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-foreground text-lg flex items-center gap-2">
                                    <span className="text-violet-400">?</span>
                                    Sıkça Sorulan Sorular
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="divide-y divide-border">
                                    <details className="group py-3">
                                        <summary className="flex items-center justify-between cursor-pointer">
                                            <span className="body-big text-foreground group-hover:text-foreground transition-colors pr-2">
                                                Siparişim ne zaman hazır olur?
                                            </span>
                                            <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 group-open:rotate-180" />
                                        </summary>
                                        <div className="mt-2 ml-0 body text-muted-foreground leading-relaxed bg-accent/50 rounded-lg p-3">
                                            Standart siparişler genellikle 24-48 saat içinde tamamlanır. Karmaşık tasarımlar daha uzun sürebilir.
                                        </div>
                                    </details>

                                    <details className="group py-3">
                                        <summary className="flex items-center justify-between cursor-pointer">
                                            <span className="body-big text-foreground group-hover:text-foreground transition-colors pr-2">
                                                Süreç nasıl işliyor?
                                            </span>
                                            <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 group-open:rotate-180" />
                                        </summary>
                                        <div className="mt-2 ml-0 body text-muted-foreground leading-relaxed bg-accent/50 rounded-lg p-3">
                                            1) Dosyanızı yükleyin → 2) Fiyat teklifi alın → 3) Onaylayın → 4) Önizleme alın → 5) Onaylayın → 6) Final dosyalarınızı indirin.
                                        </div>
                                    </details>

                                    <details className="group py-3">
                                        <summary className="flex items-center justify-between cursor-pointer">
                                            <span className="body-big text-foreground group-hover:text-foreground transition-colors pr-2">
                                                Revizyon talep edebilir miyim?
                                            </span>
                                            <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 group-open:rotate-180" />
                                        </summary>
                                        <div className="mt-2 ml-0 body text-muted-foreground leading-relaxed bg-accent/50 rounded-lg p-3">
                                            Evet! Önizleme aldıktan sonra "Mesajlar ve Sipariş Durumu" bölümünden revizyon talebinde bulunabilirsiniz.
                                        </div>
                                    </details>

                                    <details className="group py-3">
                                        <summary className="flex items-center justify-between cursor-pointer">
                                            <span className="body-big text-foreground group-hover:text-foreground transition-colors pr-2">
                                                Hangi formatları destekliyorsunuz?
                                            </span>
                                            <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 group-open:rotate-180" />
                                        </summary>
                                        <div className="mt-2 ml-0 body text-muted-foreground leading-relaxed bg-accent/50 rounded-lg p-3">
                                            Giriş: JPG, PNG, PDF, AI, EPS, SVG. Çıkış: DST, PES, JEF ve diğer nakış formatları.
                                        </div>
                                    </details>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>

            <ActionConfirmDialog
                isOpen={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                onConfirm={performDelete}
                isPending={isDeletingFile}
                description="Bu dosya kalıcı olarak silinecektir. Bu işlemi geri alamazsınız."
            />
            <ActionConfirmDialog
                isOpen={isDeclineDialogOpen}
                onOpenChange={setIsDeclineDialogOpen}
                onConfirm={handleCancelOrder}
                isPending={isDecliningPrice}
                title="Teklifi Reddet"
                description="Fiyat teklifini reddetmek istediğinizden emin misiniz? Bu işlem siparişi kalıcı olarak iptal edecektir."
                confirmText="İptal Et"
                cancelText="Vazgeç"
                variant="destructive"
            />

            <Dialog open={isRevisionDialogOpen} onOpenChange={setIsRevisionDialogOpen}>
                <DialogContent className="sm:max-w-xl bg-popover border-border overflow-hidden">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                            <RefreshCcw className="h-5 w-5 text-orange-500" />
                            {t.orders.revisionTitle}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-muted-foreground">
                                {language === "tr" ? "Revizyon Detayları" : "Revision Details"}
                            </Label>
                            <Textarea
                                value={revisionMessage}
                                onChange={(e) => setRevisionMessage(e.target.value)}
                                placeholder={t.orders.revisionPlaceholder}
                                className="min-h-[120px] bg-accent/50 border-border focus:ring-orange-500/20 text-foreground"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-muted-foreground">
                                {language === "tr" ? "Dosya Ekle (Opsiyonel)" : "Attach Files (Optional)"}
                            </Label>
                            <div className="flex flex-col gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => document.getElementById("revision-file-upload")?.click()}
                                    className="w-full border-dashed border-border hover:border-orange-500/50 hover:bg-orange-500/5 text-muted-foreground hover:text-orange-500 gap-2 h-12"
                                >
                                    <FilePlus className="h-4 w-4" />
                                    {language === "tr" ? "Dosya Seç" : "Select Files"}
                                </Button>
                                <input
                                    id="revision-file-upload"
                                    type="file"
                                    multiple
                                    className="hidden"
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            setSelectedRevisionFiles(Array.from(e.target.files));
                                        }
                                    }}
                                />
                                {selectedRevisionFiles.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {selectedRevisionFiles.map((file, i) => (
                                            <Badge key={i} variant="secondary" className="bg-accent text-foreground gap-1 pr-1">
                                                <span className="truncate max-w-[150px]">{file.name}</span>
                                                <button
                                                    onClick={() => setSelectedRevisionFiles(prev => prev.filter((_, idx) => idx !== i))}
                                                    className="hover:text-red-500 ml-1"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button
                            variant="ghost"
                            onClick={() => setIsRevisionDialogOpen(false)}
                            className="text-muted-foreground hover:text-foreground hover:bg-zinc-800"
                        >
                            {t.common.cancel}
                        </Button>
                        <Button
                            onClick={handleRevisionRequest}
                            disabled={isSubmittingRevision || !revisionMessage.trim()}
                            className="bg-orange-600 hover:bg-orange-500 text-white min-w-[120px] shadow-lg shadow-orange-500/20"
                        >
                            {isSubmittingRevision ? (
                                <>
                                    <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                                    {language === "tr" ? "Gönderiliyor..." : "Sending..."}
                                </>
                            ) : (
                                <>
                                    <Send className="mr-2 h-4 w-4" />
                                    {t.orders.sendRevision}
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

function FileList({
    files,
    showPreview = false,
    isLocked = false,
    isAdmin = false,
    onDelete,
    canDelete = false,
}: {
    files: Array<{
        id: string;
        name: string;
        url: string;
        size: number | null;
        version?: number;
    }>;
    showPreview?: boolean;
    isLocked?: boolean;
    isAdmin?: boolean;
    onDelete?: (id: string) => void;
    canDelete?: boolean;
}) {
    if (files.length === 0) {
        return (
            <div className="text-center py-8 text-muted-foreground">
                Henüz dosya yüklenmemiş
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {files.map((file) => (
                <div key={file.id}>
                    {showPreview && file.url.match(/\.(jpg|jpeg|png|gif|webp)$/i) && (
                        <div className="mb-2 rounded-lg overflow-hidden bg-accent">
                            <img
                                src={file.url}
                                alt={file.name}
                                className="w-full h-auto max-h-64 object-contain"
                            />
                        </div>
                    )}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                        <div className="flex items-center gap-3">
                            {showPreview ? (
                                <ImageIcon className="h-5 w-5 text-violet-400" />
                            ) : (
                                <FileIcon className="h-5 w-5 text-violet-400" />
                            )}
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="text-sm text-foreground">{file.name}</p>
                                    {file.version && file.version > 1 && (
                                        <span className="px-2 py-0.5 text-xs font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20 rounded-full">
                                            v{file.version}
                                        </span>
                                    )}
                                </div>
                                {file.size && (
                                    <p className="text-xs text-muted-foreground">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            {!isLocked && (
                                <>
                                    <a href={file.url} target="_blank" rel="noopener noreferrer">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 transition-colors"
                                            title="Önizle"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </a>
                                    <a href={file.url} download>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-muted-foreground hover:text-violet-500 hover:bg-violet-500/10 transition-colors"
                                            title="İndir"
                                        >
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    </a>
                                </>
                            )}
                            {isAdmin && canDelete && onDelete && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => onDelete(file.id)}
                                    className="text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            )}
                            {isLocked && (
                                <div className="p-2 rounded-lg bg-accent/50 text-muted-foreground" title="Ödeme gerekli">
                                    <Lock className="h-4 w-4" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
