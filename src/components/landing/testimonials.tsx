"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/language-provider";

export function Testimonials() {
    const { t } = useLanguage();

    return (
        <section className="w-full py-24 md:py-32 bg-white dark:bg-[#09090b]">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-[800px] mx-auto">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-primary/5 dark:bg-white/5 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-12 border border-primary/10 dark:border-white/10 shadow-xl relative"
                    >
                        {/* Quote Icon */}
                        <div className="absolute -top-6 -left-6 size-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg">
                            <span className="material-symbols-outlined font-black">format_quote</span>
                        </div>

                        <p className="text-xl md:text-2xl font-bold italic mb-8 leading-relaxed text-foreground dark:text-white">
                            "{t.landing.cta.testimonial}"
                        </p>

                        <div className="flex items-center gap-6 pt-4 border-t border-gray-200 dark:border-white/10">
                            <div
                                className="size-16 rounded-3xl bg-cover bg-center shadow-lg border-2 border-primary/20"
                                style={{ backgroundImage: 'url("/images/avatars/testimonial-author.webp")' }}
                            ></div>
                            <div className="text-left">
                                <p className="font-black text-xl text-foreground dark:text-white">{t.landing.cta.author}</p>
                                <p className="text-muted-foreground font-medium tracking-wide uppercase text-xs mt-1">{t.landing.cta.role}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
