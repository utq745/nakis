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
                  <h1 className="text-[#111318] dark:text-white text-4xl font-black leading-[1.1] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
                    {t.landing.hero.titleLine1}<br />
                    <span className="text-[#135bec]">{t.landing.hero.titleLine2}</span>
                  </h1>
                  <h2 className="text-[#616f89] dark:text-gray-300 text-lg font-normal leading-relaxed max-w-[600px]">
                    {t.landing.hero.description}
                  </h2>
                </div>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link href={language === 'tr' ? '/tr/login' : '/login'}>
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
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-[#2a3441]" data-alt="Close up of a vibrant embroidered patch being stitched on fabric" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCNJT6F3rMiSQJR5J_U0dP9sAs-k6K_dEkfamP490pW2tXKZA7IMEHMhH5rnJYMnUTyRB20eldjAP1pwzBSoxpL87-92NmRPzj5npHeDuwaglbsoRDh9Rt91ke5018DSYM1zOouayeSXx5uo9aYlEBhO5CeJAdPy0OBT4uo7Ym1GT1Htt8Doc8FIfk84GJKJmiP2R9ieYQs6L5uxljTYLjhSbvTDmFwPekZBUr1Iv_mIyaOCJ2RC-yGA3D8UCuUAqt66ja1cLEaeH8")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-white dark:bg-[#18212f] border-y border-[#f0f2f4] dark:border-[#2a3441] py-16">
          <div className="max-w-[1280px] mx-auto px-4 md:px-10">
            <div className="text-center mb-12">
              <h2 className="text-[#111318] dark:text-white text-3xl md:text-4xl font-black leading-tight">
                {t.landing.why.title}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col gap-4 p-6 rounded-xl bg-[#f8f9fc] dark:bg-[#1f2937] border border-[#eff1f5] dark:border-[#374151] text-center transition-transform hover:-translate-y-1 duration-300">
                <div className="mb-2 inline-flex items-center justify-center size-16 rounded-full bg-[#135bec]/10 text-[#135bec] self-center">
                  <span className="material-symbols-outlined text-4xl">precision_manufacturing</span>
                </div>
                <h3 className="text-[#111318] dark:text-white tracking-tight text-xl font-bold leading-tight">{t.landing.why.card1Title}</h3>
                <p className="text-[#616f89] dark:text-gray-400 text-sm leading-relaxed">
                  {t.landing.why.card1Desc}
                </p>
              </div>
              <div className="flex flex-col gap-4 p-6 rounded-xl bg-[#f8f9fc] dark:bg-[#1f2937] border border-[#eff1f5] dark:border-[#374151] text-center transition-transform hover:-translate-y-1 duration-300">
                <div className="mb-2 inline-flex items-center justify-center size-16 rounded-full bg-[#135bec]/10 text-[#135bec] self-center">
                  <span className="material-symbols-outlined text-4xl">wysiwyg</span>
                </div>
                <h3 className="text-[#111318] dark:text-white tracking-tight text-xl font-bold leading-tight">{t.landing.why.card2Title}</h3>
                <p className="text-[#616f89] dark:text-gray-400 text-sm leading-relaxed">
                  {t.landing.why.card2Desc}
                </p>
              </div>
              <div className="flex flex-col gap-4 p-6 rounded-xl bg-[#f8f9fc] dark:bg-[#1f2937] border border-[#eff1f5] dark:border-[#374151] text-center transition-transform hover:-translate-y-1 duration-300">
                <div className="mb-2 inline-flex items-center justify-center size-16 rounded-full bg-[#135bec]/10 text-[#135bec] self-center">
                  <span className="material-symbols-outlined text-4xl">verified</span>
                </div>
                <h3 className="text-[#111318] dark:text-white tracking-tight text-xl font-bold leading-tight">{t.landing.why.card3Title}</h3>
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
              <h2 className="text-[#111318] dark:text-white text-3xl md:text-4xl font-black leading-tight max-w-[720px]">
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
                    <h3 className="text-[#111318] dark:text-white text-xl font-bold leading-tight">{item.title}</h3>
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
                <h2 className="text-[#111318] dark:text-white text-3xl md:text-4xl font-black leading-tight">
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
                { title: t.landing.portfolio.item1Title, subtitle: t.landing.portfolio.item1Sub, bg: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-Or1WdwhKvaoR9nGqhXmAyTJjrQCgshptIm8rChVaqpbTmkXgtrfCKpTDMe0HiAHVw8pbXMco2HXRvha_MPLplM3rDevJafNnOph1q-5yFgzsDqfb9vY8OVnJfxumeSUhFGBui5NavTw3xDkGhbNYPaIqFjwZRPZkjfDBdDh3mqHKW-vW1evAJrIr_916MM60pQcR5i7lDemCUW8r7FtMSivBdYPIKdsFaXBT8WlHiMa6-4YpOq-BYcbxGqfkICpAgUObXZcqxI4" },
                { title: t.landing.portfolio.item2Title, subtitle: t.landing.portfolio.item2Sub, bg: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGU95bHDxOs5N4LcbD2cHYutemyFL2G51SQ9ghzRcLb55B2Xwj31cTpPTXyed1jfSHHp5UXUq2-ZrNoalQ_Khqv5wYCitA__ADOfJUMRHtELzOjDuupEbgN2mlsdqY-EVySEa5jQn3iwvvQpbJBLxS5kV1oltnJveGYYgz0phyMnJVo5u0xomDhqLNMIYCHJac285hvH_w7nC19nb3Eh9vxbFH5KjbsQalcyphB1jE3TDIZ5V7cinp4An-mUwk-z3ba1czM7jQgn8" },
                { title: t.landing.portfolio.item3Title, subtitle: t.landing.portfolio.item3Sub, bg: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzNezx_31Jc13_IngWhnnWZRVOUQZom7n_lxjrabJTdgvE2bRImHIduOlGA-XOFdrq9U5FJJUteAxM99QlUC9XvIIPxkXCKVij6PzW_Cnlr9rj02wvyQiPPKpLdr-cNHpuvQPQVU_e2mPieK0fMZZ187gtCNO6hMiN1h2ZBtwIcBhqJ_cQZ_bTtbRakNQyKtzGS-hZldc8dqvuaf6cTopfAiZaMPzZO75cOL_BcvYLzdGJGIqHFsYowLDu2RsxiytceyFg93rkXoM" },
                { title: t.landing.portfolio.item4Title, subtitle: t.landing.portfolio.item4Sub, bg: "https://lh3.googleusercontent.com/aida-public/AB6AXuBj1UVF8zsrVw02INhbU7zf285kP8S_ocNj4UvrBnFvegx4q5t_idXxJV8WOBc5W_hu2RZm6M0k1-4lXTx48VvpKy7SDVGGS7lPXMLwbBXpyu_2pq6u4e_dA2lSQQYzh0MPM-l4WHqv0g94YzRvUlabkey8bMzj50NjNJNsTVwiBTGYUSaBtR7TX-MyiVtdvLMkbMsF-z1PoN21JyJtgCXWcBmnVQmhtF1H4ftJGiG4sqpM39F1qRrxVqIIoiVWjx0m1YOL-_vGf9Q" }
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
              <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tight">
                {t.landing.cta.title}
              </h2>
              <p className="text-lg text-white/90 max-w-[500px]">
                {t.landing.cta.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link href={language === 'tr' ? '/tr/login' : '/login'}>
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
                  <div className="size-12 rounded-full bg-cover bg-center" data-alt="Profile picture of testimonial author" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCyfxJWwTIIoi_wmHJ9wStewza7NODn7bCKmZPapOLQS993Wm4vCaz3-FHry_3H_49UYt89dis5FRPucxQHe9vFNjGH2VnwXlFmDnNCuyJX5Dgw5QzZpjZX9DevMmj14hQcyyDEIdeboen7UjxSmAifN9gIymzRFYWHtbxSZex05sqa474uKJv63gDiIBXeCbvp5VEWEbzXhLOvnK-1_eueDpINkdKr0MOPdeVIOC2-9gOjXkz0WS7NHRaD4HX5VUG0H3zuBqDyDXw")' }}></div>
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
