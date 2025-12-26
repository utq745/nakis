"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function FAQsContent() {
    const { t, language } = useLanguage();
    const faqs = t.faqsPage;

    const [searchQuery, setSearchQuery] = useState("");
    const [openIndex, setOpenIndex] = useState<string | null>("0-0");

    const faqCategories = [
        {
            title: faqs.categories.services,
            questions: [
                { q: faqs.questions.q1, a: faqs.questions.a1 },
                { q: faqs.questions.q2, a: faqs.questions.a2 },
                { q: faqs.questions.q3, a: faqs.questions.a3 },
            ]
        },
        {
            title: faqs.categories.technical,
            questions: [
                { q: faqs.questions.q4, a: faqs.questions.a4 },
                { q: faqs.questions.q5, a: faqs.questions.a5 },
                { q: faqs.questions.q6, a: faqs.questions.a6 },
            ]
        },
        {
            title: faqs.categories.turnaround,
            questions: [
                { q: faqs.questions.q7, a: faqs.questions.a7 },
                { q: faqs.questions.q8, a: faqs.questions.a8 },
                { q: faqs.questions.q9, a: faqs.questions.a9 },
            ]
        }
    ];

    const filteredCategories = faqCategories.map(category => ({
        ...category,
        questions: category.questions.filter(faq =>
            faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.a.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(category => category.questions.length > 0);

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
                                <span className="material-symbols-outlined text-white" style={{ fontSize: '20px' }}>help</span>
                                <span className="text-white/90 text-sm font-bold uppercase tracking-wider">{faqs.hero.badge}</span>
                            </div>

                            <h1 className="text-white font-black leading-[1.1] mb-6 text-[clamp(2.5rem,5vw,4.5rem)]">
                                {faqs.hero.title}
                            </h1>
                            <p className="text-white/70 text-lg md:text-xl max-w-[700px] mx-auto mb-10">
                                {faqs.hero.description}
                            </p>

                            {/* Search Bar */}
                            <div className="max-w-xl mx-auto relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/50">search</span>
                                <input
                                    type="text"
                                    placeholder={faqs.searchPlaceholder}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl py-4 pl-12 pr-6 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                />
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* FAQ Content */}
                <section className="py-20 -mt-32 md:-mt-48 relative z-20">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="max-w-4xl mx-auto">
                            <div className="grid grid-cols-1 gap-12">
                                {filteredCategories.map((category, catIndex) => (
                                    <motion.div
                                        key={catIndex}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                                    >
                                        <h2 className={`text-2xl font-black mb-8 flex items-center gap-3 ${catIndex === 0 ? 'text-white' : 'text-[#172136] dark:text-white'}`}>
                                            <span className="w-1.5 h-8 bg-primary rounded-full"></span>
                                            {category.title}
                                        </h2>
                                        <div className="space-y-4">
                                            {category.questions.map((faq, index) => {
                                                const itemKey = `${catIndex}-${index}`;
                                                const isOpen = openIndex === itemKey;

                                                return (
                                                    <div
                                                        key={index}
                                                        className={`bg-white dark:bg-[#18181b] rounded-2xl border transition-all duration-300 ${isOpen ? 'border-primary shadow-xl' : 'border-[#e5e7eb] dark:border-[#27272a] shadow-lg'}`}
                                                    >
                                                        <button
                                                            onClick={() => setOpenIndex(isOpen ? null : itemKey)}
                                                            className="w-full p-6 md:p-8 text-left flex items-center justify-between gap-4"
                                                            aria-expanded={isOpen}
                                                            aria-controls={`faq-content-${itemKey}`}
                                                            id={`faq-header-${itemKey}`}
                                                        >
                                                            <h3 className="font-bold text-lg text-[#111318] dark:text-white">
                                                                {faq.q}
                                                            </h3>
                                                            <span className={`material-symbols-outlined transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : 'text-[#616f89]'}`}>
                                                                expand_more
                                                            </span>
                                                        </button>
                                                        <AnimatePresence>
                                                            {isOpen && (
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: "auto", opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    transition={{ duration: 0.3 }}
                                                                    className="overflow-hidden"
                                                                    id={`faq-content-${itemKey}`}
                                                                    role="region"
                                                                    aria-labelledby={`faq-header-${itemKey}`}
                                                                >
                                                                    <div className="px-6 md:px-8 pb-8 pt-0 border-t border-[#f0f2f5] dark:border-[#27272a] mt-2">
                                                                        <p className="text-[#616f89] dark:text-gray-400 leading-relaxed text-base pt-6">
                                                                            {faq.a}
                                                                        </p>
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                ))}

                                {filteredCategories.length === 0 && (
                                    <div className="text-center py-20 bg-white dark:bg-[#18181b] rounded-[2.5rem] border border-[#e5e7eb] dark:border-[#27272a]">
                                        <span className="material-symbols-outlined text-6xl text-[#616f89] mb-4">search_off</span>
                                        <p className="text-[#616f89] dark:text-gray-400 text-lg">No results found for "{searchQuery}"</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Still Have Questions? */}
                <section className="py-24 bg-[#111114] dark:bg-gradient-to-b dark:from-[#111318] dark:to-[#09090b] text-white">
                    <div className="container mx-auto px-4 md:px-6 text-center">
                        <div className="max-w-2xl mx-auto">
                            <h2 className="font-black text-white mb-4">{faqs.stillQuestions.title}</h2>
                            <p className="text-white/70 mb-10 text-lg">
                                {faqs.stillQuestions.description}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href={language === 'tr' ? '/tr/iletisim' : '/contact'}
                                    className="px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                                >
                                    {faqs.stillQuestions.contactBtn}
                                </a>
                                <a
                                    href="https://wa.me/905488588394"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-4 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-all shadow-lg shadow-green-500/20 flex items-center justify-center gap-2"
                                >
                                    {faqs.stillQuestions.whatsappBtn}
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
