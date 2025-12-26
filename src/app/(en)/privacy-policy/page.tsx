"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
    const { language } = useLanguage();

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
                                <span className="material-symbols-outlined text-white" style={{ fontSize: '20px' }}>security</span>
                                <span className="text-white/90 text-sm font-bold uppercase tracking-wider">Your Privacy Matters</span>
                            </div>

                            <h1 className="text-white font-black leading-[1.1] mb-6 text-[clamp(2.5rem,5vw,4.5rem)]">
                                Privacy Policy
                            </h1>
                            <p className="text-white/70 text-lg md:text-xl max-w-[700px] mx-auto">
                                How we collect, use, and protect your data at Approval Stitch.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-20 -mt-32 md:-mt-48 relative z-20">
                    <div className="container mx-auto px-4 md:px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="max-w-4xl mx-auto bg-white dark:bg-[#18181b] rounded-[2.5rem] p-8 md:p-16 border border-[#e5e7eb] dark:border-[#27272a] shadow-2xl"
                        >
                            <div className="prose prose-blue dark:prose-invert max-w-none">
                                <p className="text-sm text-[#616f89] dark:text-gray-400 mb-8 italic">Last Updated: October 2023</p>

                                <h2 className="text-2xl font-black text-[#172136] dark:text-white mt-12 mb-6">1. Information We Collect</h2>
                                <p className="text-[#616f89] dark:text-gray-300 mb-6">
                                    We collect information that you provide directly to us when you create an account, upload designs, or communicate with us. This includes:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-[#616f89] dark:text-gray-300 mb-8">
                                    <li>Name and contact information</li>
                                    <li>Embroidery designs and technical specifications</li>
                                    <li>Billing and payment details (processed securely via 3rd party providers)</li>
                                    <li>Company information</li>
                                </ul>

                                <h2 className="text-2xl font-black text-[#172136] dark:text-white mt-12 mb-6">2. How We Use Your Data</h2>
                                <p className="text-[#616f89] dark:text-gray-300 mb-6">
                                    Your data is used solely to provide and improve our services:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-[#616f89] dark:text-gray-300 mb-8">
                                    <li>Processing your digitizing and sample orders</li>
                                    <li>Providing technical support and order updates</li>
                                    <li>Improving our digitizing algorithms and machine pathing</li>
                                    <li>Complying with legal obligations</li>
                                </ul>

                                <h2 className="text-2xl font-black text-[#172136] dark:text-white mt-12 mb-6">3. Design Confidentiality</h2>
                                <p className="text-[#616f89] dark:text-gray-300 mb-8 leading-relaxed">
                                    Under no circumstances do we sell or share your proprietary designs. Your artwork remains your intellectual property. Our internal team only accesses your files to perform the requested digitizing and stitching services.
                                </p>

                                <h2 className="text-2xl font-black text-[#172136] dark:text-white mt-12 mb-6">4. Data Security</h2>
                                <p className="text-[#616f89] dark:text-gray-300 mb-8 leading-relaxed">
                                    We implement industrial-grade security measures to protect your digital designs and personal information. This includes SSL encryption, secure server environments, and restricted access protocols.
                                </p>

                                <h2 className="text-2xl font-black text-[#172136] dark:text-white mt-12 mb-6">5. Your Rights</h2>
                                <p className="text-[#616f89] dark:text-gray-300 mb-8 leading-relaxed">
                                    You have the right to access, correct, or delete your personal data. You can manage most of this directly through your user dashboard, or contact us for assistance.
                                </p>

                                <div className="mt-16 p-8 bg-[#f4f6fa] dark:bg-[#0a0a0a] rounded-2xl border border-[#145BEC]/20">
                                    <h3 className="text-lg font-bold text-[#111318] dark:text-white mb-2 underline">Questions?</h3>
                                    <p className="text-[#616f89] dark:text-gray-400">
                                        If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@approvalstitch.com" className="text-[#145BEC] font-bold">privacy@approvalstitch.com</a>
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
