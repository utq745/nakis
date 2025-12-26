"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { useLanguage } from "@/components/providers/language-provider";

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const { language } = useLanguage();

    const texts = {
        en: {
            title: "Reset Password",
            description: "Enter your new password below.",
            newPassword: "New Password",
            confirmPassword: "Confirm Password",
            passwordPlaceholder: "••••••••",
            submit: "Reset Password",
            resetting: "Resetting...",
            successTitle: "Password Reset!",
            successDesc: "Your password has been successfully reset. You can now log in with your new password.",
            backToLogin: "Go to Login",
            invalidToken: "Invalid or Expired Link",
            invalidTokenDesc: "This password reset link is invalid or has expired. Please request a new one.",
            requestNewLink: "Request New Link",
            passwordMismatch: "Passwords do not match",
            passwordTooShort: "Password must be at least 8 characters",
        },
        tr: {
            title: "Şifre Sıfırla",
            description: "Yeni şifrenizi aşağıya girin.",
            newPassword: "Yeni Şifre",
            confirmPassword: "Şifreyi Onayla",
            passwordPlaceholder: "••••••••",
            submit: "Şifreyi Sıfırla",
            resetting: "Sıfırlanıyor...",
            successTitle: "Şifre Sıfırlandı!",
            successDesc: "Şifreniz başarıyla sıfırlandı. Artık yeni şifrenizle giriş yapabilirsiniz.",
            backToLogin: "Girişe Git",
            invalidToken: "Geçersiz veya Süresi Dolmuş Bağlantı",
            invalidTokenDesc: "Bu şifre sıfırlama bağlantısı geçersiz veya süresi dolmuş. Lütfen yeni bir tane talep edin.",
            requestNewLink: "Yeni Bağlantı İste",
            passwordMismatch: "Şifreler eşleşmiyor",
            passwordTooShort: "Şifre en az 8 karakter olmalıdır",
        },
    };

    const t = texts[language as keyof typeof texts] || texts.en;
    const basePath = language === "tr" ? "/tr" : "";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password.length < 8) {
            setError(t.passwordTooShort);
            return;
        }

        if (password !== confirmPassword) {
            setError(t.passwordMismatch);
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to reset password");
            }

            setSuccess(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-3xl">error</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    {t.invalidToken}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                    {t.invalidTokenDesc}
                </p>
                <Link
                    href={`${basePath}/forgot-password`}
                    className="flex w-full justify-center items-center rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 px-4 text-sm font-bold text-white"
                >
                    {t.requestNewLink}
                </Link>
            </div>
        );
    }

    if (success) {
        return (
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
                <Link
                    href={`${basePath}/login`}
                    className="flex w-full justify-center items-center rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 px-4 text-sm font-bold text-white"
                >
                    {t.backToLogin}
                </Link>
            </div>
        );
    }

    return (
        <>
            {/* Header */}
            <div className="text-center mb-8">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-white text-3xl">password</span>
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
                        {t.newPassword}
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <span className="material-symbols-outlined text-[20px]">lock</span>
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={t.passwordPlaceholder}
                            required
                            minLength={8}
                            className="block w-full pl-10 pr-10 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a2230] text-slate-900 dark:text-white placeholder-slate-400 focus:border-violet-500 focus:ring-violet-500 sm:text-sm shadow-sm"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-500"
                        >
                            <span className="material-symbols-outlined text-[20px]">
                                {showPassword ? "visibility_off" : "visibility"}
                            </span>
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        {t.confirmPassword}
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <span className="material-symbols-outlined text-[20px]">lock</span>
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder={t.passwordPlaceholder}
                            required
                            minLength={8}
                            className="block w-full pl-10 pr-3 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a2230] text-slate-900 dark:text-white placeholder-slate-400 focus:border-violet-500 focus:ring-violet-500 sm:text-sm shadow-sm"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex w-full justify-center items-center rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 px-4 text-sm font-bold text-white shadow-sm hover:from-violet-500 hover:to-fuchsia-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? t.resetting : t.submit}
                </button>
            </form>
        </>
    );
}

export default function ResetPasswordPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#f6f6f8] dark:bg-[#101622] font-[family-name:var(--font-inter)]">
            <Header />

            <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-24">
                <div className="w-full max-w-md">
                    <div className="bg-white dark:bg-[#1a2230] rounded-2xl shadow-xl p-8">
                        <Suspense fallback={<div className="text-center">Loading...</div>}>
                            <ResetPasswordForm />
                        </Suspense>
                    </div>
                </div>
            </main>
        </div>
    );
}
