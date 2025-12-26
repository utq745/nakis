
import type { Metadata } from "next";
import { getDictionary } from "@/lib/get-dictionary";
import { FAQClient } from "./_components/faq-client";

export async function generateMetadata(): Promise<Metadata> {
    const dict = getDictionary('tr');

    return {
        title: "Sıkça Sorulan Sorular - Approval Stitch",
        description: dict.faqsPage.hero.description,
        alternates: {
            canonical: 'https://www.approvalstitch.com/tr/sss',
        },
        openGraph: {
            title: "Sıkça Sorulan Sorular - Approval Stitch",
            description: dict.faqsPage.hero.description,
            url: 'https://www.approvalstitch.com/tr/sss',
            locale: 'tr_TR',
        },
    };
}

export default function FAQPage() {
    const dict = getDictionary('tr');
    const faqs = dict.faqsPage;

    // Collect all questions for Schema
    const allQuestions = [
        { q: faqs.questions.q1, a: faqs.questions.a1 },
        { q: faqs.questions.q2, a: faqs.questions.a2 },
        { q: faqs.questions.q3, a: faqs.questions.a3 },
        { q: faqs.questions.q4, a: faqs.questions.a4 },
        { q: faqs.questions.q5, a: faqs.questions.a5 },
        { q: faqs.questions.q6, a: faqs.questions.a6 },
        { q: faqs.questions.q7, a: faqs.questions.a7 },
        { q: faqs.questions.q8, a: faqs.questions.a8 },
        { q: faqs.questions.q9, a: faqs.questions.a9 },
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": allQuestions.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
            }
        }))
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <FAQClient />
        </>
    );
}
