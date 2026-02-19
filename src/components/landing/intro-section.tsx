"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/language-provider";

export function IntroSection() {
    const { t } = useLanguage();

    if (!t.landing.intro) return null;

    return (
        <section className="w-full py-16 bg-slate-50 dark:bg-zinc-900/50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                            {t.landing.intro.title}
                        </h2>

                        <div className="space-y-4">
                            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                                {t.landing.intro.p1}
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                                {t.landing.intro.p2}
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                                {t.landing.intro.p3}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
