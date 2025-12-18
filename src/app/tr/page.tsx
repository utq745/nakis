"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";

export default function LandingPage() {
  const { t, language } = useLanguage();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f6f8] dark:bg-[#101622] font-[family-name:var(--font-inter)]">
      <Header />
      <main className="flex-grow flex flex-col items-center">
        <section className="w-full max-w-[1280px] px-4 md:px-10 py-12 md:py-20 pt-24 md:pt-32">
          <div className="@container">
            <div className="flex flex-col gap-10 lg:flex-row items-center">
              <div className="flex flex-col gap-6 lg:w-1/2 lg:pr-10">
                <div className="flex flex-col gap-4 text-left">
                  <span className="text-[#135bec] font-bold tracking-wide uppercase text-sm">{t.landing.hero.badge}</span>
                  <h1 className="text-[#111318] dark:text-white font-black leading-[1.1] tracking-[-0.02em]">
                    {t.landing.hero.titleLine1}<br />
                    <span className="text-[#135bec]">{t.landing.hero.titleLine2}</span>
                  </h1>
                  <p className="text-[#616f89] dark:text-gray-300 text-lg font-normal leading-relaxed max-w-[600px]">
                    {t.landing.hero.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link href={`/${language}/login`}>
                    <button className="flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-[#135bec] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl">
                      <span className="truncate">{t.landing.hero.uploadBtn}</span>
                    </button>
                  </Link>
                  <Link href="#">
                    <button className="flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-white dark:bg-[#1f2937] border border-[#dbdfe6] dark:border-[#374151] text-[#111318] dark:text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-gray-50 dark:hover:bg-[#374151] transition-all">
                      <span className="truncate">{t.landing.hero.pricingBtn}</span>
                    </button>
                  </Link>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#616f89] dark:text-gray-400 mt-2">
                  <span className="material-symbols-outlined text-[18px] text-green-600">verified</span>
                  <span>{t.landing.hero.labBadge}</span>
                  <span className="mx-2">•</span>
                  <span className="material-symbols-outlined text-[18px] text-green-600">check_circle</span>
                  <span>{t.landing.hero.readyBadge}</span>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-[#2a3441]" data-alt="Close up of a vibrant embroidered patch being stitched on fabric" style={{ backgroundImage: 'url("/images/hero/embroidery-hero.webp")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-white dark:bg-[#18212f] border-y border-[#f0f2f4] dark:border-[#2a3441] py-16">
          <div className="max-w-[1280px] mx-auto px-4 md:px-10">
            <div className="text-center mb-12">
              <h2 className="text-[#111318] dark:text-white font-black leading-tight">
                {t.landing.why.title}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col gap-4 p-6 rounded-xl bg-[#f8f9fc] dark:bg-[#1f2937] border border-[#eff1f5] dark:border-[#374151] text-center transition-transform hover:-translate-y-1 duration-300">
                <div className="mb-2 inline-flex items-center justify-center size-16 rounded-full bg-[#135bec]/10 text-[#135bec] self-center">
                  <span className="material-symbols-outlined text-4xl">precision_manufacturing</span>
                </div>
                <h3 className="text-[#111318] dark:text-white tracking-tight font-bold leading-tight">{t.landing.why.card1Title}</h3>
                <p className="text-[#616f89] dark:text-gray-400 text-sm leading-relaxed">
                  {t.landing.why.card1Desc}
                </p>
              </div>
              <div className="flex flex-col gap-4 p-6 rounded-xl bg-[#f8f9fc] dark:bg-[#1f2937] border border-[#eff1f5] dark:border-[#374151] text-center transition-transform hover:-translate-y-1 duration-300">
                <div className="mb-2 inline-flex items-center justify-center size-16 rounded-full bg-[#135bec]/10 text-[#135bec] self-center">
                  <span className="material-symbols-outlined text-4xl">wysiwyg</span>
                </div>
                <h3 className="text-[#111318] dark:text-white tracking-tight font-bold leading-tight">{t.landing.why.card2Title}</h3>
                <p className="text-[#616f89] dark:text-gray-400 text-sm leading-relaxed">
                  {t.landing.why.card2Desc}
                </p>
              </div>
              <div className="flex flex-col gap-4 p-6 rounded-xl bg-[#f8f9fc] dark:bg-[#1f2937] border border-[#eff1f5] dark:border-[#374151] text-center transition-transform hover:-translate-y-1 duration-300">
                <div className="mb-2 inline-flex items-center justify-center size-16 rounded-full bg-[#135bec]/10 text-[#135bec] self-center">
                  <span className="material-symbols-outlined text-4xl">verified</span>
                </div>
                <h3 className="text-[#111318] dark:text-white tracking-tight font-bold leading-tight">{t.landing.why.card3Title}</h3>
                <p className="text-[#616f89] dark:text-gray-400 text-sm leading-relaxed">
                  {t.landing.why.card3Desc}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full max-w-[1280px] px-4 md:px-10 py-20">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4 text-center items-center">
              <span className="text-[#135bec] font-bold tracking-wide uppercase text-sm">{t.landing.process.badge}</span>
              <h2 className="text-[#111318] dark:text-white font-black leading-tight max-w-[720px]">
                {t.landing.process.title}
              </h2>
              <p className="text-[#616f89] dark:text-gray-400 text-base md:text-lg font-normal leading-normal max-w-[600px]">
                {t.landing.process.description}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: "01", icon: "cloud_upload", title: t.landing.process.step1Title,
                  desc: t.landing.process.step1Desc
                },
                {
                  step: "02", icon: "tune", title: t.landing.process.step2Title,
                  desc: t.landing.process.step2Desc
                },
                {
                  step: "03", icon: "memory", title: t.landing.process.step3Title,
                  desc: t.landing.process.step3Desc
                },
                {
                  step: "04", icon: "verified_user", title: t.landing.process.step4Title,
                  desc: t.landing.process.step4Desc
                }
              ].map((item, index) => (
                <div key={index} className="flex flex-col gap-4 rounded-xl border border-[#dbdfe6] dark:border-[#374151] bg-white dark:bg-[#1f2937] p-6 hover:shadow-lg transition-shadow relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 text-6xl font-black text-[#f0f2f4] dark:text-[#2a3441] opacity-50 select-none group-hover:scale-110 transition-transform">{item.step}</div>
                  <div className="text-[#135bec] z-10">
                    <span className="material-symbols-outlined text-[40px]">{item.icon}</span>
                  </div>
                  <div className="flex flex-col gap-2 z-10">
                    <h3 className="text-[#111318] dark:text-white font-bold leading-tight">{item.title}</h3>
                    <p className="text-[#616f89] dark:text-gray-400 text-sm font-normal leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full bg-[#f0f2f4] dark:bg-[#18212f] py-20">
          <div className="max-w-[1280px] mx-auto px-4 md:px-10 flex flex-col gap-10">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
              <div className="flex flex-col gap-4">
                <span className="text-[#135bec] font-bold tracking-wide uppercase text-sm">{t.landing.portfolio.badge}</span>
                <h2 className="text-[#111318] dark:text-white font-black leading-tight">
                  {t.landing.portfolio.title}
                </h2>
                <p className="text-[#616f89] dark:text-gray-400 text-base font-normal max-w-[600px]">
                  {t.landing.portfolio.description}
                </p>
              </div>
              <Link className="flex items-center gap-2 text-[#135bec] font-bold hover:underline" href="#">
                {t.landing.portfolio.viewAll} <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: t.landing.portfolio.item1Title, subtitle: t.landing.portfolio.item1Sub, bg: "/images/portfolio/portfolio-1.webp" },
                { title: t.landing.portfolio.item2Title, subtitle: t.landing.portfolio.item2Sub, bg: "/images/portfolio/portfolio-2.webp" },
                { title: t.landing.portfolio.item3Title, subtitle: t.landing.portfolio.item3Sub, bg: "/images/portfolio/portfolio-3.webp" },
                { title: t.landing.portfolio.item4Title, subtitle: t.landing.portfolio.item4Sub, bg: "/images/portfolio/portfolio-4.webp" }
              ].map((item, index) => (
                <div key={index} className="group relative overflow-hidden rounded-xl aspect-square cursor-pointer">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url("${item.bg}")` }}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                    <p className="text-white text-lg font-bold">{item.title}</p>
                    <p className="text-white/80 text-sm">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full max-w-[1280px] px-4 md:px-10 py-24">
          <div className="flex flex-col md:flex-row items-center gap-12 rounded-3xl bg-[#135bec] p-8 md:p-16 text-white shadow-2xl overflow-hidden relative">
            <div className="absolute -top-24 -right-24 size-96 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 size-96 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
            <div className="flex flex-col gap-6 flex-1 relative z-10">
              <div className="flex items-center gap-2 text-white/80">
                <span className="material-symbols-outlined text-[24px]">star</span>
                <span className="material-symbols-outlined text-[24px]">star</span>
                <span className="material-symbols-outlined text-[24px]">star</span>
                <span className="material-symbols-outlined text-[24px]">star</span>
                <span className="material-symbols-outlined text-[24px]">star</span>
                <span className="font-medium ml-2">{t.landing.cta.rating}</span>
              </div>
              <h2 className="font-black leading-tight tracking-tight">
                {t.landing.cta.title}
              </h2>
              <p className="text-lg text-white/90 max-w-[500px]">
                {t.landing.cta.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link href={`/${language}/login`}>
                  <button className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-lg h-14 px-8 bg-white text-[#135bec] text-lg font-bold hover:bg-gray-100 transition-colors shadow-lg">
                    {t.landing.cta.startBtn}
                  </button>
                </Link>
                <Link href="#">
                  <button className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-lg h-14 px-8 bg-black/20 text-white border border-white/20 text-lg font-bold hover:bg-black/30 transition-colors">
                    {t.landing.cta.contactBtn}
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex-1 w-full relative z-10 hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <p className="text-xl font-medium italic mb-6">{t.landing.cta.testimonial}</p>
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-full bg-cover bg-center" data-alt="Profile picture of testimonial author" style={{ backgroundImage: 'url("/images/avatars/testimonial-author.webp")' }}></div>
                  <div>
                    <p className="font-bold">{t.landing.cta.author}</p>
                    <p className="text-sm text-white/70">{t.landing.cta.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
