
import type { Metadata } from "next";
import { SalesAgreementClient } from "./_components/sales-agreement-client";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Mesafeli Satış Sözleşmesi - Approval Stitch",
        description: "Approval Stitch üzerinden alınan hizmetler için geçerli mesafeli satış sözleşmesi, cayma hakkı ve hizmet koşulları.",
        alternates: {
            canonical: 'https://www.approvalstitch.com/tr/mesafeli-satis-sozlesmesi',
        },
        openGraph: {
            title: "Mesafeli Satış Sözleşmesi - Approval Stitch",
            description: "Hizmet alım şartları, iptal ve iade koşullarını içeren sözleşme metni.",
            url: 'https://www.approvalstitch.com/tr/mesafeli-satis-sozlesmesi',
            locale: 'tr_TR',
        },
    };
}

export default function SalesAgreementPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Mesafeli Satış Sözleşmesi",
        "description": "Approval Stitch hizmet satış sözleşmesi ve yasal şartlar.",
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
            <SalesAgreementClient />
        </>
    );
}
