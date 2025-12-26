
import type { Metadata } from "next";
import { getDictionary } from "@/lib/get-dictionary";
import { LandingClient } from "./_components/landing-client";

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary('tr');

  return {
    title: `${dict.landing.hero.titleLine1} ${dict.landing.hero.titleLine2} - Approval Stitch`,
    description: dict.landing.hero.description,
    alternates: {
      canonical: 'https://www.approvalstitch.com/tr',
    },
    openGraph: {
      title: `${dict.landing.hero.titleLine1} ${dict.landing.hero.titleLine2}`,
      description: dict.landing.hero.description,
      url: 'https://www.approvalstitch.com/tr',
      locale: 'tr_TR',
    },
  };
}

export default function LandingPage() {
  const dict = getDictionary('tr');

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Approval Stitch - Profesyonel Nakış Dijitalleştirme",
    "description": dict.landing.hero.description,
    "publisher": {
      "@type": "Organization",
      "name": "Approval Stitch",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.approvalstitch.com/images/approval-stitch-logo.png"
      }
    },
    "offers": {
      "@type": "Offer",
      "price": "25.00",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingClient />
    </>
  );
}
