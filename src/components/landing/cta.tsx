"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/components/providers/language-provider";

export function CTA() {
    const { t, language } = useLanguage();

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

                    <div className="flex flex-col gap-8 flex-1 relative z-10 text-center lg:text-left items-center lg:items-start">
                        <div className="flex items-center gap-2 group transition-all">
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <span key={s} className="material-symbols-outlined text-[#ffc107] group-hover:scale-125 transition-transform" style={{ transitionDelay: `${s * 50}ms`, fontVariationSettings: "'FILL' 1" }}>star</span>
                                ))}
                            </div>
                            <span className="font-bold text-lg ml-2">{t.landing.cta.rating}</span>
                        </div>

                        <h2 className="leading-[1.1] tracking-tight text-white mb-2">
                            {t.landing.cta.title}
                        </h2>
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="w-24 h-1.5 bg-white rounded-full opacity-40"
                        ></motion.div>

                        <p className="text-lg md:text-xl text-white/80 max-w-[480px] leading-relaxed">
                            {t.landing.cta.description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full sm:w-auto">
                            <Link href={language === 'tr' ? '/tr/giris' : '/login'} className="w-full sm:w-auto">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full h-14 px-10 bg-white text-primary rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl transition-all"
                                >
                                    {t.landing.cta.startBtn}
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

                    <div className="flex-1 w-full max-w-[500px] relative z-20">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-white/10 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-12 border border-white/30 shadow-2xl relative lg:-my-24 lg:translate-x-4"
                        >
                            {/* Quote Icon */}
                            <div className="absolute -top-6 -left-6 size-12 rounded-full bg-white flex items-center justify-center text-primary shadow-lg">
                                <span className="material-symbols-outlined font-black">format_quote</span>
                            </div>

                            <p className="text-xl md:text-2xl font-bold italic mb-8 leading-relaxed">
                                "{t.landing.cta.testimonial}"
                            </p>

                            <div className="flex items-center gap-6 pt-4 border-t border-white/10">
                                <div
                                    className="size-16 rounded-3xl bg-cover bg-center shadow-lg border-2 border-white/20"
                                    style={{ backgroundImage: 'url("/images/avatars/testimonial-author.webp")' }}
                                ></div>
                                <div className="text-left">
                                    <p className="font-black text-xl">{t.landing.cta.author}</p>
                                    <p className="text-white/60 font-medium tracking-wide uppercase text-xs mt-1">{t.landing.cta.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
