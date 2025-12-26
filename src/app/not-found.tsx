"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LanguageProvider, useLanguage } from "@/components/providers/language-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Providers } from "@/components/providers";
import { geistSans, geistMono, inter } from "./fonts";

function NotFoundContent() {
    const { t, language } = useLanguage();

    return (
        <div className="flex flex-col min-h-screen bg-[#f8fafc] dark:bg-[#09090b] font-[family-name:var(--font-inter)]">
            <Header />

            <main className="flex-grow flex items-center justify-center p-6 pt-32">
                <div className="max-w-xl w-full text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative mb-12"
                    >
                        <h1 className="text-[12rem] md:text-[16rem] font-black text-primary/10 leading-none select-none">
                            404
                        </h1>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[100px] text-primary animate-bounce">
                                search_off
                            </span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h2 className="text-4xl font-black text-[#172136] dark:text-white mb-6">
                            {t.notFound.title}
                        </h2>
                        <p className="text-lg text-[#616f89] dark:text-gray-400 mb-10 leading-relaxed">
                            {t.notFound.description}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href={language === 'tr' ? '/tr' : '/'}>
                                <button className="px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 flex items-center gap-2">
                                    <span className="material-symbols-outlined">home</span>
                                    {t.notFound.backHome}
                                </button>
                            </Link>
                            <Link href={language === 'tr' ? '/tr/iletisim' : '/contact'}>
                                <button className="px-8 py-4 bg-white dark:bg-[#18181b] text-[#172136] dark:text-white rounded-xl font-bold text-lg hover:bg-gray-50 dark:hover:bg-[#27272a] border border-[#e5e7eb] dark:border-[#27272a] transition-all flex items-center gap-2">
                                    <span className="material-symbols-outlined">support_agent</span>
                                    {t.notFound.contactSupport}
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default function NotFound() {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta name="robots" content="noindex, nofollow" />
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased font-sans`}>
                <Providers>
                    <LanguageProvider initialLang="en">
                        <NotFoundContent />
                    </LanguageProvider>
                </Providers>
            </body>
        </html>
    );
}
