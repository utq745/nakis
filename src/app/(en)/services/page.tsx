import type { Metadata } from "next";
import ServicesContent from "./services-content";

export const metadata: Metadata = {
    title: "Our Services | Professional Embroidery Digitizing & Stitch Approval",
    description: "Explore our embroidery digitizing services: Real Stitched Approval, Fix & Verify, Full Master Digitizing. Proven on Tajima machines.",
    keywords: ["embroidery digitizing services", "stitch approval", "DST file fix", "embroidery file conversion", "Tajima digitizing", "professional digitizing service"],
    openGraph: {
        title: "Our Services | Professional Embroidery Digitizing & Stitch Approval",
        description: "Explore our embroidery digitizing services: Real Stitched Approval, Fix & Verify, Full Master Digitizing.",
        type: "website",
        images: [
            {
                url: "/images/Stitching-machine.webp",
                width: 1200,
                height: 630,
                alt: "Approval Stitch Professional Embroidery Digitizing Services",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Our Services | Professional Embroidery Digitizing",
        description: "Explore our embroidery digitizing services: Real Stitched Approval, Fix & Verify, Full Master Digitizing.",
        images: ["/images/Stitching-machine.webp"],
    },
    alternates: {
        canonical: "/services",
        languages: {
            "en": "/services",
            "tr": "/tr/hizmetler",
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
            "name": "Services",
            "item": "https://www.approvalstitch.com/services"
        }
    ]
};

// Service Schema for SEO
const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Embroidery Digitizing",
    "provider": {
        "@type": "Organization",
        "name": "Approval Stitch",
        "url": "https://www.approvalstitch.com"
    },
    "name": "Professional Embroidery Digitizing Services",
    "description": "We provide professional embroidery digitizing services including real stitched approval, file fixing, and full master digitizing.",
    "offers": [
        {
            "@type": "Offer",
            "name": "Real Stitched Approval",
            "price": "25.00",
            "priceCurrency": "USD",
            "description": "We run your existing DST file on our calibrated Tajima machines and provide a high-resolution scan."
        },
        {
            "@type": "Offer",
            "name": "Fix & Verify Service",
            "price": "35.00",
            "priceCurrency": "USD",
            "description": "We analyze your problematic files, fix technical errors, and prove the result with a stitch-out."
        },
        {
            "@type": "Offer",
            "name": "Full Master Digitizing",
            "price": "60.00",
            "priceCurrency": "USD",
            "description": "We transform your artwork into industrial-grade embroidery files with the cleanest stitch paths."
        }
    ],
    "areaServed": "Worldwide"
};

export default function ServicesPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <ServicesContent />
        </>
    );
}
