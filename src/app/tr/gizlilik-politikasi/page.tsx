
import type { Metadata } from "next";
import { PrivacyClient } from "./_components/privacy-client";
import { getDictionary } from '@/lib/get-dictionary'; // Assuming this exists or using string directly if dictionary doesn't cover legal headers

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Gizlilik Politikası (KVKK ve GDPR) - Approval Stitch",
        description: "Approval Stitch'in veri toplama, kullanım ve koruma yöntemleri hakkında bilgi edinin. KVKK, GDPR ve CCPA uyumlu gizlilik politikamız.",
        alternates: {
            canonical: 'https://www.approvalstitch.com/tr/gizlilik-politikasi',
        },
        openGraph: {
            title: "Gizlilik Politikası - Approval Stitch",
            description: "Verilerinizi nasıl koruyoruz? Gizlilik politikamız ve haklarınız hakkında detaylar.",
            url: 'https://www.approvalstitch.com/tr/gizlilik-politikasi',
            locale: 'tr_TR',
        },
    };
}

export default function PrivacyPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Gizlilik Politikası",
        "description": "Approval Stitch gizlilik politikası ve veri güvenliği uygulamaları.",
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
            <PrivacyClient />
        </>
    );
}
