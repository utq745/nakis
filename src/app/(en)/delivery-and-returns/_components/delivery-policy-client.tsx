"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";

export function DeliveryPolicyClient() {
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
                                <span className="material-symbols-outlined text-white" style={{ fontSize: '20px' }}>local_shipping</span>
                                <span className="text-white/90 text-sm font-bold uppercase tracking-wider">Delivery & Returns</span>
                            </div>

                            <h1 className="text-white font-black leading-[1.1] mb-6 text-[clamp(2.5rem,5vw,4.5rem)]">
                                Delivery and Returns Policy
                            </h1>
                            <p className="text-white/70 text-lg md:text-xl max-w-[700px] mx-auto">
                                Detailed information about the delivery processes and return policies of our digital services.
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
                                <p className="text-sm mb-8 italic">Last Updated: February 4, 2026</p>

                                <h2 className="text-2xl font-black text-foreground mt-12 mb-6">1. PARTIES</h2>
                                <p className="mb-6 leading-relaxed">
                                    This agreement is concluded between <strong>Yavuz Sakkaoğlu</strong> (hereinafter referred to as the "Service Provider") on one side, and the user receiving services through the website (hereinafter referred to as the "Customer") on the other, to determine the procedures and principles regarding the sale and delivery of digital services.
                                </p>

                                <h2 className="text-2xl font-black text-foreground mt-12 mb-6">2. NATURE OF THE SERVICE</h2>
                                <p className="mb-6 leading-relaxed">
                                    The Service Provider offers "Embroidery Design Digitizing and Technical Verification" services for the textile and embroidery industry. This service involves converting visual designs provided by the Customer into digital data formats that embroidery machines can process.
                                </p>

                                <h2 className="text-2xl font-black text-foreground mt-12 mb-6">3. DELIVERY CONDITIONS</h2>
                                <ul className="list-disc pl-6 space-y-4 mb-8">
                                    <li>The service is provided digitally. There is no physical product shipment (cargo, etc.).</li>
                                    <li>The prepared digital files are made available through the Customer’s user panel on the website, accessible with their registered email address and password.</li>
                                    <li>Delivery is considered complete once the files are uploaded to the system and made accessible.</li>
                                </ul>

                                <h2 className="text-2xl font-black text-foreground mt-12 mb-6">4. RIGHT OF WITHDRAWAL AND CANCELLATION CONDITIONS</h2>
                                <ul className="list-disc pl-6 space-y-4 mb-8">
                                    <li><strong>Exception to the Right of Withdrawal:</strong> Pursuant to Article 15/ğ of the Regulation on Distance Contracts and Law No. 6502 on Consumer Protection; the consumer cannot exercise the right of withdrawal in <em>"contracts regarding services performed instantly in electronic environment or intangible goods delivered instantly to the consumer."</em></li>
                                    <li>Since this service constitutes content performed instantly and delivered digitally upon the Customer’s approval, there is <strong>no right of withdrawal</strong> once payment is made and the file is made accessible.</li>
                                    <li>For one-time tasks, once the digitizing work has commenced, cancellation is not possible.</li>
                                </ul>

                                <h2 className="text-2xl font-black text-foreground mt-12 mb-6">5. RETURN CONDITIONS</h2>
                                <p className="mb-6 leading-relaxed">
                                    According to the workflow, the digital file is prepared by the Service Provider and then payment information is sent to the Customer. Upon completion of the payment process, the digital file becomes accessible in the Customer panel. Due to the reproducible and instantly consumable nature of digital content, <strong>returns are not possible once the file has been made accessible.</strong>
                                </p>

                                <h2 className="text-2xl font-black text-foreground mt-12 mb-6">6. TECHNICAL ERRORS AND CORRECTIONS</h2>
                                <p className="mb-6 leading-relaxed">
                                    In the event of a technical error originating from the Service Provider or a reading problem on the embroidery machine in the delivered file, necessary technical corrections will be made free of charge upon notification by the Customer. Design modification requests that deviate from the initially provided visual are considered new service requests.
                                </p>

                                <div className="mt-12 p-8 bg-primary/5 dark:bg-primary/10 rounded-2xl border border-primary/20">
                                    <h3 className="text-xl font-bold text-foreground mb-4">7. CONTACT AND COMPANY INFORMATION</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                                        <div>
                                            <p className="text-muted-foreground mb-1">Title</p>
                                            <p className="font-bold text-foreground">Yavuz Sakkaoğlu</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground mb-1">Address</p>
                                            <p className="font-bold text-foreground">Ahmet Nafiz Gürman Mah. Kınalıtepe Sok. No:10 34173 Güngören/İstanbul</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground mb-1">Phone</p>
                                            <p className="font-bold text-foreground">+90 532 266 83 94</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground mb-1">Email</p>
                                            <p className="font-bold text-foreground">info@approvalstitch.com</p>
                                        </div>
                                    </div>
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
