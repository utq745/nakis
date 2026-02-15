import type { Metadata } from "next";
import AboutContent from "./about-content";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "About Approval Stitch | 35+ Years of Embroidery Expertise",
    description: "Learn about Approval Stitch's 35+ years of embroidery digitizing experience. We deliver production-ready DST files with real stitch verification on Tajima machines.",
    keywords: ["about approval stitch", "embroidery digitizing company", "Tajima embroidery", "35 years experience", "professional digitizing", "embroidery experts"],
    openGraph: {
        title: "About Approval Stitch | 35+ Years of Embroidery Expertise",
        description: "Learn about Approval Stitch's 35+ years of embroidery digitizing experience. We deliver production-ready DST files with real stitch verification on Tajima machines.",
        type: "website",
        images: [
            {
                url: "/images/Stitching-machine.webp",
                width: 1200,
                height: 630,
                alt: "Professional Tajima embroidery machine at Approval Stitch",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "About Approval Stitch | 35+ Years of Embroidery Expertise",
        description: "Learn about Approval Stitch's 35+ years of embroidery digitizing experience.",
        images: ["/images/Stitching-machine.webp"],
    },
    alternates: {
        canonical: "/about",
        languages: {
            "en": "/about",
            "tr": "/tr/hakkimizda",
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
            "name": "About Us",
            "item": "https://www.approvalstitch.com/about"
        }
    ]
};

export default function AboutPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <Suspense fallback={null}>
                <AboutContent />
            </Suspense>
        </>
    );
}
