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
        if (e.target.files && e.target.files.length > 0) {
            // Only allow one file
            setFiles([e.target.files[0]]);
        }
    };

    async function handleSubmit() {
        if (files.length === 0) {
            toast.error("Please upload at least one file");
            setStep(1);
            return;
        }

        setIsLoading(true);
        const startTime = Date.now();

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
                    garmentType: isNotSure ? "Not Sure" : garmentType,
                    isNotSure,
                    customProduct,
                    addKnockdownStitch,
                    priority,
                }),
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || "Failed to create order");
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

            // Ensure at least 2 seconds have passed
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime < 2000) {
                await new Promise(resolve => setTimeout(resolve, 2000 - elapsedTime));
            }

            if (!uploadRes.ok) {
                toast.error("Order created but file upload failed. You can upload files from the order page.");
            } else {
                toast.success("Job submitted successfully!");
            }

            setCreatedOrderId(order.id);
            setShowSuccessModal(true);
        } catch (error) {
            // Check if it's a server response with an error message
            const errorMessage = error instanceof Error ? error.message : "An error occurred during submission";
            toast.error(errorMessage);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const nextStep = () => {
        if (step === 1 && files.length === 0) {
            toast.error("Please upload a file first");
            return;
        }
        if (step === 2 && !machine) {
            toast.error("Please select a machine");
            return;
        }
        if (step === 3 && !serviceType) {
            toast.error("Please select a service type");
            return;
        }
        if (step === 4) {
            if (!productType) {
                toast.error("Please select a product type");
                return;
            }
            if (productType === "Garment" && !garmentType && !isNotSure && !customProduct) {
                toast.error("Please select a garment type or describe your product");
                return;
            }
        }
        if (step < 5) setStep((step + 1) as Step);
    };

    const prevStep = () => {
        if (step > 1) setStep((step - 1) as Step);
    };

    const steps = [
        { id: 1, name: "Upload File", icon: Upload },
        { id: 2, name: "Select Machine", icon: Scissors }, // Using Scissors as Machine icon placeholder
        { id: 3, name: "Service Type", icon: Layers },
        { id: 4, name: "Product Type", icon: Shirt },
        { id: 5, name: "Add Notes", icon: ClipboardList },
    ];

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <UploadOverlay isVisible={isLoading} message="Submitting your job..." />
            <h1 className="text-3xl font-bold text-foreground mb-8">New Embroidery Job</h1>

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
                            step >= s.id ? "text-violet-500 dark:text-white" : "text-muted-foreground dark:text-zinc-500"
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
                            <h2 className="text-xl font-semibold text-foreground">Upload File</h2>
                        </div>
                        <div
                            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                            onDragLeave={() => setIsDragOver(false)}
                            onDrop={(e) => {
                                e.preventDefault();
                                setIsDragOver(false);
                                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                                    // Only allow one file
                                    setFiles([e.dataTransfer.files[0]]);
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
                                className="hidden"
                                accept=".dst,.emb,.ai,.pdf,.jpg,.jpeg,.png,image/jpeg,image/png"
                                onChange={handleFileChange}
                            />
                            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                                <Upload className="h-8 w-8 text-violet-500" />
                            </div>
                            <div className="flex justify-center gap-2 mb-2">
                                <Button variant="secondary" size="sm" className="bg-accent border-border hover:bg-accent/80 text-xs text-foreground">Choose File</Button>
                                <span className="text-muted-foreground text-sm py-1">No file chosen</span>
                            </div>
                            <p className="text-muted-foreground text-xs">or drag & drop your AI, PDF, PNG, JPG, DST or JPEG file here (max 50MB)</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="projectName" className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Project Name (Optional)</Label>
                                <Input
                                    id="projectName"
                                    placeholder="Enter a name for this project..."
                                    className="bg-background border-border text-foreground focus-visible:ring-violet-500 focus-visible:border-violet-500 placeholder:text-muted-foreground h-12 rounded-xl"
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                />
                                <p className="text-[10px] text-muted-foreground italic">If left blank, the order ID will be used as the project name.</p>
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
                                            title="Remove file"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="flex justify-end">
                            <Button onClick={nextStep} disabled={files.length === 0} className="bg-violet-600 hover:bg-violet-700 px-14 py-3 h-auto rounded-xl">Next <ChevronRight className="h-4 w-4" /></Button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-violet-600/20 text-violet-500 dark:text-white flex items-center justify-center font-bold">2</div>
                            <h2 className="text-xl font-semibold text-foreground">Select Machine</h2>
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
                                        machine === m ? "border-violet-600 bg-violet-600" : "border-border"
                                    )}>
                                        {machine === m && <Check className="h-3 w-3 text-white" />}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between">
                            <Button variant="ghost" onClick={prevStep} className="text-foreground hover:bg-accent transition-colors">Previous</Button>
                            <Button onClick={nextStep} className="bg-violet-600 hover:bg-violet-700 px-12 py-3 h-auto rounded-xl">Next <ChevronRight className="ml-2 h-4 w-4" /></Button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-violet-600/20 text-violet-500 dark:text-white flex items-center justify-center font-bold">3</div>
                            <h2 className="text-xl font-semibold text-foreground">Select Service Type</h2>
                        </div>

                        <div className="space-y-3">
                            {[
                                { id: "Approval Sample (Existing DST)", label: "Approval Sample (Existing DST)", price: "$25", desc: "Check stitch quality of your existing DST file", isQuote: false },
                                { id: "Fix Your DST + Sample", label: "Fix Your DST + Sample", price: "$35", desc: "Minor fixes + stitched approval sample", isQuote: false },
                                { id: "New Digitizing + Sample", label: "New Digitizing + Sample", price: "Get Quote", desc: "New digitizing from artwork + stitched sample", isQuote: true }
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
                                        <span className={cn(
                                            "font-bold text-base",
                                            s.isQuote ? "text-amber-500" : "text-emerald-500"
                                        )}>{s.price}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between">
                            <Button variant="ghost" onClick={prevStep} className="text-foreground hover:bg-accent transition-colors">Previous</Button>
                            <Button onClick={nextStep} className="bg-violet-600 hover:bg-violet-700 px-14 py-3 h-auto rounded-xl">Next <ChevronRight className="h-4 w-4" /></Button>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-violet-600/20 text-violet-500 dark:text-white flex items-center justify-center font-bold">4</div>
                            <h2 className="text-xl font-semibold text-foreground">Select Product Type</h2>
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
                                    <span className="text-sm font-medium">{p}</span>
                                </div>
                            ))}
                        </div>

                        {productType === "Garment" && (
                            <div className="p-6 bg-card border border-border rounded-2xl space-y-4">
                                <Label className="text-muted-foreground text-sm font-semibold uppercase tracking-wider mb-4 block">Garment Type:</Label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                                    {[
                                        "T-Shirt / Jersey", "Twill // Workwear",
                                        "Polo (Pique Knit)", "Performance / Poly",
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

                                    {/* Not Sure Option */}
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
                                        <span className={cn("text-sm", isNotSure ? "text-violet-500" : "text-muted-foreground hover:text-foreground")}>Not sure → Let ApprovalStitch decide</span>
                                    </div>

                                    {/* Fluffy Option */}
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
                                            <span className={cn("text-sm", garmentType === "Fluffy" ? "text-violet-500" : "text-muted-foreground hover:text-foreground")}>Fluffy (Towel, Sherpa, etc.)</span>
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
                                                        <span className={cn("text-sm font-medium", addKnockdownStitch ? "text-emerald-500" : "text-foreground")}>Add knockdown stitch?</span>
                                                        <span className="text-xs text-muted-foreground">Recommended for better coverage on fluffy fabrics</span>
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
                                            <span className={cn("text-sm", !garmentType && !isNotSure ? "text-violet-500" : "text-muted-foreground hover:text-foreground")}>Other</span>
                                        </div>
                                        <Input
                                            placeholder="Describe the item: e.g. apron, blanket, scarf, towel, custom item..."
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
                            <Button variant="ghost" onClick={prevStep} className="text-foreground hover:bg-accent transition-colors">Previous</Button>
                            <Button onClick={nextStep} className="bg-violet-600 hover:bg-violet-700 px-14 py-3 h-auto rounded-xl">Next <ChevronRight className="h-4 w-4" /></Button>
                        </div>
                    </div>
                )}

                {step === 5 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-violet-600/20 text-violet-500 dark:text-white flex items-center justify-center font-bold">5</div>
                            <h2 className="text-xl font-semibold text-foreground">Add Notes (optional)</h2>
                        </div>

                        <Textarea
                            placeholder="Enter any additional notes, instructions, or preferences..."
                            className="bg-background border-border text-foreground min-h-[200px] rounded-xl focus:border-violet-500"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />

                        {/* Priority Selection */}
                        <div className="bg-accent/30 border border-border rounded-xl p-5 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-violet-500" />
                                        Order Priority
                                    </h3>
                                    <p className="text-xs text-muted-foreground">Normal delivery is 24-48 hours</p>
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
                                        Urgent
                                    </button>
                                </div>
                            </div>

                            {priority === "URGENT" && (
                                <div className="flex items-start gap-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
                                    <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-amber-600 dark:text-amber-400">Urgent Processing Selected</p>
                                        <p className="text-xs text-amber-600/80 dark:text-amber-500/80 leading-relaxed">
                                            Choosing urgent priority will place your order at the top of our queue.
                                            <span className="font-bold"> Please note that this may result in a higher price quote.</span>
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between">
                            <Button variant="ghost" onClick={prevStep} className="text-muted-foreground hover:bg-accent transition-colors">Previous</Button>
                            <Button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className="bg-violet-600 hover:bg-violet-700 hover:scale-[1.02] active:scale-[0.98] transition-all px-14 py-3 h-auto rounded-xl font-bold shadow-lg shadow-violet-600/20 text-white"
                            >
                                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Submit Job"}
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* FAQ Section */}
            <div className="mt-8 mb-12">
                <Card className="bg-card/50 backdrop-blur-sm border-border overflow-hidden">
                    <CardHeader className="pb-3 border-b border-border/50">
                        <CardTitle className="text-foreground text-lg flex items-center gap-2">
                            <span className="text-violet-500">?</span>
                            FAQ
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="divide-y divide-border/50">
                            <details className="group py-4">
                                <summary className="flex items-center justify-between cursor-pointer list-none">
                                    <span className="text-muted-foreground group-hover:text-foreground transition-colors pr-2 font-medium">
                                        When will my order be ready?
                                    </span>
                                    <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 group-open:rotate-180" />
                                </summary>
                                <div className="mt-3 text-muted-foreground leading-relaxed bg-accent/30 rounded-xl p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                                    Standard orders are typically completed within 24-48 hours. Complex designs may take longer.
                                </div>
                            </details>

                            <details className="group py-4">
                                <summary className="flex items-center justify-between cursor-pointer list-none">
                                    <span className="text-muted-foreground group-hover:text-foreground transition-colors pr-2 font-medium">
                                        How does the process work?
                                    </span>
                                    <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 group-open:rotate-180" />
                                </summary>
                                <div className="mt-3 text-muted-foreground leading-relaxed bg-accent/30 rounded-xl p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                                    1) Upload File → 2) Pricing → 3) Price Approval → 4) Preview Approval → 5) Payment → 6) Download
                                </div>
                            </details>

                            <details className="group py-4">
                                <summary className="flex items-center justify-between cursor-pointer list-none">
                                    <span className="text-muted-foreground group-hover:text-foreground transition-colors pr-2 font-medium">
                                        Can I request revisions?
                                    </span>
                                    <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 group-open:rotate-180" />
                                </summary>
                                <div className="mt-3 text-muted-foreground leading-relaxed bg-accent/30 rounded-xl p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                                    Yes! After receiving your preview, request revisions through the "Messages & Order Status" section.
                                </div>
                            </details>

                            <details className="group py-4">
                                <summary className="flex items-center justify-between cursor-pointer list-none">
                                    <span className="text-muted-foreground group-hover:text-foreground transition-colors pr-2 font-medium">
                                        Which file formats are supported?
                                    </span>
                                    <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 group-open:rotate-180" />
                                </summary>
                                <div className="mt-3 text-muted-foreground leading-relaxed bg-accent/30 rounded-xl p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                                    DST, EMB, AI, or PDF
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
                        <h2 className="text-2xl font-bold text-foreground mb-2">Order Created Successfully!</h2>
                        <p className="text-muted-foreground mb-8">Your embroidery job has been submitted and is being processed.</p>

                        <div className="grid grid-cols-2 gap-4">
                            <Button
                                onClick={() => router.push(`/orders/${createdOrderId}`)}
                                className="bg-violet-600 hover:bg-violet-700 py-6 rounded-xl font-semibold text-white shadow-lg shadow-violet-600/20"
                            >
                                View Job
                            </Button>
                            <Button
                                onClick={() => router.push('/orders')}
                                className="bg-accent hover:bg-accent/80 text-foreground py-6 rounded-xl font-semibold"
                            >
                                My Jobs
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
