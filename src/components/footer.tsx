"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/language-provider";

export function Footer() {
    const { t, language } = useLanguage();

    return (
        <footer className="w-full bg-white dark:bg-[#18212f] border-t border-[#f0f2f4] dark:border-[#2a3441] py-12 px-10">
            <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between gap-10">
                <div className="flex flex-col gap-4 max-w-sm">
                    <div className="flex items-center gap-2 text-[#111318] dark:text-white">
                        <div className="size-6 text-[#135bec]">
                            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"></path>
                            </svg>
                        </div>
                        <h2 className="text-lg font-bold">Approval Stitch</h2>
                    </div>
                    <p className="text-[#616f89] dark:text-gray-400 text-sm leading-relaxed">
                        {t.footer.desc}
                    </p>
                </div>
                <div className="flex flex-wrap gap-12">
                    <div className="flex flex-col gap-4">
                        <h4 className="text-[#111318] dark:text-white font-bold text-sm uppercase tracking-wider">{t.footer.company}</h4>
                        <div className="flex flex-col gap-2">
                            <Link className="text-[#616f89] dark:text-gray-400 hover:text-[#135bec] dark:hover:text-[#135bec] text-sm" href={language === 'tr' ? '/tr/about' : '/about'}>{language === 'tr' ? 'Hakkımızda' : 'About Us'}</Link>
                            <Link className="text-[#616f89] dark:text-gray-400 hover:text-[#135bec] dark:hover:text-[#135bec] text-sm" href={language === 'tr' ? '/tr' : '/'}>{t.header.portfolio}</Link>
                            <Link className="text-[#616f89] dark:text-gray-400 hover:text-[#135bec] dark:hover:text-[#135bec] text-sm" href={language === 'tr' ? '/tr/pricing' : '/pricing'}>{t.header.pricing}</Link>
                            <Link className="text-[#616f89] dark:text-gray-400 hover:text-[#135bec] dark:hover:text-[#135bec] text-sm" href={language === 'tr' ? '/tr/contact' : '/contact'}>{t.footer.contact}</Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h4 className="text-[#111318] dark:text-white font-bold text-sm uppercase tracking-wider">{t.footer.support}</h4>
                        <div className="flex flex-col gap-2">
                            <Link className="text-[#616f89] dark:text-gray-400 hover:text-[#135bec] dark:hover:text-[#135bec] text-sm" href={language === 'tr' ? '/tr/faqs' : '/faqs'}>{t.footer.faq}</Link>
                            <Link className="text-[#616f89] dark:text-gray-400 hover:text-[#135bec] dark:hover:text-[#135bec] text-sm" href={language === 'tr' ? '/tr/cookie-policy' : '/cookie-policy'}>{language === 'tr' ? 'Çerez Politikası' : 'Cookie Policy'}</Link>
                            <Link className="text-[#616f89] dark:text-gray-400 hover:text-[#135bec] dark:hover:text-[#135bec] text-sm" href={language === 'tr' ? '/tr/privacy-policy' : '/privacy-policy'}>{t.footer.privacy}</Link>
                            <Link className="text-[#616f89] dark:text-gray-400 hover:text-[#135bec] dark:hover:text-[#135bec] text-sm" href={language === 'tr' ? '/tr/mesafeli-satis-sozlesmesi' : '/distance-sales-agreement'}>{language === 'tr' ? 'Mesafeli Satış Sözleşmesi' : 'Distance Sales Agreement'}</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-[1280px] mx-auto mt-12 pt-8 border-t border-[#f0f2f4] dark:border-[#2a3441] flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex flex-col items-center md:items-start gap-1">
                    <p className="text-[#616f89] dark:text-gray-500 text-sm">
                        {t.footer.rights.replace(/\d{4}/, new Date().getFullYear().toString())}
                    </p>
                    <p className="text-[#616f89] dark:text-gray-500 text-xs">
                        Designed & Developed by <a href="https://www.utkusakallioglu.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#135bec] transition-colors">Utku</a>.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <img
                        src="/iyzico_colored.svg"
                        alt={language === 'tr' ? 'iyzico ile öde' : 'Pay with iyzico'}
                        className="h-[32px] w-auto opacity-90 hover:opacity-100 transition-opacity dark:hidden"
                    />
                    <img
                        src="/iyzico_white.svg"
                        alt={language === 'tr' ? 'iyzico ile öde' : 'Pay with iyzico'}
                        className="hidden dark:block h-[32px] w-auto opacity-90 hover:opacity-100 transition-opacity"
                    />
                </div>
            </div>
        </footer>
    );
}
