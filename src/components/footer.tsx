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
                        <h4 className="text-[#111318] dark:text-white font-bold text-sm uppercase tracking-wider">{t.footer.services}</h4>
                        <div className="flex flex-col gap-2">
                            <Link className="text-[#616f89] dark:text-gray-400 hover:text-[#135bec] dark:hover:text-[#135bec] text-sm" href="#">{t.footer.logoDigitizing}</Link>
                            <Link className="text-[#616f89] dark:text-gray-400 hover:text-[#135bec] dark:hover:text-[#135bec] text-sm" href="#">{t.footer.vectorArt}</Link>
                            <Link className="text-[#616f89] dark:text-gray-400 hover:text-[#135bec] dark:hover:text-[#135bec] text-sm" href="#">{t.footer.patchDesign}</Link>
                            <Link className="text-[#616f89] dark:text-gray-400 hover:text-[#135bec] dark:hover:text-[#135bec] text-sm" href="#">{t.footer.puff3d}</Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h4 className="text-[#111318] dark:text-white font-bold text-sm uppercase tracking-wider">{t.footer.company}</h4>
                        <div className="flex flex-col gap-2">
                            <Link className="text-[#616f89] dark:text-gray-400 hover:text-[#135bec] dark:hover:text-[#135bec] text-sm" href={language === 'tr' ? '/tr/about' : '/about'}>{t.footer.aboutUs}</Link>
                            <Link className="text-[#616f89] dark:text-gray-400 hover:text-[#135bec] dark:hover:text-[#135bec] text-sm" href="#">{t.header.portfolio}</Link>
                            <Link className="text-[#616f89] dark:text-gray-400 hover:text-[#135bec] dark:hover:text-[#135bec] text-sm" href="#">{t.header.pricing}</Link>
                            <Link className="text-[#616f89] dark:text-gray-400 hover:text-[#135bec] dark:hover:text-[#135bec] text-sm" href={language === 'tr' ? '/tr/contact' : '/contact'}>{t.footer.contact}</Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h4 className="text-[#111318] dark:text-white font-bold text-sm uppercase tracking-wider">{t.footer.support}</h4>
                        <div className="flex flex-col gap-2">
                            <Link className="text-[#616f89] dark:text-gray-400 hover:text-[#135bec] dark:hover:text-[#135bec] text-sm" href="#">{t.footer.faq}</Link>
                            <Link className="text-[#616f89] dark:text-gray-400 hover:text-[#135bec] dark:hover:text-[#135bec] text-sm" href="#">{t.footer.terms}</Link>
                            <Link className="text-[#616f89] dark:text-gray-400 hover:text-[#135bec] dark:hover:text-[#135bec] text-sm" href="#">{t.footer.privacy}</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-[1280px] mx-auto mt-12 pt-8 border-t border-[#f0f2f4] dark:border-[#2a3441] flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-[#616f89] dark:text-gray-500 text-sm">{t.footer.rights}</p>
                <div className="flex gap-4">
                    <Link className="text-[#616f89] dark:text-gray-500 hover:text-[#135bec] dark:hover:text-white transition-colors" href="#">
                        <span className="sr-only">Facebook</span>
                        <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fillRule="evenodd"></path>
                        </svg>
                    </Link>
                    <Link className="text-[#616f89] dark:text-gray-500 hover:text-[#135bec] dark:hover:text-white transition-colors" href="#">
                        <span className="sr-only">Instagram</span>
                        <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path clipRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C9.673 2.013 10.03 2 12.315 2zm-3.192 4.713a1 1 0 110 2 1 1 0 010-2zm3.192 1.954a5.333 5.333 0 100 10.666 5.333 5.333 0 000-10.666z" fillRule="evenodd"></path>
                        </svg>
                    </Link>
                </div>
            </div>
        </footer>
    );
}
