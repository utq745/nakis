import type { Metadata } from "next";
import PricingContent from "./pricing-content";

export const metadata: Metadata = {
    title: "Pricing | Transparent Embroidery Digitizing Prices | Approval Stitch",
    description: "Simple, transparent pricing for embroidery digitizing services. Starting at $10 for stitch test, +$10 for file optimization, and from $20 for new digitizing.",
    keywords: ["embroidery digitizing price", "digitizing cost", "stitch test price", "DST file fix", "embroidery verification", "affordable digitizing"],
    openGraph: {
        title: "Pricing | Transparent Embroidery Digitizing Prices",
        description: "Simple, transparent pricing for embroidery digitizing services. Starting at $10 for a real machine stitch test.",
        type: "website",
        images: [
            {
                url: "/images/hero/embroidery-hero.webp",
                width: 1200,
                height: 630,
                alt: "Approval Stitch Embroidery Digitizing Pricing",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Pricing | Embroidery Digitizing Prices",
        description: "Simple, transparent pricing for embroidery digitizing services. Starting at $10.",
        images: ["/images/hero/embroidery-hero.webp"],
    },
    alternates: {
        canonical: "/pricing",
        languages: {
            "en": "/pricing",
            "tr": "/tr/fiyatlandirma",
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
            "name": "Pricing",
            "item": "https://www.approvalstitch.com/pricing"
        }
    ]
};

// Product/Pricing Schema for SEO
const pricingSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Embroidery Digitizing & Stitch Test",
    "description": "Professional embroidery digitizing services with real stitch verification on Tajima and Barudan machines.",
    "brand": {
        "@type": "Brand",
        "name": "Approval Stitch"
    },
    "offers": [
        {
            "@type": "Offer",
            "name": "Stitch Test (No Editing)",
            "price": "10.00",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "priceValidUntil": "2026-12-31",
            "url": "https://www.approvalstitch.com/pricing"
        },
        {
            "@type": "Offer",
            "name": "Fix & Re-Stitch",
            "price": "20.00",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "priceValidUntil": "2026-12-31",
            "url": "https://www.approvalstitch.com/pricing"
        },
        {
            "@type": "Offer",
            "name": "New Digitizing + Stitch",
            "price": "20.00",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "priceValidUntil": "2026-12-31",
            "url": "https://www.approvalstitch.com/pricing"
        }
    ],
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "150"
    }
};

export default function PricingPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
            />
            <PricingContent />
        </>
    );
}
