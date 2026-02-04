
import type { Metadata } from "next";
import { DeliveryPolicyClient } from "./_components/delivery-policy-client";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Delivery and Returns Policy - Approval Stitch",
        description: "Detailed information about Approval Stitch digital service delivery processes and return policy.",
        alternates: {
            canonical: 'https://www.approvalstitch.com/delivery-and-returns',
        },
        openGraph: {
            title: "Delivery and Returns Policy - Approval Stitch",
            description: "Transparent information about our digital file delivery speed and return conditions.",
            url: 'https://www.approvalstitch.com/delivery-and-returns',
            locale: 'en_US',
        },
    };
}

export default function DeliveryPolicyPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Delivery and Returns Policy",
        "description": "Approval Stitch delivery and returns policy.",
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
