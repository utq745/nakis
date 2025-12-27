"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutContent() {
    const { t, language } = useLanguage();

    return (
        <div className="flex flex-col min-h-screen bg-background font-[family-name:var(--font-inter)]">
            <Header />

            <main className="flex-grow">
                {/* 1. Hero Section */}
                <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-[#172136]">
                    {/* Animated Background */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/15 blur-[120px] rounded-full"
                        />
                        <motion.div
                            animate={{ scale: [1.2, 1, 1.2], rotate: [0, -45, 0] }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-400/10 blur-[120px] rounded-full"
                        />
                        <div className="absolute inset-0 opacity-5" style={{
                            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }} />
                    </div>

                    <div className="container mx-auto px-4 md:px-6 relative z-10 py-20">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center max-w-4xl mx-auto"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
                                <span className="size-2 rounded-full bg-primary animate-pulse" />
                                <span className="text-white/80 text-xs font-bold tracking-[0.2em] uppercase">{t.aboutPage.hero.badge}</span>
                            </div>

                            <h1 className="text-white font-black leading-[1.1] mb-6 text-[clamp(2.5rem,6vw,5rem)]">
                                <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                                    {t.aboutPage.hero.title1}
                                </span>
                            </h1>
                            <h2 className="text-white/90 text-2xl md:text-3xl font-bold mb-8">
                                {t.aboutPage.hero.title2}
                            </h2>

                            <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-[700px] mx-auto">
                                {t.aboutPage.hero.description}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* 2. Experience Section - GÜVEN OLUŞTUR */}
                <section className="py-20 md:py-28 bg-muted/50 dark:bg-[#0E49BF]">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="flex justify-center"
                            >
                                <div className="relative">
                                    <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl bg-gradient-to-br from-primary to-primary-dark flex flex-col items-center justify-center shadow-2xl">
                                        <span className="text-white font-black text-7xl md:text-8xl">{t.aboutPage.experience.years}</span>
                                        <span className="text-white/80 text-lg font-medium uppercase tracking-widest">{t.aboutPage.experience.yearsLabel}</span>
                                    </div>
                                    <div className="absolute -top-6 -right-6 w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20">
                                        <span className="material-symbols-outlined text-white text-3xl">star</span>
                                    </div>
                                    <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20">
                                        <span className="material-symbols-outlined text-white text-2xl">verified</span>
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-white/5 border border-primary/20 dark:border-white/10 backdrop-blur-sm w-fit mb-4">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary dark:bg-white opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary dark:bg-white"></span>
                                    </span>
                                    <span className="text-primary dark:text-white/80 text-xs font-bold tracking-[0.2em] uppercase">{t.aboutPage.experience.badge}</span>
                                </div>
                                <h2 className="text-foreground dark:text-white mt-4 mb-6 font-black">
                                    {t.aboutPage.experience.title}
                                </h2>
                                <p className="text-lg text-muted-foreground dark:text-white/80 leading-relaxed">
                                    {t.aboutPage.experience.description}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* 3. Who Is This For Section - HEDEF KİTLE */}
                <section className="py-20 md:py-28 bg-background">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-14">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-white/5 border border-primary/20 dark:border-white/10 backdrop-blur-sm w-fit mb-4 mx-auto">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                <span className="text-primary dark:text-white/80 text-xs font-bold tracking-[0.2em] uppercase">{t.aboutPage.whoIsFor.badge}</span>
                            </div>
                            <h2 className="text-foreground dark:text-white mb-4 font-black">
                                {t.aboutPage.whoIsFor.title}
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
                                {t.aboutPage.whoIsFor.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                            {t.aboutPage.whoIsFor.audiences.map((audience: string, index: number) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="group bg-card dark:bg-[#172136] rounded-2xl p-6 border border-border dark:border-white/10 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-xl text-center"
                                >
                                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary dark:bg-white/10 dark:text-white group-hover:bg-primary group-hover:text-white transition-colors mb-4 mx-auto">
                                        <span className="material-symbols-outlined text-2xl">
                                            {index === 0 ? 'precision_manufacturing' : index === 1 ? 'storefront' : index === 2 ? 'groups' : 'verified'}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-foreground dark:text-white">{audience}</h3>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-r from-primary/10 to-blue-400/10 dark:from-[#172136] dark:to-[#1e2d4a] rounded-2xl p-8 border border-primary/20 dark:border-white/10 text-center max-w-3xl mx-auto"
                        >
                            <p className="text-lg text-foreground dark:text-white leading-relaxed font-medium">
                                {t.aboutPage.whoIsFor.conclusion}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* 4. What We Do Section */}
                <section className="py-20 md:py-28 bg-muted/50 dark:bg-[#18212f]">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-white/5 border border-primary/20 dark:border-white/10 backdrop-blur-sm w-fit mb-4">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                    </span>
                                    <span className="text-primary dark:text-white/80 text-xs font-bold tracking-[0.2em] uppercase">{t.aboutPage.whatWeDo.badge}</span>
                                </div>
                                <h2 className="text-foreground dark:text-white mt-4 mb-6 font-black">
                                    {t.aboutPage.whatWeDo.title}
                                </h2>
                                <p className="text-lg text-muted-foreground dark:text-white/80 leading-relaxed mb-6">
                                    {t.aboutPage.whatWeDo.description}
                                </p>
                                <p className="text-muted-foreground dark:text-white/70 leading-relaxed">
                                    {t.aboutPage.whatWeDo.detail}
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="relative"
                            >
                                <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-primary/20 rounded-2xl" />
                                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-2xl" />
                                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                                    <img
                                        src="/images/Stitching-machine.webp"
                                        alt="Professional Tajima embroidery machine used for stitch approval testing at Approval Stitch"
                                        className="w-full h-auto object-cover"
                                        loading="lazy"
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* 5. Why It Matters Section */}
                <section className="py-20 md:py-28 bg-background">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-14">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-white/5 border border-primary/20 dark:border-white/10 backdrop-blur-sm w-fit mb-4 mx-auto">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                <span className="text-primary dark:text-white/80 text-xs font-bold tracking-[0.2em] uppercase">{t.aboutPage.whyMatters.badge}</span>
                            </div>
                            <h2 className="text-foreground dark:text-white mb-4 font-black">
                                {t.aboutPage.whyMatters.title}
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
                                {t.aboutPage.whyMatters.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                            {t.aboutPage.whyMatters.factors.map((factor: string, index: number) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="group bg-card dark:bg-[#172136] rounded-2xl p-6 border border-border dark:border-white/10 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-xl text-center"
                                >
                                    <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary dark:bg-white/10 dark:text-white group-hover:bg-primary group-hover:text-white transition-colors mb-4 mx-auto">
                                        <span className="material-symbols-outlined text-3xl">
                                            {index === 0 ? 'texture' : index === 1 ? 'density_medium' : index === 2 ? 'swap_horiz' : 'cable'}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-foreground dark:text-white text-sm">{factor}</h3>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-card dark:bg-[#172136] rounded-2xl p-8 border border-border dark:border-white/10 text-center max-w-3xl mx-auto"
                        >
                            <p className="text-lg text-muted-foreground dark:text-white/80 leading-relaxed">
                                {t.aboutPage.whyMatters.conclusion}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* 6. What You Receive */}
                <section className="py-20 md:py-28 bg-[#111318] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }} />
                    </div>

                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        <div className="text-center mb-14">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm w-fit mb-4 mx-auto">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                <span className="text-white/80 text-xs font-bold tracking-[0.2em] uppercase">{t.aboutPage.whatYouReceive.badge}</span>
                            </div>
                            <h2 className="text-white mb-4 font-black">
                                {t.aboutPage.whatYouReceive.title}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                            {[
                                { icon: "approval", text: t.aboutPage.whatYouReceive.item1 },
                                { icon: "description", text: t.aboutPage.whatYouReceive.item2 },
                                { icon: "center_focus_strong", text: t.aboutPage.whatYouReceive.item3 },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="flex flex-col items-center text-center p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300"
                                >
                                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white mb-4 shadow-lg">
                                        <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                                    </div>
                                    <p className="text-white font-medium">{item.text}</p>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center max-w-3xl mx-auto"
                        >
                            <span className="material-symbols-outlined text-green-400 mb-3" style={{ fontSize: '48px' }}>check_circle</span>
                            <p className="text-lg text-white/80 leading-relaxed">
                                {t.aboutPage.whatYouReceive.conclusion}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* 7. How The Process Works - Enhanced Home Page Design */}
                <section className="w-full py-24 md:py-32 bg-background relative overflow-hidden">
                    {/* Background patterns */}
                    <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <circle cx="0" cy="0" r="40" fill="url(#grad_process)" />
                            <defs>
                                <radialGradient id="grad_process" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="1" />
                                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                                </radialGradient>
                            </defs>
                        </svg>
                    </div>

                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        <div className="flex flex-col items-center text-center gap-6 mb-20 md:mb-28">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4 }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 dark:bg-white/10 border border-primary/20 dark:border-white/20 w-fit"
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary dark:bg-white opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary dark:bg-white"></span>
                                </span>
                                <span className="text-primary dark:text-white font-semibold text-xs uppercase tracking-wider">{t.aboutPage.process.badge}</span>
                            </motion.div>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="max-w-[700px] tracking-tight text-foreground dark:text-white font-black"
                            >
                                {t.aboutPage.process.title}
                            </motion.h2>
                        </div>

                        <div className="relative">
                            {/* Connector Line (visible on desktop) */}
                            <div className="hidden lg:block absolute top-[50px] left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/20 dark:via-white/10 to-transparent z-0"></div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-14 relative z-10">
                                {[
                                    { icon: "cloud_upload", title: t.aboutPage.process.step1Title, desc: t.aboutPage.process.step1Desc, step: "01" },
                                    { icon: "tune", title: t.aboutPage.process.step2Title, desc: t.aboutPage.process.step2Desc, step: "02" },
                                    { icon: "memory", title: t.aboutPage.process.step3Title, desc: t.aboutPage.process.step3Desc, step: "03" },
                                    { icon: "verified_user", title: t.aboutPage.process.step4Title, desc: t.aboutPage.process.step4Desc, step: "04" },
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.2, delay: index * 0.4, ease: "easeOut" }}
                                        className="relative group flex flex-col items-center lg:items-start"
                                    >
                                        {/* Step Number Badge */}
                                        <div className="relative z-10 mb-10 w-[100px] h-[100px] rounded-[2rem] bg-white dark:bg-[#1c2637] border-2 border-primary/20 dark:border-white/10 shadow-xl dark:shadow-2xl group-hover:border-primary group-hover:scale-105 transition-all duration-500 shrink-0 flex items-center justify-center">
                                            <div className="absolute -top-3 -right-3 size-10 rounded-full bg-primary text-white flex items-center justify-center font-black text-sm shadow-lg group-hover:rotate-[360deg] transition-transform duration-1000">
                                                {item.step}
                                            </div>
                                            <span className="material-symbols-outlined text-primary dark:text-white group-hover:scale-110 transition-transform duration-500 select-none" style={{ fontSize: '40px' }}>
                                                {item.icon}
                                            </span>
                                        </div>

                                        <div className="flex flex-col gap-4 text-center lg:text-left">
                                            <h3 className="text-foreground dark:text-white tracking-tight group-hover:text-primary transition-colors font-black">
                                                {item.title}
                                            </h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {item.desc}
                                            </p>
                                        </div>

                                        {/* Arrow for connection (mobile/tablet) */}
                                        {index < 3 && (
                                            <div className="lg:hidden my-6 opacity-20">
                                                <span className="material-symbols-outlined text-[40px] text-primary dark:text-white">arrow_downward</span>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 8. No Machines Section */}
                <section className="py-20 md:py-28 bg-muted/50 dark:bg-[#18212f]">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-white/5 border border-primary/20 dark:border-white/10 backdrop-blur-sm w-fit mb-4">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                    </span>
                                    <span className="text-primary dark:text-white/80 text-xs font-bold tracking-[0.2em] uppercase">{t.aboutPage.noMachines.badge}</span>
                                </div>
                                <h2 className="text-foreground dark:text-white mt-4 mb-6 font-black">
                                    {t.aboutPage.noMachines.title}
                                </h2>
                                <p className="text-lg text-muted-foreground dark:text-white/80 leading-relaxed mb-6">
                                    {t.aboutPage.noMachines.description}
                                </p>
                                <ul className="space-y-4 mb-8">
                                    {t.aboutPage.noMachines.items.map((item: string, index: number) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500/10 text-red-500">
                                                <span className="material-symbols-outlined text-lg">close</span>
                                            </span>
                                            <span className="text-muted-foreground dark:text-white/70">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="bg-primary/10 dark:bg-[#172136] rounded-xl p-6 border border-primary/20 dark:border-white/10">
                                    <div className="flex items-center gap-3">
                                        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500/10 text-green-500">
                                            <span className="material-symbols-outlined">check</span>
                                        </span>
                                        <p className="text-foreground dark:text-white font-medium">{t.aboutPage.noMachines.conclusion}</p>
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="flex justify-center items-center"
                            >
                                <div className="relative">
                                    <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-primary/20 to-blue-400/20 flex items-center justify-center">
                                        <div className="w-48 h-48 md:w-60 md:h-60 rounded-full bg-gradient-to-br from-primary/30 to-blue-400/30 flex items-center justify-center">
                                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-2xl">
                                                <span className="material-symbols-outlined text-white text-5xl md:text-6xl">thumb_up</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* 9. CTA Section */}
                <section className="py-20 md:py-28 bg-background dark:bg-gradient-to-b dark:from-[#18212f] dark:to-[#09090b]">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary to-primary-dark p-12 md:p-20 text-center">
                            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/10 rounded-full blur-3xl" />

                            <div className="relative z-10">
                                <span className="material-symbols-outlined text-white/30 mb-6" style={{ fontSize: '80px' }}>rocket_launch</span>
                                <h2 className="text-white mb-4 font-black">{t.aboutPage.finalCta.title}</h2>
                                <p className="text-xl text-white/80 mb-8 max-w-[500px] mx-auto italic">
                                    "{t.aboutPage.finalCta.tagline}"
                                </p>
                                <Link href={language === 'tr' ? '/tr/iletisim' : '/contact'}>
                                    <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-primary font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl hover:shadow-2xl">
                                        <span className="material-symbols-outlined">arrow_forward</span>
                                        {t.aboutPage.finalCta.cta}
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
