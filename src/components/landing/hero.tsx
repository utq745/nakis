"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/components/providers/language-provider";

export function Hero() {
    const { t, language } = useLanguage();

    return (
        <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden bg-[#172136] pt-32 pb-20 md:pt-40 md:pb-32">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400/10 blur-[120px] rounded-full"></div>
                <div className="absolute top-1/4 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full"></div>
            </div>

            <div className="container relative z-10 mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="flex flex-col gap-8 p-8 md:p-12 rounded-[2.5rem] bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-2xl relative overflow-hidden group"
                    >
                        {/* Subtle inner highlight */}
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                        <div className="flex flex-col gap-4">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 w-fit"
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                <span className="text-white font-semibold text-xs uppercase tracking-wider">{t.landing.hero.badge}</span>
                            </motion.div>

                            <h1 className="text-[clamp(2.5rem,5vw,3.75rem)] font-black tracking-tight text-white leading-[1.1]">
                                {t.landing.hero.titleLine1} <br />
                                <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                                    {t.landing.hero.titleLine2}
                                </span>
                            </h1>

                            <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-[540px]">
                                {t.landing.hero.description}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Link href={`/${language}/login`}>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-8 h-14 bg-primary text-white rounded-xl font-black text-lg shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all flex items-center gap-3 group"
                                >
                                    {t.landing.hero.uploadBtn}
                                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </motion.button>
                            </Link>
                            <Link href={`/${language}/pricing`}>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-8 h-14 bg-white/5 backdrop-blur-md text-white border border-white/20 rounded-xl font-bold text-lg hover:bg-white/10 transition-all shadow-sm"
                                >
                                    {t.landing.hero.pricingBtn}
                                </motion.button>
                            </Link>
                        </div>

                        <div className="flex flex-wrap items-center gap-6 pt-2">
                            <div className="flex items-center gap-2 group">
                                <div className="size-10 rounded-full bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-[20px] text-green-400 font-bold">verified</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-white text-sm font-bold leading-none tracking-tight">{t.landing.hero.labBadge}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 group">
                                <div className="size-10 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-[20px] text-blue-400 font-bold">check_circle</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-white text-sm font-bold leading-none tracking-tight">{t.landing.hero.readyBadge}</span>
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
                        <div className="relative z-10 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)] border-[8px] border-white/5 backdrop-blur-sm aspect-[4/3] group">
                            <img
                                src="/images/hero/embroidery-hero.webp"
                                alt="Embroidery hero"
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent opacity-60"></div>

                            {/* Floating Badge on Image */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute bottom-6 left-6 p-4 backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl shadow-xl flex items-center gap-4 text-white"
                            >
                                <div className="size-10 rounded-full bg-blue-500 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-white">magic_button</span>
                                </div>
                                <div>
                                    <p className="text-xs font-medium opacity-80 uppercase tracking-tighter">{t.landing.hero.precisionBadge}</p>
                                    <p className="text-sm font-bold">{t.landing.hero.stitchedReality}</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Background blur shape behind image */}
                        <div className="absolute -z-10 -top-10 -right-10 size-64 bg-primary/20 blur-3xl rounded-full"></div>
                        <div className="absolute -z-10 -bottom-10 -left-10 size-64 bg-indigo-500/20 blur-3xl rounded-full"></div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
