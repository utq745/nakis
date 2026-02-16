"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/providers/language-provider";

export function Footer() {
    const { t, language } = useLanguage();

    return (
        <footer className="w-full bg-background dark:bg-card border-t border-border py-12 px-10">
            <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between gap-10">
                <div className="flex flex-col gap-4 max-w-sm">
                    <div className="flex items-center">
                        <div className="relative h-14 w-60">
                            <Image
                                src="/images/approval-stich-logo.webp"
                                alt="Approval Stitch - Real Stitched Approval Sample"
                                fill
                                sizes="240px"
                                className="object-contain object-left dark:hidden"
                            />
                            <Image
                                src="/images/approval-stich-logo-w.webp"
                                alt="Approval Stitch - Real Stitched Approval Sample"
                                fill
                                sizes="240px"
                                className="object-contain object-left hidden dark:block"
                            />
                        </div>
                    </div>
                    <p
                        className="text-muted-foreground text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: t.footer.desc }}
                    />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:flex gap-12">
                    <div className="flex flex-col gap-4">
                        <h3 className="text-foreground font-bold text-sm uppercase tracking-wider">{t.footer.company}</h3>
                        <div className="flex flex-col gap-2">
                            <Link className="text-muted-foreground hover:text-primary transition-colors text-sm" href={language === 'tr' ? '/tr/hakkimizda' : '/about'}>{language === 'tr' ? 'Hakkımızda' : 'About Us'}</Link>
                            <Link className="text-muted-foreground hover:text-primary transition-colors text-sm" href={language === 'tr' ? '/tr/fiyatlandirma' : '/pricing'}>{t.header.pricing}</Link>

                            <Link className="text-muted-foreground hover:text-primary transition-colors text-sm" href={language === 'tr' ? '/tr/iletisim' : '/contact'}>{t.footer.contact}</Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h3 className="text-foreground font-bold text-sm uppercase tracking-wider">{t.footer.support}</h3>
                        <div className="flex flex-col gap-2">
                            <Link className="text-muted-foreground hover:text-primary transition-colors text-sm" href={language === 'tr' ? '/tr/sss' : '/faqs'}>{t.footer.faq}</Link>
                            <Link className="text-muted-foreground hover:text-primary transition-colors text-sm" href={language === 'tr' ? '/tr/cerez-politikasi' : '/cookie-policy'}>{language === 'tr' ? 'Çerez Politikası' : 'Cookie Policy'}</Link>
                            <Link className="text-muted-foreground hover:text-primary transition-colors text-sm" href={language === 'tr' ? '/tr/gizlilik-politikasi' : '/privacy-policy'}>{t.footer.privacy}</Link>
                            <Link className="text-muted-foreground hover:text-primary transition-colors text-sm" href={language === 'tr' ? '/tr/mesafeli-satis-sozlesmesi' : '/distance-sales-agreement'}>{language === 'tr' ? 'Mesafeli Satış Sözleşmesi' : 'Distance Sales Agreement'}</Link>
                            <Link className="text-muted-foreground hover:text-primary transition-colors text-sm" href={language === 'tr' ? '/tr/teslimat-ve-iade' : '/delivery-and-returns'}>{language === 'tr' ? 'Teslimat ve İade' : 'Delivery and Returns'}</Link>
                            <Link className="text-muted-foreground hover:text-primary transition-colors text-sm" href="/sitemap.xml">{language === 'tr' ? 'Site Haritası' : 'Sitemap'}</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-[1280px] mx-auto mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex flex-col items-center md:items-start gap-1">
                    <p className="text-muted-foreground text-sm">
                        {t.footer.rights.replace(/\d{4}/, new Date().getFullYear().toString())}
                    </p>
                    <p className="text-muted-foreground text-xs">
                        Designed & Developed by <a href="https://www.utkusakallioglu.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Utku</a>.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <a
                        href="https://www.linkedin.com/in/yavuzsakkaoglu/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-[#0077B5] transition-colors"
                        aria-label="LinkedIn"
                    >
                        <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    );
}
