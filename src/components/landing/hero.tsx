"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/providers/language-provider";
import { HeroBackground } from "./hero-background";
import { useSession } from "next-auth/react";

export function Hero() {
    const { t, language } = useLanguage();
    const { data: session } = useSession();

    const isLoggedIn = !!session;
    const isAdmin = session?.user?.role === "ADMIN";
    const panelUrl = language === 'tr' ? '/tr/panel' : '/dashboard';
    const newOrderUrl = language === 'tr' ? '/tr/siparisler/new' : '/orders/new';
    const loginUrl = language === 'tr' ? '/tr/giris' : '/login';

    return (
        <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden bg-[#F6F7F8] dark:bg-[#172136] pt-32 pb-20 md:pt-40 md:pb-32">
            <HeroBackground />

            <div className="container relative z-10 mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="flex flex-col gap-8 p-6 sm:p-8 md:p-12 rounded-[2.5rem] bg-white/40 dark:bg-black/20 backdrop-blur-md border border-black/5 dark:border-white/10 shadow-2xl relative overflow-hidden group"
                    >
                        {/* Subtle inner highlight */}
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
                        <div className="flex flex-col gap-6">


                            <h1 className="text-[clamp(1.75rem,5vw,3.75rem)] font-black tracking-tight text-primary dark:text-white leading-[1.1] break-words">
                                {t.landing.hero.titleLine1} <br />
                                <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                                    {t.landing.hero.titleLine2}
                                </span>
                            </h1>

                            <div className="flex flex-col gap-4">
                                <p
                                    className="text-slate-600 dark:text-white/80 text-lg md:text-xl leading-relaxed max-w-[540px]"
                                    dangerouslySetInnerHTML={{ __html: t.landing.hero.description }}
                                />
                                <p className="text-slate-500 dark:text-white/60 text-sm md:text-base font-medium mb-2">
                                    {t.landing.hero.subText}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-8">
                            <div className="flex flex-wrap gap-4">
                                {isLoggedIn ? (
                                    <>
                                        {!isAdmin ? (
                                            <Link href={newOrderUrl}>
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="px-8 h-14 bg-primary text-white rounded-xl font-black text-lg shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all flex items-center gap-3 group"
                                                >
                                                    {t.landing.hero.uploadBtn}
                                                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                                </motion.button>
                                            </Link>
                                        ) : (
                                            <Link href={panelUrl}>
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="px-8 h-14 bg-primary text-white rounded-xl font-black text-lg shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all flex items-center gap-3 group"
                                                >
                                                    {t.header.panel}
                                                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                                </motion.button>
                                            </Link>
                                        )}
                                    </>
                                ) : (
                                    <Link href={loginUrl}>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="px-8 h-14 bg-primary text-white rounded-xl font-black text-lg shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all flex items-center gap-3 group"
                                        >
                                            {t.landing.hero.uploadBtn}
                                            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                        </motion.button>
                                    </Link>
                                )}
                                <Link href="#samples">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="px-8 h-14 bg-white dark:bg-white/5 backdrop-blur-md text-primary dark:text-white border border-black/5 dark:border-white/20 rounded-xl font-bold text-lg hover:bg-white dark:hover:bg-white/10 transition-all shadow-sm"
                                    >
                                        {t.landing.hero.pricingBtn}
                                    </motion.button>
                                </Link>
                            </div>

                            <div className="flex flex-wrap items-center gap-6 pt-2">
                                <div className="flex items-center gap-2 group">
                                    <div className="size-10 rounded-full bg-green-500/10 dark:bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-[20px] text-green-600 dark:text-green-400 font-bold">verified</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-slate-700 dark:text-white text-sm font-bold leading-none tracking-tight">{t.landing.hero.labBadge}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 group">
                                    <div className="size-10 rounded-full bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-[20px] text-blue-600 dark:text-blue-400 font-bold">check_circle</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-slate-700 dark:text-white text-sm font-bold leading-none tracking-tight">{t.landing.hero.readyBadge}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative lg:ml-10"
                    >
                        <div className="relative z-10 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)] border-[8px] border-white/50 dark:border-white/5 backdrop-blur-sm group bg-slate-100 dark:bg-slate-900">
                            <Image
                                src="/images/hero/hero.webp"
                                alt="High-quality real stitched embroidery sample"
                                width={600}
                                height={600}
                                priority
                                className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 dark:from-black/40 via-transparent to-transparent opacity-60"></div><motion.div
                                animate={{
                                    y: [0, -12, 0],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute bottom-6 left-6 p-4 backdrop-blur-md bg-white/80 dark:bg-white/20 border border-white/30 rounded-2xl shadow-xl flex items-center gap-4 text-primary dark:text-white"
                            >
                                <div className="size-10 rounded-full bg-blue-500 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-white">magic_button</span>
                                </div>
                                <div>
                                    <p className="text-xs font-medium opacity-70 dark:opacity-80 uppercase tracking-tighter">{t.landing.hero.precisionBadge}</p>
                                    <p className="text-sm font-bold">{t.landing.hero.stitchedReality}</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Background blur shape behind image */}
                        <div className="absolute -z-10 -top-10 -right-10 size-64 bg-primary/10 dark:bg-primary/20 blur-3xl rounded-full"></div>
                        <div className="absolute -z-10 -bottom-10 -left-10 size-64 bg-indigo-500/10 dark:bg-indigo-500/20 blur-3xl rounded-full"></div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
