"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { translations, Locale } from "@/lib/dictionary";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

type TimeFormat = "12" | "24";

type LanguageContextType = {
    language: Locale;
    setLanguage: (lang: Locale) => void;
    t: typeof translations["tr"];
    timeFormat: TimeFormat;
    setTimeFormat: (format: TimeFormat) => void;
    formatDateTime: (date: string | Date, options?: Intl.DateTimeFormatOptions) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
    children,
    initialLang
}: {
    children: React.ReactNode;
    initialLang: Locale;
}) {
    const [language, setLanguageState] = useState<Locale>(initialLang);
    const [timeFormat, setTimeFormatState] = useState<TimeFormat>("24");
    const router = useRouter();
    const pathname = usePathname();

    const { status } = useSession();

    // Fetch user's timeFormat preference on mount or when auth status changes
    useEffect(() => {
        if (status === "authenticated") {
            fetch("/api/user/profile")
                .then(res => res.ok ? res.json() : null)
                .then(data => {
                    if (data?.timeFormat) {
                        setTimeFormatState(data.timeFormat as TimeFormat);
                    }
                })
                .catch(() => { /* Error fetching, keep default */ });
        }
    }, [status]);

    const setTimeFormat = useCallback((format: TimeFormat) => {
        setTimeFormatState(format);
    }, []);

    const formatDateTime = useCallback((date: string | Date, options?: Intl.DateTimeFormatOptions) => {
        const dateLocale = language === "tr" ? "tr-TR" : "en-US";
        const dateObj = typeof date === "string" ? new Date(date) : date;
        const mergedOptions: Intl.DateTimeFormatOptions = {
            ...options,
        };
        // Only set hour12 if the options include time components
        if (mergedOptions.hour || mergedOptions.hour === undefined && (mergedOptions.minute !== undefined || mergedOptions.second !== undefined)) {
            mergedOptions.hour12 = timeFormat === "12";
        }
        // If options have hour/minute but no explicit hour12, inject it
        if (options?.hour || options?.minute) {
            mergedOptions.hour12 = timeFormat === "12";
        }
        return new Intl.DateTimeFormat(dateLocale, mergedOptions).format(dateObj);
    }, [language, timeFormat]);

    const setLanguage = (lang: Locale) => {
        setLanguageState(lang);

        // Complete path mapping for all pages with different slugs
        const pathMappings: Record<string, { en: string; tr: string }> = {
            // Auth pages
            'login': { en: '/login', tr: '/tr/giris' },
            'giris': { en: '/login', tr: '/tr/giris' },
            'register': { en: '/register', tr: '/tr/kayit' },
            'kayit': { en: '/register', tr: '/tr/kayit' },
            'forgot-password': { en: '/forgot-password', tr: '/tr/sifremi-unuttum' },
            'sifremi-unuttum': { en: '/forgot-password', tr: '/tr/sifremi-unuttum' },
            'reset-password': { en: '/reset-password', tr: '/tr/sifre-sifirla' },
            'sifre-sifirla': { en: '/reset-password', tr: '/tr/sifre-sifirla' },
            // Public pages
            'about': { en: '/about', tr: '/tr/hakkimizda' },
            'hakkimizda': { en: '/about', tr: '/tr/hakkimizda' },
            'contact': { en: '/contact', tr: '/tr/iletisim' },
            'iletisim': { en: '/contact', tr: '/tr/iletisim' },
            'services': { en: '/services', tr: '/tr/hizmetler' },
            'hizmetler': { en: '/services', tr: '/tr/hizmetler' },
            'pricing': { en: '/pricing', tr: '/tr/fiyatlandirma' },
            'fiyatlandirma': { en: '/pricing', tr: '/tr/fiyatlandirma' },
            'faqs': { en: '/faqs', tr: '/tr/sss' },
            'sss': { en: '/faqs', tr: '/tr/sss' },
            'privacy-policy': { en: '/privacy-policy', tr: '/tr/gizlilik-politikasi' },
            'gizlilik-politikasi': { en: '/privacy-policy', tr: '/tr/gizlilik-politikasi' },
            'cookie-policy': { en: '/cookie-policy', tr: '/tr/cerez-politikasi' },
            'cerez-politikasi': { en: '/cookie-policy', tr: '/tr/cerez-politikasi' },
            'distance-sales-agreement': { en: '/distance-sales-agreement', tr: '/tr/mesafeli-satis-sozlesmesi' },
            'mesafeli-satis-sozlesmesi': { en: '/distance-sales-agreement', tr: '/tr/mesafeli-satis-sozlesmesi' },
            'delivery-and-returns': { en: '/delivery-and-returns', tr: '/tr/teslimat-ve-iade' },
            'teslimat-ve-iade': { en: '/delivery-and-returns', tr: '/tr/teslimat-ve-iade' },
            // Dashboard pages
            'dashboard/manage-blog': { en: '/dashboard/manage-blog', tr: '/tr/panel/manage-blog' },
            'panel/manage-blog': { en: '/dashboard/manage-blog', tr: '/tr/panel/manage-blog' },
            'dashboard': { en: '/dashboard', tr: '/tr/panel' },
            'panel': { en: '/dashboard', tr: '/tr/panel' },
            'orders': { en: '/orders', tr: '/tr/siparisler' },
            'siparisler': { en: '/orders', tr: '/tr/siparisler' },
            'settings': { en: '/settings', tr: '/tr/ayarlar' },
            'ayarlar': { en: '/settings', tr: '/tr/ayarlar' },
            'customers': { en: '/customers', tr: '/tr/musteriler' },
            'musteriler': { en: '/customers', tr: '/tr/musteriler' },
            'reports': { en: '/reports', tr: '/tr/raporlar' },
            'raporlar': { en: '/reports', tr: '/tr/raporlar' },
        };

        // Extract the page slug from the current path
        const pathWithoutTr = pathname.replace(/^\/tr/, '');
        const segments = pathWithoutTr.split('/').filter(Boolean);
        const pageSlug = segments[0] || '';

        // Check if we have a mapping for this page
        if (pageSlug && pathMappings[pageSlug]) {
            const mapping = pathMappings[pageSlug];
            // Handle subpaths (like /orders/123 or /orders/new)
            const remainingPath = segments.slice(1).join('/');
            const basePath = lang === 'en' ? mapping.en : mapping.tr;
            const newPath = remainingPath ? `${basePath}/${remainingPath}` : basePath;
            router.push(newPath);
            return;
        }

        // Default logic for home page and unmapped paths
        if (lang === 'en') {
            const newPath = pathname.replace(/^\/tr/, '') || '/';
            router.push(newPath);
        } else {
            const newPath = pathname.startsWith('/tr') ? pathname : `/tr${pathname}`;
            router.push(newPath);
        }
    };

    const value = {
        language,
        setLanguage,
        t: translations[language],
        timeFormat,
        setTimeFormat,
        formatDateTime,
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
