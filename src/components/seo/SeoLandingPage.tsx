"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CTA } from "@/components/landing/cta";
import { WhyUs } from "@/components/landing/why-us";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface SeoLandingPageProps {
    title: string;
    content: React.ReactNode;
    imageSrc: string;
    imageAlt: string;
}

export function SeoLandingPage({ title, content, imageSrc, imageAlt }: SeoLandingPageProps) {
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f8fafc] dark:bg-[#09090b] font-sans selection:bg-primary selection:text-white">
            <Header />

            <main className="flex-grow flex flex-col items-center pt-24 md:pt-32">
                {/* Article Section */}
                <section className="container mx-auto px-4 md:px-6 w-full max-w-5xl mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <div className="flex flex-col gap-6">
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                                {title}
                            </h1>
                            <div className="prose prose-lg dark:prose-invert prose-slate max-w-none text-slate-600 dark:text-slate-300 leading-relaxed">
                                {content}
                            </div>
                        </div>

                        <div className="sticky top-32">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white dark:border-zinc-800 bg-slate-100 dark:bg-slate-900 group">
                                <Image
                                    src={imageSrc}
                                    alt={imageAlt}
                                    width={600}
                                    height={600}
                                    priority
                                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
                            </div>

                            <div className="mt-8 flex justify-center lg:justify-start">
                                <Link href="/orders/new">
                                    <button className="px-8 h-14 bg-primary text-white rounded-xl font-black text-lg shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all flex items-center gap-3 group">
                                        Start Your Order Now
                                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us */}
                <WhyUs />

                {/* Custom FAQ for SEO pages */}
                <section className="w-full py-24 bg-white dark:bg-zinc-950">
                    <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                                Frequently Asked Questions
                            </h2>
                        </div>

                        <div className="divide-y divide-slate-200 dark:divide-zinc-800">
                            <details className="group py-6" open>
                                <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-lg text-slate-900 dark:text-white">
                                    What exactly is an embroidery approval sample?
                                    <span className="transition group-open:rotate-180">
                                        <ChevronDown className="w-5 h-5 text-slate-500" />
                                    </span>
                                </summary>
                                <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                                    An approval sample (or stitch-out test) is a physical test run of your embroidery design. Before you commit to running a large batch, we stitch the design onto actual fabric, verify the quality, and send you detailed scans so you can confidently approve the final result.
                                </p>
                            </details>

                            <details className="group py-6">
                                <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-lg text-slate-900 dark:text-white">
                                    Can you fix my existing DST files?
                                    <span className="transition group-open:rotate-180">
                                        <ChevronDown className="w-5 h-5 text-slate-500" />
                                    </span>
                                </summary>
                                <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Yes! If you already have a DST file that is causing production issues (thread breaks, poor tension, wrong density), our expert digitizers can adjust and correct the file. We then run a fresh sample to prove the issue is resolved.
                                </p>
                            </details>

                            <details className="group py-6">
                                <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-lg text-slate-900 dark:text-white">
                                    What machine do you use for your test stitches?
                                    <span className="transition group-open:rotate-180">
                                        <ChevronDown className="w-5 h-5 text-slate-500" />
                                    </span>
                                </summary>
                                <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                                    We use industry-standard commercial embroidery machines, including Tajima and Barudan models. This ensures that the results we get will perfectly mirror what you can expect on your own factory floor.
                                </p>
                            </details>

                            <details className="group py-6">
                                <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-lg text-slate-900 dark:text-white">
                                    How fast is your turnaround time?
                                    <span className="transition group-open:rotate-180">
                                        <ChevronDown className="w-5 h-5 text-slate-500" />
                                    </span>
                                </summary>
                                <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Most standard samples and file fixes are completed within 24 to 48 hours. Complex digitizing tasks may take slightly longer, but our goal is always to keep your production moving quickly.
                                </p>
                            </details>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <CTA />
            </main>

            <Footer />
        </div>
    );
}
