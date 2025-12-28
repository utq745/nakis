"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Process } from "@/components/landing/process";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { HeroBackground } from "@/components/landing/hero-background";

export function AboutClient() {
    const { t, language } = useLanguage();

    return (
        <div className="flex flex-col min-h-screen bg-background font-[family-name:var(--font-inter)]">
            <Header />

            <main className="flex-grow">
                {/* 1. Hero Section */}
                <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-slate-50 dark:bg-[#172136]">
                    <HeroBackground />

                    <div className="container mx-auto px-4 md:px-6 relative z-10 py-20">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center max-w-4xl mx-auto"
                        >


                            <h1 className="text-primary dark:text-white font-black leading-[1.1] mb-6 text-[clamp(2.5rem,6vw,5rem)]">
                                <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                                    {t.aboutPage.hero.title1}
                                </span>
                            </h1>
                            <h2 className="text-slate-700 dark:text-white/90 text-2xl md:text-3xl font-bold mb-8">
                                {t.aboutPage.hero.title2}
                            </h2>

                            <p className="text-slate-600 dark:text-white/70 text-lg md:text-xl leading-relaxed max-w-[700px] mx-auto">
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
                                <h2 className="text-foreground dark:text-white mb-4 font-black">
                                    {t.aboutPage.experience.title}
                                </h2>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="w-24 h-1.5 bg-primary dark:bg-white rounded-full opacity-40 mb-6"
                                ></motion.div>
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
                            <h2 className="text-foreground dark:text-white mb-4 font-black">
                                {t.aboutPage.whoIsFor.title}
                            </h2>
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="w-24 h-1.5 bg-primary dark:bg-white rounded-full opacity-40 mb-6 mx-auto"
                            ></motion.div>
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
                                <h2 className="text-foreground dark:text-white mb-4 font-black">
                                    {t.aboutPage.whatWeDo.title}
                                </h2>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="w-24 h-1.5 bg-primary dark:bg-white rounded-full opacity-40 mb-6"
                                ></motion.div>
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
                                    <Image
                                        src="/images/Stitching-machine.webp"
                                        alt="Approval Stitch nakış laboratuvarında profesyonel Tajima nakış makinesi"
                                        width={1200}
                                        height={800}
                                        className="w-full h-auto object-cover"
                                        priority
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
                            <h2 className="text-foreground dark:text-white mb-4 font-black">
                                {t.aboutPage.whyMatters.title}
                            </h2>
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="w-24 h-1.5 bg-primary dark:bg-white rounded-full opacity-40 mb-6 mx-auto"
                            ></motion.div>
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
                            {[
                                { title: t.landing.receive.item3Title, desc: t.landing.receive.item3Desc },
                                { title: t.landing.receive.item1Title, desc: t.landing.receive.item1Desc },
                                { title: t.landing.receive.item2Title, desc: t.landing.receive.item2Desc }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex flex-col gap-6"
                                >
                                    <div className="w-full aspect-square bg-gray-100 dark:bg-white/5 rounded-3xl border-2 border-dashed border-gray-200 dark:border-white/10 flex items-center justify-center relative overflow-hidden group">
                                        <div className="flex flex-col items-center gap-4 text-gray-400 dark:text-white/20">
                                            <span className="material-symbols-outlined text-5xl">image</span>
                                            <span className="text-sm font-medium">300 x 300px</span>
                                        </div>
                                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                    </div>
                                    <div className="flex flex-col gap-2 text-center md:text-left">
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

                {/* 7. How The Process Works */}
                <Process />

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

                                <h2 className="text-foreground dark:text-white mb-4 font-black">
                                    {t.aboutPage.noMachines.title}
                                </h2>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="w-24 h-1.5 bg-primary dark:bg-white rounded-full opacity-40 mb-6"
                                ></motion.div>
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
