"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PricingPage() {
    const { language } = useLanguage();

    const pricingPlans = [
        {
            name: "Approval Sample",
            price: "$25",
            description: "First test or quick check",
            features: [
                "You send existing DST",
                "Stitched as provided",
                "Approval card delivered",
            ],
            notIncluded: [
                "No DST editing",
                "No approval responsibility",
            ],
            bestFor: "First test or quick check",
            highlighted: false,
            cta: "Start Order",
        },
        {
            name: "Fix Your DST + Approval Sample",
            price: "$35",
            priceNote: "+$10 upgrade if $25 already paid",
            description: "Approval focused or picky customers",
            features: [
                "You send existing DST",
                "DST edited if approval requires changes",
                "Re-stitched after editing",
                "Updated approval card delivered",
            ],
            keyLogic: "You pay for responsibility, not attempts. Editing and re-stitch treated as one solution.",
            bestFor: "Approval focused or picky customers",
            highlighted: true,
            popular: true,
            cta: "Start Order",
        },
        {
            name: "Full Digitizing + Approval Sample",
            price: "$60",
            description: "No DST or clean start",
            features: [
                "You send artwork (AI / PDF / PNG / JPG)",
                "New DST digitized from scratch",
                "Approval sample stitched",
                "Approval card delivered",
            ],
            bestFor: "No DST or clean start",
            highlighted: false,
            cta: "Start Order",
        },
    ];

    const faqs = [
        {
            q: "What file formats do you accept?",
            a: "For Approval Sample and Fix Your DST, we need your existing DST file. For Full Digitizing, we accept AI, PDF, PNG, JPG and other common image formats."
        },
        {
            q: "What is an 'Approval Card'?",
            a: "We run your design on an actual Tajima embroidery machine and send you a high-resolution scan with measurements, color codes, and stitch details so you can approve it before mass production."
        },
        {
            q: "Can I upgrade from $25 to $35 package?",
            a: "Yes! If you started with Approval Sample ($25) and need edits, you can upgrade to the Fix Your DST package for just $10 more."
        },
        {
            q: "How long does it take?",
            a: "Standard orders are completed within 24-48 hours. Rush orders can be arranged, contact us for expedited turnaround."
        },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#f8fafc] dark:bg-[#09090b] font-[family-name:var(--font-inter)]">
            <Header />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative pt-32 pb-48 md:pt-40 md:pb-64 overflow-hidden bg-[#172136]">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#145BEC]/20 blur-[120px] rounded-full"
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
                                <span className="text-white/90 text-sm font-bold uppercase tracking-wider">Transparent Pricing</span>
                            </div>

                            <h1 className="text-white font-black leading-[1.1] mb-6 text-[clamp(2rem,4vw,3.5rem)]">
                                Simple, Honest Pricing
                            </h1>
                            <p className="text-white/70 text-lg md:text-xl max-w-[600px] mx-auto">
                                No hidden fees. No surprises. Choose the package that fits your needs.
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
                                        ? 'bg-gradient-to-br from-[#145BEC] to-[#0d47c9] text-white shadow-2xl shadow-blue-500/20 scale-105 z-10 -mt-8'
                                        : 'bg-white dark:bg-[#18181b] border border-[#e5e7eb] dark:border-[#27272a] shadow-xl'
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
                                                Not Included:
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
                                            <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${plan.highlighted ? 'text-white/80' : 'text-[#145BEC]'}`}>
                                                Key Logic:
                                            </p>
                                            <p className={`text-xs ${plan.highlighted ? 'text-white/80' : 'text-[#616f89] dark:text-gray-400'}`}>
                                                {plan.keyLogic}
                                            </p>
                                        </div>
                                    )}

                                    {/* Best For */}
                                    <div className={`mb-6 text-center py-3 rounded-xl ${plan.highlighted ? 'bg-white/10' : 'bg-[#f4f6fa] dark:bg-[#0a0a0a]'}`}>
                                        <p className={`text-xs ${plan.highlighted ? 'text-white/60' : 'text-[#616f89] dark:text-gray-500'}`}>Best for:</p>
                                        <p className={`text-sm font-bold ${plan.highlighted ? 'text-white' : 'text-[#111318] dark:text-white'}`}>{plan.bestFor}</p>
                                    </div>

                                    <Link href={language === 'tr' ? '/tr/login' : '/login'} className="block mt-auto">
                                        <button className={`w-full py-3 rounded-xl font-bold transition-all ${plan.highlighted
                                            ? 'bg-white text-[#145BEC] hover:bg-gray-100 shadow-lg'
                                            : 'bg-[#145BEC] text-white hover:bg-blue-600 shadow-lg shadow-blue-500/20'
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
                <section className="py-20 bg-[#eef2ff] dark:bg-[#0a0a0a]">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16">
                            <h2 className="font-black text-[#111318] dark:text-white mb-4">
                                Frequently Asked Questions
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
                                    className="bg-white dark:bg-[#18181b] rounded-2xl p-6 border border-[#e5e7eb] dark:border-[#27272a]"
                                >
                                    <h4 className="font-bold text-[#111318] dark:text-white mb-2 flex items-center gap-3">
                                        <span className="w-8 h-8 rounded-full bg-[#145BEC]/10 flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-[#145BEC]" style={{ fontSize: '18px' }}>help</span>
                                        </span>
                                        {faq.q}
                                    </h4>
                                    <p className="text-[#616f89] dark:text-gray-400 pl-11">{faq.a}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-[#172136]">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#145BEC] to-[#0d47c9] p-12 md:p-16 text-center">
                            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/10 rounded-full blur-3xl" />

                            <div className="relative z-10">
                                <h2 className="font-black text-white mb-4">Need a Custom Quote?</h2>
                                <p className="text-xl text-white/80 mb-8 max-w-[500px] mx-auto">
                                    Have a unique project or bulk orders? Contact us for personalized pricing.
                                </p>
                                <Link href={language === 'tr' ? '/tr/contact' : '/contact'}>
                                    <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[#145BEC] font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl">
                                        <span className="material-symbols-outlined">mail</span>
                                        Contact Us
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
