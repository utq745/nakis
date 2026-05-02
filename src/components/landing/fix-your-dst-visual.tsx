"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/components/providers/language-provider";

export function FixYourDstVisual() {
    const { t } = useLanguage();
    const v = t?.landing?.hero?.visual;
    const [lightbox, setLightbox] = useState<string | null>(null);

    if (!v) return null;

    return (
        <>
            <div className="relative w-full max-w-[600px] mx-auto">
                {/* Unified Card */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-700">
                    <div className="flex flex-col">
                        <div className="p-6 sm:p-8 lg:p-10 flex flex-col gap-6">
                            {/* Before/After Image Block */}
                            <div className="flex flex-col rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-700/40 shadow-sm">
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
                                        sizes="(max-width: 768px) 90vw, 600px"
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        priority
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                        <div className="w-16 h-16 rounded-full bg-white/70 shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <span className="material-symbols-outlined text-[#145BEC]" style={{ fontVariationSettings: "'FILL' 1", fontSize: "32px" }}>
                                                search
                                            </span>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-[#145BEC]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                </button>

                                {/* Before/After Labels */}
                                <div className="grid grid-cols-2 divide-x divide-slate-200 dark:divide-slate-700">
                                    {/* Before */}
                                    <div className="bg-white dark:bg-slate-900 p-4 sm:p-6">
                                        <p className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">{v.before}</p>
                                        <div className="flex flex-col gap-1.5">
                                            <span className="text-[13px] sm:text-[15px] font-bold text-red-500 leading-tight">{v.distortedShape}</span>
                                            <span className="text-[13px] sm:text-[15px] font-bold text-red-500 leading-tight">{v.unevenEdges}</span>
                                            <span className="text-[13px] sm:text-[15px] font-bold text-red-500 leading-tight">{v.poorFlow}</span>
                                        </div>
                                    </div>
                                    {/* After */}
                                    <div className="bg-white dark:bg-slate-900 p-4 sm:p-6">
                                        <p className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">{v.after}</p>
                                        <div className="flex flex-col gap-1.5">
                                            <span className="text-[13px] sm:text-[15px] font-bold text-green-600 dark:text-green-400 flex items-center gap-2 leading-tight">
                                                <span className="material-symbols-outlined text-green-500 font-bold" style={{ fontSize: '18px' }}>check</span> {v.cleanShape}
                                            </span>
                                            <span className="text-[13px] sm:text-[15px] font-bold text-green-600 dark:text-green-400 flex items-center gap-2 leading-tight">
                                                <span className="material-symbols-outlined text-green-500 font-bold" style={{ fontSize: '18px' }}>check</span> {v.sharpBorders}
                                            </span>
                                            <span className="text-[13px] sm:text-[15px] font-bold text-green-600 dark:text-green-400 flex items-center gap-2 leading-tight">
                                                <span className="material-symbols-outlined text-green-500 font-bold" style={{ fontSize: '18px' }}>check</span> {v.smoothFlow}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Production Info */}
                            <div className="text-center pt-2">
                                <p className="text-base sm:text-lg font-black text-slate-800 dark:text-white leading-snug">
                                    {v.optimizedOn}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── LIGHTBOX POPUP ─── */}
            {lightbox && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-zoom-out animate-[fadeIn_0.15s_ease-out]"
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
                        className="absolute top-4 right-4 z-10 size-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
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
                </div>
            )}
        </>
    );
}
