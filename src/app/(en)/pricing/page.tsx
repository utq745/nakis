import type { Metadata } from "next";
import PricingContent from "./pricing-content";

export const metadata: Metadata = {
    title: "Pricing | Transparent Embroidery Digitizing Prices | Approval Stitch",
    description: "Simple, transparent pricing for embroidery digitizing services. Starting at $25 for stitch approval, $35 for file fixing, $60 for full digitizing.",
    keywords: ["embroidery digitizing price", "digitizing cost", "stitch approval price", "DST file price", "embroidery pricing", "affordable digitizing"],
    openGraph: {
        title: "Pricing | Transparent Embroidery Digitizing Prices",
        description: "Simple, transparent pricing for embroidery digitizing services. Starting at $25 for stitch approval.",
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
        description: "Simple, transparent pricing for embroidery digitizing services. Starting at $25.",
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
    "name": "Embroidery Digitizing Services",
    "description": "Professional embroidery digitizing services with real stitch verification on Tajima machines.",
    "brand": {
        "@type": "Brand",
        "name": "Approval Stitch"
    },
    "offers": [
        {
            "@type": "Offer",
            "name": "Real Stitched Approval",
            "price": "25.00",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "priceValidUntil": "2025-12-31",
            "url": "https://www.approvalstitch.com/pricing"
        },
        {
            "@type": "Offer",
            "name": "Fix & Verify Service",
            "price": "35.00",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "priceValidUntil": "2025-12-31",
            "url": "https://www.approvalstitch.com/pricing"
        },
        {
            "@type": "Offer",
            "name": "Full Master Digitizing",
            "price": "60.00",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "priceValidUntil": "2025-12-31",
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
