"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/providers/language-provider";
import Link from "next/link";

export function CookieBanner() {
    const { language } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem("cookie-consent", "declined");
        setIsVisible(false);
    };

    const content = {
        tr: {
            title: "Çerez Kullanımı",
            description: "Size en iyi deneyimi sunmak için çerezleri kullanıyoruz. Sitemizi kullanarak çerez politikamızı kabul etmiş sayılırsınız.",
            accept: "Kabul Et",
            decline: "Reddet",
            settings: "Ayarlar",
            policy: "Politikamız",
            link: "/tr/cerez-politikasi"
        },
        en: {
            title: "Cookie Usage",
            description: "We use cookies to provide the best experience on our website. By continuing to use our site, you agree to our cookie policy.",
            accept: "Accept",
            decline: "Decline",
            settings: "Settings",
            policy: "Our Policy",
            link: "/cookie-policy"
        }
    };

    const t = content[language as keyof typeof content] || content.en;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[100]"
                >
                    <div className="bg-white rounded-[2rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 backdrop-blur-xl">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="size-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-blue-600 text-2xl">cookie</span>
                            </div>
                            <div>
                                <h4 className="text-lg font-black text-[#172136] mb-1">{t.title}</h4>
                                <p className="text-sm text-[#616f89] leading-relaxed">
                                    {t.description}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <button
                                onClick={handleAccept}
                                className="px-6 py-3 bg-[#145BEC] text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                            >
                                {t.accept}
                            </button>
                            <button
                                onClick={handleDecline}
                                className="px-6 py-3 bg-gray-100 text-[#172136] rounded-xl font-bold text-sm hover:bg-gray-200 transition-all active:scale-95"
                            >
                                {t.decline}
                            </button>
                            <Link
                                href={t.link}
                                className="text-xs font-bold text-[#145BEC] hover:underline ml-auto"
                            >
                                {t.policy}
                            </Link>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
