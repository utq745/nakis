import type { Metadata } from "next";
import PrivacyContent from "./privacy-content";

export const metadata: Metadata = {
    title: "Privacy Policy | Approval Stitch",
    description: "Learn how Approval Stitch collects, uses, and protects your personal data and embroidery designs. GDPR compliant.",
    keywords: ["privacy policy", "data protection", "GDPR", "embroidery data security", "design confidentiality"],
    openGraph: {
        title: "Privacy Policy | Approval Stitch",
        description: "Learn how Approval Stitch collects, uses, and protects your personal data and embroidery designs.",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Privacy Policy | Approval Stitch",
        description: "Learn how Approval Stitch protects your data.",
    },
    alternates: {
        canonical: "/privacy-policy",
        languages: {
            "en": "/privacy-policy",
            "tr": "/tr/gizlilik-politikasi",
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
            "name": "Privacy Policy",
            "item": "https://www.approvalstitch.com/privacy-policy"
        }
    ]
};

export default function PrivacyPolicyPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <PrivacyContent />
        </>
    );
}
