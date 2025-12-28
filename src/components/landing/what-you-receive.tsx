"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/language-provider";

export function WhatYouReceive() {
    const { t } = useLanguage();

    const items = [
        {
            title: t.landing.receive.item3Title,
            desc: t.landing.receive.item3Desc,
            image: "/images/landing/Real_stitched_photos.webp",
            alt: "Real stitched photos"
        },
        {
            title: t.landing.receive.item1Title,
            desc: t.landing.receive.item1Desc,
            image: "" // Placeholder for now
        },
        {
            title: t.landing.receive.item2Title,
            desc: t.landing.receive.item2Desc,
            image: "" // Placeholder for now
        }
    ];

    return (
        <section className="w-full py-24 md:py-32 bg-white dark:bg-[#09090b]">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center text-center gap-3 mb-16">

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-[700px] tracking-tight text-foreground dark:text-white font-black"
                    >
                        {t.landing.receive.title}
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-24 h-1.5 bg-primary dark:bg-white rounded-full opacity-40"
                    ></motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col gap-6"
                        >
                            <div className="w-full aspect-square bg-gray-100 dark:bg-white/5 rounded-3xl border-2 border-dashed border-gray-200 dark:border-white/10 flex items-center justify-center relative overflow-hidden group">
                                {item.image ? (
                                    <img src={item.image} alt={item.alt || item.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex flex-col items-center gap-4 text-gray-400 dark:text-white/20">
                                        <span className="material-symbols-outlined text-5xl">image</span>
                                        <span className="text-sm font-medium">300 x 300px</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-xl font-black text-foreground dark:text-white leading-tight">
                                    {item.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
