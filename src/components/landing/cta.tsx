"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/components/providers/language-provider";
import { useSession } from "next-auth/react";

export function CTA() {
    const { t, language } = useLanguage();
    const { data: session } = useSession();

    const isLoggedIn = !!session;
    const isAdmin = session?.user?.role === "ADMIN";
    const panelUrl = language === 'tr' ? '/tr/panel' : '/dashboard';
    const newOrderUrl = language === 'tr' ? '/tr/siparisler/new' : '/orders/new';
    const loginUrl = language === 'tr' ? '/tr/giris' : '/login';

    return (
        <section className="w-full py-24 md:py-32 dark:bg-gradient-to-b dark:from-[#111318] dark:to-[#09090b]">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative flex flex-col lg:flex-row items-center gap-12 rounded-[3rem] bg-primary p-8 md:p-14 lg:p-20 text-white shadow-[0_40px_100px_-20px_rgba(20,91,236,0.3)]"
                >
                    {/* Abstract decor circles - Moved to a dedicated absolute wrapper with overflow-hidden to keep them contained while allowing testimonial box to overflow */}
                    <div className="absolute inset-0 rounded-[3rem] overflow-hidden pointer-events-none">
                        <div className="absolute top-[-20%] right-[-10%] w-[50%] aspect-square rounded-full bg-white/10 blur-[80px]"></div>
                        <div className="absolute bottom-[-20%] left-[-10%] w-[40%] aspect-square rounded-full bg-blue-400/20 blur-[80px]"></div>
                    </div>

                    <div className="flex flex-col gap-8 w-full relative z-10 text-center items-center">
                        <h2 className="leading-[1.1] tracking-tight text-white mb-2 max-w-[800px]">
                            {t.landing.cta.title}
                        </h2>
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="w-24 h-1.5 bg-white rounded-full opacity-40"
                        ></motion.div>

                        <p className="text-lg md:text-xl text-white/80 max-w-[600px] leading-relaxed">
                            {t.landing.cta.description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full sm:w-auto">
                            <Link href={isLoggedIn ? (isAdmin ? panelUrl : newOrderUrl) : loginUrl} className="w-full sm:w-auto">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full h-14 px-10 bg-white text-primary rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl transition-all"
                                >
                                    {isLoggedIn && isAdmin ? t.header.panel : t.landing.cta.startBtn}
                                </motion.button>
                            </Link>
                            <Link href={language === 'tr' ? '/tr/iletisim' : '/contact'} className="w-full sm:w-auto">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full h-14 px-10 bg-white/10 text-white border-2 border-white/20 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all backdrop-blur-md"
                                >
                                    {t.landing.cta.contactBtn}
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
