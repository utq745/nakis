"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { useLanguage } from "@/components/providers/language-provider";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const { language } = useLanguage();

    const texts = {
        en: {
            title: "Forgot Password",
            description: "Enter your email address and we'll send you a link to reset your password.",
            emailLabel: "Email Address",
            emailPlaceholder: "you@example.com",
            submit: "Send Reset Link",
            sending: "Sending...",
            successTitle: "Check your email",
            successDesc: "If an account exists with this email, you will receive a password reset link shortly.",
            backToLogin: "Back to Login",
            tryAgain: "Try Again",
        },
        tr: {
            title: "Şifremi Unuttum",
            description: "E-posta adresinizi girin, size şifre sıfırlama bağlantısı gönderelim.",
            emailLabel: "E-posta Adresi",
            emailPlaceholder: "ornek@email.com",
            submit: "Sıfırlama Bağlantısı Gönder",
            sending: "Gönderiliyor...",
            successTitle: "E-postanızı kontrol edin",
            successDesc: "Bu e-posta ile bir hesap varsa, kısa süre içinde şifre sıfırlama bağlantısı alacaksınız.",
            backToLogin: "Girişe Dön",
            tryAgain: "Tekrar Dene",
        },
    };

    const t = texts[language as keyof typeof texts] || texts.en;
    const basePath = language === "tr" ? "/tr" : "";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to send reset email");
            }

            setSuccess(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#f6f6f8] dark:bg-[#101622] font-[family-name:var(--font-inter)]">
            <Header />

            <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-24">
                <div className="w-full max-w-md">
                    <div className="bg-white dark:bg-[#1a2230] rounded-2xl shadow-xl p-8">
                        {!success ? (
                            <>
                                {/* Header */}
                                <div className="text-center mb-8">
                                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center mb-4">
                                        <span className="material-symbols-outlined text-white text-3xl">lock_reset</span>
                                    </div>
                                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                        {t.title}
                                    </h1>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                                        {t.description}
                                    </p>
                                </div>

                                {/* Error */}
                                {error && (
                                    <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                                    </div>
                                )}

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                            {t.emailLabel}
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                                <span className="material-symbols-outlined text-[20px]">mail</span>
                                            </div>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder={t.emailPlaceholder}
                                                required
                                                className="block w-full pl-10 pr-3 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a2230] text-slate-900 dark:text-white placeholder-slate-400 focus:border-violet-500 focus:ring-violet-500 sm:text-sm shadow-sm"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="flex w-full justify-center items-center rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 px-4 text-sm font-bold text-white shadow-sm hover:from-violet-500 hover:to-fuchsia-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? t.sending : t.submit}
                                    </button>
                                </form>

                                <div className="mt-6 text-center">
                                    <Link
                                        href={`${basePath}/login`}
                                        className="text-sm font-medium text-violet-600 hover:text-violet-500 dark:text-violet-400"
                                    >
                                        ← {t.backToLogin}
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Success State */}
                                <div className="text-center">
                                    <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                                        <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-3xl">check_circle</span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                        {t.successTitle}
                                    </h2>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                                        {t.successDesc}
                                    </p>
                                    <div className="flex flex-col gap-3">
                                        <Link
                                            href={`${basePath}/login`}
                                            className="flex w-full justify-center items-center rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 px-4 text-sm font-bold text-white"
                                        >
                                            {t.backToLogin}
                                        </Link>
                                        <button
                                            onClick={() => {
                                                setSuccess(false);
                                                setEmail("");
                                            }}
                                            className="text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400"
                                        >
                                            {t.tryAgain}
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
