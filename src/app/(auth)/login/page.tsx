"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles, Globe } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function LoginPage() {
    const router = useRouter();
    const { t, setLanguage } = useLanguage();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError(t.common.error);
            } else {
                router.push("/dashboard");
                router.refresh();
            }
        } catch {
            setError(t.common.error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-4 relative">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            {/* Language Switcher */}
            <div className="absolute top-4 right-4 z-10">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-zinc-400 hover:text-white"
                        >
                            <Globe className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-32 bg-zinc-900 border-zinc-800"
                        align="end"
                    >
                        <DropdownMenuItem
                            className="text-zinc-300 focus:text-white focus:bg-zinc-800 cursor-pointer"
                            onClick={() => setLanguage("tr")}
                        >
                            🇹🇷 Türkçe
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="text-zinc-300 focus:text-white focus:bg-zinc-800 cursor-pointer"
                            onClick={() => setLanguage("en")}
                        >
                            🇺🇸 English
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <Card className="w-full max-w-md relative bg-zinc-900/80 border-zinc-800 backdrop-blur-sm">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500">
                            <Sparkles className="h-8 w-8 text-white" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                        Nakış Digitizing
                    </CardTitle>
                    <CardDescription className="text-zinc-400">
                        {t.auth.login}
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
                            <Label htmlFor="email" className="text-zinc-300">{t.auth.email}</Label>
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
                            <Label htmlFor="password" className="text-zinc-300">{t.auth.password}</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                required
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
                                    {t.common.loading}
                                </>
                            ) : (
                                t.auth.login
                            )}
                        </Button>

                        <p className="text-sm text-zinc-400 text-center">
                            {t.auth.noAccount}{" "}
                            <Link href="/register" className="text-violet-400 hover:text-violet-300 transition-colors">
                                {t.auth.register}
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
