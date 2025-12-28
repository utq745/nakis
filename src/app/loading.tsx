"use client";

import { motion } from "framer-motion";
import { geistSans, geistMono, inter } from "./fonts";
import "./globals.css";

export default function Loading() {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased font-sans`}>
                <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-[#09090b]">
                    <div className="relative flex flex-col items-center gap-8">
                        {/* Logo / Icon Animation */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="size-16 text-primary"
                        >
                            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"></path>
                            </svg>
                        </motion.div>

                        {/* Animated Bars */}
                        <div className="flex gap-1.5 h-10 items-end">
                            {[0, 1, 2, 3].map((i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        height: [12, 40, 12],
                                        opacity: [0.3, 1, 0.3]
                                    }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        delay: i * 0.15,
                                        ease: "easeInOut"
                                    }}
                                    className="w-2 rounded-full bg-primary"
                                />
                            ))}
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-sm font-bold uppercase tracking-[0.2em] text-[#616f89] dark:text-gray-400"
                        >
                            Loading
                        </motion.p>
                    </div>
                </div>
            </body>
        </html>
    );
}
