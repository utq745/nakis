"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useLanguage } from "@/components/providers/language-provider";

export function HeroVisual() {
    const { t } = useLanguage();
    const v = t?.landing?.hero?.visual;
    const [lightbox, setLightbox] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!v) return null;

    return (
        <>
            <div className="relative w-full max-w-[1040px] mx-auto flex flex-col gap-5">
                {/* Top Headline */}
                <h2 className="text-center text-xl sm:text-2xl md:text-[1.7rem] font-black italic text-slate-800 dark:text-white leading-tight tracking-tight">
                    {v.topHeadline}
                </h2>

                {/* Single Unified Card */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 rounded-2xl shadow-sm overflow-hidden">
                    <div className="flex flex-col md:flex-row">

                        {/* ─── LEFT SECTION: New Digitizing ─── */}
                        <div className="flex-1 p-5 sm:p-6 lg:p-8 flex flex-col gap-4">
                            {/* Title + Price */}
                            <div className="text-center">
                                <h3 className="text-base sm:text-lg font-black uppercase tracking-wider text-slate-800 dark:text-white">
                                    {v.newDigitizing}
                                </h3>
                                <p className="text-6xl sm:text-7xl font-black text-slate-900 dark:text-white leading-none -mt-1">
                                    {v.price1}
                                </p>
                                <p className="text-sm sm:text-base font-bold text-slate-600 dark:text-slate-400 mt-1">
                                    {v.upToStitches}
                                </p>
                                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-500 mt-0.5">
                                    {v.nextTier}
                                </p>
                                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-500">
                                    {v.extraStitches}
                                </p>
                            </div>

                            {/* Image (clickable) */}
                            <button
                                type="button"
                                onClick={() => setLightbox("/images/hero/hero.webp")}
                                className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/40 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            >
                                <Image
                                    src="/images/hero/hero.webp"
                                    alt="New Digitizing Sample"
                                    fill
                                    sizes="(max-width: 768px) 90vw, 420px"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    priority
                                    loading="eager"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    <div className="w-14 h-14 rounded-full bg-white/70 shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <span className="material-symbols-outlined text-[#145BEC]" style={{ fontVariationSettings: "'FILL' 1", fontSize: "28px" }}>
                                            search
                                        </span>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-[#145BEC]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                            </button>

                            {/* Machine Info */}
                            <p
                                className="text-xs sm:text-[13px] text-center text-slate-600 dark:text-slate-400 leading-snug [&_strong]:text-slate-900 dark:[&_strong]:text-blue-400 [&_strong]:font-black"
                                dangerouslySetInnerHTML={{ __html: v.machineInfo }}
                            />
                            <p className="text-xs text-center text-slate-500 dark:text-slate-500 -mt-2">
                                {v.includedInPrice}
                            </p>

                            {/* Checkmarks */}
                            <div className="flex flex-col gap-2 mt-auto items-center">
                                <div className="flex items-center gap-2.5">
                                    <span className="material-symbols-outlined text-green-500" style={{ fontSize: '20px' }}>check_circle</span>
                                    <span className="text-sm sm:text-[15px] font-bold text-slate-800 dark:text-slate-200">{v.realProof}</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <span className="material-symbols-outlined text-green-500" style={{ fontSize: '20px' }}>check_circle</span>
                                    <span className="text-sm sm:text-[15px] font-bold text-slate-800 dark:text-slate-200">{v.approvalCards}</span>
                                </div>
                            </div>
                        </div>

                        {/* ─── DIVIDER ─── */}
                        {/* Vertical on md+, horizontal on mobile */}
                        <div className="flex items-center justify-center px-0 md:px-0 py-2 md:py-0">
                            {/* Mobile: horizontal */}
                            <div className="w-3/5 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent md:hidden" />
                            {/* Desktop: vertical */}
                            <div className="hidden md:block w-px h-3/5 bg-gradient-to-b from-transparent via-slate-300 dark:via-slate-600 to-transparent" />
                        </div>

                        {/* ─── RIGHT SECTION: DST Stitch Test ─── */}
                        <div className="flex-1 p-5 sm:p-6 lg:p-8 flex flex-col gap-4">
                            {/* Title + Price */}
                            <div className="text-center">
                                <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-white">
                                    {v.haveDst}
                                </h3>
                                <div className="flex items-center justify-center gap-2">
                                    <p className="text-6xl sm:text-7xl font-black text-slate-900 dark:text-white leading-none">
                                        {v.price2}
                                    </p>
                                    <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight whitespace-pre-line text-left">
                                        {v.stitchTest}
                                    </span>
                                </div>
                                <p className="text-xs sm:text-sm font-bold text-primary dark:text-blue-400 mt-1 leading-snug">
                                    {v.showReal}
                                </p>
                            </div>

                            {/* Before/After Image Block */}
                            <div className="flex flex-col rounded-xl overflow-hidden border border-slate-200/60 dark:border-slate-700/40">
                                {/* Label bar */}
                                <div className="bg-slate-800 dark:bg-slate-700 px-4 py-4 flex flex-col items-center gap-1">
                                    <span className="text-sm sm:text-base font-black text-white uppercase tracking-widest text-center">
                                        {v.realResults}
                                    </span>
                                    <span className="text-xs sm:text-sm text-slate-400 italic text-center">
                                        {v.notMockup}
                                    </span>
                                </div>

                                {/* Image (clickable) */}
                                <button
                                    type="button"
                                    onClick={() => setLightbox("/images/hero/before-after.webp")}
                                    className="relative w-full aspect-[2/1] bg-[#1a1a1a] cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                >
                                    <Image
                                        src="/images/hero/before-after.webp"
                                        alt="Stitch Test Before After"
                                        fill
                                        sizes="(max-width: 768px) 90vw, 420px"
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                        <div className="w-14 h-14 rounded-full bg-white/70 shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <span className="material-symbols-outlined text-[#145BEC]" style={{ fontVariationSettings: "'FILL' 1", fontSize: "28px" }}>
                                                search
                                            </span>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-[#145BEC]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                </button>

                                {/* Before/After Labels */}
                                <div className="grid grid-cols-2 divide-x divide-slate-200 dark:divide-slate-700">
                                    {/* Before */}
                                    <div className="bg-white dark:bg-slate-900 p-3">
                                        <p className="text-sm sm:text-base font-black text-slate-800 dark:text-white mb-1.5">{v.before}</p>
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-[11px] sm:text-xs font-bold text-red-500">{v.distortedShape}</span>
                                            <span className="text-[11px] sm:text-xs font-bold text-red-500">{v.unevenEdges}</span>
                                            <span className="text-[11px] sm:text-xs font-bold text-red-500">{v.poorFlow}</span>
                                        </div>
                                    </div>
                                    {/* After */}
                                    <div className="bg-white dark:bg-slate-900 p-3">
                                        <p className="text-sm sm:text-base font-black text-slate-800 dark:text-white mb-1.5">{v.after}</p>
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-[11px] sm:text-xs font-bold text-green-600 dark:text-green-400 flex items-start gap-1 text-left">
                                                <span className="material-symbols-outlined text-green-500 shrink-0 mt-0.5" style={{ fontSize: '14px' }}>check_circle</span> 
                                                <span>{v.cleanShape}</span>
                                            </span>
                                            <span className="text-[11px] sm:text-xs font-bold text-green-600 dark:text-green-400 flex items-start gap-1 text-left">
                                                <span className="material-symbols-outlined text-green-500 shrink-0 mt-0.5" style={{ fontSize: '14px' }}>check_circle</span> 
                                                <span>{v.sharpBorders}</span>
                                            </span>
                                            <span className="text-[11px] sm:text-xs font-bold text-green-600 dark:text-green-400 flex items-start gap-1 text-left">
                                                <span className="material-symbols-outlined text-green-500 shrink-0 mt-0.5" style={{ fontSize: '14px' }}>check_circle</span> 
                                                <span>{v.smoothFlow}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Production Info */}
                            <div className="text-center text-xs sm:text-[13px] text-primary dark:text-blue-400 font-bold leading-snug">
                                <p>{v.productionStitch}</p>
                                <p>{v.optimizedOn}</p>
                            </div>

                            {/* Fix & Re-stitch */}
                            <div className="text-center mt-auto pt-2">
                                <p className="text-sm text-slate-500 dark:text-slate-400">{v.notStitchingRight}</p>
                                <p className="text-lg sm:text-xl font-black text-slate-800 dark:text-white">{v.fixAndRestitch}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Taglines */}
                <div className="text-center flex flex-col gap-1">
                    <p className="text-base sm:text-lg md:text-xl font-black italic text-slate-700 dark:text-slate-300 leading-snug tracking-tight">
                        {v.bottomTagline1}
                    </p>
                    <p className="text-base sm:text-lg md:text-xl font-black italic text-slate-700 dark:text-slate-300 leading-snug tracking-tight">
                        {v.bottomTagline2}
                    </p>
                </div>
            </div>

            {/* ─── LIGHTBOX POPUP ─── */}
            {mounted && lightbox && createPortal(
                <div
                    className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-md cursor-zoom-out animate-[fadeIn_0.15s_ease-out]"
                    onClick={() => setLightbox(null)}
                    onKeyDown={(e) => e.key === "Escape" && setLightbox(null)}
                    role="dialog"
                    aria-modal="true"
                    tabIndex={0}
                >
                    {/* Close Button */}
                    <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
                        className="absolute top-4 right-4 z-10 size-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                        aria-label="Close"
                    >
                        <span className="material-symbols-outlined text-white text-2xl">close</span>
                    </button>

                    {/* Image Container */}
                    <div
                        className="relative w-[90vw] h-[80vh] max-w-[1200px] animate-[scaleIn_0.2s_ease-out]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={lightbox}
                            alt="Enlarged view"
                            fill
                            sizes="90vw"
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
