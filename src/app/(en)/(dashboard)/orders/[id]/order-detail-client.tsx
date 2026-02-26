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
    ChevronDown,
    Lock,
    Trash2,
    Send,
    ClipboardList,
    X,
    Archive,
    RefreshCcw,
    FilePlus,
    Package,
    DollarSign,
} from "lucide-react";
import { toast } from "sonner";
import { CommentSection } from "@/components/orders/comment-section";
import { WilcomSection } from "@/components/orders/wilcom-section";
import { ORDER_STATUS_LABELS, ORDER_STATUS_LABELS_TR, ORDER_STATUS_COLORS, type OrderStatus } from "@/types";
import { useLanguage } from "@/components/providers/language-provider";
import { ActionConfirmDialog } from "@/components/orders/action-confirm-dialog";
import { UploadOverlay } from "@/components/ui/upload-overlay";
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
        priority: string;
        serviceType: string | null;
        estimatedDelivery: string | null;
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
    const [isOrderDeleteDialogOpen, setIsOrderDeleteDialogOpen] = useState(false);
    const [shouldDeleteFiles, setShouldDeleteFiles] = useState(false);
    const [isDeletingOrder, setIsDeletingOrder] = useState(false);
    const [stitchCount, setStitchCount] = useState<string>("");
    const [isSendingQuote, setIsSendingQuote] = useState(false);
    const [isApprovingPrice, setIsApprovingPrice] = useState(false);
    const [isQuoteDialogOpen, setIsQuoteDialogOpen] = useState(false);



    const originalFiles = order.files.filter((f) => f.type === "original");
    const previewFiles = order.files.filter((f) => f.type === "preview");
    const finalFiles = order.files.filter((f) => f.type === "final");

    function calculateQuoteFromStitches(count: number): number {
        const base = 35;
        const extra = Math.max(0, count - 7000) * 0.003;
        return Math.round((base + extra) * 100) / 100;
    }

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
                throw new Error(data.error || "Delete failed");
            }

            toast.success(t.common?.deleteSuccess || "File deleted");
            setIsDeleteDialogOpen(false);
            setFileToDelete(null);
            router.refresh();
        } catch (error: any) {
            toast.error(error.message || "Error deleting file");
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
                throw new Error(t.orders.updateError);
            }

            toast.success(t.orders.updateSuccess);

            // Wait 2 seconds before refreshing to let user see success message
            setTimeout(() => {
                window.location.reload();
                setIsUpdating(false);
            }, 2000);
        } catch (error) {
            toast.error(t.orders.updateError);
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
                throw new Error(errorData.error || t.orders.uploadError);
            }

            toast.success(t.orders.uploadSuccess);
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
            toast.error(error.message || t.orders.uploadError);
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    }

    async function handlePreviewApproval() {
        setIsApprovingPreview(true);
        try {
            toast.success(t.orders.previewApproved);

            // Preview approval keeps order IN_PROGRESS in the new workflow
            setStatus("IN_PROGRESS");

            setTimeout(() => {
                router.refresh();
                setIsApprovingPreview(false);
            }, 1000);
        } catch (error) {
            toast.error(t.orders.updateError);
            console.error(error);
            setIsApprovingPreview(false);
        }
    }

    function handlePrepareQuote() {
        const count = Number(stitchCount);
        if (!Number.isFinite(count) || count <= 0) {
            toast.error(language === "tr" ? "Geçerli bir dikiş sayısı girin." : "Enter a valid stitch count.");
            return;
        }
        setIsQuoteDialogOpen(true);
    }

    async function handleSendQuote() {
        const count = Number(stitchCount);
        const quote = calculateQuoteFromStitches(count);
        setIsSendingQuote(true);
        try {
            const response = await fetch(`/api/orders/${order.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "PRICED", price: quote }),
            });

            if (!response.ok) throw new Error("Failed to send quote");

            setPrice(quote.toString());
            setStatus("PRICED");
            setIsQuoteDialogOpen(false);
            toast.success(language === "tr" ? "Fiyat müşteriye gönderildi." : "Quote sent to customer.");

            setTimeout(() => {
                router.refresh();
            }, 800);
        } catch (error) {
            toast.error(t.orders.updateError);
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

            if (!response.ok) throw new Error("Failed to accept quote");

            setStatus("IN_PROGRESS");
            toast.success(t.orders.priceApproved);
            setTimeout(() => router.refresh(), 800);
        } catch (error) {
            toast.error(t.orders.updateError);
            console.error(error);
        } finally {
            setIsApprovingPrice(false);
        }
    }

    async function handleRevisionRequest() {
        if (!revisionMessage.trim()) {
            toast.error(language === "tr" ? "Lütfen revizyon notlarınızı girin." : "Please enter revision notes.");
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

            if (!commentRes.ok) throw new Error("Failed to send message");

            // 3. Update order status to REVISION
            const orderRes = await fetch(`/api/orders/${order.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "REVISION" }),
            });

            if (!orderRes.ok) throw new Error("Failed to update status");

            toast.success(t.orders.revisionSuccess);
            setIsRevisionDialogOpen(false);

            // Reload to show new status and message
            setTimeout(() => {
                window.location.reload();
            }, 1000);

        } catch (error) {
            toast.error(t.common.error);
            console.error(error);
        } finally {
            setIsSubmittingRevision(false);
        }
    }

    async function handleSendPreview() {
        setIsSendingPreview(true);
        try {
            // Just refresh to show new preview files — status stays IN_PROGRESS
            toast.success(t.orders.previewSent);
            setHasNewPreviewFiles(false);

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

    async function handleCancelOrder() {
        setIsDecliningPrice(true);
        try {
            const response = await fetch(`/api/orders/${order.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "CANCELLED" }),
            });

            if (!response.ok) throw new Error("Failed to cancel order");

            toast.success(language === "tr" ? "Sipariş iptal edildi" : "Order cancelled");

            // Update local state for immediate feedback
            setStatus("CANCELLED");

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            toast.error(t.orders.updateError);
            console.error(error);
        } finally {
            setIsDecliningPrice(false);
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

            if (!response.ok) throw new Error("Failed to update notes");

            toast.success(language === "tr" ? "Müşteri notları güncellendi" : "Customer notes updated");
            router.refresh();
        } catch (error) {
            toast.error(language === "tr" ? "Notlar güncellenemedi" : "Failed to update notes");
            console.error(error);
        } finally {
            setIsUpdatingNotes(false);
        }
    }

    async function handleDeleteOrder() {
        setIsDeletingOrder(true);
        try {
            const response = await fetch(`/api/orders/${order.id}?deleteFiles=${shouldDeleteFiles}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to delete order");
            }

            toast.success(language === "tr" ? "Sipariş silindi" : "Order deleted");
            router.push(`${prefix}/orders`);
        } catch (error: any) {
            toast.error(error.message || t.common.error);
            console.error(error);
        } finally {
            setIsDeletingOrder(false);
        }
    }

    const formattedComments = order.comments;

    const dateLocale = language === "tr" ? "tr-TR" : "en-US";
    const prefix = language === "tr" ? "/tr" : "";

    return (
        <div className="space-y-6">
            <UploadOverlay
                isVisible={isUploading || isApprovingPreview || isSendingPreview}
                message={
                    isUploading ? (language === 'tr' ? "Dosyalar yükleniyor..." : "Uploading files...") :
                        isApprovingPreview ? (language === 'tr' ? "Önizleme onaylanıyor..." : "Approving preview...") :
                            isSendingPreview ? (language === 'tr' ? "Önizleme gönderiliyor..." : "Sending preview...") :
                                "Lütfen bekleyin..."
                }
            />
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <Link
                        href={`${prefix}/orders`}
                        className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-4"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {t.orders.backToOrders}
                    </Link>
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold text-foreground">{order.title}</h1>
                        <Badge className={ORDER_STATUS_COLORS[order.status as keyof typeof ORDER_STATUS_COLORS]}>
                            {language === "tr"
                                ? ORDER_STATUS_LABELS_TR[order.status as keyof typeof ORDER_STATUS_LABELS_TR]
                                : ORDER_STATUS_LABELS[order.status as keyof typeof ORDER_STATUS_LABELS]}
                        </Badge>
                    </div>
                </div>
            </div>

            {/* Admin - New Order Received Banner */}
            {isAdmin && status === "ORDERED" && (
                <Card className="border-blue-500/50 bg-blue-500/5 overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-full bg-blue-500/20 text-blue-400">
                                <Package className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-foreground">
                                    {language === "tr" ? "Yeni sipariş alındı" : "New order received"}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {language === "tr"
                                        ? "Bu sipariş için çalışmaya başlayın. Durumu 'İşleniyor' olarak güncelleyin."
                                        : "Start working on this order. Update the status to 'In Progress'."}
                                </p>
                            </div>
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
                                        {language === "tr" ? "Siparişiniz Alındı" : "Order Received"}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {language === "tr"
                                            ? "Siparişiniz inceleniyor. Yakında size dönüş yapılacaktır."
                                            : "Your order is being reviewed. You will be notified shortly."}
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
                                {language === "tr" ? "Siparişi İptal Et" : "Cancel Order"}
                            </Button>
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
                                    {language === "tr" ? "Müşteri revizyon talep etti" : "Revision Requested by Customer"}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {language === "tr"
                                        ? "Müşteriden gelen mesajı kontrol edin ve gerekli güncellemeleri yaparak yeni önizleme dosyalarını yükleyin."
                                        : "Check the customer's message, make the necessary updates, and upload new preview files."}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Admin In Progress Banner */}
            {isAdmin && status === "IN_PROGRESS" && (
                <Card className="border-purple-500/50 bg-purple-500/5 overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-full bg-purple-500/20 text-purple-400">
                                <Send className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-foreground">
                                    {language === "tr" ? "Sipariş işleniyor" : "Order in progress"}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {language === "tr"
                                        ? "Çalışmayı tamamlayın ve final dosyalarını yükleyin."
                                        : "Complete the work and upload the final files."}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Admin Quote Card - Package 3 */}
            {isAdmin && (status === "ORDERED" || status === "IN_PROGRESS" || status === "PRICED") && order.serviceType === "New Digitizing + Sample" && (
                <Card className="border-amber-500/40 bg-amber-500/5 overflow-hidden">
                    <CardContent className="p-6 space-y-4">
                        <div className="flex items-center gap-3">
                            <DollarSign className="h-5 w-5 text-amber-500" />
                            <h3 className="text-base font-semibold text-foreground">
                                {language === "tr" ? "Fiyatlandırma" : "Pricing"}
                            </h3>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Input
                                type="number"
                                min="1"
                                value={stitchCount}
                                onChange={(e) => setStitchCount(e.target.value)}
                                placeholder={language === "tr" ? "Dikiş sayısı" : "Stitch count"}
                                className="bg-background"
                            />
                            <Button
                                onClick={handlePrepareQuote}
                                disabled={isSendingQuote}
                                className="bg-amber-600 hover:bg-amber-500 text-white"
                            >
                                {isSendingQuote
                                    ? (language === "tr" ? "Gönderiliyor..." : "Sending...")
                                    : (language === "tr" ? "Fiyatı Gönder" : "Send Quote")}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Customer Quote Approval - Package 3 */}
            {!isAdmin && status === "PRICED" && order.serviceType === "New Digitizing + Sample" && (
                <Card className="border-cyan-500/50 bg-cyan-500/5 overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4 text-center md:text-left">
                                <div className="p-3 rounded-full bg-cyan-500/20 text-cyan-400">
                                    <DollarSign className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground">{t.orders.priceApprovalTitle}</h3>
                                    <p className="text-sm text-muted-foreground">{t.orders.priceApprovalDesc}</p>
                                    {order.price && (
                                        <p className="text-base font-semibold text-cyan-500 mt-1">${Number(order.price).toLocaleString("en-US")}</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                                <Button
                                    onClick={() => setIsDeclineDialogOpen(true)}
                                    variant="outline"
                                    className="w-full sm:w-auto border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white"
                                >
                                    {language === "tr" ? "Fiyatı Reddet" : "Reject Quote"}
                                </Button>
                                <Button
                                    onClick={handleAcceptQuote}
                                    disabled={isApprovingPrice}
                                    className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-500 text-white"
                                >
                                    {isApprovingPrice ? t.common.loading : t.orders.approvePrice}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Customer Preview Approval Banner - Only for New Digitizing + Sample */}
            {!isAdmin && status === "IN_PROGRESS" && order.serviceType === "New Digitizing + Sample" && previewFiles.length > 0 && (
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Files */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-foreground text-lg">{t.orders.files}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="original" className="w-full">
                                <TabsList className="bg-accent w-full justify-start">
                                    <TabsTrigger value="original" className="text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground">
                                        {language === "tr" ? "Müşteri Dosyaları" : "Customer's File(s)"} ({originalFiles.length})
                                    </TabsTrigger>
                                    <TabsTrigger value="preview" className="text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground">
                                        {t.orders.preview} ({previewFiles.length})
                                    </TabsTrigger>
                                    <TabsTrigger value="final" className="text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground">
                                        {t.orders.final} ({finalFiles.length})
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="original" className="mt-4">
                                    <FileList
                                        files={originalFiles}
                                        emptyText={t.orders.noFiles}
                                        isAdmin={isAdmin}
                                        onDelete={handleDeleteFile}
                                        canDelete={isAdmin && order.status !== "COMPLETED" && order.status !== "DELIVERED"}
                                    />
                                </TabsContent>
                                <TabsContent value="preview" className="mt-4 space-y-4">
                                    {(isAdmin || (status === "IN_PROGRESS" && order.serviceType === "New Digitizing + Sample" && previewFiles.length > 0)) && (
                                        <FileList
                                            files={previewFiles}
                                            showPreview
                                            emptyText={t.orders.noFiles}
                                            isAdmin={isAdmin}
                                            onDelete={handleDeleteFile}
                                            canDelete={isAdmin && order.status !== "COMPLETED" && order.status !== "DELIVERED"}
                                        />
                                    )}
                                    {!isAdmin && !(status === "IN_PROGRESS" && order.serviceType === "New Digitizing + Sample" && previewFiles.length > 0) && previewFiles.length > 0 && (
                                        <div className="text-center py-8 text-muted-foreground">
                                            <ImageIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                            <p>Preview files are being prepared by admin</p>
                                        </div>
                                    )}
                                    {isAdmin && (
                                        <div className="pt-4 border-t border-border">
                                            <Label className="text-muted-foreground text-sm">
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
                                                            {t.orders.uploadPreview}
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
                                        emptyText={t.orders.noFiles}
                                        isLocked={!isAdmin && !["COMPLETED", "DELIVERED"].includes(status)}
                                        isAdmin={isAdmin}
                                        onDelete={handleDeleteFile}
                                        canDelete={isAdmin && !["COMPLETED", "DELIVERED"].includes(order.status)}
                                    />
                                    {/* Customer Download All Button */}
                                    {!isAdmin && finalFiles.length > 1 && ["COMPLETED", "DELIVERED"].includes(status) && (
                                        <div className="pt-4 border-t border-border">
                                            <Button
                                                onClick={() => {
                                                    const link = document.createElement('a');
                                                    link.href = `/api/orders/${order.id}/download-finals`;
                                                    link.download = `${order.title || 'Order'}_Finals.zip`;
                                                    document.body.appendChild(link);
                                                    link.click();
                                                    document.body.removeChild(link);
                                                    toast.success(language === "tr" ? "Dosyalar indiriliyor..." : "Downloading files...");
                                                }}
                                                variant="outline"
                                                className="w-full border-emerald-500 bg-emerald-600 text-white hover:bg-emerald-500 hover:text-white"
                                            >
                                                <Archive className="mr-2 h-4 w-4" />
                                                {language === "tr" ? "Tümünü İndir (ZIP)" : "Download All (ZIP)"}
                                            </Button>
                                        </div>
                                    )}
                                    {isAdmin && (
                                        <div className="pt-4 border-t border-border">
                                            <Label className="text-muted-foreground text-sm">
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
                                                    className="mt-2 border-violet-500 bg-violet-600 text-white hover:bg-violet-500 hover:text-white"
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

                    {/* Wilcom Design Data - Admin Only, visible after preview approval */}
                    {isAdmin && ["IN_PROGRESS", "COMPLETED", "DELIVERED"].includes(order.status) && (
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
                            <CardTitle className="text-foreground text-lg">{t.orders.orderInfo}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-0">
                            {isAdmin && (
                                <div className="flex justify-between items-center py-1.5 border-b border-border">
                                    <span className="text-foreground font-medium">{t.orders.customerName}</span>
                                    <span className="text-sm text-muted-foreground">{order.customer.name || order.customer.email}</span>
                                </div>
                            )}
                            <div className="flex justify-between items-center py-1.5 border-b border-border">
                                <span className="text-foreground font-medium">{t.orders.orderNo}</span>
                                <span className="text-sm text-muted-foreground font-mono">{order.id.slice(-8)}</span>
                            </div>
                            <div className="flex justify-between items-center py-1.5 border-b border-border">
                                <span className="text-foreground font-medium">{t.orders.created}</span>
                                <span className="text-sm text-muted-foreground">
                                    {new Date(order.createdAt).toLocaleDateString(dateLocale, {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </span>
                            </div>
                            {/* Priority & Delivery */}
                            <div className="flex justify-between items-center py-1.5 border-b border-border">
                                <span className="text-foreground font-medium">{language === "tr" ? "Öncelik" : "Priority"}</span>
                                <Badge className={order.priority === "URGENT" ? "bg-red-500/10 text-red-500 border-red-500/20" : "bg-accent text-muted-foreground border-border"}>
                                    {order.priority === "URGENT" ? (language === "tr" ? "ACİL" : "URGENT") : (language === "tr" ? "NORMAL" : "NORMAL")}
                                </Badge>
                            </div>
                            <div className="flex justify-between items-center py-1.5 border-b border-border">
                                <span className="text-foreground font-medium">{language === "tr" ? "Tahmini Teslim" : "Est. Delivery"}</span>
                                <span className="text-sm text-muted-foreground">
                                    {order.estimatedDelivery ? new Date(order.estimatedDelivery).toLocaleDateString(dateLocale, {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    }) : "24-48h"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-1.5 border-b border-border">
                                <span className="text-foreground font-medium">{t.orders.updated}</span>
                                <span className="text-sm text-muted-foreground">
                                    {new Date(order.updatedAt).toLocaleDateString(dateLocale, {
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
                                    <span className="text-foreground font-medium">{t.orders.delivered}</span>
                                    <span className="text-sm text-muted-foreground">
                                        {new Date(Math.max(...finalFiles.map(f => new Date(f.createdAt).getTime()))).toLocaleDateString(dateLocale, {
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
                                    <span className="text-foreground font-medium">{t.orders.price}</span>
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
                                <CardTitle className="text-foreground text-lg">{t.orders.description}</CardTitle>
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
                                    {t.orders.management}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="space-y-1">
                                    <Label className="text-muted-foreground text-xs">{t.orders.status}</Label>
                                    <Select
                                        value={status}
                                        onValueChange={(value) => setStatus(value as OrderStatus)}
                                        disabled={order.status === "DELIVERED"}
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
                                    disabled={isUpdating || order.status === "DELIVERED"}
                                    className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 disabled:opacity-50 disabled:cursor-not-allowed"
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

                    {/* Customer Notes - Admin Only */}
                    {isAdmin && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-foreground text-lg flex items-center gap-2">
                                    <ClipboardList className="h-5 w-5 text-violet-400" />
                                    {language === "tr" ? "Müşteri Notları" : "Customer Notes"}
                                </CardTitle>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {language === "tr"
                                        ? "Buraya alacağınız notları müşteri göremez."
                                        : "The customer cannot see the notes you take here."}
                                </p>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <textarea
                                    value={customerNotes}
                                    onChange={(e) => setCustomerNotes(e.target.value)}
                                    placeholder={language === "tr" ? "Müşteri hakkında notlar..." : "Internal notes about this customer..."}
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
                                        language === "tr" ? "Notları Kaydet" : "Save Notes"
                                    )}
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                    {/* Danger Zone - Admin Only */}
                    {isAdmin && (
                        <Card className="border-red-500/20 bg-red-500/5">
                            <CardHeader>
                                <CardTitle className="text-red-500 text-lg flex items-center gap-2">
                                    <Trash2 className="h-5 w-5" />
                                    {language === "tr" ? "Tehlikeli Bölge" : "Danger Zone"}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-xs text-muted-foreground">
                                    {language === "tr"
                                        ? "Siparişi tamamen kaldırmak için silin. Bu işlem geri alınamaz."
                                        : "Permanently remove this order and its history. This action cannot be undone."}
                                </p>
                                <Button
                                    onClick={() => setIsOrderDeleteDialogOpen(true)}
                                    variant="destructive"
                                    className="w-full bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 transition-all font-bold"
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    {language === "tr" ? "Siparişi Sil" : "Delete Order"}
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
                                    {language === "tr" ? "Sıkça Sorulan Sorular" : "FAQ"}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="divide-y divide-border">
                                    <details className="group py-3">
                                        <summary className="flex items-center justify-between cursor-pointer">
                                            <span className="body-big text-foreground group-hover:text-foreground transition-colors pr-2">
                                                {language === "tr" ? "Siparişim ne zaman hazır olur?" : "When will my order be ready?"}
                                            </span>
                                            <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 group-open:rotate-180" />
                                        </summary>
                                        <div className="mt-2 ml-0 body text-muted-foreground leading-relaxed bg-accent/50 rounded-lg p-3">
                                            {language === "tr"
                                                ? "Standart siparişler genellikle 24-48 saat içinde tamamlanır. Karmaşık tasarımlar daha uzun sürebilir."
                                                : "Standard orders are typically completed within 24-48 hours. Complex designs may take longer."}
                                        </div>
                                    </details>

                                    <details className="group py-3">
                                        <summary className="flex items-center justify-between cursor-pointer">
                                            <span className="body-big text-foreground group-hover:text-foreground transition-colors pr-2">
                                                {language === "tr" ? "Süreç nasıl işliyor?" : "How does the process work?"}
                                            </span>
                                            <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 group-open:rotate-180" />
                                        </summary>
                                        <div className="mt-2 ml-0 body text-muted-foreground leading-relaxed bg-accent/50 rounded-lg p-3">
                                            {language === "tr"
                                                ? "1) Dosya Yükle → 2) İşleme Alınır → 3) Tamamlanır → 4) Teslim Edilir"
                                                : "1) Upload File → 2) In Progress → 3) Completed → 4) Delivered"}
                                        </div>
                                    </details>

                                    <details className="group py-3">
                                        <summary className="flex items-center justify-between cursor-pointer">
                                            <span className="body-big text-foreground group-hover:text-foreground transition-colors pr-2">
                                                {language === "tr" ? "Revizyon talep edebilir miyim?" : "Can I request revisions?"}
                                            </span>
                                            <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 group-open:rotate-180" />
                                        </summary>
                                        <div className="mt-2 ml-0 body text-muted-foreground leading-relaxed bg-accent/50 rounded-lg p-3">
                                            {language === "tr"
                                                ? 'Evet! Önizleme aldıktan sonra "Mesajlar ve Sipariş Durumu" bölümünden revizyon talebinde bulunabilirsiniz.'
                                                : 'Yes! After receiving your preview, request revisions through the "Messages & Order Status" section.'}
                                        </div>
                                    </details>

                                    <details className="group py-3">
                                        <summary className="flex items-center justify-between cursor-pointer">
                                            <span className="body-big text-foreground group-hover:text-foreground transition-colors pr-2">
                                                {language === "tr" ? "Hangi dosya formatlarını kabul ediyorsunuz?" : "Which file formats are supported?"}
                                            </span>
                                            <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 group-open:rotate-180" />
                                        </summary>
                                        <div className="mt-2 ml-0 body text-muted-foreground leading-relaxed bg-accent/50 rounded-lg p-3">
                                            {language === "tr"
                                                ? "DST, EMB, AI, veya PDF"
                                                : "DST, EMB, AI, or PDF"}
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
                description="This file will be permanently deleted. You cannot undo this action."
            />
            <ActionConfirmDialog
                isOpen={isDeclineDialogOpen}
                onOpenChange={setIsDeclineDialogOpen}
                onConfirm={handleCancelOrder}
                isPending={isDecliningPrice}
                title={language === "tr" ? "Siparişi İptal Et" : "Cancel Order"}
                description={language === "tr"
                    ? "Bu siparişi iptal etmek istediğinizden emin misiniz? Bu işlem geri alınamaz."
                    : "Are you sure you want to cancel this order? This action cannot be undone."}
                confirmText={language === "tr" ? "İptal Et" : "Cancel Order"}
                cancelText={language === "tr" ? "Vazgeç" : "Go Back"}
                variant="destructive"
            />

            <ActionConfirmDialog
                isOpen={isQuoteDialogOpen}
                onOpenChange={setIsQuoteDialogOpen}
                onConfirm={handleSendQuote}
                isPending={isSendingQuote}
                title={language === "tr" ? "Siparişi Fiyatlandır" : "Send Quote"}
                description={
                    language === "tr"
                        ? `Bu sipariş için ${stitchCount} dikiş üzerinden fiyatlandırma yansıtılacaktır.\n\nÖnerilen Fiyat: $${calculateQuoteFromStitches(Number(stitchCount) || 0).toLocaleString("en-US")}\n\nMüşteriye göndermek istediğinize emin misiniz?`
                        : `Details for this order (${stitchCount} stitches) will be reflected.\n\nSuggested Price: $${calculateQuoteFromStitches(Number(stitchCount) || 0).toLocaleString("en-US")}\n\nAre you sure you want to send this quote?`
                }
                confirmText={language === "tr" ? "Fiyatı Gönder" : "Send Quote"}
                cancelText={language === "tr" ? "İptal" : "Cancel"}
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


            <ActionConfirmDialog
                isOpen={isOrderDeleteDialogOpen}
                onOpenChange={setIsOrderDeleteDialogOpen}
                onConfirm={handleDeleteOrder}
                isPending={isDeletingOrder}
                title={language === "tr" ? "Siparişi Sil" : "Delete Order"}
                description={
                    <div className="space-y-4">
                        <p>
                            {language === "tr"
                                ? "Bu siparişi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."
                                : "Are you sure you want to delete this order? This action is permanent and cannot be undone."}
                        </p>
                        <div className="flex items-center space-x-2 pt-2">
                            <input
                                type="checkbox"
                                id="deleteFiles"
                                checked={shouldDeleteFiles}
                                onChange={(e) => setShouldDeleteFiles(e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-600"
                            />
                            <label htmlFor="deleteFiles" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-red-500">
                                {language === "tr"
                                    ? "Tüm dosyaları (R2/S3 & Yerel) kalıcı olarak sil"
                                    : "Delete all associated files (R2/S3 & Local) permanently"}
                            </label>
                        </div>
                    </div>
                }
                confirmText={language === "tr" ? "Siparişi Sil" : "Delete Order"}
                cancelText={language === "tr" ? "Vazgeç" : "Cancel"}
                variant="destructive"
            />
        </div>
    );
}

function FileList({
    files,
    showPreview = false,
    emptyText,
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
    emptyText: string;
    isLocked?: boolean;
    isAdmin?: boolean;
    onDelete?: (id: string) => void;
    canDelete?: boolean;
}) {
    if (files.length === 0) {
        return (
            <div className="text-center py-8 text-muted-foreground">
                {emptyText}
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
                                <a href={`${file.url}?download=1`} download={file.name}>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-muted-foreground hover:text-violet-500 hover:bg-violet-500/10 transition-colors"
                                    >
                                        <Download className="h-4 w-4" />
                                    </Button>
                                </a>
                            )}
                            {isAdmin && canDelete && onDelete && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => onDelete(file.id)}
                                    className="text-muted-foreground hover:text-red-500 hover:bg-red-500/10 hover:shadow-[0_0_15px_rgba(239,68,68,0.1)] transition-all duration-300"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            )}
                            {isLocked && (
                                <div className="p-2 rounded-lg bg-accent/50 text-muted-foreground" title="Final files are not ready yet">
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
