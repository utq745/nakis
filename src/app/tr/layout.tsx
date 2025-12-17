import { LanguageProvider } from "@/components/providers/language-provider";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/get-dictionary";

export async function generateMetadata(): Promise<Metadata> {
    const dict = getDictionary('tr');

    return {
        title: `${dict.landing.hero.titleLine1} ${dict.landing.hero.titleLine2} - Approval Stitch`,
        description: dict.landing.hero.description,
        alternates: {
            canonical: `/tr`,
            languages: {
                'en': '/',
                'tr': '/tr',
            },
        },
        openGraph: {
            title: `${dict.landing.hero.titleLine1} ${dict.landing.hero.titleLine2}`,
            description: dict.landing.hero.description,
            locale: 'tr_TR',
            alternateLocale: 'en_US',
        },
    };
}

export default function TrLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div lang="tr">
            <LanguageProvider initialLang="tr">
                {children}
            </LanguageProvider>
        </div>
    );
}
