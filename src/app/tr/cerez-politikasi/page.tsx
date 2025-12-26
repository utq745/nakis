
import type { Metadata } from "next";
import { CookieClient } from "./_components/cookie-client";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Çerez Politikası - Approval Stitch",
        description: "Web sitemizde çerezlerin kullanım amacı, türleri ve tercihlerinizi nasıl yönetebileceğiniz hakkında bilgi edinin.",
        alternates: {
            canonical: 'https://www.approvalstitch.com/tr/cerez-politikasi',
        },
        openGraph: {
            title: "Çerez Politikası - Approval Stitch",
            description: "Çeffaf çerez kullanımı ve tercihleriniz. Çerez politikamızın detayları.",
            url: 'https://www.approvalstitch.com/tr/cerez-politikasi',
            locale: 'tr_TR',
        },
    };
}

export default function CookiePage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Çerez Politikası",
        "description": "Approval Stitch web sitesi çerez kullanım detayları.",
        "publisher": {
            "@type": "Organization",
            "name": "Approval Stitch",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.approvalstitch.com/images/approval-stitch-logo.png"
            }
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <CookieClient />
        </>
    );
}
