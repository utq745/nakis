"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/language-provider";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
    const { language, setLanguage, t } = useLanguage();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

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
            className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e5e7eb] bg-white px-4 lg:px-10 py-3 shadow-sm dark:bg-[#18212f] dark:border-b-[#2a3441] transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
                }`}
        >
            <div className="flex items-center gap-4 text-[#111318] dark:text-white">
                <Link href="/" className="flex items-center gap-4">
                    <div className="size-6 text-[#135bec]">
                        <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"></path>
                        </svg>
                    </div>
                    <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">Approval Stitch</h2>
                </Link>
            </div>
            <div className="flex flex-1 justify-end gap-3 md:gap-8 items-center">
                <div className="hidden lg:flex items-center gap-6 xl:gap-9">
                    <Link className="text-[#111318] dark:text-white text-sm font-medium leading-normal hover:text-[#135bec] transition-colors" href={language === 'tr' ? '/tr' : '/'}>{t.header.home}</Link>
                    <Link className="text-[#111318] dark:text-white text-sm font-medium leading-normal hover:text-[#135bec] transition-colors" href={language === 'tr' ? '/tr#services' : '/#services'}>{t.header.services}</Link>
                    <Link className="text-[#111318] dark:text-white text-sm font-medium leading-normal hover:text-[#135bec] transition-colors" href={language === 'tr' ? '/tr#portfolio' : '/#portfolio'}>{t.header.portfolio}</Link>
                    <Link className="text-[#111318] dark:text-white text-sm font-medium leading-normal hover:text-[#135bec] transition-colors" href={language === 'tr' ? '/tr#pricing' : '/#pricing'}>{t.header.pricing}</Link>
                    <Link className="text-[#111318] dark:text-white text-sm font-medium leading-normal hover:text-[#135bec] transition-colors" href={language === 'tr' ? '/tr#about' : '/#about'}>{t.header.about}</Link>
                    <Link className="text-[#111318] dark:text-white text-sm font-medium leading-normal hover:text-[#135bec] transition-colors" href={language === 'tr' ? '/tr/contact' : '/contact'}>{t.header.contact}</Link>
                </div>

                <div className="flex gap-2 items-center">
                    <Link href={language === 'tr' ? '/tr/login' : '/login'} className="hidden sm:inline-block">
                        <button className="h-10 px-4 text-[#111318] dark:text-white text-sm font-bold hover:text-[#135bec] transition-colors">
                            {t.header.signIn}
                        </button>
                    </Link>

                    <Link href={language === 'tr' ? '/tr/login' : '/login'} className="hidden sm:inline-block">
                        <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#135bec] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-blue-700 transition-colors shadow-md">
                            <span className="truncate">{t.header.startOrder}</span>
                        </button>
                    </Link>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#f0f2f4] text-[#111318] hover:bg-[#e2e4e8] dark:bg-[#2a3441] dark:text-white dark:hover:bg-[#374151] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-3 transition-colors">
                                <span className="material-symbols-outlined text-[20px]">language</span>
                                <span className="text-sm font-medium hidden sm:inline-block">
                                    {language === 'tr' ? 'TR' : 'EN'}
                                </span>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white dark:bg-[#2a3441] border-[#e5e7eb] dark:border-[#374151]">
                            <DropdownMenuItem onClick={() => setLanguage("en")} className="cursor-pointer">🇺🇸 English</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setLanguage("tr")} className="cursor-pointer">🇹🇷 Türkçe</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
