"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { HeroBackground } from "@/components/landing/hero-background";

export function CookieClient() {
    const { language } = useLanguage();

    return (
        <div className="flex flex-col min-h-screen bg-background font-[family-name:var(--font-inter)]">
            <Header />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative pt-32 pb-48 md:pt-40 md:pb-64 overflow-hidden bg-slate-50 dark:bg-[#172136]">
                    <HeroBackground />

                    <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 dark:bg-white/10 border border-primary/10 dark:border-white/20 backdrop-blur-sm mb-6">
                                <span className="material-symbols-outlined text-primary dark:text-white" style={{ fontSize: '20px' }}>cookie</span>
                                <span className="text-primary dark:text-white/90 text-sm font-bold uppercase tracking-wider">Gizlilik Önemlidir</span>
                            </div>

                            <h1 className="text-primary dark:text-white font-black leading-[1.1] mb-6 text-[clamp(2.5rem,5vw,4.5rem)]">
                                Çerez Politikası
                            </h1>
                            <p className="text-slate-600 dark:text-white/70 text-lg md:text-xl max-w-[700px] mx-auto">
                                Güvenli ve verimli bir hizmet sunmak için çerezleri nasıl kullandığımız hakkında şeffaflık.
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

                                <p className="mb-6 leading-relaxed">
                                    <strong>Approval Stitch</strong> ("biz", "bize" veya "approvalstitch.com") olarak, ziyaretçilerimizin ("siz" veya "Kullanıcı") gizliliğine önem veriyoruz. Bu Çerez Politikası, web sitemizi ziyaret ettiğinizde çerezleri ve benzer takip teknolojilerini nasıl kullandığımızı, neden kullandığımızı ve bunları kontrol etme haklarınızı açıklar.
                                </p>

                                <p className="mb-8 leading-relaxed">
                                    Dünya genelindeki müşterilerimize hizmet verdiğimizden, bu politika Avrupalı kullanıcılarımız için <strong>Genel Veri Koruma Yönetmeliği (GDPR)</strong> ve ABD'li kullanıcılarımız için <strong>California Tüketici Gizliliği Yasası (CCPA)</strong> ile uyumlu olacak şekilde tasarlanmıştır.
                                </p>

                                <h2 className="text-2xl font-black text-foreground mt-12 mb-6">1. Çerez Nedir?</h2>
                                <p className="mb-8 leading-relaxed">
                                    Çerezler, bir web sitesini ziyaret ettiğinizde bilgisayarınıza veya mobil cihazınıza yerleştirilen küçük metin dosyalarıdır. Web sitelerinin daha verimli çalışmasını sağlamak, site sahiplerine raporlama bilgileri sunmak ve tercihlerinizi (oturum durumu veya dil gibi) hatırlamak için yaygın olarak kullanılırlar.
                                </p>

                                <h2 className="text-2xl font-black text-foreground mt-12 mb-6">2. Kullandığımız Çerez Türleri</h2>
                                <p className="mb-6">Approval Stitch üzerinde aşağıdaki çerez kategorilerini kullanıyoruz:</p>
                                <ul className="space-y-6 mb-12">
                                    <li className="p-6 bg-muted/50 dark:bg-muted/10 rounded-xl border-l-4 border-blue-500">
                                        <strong>Kesinlikle Gerekli Çerezler:</strong> Web sitesinin çalışması için gereklidir (örneğin; güvenli giriş, sipariş işlemleri). Bunlar kapatılamaz.
                                    </li>
                                    <li className="p-6 bg-muted/50 dark:bg-muted/10 rounded-xl border-l-4 border-indigo-500">
                                        <strong>Performans ve Analiz Çerezleri:</strong> Sitemizin performansını ölçmemize ve iyileştirmemize yardımcı olmak için ziyaretleri ve trafik kaynaklarını saymamıza olanak tanır (örneğin; Google Analytics).
                                    </li>
                                    <li className="p-6 bg-muted/50 dark:bg-muted/10 rounded-xl border-l-4 border-cyan-500">
                                        <strong>İşlevsel Çerezler:</strong> Web sitesinin gelişmiş işlevsellik ve kişiselleştirme sunmasını sağlar (örneğin; bölge seçiminizi hatırlama veya canlı destek).
                                    </li>
                                    <li className="p-6 bg-muted/50 dark:bg-muted/10 rounded-xl border-l-4 border-purple-500">
                                        <strong>Hedefleme ve Reklam Çerezleri:</strong> Reklam ortaklarımız tarafından ilgi alanlarınızın profilini çıkarmak ve diğer sitelerde size ilgili reklamları göstermek için sitemiz üzerinden yerleştirilebilir.
                                    </li>
                                </ul>

                                <h2 className="text-2xl font-black text-foreground mt-12 mb-6">3. Haklarınız (GDPR ve CCPA)</h2>

                                <h3 className="text-xl font-bold text-foreground mt-8 mb-4">AEA ve Birleşik Krallık'taki Kullanıcılar İçin (GDPR)</h3>
                                <p className="mb-6 leading-relaxed">
                                    Kesinlikle gerekli olmadıkça, açık rızanız olmadan cihazınıza çerez yerleştirmeyeceğiz. Tercihlerinizi ilk ziyaretinizde "Çerez Başlığımız" aracılığıyla yönetebilir veya sitemizdeki ayarlar üzerinden istediğiniz zaman değiştirebilirsiniz.
                                </p>

                                <h3 className="text-xl font-bold text-foreground mt-8 mb-4">ABD Kullanıcıları İçin (CCPA/CPRA)</h3>
                                <p className="mb-8 leading-relaxed">
                                    California sakinleri, kişisel bilgilerinin "satılmasını" veya "paylaşılmasını" reddetme (opt-out) hakkına sahiptir. Hedefleme çerezleri ile ilgili tercihlerinizi çerez ayarlarımız veya tarayıcı kontrolleriniz üzerinden yönetebilirsiniz.
                                </p>

                                <h2 className="text-2xl font-black text-foreground mt-12 mb-6">4. Çerezler Nasıl Yönetilir?</h2>
                                <p className="mb-6 leading-relaxed">
                                    Çerezleri kabul etme veya reddetme hakkına sahipsiniz. Web tarayıcınızın ayarlarını çerezleri kabul edecek veya reddedecek şekilde düzenleyebilirsiniz. Çerezleri reddetmeyi seçerseniz, sitemizi kullanmaya devam edebilirsiniz ancak bazı işlevlere ve alanlara erişiminiz kısıtlanabilir.
                                </p>

                                <p className="mb-6 font-bold">Popüler web tarayıcıları için destek sayfalarının bağlantıları aşağıdadır:</p>

                                <ul className="list-disc pl-6 space-y-4 mb-8">
                                    <li>
                                        <strong>Google Chrome:</strong> <br />
                                        <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Chrome'da çerezleri temizleme ve yönetme</a>
                                    </li>
                                    <li>
                                        <strong>Mozilla Firefox:</strong> <br />
                                        <a href="https://support.mozilla.org/tr/kb/gelismis-izleme-korumasi-masaustu-firefox" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Firefox Gelişmiş İzleme Koruması</a>
                                    </li>
                                    <li>
                                        <strong>Apple Safari:</strong> <br />
                                        <a href="https://support.apple.com/tr-tr/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Safari'de çerezleri ve web sitesi verilerini yönetme</a>
                                    </li>
                                    <li>
                                        <strong>Microsoft Edge:</strong> <br />
                                        <a href="https://support.microsoft.com/tr-tr/microsoft-edge/microsoft-edge-de-çerezleri-silme-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Microsoft Edge'de çerezleri silme</a>
                                    </li>
                                    <li>
                                        <strong>Opera:</strong> <br />
                                        <a href="https://help.opera.com/en/latest/web-preferences/#cookies" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Web tercihleri - Opera Yardımı</a>
                                    </li>
                                </ul>

                                <h2 className="text-2xl font-black text-foreground mt-12 mb-6">5. Üçüncü Taraf Hizmetleri</h2>
                                <p className="mb-12 leading-relaxed">
                                    Stripe/PayPal gibi ödeme işlemcileri veya Google Analytics gibi analiz araçlarını kullanabiliriz. Bu üçüncü taraflar da cihazınıza çerez yerleştirebilir. Daha fazla bilgi için bu kurumların kendi gizlilik politikalarını okumanızı öneririz.
                                </p>


                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
