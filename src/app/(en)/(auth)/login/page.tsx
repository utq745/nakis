"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Header } from "@/components/header";

import { useLanguage } from "@/components/providers/language-provider";

export default function LoginPage() {
    const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const { t } = useLanguage();
    const lp = t.auth.loginPage;

    const handleCredentialsSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        if (activeTab === 'signup') {
            // Register new user
            try {
                const res = await fetch("/api/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: `${firstName} ${lastName}`.trim(),
                        email,
                        password
                    }),
                });

                if (!res.ok) {
                    const data = await res.json();
                    throw new Error(data.error || "Registration failed");
                }

                // Auto login after registration
                const result = await signIn("credentials", {
                    email,
                    password,
                    redirect: false,
                });

                if (result?.error) {
                    setError(result.error);
                } else {
                    // Fetch user language preference
                    const userRes = await fetch("/api/user/profile");
                    const userData = await userRes.json();
                    const redirectPath = userData?.language === "tr" ? "/tr/panel" : "/dashboard";
                    router.push(redirectPath);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Registration failed");
            }
        } else {
            // Sign in
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("Invalid email or password");
            } else {
                // Fetch user language preference
                const userRes = await fetch("/api/user/profile");
                const userData = await userRes.json();
                const redirectPath = userData?.language === "tr" ? "/tr/panel" : "/dashboard";
                router.push(redirectPath);
            }
        }

        setIsLoading(false);
    };

    const handleGoogleSignIn = () => {
        signIn("google", { callbackUrl: "/dashboard" });
    };

    const handleAppleSignIn = () => {
        signIn("apple", { callbackUrl: "/dashboard" });
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#f6f6f8] dark:bg-[#101622] font-[family-name:var(--font-inter)]">
            <Header forceSolid fullWidth />

            <main className="flex-grow flex flex-col lg:flex-row w-full animate-in fade-in duration-500 min-h-screen pt-16">
                {/* Left Side: Visual Sidebar */}
                <div className="hidden lg:flex lg:flex-1 relative overflow-hidden bg-slate-900">
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-90"
                        style={{ backgroundImage: "url('/images/hero/login-bg.webp')" }}
                    >
                    </div>
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    {/* Content Overlay */}
                    <div className="relative z-10 flex flex-col justify-end p-16 w-full">
                        <h2 className="text-white text-4xl font-bold mb-4 tracking-tight">{lp.sidebarTitle}</h2>
                        <p className="text-slate-300 text-lg max-w-md leading-relaxed">
                            {lp.sidebarDesc}
                        </p>
                        <div className="flex gap-4 mt-8">
                            <div className="flex -space-x-2">
                                <Image alt="User Avatar" className="inline-block rounded-full ring-2 ring-white object-cover" src="/images/avatars/avatar-1.webp" width={40} height={40} />
                                <Image alt="User Avatar" className="inline-block rounded-full ring-2 ring-white object-cover" src="/images/avatars/avatar-2.webp" width={40} height={40} />
                                <Image alt="User Avatar" className="inline-block rounded-full ring-2 ring-white object-cover" src="/images/avatars/avatar-3.webp" width={40} height={40} />
                            </div>
                            <div className="flex flex-col justify-center">
                                <span className="text-white text-sm font-semibold">{lp.professionals}</span>
                                <span className="text-slate-400 text-xs">{lp.trustDaily}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Authentication Form */}
                <div className="flex-1 flex flex-col bg-white dark:bg-[#101622] justify-center py-8 lg:py-0">
                    <div className="px-6 sm:px-12 lg:px-16 w-full max-w-xl mx-auto">
                        {/* Tabs */}
                        <div className="mb-8">
                            <div className="flex border-b border-slate-200 dark:border-slate-700 w-full">
                                <button
                                    onClick={() => { setActiveTab('signin'); setError(""); }}
                                    className={`relative pb-4 px-4 font-semibold text-sm transition-colors ${activeTab === 'signin' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                                >
                                    {lp.signIn}
                                </button>
                                <button
                                    onClick={() => { setActiveTab('signup'); setError(""); }}
                                    className={`relative pb-4 px-4 font-semibold text-sm transition-colors ${activeTab === 'signup' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                                >
                                    {lp.createAccount}
                                </button>
                            </div>
                        </div>

                        {/* Welcome Text */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
                                {activeTab === 'signin' ? lp.welcomeBack : lp.getStarted}
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 text-base">
                                {activeTab === 'signin' ? lp.enterDetails : lp.createAccountDesc}
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 flex items-center gap-3"
                            >
                                <span className="material-symbols-outlined text-red-500 text-[20px]">error</span>
                                <p className="text-sm font-medium text-red-600 dark:text-red-400">{error}</p>
                            </motion.div>
                        )}

                        {/* Form */}
                        <form className="space-y-5" onSubmit={handleCredentialsSubmit}>
                            {activeTab === 'signup' && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="firstName">{lp.firstName}</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                                <span className="material-symbols-outlined text-[20px]">person</span>
                                            </div>
                                            <input
                                                className="block w-full pl-10 pr-3 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a2230] text-slate-900 dark:text-white placeholder-slate-400 focus:border-primary focus:ring-primary sm:text-sm shadow-sm"
                                                id="firstName"
                                                type="text"
                                                placeholder={lp.firstName}
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                required={activeTab === 'signup'}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="lastName">{lp.lastName}</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                                <span className="material-symbols-outlined text-[20px]">person</span>
                                            </div>
                                            <input
                                                className="block w-full pl-10 pr-3 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a2230] text-slate-900 dark:text-white placeholder-slate-400 focus:border-primary focus:ring-primary sm:text-sm shadow-sm"
                                                id="lastName"
                                                type="text"
                                                placeholder={lp.lastName}
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                required={activeTab === 'signup'}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="email">{lp.emailAddress}</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                        <span className="material-symbols-outlined text-[20px]">mail</span>
                                    </div>
                                    <input
                                        className="block w-full pl-10 pr-3 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a2230] text-slate-900 dark:text-white placeholder-slate-400 focus:border-primary focus:ring-primary sm:text-sm shadow-sm"
                                        id="email"
                                        type="email"
                                        placeholder={lp.emailPlaceholder}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="password">{lp.password}</label>
                                    {activeTab === 'signin' && (
                                        <a href="/forgot-password" className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">{lp.forgotPassword}</a>
                                    )}
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                        <span className="material-symbols-outlined text-[20px]">lock</span>
                                    </div>
                                    <input
                                        className="block w-full pl-10 pr-10 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a2230] text-slate-900 dark:text-white placeholder-slate-400 focus:border-primary focus:ring-primary sm:text-sm shadow-sm"
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-500"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex w-full justify-center items-center rounded-lg bg-primary py-3 px-4 text-sm font-bold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        {t.common.loading}
                                    </span>
                                ) : (
                                    activeTab === 'signin' ? lp.signIn : lp.createAccount
                                )}
                            </button>
                        </form>

                        {/* Social Login Divider */}
                        <div className="relative mt-8 mb-8">
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                            </div>
                            <div className="relative flex justify-center">
                                <span className="bg-white dark:bg-[#101622] px-3 text-xs font-medium text-slate-500 uppercase tracking-wider">{lp.orContinueWith}</span>
                            </div>
                        </div>

                        {/* Social Buttons */}
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={handleGoogleSignIn}
                                type="button"
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-white dark:bg-[#1a2230] border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-white shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            >
                                {/* Official Google Logo */}
                                <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                <span>{lp.google}</span>
                            </button>
                            <button
                                onClick={handleAppleSignIn}
                                type="button"
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-white dark:bg-[#1a2230] border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-white shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            >
                                {/* Official Apple Logo */}
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                                </svg>
                                <span>{lp.apple}</span>
                            </button>
                        </div>

                        {/* Footer Legal */}
                        <p className="mt-8 text-center text-xs text-slate-500 dark:text-slate-400">
                            {lp.termsText}
                            <a href="#" className="font-medium text-primary hover:underline mx-1">{lp.termsOfService}</a>
                            {lp.and}
                            <a href="#" className="font-medium text-primary hover:underline mx-1">{lp.privacyPolicy}</a>{lp.agree}
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
