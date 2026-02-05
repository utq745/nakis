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
                                className="object-contain object-left dark:hidden"
                            />
                            <Image
                                src="/images/approval-stich-logo-w.webp"
                                alt="Approval Stitch - Real Stitched Approval Sample"
                                fill
                                className="object-contain object-left hidden dark:block"
                            />
                        </div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        {t.footer.desc}
                    </p>
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
                    <img
                        src="/iyzico_colored.svg"
                        alt={language === 'tr' ? 'iyzico ile öde' : 'Pay with iyzico'}
                        width={80}
                        height={34}
                        className="h-[34px] w-auto opacity-90 hover:opacity-100 transition-opacity dark:hidden"
                        loading="lazy"
                    />
                    <img
                        src="/iyzico_white.svg"
                        alt={language === 'tr' ? 'iyzico ile öde' : 'Pay with iyzico'}
                        width={80}
                        height={34}
                        className="hidden dark:block h-[34px] w-auto opacity-90 hover:opacity-100 transition-opacity"
                        loading="lazy"
                    />
                </div>
            </div>
        </footer>
    );
}
