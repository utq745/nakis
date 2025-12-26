"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
    const { language } = useLanguage();

    return (
        <div className="flex flex-col min-h-screen bg-background font-[family-name:var(--font-inter)]">
            <Header />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative pt-32 pb-48 md:pt-40 md:pb-64 overflow-hidden bg-[#172136]">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full"
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
                                <span className="material-symbols-outlined text-white" style={{ fontSize: '20px' }}>security</span>
                                <span className="text-white/90 text-sm font-bold uppercase tracking-wider">Verileriniz Güvende</span>
                            </div>

                            <h1 className="text-white font-black leading-[1.1] mb-6 text-[clamp(2.5rem,5vw,4.5rem)]">
                                Gizlilik Politikası
                            </h1>
                            <p className="text-white/70 text-lg md:text-xl max-w-[700px] mx-auto">
                                Verilerinizi nasıl topluyor, kullanıyor ve koruyoruz.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-20 -mt-32 md:-mt-48 relative z-20">
                    <div className="container mx-auto px-4 md:px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="max-w-4xl mx-auto bg-card rounded-[2.5rem] p-8 md:p-16 border border-border shadow-2xl"
                        >
                            <div className="prose prose-blue dark:prose-invert max-w-none text-muted-foreground">
                                <p className="text-sm mb-8 italic">Son Güncelleme: 26 Aralık 2025</p>

                                <h2 className="text-2xl font-black text-foreground mt-12 mb-6">1. Topladığımız Bilgiler</h2>
                                <p className="mb-6">
                                    Hesap oluşturduğunuzda, tasarım yüklediğinizde veya bizimle iletişim kurduğunuzda bize doğrudan verdiğiniz bilgileri topluyoruz:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 mb-8">
                                    <li>Ad ve iletişim bilgileri</li>
                                    <li>Nakış tasarımları ve teknik özellikler</li>
                                    <li>Fatura ve ödeme detayları (3. taraf sağlayıcılar aracılığıyla güvenli bir şekilde işlenir)</li>
                                    <li>Şirket bilgileri</li>
                                </ul>

                                <h2 className="text-2xl font-black text-foreground mt-12 mb-6">2. Verilerinizi Nasıl Kullanıyoruz</h2>
                                <p className="mb-6">
                                    Verileriniz yalnızca hizmetlerimizi sunmak ve geliştirmek için kullanılır:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 mb-8">
                                    <li>Dijitalleştirme ve örnek siparişlerinizin işlenmesi</li>
                                    <li>Teknik destek ve sipariş güncellemelerinin sağlanması</li>
                                    <li>Dijitalleştirme algoritmalarımızın ve makine yollarımızın iyileştirilmesi</li>
                                    <li>Yasal yükümlülüklere uyum</li>
                                </ul>

                                <h2 className="text-2xl font-black text-foreground mt-12 mb-6">3. Tasarım Gizliliği</h2>
                                <p className="mb-8 leading-relaxed">
                                    Size ait tasarımlar hiçbir koşulda satılmaz veya paylaşılmaz. Çizimleriniz sizin fikri mülkiyetiniz olarak kalır. Dahili ekibimiz dosyalarınıza yalnızca talep edilen dijitalleştirme ve dikiş hizmetlerini gerçekleştirmek için erişir.
                                </p>

                                <h2 className="text-2xl font-black text-foreground mt-12 mb-6">4. Veri Güvenliği</h2>
                                <p className="mb-8 leading-relaxed">
                                    Dijital tasarımlarınızı ve kişisel bilgilerinizi korumak için endüstriyel düzeyde güvenlik önlemleri uyguluyoruz. Buna SSL şifreleme, güvenli sunucu ortamları ve kısıtlı erişim protokolleri dahildir.
                                </p>

                                <h2 className="text-2xl font-black text-foreground mt-12 mb-6">5. Haklarınız</h2>
                                <p className="mb-8 leading-relaxed">
                                    Kişisel verilerinize erişme, bunları düzeltme veya silme hakkına sahipsiniz. Bu işlemlerin çoğunu doğrudan kullanıcı panelinizden yönetebilir veya yardım için bizimle iletişime geçebilirsiniz.
                                </p>

                                <div className="mt-16 p-8 bg-muted/50 dark:bg-muted/10 rounded-2xl border border-primary/20">
                                    <h3 className="text-lg font-bold text-foreground mb-2 underline">Sorularınız mı Var?</h3>
                                    <p className="text-muted-foreground">
                                        Bu Gizlilik Politikası hakkında herhangi bir sorunuz varsa, lütfen <a href="mailto:contact@approvalstitch.com" className="text-primary font-bold">contact@approvalstitch.com</a> adresinden bizimle iletişime geçin.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
