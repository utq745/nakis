"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Upload, X, FileIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function NewOrderPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [files, setFiles] = useState<File[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setFiles((prev) => [...prev, ...newFiles]);
        }
    };

    const removeFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData(e.currentTarget);
            const title = formData.get("title") as string;
            const description = formData.get("description") as string;

            // Create order
            const response = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, description }),
            });

            if (!response.ok) {
                throw new Error("Sipariş oluşturulamadı");
            }

            const order = await response.json();

            // Upload files if any
            if (files.length > 0) {
                const uploadFormData = new FormData();
                files.forEach((file) => {
                    uploadFormData.append("files", file);
                });
                uploadFormData.append("orderId", order.id);
                uploadFormData.append("type", "original");

                await fetch("/api/files/upload", {
                    method: "POST",
                    body: uploadFormData,
                });
            }

            toast.success("Sipariş başarıyla oluşturuldu");
            router.push(`/orders/${order.id}`);
        } catch (error) {
            toast.error("Sipariş oluşturulurken bir hata oluştu");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Back Button */}
            <Link
                href="/orders"
                className="inline-flex items-center text-zinc-400 hover:text-white transition-colors"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Siparişlere Dön
            </Link>

            <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                    <CardTitle className="text-white">Yeni Sipariş Oluştur</CardTitle>
                    <CardDescription className="text-zinc-400">
                        Nakış tasarımınız için yeni bir sipariş oluşturun. Dosyalarınızı
                        yükleyin ve siparişinizi açıklayın.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-zinc-300">
                                Sipariş Başlığı
                            </Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="Örn: Logo Nakış Tasarımı"
                                required
                                disabled={isLoading}
                                className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-violet-500"
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-zinc-300">
                                Açıklama
                            </Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Tasarım detaylarını açıklayın... (boyut, renk tercihleri, özel istekler)"
                                rows={4}
                                disabled={isLoading}
                                className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-violet-500 resize-none"
                            />
                        </div>

                        {/* File Upload */}
                        <div className="space-y-2">
                            <Label className="text-zinc-300">Dosyalar</Label>
                            <div className="border-2 border-dashed border-zinc-700 rounded-lg p-6 text-center hover:border-violet-500/50 transition-colors">
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="file-upload"
                                    accept="image/*,.pdf,.ai,.eps,.svg"
                                    disabled={isLoading}
                                />
                                <label
                                    htmlFor="file-upload"
                                    className="cursor-pointer flex flex-col items-center"
                                >
                                    <Upload className="h-10 w-10 text-zinc-500 mb-2" />
                                    <span className="text-zinc-400">
                                        Dosyaları sürükleyin veya tıklayarak seçin
                                    </span>
                                    <span className="text-xs text-zinc-500 mt-1">
                                        PNG, JPG, PDF, AI, EPS, SVG (max 10MB)
                                    </span>
                                </label>
                            </div>

                            {/* File List */}
                            {files.length > 0 && (
                                <div className="space-y-2 mt-4">
                                    {files.map((file, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50"
                                        >
                                            <div className="flex items-center gap-3">
                                                <FileIcon className="h-5 w-5 text-violet-400" />
                                                <div>
                                                    <p className="text-sm text-white">{file.name}</p>
                                                    <p className="text-xs text-zinc-500">
                                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                                    </p>
                                                </div>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeFile(index)}
                                                disabled={isLoading}
                                                className="text-zinc-400 hover:text-red-400"
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Submit */}
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Oluşturuluyor...
                                </>
                            ) : (
                                "Sipariş Oluştur"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
