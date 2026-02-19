"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/landing/hero";
import { WhyUs } from "@/components/landing/why-us";
import { Process } from "@/components/landing/process";
import { WhatYouReceive } from "@/components/landing/what-you-receive";
import { Portfolio } from "@/components/landing/portfolio";
import { CTA } from "@/components/landing/cta";
import { IntroSection } from "@/components/landing/intro-section";

export function LandingClient() {
    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[#f8fafc] dark:bg-[#09090b] font-[family-name:var(--font-inter)] selection:bg-primary selection:text-white">
            <Header />
            <main className="flex-grow flex flex-col items-center">
                <Hero />
                <IntroSection />
                <WhatYouReceive />
                <Process />
                <CTA />
            </main>
            <Footer />
        </div>
    );
}
