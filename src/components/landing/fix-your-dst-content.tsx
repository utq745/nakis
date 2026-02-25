"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroBackground } from "@/components/landing/hero-background";

interface Props {
    serviceIsItems: string[];
    serviceIsNotItems: string[];
    typicalIssues: string[];
    changesAfterFixing: string[];
    rightChoiceItems: string[];
    notRightChoiceItems: string[];
    processItems: string[];
    comparisonBlocks: {
        title: string;
        line1: string;
        line2: string;
        imageSrc: string;
        imageAlt: string;
    }[];
    faqItems: {
        question: string;
        answer: string;
    }[];
    faqSchema: any;
    translations: {
        heroTitle: string;
        heroDesc: string;
        heroSubDesc: string;
        buttonText: string;
        realStitch: string;
        prodReady: string;
        whatIs: string;
        whatIsNot: string;
        minimalChanges: string;
        ifNotPossible: string;
        compTitle: string;
        risksTitle: string;
        risksSub: string;
        risksLabel: string;
        stabilityTitle: string;
        stabilitySub: string;
        stabilityLabel: string;
        rightChoiceTitle: string;
        notRightChoiceTitle: string;
        processTitle: string;
        turnaround: string;
        faqTitle: string;
        faqLabel: string;
    }
}

export default function FixYourDstClient({
    serviceIsItems,
    serviceIsNotItems,
    typicalIssues,
    changesAfterFixing,
    rightChoiceItems,
    notRightChoiceItems,
    processItems,
    comparisonBlocks,
    faqItems,
    faqSchema,
    translations
}: Props) {
    const [selectedImage, setSelectedImage] = useState<{ src: string, title: string } | null>(null);

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[#f8fafc] dark:bg-[#09090b] font-[family-name:var(--font-inter)] selection:bg-primary selection:text-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <Header />

            <main id="main-content" className="flex-grow flex flex-col items-center w-full">
                {/* HERO SECTION */}
                <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden bg-[#F6F7F8] dark:bg-[#172136] pt-32 pb-20 md:pt-40 md:pb-32">
                    <HeroBackground />
                    <div className="container relative z-10 mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="flex flex-col gap-8 p-6 sm:p-8 md:p-12 rounded-[2.5rem] bg-white/40 dark:bg-black/20 backdrop-blur-md border border-black/5 dark:border-white/10 shadow-2xl relative overflow-hidden group animate-in fade-in slide-in-from-left-8 duration-700 fill-mode-both">
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
                                <div className="flex flex-col gap-6 relative z-10">
                                    <h1 className="text-[clamp(1.75rem,5vw,3.75rem)] font-black tracking-tight text-primary dark:text-white leading-[1.1] break-words">
                                        {translations.heroTitle.includes("DST File") || translations.heroTitle.includes("DST Dosyası") ? (
                                            <>
                                                Fix Your <br />
                                                <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                                                    {translations.heroTitle.includes("DST File") ? "DST File" : "DST Dosyası"}
                                                </span>
                                            </>
                                        ) : translations.heroTitle.includes("DST Dosyanızı") ? (
                                            <>
                                                DST Dosyanızı <br />
                                                <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                                                    Optimize Edin
                                                </span>
                                            </>
                                        ) : translations.heroTitle}
                                    </h1>
                                    <div className="flex flex-col gap-4">
                                        <p className="text-slate-600 dark:text-white/80 text-lg md:text-xl leading-relaxed max-w-[540px]">
                                            {translations.heroDesc.includes("verified with a real stitch-out") ? (
                                                <>
                                                    Targeted production fixes to your existing DST - <strong>verified with a real stitch-out.</strong>
                                                </>
                                            ) : translations.heroDesc.includes("gerçek nakışla doğrulanır") ? (
                                                <>
                                                    Mevcut DST dosyanıza yönelik hedefli üretim düzeltmeleri - <strong>gerçek nakışla doğrulanır.</strong>
                                                </>
                                            ) : translations.heroDesc}
                                        </p>
                                        <p className="text-slate-500 dark:text-white/60 text-sm md:text-base font-medium mb-2">
                                            {translations.heroSubDesc}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-8 relative z-10">
                                    <div className="flex flex-wrap gap-4">
                                        <Link href="/orders/new">
                                            <button className="px-8 h-14 bg-primary text-white rounded-xl font-black text-lg shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 group">
                                                {translations.buttonText}
                                                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                            </button>
                                        </Link>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-6 pt-2">
                                        <div className="flex items-center gap-2 group">
                                            <div className="size-10 rounded-full bg-green-500/10 dark:bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <span className="material-symbols-outlined text-[20px] text-green-600 dark:text-green-400 font-bold">verified</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-slate-700 dark:text-white text-sm font-bold leading-none tracking-tight">{translations.realStitch}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 group">
                                            <div className="size-10 rounded-full bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <span className="material-symbols-outlined text-[20px] text-blue-600 dark:text-blue-400 font-bold">check_circle</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-slate-700 dark:text-white text-sm font-bold leading-none tracking-tight">{translations.prodReady}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative lg:ml-10 animate-in fade-in slide-in-from-right-8 duration-700 fill-mode-both">
                                <div className="relative z-10 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)] border-[8px] border-white/50 dark:border-white/5 backdrop-blur-sm group bg-slate-100 dark:bg-slate-900">
                                    <Image
                                        src="/images/fix-your-dst/crosspoint-artwork.webp"
                                        alt="Original source"
                                        width={600}
                                        height={600}
                                        priority
                                        unoptimized
                                        className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 dark:from-black/40 via-transparent to-transparent opacity-60 pointer-events-none"></div>
                                </div>

                                <div className="absolute -z-10 -top-10 -right-10 size-64 bg-primary/10 dark:bg-primary/20 blur-3xl rounded-full"></div>
                                <div className="absolute -z-10 -bottom-10 -left-10 size-64 bg-indigo-500/10 dark:bg-indigo-500/20 blur-3xl rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-24 md:py-32 w-full bg-white dark:bg-[#09090b]">
                    <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <article className="flex flex-col rounded-3xl border border-slate-200 bg-slate-50 p-8 md:p-10 dark:border-white/5 dark:bg-slate-900/50 hover:shadow-lg transition-all">
                                <p className="mb-6 text-xs font-black uppercase tracking-[0.15em] text-primary">
                                    {translations.whatIs}
                                </p>
                                <ul className="flex-grow space-y-4 text-sm font-medium leading-relaxed text-slate-800 dark:text-white/90">
                                    {serviceIsItems.map((item) => (
                                        <li key={item} className="flex gap-4 items-start">
                                            <span aria-hidden="true" className="text-green-500 font-bold">
                                                ✓
                                            </span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="mt-8 border-t border-slate-200 pt-6 text-sm font-medium text-slate-500 dark:border-white/10 dark:text-white/60">
                                    {translations.minimalChanges}
                                </p>
                            </article>

                            <article className="flex flex-col rounded-3xl border border-slate-200 bg-slate-50 p-8 md:p-10 dark:border-white/5 dark:bg-slate-900/50 hover:shadow-lg transition-all">
                                <p className="mb-6 text-xs font-black uppercase tracking-[0.15em] text-red-500">
                                    {translations.whatIsNot}
                                </p>
                                <ul className="flex-grow space-y-4 text-sm font-medium leading-relaxed text-slate-800 dark:text-white/90">
                                    {serviceIsNotItems.map((item) => (
                                        <li key={item} className="flex gap-4 items-start">
                                            <span aria-hidden="true" className="text-red-400 font-bold">
                                                ✕
                                            </span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="mt-8 border-t border-slate-200 pt-6 text-sm font-medium text-slate-500 dark:border-white/10 dark:text-white/60">
                                    {translations.ifNotPossible}
                                </p>
                            </article>
                        </div>
                    </div>
                </section>

                <section className="w-full bg-[#e8f3ff] py-24 md:py-32 dark:bg-[#18212F] relative overflow-hidden">
                    <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <circle cx="100" cy="100" r="40" fill="url(#grad2)" />
                            <defs>
                                <radialGradient id="grad2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="1" />
                                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                                </radialGradient>
                            </defs>
                        </svg>
                    </div>

                    <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
                        <div className="flex flex-col items-center mb-16 md:mb-24">
                            <h2 className="text-center text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
                                {translations.compTitle}
                            </h2>
                            <div className="w-24 h-1.5 bg-primary dark:bg-white rounded-full opacity-40"></div>
                        </div>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            {comparisonBlocks.map((block, index) => (
                                <article
                                    key={block.title}
                                    className="group rounded-[2.5rem] overflow-hidden border border-slate-200 bg-white shadow-xl shadow-slate-200/50 dark:border-white/5 dark:bg-slate-900 dark:shadow-none hover:-translate-y-2 transition-all duration-500 animate-in fade-in zoom-in-95 duration-700 fill-mode-both"
                                >
                                    <div
                                        className="relative aspect-[4/3] w-full bg-slate-100 dark:bg-slate-800 overflow-hidden cursor-pointer"
                                        onClick={() => setSelectedImage({ src: block.imageSrc, title: block.title })}
                                    >
                                        <Image
                                            src={block.imageSrc}
                                            alt={block.imageAlt}
                                            fill
                                            sizes="(max-width: 1024px) 100vw, 33vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                            <div className="size-16 rounded-full bg-white/70 opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-primary text-3xl font-bold">search</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4 p-10">
                                        <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                                            {block.title}
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="text-[15px] font-bold leading-relaxed text-slate-600 dark:text-white/70 flex items-start gap-3">
                                                {index === 1 ? (
                                                    <span className="material-symbols-outlined text-green-500 font-bold shrink-0 text-[18px] leading-relaxed">check</span>
                                                ) : (
                                                    <span className="size-1.5 rounded-full bg-primary/40 shrink-0 mt-[9px]"></span>
                                                )}
                                                <span>{block.line1}</span>
                                            </div>
                                            <div className="text-[15px] font-bold leading-relaxed text-slate-600 dark:text-white/70 flex items-start gap-3">
                                                {index === 1 ? (
                                                    <span className="material-symbols-outlined text-red-500 font-bold shrink-0 text-[18px] leading-relaxed">close</span>
                                                ) : (
                                                    <span className="size-1.5 rounded-full bg-primary/40 shrink-0 mt-[9px]"></span>
                                                )}
                                                <span>{block.line2}</span>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="w-full py-24 md:py-32 bg-white dark:bg-[#09090b]">
                    <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                        {/* Shared header row so labels + titles align */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-32 mb-12">
                            <div>
                                <p className="text-primary font-black uppercase tracking-[0.2em] text-xs mb-4">{translations.risksLabel}</p>
                                <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6">
                                    {translations.risksTitle.includes("Typical Issues") ? (
                                        <>
                                            <span className="text-red-500">Typical Issues</span> <br />
                                            {translations.risksTitle.replace("Typical Issues", "").trim()}
                                        </>
                                    ) : translations.risksTitle.includes("Tipik Sorunlar") ? (
                                        <>
                                            {translations.risksTitle.replace("Tipik Sorunlar", "").trim()} <br />
                                            <span className="text-red-500">Tipik Sorunlar</span>
                                        </>
                                    ) : translations.risksTitle}
                                </h2>
                                <div className="w-20 h-1.5 bg-primary dark:bg-white rounded-full opacity-40"></div>
                            </div>
                            <div>
                                <p className="text-primary font-black uppercase tracking-[0.2em] text-xs mb-4">{translations.stabilityLabel}</p>
                                <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6">
                                    {translations.stabilityTitle.includes("After Fixing") || translations.stabilityTitle.includes("Neler Değişir") ? (
                                        <>
                                            {translations.stabilityTitle.includes("After Fixing") ? "What Changes" : "Düzeltmeden Sonra"} <br />
                                            <span className="text-green-500">
                                                {translations.stabilityTitle.includes("After Fixing") ? "After Fixing" : "Neler Değişir"}
                                            </span>
                                        </>
                                    ) : translations.stabilityTitle}
                                </h2>
                                <div className="w-20 h-1.5 bg-primary dark:bg-white rounded-full opacity-40"></div>
                            </div>
                        </div>

                        {/* Cards grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-32">
                            <div className="grid grid-cols-1 gap-3">
                                {typicalIssues.map((item, idx) => (
                                    <motion.div
                                        key={item}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        viewport={{ once: true }}
                                        className="group flex items-center gap-4 p-4 rounded-2xl border border-red-200/60 bg-red-50/60 dark:border-red-500/10 dark:bg-red-500/5 hover:border-red-500/30 transition-all"
                                    >
                                        <div className="size-10 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                            <span className="material-symbols-outlined text-red-500 text-lg font-bold">warning</span>
                                        </div>
                                        <span className="text-[15px] font-bold text-slate-700 dark:text-white/80">{item}</span>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                {changesAfterFixing.map((item, idx) => (
                                    <motion.div
                                        key={item}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        viewport={{ once: true }}
                                        className="group flex items-center gap-4 p-4 rounded-2xl border border-primary/10 bg-primary/5 dark:border-primary/20 dark:bg-primary/10 hover:border-green-500/30 transition-all"
                                    >
                                        <div className="size-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                            <span className="material-symbols-outlined text-green-500 text-lg font-bold">check_circle</span>
                                        </div>
                                        <span className="text-[15px] font-bold text-slate-800 dark:text-white/90">{item}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-24 md:py-32 bg-slate-50 dark:bg-[#111827]">
                    <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                        <div className="flex flex-col items-center mb-16 md:mb-24">
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white text-center tracking-tight mb-4">
                                {translations.rightChoiceTitle.includes("Choice") ? "Is This For You?" : "Size Uygun mu?"}
                            </h2>
                            <div className="w-24 h-1.5 bg-primary dark:bg-white rounded-full opacity-40"></div>
                        </div>
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <article className="rounded-3xl border border-slate-200 bg-white p-8 md:p-12 dark:border-white/5 dark:bg-slate-900 shadow-sm">
                                <h2 className="mb-10 text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                                    {translations.rightChoiceTitle}
                                </h2>
                                <ul className="space-y-6 text-base font-bold leading-relaxed text-slate-700 dark:text-white/80">
                                    {rightChoiceItems.map((item) => (
                                        <li key={item} className="flex gap-4 items-start">
                                            <div className="size-6 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                                <span className="material-symbols-outlined text-[14px] text-green-700 dark:text-green-400 font-bold">check</span>
                                            </div>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </article>

                            <article className="rounded-3xl border border-slate-200 bg-white p-8 md:p-12 dark:border-white/5 dark:bg-slate-900 shadow-sm">
                                <h2 className="mb-10 text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                                    {translations.notRightChoiceTitle}
                                </h2>
                                <ul className="space-y-6 text-base font-bold leading-relaxed text-slate-700 dark:text-white/80">
                                    {notRightChoiceItems.map((item) => (
                                        <li key={item} className="flex gap-4 items-start">
                                            <div className="size-6 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                                <span className="material-symbols-outlined text-[14px] text-red-700 dark:text-red-400 font-bold">close</span>
                                            </div>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        </div>
                    </div>
                </section>

                <section className="w-full py-24 md:py-32 bg-[#e8f3ff] dark:bg-[#18212F] relative overflow-hidden">
                    <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <circle cx="0" cy="0" r="40" fill="url(#grad1)" />
                            <defs>
                                <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="1" />
                                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                                </radialGradient>
                            </defs>
                        </svg>
                    </div>

                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        <div className="flex flex-col items-center mb-20 md:mb-28">
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white text-center tracking-tight mb-4">{translations.processTitle}</h2>
                            <div className="w-24 h-1.5 bg-primary dark:bg-white rounded-full opacity-40"></div>
                        </div>

                        <div className="relative">
                            <div className="hidden lg:block absolute top-[50px] left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/20 dark:via-white/10 to-transparent z-0"></div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 relative z-10">
                                {processItems.map((item, index) => {
                                    const images = [
                                        "/images/landing/make-order.webp",
                                        "/images/landing/What_You_Receive_Real_stitched_photos.webp",
                                        "/images/landing/approval-package.webp"
                                    ];
                                    return (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -50 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.2, delay: index * 0.4, ease: "easeOut" }}
                                            className="relative group flex flex-col items-center lg:items-start"
                                        >
                                            <div className="relative z-20 mb-10 w-full aspect-[4/3] group-hover:scale-[1.02] transition-transform duration-500">
                                                <div className="w-full h-full rounded-[2rem] bg-white dark:bg-[#1c2637] border-2 border-primary/20 dark:border-white/10 shadow-xl dark:shadow-2xl group-hover:border-primary transition-all duration-500 flex items-center justify-center overflow-hidden relative">
                                                    <Image
                                                        src={images[index] || images[0]}
                                                        alt={item}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                        sizes="(max-width: 768px) 100vw, 33vw"
                                                    />
                                                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                                </div>

                                                <div className="absolute -top-4 -right-4 size-12 rounded-full bg-primary text-white flex items-center justify-center font-black text-base shadow-xl group-hover:rotate-[360deg] transition-transform duration-1000 z-30 border-4 border-[#e8f3ff] dark:border-[#18212F]">
                                                    0{index + 1}
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-4 text-center lg:text-left">
                                                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight group-hover:text-primary transition-colors">
                                                    {item}
                                                </h3>
                                            </div>

                                            {index < processItems.length - 1 && (
                                                <div className="lg:hidden my-6 opacity-20">
                                                    <span className="material-symbols-outlined text-[40px] text-primary dark:text-white">arrow_downward</span>
                                                </div>
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>

                        <p className="mt-20 text-center font-bold text-slate-500 dark:text-white/60 text-lg">
                            {translations.turnaround.includes("24 hours") ? (
                                <>Standard turnaround is typically within <span className="text-white underline decoration-white/30 decoration-2">24 hours</span>.</>
                            ) : translations.turnaround.includes("24 saat") ? (
                                <>Standart teslimat süresi genellikle <span className="text-white underline decoration-white/30 decoration-2">24 saat</span> içindedir.</>
                            ) : translations.turnaround}
                        </p>
                    </div>
                </section>

                <section className="w-full py-24 md:py-32 bg-white dark:bg-[#09090b]">
                    <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                        <div className="flex flex-col items-center gap-4 mb-16">
                            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary font-black text-xs uppercase tracking-[0.2em]">{translations.faqLabel}</span>
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white text-center tracking-tight mb-4">{translations.faqTitle}</h2>
                            <div className="w-24 h-1.5 bg-primary dark:bg-white rounded-full opacity-40"></div>
                        </div>
                        <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-2xl shadow-slate-200/50 dark:border-white/5 dark:bg-slate-900 dark:shadow-none divide-y divide-slate-100 dark:divide-white/5">
                            {faqItems.map((item, index) => (
                                <details
                                    key={item.question}
                                    className="group p-8 md:p-10 cursor-pointer"
                                    open={index === 0}
                                >
                                    <summary className="flex list-none items-center justify-between gap-6 font-black text-slate-900 dark:text-white text-lg md:text-xl tracking-tight">
                                        {item.question}
                                        <span className="material-symbols-outlined shrink-0 text-primary transition-transform duration-500 group-open:rotate-180 text-3xl">
                                            expand_more
                                        </span>
                                    </summary>
                                    <p className="mt-6 text-[17px] font-bold leading-relaxed text-slate-500 dark:text-slate-400 max-w-2xl">
                                        {item.answer}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            {/* Image Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedImage(null)}
                            className="absolute inset-0 bg-black/95 backdrop-blur-md cursor-zoom-out"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 30 }}
                            className="relative w-full max-w-6xl aspect-[4/3] sm:aspect-auto bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl z-10"
                        >
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-6 right-6 z-20 size-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-xl transition-all active:scale-95 border border-white/10"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>

                            <div className="w-full h-full flex items-center justify-center p-4 sm:p-12">
                                <img
                                    src={selectedImage.src}
                                    alt={selectedImage.title}
                                    className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                                />
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
