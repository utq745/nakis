"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";

export default function DistanceSalesAgreement() {
    const { language } = useLanguage();

    return (
        <div className="flex flex-col min-h-screen bg-background font-[family-name:var(--font-inter)]">
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

                    <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
                                <span className="material-symbols-outlined text-white" style={{ fontSize: '20px' }}>gavel</span>
                                <span className="text-white/90 text-sm font-bold uppercase tracking-wider">Legal Terms</span>
                            </div>

                            <h1 className="text-white font-black leading-[1.1] mb-6 text-[clamp(2.5rem,5vw,4.5rem)]">
                                Distance Sales Agreement
                            </h1>
                            <p className="text-white/70 text-lg md:text-xl max-w-[700px] mx-auto">
                                Legal terms and conditions governing your purchases and interactions with Approval Stitch.
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
                            className="max-w-4xl mx-auto bg-card rounded-[2.5rem] p-8 md:p-16 border border-border shadow-2xl"
                        >
                            <div className="prose prose-blue dark:prose-invert max-w-none text-muted-foreground">
                                <p className="text-sm mb-8 italic">Last Updated: December 2025</p>

                                <h2 className="text-2xl font-black text-foreground mt-12 mb-6">1. Parties</h2>
                                <p className="mb-6 leading-relaxed">
                                    This Agreement is entered into electronically between <strong>Approval Stitch</strong> (hereinafter referred to as "SELLER") and the customer who places an order through the platform (hereinafter referred to as "BUYER"), under the terms and conditions set forth below.
                                </p>

                                <h2 className="text-2xl font-black text-foreground mt-12 mb-6">2. Subject of the Agreement</h2>
                                <p className="mb-6 leading-relaxed">
                                    The subject of this agreement is to determine the rights and obligations of the parties in accordance with the Law No. 6502 on the Protection of Consumers and the Regulation on Distance Contracts regarding the sale and delivery of the service specialized for the BUYER through the SELLER's website.
                                </p>

                                <h2 className="text-2xl font-black text-foreground mt-12 mb-6">3. Service Information</h2>
                                <p className="mb-6 leading-relaxed">
                                    The services subject to the agreement include embroidery digitizing, file correction, or stitched approval samples. Details, scope, and price of the service are as specified on the order screen within the package selected by the BUYER.
                                </p>

                                <h2 className="text-2xl font-black text-foreground mt-12 mb-6">4. General Provisions</h2>
                                <ul className="list-disc pl-6 space-y-4 mb-8">
                                    <li>The BUYER declares that they have read and understood the basic characteristics of the service, the sale price, and the payment method on the website and has given the necessary confirmation in the electronic environment.</li>
                                    <li>The service subject to the agreement includes files prepared in the digital environment and high-resolution scans of the stitching results of these files. Physical shipping is not involved unless otherwise stated.</li>
                                    <li>The SELLER is responsible for providing the ordered service in a flawless, complete, and appropriate manner as specified in the order.</li>
                                </ul>

                                <h2 className="text-2xl font-black text-foreground mt-12 mb-6">5. Right of Withdrawal and Exceptions</h2>
                                <p className="mb-6 leading-relaxed">
                                    In accordance with Article 15 of the Distance Contracts Regulation; <strong>"Contracts for goods prepared in line with the consumer's wishes or personal needs"</strong> cannot exercise the right of withdrawal.
                                </p>
                                <div className="p-6 bg-primary/5 dark:bg-primary/10 rounded-xl border-l-4 border-primary mb-8">
                                    <p className="text-sm font-bold text-foreground">Important Notice:</p>
                                    <p className="text-sm">Since the services provided by Approval Stitch are prepared entirely specifically for the designs sent by the BUYER, there is no right of withdrawal or refund after the process has started.</p>
                                </div>

                                <h2 className="text-2xl font-black text-foreground mt-12 mb-6">6. Dispute Resolution</h2>
                                <p className="mb-8 leading-relaxed">
                                    In the implementation of this agreement, Consumer Arbitration Committees up to the value declared by the Ministry of Customs and Trade and Consumer Courts in the place of residence of the SELLER are authorized.
                                </p>

                                <div className="mt-16 text-center border-t border-border pt-12">
                                    <p className="text-sm text-muted-foreground">This agreement comes into effect upon the BUYER's confirmation of "I Have Read and Accept the Agreement" at the payment step.</p>
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
