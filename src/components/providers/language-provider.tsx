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

        // Update URL based on language
        if (lang === 'en') {
            // Remove /tr prefix if exists
            const newPath = pathname.replace(/^\/tr/, '') || '/';
            router.push(newPath);
        } else {
            // Add /tr prefix if not exists
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
