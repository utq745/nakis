import { LanguageProvider } from "@/components/providers/language-provider";
import { CookieBanner } from "@/components/cookie-banner";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/get-dictionary";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { geistSans, geistMono, inter } from "../fonts";
import "../globals.css";

export async function generateMetadata(): Promise<Metadata> {
    const dict = getDictionary('tr');

    return {
        title: `${dict.landing.hero.titleLine1} ${dict.landing.hero.titleLine2} - Approval Stitch`,
        description: dict.landing.hero.description,
        metadataBase: new URL('https://nakis-site.vercel.app'), // TODO: Replace with actual domain
        alternates: {
            canonical: `/tr`,
            languages: {
                'en': '/',
                'tr': '/tr',
                'x-default': '/',
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
        <html lang="tr" suppressHydrationWarning>
            <head>
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased font-sans`}
                suppressHydrationWarning
            >
                <Providers>
                    <LanguageProvider initialLang="tr">
                        {children}
                        <CookieBanner />
                    </LanguageProvider>
                    <Toaster richColors position="top-right" />
                </Providers>
            </body>
        </html>
    );
}
