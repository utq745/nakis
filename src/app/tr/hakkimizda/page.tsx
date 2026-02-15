
import type { Metadata } from "next";
import { getDictionary } from "@/lib/get-dictionary";
import { AboutClient } from "./_components/about-client";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
    const dict = getDictionary('tr');

    return {
        title: "Hakkımızda - 35 Yıllık Tecrübe | Approval Stitch",
        description: dict.aboutPage.hero.description,
        alternates: {
            canonical: 'https://www.approvalstitch.com/tr/hakkimizda',
        },
        openGraph: {
            title: "Hakkımızda - Approval Stitch",
            description: dict.aboutPage.hero.description,
            url: 'https://www.approvalstitch.com/tr/hakkimizda',
            locale: 'tr_TR',
        },
    };
}

export default function AboutPage() {
    const dict = getDictionary('tr');

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Approval Stitch",
        "url": "https://www.approvalstitch.com/tr",
        "logo": "https://www.approvalstitch.com/images/approval-stitch-logo.png",
        "sameAs": [
            "https://www.instagram.com/approvalstitch",
            "https://www.facebook.com/approvalstitch"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+90-548-858-8394",
            "contactType": "Customer Service",
            "areaServed": "World",
            "availableLanguage": ["English", "Turkish"]
        },
        "description": dict.aboutPage.hero.description
    };


    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Suspense fallback={null}>
                <AboutClient />
            </Suspense>
        </>
    );
}
