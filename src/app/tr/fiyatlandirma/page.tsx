
import type { Metadata } from "next";
import { getDictionary } from "@/lib/get-dictionary";
import { PricingClient } from "./_components/pricing-client";

export async function generateMetadata(): Promise<Metadata> {
    const dict = getDictionary('tr');

    return {
        title: "Fiyatlandırma Paketleri - 10$'dan Başlayan Fiyatlar | Approval Stitch",
        description: dict.pricingPage.hero.description,
        alternates: {
            canonical: 'https://www.approvalstitch.com/tr/fiyatlandirma',
        },
        openGraph: {
            title: "Fiyatlandırma Paketleri - Approval Stitch",
            description: dict.pricingPage.hero.description,
            url: 'https://www.approvalstitch.com/tr/fiyatlandirma',
            locale: 'tr_TR',
        },
    };
}

export default function PricingPage() {
    const dict = getDictionary('tr');

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Product",
                "name": "Nakış Dosyası Dikiş Testi",
                "description": dict.pricingPage.plans.plan1.description,
                "offers": {
                    "@type": "Offer",
                    "price": "10",
                    "priceCurrency": "USD",
                    "availability": "https://schema.org/InStock"
                }
            },
            {
                "@type": "Product",
                "name": "DST Dosya Düzenleme ve Optimizasyon",
                "description": dict.pricingPage.plans.plan2.description,
                "offers": {
                    "@type": "Offer",
                    "price": "20",
                    "priceCurrency": "USD",
                    "availability": "https://schema.org/InStock"
                }
            },
            {
                "@type": "Product",
                "name": "Yeni Nakış Desen Tasarımı (Digitizing)",
                "description": dict.pricingPage.plans.plan3.description,
                "offers": {
                    "@type": "Offer",
                    "price": "20",
                    "priceCurrency": "USD",
                    "availability": "https://schema.org/InStock"
                }
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <PricingClient />
        </>
    );
}
