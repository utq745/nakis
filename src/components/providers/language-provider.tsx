"use client";

import { createContext, useContext, useState } from "react";
import { translations, Locale } from "@/lib/dictionary";
import { useRouter, usePathname } from "next/navigation";

type LanguageContextType = {
    language: Locale;
    setLanguage: (lang: Locale) => void;
    t: typeof translations["tr"];
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
    const router = useRouter();
    const pathname = usePathname();

    const setLanguage = (lang: Locale) => {
        setLanguageState(lang);

        // Specialized path mapping for non-matching slugs
        const pathMappings: Record<string, { en: string; tr: string }> = {
            'mesafelisatis': {
                en: '/distance-sales-agreement',
                tr: '/tr/mesafeli-satis-sozlesmesi'
            }
        };

        // Check for special cases
        if (pathname.includes('mesafeli-satis-sozlesmesi') || pathname.includes('distance-sales-agreement')) {
            router.push(lang === 'en' ? pathMappings.mesafelisatis.en : pathMappings.mesafelisatis.tr);
            return;
        }

        // Default logic for matching slugs
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
