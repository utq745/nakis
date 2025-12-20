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
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
}

function getContrastColor(hexColor: string): string {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#FFFFFF';
}

export function WilcomSection({ orderId, wilcomData, isAdmin }: WilcomSectionProps) {
    const router = useRouter();
    const [isUploading, setIsUploading] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;

        const file = e.target.files[0];
        if (!file.name.endsWith('.pdf')) {
            toast.error('Only PDF files are accepted');
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
                throw new Error(error.error || 'Failed to upload Wilcom PDF');
            }

            toast.success('Wilcom PDF processed successfully!');
            router.refresh();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to process Wilcom PDF');
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    }, [orderId, router]);

    // If no wilcom data and user is admin, show upload prompt
    if (!wilcomData && isAdmin) {
        return (
            <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                    <CardTitle className="text-white text-lg flex items-center gap-2">
                        <FileText className="h-5 w-5 text-violet-400" />
                        Wilcom Design Data
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="border-2 border-dashed border-zinc-700 rounded-lg p-8 text-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="p-4 rounded-full bg-violet-500/10">
                                <Upload className="h-8 w-8 text-violet-400" />
                            </div>
                            <div>
                                <h3 className="text-white font-medium mb-1">
                                    Upload Wilcom PDF
                                </h3>
                                <p className="text-sm text-zinc-400">
                                    Upload the Wilcom export PDF to generate approval cards
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
                                    disabled={isUploading}
                                >
                                    <span>
                                        {isUploading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="mr-2 h-4 w-4" />
                                                Select PDF
                                            </>
                                        )}
                                    </span>
                                </Button>
                            </label>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    // If no wilcom data and user is not admin
    if (!wilcomData) {
        return null;
    }

    // Convert mm to inches for display
    const heightInches = (wilcomData.heightMm / 25.4).toFixed(2);
    const widthInches = (wilcomData.widthMm / 25.4).toFixed(2);

    return (
        <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-lg flex items-center gap-2">
                        <FileText className="h-5 w-5 text-violet-400" />
                        Wilcom Design Data
                    </CardTitle>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Processed
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Design Info Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-zinc-800/50 rounded-lg p-3">
                        <div className="text-xs text-zinc-400 mb-1">Design Name</div>
                        <div className="text-white font-medium text-sm">{wilcomData.designName}</div>
                    </div>
                    <div className="bg-zinc-800/50 rounded-lg p-3">
                        <div className="text-xs text-zinc-400 mb-1 flex items-center gap-1">
                            <Ruler className="h-3 w-3" /> Size
                        </div>
                        <div className="text-white font-medium text-sm">
                            {widthInches}" × {heightInches}"
                        </div>
                    </div>
                    <div className="bg-zinc-800/50 rounded-lg p-3">
                        <div className="text-xs text-zinc-400 mb-1 flex items-center gap-1">
                            <Scissors className="h-3 w-3" /> Stitches
                        </div>
                        <div className="text-white font-medium text-sm">
                            {new Intl.NumberFormat('en-US').format(wilcomData.stitchCount)}
                        </div>
                    </div>
                    <div className="bg-zinc-800/50 rounded-lg p-3">
                        <div className="text-xs text-zinc-400 mb-1 flex items-center gap-1">
                            <Clock className="h-3 w-3" /> Runtime
                        </div>
                        <div className="text-white font-medium text-sm">
                            {wilcomData.machineRuntime || 'N/A'}
                        </div>
                    </div>
                </div>

                {/* Color Preview */}
                <div className="bg-zinc-800/50 rounded-lg p-3">
                    <div className="text-xs text-zinc-400 mb-2 flex items-center gap-1">
                        <Palette className="h-3 w-3" /> Colors ({wilcomData.colorCount})
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
                    <div className="bg-zinc-800/50 rounded-lg p-3">
                        <div className="text-xs text-zinc-400 mb-2">Design Preview</div>
                        <div className="flex justify-center bg-white/5 rounded-lg p-4">
                            <img
                                src={wilcomData.designImageUrl}
                                alt="Design Preview"
                                className="max-w-full max-h-48 object-contain"
                            />
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 pt-2">
                    {/* Customer Approval Card - visible to everyone */}
                    {wilcomData.customerApprovalPdf && (
                        <a
                            href={wilcomData.customerApprovalPdf}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-violet-500/30 bg-violet-500/10 text-violet-300 hover:bg-violet-500/20"
                            >
                                <Eye className="mr-2 h-4 w-4" />
                                Customer Approval Card
                            </Button>
                        </a>
                    )}

                    {/* Operator Approval Card - admin only */}
                    {isAdmin && wilcomData.operatorApprovalPdf && (
                        <a
                            href={wilcomData.operatorApprovalPdf}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-300 hover:bg-fuchsia-500/20"
                            >
                                <Eye className="mr-2 h-4 w-4" />
                                Operator Approval Card
                            </Button>
                        </a>
                    )}

                    {/* Original Wilcom PDF - admin only */}
                    {isAdmin && wilcomData.wilcomPdfUrl && (
                        <a
                            href={wilcomData.wilcomPdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                variant="outline"
                                size="sm"
                                className="bg-transparent border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                            >
                                <Download className="mr-2 h-4 w-4" />
                                Original PDF
                            </Button>
                        </a>
                    )}

                    {/* Re-upload button - admin only */}
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
                                    className="bg-transparent border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                                    disabled={isUploading}
                                >
                                    <span>
                                        {isUploading ? (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        ) : (
                                            <RefreshCw className="mr-2 h-4 w-4" />
                                        )}
                                        Re-upload
                                    </span>
                                </Button>
                            </label>
                        </>
                    )}
                </div>

                {/* Expandable Details - Admin only */}
                {isAdmin && (
                    <>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full text-zinc-400 hover:text-white"
                            onClick={() => setShowDetails(!showDetails)}
                        >
                            {showDetails ? 'Hide Details' : 'Show Technical Details'}
                        </Button>

                        {showDetails && (
                            <div className="border-t border-zinc-800 pt-4 space-y-3">
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                                    <div>
                                        <span className="text-zinc-500">Machine Format:</span>
                                        <span className="text-zinc-300 ml-2">{wilcomData.machineFormat || 'N/A'}</span>
                                    </div>
                                    <div>
                                        <span className="text-zinc-500">Color Changes:</span>
                                        <span className="text-zinc-300 ml-2">{wilcomData.colorChanges || 0}</span>
                                    </div>
                                    <div>
                                        <span className="text-zinc-500">Stops:</span>
                                        <span className="text-zinc-300 ml-2">{wilcomData.stops || 0}</span>
                                    </div>
                                    <div>
                                        <span className="text-zinc-500">Trims:</span>
                                        <span className="text-zinc-300 ml-2">{wilcomData.trims || 0}</span>
                                    </div>
                                    <div>
                                        <span className="text-zinc-500">Total Thread:</span>
                                        <span className="text-zinc-300 ml-2">{wilcomData.totalThreadM?.toFixed(2) || 'N/A'}m</span>
                                    </div>
                                    <div>
                                        <span className="text-zinc-500">Total Bobbin:</span>
                                        <span className="text-zinc-300 ml-2">{wilcomData.totalBobbinM?.toFixed(2) || 'N/A'}m</span>
                                    </div>
                                    <div>
                                        <span className="text-zinc-500">Max Stitch:</span>
                                        <span className="text-zinc-300 ml-2">{wilcomData.maxStitchMm?.toFixed(1) || 'N/A'}mm</span>
                                    </div>
                                    <div>
                                        <span className="text-zinc-500">Min Stitch:</span>
                                        <span className="text-zinc-300 ml-2">{wilcomData.minStitchMm?.toFixed(1) || 'N/A'}mm</span>
                                    </div>
                                    <div>
                                        <span className="text-zinc-500">Max Jump:</span>
                                        <span className="text-zinc-300 ml-2">{wilcomData.maxJumpMm?.toFixed(1) || 'N/A'}mm</span>
                                    </div>
                                </div>

                                {/* Color Sequence */}
                                <div>
                                    <div className="text-xs text-zinc-500 mb-2">Color Sequence:</div>
                                    <div className="flex flex-wrap gap-1">
                                        {wilcomData.colorSequence.map((item, index) => (
                                            <div
                                                key={index}
                                                className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border border-zinc-600"
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
        </Card>
    );
}
