"use client";

import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";

export default function NotFound() {
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
                            Page Not Found
                        </h2>
                        <p className="text-lg text-[#616f89] dark:text-gray-400 mb-10 leading-relaxed">
                            Oops! It seems like the page you are looking for has been moved,
                            deleted, or never existed in the first place.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/">
                                <button className="px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 flex items-center gap-2">
                                    <span className="material-symbols-outlined">home</span>
                                    Back to Home
                                </button>
                            </Link>
                            <Link href="/contact">
                                <button className="px-8 py-4 bg-white dark:bg-[#18181b] text-[#172136] dark:text-white rounded-xl font-bold text-lg hover:bg-gray-50 dark:hover:bg-[#27272a] border border-[#e5e7eb] dark:border-[#27272a] transition-all flex items-center gap-2">
                                    <span className="material-symbols-outlined">support_agent</span>
                                    Contact Support
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
