"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";

export function DeliveryPolicyClient() {
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
                                <span className="material-symbols-outlined text-white" style={{ fontSize: '20px' }}>local_shipping</span>
                                <span className="text-white/90 text-sm font-bold uppercase tracking-wider">Teslimat & İade</span>
                            </div>

                            <h1 className="text-white font-black leading-[1.1] mb-6 text-[clamp(2.5rem,5vw,4.5rem)]">
                                Teslimat ve İade Şartları
                            </h1>
                            <p className="text-white/70 text-lg md:text-xl max-w-[700px] mx-auto">
                                Dijital hizmetlerimizin teslimat süreçleri ve iade politikaları hakkında detaylı bilgi.
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
                                <p className="text-sm mb-8 italic">Son Güncelleme: 04 Şubat 2026</p>

                                <h2 className="text-2xl font-black text-foreground mt-12 mb-6">1. TARAFLAR</h2>
                                <p className="mb-6 leading-relaxed">
                                    İşbu sözleşme, bir tarafta <strong>Yavuz Sakkaoğlu</strong> (Bundan sonra "Hizmet Sağlayıcı" olarak anılacaktır) ile diğer tarafta web sitesi üzerinden hizmet alan kullanıcı (Bundan sonra "Müşteri" olarak anılacaktır) arasında, dijital hizmetlerin satışı ve teslimatına ilişkin usul ve esasları belirlemek amacıyla akdedilmiştir.
                                </p>

                                <h2 className="text-2xl font-black text-foreground mt-12 mb-6">2. HİZMETİN NİTELİĞİ</h2>
                                <p className="mb-6 leading-relaxed">
                                    Hizmet Sağlayıcı, tekstil ve nakış sektörüne yönelik "Nakış Tasarımı Dijitalleştirme ve Teknik Doğrulama" hizmeti sunmaktadır. Bu hizmet, Müşteri tarafından iletilen görsel tasarımların nakış makinelerinin işleyebileceği dijital veri formatlarına dönüştürülmesini kapsamaktadır.
                                </p>

                                <h2 className="text-2xl font-black text-foreground mt-12 mb-6">3. TESLİMAT KOŞULLARI</h2>
                                <ul className="list-disc pl-6 space-y-4 mb-8">
                                    <li>Hizmet dijital ortamda sunulmaktadır. Fiziksel bir ürün gönderimi (kargo vb.) söz konusu değildir.</li>
                                    <li>Hazırlanan dijital dosyalar, Müşteri’nin web sitesi üzerindeki kullanıcı paneline, kayıtlı e-posta adresi ve şifresi ile giriş yapması suretiyle erişime açılır.</li>
                                    <li>Dosyalar sisteme yüklendiğinde ve erişime açıldığında teslimat tamamlanmış sayılır.</li>
                                </ul>

                                <h2 className="text-2xl font-black text-foreground mt-12 mb-6">4. CAYMA HAKKI VE İPTAL ŞARTLARI</h2>
                                <ul className="list-disc pl-6 space-y-4 mb-8">
                                    <li><strong>Cayma Hakkı İstisnası:</strong> 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği’nin 15/ğ maddesi uyarınca; <em>"Elektronik ortamda anında ifa edilen hizmetler veya tüketiciye anında teslim edilen gayrimaddi mallara ilişkin sözleşmelerde"</em> tüketici cayma hakkını kullanamaz.</li>
                                    <li>İşbu hizmet, Müşteri’nin onayı ile anında ifa edilen ve dijital ortamda teslim edilen bir içerik olduğundan, ödeme yapıldıktan ve dosya erişime açıldıktan sonra <strong>cayma hakkı bulunmamaktadır.</strong></li>
                                    <li>Tek seferlik işlerde, dijitalleştirme çalışmasına başlandıktan sonra işlemin iptali mümkün değildir.</li>
                                </ul>

                                <h2 className="text-2xl font-black text-foreground mt-12 mb-6">5. İADE KOŞULLARI</h2>
                                <p className="mb-6 leading-relaxed">
                                    İş akışı gereği, dijital dosya Hizmet Sağlayıcı tarafından hazırlandıktan sonra Müşteri’ye ödeme bilgisi iletilir. Ödeme işleminin tamamlanmasıyla birlikte dijital dosya Müşteri panelinde erişime açılır. Dijital içeriğin kopyalanabilir ve anında tüketilebilir yapısı gereği, <strong>dosya erişime açıldıktan sonra iade yapılması mümkün değildir.</strong>
                                </p>

                                <h2 className="text-2xl font-black text-foreground mt-12 mb-6">6. TEKNİK HATALAR VE DÜZELTME</h2>
                                <p className="mb-6 leading-relaxed">
                                    Teslim edilen dosyada, Hizmet Sağlayıcı’dan kaynaklanan teknik bir hata veya nakış makinesinde okuma problemi olması durumunda, Müşteri’nin bildirimine istinaden gerekli teknik düzeltmeler ücretsiz olarak yapılacaktır. Müşteri tarafından başlangıçta iletilen görselin dışına çıkan tasarım değişiklik talepleri, yeni bir hizmet talebi olarak değerlendirilir.
                                </p>

                                <div className="mt-12 p-8 bg-primary/5 dark:bg-primary/10 rounded-2xl border border-primary/20">
                                    <h3 className="text-xl font-bold text-foreground mb-4">7. İLETİŞİM VE ŞİRKET BİLGİLERİ</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                                        <div>
                                            <p className="text-muted-foreground mb-1">Unvan</p>
                                            <p className="font-bold text-foreground">Yavuz Sakkaoğlu</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground mb-1">Adres</p>
                                            <p className="font-bold text-foreground">Ahmet Nafiz Gürman Mah. Kınalıtepe Sok. No:10 34173 Güngören/İstanbul</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground mb-1">Telefon</p>
                                            <p className="font-bold text-foreground">+90 532 266 83 94</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground mb-1">E-posta</p>
                                            <p className="font-bold text-foreground">info@approvalstitch.com</p>
                                        </div>
                                    </div>
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
