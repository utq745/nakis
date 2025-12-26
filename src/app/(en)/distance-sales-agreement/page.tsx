import type { Metadata } from "next";
import AgreementContent from "./agreement-content";

export const metadata: Metadata = {
    title: "Distance Sales Agreement | Terms & Conditions | Approval Stitch",
    description: "Read the distance sales agreement and terms for Approval Stitch embroidery digitizing services. Legal terms for online purchases.",
    keywords: ["distance sales agreement", "terms and conditions", "embroidery terms", "digitizing agreement", "legal terms"],
    openGraph: {
        title: "Distance Sales Agreement | Approval Stitch",
        description: "Read the distance sales agreement and terms for Approval Stitch embroidery digitizing services.",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Distance Sales Agreement | Approval Stitch",
        description: "Legal terms for our embroidery digitizing services.",
    },
    alternates: {
        canonical: "/distance-sales-agreement",
        languages: {
            "en": "/distance-sales-agreement",
            "tr": "/tr/mesafeli-satis-sozlesmesi",
        },
    },
};

// BreadcrumbList Schema for SEO
const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.approvalstitch.com"
        },
        {
            "@type": "ListItem",
            "position": 2,
            "name": "Distance Sales Agreement",
            "item": "https://www.approvalstitch.com/distance-sales-agreement"
        }
    ]
};

export default function DistanceSalesAgreementPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <AgreementContent />
        </>
    );
}
