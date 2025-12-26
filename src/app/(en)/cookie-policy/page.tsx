"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";

export default function CookiePolicyPage() {
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
                                <span className="material-symbols-outlined text-white" style={{ fontSize: '20px' }}>cookie</span>
                                <span className="text-white/90 text-sm font-bold uppercase tracking-wider">Privacy Matters</span>
                            </div>

                            <h1 className="text-white font-black leading-[1.1] mb-6 text-[clamp(2.5rem,5vw,4.5rem)]">
                                Cookie Policy
                            </h1>
                            <p className="text-white/70 text-lg md:text-xl max-w-[700px] mx-auto">
                                Transparency about how we use cookies to provide a secure and efficient service.
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
                                <p className="text-sm mb-8 italic">Last Updated: December 26, 2025</p>

                                <p className="mb-6 leading-relaxed">
                                    At <strong>Approval Stitch</strong> ("we", "us", or "approvalstitch.com"), we value the privacy of our visitors ("you" or "User"). This Cookie Policy explains how we use cookies and similar tracking technologies when you visit our website, why we use them, and your rights to control our use of them.
                                </p>

                                <p className="mb-8 leading-relaxed">
                                    As we serve customers globally, this policy is designed to comply with the <strong>General Data Protection Regulation (GDPR)</strong> for our European users and the <strong>California Consumer Privacy Act (CCPA)</strong> for our US users.
                                </p>

                                <h2 className="text-2xl font-black text-foreground mt-12 mb-6">1. What Are Cookies?</h2>
                                <p className="mb-8 leading-relaxed">
                                    Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, as well as to provide reporting information to the site owners and remember your preferences (like login status or language).
                                </p>

                                <h2 className="text-2xl font-black text-foreground mt-12 mb-6">2. Types of Cookies We Use</h2>
                                <p className="mb-6">We use the following categories of cookies on Approval Stitch:</p>
                                <ul className="space-y-6 mb-12">
                                    <li className="p-6 bg-[#f4f6fa] dark:bg-[#0a0a0a] rounded-xl border-l-4 border-blue-500">
                                        <strong>Strictly Necessary Cookies:</strong> Essential for the website to function (e.g., shopping cart, secure login). These cannot be switched off.
                                    </li>
                                    <li className="p-6 bg-[#f4f6fa] dark:bg-[#0a0a0a] rounded-xl border-l-4 border-indigo-500">
                                        <strong>Performance & Analytics Cookies:</strong> Allow us to count visits and traffic sources so we can measure and improve the performance of our site (e.g., Google Analytics).
                                    </li>
                                    <li className="p-6 bg-[#f4f6fa] dark:bg-[#0a0a0a] rounded-xl border-l-4 border-cyan-500">
                                        <strong>Functional Cookies:</strong> Enable the website to provide enhanced functionality and personalization (e.g., remembering your region or live chat support).
                                    </li>
                                    <li className="p-6 bg-[#f4f6fa] dark:bg-[#0a0a0a] rounded-xl border-l-4 border-purple-500">
                                        <strong>Targeting & Advertising Cookies:</strong> May be set through our site by our advertising partners to build a profile of your interests and show you relevant ads on other sites.
                                    </li>
                                </ul>

                                <h2 className="text-2xl font-black text-foreground mt-12 mb-6">3. Your Rights (GDPR & CCPA)</h2>

                                <h3 className="text-xl font-bold text-foreground mt-8 mb-4">For Users in the EEA & UK (GDPR)</h3>
                                <p className="mb-6 leading-relaxed">
                                    Unless they are strictly necessary, we will not set cookies on your device without your explicit consent. You can manage your preferences via our "Cookie Banner" upon your first visit or change them at any time via the settings on our site.
                                </p>

                                <h3 className="text-xl font-bold text-foreground mt-8 mb-4">For Users in the USA (CCPA/CPRA)</h3>
                                <p className="mb-8 leading-relaxed">
                                    Residents of California have the right to opt-out of the "sale" or "sharing" of their personal information. You can manage your preferences regarding targeting cookies through our cookie settings or your browser controls.
                                </p>

                                <h2 className="text-2xl font-black text-foreground mt-12 mb-6">4. How to Manage Cookies</h2>
                                <p className="mb-6 leading-relaxed">
                                    You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, though your access to some functionality and areas of our website may be restricted.
                                </p>

                                <p className="mb-6 font-bold">Below are links to the support pages for the most popular web browsers:</p>

                                <ul className="list-disc pl-6 space-y-4 mb-8">
                                    <li>
                                        <strong>Google Chrome:</strong> <br />
                                        <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Clear, enable, and manage cookies in Chrome</a>
                                    </li>
                                    <li>
                                        <strong>Mozilla Firefox:</strong> <br />
                                        <a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Enhanced Tracking Protection in Firefox</a>
                                    </li>
                                    <li>
                                        <strong>Apple Safari:</strong> <br />
                                        <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Manage cookies and website data in Safari</a>
                                    </li>
                                    <li>
                                        <strong>Microsoft Edge:</strong> <br />
                                        <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Delete cookies in Microsoft Edge</a>
                                    </li>
                                    <li>
                                        <strong>Opera:</strong> <br />
                                        <a href="https://help.opera.com/en/latest/web-preferences/#cookies" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Web preferences - Opera Help</a>
                                    </li>
                                </ul>

                                <h2 className="text-2xl font-black text-foreground mt-12 mb-6">5. Third-Party Services</h2>
                                <p className="mb-12 leading-relaxed">
                                    We may use trusted third-party services (such as payment processors like Stripe/PayPal or analytics tools like Google Analytics). These third parties may also set cookies on your device. We recommend reading their privacy policies for more information.
                                </p>

                                <div className="mt-16 text-center">
                                    <button
                                        onClick={() => {
                                            localStorage.removeItem("cookie-consent");
                                            window.location.reload();
                                        }}
                                        className="px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                                    >
                                        Update Cookie Settings
                                    </button>
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
