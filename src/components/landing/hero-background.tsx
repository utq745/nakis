"use client";

import { motion } from "framer-motion";

export function HeroBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Animated Circles */}
            <motion.div
                animate={{
                    scale: [1, 1.25, 1],
                    opacity: [
                        "var(--hero-circle-1-opacity)",
                        "calc(var(--hero-circle-1-opacity) * 1.6)",
                        "var(--hero-circle-1-opacity)"
                    ],
                    x: [0, 40, 0],
                    y: [0, -30, 0]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-20%] right-[-15%] w-[70%] h-[70%] bg-blue-400/30 dark:bg-primary/20 blur-[100px] rounded-full"
            />
            <motion.div
                animate={{
                    scale: [1.25, 1, 1.25],
                    opacity: [
                        "var(--hero-circle-2-opacity)",
                        "calc(var(--hero-circle-2-opacity) * 1.75)",
                        "var(--hero-circle-2-opacity)"
                    ],
                    x: [0, -40, 0],
                    y: [0, 30, 0]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[-25%] left-[-15%] w-[65%] h-[65%] bg-indigo-400/30 dark:bg-indigo-500/15 blur-[100px] rounded-full"
            />

            {/* Background Cards (Desktop Only) */}
            <div className="hidden xl:block absolute left-[5%] top-[50%] -translate-y-[50%] w-[650px] opacity-20 dark:opacity-[0.08] -rotate-[15deg] z-0 pointer-events-none">
                <img
                    src="/images/hero/customer_approval_card.webp"
                    alt=""
                    className="w-full h-auto"
                />
            </div>
            <div className="hidden xl:block absolute right-[5%] top-[50%] -translate-y-[50%] w-[650px] opacity-20 dark:opacity-[0.08] rotate-[15deg] z-0 pointer-events-none">
                <img
                    src="/images/hero/operator_approval_card.webp"
                    alt=""
                    className="w-full h-auto"
                />
            </div>

            {/* Barudan Machine Image (Bottom Right) */}
            <div className="hidden xl:block absolute right-[1%] bottom-[1%] w-[300px] opacity-30 z-0 pointer-events-none">
                <img
                    src="/images/hero/hero-barudan.webp"
                    alt=""
                    className="w-full h-auto"
                />
            </div>

            {/* Subtle Gradient Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 via-blue-100/20 to-transparent dark:from-transparent dark:via-transparent opacity-[var(--hero-gradient-opacity)] pointer-events-none" />

            {/* Dot Pattern */}
            <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.03] text-blue-900 dark:text-blue-100" style={{
                backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                backgroundSize: '40px 40px'
            }} />
        </div>
    );
}
