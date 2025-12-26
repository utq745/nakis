"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ServicesPage() {
    const { language } = useLanguage();

    const mainServices = [
        {
            id: "approval",
            icon: "verified",
            title: language === 'tr' ? "Onay Örneği (Stitch Proof)" : "Real Stitched Approval",
            desc: language === 'tr'
                ? "Mevcut DST dosyanızı kalibre edilmiş Tajima makinelerimizde işliyor ve size yüksek çözünürlüklü taramasını gönderiyoruz."
                : "We run your existing DST file on our calibrated Tajima machines and provide a high-resolution scan of the actual result.",
            includes: language === 'tr'
                ? ["Gerçek dikiş testi", "Yüksek çözünürlüklü tarama", "İplik renk föyü", "Üretim föyü"]
                : ["Real-world stitch test", "High-resolution scan", "Thread color sheet", "Production datasheet"],
            price: "$25",
            color: "blue"
        },
        {
            id: "fix",
            icon: "build",
            title: language === 'tr' ? "Dosya Düzeltme & Çözüm" : "Fix & Verify Service",
            desc: language === 'tr'
                ? "Sorunlu dosyalarınızı analiz eder, teknik hataları düzeltir ve sonucu dikiş yaparak kanıtlarız."
                : "We analyze your problematic files, fix technical errors (density, pathing, etc.), and prove the result with a stitch-out.",
            includes: language === 'tr'
                ? ["Teknik hata analizi", "Yoğunluk & alt dikiş düzeltme", "Yeniden dikiş testi", "Düzenlenmiş DST teslimi"]
                : ["Technical error analysis", "Density & underlay fix", "Repeat stitch test", "Revised DST delivery"],
            price: "$35",
            highlighted: true,
            color: "indigo"
        },
        {
            id: "digitizing",
            icon: "diamond",
            title: language === 'tr' ? "Tam Dijitalleştirme" : "Full Master Digitizing",
            desc: language === 'tr'
                ? "Çizimlerinizi sıfırdan, endüstriyel standartlarda en temiz dikiş yollarıyla dijitalleştiriyoruz."
                : "We transform your artwork into industrial-grade embroidery files with the cleanest stitch paths from scratch.",
            includes: language === 'tr'
                ? ["Vektör/Görselden dijitalleştirme", "Kumaşa özel ayarlama", "Tüm makine formatları", "Kanıt dikişi dahil"]
                : ["Art-to-Stitch conversion", "Fabric-specific tuning", "All machine formats", "Proven stitch-out included"],
            price: "$60",
            color: "cyan"
        }
    ];

    const technicalExpertise = [
        { icon: "layers", title: "Density & Underlay", desc: "Optimal structure for every fabric type." },
        { icon: "swap_horiz", title: "Push-Pull Compensation", desc: "Precise adjustments for distortion prevention." },
        { icon: "settings", title: "Thread Selection", desc: "Expert thread and needle pairing." },
        { icon: "dashboard_customize", title: "Stabilizer Choice", desc: "Fabric-specific backing recommendations." },
        { icon: "text_fields", title: "Small Text Tuning", desc: "Optimized legibility for fine lettering." },
        { icon: "texture", title: "Fabric Analysis", desc: "Industrial testing for various materials." },
    ];

    const trTechnicalExpertise = [
        { icon: "layers", title: "Yoğunluk ve Alt Dikiş", desc: "Her kumaş türü için optimize edilmiş yapı." },
        { icon: "swap_horiz", title: "Push-Pull Telafisi", desc: "Kumaş esnemesini önleyen hassas ayarlar." },
        { icon: "settings", title: "İplik ve İğne Seçimi", desc: "En iyi sonuçlar için uzman eşleşmeleri." },
        { icon: "dashboard_customize", title: "Tela Seçimi", desc: "Kumaşa özel destekleme tavsiyeleri." },
        { icon: "text_fields", title: "Küçük Yazı Ayarı", desc: "Okunabilir ince yazı dijitalleştirmesi." },
        { icon: "texture", title: "Kumaş Analizi", desc: "Farklı materyaller için endüstriyel testler." },
    ];

    const activeExpertise = language === 'tr' ? trTechnicalExpertise : technicalExpertise;

    return (
        <div className="flex flex-col min-h-screen bg-[#f8fafc] dark:bg-[#09090b] font-[family-name:var(--font-inter)] selection:bg-[#145BEC] selection:text-white">
            <Header />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative pt-32 pb-48 md:pt-40 md:pb-64 overflow-hidden bg-[#172136]">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#145BEC]/20 blur-[120px] rounded-full"
                        />
                        <motion.div
                            animate={{ scale: [1.2, 1, 1.2] }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/15 blur-[100px] rounded-full"
                        />
                    </div>

                    <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
                                <span className="material-symbols-outlined text-white" style={{ fontSize: '20px' }}>precision_manufacturing</span>
                                <span className="text-white/90 text-sm font-bold uppercase tracking-wider">
                                    {language === 'tr' ? "Endüstriyel Standartlar" : "Industrial Standards"}
                                </span>
                            </div>

                            <h1 className="text-white font-black leading-[1.1] mb-6 text-[clamp(2.5rem,5vw,4.5rem)]">
                                {language === 'tr' ? "Hizmetlerimiz" : "Our Specialized Services"}
                            </h1>
                            <p className="text-white/70 text-lg md:text-xl max-w-[700px] mx-auto">
                                {language === 'tr'
                                    ? "Sadece dosya hazırlamıyor, sonucu Tajima makinelerimizde gerçek dikişle kanıtlıyoruz."
                                    : "We don't just prepare files; we prove the result through real stitching on our Tajima machines."}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Core Services Section */}
                <section className="py-20 -mt-32 md:-mt-48 relative z-20">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                            {mainServices.map((service, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`relative group bg-white dark:bg-[#18181b] rounded-[2.5rem] p-8 md:p-10 border border-[#e5e7eb] dark:border-[#27272a] shadow-xl hover:shadow-2xl transition-all ${service.highlighted ? 'md:scale-105 z-10 ring-2 ring-[#145BEC]' : ''}`}
                                >
                                    <div className={`mb-8 w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${service.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                                        service.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
                                            'bg-cyan-50 text-cyan-600'
                                        }`}>
                                        <span className="material-symbols-outlined text-3xl font-bold">{service.icon}</span>
                                    </div>

                                    <h3 className="text-2xl font-black text-[#172136] dark:text-white mb-4">
                                        {service.title}
                                    </h3>
                                    <p className="text-[#616f89] dark:text-gray-400 mb-8 leading-relaxed h-[80px]">
                                        {service.desc}
                                    </p>

                                    <ul className="space-y-3 mb-10">
                                        {service.includes.map((item, iIndex) => (
                                            <li key={iIndex} className="flex items-center gap-3 text-sm font-bold text-[#172136] dark:text-gray-300">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#145BEC]"></span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="pt-8 border-t border-[#e5e7eb] dark:border-[#27272a] flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-bold text-[#616f89] dark:text-gray-500 uppercase tracking-wider">Starting at</p>
                                            <p className="text-3xl font-black text-[#172136] dark:text-white tracking-tight">{service.price}</p>
                                        </div>
                                        <Link href={`/${language}/login`}>
                                            <button className="p-4 rounded-xl bg-[#145BEC] text-white hover:bg-blue-600 transition-colors shadow-lg">
                                                <span className="material-symbols-outlined">arrow_forward</span>
                                            </button>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Technical Expertise */}
                <section className="py-24 bg-white dark:bg-[#0f0f0f]">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl md:text-5xl font-black text-[#172136] dark:text-white mb-6">
                                {language === 'tr' ? "Teknik Uzmanlık" : "Technical Expertise"}
                            </h2>
                            <p className="text-lg text-[#616f89] dark:text-gray-400 max-w-[600px] mx-auto">
                                {language === 'tr'
                                    ? "35 yılı aşkın tecrübemizle nakışın tüm teknik detaylarına hakimiz."
                                    : "With over 35 years of experience, we master every technical detail of embroidery."}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {activeExpertise.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="p-8 rounded-3xl bg-[#f4f6fa] dark:bg-[#18181b] hover:bg-white dark:hover:bg-[#202024] hover:shadow-2xl transition-all border border-transparent hover:border-[#145BEC]/20"
                                >
                                    <div className="mb-6 flex items-center justify-center w-14 h-14 rounded-2xl bg-white dark:bg-[#111318] text-[#145BEC] dark:text-white shadow-inner">
                                        <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                                    </div>
                                    <h4 className="text-xl font-bold dark:text-white mb-2">{item.title}</h4>
                                    <p className="text-[#616f89] dark:text-gray-400">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Laboratory Section */}
                <section className="py-24 bg-[#111318] text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-[#145BEC]/5 skew-x-12 transform translate-x-1/2" />
                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        <div className="flex flex-col lg:flex-row items-center gap-20">
                            <div className="flex-1">
                                <h2 className="text-4xl md:text-5xl font-black mb-8 leading-[1.1]">
                                    {language === 'tr' ? "Gerçek Stitch Lab Deneyimi" : "The Real Stitch Lab Experience"}
                                </h2>
                                <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                                    {language === 'tr'
                                        ? "Simülasyonlar yanıltıcı olabilir. Biz tasarımlarınızı endüstriyel Tajima makinelerinde gerçek kumaşlara işleyerek tüm hataları üretimden önce eliyoruz."
                                        : "Simulations can be misleading. We stitch your designs on real fabrics using industrial Tajima machines, eliminating all errors before mass production."}
                                </p>
                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <h5 className="font-black text-3xl text-white mb-2">Tajima</h5>
                                        <p className="text-[#616f89] text-sm uppercase font-bold tracking-widest">{language === 'tr' ? "Makine Parkuru" : "Calibrated Machines"}</p>
                                    </div>
                                    <div>
                                        <h5 className="font-black text-3xl text-white mb-2">High-Res</h5>
                                        <p className="text-[#616f89] text-sm uppercase font-bold tracking-widest">{language === 'tr' ? "Tarama Kalitesi" : "Lab Scanning"}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 w-full relative">
                                <div className="absolute inset-0 bg-blue-500/20 blur-[80px] rounded-full" />
                                <img
                                    src="/images/Stitching-machine.webp"
                                    alt="Industrial machine"
                                    className="relative z-10 w-full h-auto rounded-[3rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-24 bg-[#f4f6fa] dark:bg-[#0a0a0a]">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="rounded-[3rem] bg-gradient-to-br from-[#145BEC] to-indigo-700 p-12 md:p-20 text-center relative overflow-hidden">
                            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-[1.1]">
                                {language === 'tr' ? "Dosyanızı Test Etmeye Başlayın" : "Ready to Test Your Design?"}
                            </h2>
                            <p className="text-xl text-white/70 mb-12 max-w-[600px] mx-auto">
                                {language === 'tr'
                                    ? "Bugün siparişinizi verin, 24-48 saat içinde üretim onayınızı alın."
                                    : "Place your order today and receive your production approval within 24-48 hours."}
                            </p>
                            <Link href={`/${language}/login`}>
                                <button className="px-10 py-5 bg-white text-[#145BEC] rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl">
                                    {language === 'tr' ? "Sipariş Ver" : "Get Started Now"}
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
