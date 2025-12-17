import { translations, Locale } from './dictionary';

export function getDictionary(lang: Locale) {
    return translations[lang] || translations.en;
}

export const locales = ['en', 'tr'] as const;
export const defaultLocale = 'en' as const;
