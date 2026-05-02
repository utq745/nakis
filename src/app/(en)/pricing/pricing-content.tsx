"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { HeroBackground } from "@/components/landing/hero-background";

export default function PricingContent() {
    const { language, t } = useLanguage();
    const [mounted, setMounted] = useState(false);
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0); // İlk FAQ açık başlasın

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || !t || !t.pricingPage) return null;

    const pricingPlans = [
        {
            name: t.pricingPage.plans.plan1.name,
            price: t.pricingPage.plans.plan1.price,
            description: t.pricingPage.plans.plan1.description,
            features: t.pricingPage.plans.plan1.features,
            notIncluded: t.pricingPage.plans.plan1.notIncluded,
            bestFor: t.pricingPage.plans.plan1.bestFor,
            highlighted: false,
            cta: t.pricingPage.plans.plan1.cta,
        },
        {
            name: t.pricingPage.plans.plan2.name,
            price: t.pricingPage.plans.plan2.price,
            description: t.pricingPage.plans.plan2.description,
            importantNote: t.pricingPage.plans.plan2.importantNote,
            features: t.pricingPage.plans.plan2.features,
            notIncluded: t.pricingPage.plans.plan2.notIncluded,
            bestFor: t.pricingPage.plans.plan2.bestFor,
            highlighted: true,
            cta: t.pricingPage.plans.plan2.cta,
        },
        {
            name: t.pricingPage.plans.plan3.name,
            price: t.pricingPage.plans.plan3.price,
            description: t.pricingPage.plans.plan3.description,
            features: t.pricingPage.plans.plan3.features,
            supportingText: t.pricingPage.plans.plan3.supportingText,
            bestFor: t.pricingPage.plans.plan3.bestFor,
            highlighted: false,
            cta: t.pricingPage.plans.plan3.cta,
            ctaSubtext: t.pricingPage.plans.plan3.ctaSubtext,
        },
    ];

    const faqs = [
        { q: t.pricingPage.faq.q1, a: t.pricingPage.faq.a1 },
        { q: t.pricingPage.faq.q2, a: t.pricingPage.faq.a2 },
        { q: t.pricingPage.faq.q3, a: t.pricingPage.faq.a3 },
        { q: t.pricingPage.faq.q4, a: t.pricingPage.faq.a4 },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#f8fafc] dark:bg-[#09090b] font-[family-name:var(--font-inter)]">
            <Header />

            <main className="flex-grow" id="main-content">
                {/* Hero Section */}
                <section className="relative pt-32 pb-48 md:pt-40 md:pb-64 overflow-hidden bg-slate-50 dark:bg-[#172136]">
                    <HeroBackground />

                    <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 dark:bg-white/10 border border-primary/10 dark:border-white/20 backdrop-blur-sm mb-6">
                                <span className="material-symbols-outlined text-primary dark:text-white" style={{ fontSize: '20px' }}>payments</span>
                                <span className="text-primary dark:text-white/90 text-sm font-bold uppercase tracking-wider">{t.pricingPage.hero.badge}</span>
                            </div>

                            <h1 className="text-primary dark:text-white font-black leading-[1.1] mb-6 text-[clamp(2rem,4vw,3.5rem)]">
                                {t.pricingPage.hero.title}
                            </h1>
                            <p className="text-slate-600 dark:text-white/70 text-lg md:text-xl max-w-[600px] mx-auto">
                                {t.pricingPage.hero.description}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Pricing Cards */}
                <section className="py-20 -mt-32 md:-mt-48 relative z-20">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
                            {pricingPlans.map((plan, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`relative rounded-3xl p-8 flex flex-col ${plan.highlighted
                                        ? 'bg-gradient-to-br from-primary to-primary-dark text-white shadow-2xl shadow-primary/20 lg:scale-105 z-10 lg:-mt-8 xl:-mt-10'
                                        : 'bg-white dark:bg-[#18181b] border border-border shadow-xl'
                                        }`}
                                >

                                    <div className="text-center mb-6">
                                        <h3 className={`font-bold text-lg mb-2 ${plan.highlighted ? 'text-white' : 'text-[#111318] dark:text-white'}`}>
                                            {plan.name}
                                        </h3>
                                    </div>

                                    <div className="text-center mb-6">
                                        <span
                                            className={`text-5xl font-black ${plan.highlighted ? 'text-white' : 'text-[#111318] dark:text-white'}`}
                                            dangerouslySetInnerHTML={{ __html: plan.price }}
                                        />
                                    </div>

                                    {/* Description */}
                                    <p className={`text-sm text-center mb-6 font-medium ${plan.highlighted ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'}`}>
                                        {plan.description}
                                    </p>

                                    {/* Features */}
                                    <ul className="space-y-3 mb-6 flex-grow">
                                        {plan.features.map((feature, fIndex) => (
                                            <li key={fIndex} className="flex items-start gap-3">
                                                <span className={`material-symbols-outlined shrink-0 ${plan.highlighted ? 'text-white' : 'text-green-500'}`} style={{ fontSize: '20px' }}>
                                                    check_circle
                                                </span>
                                                <span className={`text-sm ${plan.highlighted ? 'text-white/90' : 'text-[#616f89] dark:text-gray-300'}`} dangerouslySetInnerHTML={{ __html: feature }} />
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Supporting Text (for Plan 3) */}
                                    {plan.supportingText && (
                                        <div className="mb-6 p-4 rounded-xl bg-primary/5 dark:bg-white/5 border border-primary/10 dark:border-white/10">
                                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                                                {plan.supportingText}
                                            </p>
                                        </div>
                                    )}

                                    {/* Not Included */}
                                    {plan.notIncluded && plan.notIncluded.length > 0 && plan.notIncluded[0] !== '-' && (
                                        <div className="mb-6">
                                            <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${plan.highlighted ? 'text-white/60' : 'text-[#616f89] dark:text-gray-500'}`}>
                                                {t.pricingPage.plans.notIncluded}:
                                            </p>
                                            <ul className="space-y-2">
                                                {plan.notIncluded.map((item, nIndex) => (
                                                    <li key={nIndex} className="flex items-start gap-2">
                                                        <span className="material-symbols-outlined shrink-0 text-red-500" style={{ fontSize: '16px' }}>
                                                            close
                                                        </span>
                                                        <span className={`text-xs ${plan.highlighted ? 'text-white/60' : 'text-[#616f89] dark:text-gray-500'}`} dangerouslySetInnerHTML={{ __html: item }} />
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Important Note (for Plan 2) */}
                                    {plan.importantNote && (
                                        <div className="mb-6">
                                            <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${plan.highlighted ? 'text-white/60' : 'text-slate-500 dark:text-slate-400'}`}>
                                                {t.pricingPage.plans.importantNoteLabel}
                                            </p>
                                            <p className={`text-sm font-black ${plan.highlighted ? 'text-white' : 'text-slate-800 dark:text-slate-200'}`}>
                                                {plan.importantNote}
                                            </p>
                                        </div>
                                    )}

                                    {/* Best For */}
                                    <div className={`mb-6 text-center py-3 px-4 rounded-xl ${plan.highlighted ? 'bg-white/10' : 'bg-[#f4f6fa] dark:bg-white/5'}`}>
                                        <p className={`text-xs mb-1 ${plan.highlighted ? 'text-white/60' : 'text-[#616f89] dark:text-gray-500'}`}>{t.pricingPage.plans.bestForLabel}</p>
                                        <p className={`text-sm font-bold ${plan.highlighted ? 'text-white' : 'text-[#111318] dark:text-white'}`} dangerouslySetInnerHTML={{ __html: plan.bestFor }} />
                                    </div>

                                    <div className="mt-auto">
                                        <Link href={language === 'tr' ? '/tr/giris' : '/login'} className="block">
                                            <button className={`w-full py-4 rounded-xl font-black text-lg transition-all ${plan.highlighted
                                                ? 'bg-white text-primary hover:bg-gray-100 shadow-xl'
                                                : 'bg-primary text-white hover:bg-primary-dark shadow-xl shadow-primary/20'
                                                }`}>
                                                {plan.cta}
                                            </button>
                                        </Link>
                                        {plan.ctaSubtext && (
                                            <p className="text-center text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-tight">
                                                {plan.ctaSubtext}
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-20 bg-[#eef2ff] dark:bg-gradient-to-b dark:from-[#09090b] dark:to-[#172136]">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16">
                            <h2 className="font-black text-[#111318] dark:text-white mb-4">
                                {t.pricingPage.faq.title}
                            </h2>
                        </div>

                        <div className="max-w-3xl mx-auto space-y-4">
                            {faqs.map((faq, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="bg-white dark:bg-[#18181b] rounded-2xl border border-[#e5e7eb] dark:border-[#27272a] overflow-hidden"
                                >
                                    <button
                                        onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                                        className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-[#f8fafc] dark:hover:bg-[#27272a]/50 transition-colors"
                                        aria-expanded={openFaqIndex === index}
                                        aria-controls={`pricing-faq-content-${index}`}
                                        id={`pricing-faq-header-${index}`}
                                    >
                                        <div className="flex items-center gap-3 flex-1">
                                            <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                <span className="material-symbols-outlined text-primary" style={{ fontSize: '18px' }}>help</span>
                                            </span>
                                            <h3 className="font-bold text-[#111318] dark:text-white">{faq.q}</h3>
                                        </div>
                                        <span className={`material-symbols-outlined transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180 text-primary dark:text-green-500' : 'text-[#616f89] dark:text-green-500'}`}>
                                            expand_more
                                        </span>
                                    </button>

                                    <div
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === index ? 'max-h-96' : 'max-h-0'}`}
                                        id={`pricing-faq-content-${index}`}
                                        role="region"
                                        aria-labelledby={`pricing-faq-header-${index}`}
                                        aria-hidden={openFaqIndex !== index}
                                    >
                                        <div className="px-6 pb-6">
                                            <p className="text-[#616f89] dark:text-gray-400 pl-11">{faq.a}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-[#242f42] dark:bg-gradient-to-b dark:from-[#172136] dark:to-[#09090b]">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary to-primary-dark p-12 md:p-16 text-center">
                            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/10 rounded-full blur-3xl" />

                            <div className="relative z-10">
                                <h2 className="font-black text-white mb-4">{t.pricingPage.faq.customQuoteTitle}</h2>
                                <p className="text-xl text-white/80 mb-8 max-w-[500px] mx-auto">
                                    {t.pricingPage.faq.customQuoteDesc}
                                </p>
                                <Link href={language === 'tr' ? '/tr/iletisim' : '/contact'}>
                                    <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-primary font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl">
                                        <span className="material-symbols-outlined">mail</span>
                                        {t.pricingPage.faq.contactUs}
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
