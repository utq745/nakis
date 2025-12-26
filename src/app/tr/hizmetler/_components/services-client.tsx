"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export function ServicesClient() {
    const { language, t } = useLanguage();

    const mainServices = [
        {
            id: "approval",
            icon: "verified",
            title: t.servicesPage.mainServices.approval.title,
            desc: t.servicesPage.mainServices.approval.desc,
            includes: t.servicesPage.mainServices.approval.includes,
            price: "25$",
            color: "blue"
        },
        {
            id: "fix",
            icon: "build",
            title: t.servicesPage.mainServices.fix.title,
            desc: t.servicesPage.mainServices.fix.desc,
            includes: t.servicesPage.mainServices.fix.includes,
            price: "35$",
            highlighted: true,
            color: "indigo"
        },
        {
            id: "digitizing",
            icon: "diamond",
            title: t.servicesPage.mainServices.digitizing.title,
            desc: t.servicesPage.mainServices.digitizing.desc,
            includes: t.servicesPage.mainServices.digitizing.includes,
            price: "60$",
            color: "cyan"
        }
    ];

    const trTechnicalExpertise = [
        { icon: "layers", title: t.servicesPage.technicalExpertise.item1Title, desc: t.servicesPage.technicalExpertise.item1Desc },
        { icon: "swap_horiz", title: t.servicesPage.technicalExpertise.item2Title, desc: t.servicesPage.technicalExpertise.item2Desc },
        { icon: "settings", title: t.servicesPage.technicalExpertise.item3Title, desc: t.servicesPage.technicalExpertise.item3Desc },
        { icon: "dashboard_customize", title: t.servicesPage.technicalExpertise.item4Title, desc: t.servicesPage.technicalExpertise.item4Desc },
        { icon: "text_fields", title: t.servicesPage.technicalExpertise.item5Title, desc: t.servicesPage.technicalExpertise.item5Desc },
        { icon: "texture", title: t.servicesPage.technicalExpertise.item6Title, desc: t.servicesPage.technicalExpertise.item6Desc },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-background font-[family-name:var(--font-inter)] selection:bg-primary selection:text-white">
            <Header />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative pt-32 pb-48 md:pt-40 md:pb-64 overflow-hidden bg-[#172136]">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full"
                        />
                        <motion.div
                            animate={{ scale: [1.2, 1, 1.2] }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/15 blur-[100px] rounded-full"
                        />
                    </div>
                    {/* Dark mode gradient transition to next section */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background dark:to-[#172136] pointer-events-none" />

                    <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
                                <span className="material-symbols-outlined text-white" style={{ fontSize: '20px' }}>precision_manufacturing</span>
                                <span className="text-white/90 text-sm font-bold uppercase tracking-wider">
                                    {t.servicesPage.hero.badge}
                                </span>
                            </div>

                            <h1 className="text-white font-black leading-[1.1] mb-6 text-[clamp(2.5rem,5vw,4.5rem)]">
                                {t.servicesPage.hero.title}
                            </h1>
                            <p className="text-white/70 text-lg md:text-xl max-w-[700px] mx-auto">
                                {t.servicesPage.hero.description}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Technical Expertise */}
                <section className="py-24 md:py-32 -mt-32 md:-mt-48 relative z-20 bg-background dark:bg-[#172136]">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">
                                {t.servicesPage.technicalExpertise.title}
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
                                {t.servicesPage.technicalExpertise.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {trTechnicalExpertise.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="p-8 rounded-3xl bg-card dark:bg-[#1e2a3d] shadow-xl hover:shadow-2xl transition-all border border-border dark:border-white/10 hover:border-primary/20"
                                >
                                    <div className="mb-6 flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 dark:bg-white/10 text-primary dark:text-white shadow-inner">
                                        <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                    <p className="text-muted-foreground">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Core Services Section */}
                <section className="py-24 md:py-32 bg-primary/5 dark:bg-gradient-to-b dark:from-[#172136] dark:to-[#111318]">
                    <div className="container mx-auto px-4 md:px-6">
                        {/* Section Title */}
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
                                {language === 'tr' ? 'Sunduğumuz Hizmetler' : 'Our Services'}
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
                                {language === 'tr'
                                    ? 'Profesyonel nakış dijitalleştirme ve onay hizmetlerimizi keşfedin.'
                                    : 'Discover our professional embroidery digitizing and approval services.'}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                            {mainServices.map((service, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`relative group bg-card dark:bg-[#1e2a3d] rounded-[2.5rem] p-8 md:p-10 border border-border dark:border-white/10 shadow-xl hover:shadow-2xl transition-all ${service.highlighted ? 'md:scale-105 z-10 ring-2 ring-primary' : ''}`}
                                >
                                    <div className={`mb-8 w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${service.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                                        service.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
                                            'bg-cyan-50 text-cyan-600'
                                        }`}>
                                        <span className="material-symbols-outlined text-3xl font-bold">{service.icon}</span>
                                    </div>

                                    <h3 className="text-2xl font-black text-foreground mb-4">
                                        {service.title}
                                    </h3>
                                    <p className="text-muted-foreground mb-8 leading-relaxed h-[80px]">
                                        {service.desc}
                                    </p>

                                    <ul className="space-y-3 mb-10">
                                        {service.includes.map((item: string, iIndex: number) => (
                                            <li key={iIndex} className="flex items-center gap-3 text-sm font-bold text-foreground">
                                                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="pt-8 border-t border-border flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                                {service.id === 'approval' ? t.servicesPage.mainServices.approval.startingAt :
                                                    service.id === 'fix' ? t.servicesPage.mainServices.fix.startingAt :
                                                        t.servicesPage.mainServices.digitizing.startingAt}
                                            </p>
                                            <div className="flex flex-col">
                                                <p className="text-3xl font-black text-foreground tracking-tight">{service.price}</p>
                                                <Link href={language === 'tr' ? '/tr/fiyatlandirma' : '/pricing'} className="text-xs text-primary hover:underline mt-1 font-medium">
                                                    {language === 'tr' ? 'Detaylı fiyatlandırma' : 'View detailed pricing'}
                                                </Link>
                                            </div>
                                        </div>
                                        <Link href={language === 'tr' ? '/tr/giris' : '/login'}>
                                            <button className="p-4 rounded-xl bg-primary text-white hover:bg-primary-dark transition-colors shadow-lg">
                                                <span className="material-symbols-outlined">arrow_forward</span>
                                            </button>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Laboratory Section */}
                <section className="py-24 md:py-32 bg-[#111318] text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 skew-x-12 transform translate-x-1/2" />
                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        <div className="flex flex-col lg:flex-row items-center gap-20">
                            <div className="flex-1">
                                <h2 className="text-4xl md:text-5xl font-black mb-8 leading-[1.1]">
                                    {t.servicesPage.stitchLab.title}
                                </h2>
                                <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                                    {t.servicesPage.stitchLab.description}
                                </p>
                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <h5 className="font-black text-3xl text-white mb-2">Tajima</h5>
                                        <p className="text-white/50 text-sm uppercase font-bold tracking-widest">{t.servicesPage.stitchLab.machinePark}</p>
                                    </div>
                                    <div>
                                        <h5 className="font-black text-3xl text-white mb-2">High-Res</h5>
                                        <p className="text-white/50 text-sm uppercase font-bold tracking-widest">{t.servicesPage.stitchLab.scanQuality}</p>
                                    </div>
                                    <div className="flex flex-col justify-end col-span-2 sm:col-span-1">
                                        <Link
                                            href={language === 'tr' ? '/tr/iletisim' : '/contact'}
                                            className="text-white/70 hover:text-white text-sm font-bold flex items-center gap-1 mt-2 hover:gap-2 transition-all"
                                        >
                                            {language === 'tr' ? 'Teknik ekiple görüşün' : 'Contact our technical team'} <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 w-full relative">
                                <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full" />
                                <Image
                                    src="/images/Stitching-machine.webp"
                                    alt="Approval Stitch nakış laboratuvarında endüstriyel Tajima nakış makinesi"
                                    width={1200}
                                    height={800}
                                    className="relative z-10 w-full h-auto rounded-[3rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-24 md:py-32 bg-muted/50 dark:bg-gradient-to-b dark:from-[#111318] dark:to-[#09090b]">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="rounded-[3rem] bg-gradient-to-br from-primary to-primary-dark p-12 md:p-20 text-center relative overflow-hidden">
                            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-[1.1]">
                                {t.servicesPage.finalCTA.title}
                            </h2>
                            <p className="text-xl text-white/70 mb-12 max-w-[600px] mx-auto">
                                {t.servicesPage.finalCTA.description}
                            </p>
                            <Link href={language === 'tr' ? '/tr/giris' : '/login'}>
                                <button className="px-10 py-5 bg-white text-primary rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl">
                                    {t.servicesPage.finalCTA.cta}
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
