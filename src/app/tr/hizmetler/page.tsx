
import type { Metadata } from "next";
import { getDictionary } from "@/lib/get-dictionary";
import { ServicesClient } from "./_components/services-client";

export async function generateMetadata(): Promise<Metadata> {
    const dict = getDictionary('tr');

    return {
        title: "Nakış Dijitalleştirme ve Onay Hizmetleri | Approval Stitch",
        description: dict.servicesPage.hero.description,
        alternates: {
            canonical: 'https://www.approvalstitch.com/tr/hizmetler',
        },
        openGraph: {
            title: "Nakış Dijitalleştirme ve Onay Hizmetleri - Approval Stitch",
            description: dict.servicesPage.hero.description,
            url: 'https://www.approvalstitch.com/tr/hizmetler',
            locale: 'tr_TR',
        },
    };
}

export default function ServicesPage() {
    const dict = getDictionary('tr');

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Service",
                "name": "Nakış Onay Hizmeti (Approval)",
                "provider": {
                    "@type": "Organization",
                    "name": "Approval Stitch"
                },
                "serviceType": "Embroidery Approval",
                "description": dict.servicesPage.mainServices.approval.desc,
                "offers": {
                    "@type": "Offer",
                    "price": "25",
                    "priceCurrency": "USD"
                }
            },
            {
                "@type": "Service",
                "name": "Düzeltme Hizmeti (Fix)",
                "provider": {
                    "@type": "Organization",
                    "name": "Approval Stitch"
                },
                "serviceType": "Embroidery File Editing",
                "description": dict.servicesPage.mainServices.fix.desc,
                "offers": {
                    "@type": "Offer",
                    "price": "35",
                    "priceCurrency": "USD"
                }
            },
            {
                "@type": "Service",
                "name": "Dijitalleştirme Hizmeti (Digitizing)",
                "provider": {
                    "@type": "Organization",
                    "name": "Approval Stitch"
                },
                "serviceType": "Embroidery Digitizing",
                "description": dict.servicesPage.mainServices.digitizing.desc,
                "offers": {
                    "@type": "Offer",
                    "price": "60",
                    "priceCurrency": "USD"
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
            <ServicesClient />
        </>
    );
}
