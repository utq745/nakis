"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/language-provider";

export function WhyUs() {
    const { t } = useLanguage();

    const features = [
        {
            icon: "precision_manufacturing",
            title: t.landing.why.card1Title,
            desc: t.landing.why.card1Desc,
            color: "blue"
        },
        {
            icon: "wysiwyg",
            title: t.landing.why.card2Title,
            desc: t.landing.why.card2Desc,
            color: "indigo"
        },
        {
            icon: "verified",
            title: t.landing.why.card3Title,
            desc: t.landing.why.card3Desc,
            color: "cyan"
        }
    ];

    return (
        <section className="w-full bg-[#104DC9] py-24 md:py-32 relative overflow-hidden">
            {/* Decorative white lines with low opacity */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                <div className="absolute left-[10%] top-0 w-px h-full bg-white"></div>
                <div className="absolute left-[30%] top-0 w-px h-full bg-white"></div>
                <div className="absolute left-[50%] top-0 w-px h-full bg-white"></div>
                <div className="absolute left-[70%] top-0 w-px h-full bg-white"></div>
                <div className="absolute left-[90%] top-0 w-px h-full bg-white"></div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col items-center text-center mb-10 md:mb-14">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="max-w-[800px] font-black tracking-tight text-white"
                    >
                        {t.landing.why.title}
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-24 h-1.5 bg-white mt-6 rounded-full opacity-40"
                    ></motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group relative flex flex-col items-center text-center p-8 md:p-10 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.2)]"
                        >
                            <div className="mb-10 w-[100px] h-[100px] rounded-[2rem] bg-white text-[#104DC9] shadow-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 group-hover:rotate-6 shrink-0">
                                <span className="material-symbols-outlined leading-none select-none" style={{ fontSize: '40px' }}>{feature.icon}</span>
                            </div>

                            <h3 className="font-bold text-white mb-4 tracking-tight">
                                {feature.title}
                            </h3>

                            <p className="text-white/80 leading-relaxed font-medium">
                                {feature.desc}
                            </p>

                            {/* Decorative corner element */}
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="size-2 bg-white rounded-full"></div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
