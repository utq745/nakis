"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Loader2, Upload, X, FileIcon, ArrowLeft,
    Check, ChevronRight, Scissors,
    Layers, Shirt, ClipboardList, Info, ChevronDown, Rocket, Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { UploadOverlay } from "@/components/ui/upload-overlay";

type Step = 1 | 2 | 3 | 4 | 5;

export default function NewOrderPage() {
    const router = useRouter();
    const [step, setStep] = useState<Step>(1);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);

    // Form State
    const [files, setFiles] = useState<File[]>([]);
    const [machine, setMachine] = useState<string>("");
    const [serviceType, setServiceType] = useState<string>("");
    const [productType, setProductType] = useState<string>("");
    const [garmentType, setGarmentType] = useState<string>("");
    const [isNotSure, setIsNotSure] = useState(false);
    const [customProduct, setCustomProduct] = useState("");
    const [addKnockdownStitch, setAddKnockdownStitch] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [notes, setNotes] = useState("");
    const [priority, setPriority] = useState<"NORMAL" | "URGENT">("NORMAL");

    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setFiles((prev) => [...prev, ...newFiles]);
        }
    };

    async function handleSubmit() {
        if (files.length === 0) {
            toast.error("Lütfen en az bir dosya yükleyin");
            setStep(1);
            return;
        }

        setIsLoading(true);

        try {
            // Create order
            const response = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: projectName.trim(),
                    description: notes,
                    machineBrand: machine,
                    serviceType,
                    productType,
                    garmentType: isNotSure ? "Belirsiz" : garmentType,
                    isNotSure,
                    customProduct,
                    addKnockdownStitch,
                    priority,
                }),
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || "Sipariş oluşturulamadı");
            }

            const order = await response.json();

            // Upload files
            const uploadFormData = new FormData();
            files.forEach((file) => {
                uploadFormData.append("files", file);
            });
            uploadFormData.append("orderId", order.id);
            uploadFormData.append("type", "original");

            const uploadRes = await fetch("/api/files/upload", {
                method: "POST",
                body: uploadFormData,
            });

            if (!uploadRes.ok) {
                toast.error("Sipariş oluşturuldu ancak dosya yüklenemedi. Sipariş sayfasından dosyaları yükleyebilirsiniz.");
            } else {
                toast.success("Sipariş başarıyla gönderildi!");
            }

            setCreatedOrderId(order.id);
            setShowSuccessModal(true);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Bir hata oluştu");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const nextStep = () => {
        if (step === 1 && files.length === 0) {
            toast.error("Lütfen önce bir dosya yükleyin");
            return;
        }
        if (step === 2 && !machine) {
            toast.error("Lütfen bir makine seçin");
            return;
        }
        if (step === 3 && !serviceType) {
            toast.error("Lütfen bir servis tipi seçin");
            return;
        }
        if (step === 4) {
            if (!productType) {
                toast.error("Lütfen bir ürün tipi seçin");
                return;
            }
            if (productType === "Garment" && !garmentType && !isNotSure && !customProduct) {
                toast.error("Lütfen bir giyim türü seçin veya ürününüzü tanımlayın");
                return;
            }
        }
        if (step < 5) setStep((step + 1) as Step);
    };

    const prevStep = () => {
        if (step > 1) setStep((step - 1) as Step);
    };

    const steps = [
        { id: 1, name: "Dosya Yükle", icon: Upload },
        { id: 2, name: "Makine Seç", icon: Scissors },
        { id: 3, name: "Servis Tipi", icon: Layers },
        { id: 4, name: "Ürün Tipi", icon: Shirt },
        { id: 5, name: "Not Ekle", icon: ClipboardList },
    ];

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <UploadOverlay isVisible={isLoading} message="Siparişiniz gönderiliyor..." />
            <h1 className="text-3xl font-bold text-foreground mb-8">Yeni Nakış Siparişi</h1>

            {/* Stepper */}
            <div className="flex items-start justify-between mb-12 relative">
                {steps.map((s, idx) => (
                    <div key={s.id} className="flex flex-col items-center z-10 relative flex-1">
                        {/* Step Circle */}
                        <div
                            className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 relative bg-card",
                                step >= s.id
                                    ? "border-violet-600 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]"
                                    : "border-border text-muted-foreground"
                            )}
                        >
                            <div className={cn(
                                "absolute inset-0 rounded-full transition-opacity duration-300",
                                step >= s.id ? "bg-violet-600 opacity-100" : "opacity-0"
                            )} />
                            <span className="relative z-10">
                                {step > s.id ? <Check className="h-5 w-5" /> : <s.icon className="h-5 w-5" />}
                            </span>
                        </div>

                        {/* Label */}
                        <span className={cn(
                            "text-[10px] mt-2 font-medium uppercase tracking-wider text-center max-w-[80px]",
                            step >= s.id ? "text-violet-500 dark:text-violet-400" : "text-muted-foreground dark:text-zinc-500"
                        )}>
                            {idx + 1}. {s.name}
                        </span>

                        {/* Dashed Line to next step */}
                        {idx < steps.length - 1 && (
                            <div className="absolute top-5 left-[calc(50%+20px)] right-[-50%] flex items-center -z-10">
                                <div className={cn(
                                    "w-full border-t-2 border-dashed transition-colors duration-500",
                                    step > s.id ? "border-violet-600/80" : "border-border"
                                )} />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 relative overflow-hidden">
                {/* Step Content */}
                {step === 1 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-violet-600/20 text-violet-500 dark:text-white flex items-center justify-center font-bold">1</div>
                            <h2 className="text-xl font-semibold text-foreground">Dosya Yükleme</h2>
                        </div>
                        <div
                            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                            onDragLeave={() => setIsDragOver(false)}
                            onDrop={(e) => {
                                e.preventDefault();
                                setIsDragOver(false);
                                if (e.dataTransfer.files) {
                                    setFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
                                }
                            }}
                            className={cn(
                                "border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer",
                                isDragOver ? "border-violet-500 bg-violet-500/5" : "border-border hover:border-violet-500/50 bg-accent/30"
                            )}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                className="hidden"
                                accept=".dst,.emb,.ai,.pdf"
                                onChange={handleFileChange}
                            />
                            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                                <Upload className="h-8 w-8 text-violet-500" />
                            </div>
                            <div className="flex justify-center gap-2 mb-2">
                                <Button variant="secondary" size="sm" className="bg-accent border-border hover:bg-accent/80 text-xs text-foreground">Dosya Seç</Button>
                                <span className="text-muted-foreground text-sm py-1">Dosya seçilmedi</span>
                            </div>
                            <p className="text-muted-foreground text-xs">veya DST, EMB, AI, veya PDF dosyanızı buraya sürükleyin (maks 50MB)</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="projectName" className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Proje İsmi (Opsiyonel)</Label>
                                <Input
                                    id="projectName"
                                    placeholder="Bu proje için bir isim girin..."
                                    className="bg-background border-border text-foreground focus-visible:ring-violet-500 focus-visible:border-violet-500 placeholder:text-muted-foreground h-12 rounded-xl"
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                />
                                <p className="text-[10px] text-muted-foreground italic">Boş bırakılırsa, sipariş numarası proje ismi olarak kullanılacaktır.</p>
                            </div>
                        </div>

                        {files.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-6">
                                {files.map((file, idx) => (
                                    <div key={idx} className="flex items-center gap-2 px-3 py-2 bg-accent/30 border border-border rounded-lg group hover:border-violet-500/50 transition-colors">
                                        <FileIcon className="h-4 w-4 text-violet-500" />
                                        <span className="text-sm text-foreground truncate max-w-[200px]">{file.name}</span>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setFiles(files.filter((_, i) => i !== idx)); }}
                                            className="text-foreground bg-accent hover:bg-red-500 hover:text-white rounded-md p-1 transition-all"
                                            title="Dosyayı kaldır"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="flex justify-end">
                            <Button onClick={nextStep} disabled={files.length === 0} className="bg-violet-600 hover:bg-violet-700 px-14 py-3 h-auto rounded-xl">İleri <ChevronRight className="h-4 w-4" /></Button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-violet-600/20 text-violet-500 dark:text-white flex items-center justify-center font-bold">2</div>
                            <h2 className="text-xl font-semibold text-foreground">Makine Seçimi</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {["Tajima", "Barudan"].map((m) => (
                                <div
                                    key={m}
                                    onClick={() => setMachine(m)}
                                    className={cn(
                                        "p-6 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between",
                                        machine === m ? "border-violet-600 bg-violet-600/10 shadow-[0_0_20px_rgba(124,58,237,0.1)]" : "border-border bg-accent/30 hover:border-violet-500/50"
                                    )}
                                >
                                    <span className={cn("text-lg font-medium", machine === m ? "text-violet-500" : "text-muted-foreground")}>{m}</span>
                                    <div className={cn(
                                        "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                                        machine === m ? "border-violet-600 bg-violet-600" : "border-zinc-800"
                                    )}>
                                        {machine === m && <Check className="h-3 w-3 text-white" />}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between">
                            <Button variant="ghost" onClick={prevStep} className="text-foreground hover:bg-accent transition-colors">Geri</Button>
                            <Button onClick={nextStep} className="bg-violet-600 hover:bg-violet-700 px-14 py-3 h-auto rounded-xl">İleri <ChevronRight className="h-4 w-4" /></Button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-violet-600/20 text-violet-500 dark:text-white flex items-center justify-center font-bold">3</div>
                            <h2 className="text-xl font-semibold text-foreground">Servis Tipi Seçimi</h2>
                        </div>

                        <div className="space-y-3">
                            {[
                                { id: "Approval Sample (Existing DST)", label: "Onay Örneği (Mevcut DST)", price: "$25", desc: "Mevcut DST dosyanızın dikiş kalitesini kontrol edin" },
                                { id: "Fix Your DST + Sample", label: "Fix Your DST + Sample", price: "$35", desc: "Küçük düzeltmeler + dikişli onay örneği" },
                                { id: "New Digitizing + Sample", label: "New Digitizing + Sample", price: "$60", desc: "Çizimden yeni dijitalleştirme + dikişli örnek" }
                            ].map((s) => (
                                <div
                                    key={s.id}
                                    onClick={() => setServiceType(s.id)}
                                    className={cn(
                                        "p-6 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between gap-4",
                                        serviceType === s.id ? "border-violet-600 bg-violet-600/10" : "border-border bg-accent/30 hover:border-violet-500/50"
                                    )}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0",
                                            serviceType === s.id ? "border-violet-600 bg-violet-600" : "border-border"
                                        )}>
                                            {serviceType === s.id && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className={cn("text-lg font-bold leading-tight", serviceType === s.id ? "text-violet-500" : "text-foreground")}>{s.label}</span>
                                            <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center shrink-0">
                                        <span className="text-emerald-500 font-bold text-base">{s.price}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between">
                            <Button variant="ghost" onClick={prevStep} className="text-foreground hover:bg-accent transition-colors">Geri</Button>
                            <Button onClick={nextStep} className="bg-violet-600 hover:bg-violet-700 px-14 py-3 h-auto rounded-xl">İleri <ChevronRight className="h-4 w-4" /></Button>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-violet-600/20 text-violet-500 dark:text-white flex items-center justify-center font-bold">4</div>
                            <h2 className="text-xl font-semibold text-foreground">Ürün Tipi Seçimi</h2>
                        </div>

                        <div className="flex flex-wrap gap-4 mb-6">
                            {["Garment", "Cap", "Apron"].map(p => (
                                <div
                                    key={p}
                                    onClick={() => setProductType(p)}
                                    className={cn(
                                        "flex items-center gap-2 px-6 py-3 rounded-full border-2 transition-all cursor-pointer",
                                        productType === p ? "border-violet-600 bg-violet-600 text-white" : "border-border bg-accent/30 text-muted-foreground hover:border-violet-500/50"
                                    )}
                                >
                                    <div className={cn(
                                        "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                                        productType === p ? "border-white" : "border-border"
                                    )}>
                                        {productType === p && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                    </div>
                                    <span className="text-sm font-medium">{p === "Garment" ? "Giyim" : p === "Cap" ? "Şapka" : "Önlük"}</span>
                                </div>
                            ))}
                        </div>

                        {productType === "Garment" && (
                            <div className="p-6 bg-card border border-border rounded-2xl space-y-4">
                                <Label className="text-muted-foreground text-sm font-semibold uppercase tracking-wider mb-4 block">Giyim Türü:</Label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                                    {[
                                        "T-Shirt / Jersey", "Twill // İş Kıyafeti",
                                        "Polo (Pike Örme)", "Performans / Poli",
                                        "Fleece / Polar"
                                    ].map((g, idx) => (
                                        <div key={idx} onClick={() => { setGarmentType(g); setIsNotSure(false); setCustomProduct(""); setAddKnockdownStitch(false); }} className="flex items-center gap-3 cursor-pointer group">
                                            <div className={cn(
                                                "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all",
                                                garmentType === g && !isNotSure && !customProduct ? "border-violet-500 bg-violet-500" : "border-border group-hover:border-violet-500/50"
                                            )}>
                                                {garmentType === g && !isNotSure && !customProduct && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                            </div>
                                            <span className={cn("text-sm", garmentType === g && !isNotSure && !customProduct ? "text-violet-500" : "text-muted-foreground hover:text-foreground")}>{g}</span>
                                        </div>
                                    ))}

                                    {/* Emin değilim Option */}
                                    <div
                                        onClick={() => { setIsNotSure(true); setGarmentType(""); setCustomProduct(""); setAddKnockdownStitch(false); }}
                                        className="flex items-center gap-3 cursor-pointer group"
                                    >
                                        <div className={cn(
                                            "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all",
                                            isNotSure ? "border-violet-500 bg-violet-500" : "border-border group-hover:border-violet-500/50"
                                        )}>
                                            {isNotSure && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                        </div>
                                        <span className={cn("text-sm", isNotSure ? "text-violet-500" : "text-muted-foreground hover:text-foreground")}>Emin değilim → Kararı ApprovalStitch&apos;e bırak</span>
                                    </div>

                                    {/* Tüylü (Fluffy) Option */}
                                    <div className="space-y-3">
                                        <div
                                            onClick={() => { setGarmentType("Fluffy"); setIsNotSure(false); setCustomProduct(""); }}
                                            className="flex items-center gap-3 cursor-pointer group"
                                        >
                                            <div className={cn(
                                                "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all",
                                                garmentType === "Fluffy" ? "border-violet-500 bg-violet-500" : "border-border group-hover:border-violet-500/50"
                                            )}>
                                                {garmentType === "Fluffy" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                            </div>
                                            <span className={cn("text-sm", garmentType === "Fluffy" ? "text-violet-500" : "text-muted-foreground hover:text-foreground")}>Tüylü (Havlu, Sherpa vb.)</span>
                                        </div>

                                        {/* Knockdown stitch sub-option - only shows when Fluffy is selected */}
                                        {garmentType === "Fluffy" && (
                                            <div className="ml-7 p-3 bg-accent/50 rounded-lg border border-border/50 animate-in fade-in slide-in-from-top-2 duration-200">
                                                <div
                                                    onClick={() => setAddKnockdownStitch(!addKnockdownStitch)}
                                                    className="flex items-center gap-3 cursor-pointer group"
                                                >
                                                    <div className={cn(
                                                        "w-5 h-5 rounded flex items-center justify-center border-2 transition-all",
                                                        addKnockdownStitch ? "bg-emerald-500 border-emerald-500" : "border-border group-hover:border-violet-500/50"
                                                    )}>
                                                        {addKnockdownStitch && <Check className="h-3 w-3 text-white" />}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className={cn("text-sm font-medium", addKnockdownStitch ? "text-emerald-500" : "text-foreground")}>Knockdown dikişi eklensin mi?</span>
                                                        <span className="text-xs text-muted-foreground">Tüylü kumaşlarda daha iyi kaplama için önerilir</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <div
                                            onClick={() => { setGarmentType(""); setIsNotSure(false); setAddKnockdownStitch(false); }}
                                            className="flex items-center gap-3 cursor-pointer group w-fit"
                                        >
                                            <div className={cn(
                                                "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all",
                                                !garmentType && !isNotSure && customProduct.length >= 0 ? "border-violet-500 bg-violet-500" : "border-border group-hover:border-violet-500/50"
                                            )}>
                                                {!garmentType && !isNotSure && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                            </div>
                                            <span className={cn("text-sm", !garmentType && !isNotSure ? "text-violet-500" : "text-muted-foreground hover:text-foreground")}>Diğer</span>
                                        </div>
                                        <Input
                                            placeholder="Örn: önlük, battaniye, atkı, havlu, özel ürün..."
                                            className="bg-background border-border text-sm h-10 text-foreground focus-visible:ring-violet-500 focus-visible:border-violet-500 placeholder:text-muted-foreground"
                                            value={customProduct}
                                            onFocus={() => {
                                                setGarmentType("");
                                                setIsNotSure(false);
                                                setAddKnockdownStitch(false);
                                            }}
                                            onChange={(e) => setCustomProduct(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-between">
                            <Button variant="ghost" onClick={prevStep} className="text-foreground hover:bg-accent transition-colors">Geri</Button>
                            <Button onClick={nextStep} className="bg-violet-600 hover:bg-violet-700 px-14 py-3 h-auto rounded-xl">İleri <ChevronRight className="h-4 w-4" /></Button>
                        </div>
                    </div>
                )}

                {step === 5 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-violet-600/20 text-violet-500 dark:text-white flex items-center justify-center font-bold">5</div>
                            <h2 className="text-xl font-semibold text-foreground">Not Ekleme (opsiyonel)</h2>
                        </div>

                        <Textarea
                            placeholder="Ek notlar, talimatlar veya tercihler girin..."
                            className="bg-background border-border text-foreground min-h-[200px] rounded-xl focus:border-violet-500"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />

                        {/* Öncelik Seçimi */}
                        <div className="bg-accent/30 border border-border rounded-xl p-5 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-violet-500" />
                                        Sipariş Önceliği
                                    </h3>
                                    <p className="text-xs text-muted-foreground">Normal teslimat süresi 24-48 saattir</p>
                                </div>
                                <div className="flex bg-background p-1 rounded-lg border border-border">
                                    <button
                                        type="button"
                                        onClick={() => setPriority("NORMAL")}
                                        className={cn(
                                            "px-4 py-1.5 rounded-md text-xs font-medium transition-all",
                                            priority === "NORMAL" ? "bg-accent text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        Normal
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPriority("URGENT")}
                                        className={cn(
                                            "px-4 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5",
                                            priority === "URGENT" ? "bg-violet-600 text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        <Rocket className="w-3 h-3" />
                                        Acil
                                    </button>
                                </div>
                            </div>

                            {priority === "URGENT" && (
                                <div className="flex items-start gap-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
                                    <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-amber-600 dark:text-amber-400">Acil İşlem Seçildi</p>
                                        <p className="text-xs text-amber-600/80 dark:text-amber-500/80 leading-relaxed">
                                            Acil öncelik seçmek, siparişinizi kuyruğumuzun en üstüne yerleştirir.
                                            <span className="font-bold"> Lütfen bunun daha yüksek bir fiyat teklifiyle sonuçlanabileceğini unutmayın.</span>
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between">
                            <Button variant="ghost" onClick={prevStep} className="text-muted-foreground hover:bg-accent transition-colors">Geri</Button>
                            <Button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className="bg-violet-600 hover:bg-violet-700 hover:scale-[1.02] active:scale-[0.98] transition-all px-14 py-3 h-auto rounded-xl font-bold shadow-lg shadow-violet-600/20 text-white"
                            >
                                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Siparişi Gönder"}
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* SSS Bölümü */}
            <div className="mt-8 mb-12">
                <Card className="bg-card/50 backdrop-blur-sm border-border overflow-hidden">
                    <CardHeader className="pb-3 border-b border-border/50">
                        <CardTitle className="text-foreground text-lg flex items-center gap-2">
                            <span className="text-violet-500">?</span>
                            Sıkça Sorulan Sorular
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="divide-y divide-border/50">
                            <details className="group py-4">
                                <summary className="flex items-center justify-between cursor-pointer list-none">
                                    <span className="text-muted-foreground group-hover:text-foreground transition-colors pr-2 font-medium">
                                        Siparişim ne zaman hazır olur?
                                    </span>
                                    <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 group-open:rotate-180" />
                                </summary>
                                <div className="mt-3 text-muted-foreground leading-relaxed bg-accent/30 rounded-xl p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                                    Standart siparişler genellikle 24-48 saat içinde tamamlanır. Karmaşık tasarımlar daha uzun sürebilir.
                                </div>
                            </details>

                            <details className="group py-4">
                                <summary className="flex items-center justify-between cursor-pointer list-none">
                                    <span className="text-muted-foreground group-hover:text-foreground transition-colors pr-2 font-medium">
                                        Süreç nasıl işliyor?
                                    </span>
                                    <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 group-open:rotate-180" />
                                </summary>
                                <div className="mt-3 text-muted-foreground leading-relaxed bg-accent/30 rounded-xl p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                                    1) Dosya Yükle → 2) Fiyatlandırma → 3) Fiyat Onayı → 4) Önizleme Onayı → 5) Ödeme → 6) İndir
                                </div>
                            </details>

                            <details className="group py-4">
                                <summary className="flex items-center justify-between cursor-pointer list-none">
                                    <span className="text-muted-foreground group-hover:text-foreground transition-colors pr-2 font-medium">
                                        Revizyon talep edebilir miyim?
                                    </span>
                                    <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 group-open:rotate-180" />
                                </summary>
                                <div className="mt-3 text-muted-foreground leading-relaxed bg-accent/30 rounded-xl p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                                    Evet! Önizleme aldıktan sonra "Mesajlar ve Sipariş Durumu" bölümünden revizyon talebinde bulunabilirsiniz.
                                </div>
                            </details>

                            <details className="group py-4">
                                <summary className="flex items-center justify-between cursor-pointer list-none">
                                    <span className="text-muted-foreground group-hover:text-foreground transition-colors pr-2 font-medium">
                                        Hangi dosya formatlarını kabul ediyorsunuz?
                                    </span>
                                    <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 group-open:rotate-180" />
                                </summary>
                                <div className="mt-3 text-muted-foreground leading-relaxed bg-accent/30 rounded-xl p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                                    DST, EMB, AI, veya PDF
                                </div>
                            </details>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md bg-black/60 animate-in fade-in duration-300">
                    <div className="bg-card border border-border p-8 rounded-3xl max-w-md w-full text-center shadow-2xl shadow-violet-900/20 animate-in zoom-in-95 duration-300">
                        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-ring">
                            <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                                <Check className="h-8 w-8 text-white" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-foreground mb-2">Siparişiniz Başarıyla Oluşturuldu!</h2>
                        <p className="text-muted-foreground mb-8">Nakış siparişiniz alındı ve işleme konuldu.</p>

                        <div className="grid grid-cols-2 gap-4">
                            <Button
                                onClick={() => router.push(`/tr/siparisler/${createdOrderId}`)}
                                className="bg-violet-600 hover:bg-violet-700 py-6 rounded-xl font-semibold text-white shadow-lg shadow-violet-600/20"
                            >
                                Siparişi Göster
                            </Button>
                            <Button
                                onClick={() => router.push('/tr/siparisler')}
                                className="bg-accent hover:bg-accent/80 text-foreground py-6 rounded-xl font-semibold"
                            >
                                Siparişlerim
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
