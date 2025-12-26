import type { Metadata } from "next";
import CookieContent from "./cookie-content";

export const metadata: Metadata = {
    title: "Cookie Policy | Approval Stitch",
    description: "Information about cookies used on Approval Stitch website. Manage your cookie preferences for analytics and functionality.",
    keywords: ["cookie policy", "cookies", "tracking", "analytics cookies", "GDPR cookies"],
    openGraph: {
        title: "Cookie Policy | Approval Stitch",
        description: "Information about cookies used on Approval Stitch website.",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Cookie Policy | Approval Stitch",
        description: "Information about cookies used on our website.",
    },
    alternates: {
        canonical: "/cookie-policy",
        languages: {
            "en": "/cookie-policy",
            "tr": "/tr/cerez-politikasi",
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
            "name": "Cookie Policy",
            "item": "https://www.approvalstitch.com/cookie-policy"
        }
    ]
};

export default function CookiePolicyPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <CookieContent />
        </>
    );
}
