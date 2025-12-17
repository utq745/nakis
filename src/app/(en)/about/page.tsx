"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";

export default function AboutPage() {
    const { t, language } = useLanguage();
    const ap = t.aboutPage;

    const experienceItems = [
        { icon: "layers", text: ap.experienceItems.density },
        { icon: "swap_horiz", text: ap.experienceItems.pushPull },
        { icon: "settings", text: ap.experienceItems.thread },
        { icon: "dashboard_customize", text: ap.experienceItems.stabilizer },
        { icon: "text_fields", text: ap.experienceItems.smallText },
        { icon: "texture", text: ap.experienceItems.fabric },
    ];

    const deliverItems = [
        { icon: "precision_manufacturing", text: ap.deliverItems.stitchTest },
        { icon: "photo_camera", text: ap.deliverItems.hiResScan },
        { icon: "badge", text: ap.deliverItems.approvalCard },
        { icon: "palette", text: ap.deliverItems.threadList },
        { icon: "assignment", text: ap.deliverItems.needleDetails },
        { icon: "folder_zip", text: ap.deliverItems.dstFile },
    ];

    const missionGoals = [
        { icon: "verified", text: ap.missionGoals.brands, color: "from-blue-500 to-indigo-500" },
        { icon: "visibility", text: ap.missionGoals.production, color: "from-purple-500 to-pink-500" },
        { icon: "sync", text: ap.missionGoals.factories, color: "from-orange-500 to-red-500" },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#f6f6f8] dark:bg-[#101622] font-[family-name:var(--font-inter)]">
            <Header />

            <main className="flex-grow">
                {/* Hero Section - Full Width Gradient */}
                <section className="relative overflow-hidden pt-24 pb-32 bg-gradient-to-br from-[#135bec] via-[#0d47c9] to-[#0a3591]">
                    {/* Animated Background Elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-white/5 blur-3xl animate-pulse"></div>
                        <div className="absolute top-1/2 -left-20 w-60 h-60 rounded-full bg-white/5 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                        <div className="absolute -bottom-20 right-1/4 w-96 h-96 rounded-full bg-white/5 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

                        {/* Dotted Pattern */}
                        <div className="absolute inset-0 opacity-10" style={{
                            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                            backgroundSize: '30px 30px'
                        }}></div>
                    </div>

                    <div className="relative max-w-[1280px] mx-auto px-4 md:px-10">
                        <div className="text-center">
                            <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-6 backdrop-blur-sm border border-white/10">
                                🧵 ApprovalStitch
                            </span>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]">
                                {ap.heroTitle}
                            </h1>
                            <p className="text-xl md:text-2xl text-white/80 max-w-[800px] mx-auto leading-relaxed mb-8">
                                {ap.heroSubtitle}
                            </p>
                            <div className="flex items-center justify-center gap-2 text-white/60">
                                <span className="material-symbols-outlined text-xl">location_on</span>
                                <span className="text-lg">{ap.location}</span>
                            </div>
                        </div>
                    </div>

                    {/* Wave Divider */}
                    <div className="absolute bottom-0 left-0 right-0">
                        <svg viewBox="0 0 1440 120" fill="none" className="w-full h-auto">
                            <path d="M0,64L48,69.3C96,75,192,85,288,85.3C384,85,480,75,576,64C672,53,768,43,864,42.7C960,43,1056,53,1152,58.7C1248,64,1344,64,1392,64L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
                                className="fill-[#f6f6f8] dark:fill-[#101622]" />
                        </svg>
                    </div>
                </section>

                {/* Story Section */}
                <section className="py-20">
                    <div className="max-w-[1280px] mx-auto px-4 md:px-10">
                        <div className="flex flex-col lg:flex-row gap-16 items-center">
                            <div className="flex-1">
                                <span className="text-[#135bec] font-bold text-sm uppercase tracking-wider">{ap.storyTitle}</span>
                                <h2 className="text-3xl md:text-4xl font-black text-[#111318] dark:text-white mt-4 mb-6">
                                    Real Stitching.<br />
                                    <span className="text-[#135bec]">Real Results.</span>
                                </h2>
                                <p className="text-lg text-[#616f89] dark:text-gray-400 leading-relaxed">
                                    {ap.storyContent}
                                </p>
                            </div>
                            <div className="flex-1 relative">
                                <div className="relative aspect-square max-w-[500px] mx-auto">
                                    {/* Decorative Elements */}
                                    <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-[#135bec]/20 rounded-2xl"></div>
                                    <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#135bec]/10 rounded-2xl"></div>

                                    {/* Main Image */}
                                    <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#135bec] to-[#0d47c9] flex items-center justify-center">
                                        <div className="text-center p-8">
                                            <span className="material-symbols-outlined text-[120px] text-white/20">precision_manufacturing</span>
                                            <p className="text-white font-bold text-xl mt-4">Tajima Calibrated</p>
                                            <p className="text-white/60">Single-Head Machine</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Experience Section */}
                <section className="py-20 bg-white dark:bg-[#18212f]">
                    <div className="max-w-[1280px] mx-auto px-4 md:px-10">
                        <div className="text-center mb-16">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#135bec]/10 text-[#135bec] text-sm font-bold mb-4">
                                <span className="material-symbols-outlined text-lg">workspace_premium</span>
                                {ap.experienceSubtitle}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black text-[#111318] dark:text-white mb-4">
                                {ap.experienceTitle}
                            </h2>
                            <p className="text-lg text-[#616f89] dark:text-gray-400 max-w-[600px] mx-auto">
                                {ap.experienceContent}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {experienceItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="group relative p-6 rounded-2xl bg-[#f8f9fc] dark:bg-[#1f2937] border border-[#e5e7eb] dark:border-[#374151] hover:border-[#135bec] dark:hover:border-[#135bec] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#135bec]/10 text-[#135bec] group-hover:bg-[#135bec] group-hover:text-white transition-colors">
                                            <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                                        </div>
                                        <p className="font-semibold text-[#111318] dark:text-white">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <p className="text-center mt-12 text-[#616f89] dark:text-gray-400 italic">
                            "{ap.experienceNote}"
                        </p>
                    </div>
                </section>

                {/* What We Deliver Section */}
                <section className="py-20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#135bec]/5 to-transparent dark:from-[#135bec]/10"></div>

                    <div className="relative max-w-[1280px] mx-auto px-4 md:px-10">
                        <div className="flex flex-col lg:flex-row gap-16">
                            <div className="lg:w-1/3">
                                <span className="text-[#135bec] font-bold text-sm uppercase tracking-wider">{ap.deliverSubtitle}</span>
                                <h2 className="text-3xl md:text-4xl font-black text-[#111318] dark:text-white mt-4 mb-6">
                                    {ap.deliverTitle}
                                </h2>
                                <p className="text-[#616f89] dark:text-gray-400 leading-relaxed">
                                    {ap.deliverNote}
                                </p>
                            </div>

                            <div className="lg:w-2/3">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {deliverItems.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-4 p-5 rounded-xl bg-white dark:bg-[#18212f] shadow-lg border border-[#e5e7eb] dark:border-[#2a3441] hover:shadow-xl transition-shadow"
                                        >
                                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#135bec] to-[#0d47c9] text-white shadow-lg">
                                                <span className="material-symbols-outlined">{item.icon}</span>
                                            </div>
                                            <p className="font-medium text-[#111318] dark:text-white flex-1">{item.text}</p>
                                            <span className="material-symbols-outlined text-green-500">check_circle</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="py-24 bg-[#111318] dark:bg-[#0a0d12] relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}></div>
                    </div>

                    <div className="relative max-w-[1280px] mx-auto px-4 md:px-10">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
                                {ap.missionTitle}
                            </h2>
                            <p className="text-lg text-gray-400 max-w-[800px] mx-auto leading-relaxed">
                                {ap.missionContent}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                            {missionGoals.map((goal, index) => (
                                <div key={index} className="text-center p-8">
                                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${goal.color} text-white mb-4 shadow-lg`}>
                                        <span className="material-symbols-outlined text-4xl">{goal.icon}</span>
                                    </div>
                                    <p className="text-xl font-bold text-white">{goal.text}</p>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
                            <p className="text-xl text-gray-300 leading-relaxed mb-6">
                                {ap.missionPurpose}
                            </p>
                            <p className="text-lg text-gray-400 mb-8">
                                {ap.missionPromise}
                            </p>
                            <blockquote className="text-2xl md:text-3xl font-bold text-white italic text-center">
                                "{ap.missionTagline}"
                            </blockquote>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24">
                    <div className="max-w-[1280px] mx-auto px-4 md:px-10">
                        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#135bec] to-[#0d47c9] p-12 md:p-20 text-center">
                            {/* Decorative Elements */}
                            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>

                            <div className="relative z-10">
                                <span className="material-symbols-outlined text-6xl text-white/30 mb-6">rocket_launch</span>
                                <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
                                    {ap.ctaTitle}
                                </h2>
                                <p className="text-xl text-white/80 mb-8 max-w-[500px] mx-auto">
                                    {ap.ctaContent}
                                </p>
                                <Link href={language === 'tr' ? '/tr/contact' : '/contact'}>
                                    <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[#135bec] font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl hover:shadow-2xl">
                                        <span className="material-symbols-outlined">arrow_forward</span>
                                        {ap.ctaButton}
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
