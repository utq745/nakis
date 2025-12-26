"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";

export default function FAQPage() {
    const { language } = useLanguage();

    const faqCategories = [
        {
            title: "Hizmetler ve Fiyatlandırma",
            questions: [
                {
                    q: "'Onay Kartı' nedir?",
                    a: "Onay Kartı, tasarımınızın gerçek bir Tajima nakış makinesinde işlenmiş yüksek çözünürlüklü bir taramasıdır. Seri üretimden önce sonucun %100 doğru olduğundan emin olabilmeniz için hassas ölçümler, renk kodları, dikiş sayıları ve yoğunluk tekniklerini içerir."
                },
                {
                    q: "Toplu siparişlerde indirim yapıyor musunuz?",
                    a: "Evet! Tasarım başına fiyatlandırmamız tekil siparişler için şeffaf olsa da, yüksek hacimli aylık dijitalleştirme ihtiyacı olan şirketler için özel fiyatlandırma sunuyoruz. Kurumsal hesap için lütfen bizimle iletişime geçin."
                },
                {
                    q: "'DST Düzeltme' hizmeti nasıl çalışır?",
                    a: "İyi çalışmayan mevcut bir DST dosyanız varsa, bize gönderirsiniz. Dosyayı analiz eder, teknik sorunları (yoğunluk, alt dikiş, yol çizimi) düzeltir ve ardından düzeltmeyi kanıtlamak için nakışını yaparız. Deneme başına değil, çözüm için ödeme yaparsınız."
                }
            ]
        },
        {
            title: "Teknik Detaylar",
            questions: [
                {
                    q: "Hangi dosya formatlarını kabul ediyorsunuz?",
                    a: "Yeni dijitalleştirme için AI, PDF, PNG, JPG ve EPS formatlarını kabul ediyoruz. Düzenleme/düzeltme için öncelikle DST dosyalarıyla çalışıyoruz, ancak EMB, PES, JEF ve HUS formatlarını da işleyebiliriz."
                },
                {
                    q: "Örnekler için hangi makineler kullanılıyor?",
                    a: "Üretim hattınıza mükemmel şekilde aktarılacak en yüksek hassasiyeti sağlamak için yalnızca Tajima endüstriyel nakış makinelerini (TFMX ve TMBR serileri) kullanıyoruz."
                },
                {
                    q: "3D Kabartma veya özel ipliklerle çalışabiliyor musunuz?",
                    a: "Kesinlikle. 3D Kabartma (Puff), aplike ve özel iplik yollarında (metalik, ateşe dayanıklı) uzmanız. Yükleme yaparken gereksinimlerinizi belirtmeniz yeterlidir."
                }
            ]
        },
        {
            title: "Teslimat ve Destek",
            questions: [
                {
                    q: "Standart teslim süreniz nedir?",
                    a: "Dijital dosyalar ve dikişli taramalar genellikle 24-48 saat içinde teslim edilir. Ek ücret karşılığında acil servis (12 saat) seçeneğimiz de mevcuttur."
                },
                {
                    q: "Örnekten memnun kalmazsam ne olur?",
                    a: "Hedefimiz üretime hazır mükemmeliktir. Örnek, özel kumaşınız ve makine tipiniz için gereken yüksek kalite standartlarını karşılayana kadar revizyon sunuyoruz."
                },
                {
                    q: "Final dosyalarımı nasıl alırım?",
                    a: "Dijital taramayı onaylayıp bakiyeyi ödediğinizde, üretime hazır DST dosyaları ve teknik föyler panelinizde anında indirilebilir hale gelir."
                }
            ]
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#f8fafc] dark:bg-[#09090b] font-[family-name:var(--font-inter)]">
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
                                <span className="material-symbols-outlined text-white" style={{ fontSize: '20px' }}>help</span>
                                <span className="text-white/90 text-sm font-bold uppercase tracking-wider">Sıkça Sorulan Sorular</span>
                            </div>

                            <h1 className="text-white font-black leading-[1.1] mb-6 text-[clamp(2.5rem,5vw,4.5rem)]">
                                Merak Edilenler
                            </h1>
                            <p className="text-white/70 text-lg md:text-xl max-w-[700px] mx-auto">
                                Dijitalleştirme sürecimiz, onay örnekleri ve endüstriyel nakış standartları hakkında bilmeniz gereken her şey.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* FAQ Content */}
                <section className="py-20 -mt-32 md:-mt-48 relative z-20">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="max-w-4xl mx-auto">
                            <div className="grid grid-cols-1 gap-12">
                                {faqCategories.map((category, catIndex) => (
                                    <motion.div
                                        key={catIndex}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                                    >
                                        <h2 className={`text-2xl font-black mb-8 flex items-center gap-3 ${catIndex === 0 ? 'text-white' : 'text-[#172136] dark:text-white'}`}>
                                            <span className="w-1.5 h-8 bg-[#145BEC] rounded-full"></span>
                                            {category.title}
                                        </h2>
                                        <div className="space-y-4">
                                            {category.questions.map((faq, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-white dark:bg-[#18181b] rounded-2xl p-6 md:p-8 border border-[#e5e7eb] dark:border-[#27272a] shadow-lg hover:shadow-xl transition-all"
                                                >
                                                    <h3 className="font-bold text-lg text-[#111318] dark:text-white mb-4">
                                                        {faq.q}
                                                    </h3>
                                                    <p className="text-[#616f89] dark:text-gray-400 leading-relaxed text-base">
                                                        {faq.a}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Still Have Questions? */}
                <section className="py-24 bg-[#111114] text-white">
                    <div className="container mx-auto px-4 md:px-6 text-center">
                        <div className="max-w-2xl mx-auto">
                            <h2 className="font-black text-white mb-4">Hala Sorularınız mı Var?</h2>
                            <p className="text-white/70 mb-10 text-lg">
                                Aradığınız yanıtı bulamadınız mı? Teknik destek ekibimizle iletişime geçin.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href={language === 'tr' ? '/tr/contact' : '/contact'}
                                    className="px-8 py-4 bg-[#145BEC] text-white rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20"
                                >
                                    Destek Alın
                                </a>
                                <a
                                    href="https://wa.me/905488588394"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-4 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-all shadow-lg shadow-green-500/20 flex items-center justify-center gap-2"
                                >
                                    Bize Yazın
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
