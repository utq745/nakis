"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/language-provider";

export function Process() {
    const { t } = useLanguage();

    const steps = [
        {
            step: "01",
            icon: "cloud_upload",
            title: t.landing.process.step1Title,
            desc: t.landing.process.step1Desc,
        },
        {
            step: "02",
            icon: "tune",
            title: t.landing.process.step2Title,
            desc: t.landing.process.step2Desc,
        },
        {
            step: "03",
            icon: "memory",
            title: t.landing.process.step3Title,
            desc: t.landing.process.step3Desc,
        },
        {
            step: "04",
            icon: "verified_user",
            title: t.landing.process.step4Title,
            desc: t.landing.process.step4Desc,
        },
    ];

    return (
        <section className="w-full py-24 md:py-32 bg-[#18212F] relative overflow-hidden">
            {/* Background patterns */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <circle cx="0" cy="0" r="40" fill="url(#grad1)" />
                    <defs>
                        <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" stopColor="#135bec" stopOpacity="1" />
                            <stop offset="100%" stopColor="#135bec" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                </svg>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col items-center text-center gap-6 mb-20 md:mb-28">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="px-4 py-1.5 rounded-full bg-[#135bec]/10 border border-[#135bec]/20 text-[#135bec] text-sm font-bold tracking-widest uppercase"
                    >
                        {t.landing.process.badge}
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-[700px] font-black tracking-tight text-white"
                    >
                        {t.landing.process.title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="max-w-[600px] text-gray-400 text-lg md:text-xl"
                    >
                        {t.landing.process.description}
                    </motion.p>
                </div>

                <div className="relative">
                    {/* Connector Line (visible on desktop) */}
                    <div className="hidden lg:block absolute top-[50px] left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-14 relative z-10">
                        {steps.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, delay: index * 0.4, ease: "easeOut" }}
                                className="relative group flex flex-col items-center lg:items-start"
                            >
                                {/* Step Number Badge */}
                                <div className="relative z-10 mb-10 w-[100px] h-[100px] rounded-[2rem] bg-[#1c2637] border-2 border-white/10 shadow-2xl flex items-center justify-center group-hover:border-[#135bec] group-hover:scale-105 transition-all duration-500 shrink-0">
                                    <div className="absolute -top-3 -right-3 size-10 rounded-full bg-[#135bec] text-white flex items-center justify-center font-black text-sm shadow-lg group-hover:rotate-[360deg] transition-transform duration-1000">
                                        {item.step}
                                    </div>
                                    <span className="material-symbols-outlined text-[#135bec] group-hover:scale-110 transition-transform duration-500 select-none" style={{ fontSize: '40px' }}>
                                        {item.icon}
                                    </span>
                                </div>

                                <div className="flex flex-col gap-4 text-center lg:text-left">
                                    <h3 className="font-extrabold text-white tracking-tight group-hover:text-[#135bec] transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>

                                {/* Arrow for connection (mobile/tablet) */}
                                {index < steps.length - 1 && (
                                    <div className="lg:hidden my-6 opacity-20">
                                        <span className="material-symbols-outlined text-[40px]">arrow_downward</span>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
