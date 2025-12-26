"use client";

import { useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PricingContent() {
    const { language, t } = useLanguage();
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0); // İlk FAQ açık başlasın

    const pricingPlans = [
        {
            name: t.pricingPage.plans.plan1.name,
            price: "$25",
            description: t.pricingPage.plans.plan1.description,
            features: t.pricingPage.plans.plan1.features,
            notIncluded: t.pricingPage.plans.plan1.notIncluded,
            bestFor: t.pricingPage.plans.plan1.bestFor,
            highlighted: false,
            cta: t.pricingPage.plans.plan1.cta,
        },
        {
            name: t.pricingPage.plans.plan2.name,
            price: "$35",
            priceNote: t.pricingPage.plans.plan2.priceNote,
            description: t.pricingPage.plans.plan2.description,
            features: t.pricingPage.plans.plan2.features,
            keyLogic: t.pricingPage.plans.plan2.keyLogic,
            bestFor: t.pricingPage.plans.plan2.bestFor,
            highlighted: true,
            popular: t.pricingPage.plans.plan2.popular,
            cta: t.pricingPage.plans.plan2.cta,
        },
        {
            name: t.pricingPage.plans.plan3.name,
            price: "$60",
            description: t.pricingPage.plans.plan3.description,
            features: t.pricingPage.plans.plan3.features,
            bestFor: t.pricingPage.plans.plan3.bestFor,
            highlighted: false,
            cta: t.pricingPage.plans.plan3.cta,
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

                    <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
                                <span className="material-symbols-outlined text-white" style={{ fontSize: '20px' }}>payments</span>
                                <span className="text-white/90 text-sm font-bold uppercase tracking-wider">{t.pricingPage.hero.badge}</span>
                            </div>

                            <h1 className="text-white font-black leading-[1.1] mb-6 text-[clamp(2rem,4vw,3.5rem)]">
                                {t.pricingPage.hero.title}
                            </h1>
                            <p className="text-white/70 text-lg md:text-xl max-w-[600px] mx-auto">
                                {t.pricingPage.hero.description}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Pricing Cards */}
                <section className="py-20 -mt-32 md:-mt-48 relative z-20">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                                        <span className={`text-5xl font-black ${plan.highlighted ? 'text-white' : 'text-[#111318] dark:text-white'}`}>
                                            {plan.price}
                                        </span>
                                        {plan.priceNote && (
                                            <span className={`block text-xs mt-2 px-3 py-1 rounded-full mx-auto w-fit ${plan.highlighted ? 'bg-white/20 text-white' : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'}`}>
                                                {plan.priceNote}
                                            </span>
                                        )}
                                    </div>

                                    {/* Features */}
                                    <ul className="space-y-3 mb-6 flex-grow">
                                        {plan.features.map((feature, fIndex) => (
                                            <li key={fIndex} className="flex items-start gap-3">
                                                <span className={`material-symbols-outlined shrink-0 ${plan.highlighted ? 'text-white' : 'text-green-500'}`} style={{ fontSize: '20px' }}>
                                                    check_circle
                                                </span>
                                                <span className={`text-sm ${plan.highlighted ? 'text-white/90' : 'text-[#616f89] dark:text-gray-300'}`}>
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Not Included */}
                                    {plan.notIncluded && (
                                        <div className="mb-6">
                                            <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${plan.highlighted ? 'text-white/60' : 'text-[#616f89] dark:text-gray-500'}`}>
                                                {t.pricingPage.plans.notIncluded}:
                                            </p>
                                            <ul className="space-y-2">
                                                {plan.notIncluded.map((item, nIndex) => (
                                                    <li key={nIndex} className="flex items-start gap-2">
                                                        <span className={`material-symbols-outlined shrink-0 ${plan.highlighted ? 'text-white/50' : 'text-red-400'}`} style={{ fontSize: '16px' }}>
                                                            close
                                                        </span>
                                                        <span className={`text-xs ${plan.highlighted ? 'text-white/60' : 'text-[#616f89] dark:text-gray-500'}`}>
                                                            {item}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Key Logic */}
                                    {plan.keyLogic && (
                                        <div className={`mb-6 p-4 rounded-xl ${plan.highlighted ? 'bg-white/10' : 'bg-blue-50 dark:bg-blue-900/20'}`}>
                                            <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${plan.highlighted ? 'text-white/80' : 'text-primary'}`}>
                                                {language === 'tr' ? 'Temel Mantık:' : 'Core Logic:'}
                                            </p>
                                            <p className={`text-xs ${plan.highlighted ? 'text-white/80' : 'text-[#616f89] dark:text-gray-400'}`}>
                                                {plan.keyLogic}
                                            </p>
                                        </div>
                                    )}

                                    {/* Best For */}
                                    <div className={`mb-6 text-center py-3 rounded-xl ${plan.highlighted ? 'bg-white/10' : 'bg-[#f4f6fa] dark:bg-[#0a0a0a]'}`}>
                                        <p className={`text-xs ${plan.highlighted ? 'text-white/60' : 'text-[#616f89] dark:text-gray-500'}`}>{t.pricingPage.plans.bestForLabel}</p>
                                        <p className={`text-sm font-bold ${plan.highlighted ? 'text-white' : 'text-[#111318] dark:text-white'}`}>{plan.bestFor}</p>
                                    </div>

                                    <Link href={language === 'tr' ? '/tr/giris' : '/login'} className="block mt-auto">
                                        <button className={`w-full py-3 rounded-xl font-bold transition-all ${plan.highlighted
                                            ? 'bg-white text-primary hover:bg-gray-100 shadow-lg'
                                            : 'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20'
                                            }`}>
                                            {plan.cta}
                                        </button>
                                    </Link>
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
                                        <span className={`material-symbols-outlined text-[#616f89] dark:text-gray-400 transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`}>
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
