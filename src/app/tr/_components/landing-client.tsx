"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/landing/hero";
import dynamic from "next/dynamic";
import { IntroSection } from "@/components/landing/intro-section";

const WhatYouReceive = dynamic(() => import("@/components/landing/what-you-receive").then(mod => mod.WhatYouReceive));
const Process = dynamic(() => import("@/components/landing/process").then(mod => mod.Process));
const FixYourDstBlock = dynamic(() => import("@/components/landing/fix-your-dst-block").then(mod => mod.FixYourDstBlock));
const CTA = dynamic(() => import("@/components/landing/cta").then(mod => mod.CTA));

export function LandingClient() {
    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[#f8fafc] dark:bg-[#09090b] font-[family-name:var(--font-inter)] selection:bg-primary selection:text-white">
            <Header />
            <main id="main-content" tabIndex={-1} className="flex-grow flex flex-col items-center outline-none">
                <Hero />
                <IntroSection />
                <WhatYouReceive />
                <Process />
                <FixYourDstBlock />
                <CTA />
            </main>
            <Footer />
        </div>
    );
}
