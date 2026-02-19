import { LanguageProvider } from "@/components/providers/language-provider";
import { CookieBanner } from "@/components/cookie-banner";
import Script from "next/script";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/get-dictionary";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { geistSans, geistMono, inter } from "../fonts";
import "../globals.css";

export async function generateMetadata(): Promise<Metadata> {
    const dict = getDictionary('en');

    return {
        title: {
            default: `${dict.landing.hero.titleLine1} ${dict.landing.hero.titleLine2} - Approval Stitch`,
            template: "%s | Approval Stitch",
        },
        description: dict.landing.hero.description,
        metadataBase: new URL('https://www.approvalstitch.com'),
        alternates: {
            canonical: `/`,
            languages: {
                'en': '/',
                'tr': '/tr',
                'x-default': '/',
            },
        },
        openGraph: {
            title: `${dict.landing.hero.titleLine1} ${dict.landing.hero.titleLine2}`,
            description: dict.landing.hero.description,
            locale: 'en_US',
            alternateLocale: 'tr_TR',
            siteName: 'Approval Stitch',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            site: '@approvalstitch',
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        icons: {
            icon: '/icon.png?v=1',
            shortcut: '/favicon.ico?v=1',
            apple: '/icon.png?v=1',
        },
    };
}

// Organization Schema for SEO
const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Approval Stitch",
    "url": "https://www.approvalstitch.com",
    "logo": "https://www.approvalstitch.com/logo.png",
    "description": "Professional embroidery digitizing service with real stitch verification on Tajima machines.",
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+90-548-858-8394",
        "contactType": "customer service",
        "availableLanguage": ["English", "Turkish"],
    },
    "sameAs": [
        "https://wa.me/905488588394"
    ]
};

const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Approval Stitch",
    "url": "https://www.approvalstitch.com",
    "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.approvalstitch.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
    }
};

export default function EnLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
                />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased font-sans`}
                suppressHydrationWarning
            >
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=AW-17962211871"
                    strategy="afterInteractive"
                />
                <Script id="google-ads" strategy="afterInteractive">
                    {`
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', 'AW-17962211871');
                    `}
                </Script>
                <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 bg-background px-4 py-2 rounded-md shadow-md">
                    Skip to content
                </a>
                <Providers>
                    <LanguageProvider initialLang="en">
                        {children}
                        <CookieBanner />
                    </LanguageProvider>
                    <Toaster richColors position="top-right" />
                </Providers>
            </body>
        </html>
    );
}
