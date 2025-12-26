
import type { Metadata } from "next";
import { getDictionary } from "@/lib/get-dictionary";
import { PricingClient } from "./_components/pricing-client";

export async function generateMetadata(): Promise<Metadata> {
    const dict = getDictionary('tr');

    return {
        title: "Fiyatlandırma Paketleri - 25$'dan Başlayan Fiyatlar | Approval Stitch",
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
                "name": dict.pricingPage.plans.plan1.name, // Approval
                "description": dict.pricingPage.plans.plan1.description,
                "offers": {
                    "@type": "Offer",
                    "price": "25",
                    "priceCurrency": "USD",
                    "availability": "https://schema.org/InStock"
                }
            },
            {
                "@type": "Product",
                "name": dict.pricingPage.plans.plan2.name, // Fix
                "description": dict.pricingPage.plans.plan2.description,
                "offers": {
                    "@type": "Offer",
                    "price": "35",
                    "priceCurrency": "USD",
                    "availability": "https://schema.org/InStock"
                }
            },
            {
                "@type": "Product",
                "name": dict.pricingPage.plans.plan3.name, // Digitizing
                "description": dict.pricingPage.plans.plan3.description,
                "offers": {
                    "@type": "Offer",
                    "price": "60",
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
