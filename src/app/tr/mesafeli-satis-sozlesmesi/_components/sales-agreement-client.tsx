"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";

export function SalesAgreementClient() {
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
                                <span className="material-symbols-outlined text-white" style={{ fontSize: '20px' }}>gavel</span>
                                <span className="text-white/90 text-sm font-bold uppercase tracking-wider">Hukuki Şartlar</span>
                            </div>

                            <h1 className="text-white font-black leading-[1.1] mb-6 text-[clamp(2.5rem,5vw,4.5rem)]">
                                Mesafeli Satış Sözleşmesi
                            </h1>
                            <p className="text-white/70 text-lg md:text-xl max-w-[700px] mx-auto">
                                Approval Stitch üzerinden yapacağınız alışverişlerde geçerli olan hukuki şartlar ve sorumluluklar.
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

                                <h2 className="text-2xl font-black text-foreground mt-12 mb-6">1. Taraflar</h2>
                                <p className="mb-6 leading-relaxed">
                                    İşbu Sözleşme, bir tarafta <strong>Yavuz Sakkaoğlu</strong> (bundan sonra "SATICI" olarak anılacaktır) ile diğer tarafta platform üzerinden sipariş veren kullanıcı (bundan sonra "ALICI" olarak anılacaktır) arasında, aşağıda belirtilen hüküm ve şartlar çerçevesinde elektronik ortamda akdedilmiştir.
                                </p>

                                <h2 className="text-2xl font-black text-foreground mt-12 mb-6">2. Sözleşmenin Konusu</h2>
                                <p className="mb-6 leading-relaxed">
                                    İşbu sözleşmenin konusu, ALICI'nın SATICI'ya ait www.approvalstitch.com web sitesi üzerinden elektronik ortamda siparişini yaptığı aşağıda nitelikleri ve satış fiyatı belirtilen hizmetin satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır.
                                </p>

                                <h2 className="text-2xl font-black text-foreground mt-12 mb-6">3. Hizmet Bilgileri</h2>
                                <p className="mb-6 leading-relaxed">
                                    Sözleşme konusu hizmet; nakış dijitalleştirme, dosya düzeltme veya numune dikiş ( stitch proof) hizmetlerini kapsar. Hizmetin detayları, kapsamı ve ücreti ALICI'nın seçtiği paket dahilinde sipariş ekranında belirtildiği gibidir.
                                </p>

                                <h2 className="text-2xl font-black text-foreground mt-12 mb-6">4. Genel Hükümler</h2>
                                <ul className="list-disc pl-6 space-y-4 mb-8">
                                    <li>ALICI, web sitesinde sözleşme konusu hizmetin temel nitelikleri, satış fiyatı ve ödeme şekli ile teslimata ilişkin ön bilgileri okuyup bilgi sahibi olduğunu ve elektronik ortamda gerekli teyidi verdiğini beyan eder.</li>
                                    <li>Sözleşme konusu hizmet, dijital ortamda hazırlanan dosyalar ve bu dosyaların dikiş sonuçlarının yüksek çözünürlüklü taramalarını kapsar. Fiziksel kargo teslimatı aksi belirtilmedikçe söz konusu değildir.</li>
                                    <li>SATICI, sipariş edilen hizmetin kusursuz, eksiksiz ve siparişte belirtilen niteliklere uygun olarak sunulmasından sorumludur.</li>
                                </ul>

                                <h2 className="text-2xl font-black text-foreground mt-12 mb-6">5. Cayma Hakkı ve İstisnalar</h2>
                                <p className="mb-6 leading-relaxed">
                                    Mesafeli Sözleşmeler Yönetmeliği'nin 15. maddesi uyarınca; <strong>"Tüketicinin istekleri veya kişisel ihtiyaçları doğrultusunda hazırlanan mallara ilişkin sözleşmelerde"</strong> cayma hakkı kullanılamaz.
                                </p>
                                <div className="p-6 bg-primary/5 dark:bg-primary/10 rounded-xl border-l-4 border-primary mb-8">
                                    <p className="text-sm font-bold text-foreground">Önemli Hatırlatma:</p>
                                    <p className="text-sm">Approval Stitch tarafından sunulan hizmetler tamamen ALICI'nın gönderdiği tasarımlara özel olarak hazırlandığı için, işlem başlatıldıktan sonra cayma hakkı ve iade söz konusu değildir.</p>
                                </div>

                                <h2 className="text-2xl font-black text-foreground mt-12 mb-6">7. Satıcı Bilgileri</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm mb-12">
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

                                <div className="mt-16 text-center border-t border-border pt-12">
                                    <p className="text-sm text-muted-foreground">Bu sözleşme ALICI'nın ödeme adımında "Sözleşmeyi Okudum ve Kabul Ediyorum" onayını vermesiyle yürürlüğe girer.</p>
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
