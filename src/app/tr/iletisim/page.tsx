
import type { Metadata } from "next";
import { getDictionary } from "@/lib/get-dictionary";
import { ContactClient } from "./_components/contact-client";

export async function generateMetadata(): Promise<Metadata> {
    const dict = getDictionary('tr');

    return {
        title: "İletişim - Bize Ulaşın | Approval Stitch",
        description: dict.contactPage.subtitle,
        alternates: {
            canonical: 'https://www.approvalstitch.com/tr/iletisim',
        },
        openGraph: {
            title: "İletişim - Approval Stitch",
            description: dict.contactPage.subtitle,
            url: 'https://www.approvalstitch.com/tr/iletisim',
            locale: 'tr_TR',
        },
    };
}

export default function ContactPage() {
    const dict = getDictionary('tr');

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Bize Ulaşın",
        "description": dict.contactPage.subtitle,
        "mainEntity": {
            "@type": "LocalBusiness",
            "name": "Approval Stitch",
            "image": "https://www.approvalstitch.com/images/approval-stitch-logo.png",
            "email": "contact@approvalstitch.com",
            "telephone": "+90-548-858-8394",
            "priceRange": "$$"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ContactClient />
        </>
    );
}
