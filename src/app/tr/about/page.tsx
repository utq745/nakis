"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutPage() {
    const { t, language } = useLanguage();

    const experienceItems = [
        { icon: "layers", title: "Yoğunluk & Alt Yapı", desc: "Her kumaş tipi için optimal dikiş yoğunluğu ve alt yapı" },
        { icon: "swap_horiz", title: "İtme-Çekme Telafisi", desc: "Kumaş bozulmasını önlemek için hassas ayarlamalar" },
        { icon: "settings", title: "İplik Seçimi", desc: "En iyi sonuçlar için uzman iplik ve iğne eşleştirmesi" },
        { icon: "dashboard_customize", title: "Stabilizatör Seçimi", desc: "Kumaşa özel stabilizatör önerileri" },
        { icon: "text_fields", title: "Küçük Metin Ayarı", desc: "İnce harfler için optimize edilmiş okunabilirlik" },
        { icon: "texture", title: "Kumaş Analizi", desc: "Malzeme özelliklerine göre davranış tahmini" },
    ];

    const deliverItems = [
        { icon: "precision_manufacturing", text: "Kalibreli Tajima'da gerçek dikiş testi" },
        { icon: "photo_camera", text: "Sonucun yüksek çözünürlüklü taraması" },
        { icon: "badge", text: "Seçtiğiniz şablonda onay kartı" },
        { icon: "palette", text: "İplik renk listesi (Madeira / Robison-Anton / Isacord)" },
        { icon: "assignment", text: "İğne ve stabilizatör detayları" },
        { icon: "folder_zip", text: "Üretime hazır DST dosyası" },
    ];

    const stats = [
        { value: "35+", label: "Yıllık Deneyim" },
        { value: "10K+", label: "Tamamlanan Proje" },
        { value: "24s", label: "Ort. Teslim Süresi" },
        { value: "%100", label: "Doğruluk Oranı" },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#f8fafc] dark:bg-[#09090b] font-[family-name:var(--font-inter)]">
            <Header />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-[#172136]">
                    {/* Animated Background */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#145BEC]/15 blur-[120px] rounded-full"
                        />
                        <motion.div
                            animate={{ scale: [1.2, 1, 1.2], rotate: [0, -45, 0] }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-400/10 blur-[120px] rounded-full"
                        />
                        <div className="absolute inset-0 opacity-5" style={{
                            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }} />
                    </div>

                    <div className="container mx-auto px-4 md:px-6 relative z-10 py-20">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            {/* Left Content */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
                                    <span className="size-2 rounded-full bg-[#145BEC] animate-pulse" />
                                    <span className="text-white/80 text-xs font-bold tracking-[0.2em] uppercase">Biz Kimiz</span>
                                </div>

                                <h1 className="text-white font-black leading-[1.1] mb-8 text-[clamp(2.5rem,5vw,4rem)]">
                                    Gerçek Nakış.<br />
                                    <span className="bg-gradient-to-r from-[#145BEC] to-[#4f86f7] bg-clip-text text-transparent">
                                        Gerçek Sonuçlar.
                                    </span>
                                </h1>

                                <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-8 max-w-[500px]">
                                    Dünya çapında markalar, üreticiler ve promosyon şirketleri için gerçek dikişli onay örnekleri üreten özel bir stüdyoyuz.
                                </p>

                                <div className="flex items-center gap-3 text-white/60">
                                    <span className="material-symbols-outlined">location_on</span>
                                    <span>İstanbul merkezli, ABD, Kanada ve Avrupa'daki müşterilere hizmet veriyoruz.</span>
                                </div>
                            </motion.div>

                            {/* Right Stats */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="grid grid-cols-2 gap-6"
                            >
                                {stats.map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300"
                                    >
                                        <p className="text-4xl md:text-5xl font-black text-white mb-2">{stat.value}</p>
                                        <p className="text-white/60 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Story Section */}
                <section className="py-24 bg-white dark:bg-[#0f0f0f]">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="relative">
                                <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-[#145BEC]/20 rounded-2xl" />
                                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#145BEC]/10 rounded-2xl" />
                                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                                    <img
                                        src="/images/Stitching-machine.webp"
                                        alt="Tajima Kalibreli Tek Kafalı Makine"
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            </div>
                            <div>
                                <span className="text-[#145BEC] font-bold text-sm uppercase tracking-wider">Hikayemiz</span>
                                <h2 className="font-black text-[#111318] dark:text-white mt-4 mb-6">
                                    35+ Yıllık Nakış Uzmanlığı
                                </h2>
                                <p className="text-lg text-[#616f89] dark:text-gray-400 leading-relaxed mb-6">
                                    Mevcut nakış dosyanızı kalibre edilmiş bir Tajima makinesinde çalıştırıyor, ardından gerçek dikiş sonucunu yansıtan temiz, detaylı yüksek çözünürlüklü bir tarama sunuyoruz — tahmin veya simülasyon değil.
                                </p>
                                <p className="text-[#616f89] dark:text-gray-400 leading-relaxed">
                                    Onlarca yıllık uygulamalı deneyimimizle, dikişlerin gerçek koşullarda nasıl davrandığını anlıyoruz. Her dosya test edilir, her sonuç doğrulanır.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Experience Grid */}
                <section className="py-24 bg-[#f4f6fa] dark:bg-[#0a0a0a]">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#145BEC]/10 text-[#145BEC] text-sm font-bold mb-4">
                                <span className="material-symbols-outlined text-lg">workspace_premium</span>
                                Uzmanlığımız
                            </span>
                            <h2 className="font-black text-[#111318] dark:text-white mb-4">
                                Her Detayda Teknik Hassasiyet
                            </h2>
                            <p className="text-lg text-[#616f89] dark:text-gray-400 max-w-[600px] mx-auto">
                                Her dikişli örnek, tam makine performansını ortaya koymak için hazırlanır ve taranır.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {experienceItems.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="group bg-white dark:bg-[#18181b] rounded-2xl p-6 border border-[#e5e7eb] dark:border-[#27272a] hover:border-[#145BEC] dark:hover:border-[#145BEC] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >
                                    <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#145BEC]/10 text-[#145BEC] group-hover:bg-[#145BEC] group-hover:text-white transition-colors mb-4">
                                        <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                                    </div>
                                    <h4 className="font-bold text-[#111318] dark:text-white mb-2">{item.title}</h4>
                                    <p className="text-sm text-[#616f89] dark:text-gray-400">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* What We Deliver */}
                <section className="py-24 bg-white dark:bg-[#0f0f0f]">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                            <div>
                                <span className="text-[#145BEC] font-bold text-sm uppercase tracking-wider">Ne Sunuyoruz</span>
                                <h2 className="font-black text-[#111318] dark:text-white mt-4 mb-6">
                                    Kapsamlı Onay Paketi
                                </h2>
                                <p className="text-[#616f89] dark:text-gray-400 leading-relaxed mb-8">
                                    Seçtiğiniz onay kartı şablonu, son örneğinizin düzenini, boyutunu, etiketleme ve ölçüm stilini belirler.
                                </p>
                                <Link href={language === 'tr' ? '/tr/contact' : '/contact'}>
                                    <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#145BEC] text-white font-bold hover:bg-blue-600 transition-colors">
                                        <span className="material-symbols-outlined">arrow_forward</span>
                                        Başlayın
                                    </button>
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                {deliverItems.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        className="flex items-center gap-4 p-4 rounded-xl bg-[#f4f6fa] dark:bg-[#18181b] border border-transparent hover:border-[#145BEC]/30 transition-all"
                                    >
                                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#145BEC] to-[#0d47c9] text-white shadow-lg">
                                            <span className="material-symbols-outlined">{item.icon}</span>
                                        </div>
                                        <p className="font-medium text-[#111318] dark:text-white flex-1">{item.text}</p>
                                        <span className="material-symbols-outlined text-green-500">check_circle</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="py-24 bg-[#111318] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }} />
                    </div>

                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        <div className="text-center max-w-4xl mx-auto">
                            <h2 className="font-black text-white mb-8">Misyonumuz</h2>
                            <p className="text-xl text-gray-300 leading-relaxed mb-8">
                                Misyonumuz, nakış üretim sürecine kesinlik, netlik ve hassasiyet getirmektir. Seri üretimdeki sorunların çoğu varsayımlardan kaynaklanır: yoğunluk sorunları, iplik kopmaları, okunamayan küçük metinler, yanlış telafi veya belirli kumaşlarda beklenmeyen bozulma.
                            </p>
                            <blockquote className="text-2xl md:text-3xl font-bold text-white italic border-l-4 border-[#145BEC] pl-6 text-left">
                                "Gerçekten test et, gerçekten doğrula ve tüm belirsizliği ortadan kaldıran bir sonuç gönder."
                            </blockquote>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                            {[
                                { icon: "verified", text: "Markalara güven", color: "from-blue-500 to-indigo-500" },
                                { icon: "visibility", text: "Üretim ekiplerine netlik", color: "from-purple-500 to-pink-500" },
                                { icon: "sync", text: "Fabrikalara tutarlılık", color: "from-orange-500 to-red-500" },
                            ].map((goal, index) => (
                                <div key={index} className="text-center p-8">
                                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${goal.color} text-white mb-4 shadow-lg`}>
                                        <span className="material-symbols-outlined text-4xl">{goal.icon}</span>
                                    </div>
                                    <p className="text-xl font-bold text-white">{goal.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 bg-[#f4f6fa] dark:bg-[#0a0a0a]">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#145BEC] to-[#0d47c9] p-12 md:p-20 text-center">
                            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/10 rounded-full blur-3xl" />

                            <div className="relative z-10">
                                <span className="material-symbols-outlined text-white/30 mb-6" style={{ fontSize: '80px' }}>rocket_launch</span>
                                <h2 className="font-black text-white mb-4">Başlamaya Hazır mısınız?</h2>
                                <p className="text-xl text-white/80 mb-8 max-w-[500px] mx-auto">
                                    DST dosyanızı üretime hazır dikişli bir onaya dönüştürün.
                                </p>
                                <Link href={language === 'tr' ? '/tr/contact' : '/contact'}>
                                    <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[#145BEC] font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl hover:shadow-2xl">
                                        <span className="material-symbols-outlined">arrow_forward</span>
                                        Siparişinizi Başlatın
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
