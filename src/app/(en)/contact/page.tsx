import type { Metadata } from "next";
import ContactContent from "./contact-content";

export const metadata: Metadata = {
    title: "Contact Us | Approval Stitch - Embroidery Digitizing Services",
    description: "Get in touch with Approval Stitch for professional embroidery digitizing. Quick response within 12 hours. Email, WhatsApp support available.",
    keywords: ["contact approval stitch", "embroidery digitizing contact", "embroidery support", "WhatsApp embroidery", "digitizing inquiry"],
    openGraph: {
        title: "Contact Us | Approval Stitch - Embroidery Digitizing Services",
        description: "Get in touch with Approval Stitch for professional embroidery digitizing. Quick response within 12 hours.",
        type: "website",
        images: [
            {
                url: "/images/hero/embroidery-hero.webp",
                width: 1200,
                height: 630,
                alt: "Contact Approval Stitch for Embroidery Digitizing",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact Us | Approval Stitch",
        description: "Get in touch with Approval Stitch for professional embroidery digitizing.",
        images: ["/images/hero/embroidery-hero.webp"],
    },
    alternates: {
        canonical: "/contact",
        languages: {
            "en": "/contact",
            "tr": "/tr/iletisim",
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
            "name": "Contact",
            "item": "https://www.approvalstitch.com/contact"
        }
    ]
};

// ContactPage Schema for SEO
const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Approval Stitch",
    "description": "Get in touch with Approval Stitch for professional embroidery digitizing services.",
    "url": "https://www.approvalstitch.com/contact",
    "mainEntity": {
        "@type": "Organization",
        "name": "Approval Stitch",
        "email": "contact@approvalstitch.com",
        "telephone": "+90-548-858-8394",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+90-548-858-8394",
            "contactType": "customer service",
            "availableLanguage": ["English", "Turkish"]
        }
    }
};

export default function ContactPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
            />
            <ContactContent />
        </>
    );
}
