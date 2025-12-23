"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Upload,
    Loader2,
    FileText,
    Download,
    Eye,
    Palette,
    Ruler,
    Clock,
    Scissors,
    RefreshCw,
    CheckCircle,
    AlertCircle,
    Send,
    Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/providers/language-provider";
import { type OrderStatus } from "@/types";
import { ActionConfirmDialog } from "@/components/orders/action-confirm-dialog";
import { cn } from "@/lib/utils";
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

interface WilcomSectionProps {
    orderId: string;
    wilcomData: WilcomData | null;
    isAdmin: boolean;
    status: OrderStatus;
}

function getContrastColor(hexColor: string): string {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#FFFFFF';
}

export function WilcomSection({ orderId, wilcomData, isAdmin, status }: WilcomSectionProps) {
    const router = useRouter();
    const { t, language } = useLanguage();
    const [isUploading, setIsUploading] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;

        const file = e.target.files[0];
        if (!file.name.toLowerCase().endsWith('.pdf')) {
            toast.error(language === 'tr' ? 'Sadece PDF dosyaları kabul edilir' : 'Only PDF files are accepted');
            return;
        }

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(`/api/orders/${orderId}/wilcom`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || (language === 'tr' ? 'Wilcom PDF yüklenemedi' : 'Failed to upload Wilcom PDF'));
            }

            toast.success(language === 'tr' ? 'Wilcom PDF başarıyla işlendi!' : 'Wilcom PDF processed successfully!');
            router.refresh();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : (language === 'tr' ? 'Wilcom PDF işlenirken hata oluştu' : 'Failed to process Wilcom PDF'));
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    }, [orderId, router, language]);

    const handlePublish = async () => {
        setIsPublishing(true);
        try {
            const res = await fetch(`/api/orders/${orderId}/wilcom/publish`, { method: 'POST' });
            if (!res.ok) throw new Error('Publish failed');
            toast.success(t.orders.publishSuccess || 'Approval cards published to Final section!');
            setIsPublishDialogOpen(false);

            setTimeout(() => {
                router.refresh();
            }, 500);
        } catch (error) {
            toast.error(t.orders.publishError || 'Failed to publish cards');
        } finally {
            setIsPublishing(false);
        }
    };

    const handleDeleteWilcom = async () => {
        setIsDeleting(true);
        try {
            const res = await fetch(`/api/orders/${orderId}/wilcom`, { method: 'DELETE' });
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error || 'Delete failed');
            }
            toast.success(language === 'tr' ? 'Wilcom verileri silindi!' : 'Wilcom data deleted successfully!');
            setIsDeleteDialogOpen(false);
            router.refresh();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to delete data');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Card>
            <UploadOverlay
                isVisible={isUploading}
                message={language === 'tr' ? "Wilcom dosyası işleniyor..." : "Processing Wilcom file..."}
            />
            {/* If no wilcom data and user is admin, show upload prompt */}
            {!wilcomData && isAdmin ? (
                <>
                    <CardHeader>
                        <CardTitle className="text-foreground text-lg flex items-center gap-2">
                            <FileText className="h-5 w-5 text-violet-500" />
                            {t.orders.wilcomUpload}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                            <div className="flex flex-col items-center gap-4">
                                <div className="p-4 rounded-full bg-violet-500/10">
                                    <Upload className="h-8 w-8 text-violet-500" />
                                </div>
                                <div>
                                    <h3 className="text-foreground font-medium mb-1">
                                        {t.orders.wilcom.uploadTitle}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {t.orders.wilcom.uploadDesc}
                                    </p>
                                </div>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                    id="wilcom-upload"
                                    disabled={isUploading}
                                />
                                <label htmlFor="wilcom-upload">
                                    <Button
                                        asChild
                                        className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500"
                                        disabled={isUploading || status === "PAYMENT_PENDING" || status === "COMPLETED"}
                                    >
                                        <span>
                                            <Upload className="mr-2 h-4 w-4" />
                                            {t.orders.wilcom.selectPdf}
                                        </span>
                                    </Button>
                                </label>
                            </div>
                        </div>
                    </CardContent>
                </>
            ) : wilcomData ? (
                <>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-foreground text-lg flex items-center gap-2">
                                <FileText className="h-5 w-5 text-violet-500" />
                                {isAdmin ? t.orders.wilcomUpload : (language === 'tr' ? 'Tasarım Detayları' : 'Design Details')}
                            </CardTitle>
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                {t.orders.wilcom.processed}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Design Info Summary */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div className="bg-accent/40 rounded-lg p-3">
                                <div className="text-xs text-muted-foreground mb-1">{t.orders.wilcom.designName}</div>
                                <div className="text-foreground font-medium text-sm">{wilcomData.designName}</div>
                            </div>
                            <div className="bg-accent/40 rounded-lg p-3">
                                <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                                    <Ruler className="h-3 w-3" /> {t.orders.wilcom.size}
                                </div>
                                <div className="text-foreground font-medium text-sm">
                                    {(wilcomData.widthMm / 25.4).toFixed(2)}" × {(wilcomData.heightMm / 25.4).toFixed(2)}"
                                </div>
                            </div>
                            <div className="bg-accent/40 rounded-lg p-3">
                                <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                                    <Scissors className="h-3 w-3" /> {t.orders.wilcom.stitches}
                                </div>
                                <div className="text-foreground font-medium text-sm">
                                    {new Intl.NumberFormat(language === 'tr' ? 'tr-TR' : 'en-US').format(wilcomData.stitchCount)}
                                </div>
                            </div>
                            <div className="bg-accent/40 rounded-lg p-3">
                                <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                                    <Clock className="h-3 w-3" /> {t.orders.wilcom.runtime}
                                </div>
                                <div className="text-foreground font-medium text-sm">
                                    {wilcomData.machineRuntime || t.common.notAvailable}
                                </div>
                            </div>
                        </div>

                        {/* Color Preview */}
                        <div className="bg-accent/40 rounded-lg p-3">
                            <div className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                                <Palette className="h-3 w-3" /> {t.orders.wilcom.colors} ({wilcomData.colorCount})
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {wilcomData.colors.map((color, index) => (
                                    <div
                                        key={`${color.code}-${index}`}
                                        className="flex items-center gap-1 px-2 py-1 rounded text-xs"
                                        style={{ backgroundColor: color.hex, color: getContrastColor(color.hex) }}
                                        title={`${color.name} (${color.code})`}
                                    >
                                        <span className="font-semibold">{color.code}</span>
                                        <span>{color.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Design Image */}
                        {wilcomData.designImageUrl && (
                            <div className="bg-accent/40 rounded-lg p-3">
                                <div className="text-xs text-muted-foreground mb-2">{t.orders.wilcom.designPreview}</div>
                                <div className="flex justify-center bg-background/50 rounded-lg p-4">
                                    <img
                                        src={`${wilcomData.designImageUrl}?v=${new Date(wilcomData.updatedAt).getTime()}`}
                                        alt="Design Preview"
                                        className="max-w-full max-h-48 object-contain"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-2 pt-2">
                            <div className="flex flex-wrap gap-2">
                                {wilcomData.customerApprovalPdf && (
                                    <a
                                        href={`${wilcomData.customerApprovalPdf}?v=${new Date(wilcomData.updatedAt).getTime()}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="border-violet-500/30 bg-violet-500/10 text-violet-300 hover:bg-violet-500 hover:text-white hover:border-violet-600 transition-colors"
                                        >
                                            <Eye className="mr-2 h-4 w-4" />
                                            {t.orders.wilcom.customerCard}
                                        </Button>
                                    </a>
                                )}

                                {isAdmin && wilcomData.operatorApprovalPdf && (
                                    <a
                                        href={`${wilcomData.operatorApprovalPdf}?v=${new Date(wilcomData.updatedAt).getTime()}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-300 hover:bg-fuchsia-500 hover:text-white hover:border-fuchsia-600 transition-colors"
                                        >
                                            <Eye className="mr-2 h-4 w-4" />
                                            {t.orders.wilcom.operatorCard}
                                        </Button>
                                    </a>
                                )}

                                {isAdmin && wilcomData.wilcomPdfUrl && (
                                    <a
                                        href={`${wilcomData.wilcomPdfUrl}?v=${new Date(wilcomData.updatedAt).getTime()}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="bg-transparent border-border text-muted-foreground hover:bg-accent hover:text-foreground"
                                        >
                                            <Download className="mr-2 h-4 w-4" />
                                            {t.orders.wilcom.originalPdf}
                                        </Button>
                                    </a>
                                )}

                                {isAdmin && (
                                    <>
                                        <input
                                            type="file"
                                            accept=".pdf"
                                            onChange={handleFileUpload}
                                            className="hidden"
                                            id="wilcom-reupload"
                                            disabled={isUploading}
                                        />
                                        <label htmlFor="wilcom-reupload">
                                            <Button
                                                asChild
                                                variant="outline"
                                                size="sm"
                                                className="bg-transparent border-border text-muted-foreground hover:bg-accent hover:text-foreground"
                                                disabled={isUploading || status === "PAYMENT_PENDING" || status === "COMPLETED"}
                                            >
                                                <span>
                                                    <RefreshCw className="mr-2 h-4 w-4" />
                                                    {t.orders.wilcom.reUpload}
                                                </span>
                                            </Button>
                                        </label>

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="bg-transparent border-red-900/50 text-red-400 hover:bg-red-500 hover:text-white hover:border-red-600 transition-all"
                                            disabled={isDeleting || status === "COMPLETED"}
                                            onClick={() => setIsDeleteDialogOpen(true)}
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            {t.orders.wilcom.deleteWilcom}
                                        </Button>
                                    </>
                                )}
                            </div>

                            {isAdmin && (
                                <div className="ml-auto">
                                    <Button
                                        size="sm"
                                        disabled={status === "PAYMENT_PENDING" || status === "COMPLETED"}
                                        className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold transition-all shadow-lg shadow-violet-900/20 gap-2 disabled:opacity-50"
                                        onClick={() => setIsPublishDialogOpen(true)}
                                    >
                                        <Send className="h-4 w-4" />
                                        {t.orders.send}
                                    </Button>
                                </div>
                            )}
                        </div>

                        {isAdmin && (
                            <>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full mt-4 bg-accent/30 hover:bg-accent/70 text-muted-foreground hover:text-foreground border border-border/50 hover:border-border transition-all"
                                    onClick={() => setShowDetails(!showDetails)}
                                >
                                    {showDetails ? t.orders.wilcom.hideDetails : t.orders.wilcom.showDetails}
                                </Button>

                                {showDetails && (
                                    <div className="border-t border-border pt-4 space-y-3">
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                                            <div>
                                                <span className="text-muted-foreground">{t.orders.wilcom.machineFormat}:</span>
                                                <span className="text-foreground ml-2">{wilcomData.machineFormat || t.common.notAvailable}</span>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">{t.orders.wilcom.colorChanges}:</span>
                                                <span className="text-foreground ml-2">{wilcomData.colorChanges || 0}</span>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">{t.orders.wilcom.stops}:</span>
                                                <span className="text-foreground ml-2">{wilcomData.stops || 0}</span>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">{t.orders.wilcom.trims}:</span>
                                                <span className="text-foreground ml-2">{wilcomData.trims || 0}</span>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">{t.orders.wilcom.totalThread}:</span>
                                                <span className="text-foreground ml-2">{wilcomData.totalThreadM?.toFixed(2) || t.common.notAvailable}{wilcomData.totalThreadM ? 'm' : ''}</span>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">{t.orders.wilcom.totalBobbin}:</span>
                                                <span className="text-foreground ml-2">{wilcomData.totalBobbinM?.toFixed(2) || t.common.notAvailable}{wilcomData.totalBobbinM ? 'm' : ''}</span>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">{t.orders.wilcom.maxStitch}:</span>
                                                <span className="text-foreground ml-2">{wilcomData.maxStitchMm?.toFixed(1) || t.common.notAvailable}{wilcomData.maxStitchMm ? 'mm' : ''}</span>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">{t.orders.wilcom.minStitch}:</span>
                                                <span className="text-foreground ml-2">{wilcomData.minStitchMm?.toFixed(1) || t.common.notAvailable}{wilcomData.minStitchMm ? 'mm' : ''}</span>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">{t.orders.wilcom.maxJump}:</span>
                                                <span className="text-foreground ml-2">{wilcomData.maxJumpMm?.toFixed(1) || t.common.notAvailable}{wilcomData.maxJumpMm ? 'mm' : ''}</span>
                                            </div>
                                        </div>

                                        {/* Color Sequence */}
                                        <div>
                                            <div className="text-xs text-muted-foreground mb-2">{t.orders.wilcom.colorSequence}:</div>
                                            <div className="flex flex-wrap gap-1">
                                                {wilcomData.colorSequence.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border border-border"
                                                        style={{ backgroundColor: item.hex, color: getContrastColor(item.hex) }}
                                                        title={`Stop ${item.stop}: ${item.colorName} (${item.colorCode})`}
                                                    >
                                                        {index + 1}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </CardContent>
                </>
            ) : null}

            <ActionConfirmDialog
                isOpen={isPublishDialogOpen}
                onOpenChange={setIsPublishDialogOpen}
                onConfirm={handlePublish}
                isPending={isPublishing}
                variant="default"
                title={t.orders.send || "Gönder"}
                description={t.orders.wilcom.publishConfirm}
                confirmText={t.orders.send || "Gönder"}
            />

            <ActionConfirmDialog
                isOpen={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                onConfirm={handleDeleteWilcom}
                isPending={isDeleting}
                variant="destructive"
                title={t.orders.wilcom.deleteWilcom || "Sil"}
                description={t.orders.wilcom.deleteWilcomConfirm}
                confirmText={t.common?.delete || "Sil"}
            />
        </Card>
    );
}
