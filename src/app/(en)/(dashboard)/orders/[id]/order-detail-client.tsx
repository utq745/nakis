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
    CreditCard,
    Lock,
    Trash2,
    Send,
    DollarSign,
} from "lucide-react";
import { toast } from "sonner";
import { CommentSection } from "@/components/orders/comment-section";
import { WilcomSection } from "@/components/orders/wilcom-section";
import { ORDER_STATUS_LABELS, ORDER_STATUS_LABELS_TR, ORDER_STATUS_COLORS, type OrderStatus } from "@/types";
import { useLanguage } from "@/components/providers/language-provider";
import { ActionConfirmDialog } from "@/components/orders/action-confirm-dialog";
import { UploadOverlay } from "@/components/ui/upload-overlay";

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
        wilcomData: WilcomData | null;
        createdAt: Date;
        updatedAt: Date;
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
    const [isApprovingPreview, setIsApprovingPreview] = useState(false);
    const [isSendingPreview, setIsSendingPreview] = useState(false);
    const [hasNewPreviewFiles, setHasNewPreviewFiles] = useState(false);

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
                    price: price ? parseFloat(price) : null,
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
            if (type === "preview") {
                setHasNewPreviewFiles(true);
            }
            router.refresh();
        } catch (error) {
            toast.error(t.orders.uploadError);
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    }

    async function handlePriceApproval() {
        setIsApprovingPrice(true);
        try {
            const response = await fetch(`/api/orders/${order.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "PRICE_ACCEPTED" }),
            });

            if (!response.ok) throw new Error("Failed to approve price");

            toast.success(t.orders.priceApproved);
            // Small delay to let user see the success message
            setTimeout(() => {
                router.refresh();
                setIsApprovingPrice(false);
            }, 500);
        } catch (error) {
            toast.error(t.orders.updateError);
            console.error(error);
            setIsApprovingPrice(false);
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

            if (!response.ok) throw new Error("Failed to approve preview");

            toast.success(t.orders.previewApproved);
            // Small delay to let user see the success message
            setTimeout(() => {
                router.refresh();
                setIsApprovingPreview(false);
            }, 500);
        } catch (error) {
            toast.error(t.orders.updateError);
            console.error(error);
            setIsApprovingPreview(false);
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

            if (!response.ok) throw new Error("Failed to send preview");

            toast.success(t.orders.previewSent);
            setHasNewPreviewFiles(false); // Reset after sending
            setTimeout(() => {
                router.refresh();
                setIsSendingPreview(false);
            }, 500);
        } catch (error) {
            toast.error(t.orders.updateError);
            console.error(error);
            setIsSendingPreview(false);
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
            <UploadOverlay
                isVisible={isUploading || isApprovingPrice || isApprovingPreview || isSendingPreview}
                message={
                    isUploading ? (language === 'tr' ? "Dosyalar yükleniyor..." : "Uploading files...") :
                        isApprovingPrice ? (language === 'tr' ? "Fiyat onaylanıyor..." : "Approving price...") :
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
                        className="inline-flex items-center text-zinc-400 hover:text-white transition-colors mb-4"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {t.orders.backToOrders}
                    </Link>
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold text-white">{order.title}</h1>
                        <Badge className={ORDER_STATUS_COLORS[order.status as keyof typeof ORDER_STATUS_COLORS]}>
                            {language === "tr"
                                ? ORDER_STATUS_LABELS_TR[order.status as keyof typeof ORDER_STATUS_LABELS_TR]
                                : ORDER_STATUS_LABELS[order.status as keyof typeof ORDER_STATUS_LABELS]}
                        </Badge>
                    </div>
                </div>
            </div>

            {/* Admin Price Warning Banner */}
            {isAdmin && status === "WAITING_PRICE" && (
                <Card className="border-yellow-500/50 bg-yellow-500/5 overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-full bg-yellow-500/20 text-yellow-400">
                                <DollarSign className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white">
                                    {language === "tr" ? "Siparişe fiyat vermeniz bekleniyor" : "Price entry required"}
                                </h3>
                                <p className="text-sm text-zinc-400">
                                    {language === "tr"
                                        ? "Bu sipariş için fiyat belirleyin. Fiyat girildikten sonra müşteri onay bekleyecektir."
                                        : "Set a price for this order. Customer will be notified for approval once you set the price."}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Admin Waiting for Price Approval Banner */}
            {isAdmin && status === "PRICED" && (
                <Card className="border-blue-500/50 bg-blue-500/5 overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-full bg-blue-500/20 text-blue-400">
                                <CreditCard className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white">
                                    {language === "tr" ? "Müşterinin fiyatı onaylaması bekleniyor" : "Waiting for customer price approval"}
                                </h3>
                                <p className="text-sm text-zinc-400">
                                    {language === "tr"
                                        ? "Fiyat müşteriye iletildi. Müşterinin onayı bekleniyor."
                                        : "Price has been sent to the customer. Waiting for approval."}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Admin Preview Upload Warning Banner */}
            {isAdmin && status === "PRICE_ACCEPTED" && (
                <Card className="border-emerald-500/50 bg-emerald-500/5 overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-full bg-emerald-500/20 text-emerald-400">
                                <ImageIcon className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white">
                                    {language === "tr" ? "Önizleme dosyası yüklemeniz bekleniyor" : "Preview file upload required"}
                                </h3>
                                <p className="text-sm text-zinc-400">
                                    {language === "tr"
                                        ? "Müşteri fiyatı onayladı. Şimdi önizleme dosyalarını yükleyin ve müşteriye gönderin."
                                        : "Customer approved the price. Upload preview files and send them to the customer."}
                                </p>
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
                                <h3 className="text-lg font-semibold text-white">
                                    {language === "tr" ? "Müşteri önizlemeyi inceliyor" : "Customer is reviewing preview"}
                                </h3>
                                <p className="text-sm text-zinc-400">
                                    {language === "tr"
                                        ? "Önizleme dosyaları gönderildi. Müşterinin onayı bekleniyor."
                                        : "Preview files have been sent. Waiting for customer approval."}
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
                                <h3 className="text-lg font-semibold text-white">
                                    {language === "tr" ? "Final dosyalarını göndermeniz bekleniyor" : "Final files upload required"}
                                </h3>
                                <p className="text-sm text-zinc-400">
                                    {language === "tr"
                                        ? "Müşteri önizlemeyi onayladı. Şimdi final dosyalarını yükleyin."
                                        : "Customer approved the preview. Upload the final files now."}
                                </p>
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
                                    <h3 className="text-lg font-semibold text-white">
                                        {t.orders.payButton}
                                    </h3>
                                    <p className="text-sm text-zinc-400">
                                        {t.orders.paymentPendingDesc}
                                    </p>
                                </div>
                            </div>
                            <Link href={`${language === 'tr' ? '/tr' : ''}/orders/${order.id}/payment`} className="w-full md:w-auto">
                                <Button className="w-full md:w-auto bg-fuchsia-600 hover:bg-fuchsia-500 text-white gap-2">
                                    <CreditCard className="h-4 w-4" />
                                    {t.orders.payButton}
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Price Approval Banner for Customer */}
            {!isAdmin && status === "PRICED" && order.price && (
                <Card className="border-blue-500/50 bg-blue-500/5 overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4 text-center md:text-left">
                                <div className="p-3 rounded-full bg-blue-500/20 text-blue-400">
                                    <CreditCard className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">
                                        {t.orders.priceApprovalTitle}
                                    </h3>
                                    <p className="text-sm text-zinc-400">
                                        {t.orders.priceApprovalDesc}
                                    </p>
                                    <p className="text-2xl font-bold text-blue-400 mt-2">
                                        ${Number(order.price).toLocaleString("en-US")}
                                    </p>
                                </div>
                            </div>
                            <Button
                                onClick={handlePriceApproval}
                                disabled={isApprovingPrice}
                                className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white gap-2"
                            >
                                {isApprovingPrice ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        {t.common.loading}
                                    </>
                                ) : (
                                    <>
                                        <CreditCard className="h-4 w-4" />
                                        {t.orders.approvePrice}
                                    </>
                                )}
                            </Button>
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
                                    <h3 className="text-lg font-semibold text-white">
                                        {t.orders.previewApprovalTitle}
                                    </h3>
                                    <p className="text-sm text-zinc-400">
                                        {t.orders.previewApprovalDesc}
                                    </p>
                                </div>
                            </div>
                            <Button
                                onClick={handlePreviewApproval}
                                disabled={isApprovingPreview}
                                className="w-full md:w-auto bg-orange-600 hover:bg-orange-500 text-white gap-2"
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
                    </CardContent>
                </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Files */}
                    <Card className="bg-zinc-900 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-white text-lg">{t.orders.files}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="original" className="w-full">
                                <TabsList className="bg-zinc-800 w-full justify-start">
                                    <TabsTrigger value="original" className="text-zinc-300 data-[state=active]:bg-zinc-700 data-[state=active]:text-white">
                                        {language === "tr" ? "Müşteri Dosyaları" : "Customer's File(s)"} ({originalFiles.length})
                                    </TabsTrigger>
                                    <TabsTrigger value="preview" className="text-zinc-300 data-[state=active]:bg-zinc-700 data-[state=active]:text-white">
                                        {t.orders.preview} ({previewFiles.length})
                                    </TabsTrigger>
                                    <TabsTrigger value="final" className="text-zinc-300 data-[state=active]:bg-zinc-700 data-[state=active]:text-white">
                                        {t.orders.final} ({finalFiles.length})
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="original" className="mt-4">
                                    <FileList
                                        files={originalFiles}
                                        emptyText={t.orders.noFiles}
                                        isAdmin={isAdmin}
                                        onDelete={handleDeleteFile}
                                        canDelete={isAdmin && order.status !== "PAYMENT_PENDING" && order.status !== "COMPLETED"}
                                    />
                                </TabsContent>
                                <TabsContent value="preview" className="mt-4 space-y-4">
                                    {(isAdmin || status === "APPROVAL_AWAITING") && (
                                        <FileList
                                            files={previewFiles}
                                            showPreview
                                            emptyText={t.orders.noFiles}
                                            isAdmin={isAdmin}
                                            onDelete={handleDeleteFile}
                                            canDelete={isAdmin && order.status !== "PAYMENT_PENDING" && order.status !== "COMPLETED"}
                                        />
                                    )}
                                    {!isAdmin && status !== "APPROVAL_AWAITING" && previewFiles.length > 0 && (
                                        <div className="text-center py-8 text-zinc-500">
                                            <ImageIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                            <p>Preview files are being prepared by admin</p>
                                        </div>
                                    )}
                                    {isAdmin && (
                                        <div className="pt-4 border-t border-zinc-800">
                                            <Label className="text-zinc-300 text-sm">
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
                                        isLocked={!isAdmin && status !== "COMPLETED"}
                                        isAdmin={isAdmin}
                                        onDelete={handleDeleteFile}
                                        canDelete={isAdmin && order.status !== "PAYMENT_PENDING" && order.status !== "COMPLETED"}
                                    />
                                    {isAdmin && (
                                        <div className="pt-4 border-t border-zinc-800">
                                            <Label className="text-zinc-300 text-sm">
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

                    {/* Wilcom Design Data - Admin Only, visible after price approval */}
                    {isAdmin && ["PRICE_ACCEPTED", "APPROVAL_AWAITING", "IN_PROGRESS", "PAYMENT_PENDING", "COMPLETED"].includes(order.status) && (
                        <WilcomSection
                            orderId={order.id}
                            wilcomData={order.wilcomData}
                            isAdmin={isAdmin}
                            status={order.status}
                        />
                    )}

                    {/* Comments */}
                    <Card className="bg-zinc-900 border-zinc-800">
                        <CardContent className="p-0">
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
                        <CardContent className="space-y-0">
                            {isAdmin && (
                                <div className="flex justify-between items-center py-1.5 border-b border-zinc-800">
                                    <span className="text-white font-medium">{t.orders.customerName}</span>
                                    <span className="text-sm text-zinc-400">{order.customer.name || order.customer.email}</span>
                                </div>
                            )}
                            <div className="flex justify-between items-center py-1.5 border-b border-zinc-800">
                                <span className="text-white font-medium">{t.orders.orderNo}</span>
                                <span className="text-sm text-zinc-400 font-mono">{order.id.slice(0, 8)}</span>
                            </div>
                            <div className="flex justify-between items-center py-1.5 border-b border-zinc-800">
                                <span className="text-white font-medium">{t.orders.created}</span>
                                <span className="text-sm text-zinc-400">
                                    {new Date(order.createdAt).toLocaleDateString(dateLocale, {
                                        month: "short",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-1.5 border-b border-zinc-800">
                                <span className="text-white font-medium">{t.orders.updated}</span>
                                <span className="text-sm text-zinc-400">
                                    {new Date(order.updatedAt).toLocaleDateString(dateLocale, {
                                        month: "short",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </span>
                            </div>
                            {order.price && (
                                <div className="flex justify-between items-center py-1.5">
                                    <span className="text-white font-medium">{t.orders.price}</span>
                                    <span className="text-lg font-bold text-violet-400">
                                        ${Number(order.price).toLocaleString("en-US")}
                                    </span>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Description - Moved to sidebar */}
                    {order.description && (
                        <Card className="bg-zinc-900 border-zinc-800">
                            <CardHeader>
                                <CardTitle className="text-white text-lg">{t.orders.description}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-zinc-300 whitespace-pre-wrap text-sm">
                                    {order.description}
                                </p>
                            </CardContent>
                        </Card>
                    )}

                    {/* Admin Controls */}
                    {isAdmin && (
                        <Card className="bg-zinc-900 border-zinc-800">
                            <CardHeader>
                                <CardTitle className="text-white text-lg">
                                    {t.orders.management}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="grid grid-cols-6 gap-3">
                                    <div className="col-span-4 space-y-1">
                                        <Label className="text-zinc-400 text-xs">{t.orders.status}</Label>
                                        <Select
                                            value={status}
                                            onValueChange={(value) => setStatus(value as OrderStatus)}
                                            disabled={order.status === "COMPLETED"}
                                        >
                                            <SelectTrigger className="w-full bg-zinc-800 border-zinc-700 text-white h-9">
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
                                    <div className="col-span-2 space-y-1">
                                        <Label className="text-zinc-400 text-xs">{t.orders.price} ($)</Label>
                                        <Input
                                            type="number"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            placeholder="0.00"
                                            className="bg-zinc-800 border-zinc-700 text-white h-9"
                                        />
                                    </div>
                                </div>

                                <Button
                                    onClick={handleUpdateOrder}
                                    disabled={isUpdating || order.status === "COMPLETED"}
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

                    {/* FAQ Section - Only for customers */}
                    {!isAdmin && (
                        <Card className="bg-zinc-900 border-zinc-800">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-white text-lg flex items-center gap-2">
                                    <span className="text-violet-400">?</span>
                                    {language === "tr" ? "Sıkça Sorulan Sorular" : "FAQ"}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="divide-y divide-zinc-800">
                                    <details className="group py-3">
                                        <summary className="flex items-center justify-between cursor-pointer">
                                            <span className="body-big text-zinc-200 group-hover:text-white transition-colors pr-2">
                                                {language === "tr" ? "Siparişim ne zaman hazır olur?" : "When will my order be ready?"}
                                            </span>
                                            <ChevronDown className="h-4 w-4 text-zinc-500 shrink-0 transition-transform duration-200 group-open:rotate-180" />
                                        </summary>
                                        <div className="mt-2 ml-0 body text-zinc-400 leading-relaxed bg-zinc-800/50 rounded-lg p-3">
                                            {language === "tr"
                                                ? "Standart siparişler genellikle 24-48 saat içinde tamamlanır. Karmaşık tasarımlar daha uzun sürebilir."
                                                : "Standard orders are typically completed within 24-48 hours. Complex designs may take longer."}
                                        </div>
                                    </details>

                                    <details className="group py-3">
                                        <summary className="flex items-center justify-between cursor-pointer">
                                            <span className="body-big text-zinc-200 group-hover:text-white transition-colors pr-2">
                                                {language === "tr" ? "Süreç nasıl işliyor?" : "How does the process work?"}
                                            </span>
                                            <ChevronDown className="h-4 w-4 text-zinc-500 shrink-0 transition-transform duration-200 group-open:rotate-180" />
                                        </summary>
                                        <div className="mt-2 ml-0 body text-zinc-400 leading-relaxed bg-zinc-800/50 rounded-lg p-3">
                                            {language === "tr"
                                                ? "1) Dosya Yükle → 2) Fiyatlandırma → 3) Fiyat Onayı → 4) Önizleme Onayı → 5) Ödeme → 6) İndir"
                                                : "1) Upload File → 2) Pricing → 3) Price Approval → 4) Preview Approval → 5) Payment → 6) Download"}
                                        </div>
                                    </details>

                                    <details className="group py-3">
                                        <summary className="flex items-center justify-between cursor-pointer">
                                            <span className="body-big text-zinc-200 group-hover:text-white transition-colors pr-2">
                                                {language === "tr" ? "Revizyon talep edebilir miyim?" : "Can I request revisions?"}
                                            </span>
                                            <ChevronDown className="h-4 w-4 text-zinc-500 shrink-0 transition-transform duration-200 group-open:rotate-180" />
                                        </summary>
                                        <div className="mt-2 ml-0 body text-zinc-400 leading-relaxed bg-zinc-800/50 rounded-lg p-3">
                                            {language === "tr"
                                                ? 'Evet! Önizleme aldıktan sonra "Mesajlar ve Sipariş Durumu" bölümünden revizyon talebinde bulunabilirsiniz.'
                                                : 'Yes! After receiving your preview, request revisions through the "Messages & Order Status" section.'}
                                        </div>
                                    </details>

                                    <details className="group py-3">
                                        <summary className="flex items-center justify-between cursor-pointer">
                                            <span className="body-big text-zinc-200 group-hover:text-white transition-colors pr-2">
                                                {language === "tr" ? "Hangi dosya formatlarını kabul ediyorsunuz?" : "Which file formats are supported?"}
                                            </span>
                                            <ChevronDown className="h-4 w-4 text-zinc-500 shrink-0 transition-transform duration-200 group-open:rotate-180" />
                                        </summary>
                                        <div className="mt-2 ml-0 body text-zinc-400 leading-relaxed bg-zinc-800/50 rounded-lg p-3">
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
                        <div className="flex items-center gap-1">
                            {!isLocked && (
                                <a href={file.url} target="_blank" rel="noopener noreferrer">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-zinc-400 hover:text-violet-400 hover:bg-violet-500/10 transition-colors"
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
                                    className="text-zinc-400 hover:text-red-400 hover:bg-red-500/10 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-all duration-300"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            )}
                            {isLocked && (
                                <div className="p-2 rounded-lg bg-zinc-800/50 text-zinc-500" title="Payment required">
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
