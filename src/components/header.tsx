"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/language-provider";
import { motion } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";
import { useSession } from "next-auth/react";

export function Header({ forceSolid = false, fullWidth = false }: { forceSolid?: boolean; fullWidth?: boolean }) {
    const { language, setLanguage, t } = useLanguage();
    const { data: session } = useSession();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isAtTop, setIsAtTop] = useState(!forceSolid);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isLoggedIn = !!session;
    const isAdmin = session?.user?.role === "ADMIN";
    const panelUrl = language === 'tr' ? '/tr/panel' : '/dashboard';
    const newOrderUrl = language === 'tr' ? '/tr/siparisler/new' : '/orders/new';
    const loginUrl = language === 'tr' ? '/tr/giris' : '/login';
    const registerUrl = language === 'tr' ? '/tr/kayit' : '/register';

    useEffect(() => {
        if (forceSolid) {
            setIsAtTop(false);
            return;
        }
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Track if we are at the very top
            setIsAtTop(currentScrollY < 20);

            // Threshold to prevent flickering on small scrolls
            const scrollDistance = Math.abs(currentScrollY - lastScrollY);
            if (scrollDistance < 10 && currentScrollY > 100) return;

            // Show header if:
            // 1. At the top of the page (scrollY < 100)
            // 2. Scrolling up (currentScrollY < lastScrollY)
            if (currentScrollY < 100) {
                setIsVisible(true);
            } else if (currentScrollY < lastScrollY) {
                // Scrolling up
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down and past threshold
                setIsVisible(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 whitespace-nowrap border-b border-solid transition-all duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'} ${isAtTop
                ? 'bg-transparent border-transparent py-5'
                : 'bg-white/80 backdrop-blur-md border-b-[#e5e7eb] py-3 shadow-sm dark:bg-[#18212f]/80 dark:border-b-[#2a3441]'
                }`}
        >
            <div className={`${fullWidth ? 'w-full px-4 md:px-8 xl:px-12' : 'container mx-auto px-4 md:px-6'} flex items-center justify-between`}>
                <div className={`flex items-center gap-4 transition-colors duration-300 ${isAtTop ? 'text-primary dark:text-white' : 'text-primary dark:text-white'}`}>
                    <Link href={language === 'tr' ? '/tr' : '/'} className="flex items-center gap-4">
                        <div className={`size-6 transition-colors duration-300 ${isAtTop ? 'text-primary dark:text-white' : 'text-primary'}`}>
                            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"></path>
                            </svg>
                        </div>
                        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">Approval Stitch</h2>
                    </Link>
                </div>
                <div className="flex flex-1 justify-end gap-3 md:gap-8 items-center">
                    <div className="hidden lg:flex items-center gap-1 xl:gap-2">
                        <Link className={`px-4 py-2 rounded-lg text-sm font-bold leading-normal transition-all duration-300 ${isAtTop ? 'text-primary dark:text-white hover:bg-blue-50 dark:hover:bg-white/10' : 'text-primary dark:text-white hover:bg-blue-50 dark:hover:bg-white/10'}`} href={language === 'tr' ? '/tr' : '/'}>{t.header.home}</Link>
                        <Link className={`px-4 py-2 rounded-lg text-sm font-bold leading-normal transition-all duration-300 ${isAtTop ? 'text-primary dark:text-white hover:bg-blue-50 dark:hover:bg-white/10' : 'text-primary dark:text-white hover:bg-blue-50 dark:hover:bg-white/10'}`} href={language === 'tr' ? '/tr/hakkimizda' : '/about'}>{language === 'tr' ? 'Hakkımızda' : 'About'}</Link>
                        <Link className={`px-4 py-2 rounded-lg text-sm font-bold leading-normal transition-all duration-300 ${isAtTop ? 'text-primary dark:text-white hover:bg-blue-50 dark:hover:bg-white/10' : 'text-primary dark:text-white hover:bg-blue-50 dark:hover:bg-white/10'}`} href={language === 'tr' ? '/tr/fiyatlandirma' : '/pricing'}>{t.header.pricing}</Link>
                        <Link className={`px-4 py-2 rounded-lg text-sm font-bold leading-normal transition-all duration-300 ${isAtTop ? 'text-primary dark:text-white hover:bg-blue-50 dark:hover:bg-white/10' : 'text-primary dark:text-white hover:bg-blue-50 dark:hover:bg-white/10'}`} href={language === 'tr' ? '/tr/iletisim' : '/contact'}>{t.header.contact}</Link>
                    </div>

                    <div className="flex gap-2 items-center">
                        <Link href={isLoggedIn ? panelUrl : loginUrl} className="hidden sm:inline-block">
                            <button className={`h-10 px-4 rounded-lg text-sm font-bold transition-all duration-300 ${isAtTop ? 'text-primary dark:text-white hover:bg-blue-50 dark:hover:bg-white/10' : 'text-primary dark:text-white hover:bg-blue-50 dark:hover:bg-white/10'}`}>
                                {isLoggedIn ? t.header.panel : t.header.signIn}
                            </button>
                        </Link>

                        {!isAdmin && (
                            <Link href={isLoggedIn ? newOrderUrl : registerUrl} className="hidden sm:inline-block">
                                <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary-dark transition-colors shadow-md transition-all duration-300">
                                    <span className="truncate">{t.header.startOrder}</span>
                                </button>
                            </Link>
                        )}

                        <button
                            onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
                            className={`relative flex items-center w-[64px] h-8 rounded-full p-1 transition-all duration-300 focus:outline-none ${isAtTop
                                ? "bg-blue-50 hover:bg-white/20 dark:bg-white/10 dark:hover:bg-white/20 border border-blue-100 dark:border-white/20 backdrop-blur-sm"
                                : "bg-blue-50 dark:bg-zinc-800 border border-blue-100 dark:border dark:border-white/10"
                                }`}
                            aria-label="Toggle language"
                        >
                            {/* The sliding background */}
                            <motion.div
                                className="absolute left-1 h-6 w-7 rounded-full z-0 bg-white"
                                initial={false}
                                animate={{
                                    x: language === 'tr' ? 28 : 0,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 30,
                                }}
                            />

                            {/* Labels container */}
                            <div className="relative z-10 grid grid-cols-2 w-full h-full items-center">
                                <div className="flex items-center justify-center h-full">
                                    <span className={`text-[10px] font-black transition-colors duration-300 ${language === 'en' ? 'text-primary' : 'text-zinc-500 dark:text-white/50'}`}>EN</span>
                                </div>
                                <div className="flex items-center justify-center h-full">
                                    <span className={`text-[10px] font-black transition-colors duration-300 translate-x-[1px] ${language === 'tr' ? 'text-primary' : 'text-zinc-500 dark:text-white/50'}`}>TR</span>
                                </div>
                            </div>
                        </button>

                        <ThemeToggle isAtTop={isAtTop} />

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className={`lg:hidden flex items-center justify-center size-10 rounded-lg transition-colors ${isAtTop
                                ? 'text-primary dark:text-white hover:bg-blue-50 dark:hover:bg-white/10'
                                : 'text-[#111318] dark:text-white hover:bg-blue-50 dark:hover:bg-[#2a3441]'
                                }`}
                            aria-label="Open menu"
                        >
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dialog */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setMobileMenuOpen(false)}
                    />

                    {/* Menu Panel */}
                    <div className="absolute top-0 right-0 h-screen w-[85vw] max-w-[400px] bg-white dark:bg-[#18212f] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                        {/* Logo and Close Button */}
                        <div className="flex items-center justify-between p-6 border-b border-[#e5e7eb] dark:border-[#2a3441]">
                            <div className="flex items-center gap-3">
                                <div className="size-7 text-primary">
                                    <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"></path>
                                    </svg>
                                </div>
                                <span className="font-black text-lg text-[#111318] dark:text-white">Approval Stitch</span>
                            </div>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="size-10 flex items-center justify-center rounded-lg hover:bg-[#f0f2f4] dark:hover:bg-[#2a3441] transition-colors"
                                aria-label="Close menu"
                            >
                                <span className="material-symbols-outlined text-[#111318] dark:text-white">close</span>
                            </button>
                        </div>

                        {/* Navigation Links - Centered */}
                        <nav className="flex-1 flex items-center justify-center px-6">
                            <div className="flex flex-col gap-1 w-full">
                                <Link
                                    href={language === 'tr' ? '/tr' : '/'}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="px-6 py-3 text-center text-[#111318] dark:text-white hover:bg-[#f0f2f4] dark:hover:bg-[#2a3441] rounded-xl transition-colors font-bold text-base"
                                >
                                    {t.header.home}
                                </Link>
                                <Link
                                    href={language === 'tr' ? '/tr/hakkimizda' : '/about'}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="px-6 py-3 text-center text-[#111318] dark:text-white hover:bg-[#f0f2f4] dark:hover:bg-[#2a3441] rounded-xl transition-colors font-bold text-base"
                                >
                                    {language === 'tr' ? 'Hakkımızda' : 'About'}
                                </Link>

                                <Link
                                    href={language === 'tr' ? '/tr/fiyatlandirma' : '/pricing'}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="px-6 py-3 text-center text-[#111318] dark:text-white hover:bg-[#f0f2f4] dark:hover:bg-[#2a3441] rounded-xl transition-colors font-bold text-base"
                                >
                                    {t.header.pricing}
                                </Link>
                                <Link
                                    href={language === 'tr' ? '/tr/iletisim' : '/contact'}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="px-6 py-3 text-center text-[#111318] dark:text-white hover:bg-[#f0f2f4] dark:hover:bg-[#2a3441] rounded-xl transition-colors font-bold text-base"
                                >
                                    {t.header.contact}
                                </Link>

                                <div className="my-2 border-t border-[#e5e7eb] dark:border-[#2a3441]" />

                                <Link
                                    href={isLoggedIn ? panelUrl : loginUrl}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="px-4 py-2 text-center text-[#111318] dark:text-white hover:bg-[#f0f2f4] dark:hover:bg-[#2a3441] rounded-lg transition-colors font-bold text-sm"
                                >
                                    {isLoggedIn ? t.header.panel : t.header.signIn}
                                </Link>
                                {!isAdmin && (
                                    <Link
                                        href={isLoggedIn ? newOrderUrl : registerUrl}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="px-4 py-2 bg-primary text-white hover:bg-primary-dark rounded-lg transition-colors font-bold text-center text-sm shadow-lg"
                                    >
                                        {t.header.startOrder}
                                    </Link>
                                )}
                            </div>
                        </nav>

                        {/* Copyright - Bottom */}
                        <div className="pb-[3vh] px-6 text-center border-t border-[#e5e7eb] dark:border-[#2a3441] pt-6">
                            <p className="text-xs text-[#616f89] dark:text-gray-500">
                                © {new Date().getFullYear()} Approval Stitch. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
