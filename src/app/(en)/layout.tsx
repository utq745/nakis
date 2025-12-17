import { LanguageProvider } from "@/components/providers/language-provider";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/get-dictionary";

export async function generateMetadata(): Promise<Metadata> {
    const dict = getDictionary('en');

    return {
        title: `${dict.landing.hero.titleLine1} ${dict.landing.hero.titleLine2} - Approval Stitch`,
        description: dict.landing.hero.description,
        alternates: {
            canonical: `/`,
            languages: {
                'en': '/',
                'tr': '/tr',
            },
        },
        openGraph: {
            title: `${dict.landing.hero.titleLine1} ${dict.landing.hero.titleLine2}`,
            description: dict.landing.hero.description,
            locale: 'en_US',
            alternateLocale: 'tr_TR',
        },
    };
}

export default function EnLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div lang="en">
            <LanguageProvider initialLang="en">
                {children}
            </LanguageProvider>
        </div>
    );
}
