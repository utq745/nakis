"use client";

import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import { useLanguage } from "@/components/providers/language-provider";

interface InteractiveApprovalCardProps {
    src: string;
    label: string;
    side: "left" | "right";
    rotate: number;
    onOpenModal: (src: string, label: string) => void;
}

function InteractiveApprovalCard({ src, label, side, rotate, onOpenModal }: InteractiveApprovalCardProps) {
    const { t } = useLanguage();
    const [isHovered, setIsHovered] = useState(false);
    const [isFlippedVertically, setIsFlippedVertically] = useState(false);

    // Motion values for mouse tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring animation for smooth mouse tracking
    const springConfig = { damping: 20, stiffness: 300, restDelta: 0.001 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);

        if (typeof window !== "undefined") {
            const threshold = 650;
            setIsFlippedVertically(e.clientY > window.innerHeight - threshold);
        }
    }, [mouseX, mouseY]);

    // Position anchoring
    const positionStyle = side === "left"
        ? { left: "5%", right: "auto" }
        : { right: "5%", left: "auto" };

    // Offset logic for the floating preview
    const translateX = side === "left" ? 15 : -620;
    const translateY = isFlippedVertically ? -550 : 15;

    return (
        <div
            className="absolute top-0 bottom-0 flex items-center w-[250px] md:w-[400px] xl:w-[650px] z-10"
            style={positionStyle}
            onMouseEnter={(e) => {
                mouseX.set(e.clientX);
                mouseY.set(e.clientY);
                setIsHovered(true);
            }}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            onClick={() => onOpenModal(src, label)}
        >
            <div className="relative w-full cursor-pointer">
                {/* Background Card */}
                <motion.div
                    initial={false}
                    animate={{
                        opacity: isHovered ? 0.45 : 0.18,
                        scale: isHovered ? 1.03 : 1,
                        rotate: rotate,
                        filter: isHovered ? "contrast(1.1) saturate(1.1) brightness(1.1)" : "contrast(1) saturate(1) brightness(1)"
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-auto pointer-events-none"
                >
                    <img src={src} alt="" className="w-full h-auto" />
                </motion.div>

                {/* Floating Preview - Rendered via Portal to ensure it's on top of everything */}
                {typeof document !== "undefined" && createPortal(
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                transition={{ duration: 0.15 }}
                                style={{
                                    position: "fixed",
                                    left: x,
                                    top: y,
                                    translateX: translateX,
                                    translateY: translateY,
                                    pointerEvents: "none",
                                    zIndex: 9999,
                                }}
                                className="hidden xl:flex flex-col gap-2 p-2 bg-white/95 dark:bg-slate-900/95 rounded-xl shadow-[0_25px_60px_rgba(0,0,0,0.35)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.55)] border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-md"
                            >
                                <div className="w-[580px] h-auto overflow-hidden rounded-lg border border-slate-100 dark:border-slate-800 shadow-inner bg-white dark:bg-slate-950">
                                    <img src={src} alt={label} className="w-full h-auto" />
                                </div>
                                <div className="px-1.5 py-0.5">
                                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-0.5">
                                        {t.landing.backgroundCards.approvalCard}
                                    </p>
                                    <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                                        {label}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    , document.body)}
            </div>
        </div>
    );
}

function HeroBackgroundContent() {
    const { t } = useLanguage();
    const [modalData, setModalData] = useState<{ src: string, label: string } | null>(null);

    const openModal = (src: string, label: string) => {
        setModalData({ src, label });
    };

    return (
        <div className={`absolute inset-0 z-0 ${modalData ? 'overflow-visible' : 'overflow-hidden'}`}>
            {/* Background elements container */}
            <div className="absolute inset-0">
                {/* Animated Circles */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.15, 0.2, 0.15],
                        x: [0, 30, 0],
                        y: [0, -20, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-20%] right-[-15%] w-[70%] h-[70%] bg-blue-400/30 dark:bg-primary/20 blur-[100px] rounded-full pointer-events-none"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.12, 0.18, 0.12],
                        x: [0, -30, 0],
                        y: [0, 20, 0]
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[-25%] left-[-15%] w-[65%] h-[65%] bg-indigo-400/30 dark:bg-indigo-500/15 blur-[100px] rounded-full pointer-events-none"
                />

                {/* Interactive Background Cards */}
                <InteractiveApprovalCard
                    src="/images/hero/customer_approval_card.webp?v=2"
                    label={t.landing.backgroundCards.clientLabel}
                    side="left"
                    rotate={-15}
                    onOpenModal={openModal}
                />
                <InteractiveApprovalCard
                    src="/images/hero/operator_approval_card.webp?v=2"
                    label={t.landing.backgroundCards.operatorLabel}
                    side="right"
                    rotate={15}
                    onOpenModal={openModal}
                />

                {/* Barudan Machine Image (Bottom Right) */}
                <div className="hidden xl:block absolute right-[1%] bottom-[1%] w-[300px] opacity-30 z-0 pointer-events-none">
                    <img
                        src="/images/hero/hero-barudan.webp"
                        alt=""
                        className="w-full h-auto"
                    />
                </div>

                {/* Subtle Gradient Overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 via-blue-100/20 to-transparent dark:from-transparent dark:via-transparent opacity-40 pointer-events-none" />

                {/* Dot Pattern */}
                <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.03] text-blue-900 dark:text-blue-100 pointer-events-none" style={{
                    backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }} />
            </div>

            {/* Modal - Rendered via Portal at body level for perfect z-index */}
            {typeof document !== "undefined" && createPortal(
                <AnimatePresence>
                    {modalData && (
                        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 min-h-screen">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setModalData(null)}
                                className="absolute inset-0 bg-slate-950/80 backdrop-blur-md cursor-zoom-out"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="relative max-w-[1400px] w-full max-h-[92vh] bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-[0_50px_120px_rgba(0,0,0,0.6)] border border-white/10 flex flex-col md:flex-row"
                            >
                                <button
                                    onClick={() => setModalData(null)}
                                    className="absolute top-6 right-6 z-20 size-12 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 text-slate-900 dark:text-white backdrop-blur-md transition-all active:scale-95 border border-black/5 dark:border-white/5"
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </button>

                                <div className="flex-1 bg-slate-50 dark:bg-slate-950 p-4 md:p-8 flex items-center justify-center min-h-[40vh] md:min-h-0 overflow-hidden">
                                    <img
                                        src={modalData.src}
                                        alt={modalData.label}
                                        className="max-w-full max-h-full object-contain shadow-2xl rounded-xl border border-black/5 dark:border-white/5"
                                    />
                                </div>

                                <div className="w-full md:w-[480px] p-8 md:pl-12 md:pr-16 flex flex-col justify-center gap-6 bg-white dark:bg-slate-900 border-t md:border-t-0 md:border-l border-slate-100 dark:border-white/5">
                                    <div>
                                        <p className="text-[11px] font-black text-primary uppercase tracking-[0.2em] mb-3">{t.landing.backgroundCards.approvalDocument}</p>
                                        <h3 className="text-3xl font-black text-slate-900 dark:text-white leading-[1.1]">{modalData.label}</h3>
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                                            {t.landing.backgroundCards.description}
                                        </p>
                                        <ul className="space-y-2">
                                            {t.landing.backgroundCards.features.map((item: string) => (
                                                <li key={item} className="flex items-center gap-3 text-xs font-bold text-slate-700 dark:text-slate-300">
                                                    <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
                , document.body)}
        </div>
    );
}

export const HeroBackground = dynamic(() => Promise.resolve(HeroBackgroundContent), {
    ssr: false
});
