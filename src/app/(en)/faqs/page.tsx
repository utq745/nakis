import type { Metadata } from "next";
import FAQsContent from "./faqs-content";
import { getDictionary } from "@/lib/get-dictionary";

export const metadata: Metadata = {
    title: "Frequently Asked Questions | Approval Stitch",
    description: "Find answers to common questions about embroidery digitizing, file formats, turnaround times, and our stitch approval process.",
    keywords: ["embroidery digitizing FAQ", "stitch approval questions", "DST file FAQ", "embroidery questions", "digitizing help", "embroidery turnaround time"],
    openGraph: {
        title: "Frequently Asked Questions | Approval Stitch",
        description: "Find answers to common questions about embroidery digitizing, file formats, turnaround times, and our stitch approval process.",
        type: "website",
        images: [
            {
                url: "/images/hero/embroidery-hero.webp",
                width: 1200,
                height: 630,
                alt: "Approval Stitch FAQ - Embroidery Digitizing Questions",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Frequently Asked Questions | Approval Stitch",
        description: "Find answers to common questions about embroidery digitizing.",
        images: ["/images/hero/embroidery-hero.webp"],
    },
    alternates: {
        canonical: "/faqs",
        languages: {
            "en": "/faqs",
            "tr": "/tr/sss",
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
            "name": "FAQ",
            "item": "https://www.approvalstitch.com/faqs"
        }
    ]
};

// FAQ Schema for Rich Snippets - This is critical for Google search results
const dict = getDictionary('en');
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": dict.faqsPage.questions.q1,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": dict.faqsPage.questions.a1
            }
        },
        {
            "@type": "Question",
            "name": dict.faqsPage.questions.q2,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": dict.faqsPage.questions.a2
            }
        },
        {
            "@type": "Question",
            "name": dict.faqsPage.questions.q3,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": dict.faqsPage.questions.a3
            }
        },
        {
            "@type": "Question",
            "name": dict.faqsPage.questions.q4,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": dict.faqsPage.questions.a4
            }
        },
        {
            "@type": "Question",
            "name": dict.faqsPage.questions.q5,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": dict.faqsPage.questions.a5
            }
        },
        {
            "@type": "Question",
            "name": dict.faqsPage.questions.q6,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": dict.faqsPage.questions.a6
            }
        },
        {
            "@type": "Question",
            "name": dict.faqsPage.questions.q7,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": dict.faqsPage.questions.a7
            }
        },
        {
            "@type": "Question",
            "name": dict.faqsPage.questions.q8,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": dict.faqsPage.questions.a8
            }
        },
        {
            "@type": "Question",
            "name": dict.faqsPage.questions.q9,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": dict.faqsPage.questions.a9
            }
        }
    ]
};

export default function FAQPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <FAQsContent />
        </>
    );
}
