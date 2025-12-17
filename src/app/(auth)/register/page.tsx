"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";

export default function RegisterPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (password !== confirmPassword) {
            setError("Şifreler eşleşmiyor");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Kayıt sırasında bir hata oluştu");
            } else {
                router.push("/login?registered=true");
            }
        } catch {
            setError("Kayıt sırasında bir hata oluştu");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-4">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            <Card className="w-full max-w-md relative bg-zinc-900/80 border-zinc-800 backdrop-blur-sm">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500">
                            <Sparkles className="h-8 w-8 text-white" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                        Kayıt Ol
                    </CardTitle>
                    <CardDescription className="text-zinc-400">
                        Nakış digitizing siparişlerinizi yönetin
                    </CardDescription>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        {error && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-zinc-300">İsim</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Adınız"
                                required
                                disabled={isLoading}
                                className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-violet-500 focus:ring-violet-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-zinc-300">E-posta</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="ornek@email.com"
                                required
                                disabled={isLoading}
                                className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-violet-500 focus:ring-violet-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-zinc-300">Şifre</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                required
                                minLength={6}
                                disabled={isLoading}
                                className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-violet-500 focus:ring-violet-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-zinc-300">Şifre Tekrar</Label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                required
                                minLength={6}
                                disabled={isLoading}
                                className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-violet-500 focus:ring-violet-500"
                            />
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col gap-4">
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-medium"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Kayıt olunuyor...
                                </>
                            ) : (
                                "Kayıt Ol"
                            )}
                        </Button>

                        <p className="text-sm text-zinc-400 text-center">
                            Zaten hesabınız var mı?{" "}
                            <Link href="/login" className="text-violet-400 hover:text-violet-300 transition-colors">
                                Giriş yapın
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
