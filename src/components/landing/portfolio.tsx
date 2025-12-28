"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/components/providers/language-provider";

export function Portfolio() {
    const { t } = useLanguage();

    const items = [
        { title: t.landing.portfolio.item1Title, subtitle: t.landing.portfolio.item1Sub, bg: "/images/portfolio/portfolio-1.webp" },
        { title: t.landing.portfolio.item2Title, subtitle: t.landing.portfolio.item2Sub, bg: "/images/portfolio/portfolio-2.webp" },
        { title: t.landing.portfolio.item3Title, subtitle: t.landing.portfolio.item3Sub, bg: "/images/portfolio/portfolio-3.webp" },
        { title: t.landing.portfolio.item4Title, subtitle: t.landing.portfolio.item4Sub, bg: "/images/portfolio/portfolio-4.webp" }
    ];

    return (
        <section id="samples" className="w-full bg-white dark:bg-[#09090b] py-24 md:py-32">
            <div className="container mx-auto px-4 md:px-6 flex flex-col gap-12 md:gap-16">
                <div className="flex flex-col md:flex-row justify-between items-end gap-10">
                    <div className="flex flex-col gap-6 max-w-[700px]">

                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="tracking-tight text-[#172136] dark:text-[#fafafa]"
                        >
                            {t.landing.portfolio.title}
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="w-24 h-1.5 bg-primary dark:bg-white rounded-full opacity-40"
                        ></motion.div>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-[#47536B] dark:text-[#a1a1aa] text-lg md:text-xl font-normal leading-relaxed"
                        >
                            {t.landing.portfolio.description}
                        </motion.p>
                    </div>
                    {/* View All link removed - no portfolio page exists */}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative overflow-hidden rounded-[2rem] aspect-[4/5] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
                            role="img"
                            aria-label={`${item.title} - ${item.subtitle}`}
                            title={`${item.title} - ${item.subtitle}`}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url("${item.bg}")` }}
                                aria-hidden="true"
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-10 opacity-90 group-hover:opacity-100 transition-opacity">
                                <motion.div
                                    whileHover={{ y: -5 }}
                                >
                                    <p className="text-white text-2xl font-black mb-1">{item.title}</p>
                                    <p className="text-white/70 text-base font-medium uppercase tracking-wider">{item.subtitle}</p>
                                </motion.div>

                                <div className="mt-6 flex items-center gap-2 text-white overflow-hidden max-h-0 group-hover:max-h-10 transition-all duration-500 ease-in-out">
                                    <span className="text-sm font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-white/30 backdrop-blur-sm">{t.landing.portfolio.viewDesign}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
