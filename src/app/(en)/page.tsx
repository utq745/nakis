import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/landing/hero";
import { WhyUs } from "@/components/landing/why-us";
import { Process } from "@/components/landing/process";
import { Portfolio } from "@/components/landing/portfolio";
import { CTA } from "@/components/landing/cta";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Embroidery Digitizing & Stitch Approval | Approval Stitch",
  description: "Get production-ready embroidery files with real stitch verification. We test your designs on Tajima machines and deliver high-resolution scans. 35+ years of expertise. Fast 24-48h turnaround.",
  keywords: ["embroidery digitizing", "stitch approval", "DST file conversion", "embroidery file format", "Tajima embroidery", "embroidery digitizing service", "stitched sample approval", "professional digitizing", "embroidery machine files"],
  openGraph: {
    title: "Professional Embroidery Digitizing & Stitch Approval",
    description: "Get production-ready embroidery files with real stitch verification on Tajima machines. 35+ years of expertise.",
    type: "website",
    images: [
      {
        url: "/images/hero/embroidery-hero.webp",
        width: 1200,
        height: 630,
        alt: "Approval Stitch - Professional Embroidery Digitizing Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Embroidery Digitizing & Stitch Approval",
    description: "Get production-ready embroidery files with real stitch verification on Tajima machines.",
    images: ["/images/hero/embroidery-hero.webp"],
  },
  alternates: {
    canonical: "/",
    languages: {
      "en": "/",
      "tr": "/tr",
    },
  },
};

export default function LandingPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[#f8fafc] dark:bg-[#09090b] font-[family-name:var(--font-inter)] selection:bg-primary selection:text-white">
      <Header />
      <main className="flex-grow flex flex-col items-center">
        <Hero />
        <WhyUs />
        <Process />
        <Portfolio />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
