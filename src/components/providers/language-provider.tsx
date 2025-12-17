"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { translations, Locale } from "@/lib/dictionary";

type LanguageContextType = {
    language: Locale;
    setLanguage: (lang: Locale) => void;
    t: typeof translations["tr"];
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Locale>("tr");
    // Hydration mismatch is possible if local storage has 'en' but server renders 'tr'.
    // We accept this flash for simplicity in this client-side i18n implementation.

    useEffect(() => {
        const stored = localStorage.getItem("language") as Locale;
        if (stored && (stored === "tr" || stored === "en")) {
            setLanguage(stored);
        }
    }, []);

    const handleSetLanguage = (lang: Locale) => {
        setLanguage(lang);
        localStorage.setItem("language", lang);
    };

    const value = {
        language,
        setLanguage: handleSetLanguage,
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
