
import type { Metadata } from "next";
import { DeliveryPolicyClient } from "./_components/delivery-policy-client";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Teslimat ve İade Şartları - Approval Stitch",
        description: "Approval Stitch dijital hizmet teslimat süreçleri ve iade politikası hakkında detaylı bilgi.",
        alternates: {
            canonical: 'https://www.approvalstitch.com/tr/teslimat-ve-iade',
        },
        openGraph: {
            title: "Teslimat ve İade Şartları - Approval Stitch",
            description: "Dijital dosya teslimat hızı ve iade koşullarımız hakkında şeffaf bilgilendirme.",
            url: 'https://www.approvalstitch.com/tr/teslimat-ve-iade',
            locale: 'tr_TR',
        },
    };
}

export default function DeliveryPolicyPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Teslimat ve İade Şartları",
        "description": "Approval Stitch teslimat ve iade politikası.",
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
            <DeliveryPolicyClient />
        </>
    );
}
