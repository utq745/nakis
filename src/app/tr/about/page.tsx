"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutPage() {
    const { t, language } = useLanguage();

    const experienceItems = [
        { icon: "layers", title: t.aboutPage.expertise.item1Title, desc: t.aboutPage.expertise.item1Desc },
        { icon: "swap_horiz", title: t.aboutPage.expertise.item2Title, desc: t.aboutPage.expertise.item2Desc },
        { icon: "settings", title: t.aboutPage.expertise.item3Title, desc: t.aboutPage.expertise.item3Desc },
        { icon: "dashboard_customize", title: t.aboutPage.expertise.item4Title, desc: t.aboutPage.expertise.item4Desc },
        { icon: "text_fields", title: t.aboutPage.expertise.item5Title, desc: t.aboutPage.expertise.item5Desc },
        { icon: "texture", title: t.aboutPage.expertise.item6Title, desc: t.aboutPage.expertise.item6Desc },
    ];

    const deliverItems = [
        { icon: "precision_manufacturing", text: t.aboutPage.delivery.item1 },
        { icon: "photo_camera", text: t.aboutPage.delivery.item2 },
        { icon: "badge", text: t.aboutPage.delivery.item3 },
        { icon: "palette", text: t.aboutPage.delivery.item4 },
        { icon: "assignment", text: t.aboutPage.delivery.item5 },
        { icon: "folder_zip", text: t.aboutPage.delivery.item6 },
    ];

    const stats = [
        { value: "35+", label: t.aboutPage.stats.yearsExp },
        { value: "10K+", label: t.aboutPage.stats.projectsCompleted },
        { value: "12s", label: t.aboutPage.stats.avgTurnaround },
        { value: "100%", label: t.aboutPage.stats.accuracyRate },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-background font-[family-name:var(--font-inter)]">
            <Header />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-[#172136]">
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
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            {/* Left Content */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
                                    <span className="size-2 rounded-full bg-primary animate-pulse" />
                                    <span className="text-white/80 text-xs font-bold tracking-[0.2em] uppercase">{t.aboutPage.hero.badge}</span>
                                </div>

                                <h1 className="text-white font-black leading-[1.1] mb-8 text-[clamp(2.5rem,5vw,4rem)]">
                                    {t.aboutPage.hero.title1}<br />
                                    <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                                        {t.aboutPage.hero.title2}
                                    </span>
                                </h1>

                                <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-8 max-w-[500px]">
                                    {t.aboutPage.hero.description}
                                </p>

                                <div className="flex items-center gap-3 text-white/60">
                                    <span className="material-symbols-outlined">location_on</span>
                                    <span>{t.aboutPage.hero.location}</span>
                                </div>
                            </motion.div>

                            {/* Right Stats */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="grid grid-cols-2 gap-6"
                            >
                                {stats.map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300"
                                    >
                                        <p className="text-4xl md:text-5xl font-black text-white mb-2">{stat.value}</p>
                                        <p className="text-white/60 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Story Section */}
                <section className="py-24 md:py-32 bg-background">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="relative">
                                <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-[#145BEC]/20 rounded-2xl" />
                                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#145BEC]/10 rounded-2xl" />
                                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                                    <img
                                        src="/images/Stitching-machine.webp"
                                        alt="Tajima Kalibreli Tek Kafalı Makine"
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-white/5 border border-primary/20 dark:border-white/10 backdrop-blur-sm w-fit mb-4">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                    </span>
                                    <span className="text-primary dark:text-white/80 text-xs font-bold tracking-[0.2em] uppercase">{t.aboutPage.story.badge}</span>
                                </div>
                                <h2 className="text-foreground dark:text-white mt-4 mb-6 font-black">
                                    {t.aboutPage.story.title}
                                </h2>
                                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                    {t.aboutPage.story.desc1}
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    {t.aboutPage.story.desc2}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Experience Grid */}
                <section className="py-24 md:py-32 bg-muted/50 dark:bg-[#0E49BF]">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-white/5 border border-primary/20 dark:border-white/10 backdrop-blur-sm w-fit mb-4 mx-auto">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary dark:bg-white opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary dark:bg-white"></span>
                                </span>
                                <span className="text-primary dark:text-white/80 text-xs font-bold tracking-[0.2em] uppercase">{t.aboutPage.expertise.badge}</span>
                            </div>
                            <h2 className="text-foreground dark:text-white mb-4 font-black">
                                {t.aboutPage.expertise.title}
                            </h2>
                            <p className="text-lg text-muted-foreground dark:text-white/80 max-w-[600px] mx-auto">
                                {t.aboutPage.expertise.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {experienceItems.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="group bg-card dark:bg-[#172136] rounded-2xl p-6 border border-border dark:border-white/10 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >
                                    <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary dark:bg-white/10 dark:text-white group-hover:bg-primary group-hover:text-white transition-colors mb-4">
                                        <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                                    </div>
                                    <h4 className="font-bold text-foreground mb-2">{item.title}</h4>
                                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* What We Deliver */}
                <section className="py-24 md:py-32 bg-background">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-white/5 border border-primary/20 dark:border-white/10 backdrop-blur-sm w-fit mb-4">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                    </span>
                                    <span className="text-primary dark:text-white/80 text-xs font-bold tracking-[0.2em] uppercase">{t.aboutPage.delivery.badge}</span>
                                </div>
                                <h2 className="text-foreground dark:text-white mt-4 mb-6 font-black">
                                    {t.aboutPage.delivery.title}
                                </h2>
                                <p className="text-muted-foreground leading-relaxed mb-8">
                                    {t.aboutPage.delivery.description}
                                </p>
                                <Link href={language === 'tr' ? '/tr/contact' : '/contact'}>
                                    <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-colors">
                                        <span className="material-symbols-outlined">arrow_forward</span>
                                        {t.aboutPage.delivery.cta}
                                    </button>
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                {deliverItems.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 dark:bg-[#172136] border-2 border-transparent dark:border-white/10 hover:border-primary/30 dark:hover:border-primary transition-all"
                                    >
                                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white shadow-lg">
                                            <span className="material-symbols-outlined">{item.icon}</span>
                                        </div>
                                        <p className="font-medium text-foreground dark:text-white flex-1">{item.text}</p>
                                        <span className="material-symbols-outlined text-green-500">check_circle</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="py-24 md:py-32 bg-[#111318] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }} />
                    </div>

                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        <div className="text-center max-w-4xl mx-auto">
                            <h2 className="text-white mb-8 font-black">{t.aboutPage.mission.title}</h2>
                            <p className="text-xl text-gray-300 leading-relaxed mb-8">
                                {t.aboutPage.mission.description}
                            </p>
                            <blockquote className="text-2xl md:text-3xl font-bold text-white italic border-l-4 border-primary pl-6 text-left">
                                "{t.aboutPage.mission.quote}"
                            </blockquote>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                            {[
                                { icon: "verified", text: t.aboutPage.mission.goal1, color: "from-blue-500 to-indigo-500" },
                                { icon: "visibility", text: t.aboutPage.mission.goal2, color: "from-purple-500 to-pink-500" },
                                { icon: "sync", text: t.aboutPage.mission.goal3, color: "from-orange-500 to-red-500" },
                            ].map((goal, index) => (
                                <div key={index} className="text-center p-8">
                                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${goal.color} text-white mb-4 shadow-lg`}>
                                        <span className="material-symbols-outlined text-4xl">{goal.icon}</span>
                                    </div>
                                    <p className="text-xl font-bold text-white">{goal.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 md:py-32 bg-muted/50 dark:bg-gradient-to-b dark:from-[#111318] dark:to-[#09090b]">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary to-primary-dark p-12 md:p-20 text-center">
                            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/10 rounded-full blur-3xl" />

                            <div className="relative z-10">
                                <span className="material-symbols-outlined text-white/30 mb-6" style={{ fontSize: '80px' }}>rocket_launch</span>
                                <h2 className="text-white mb-4 font-black">{t.aboutPage.finalCta.title}</h2>
                                <p className="text-xl text-white/80 mb-8 max-w-[500px] mx-auto">
                                    {t.aboutPage.finalCta.description}
                                </p>
                                <Link href={language === 'tr' ? '/tr/contact' : '/contact'}>
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
