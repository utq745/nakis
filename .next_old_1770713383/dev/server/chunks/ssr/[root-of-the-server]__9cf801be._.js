module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/Documents/nakis/src/lib/dictionary.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "translations",
    ()=>translations
]);
const translations = {
    tr: {
        common: {
            loading: "Yükleniyor...",
            error: "Bir hata oluştu",
            success: "İşlem başarılı",
            save: "Kaydet",
            update: "Güncelle",
            cancel: "İptal",
            delete: "Sil",
            edit: "Düzenle",
            back: "Geri",
            send: "Gönder",
            welcome: "Hoş Geldiniz",
            logout: "Çıkış Yap",
            profile: "Profil",
            settings: "Ayarlar",
            confirmDelete: "Silmek istediğinize emin misiniz?",
            deleteSuccess: "Dosya silindi",
            notAvailable: "Yok"
        },
        notifications: {
            title: "Bildirimler",
            noNotifications: "Henüz bildirim bulunmuyor",
            markAllRead: "Tümünü okundu işaretle",
            clearAll: "Tümünü temizle",
            orderUpdate: "Sipariş Güncellemesi",
            newComment: "Yeni Mesaj",
            system: "Sistem",
            viewOrder: "Siparişi Görüntüle",
            unread: "Okunmamış",
            now: "Şimdi",
            ago: "önce"
        },
        auth: {
            login: "Giriş Yap",
            register: "Kayıt Ol",
            email: "E-posta",
            password: "Şifre",
            forgotPassword: "Şifremi Unuttum",
            noAccount: "Hesabınız yok mu?",
            haveAccount: "Hesabınız var mı?",
            createAccount: "Hesap Oluştur",
            fullName: "Ad Soyad",
            firstName: "Ad",
            lastName: "Soyad",
            confirmPassword: "Şifre (Tekrar)",
            rememberMe: "Beni hatırla",
            registerDesc: "Nakış digitizing siparişlerinizi yönetin",
            creatingAccount: "Kayıt olunuyor...",
            loginPage: {
                signIn: "Giriş Yap",
                createAccount: "Hesap Oluştur",
                welcomeBack: "Tekrar Hoşgeldiniz",
                getStarted: "Başlayın",
                enterDetails: "Tasarım paneline erişmek için bilgilerinizi girin.",
                createAccountDesc: "Dijitalleştirmeye başlamak için hesap oluşturun.",
                emailAddress: "E-posta Adresi",
                emailPlaceholder: "siz@sirket.com",
                password: "Şifre",
                forgotPassword: "Şifremi Unuttum?",
                fullName: "Ad Soyad",
                firstName: "Ad",
                lastName: "Soyad",
                fullNamePlaceholder: "Ahmet Yılmaz",
                orContinueWith: "Veya şununla devam edin",
                google: "Google",
                termsText: "Giriş yaparak,",
                termsOfService: "Kullanım Şartları",
                and: "ve",
                privacyPolicy: "Gizlilik Politikası",
                agree: "'nı kabul etmiş olursunuz.",
                sidebarTitle: "Her dikişte hassasiyet.",
                sidebarDesc: "Hızlı, yüksek kaliteli dijitalleştirme ve vektör dönüştürme hizmetleri için Approval Stitch'e güvenen binlerce işletmeye katılın.",
                professionals: "10.000+ Profesyonel",
                trustDaily: "Bize her gün güveniyor"
            },
            errors: {
                alreadyRegistered: "Bu e-posta adresi zaten kayıtlı",
                registrationError: "Kayıt sırasında bir hata oluştu",
                tooManyAttempts: "Çok fazla kayıt denemesi. Lütfen daha sonra tekrar deneyin."
            }
        },
        customers: {
            title: "Müşteriler",
            name: "İsim",
            email: "E-posta",
            joinedAt: "Kayıt Tarihi",
            orderCount: "Sipariş Sayısı",
            noCustomers: "Henüz müşteri bulunmuyor",
            role: "Rol",
            id: "ID"
        },
        sidebar: {
            dashboard: "Panel",
            orders: "Siparişlerim",
            allOrders: "Tüm Siparişler",
            newOrder: "Yeni Sipariş",
            customers: "Müşteriler",
            reports: "Raporlar",
            settings: "Ayarlar",
            adminPanel: "Admin Paneli",
            customerPanel: "Müşteri Paneli"
        },
        dashboard: {
            totalOrders: "Toplam Sipariş",
            pending: "Fiyat Bekleniyor",
            inProgress: "Devam Ediyor",
            completed: "Tamamlandı",
            recentOrders: "Son Siparişler",
            noOrders: "Henüz sipariş bulunmuyor",
            createFirstOrder: "İlk siparişinizi oluşturun"
        },
        orders: {
            createTitle: "Yeni Nakış Siparişi",
            createDesc: "Tasarımınızı yükleyin ve detayları belirtin.",
            title: "Sipariş Başlığı",
            description: "Açıklama & Notlar",
            files: "Dosyalar",
            status: "Durum",
            price: "Fiyat",
            uploadFiles: "Dosya Yükle",
            orderInfo: "Sipariş Bilgileri",
            orderNo: "Sipariş No",
            created: "Oluşturulma",
            updated: "Son Güncelleme",
            delivered: "Sipariş Teslimi",
            management: "Sipariş Yönetimi",
            messages: "Mesajlar ve Sipariş Durumu",
            support: "Destek & Mesajlar",
            refresh: "Her 30sn'de güncellenir",
            original: "Orijinal",
            preview: "Önizleme",
            final: "Final",
            noFiles: "Henüz dosya yüklenmemiş",
            backToOrders: "Siparişlere Dön",
            updateSuccess: "Sipariş güncellendi",
            updateError: "Güncelleme sırasında hata oluştu",
            uploadSuccess: "Dosyalar yüklendi",
            uploadError: "Dosya yüklenirken hata oluştu",
            customerName: "Müşteri",
            uploadPreview: "Önizleme Yükle",
            uploadFinal: "Final Dosyası Yükle",
            previewUploadLabel: "Önizleme Dosyası Yükle",
            finalUploadLabel: "Final Dosyası Yükle",
            payButton: "Ödeme Yap",
            paymentPendingDesc: "Final dosyalarını indirebilmek için ödeme yapmanız gerekmektedir.",
            priceApprovalTitle: "Fiyat Onayı Bekleniyor",
            priceApprovalDesc: "Admin tarafından belirlenen fiyatı onaylamanız gerekmektedir.",
            approvePrice: "Fiyatı Onayla ve Devam Et",
            priceApproved: "Fiyat onaylandı, sipariş işleme alındı!",
            previewApprovalTitle: "Önizleme Onayı Bekleniyor",
            previewApprovalDesc: "Admin tarafından yüklenen önizleme dosyalarını kontrol edin ve onaylayın.",
            approvePreview: "Önizlemeyi Onayla ve Devam Et",
            previewApproved: "Önizleme onaylandı, sipariş işleme devam ediyor!",
            requestRevision: "Revizyon Talep Et",
            revisionTitle: "Revizyon Talebi",
            revisionPlaceholder: "Revizyon detaylarını buraya yazın...",
            sendRevision: "Talebi Gönder",
            revisionSuccess: "Revizyon talebiniz iletildi.",
            sendPreview: "Gönder",
            previewSent: "Önizleme dosyaları müşteriye gönderildi!",
            wilcomUpload: "Wilcom Dosyası Yükle",
            send: "Gönder",
            publishSuccess: "Onay kartları Final bölümüne yayınlandı!",
            publishError: "Onay kartları yayınlanamadı.",
            wilcom: {
                processed: "İşlendi",
                designName: "Tasarım Adı",
                size: "Boyut",
                stitches: "Dikiş Sayısı",
                runtime: "Çalışma Süresi",
                colors: "Renkler",
                designPreview: "Tasarım Önizleme",
                customerCard: "Müşteri Onay Kartı",
                operatorCard: "Operatör Onay Kartı",
                originalPdf: "Orijinal PDF",
                reUpload: "Yeniden Yükle",
                showDetails: "Teknik Detayları Göster",
                hideDetails: "Detayları Gizle",
                machineFormat: "Makine Formatı",
                colorChanges: "Renk Değişimi",
                stops: "Stoplar",
                trims: "Kesmeler",
                totalThread: "Toplam İplik",
                totalBobbin: "Toplam Alt İplik",
                maxStitch: "Maks. Dikiş",
                minStitch: "Min. Dikiş",
                maxJump: "Maks. Atlama",
                colorSequence: "Renk Sıralaması",
                selectPdf: "PDF Seç",
                processing: "İşleniyor...",
                uploadDesc: "Onay kartlarını oluşturmak için Wilcom PDF dosyasını yükleyin",
                uploadTitle: "Wilcom PDF Yükle",
                publishConfirm: "Onay kartlarını müşteriye göndermek istediğinize emin misiniz?",
                deleteWilcom: "Wilcom Verilerini Sil",
                deleteWilcomConfirm: "Tüm Wilcom verileri ve onay kartları kalıcı olarak silinecektir. Bu işlemi geri alamazsınız. Emin misiniz?"
            }
        },
        payment: {
            title: "Ödeme",
            billingInfo: "Fatura Bilgileri",
            orderSummary: "Sipariş Özeti",
            fullName: "Ad Soyad",
            address: "Adres",
            phone: "Telefon",
            cardNumber: "Kredi Kartı Numarası",
            expiry: "Son Kullanma (AA/YY)",
            cvc: "CVC",
            payNow: "Şimdi Öde",
            totalAmount: "Toplam Tutar",
            processing: "İşlem Yapılıyor...",
            success: "Ödeme Başarılı!",
            successDesc: "Siparişiniz tamamlandı. Artık final dosyalarını indirebilirsiniz.",
            error: "Ödeme sırasında bir hata oluştu.",
            country: "Ülke",
            city: "Şehir",
            zipCode: "Posta Kodu",
            isCompany: "Kurumsal Fatura",
            companyName: "Şirket Adı",
            taxOffice: "Vergi Dairesi",
            taxNumber: "Vergi Numarası",
            individual: "Bireysel",
            corporate: "Kurumsal",
            addressPlaceholder: "Açık adres.."
        },
        header: {
            home: "Ana Sayfa",
            services: "Hizmetler",
            portfolio: "Portfolyo",
            pricing: "Fiyatlandırma",
            contact: "İletişim",
            startOrder: "Siparişi Başlat",
            signIn: "Giriş Yap",
            panel: "Panel"
        },
        footer: {
            rights: "© 2025 Approval Stitch Inc. Tüm hakları saklıdır.",
            desc: "1990'dan beri deneyimle desteklenen gerçek dikişli nakış onayları<br>Yayına geçmeden önce onay alması gereken üretim ekiplerinin güvendiği hizmet.",
            services: "Hizmetler",
            company: "Şirket",
            support: "Destek",
            logoDigitizing: "Logo Dijitalleştirme",
            vectorArt: "Vektör Çizim",
            patchDesign: "Arma Tasarımı",
            puff3d: "3D Kabartma",
            contact: "İletişim",
            faq: "SSS",
            terms: "Kullanım Şartları",
            privacy: "Gizlilik Politikası"
        },
        landing: {
            hero: {
                badge: "Gerçek Onaylı Nakış",
                titleLine1: "Gerçek Dikişli Onay Örnekleri",
                titleLine2: "Güvenli Nakış Üretimi İçin",
                description: "Tasarımınızı, seri üretime geçmeden önce onaylayabilmeniz için gerçek üretim makinelerinde dikiyoruz.",
                subText: "Üretim sınıfı Tajima ve Barudan makinelerinde işlenir. Render yok. Simülasyon yok. Sadece gerçek dikişli örnekler.",
                uploadBtn: "Siparişi Başlat",
                pricingBtn: "Örnekleri Gör",
                labBadge: "Gerçek Nakış Laboratuvarı",
                readyBadge: "Üretime Hazır",
                precisionBadge: "Hassasiyet",
                stitchedReality: "Dikişli Gerçeklik"
            },
            why: {
                badge: "Hikayemiz",
                title: "Neden Approval Stitch?",
                card1Title: "Gerçek Laboratuvar Hassasiyeti",
                card1Desc: "Gerçek dikişler. Gerçek üretim davranışı. Simüle etmiyoruz. Dosyanızı en yüksek hassasiyet için Tajima tek kafalı makinede test ediyoruz.",
                card2Title: "Teknik Netlik",
                card2Desc: "Her numune detaylı teknik notlar içerir: alt dikiş, yoğunluk, çekme telafisi, dikiş yönü ve kumaşa özel ayarlar.",
                card3Title: "Üretime Hazır Güven",
                card3Desc: "Ölçülmüş, hizalanmış ve renkleri listelenmiş gerçek nakış numuneleri ile kalibre edilmiş onay kartları. Dosyalarınız sadece 'düzeltilmez', üretim için yeniden inşa edilir."
            },
            receive: {
                badge: "Teslimat",
                title: "Neler Alacaksınız?",
                item1Title: "Approval Card (Client Version)",
                item1Desc: "Üretim öncesi onay için müşteriye hazır onay kartı.",
                item2Title: "Approval Card (Production / Operator Version)",
                item2Desc: "Dikiş, renk ve kurulum detaylarını içeren üretim onay kartı.",
                item3Title: "Real stitched photos",
                item3Desc: "Tajima veya Barudan makinelerimizde dikilmiş gerçek numune fotoğrafları."
            },
            process: {
                badge: "Süreç",
                title: "Nasıl Çalışır?",
                description: "Yüklemeden üretime hazır onay kartına kadar sorunsuz bir akış. Test Edildi, Doğrulandı, Hazır.",
                step1Title: "Upload & Specs",
                step1Desc: "DST veya çiziminizi yükleyin. Boyut, makine markası, kumaş ve yerleşim detaylarını seçin.",
                step2Title: "Real Approval Stitch",
                step2Desc: "Tasarımınızı Tajima veya Barudan üretim makinelerimizde dikiyoruz.",
                step3Title: "Approval Package",
                step3Desc: "Onay kartlarını ve gerçek fotoğrafları teslim alırsınız."
            },
            portfolio: {
                badge: "Portfolyo",
                title: "Portfolyo",
                description: "Karmaşık kurumsal logolardan cesur kabartma nakışlara kadar, her dikişteki kaliteyi görün.",
                viewAll: "Tüm Projeleri Gör",
                viewDesign: "Tasarımı Görüntüle",
                item1Title: "Kurumsal Logolar",
                item1Sub: "Sol Göğüs & Şapka",
                item2Title: "Özel Armalar",
                item2Sub: "Merrow Kenar",
                item3Title: "3D Kabartma",
                item3Sub: "Şapkalar & Bereler",
                item4Title: "Giyim Sanatı",
                item4Sub: "Ceketler & Kapüşonlular"
            },
            cta: {
                rating: "5.0 Puan",
                title: "Bir sonraki projenizi işlemeye hazır mısınız?",
                description: "Binlerce memnun müşteriye katılın. Tasarımınızı bugün yükleyin ve 12 saat içinde fiyat teklifi alın.",
                startBtn: "Siparişi Başlat",
                contactBtn: "Satışla İletişime Geç",
                testimonial: "\"Approval Stitch 3 yıldır vazgeçilmezimiz. Geri dönüş inanılmaz hızlı, ama asıl önemli olan dosyaların makinelerimizde her seferinde sorunsuz çalışması. İp kopması yok, mükemmel yoğunluk.\"",
                author: "Michael Chen",
                role: "Sahibi, Chen Custom Apparel"
            },
            backgroundCards: {
                clientLabel: "Müşteri Versiyonu",
                operatorLabel: "Üretim / Operatör Versiyonu",
                approvalCard: "Onay Kartı",
                approvalDocument: "Onay Belgesi",
                description: "Profesyonel üretim doğrulama föyü. Bu teknik belge, seri üretim için gerekli olan iplik renklerini, dikiş yollarını ve kalite kriterlerini gösterir.",
                features: [
                    "Yüksek Çözünürlüklü Tarama",
                    "İplik Renk Eşleştirmesi",
                    "Üretime Hazır Formatlama"
                ]
            }
        },
        status: {
            ORDERED: "Sipariş Alındı",
            APPROVAL_AWAITING: "Önizleme Onayı Bekleniyor",
            REVISION: "Revizyon İstendi",
            IN_PROGRESS: "Sipariş Hazırlanıyor",
            PAYMENT_PENDING: "Ödeme Bekleniyor",
            COMPLETED: "Tamamlandı",
            DELIVERED: "Teslim Edildi",
            CANCELLED: "İptal"
        },
        contactPage: {
            heroBadge: "İletişime Geçin",
            title: "İletişim",
            subtitle: "Gerçek dikişli onay örnekleri ve üretime hazır onaylar için bize her zaman ulaşın.",
            quickContactTitle: "Hızlı İletişim",
            email: "info@approvalstitch.com",
            whatsapp: "WhatsApp: +90 548 858 8394",
            whatsappNote: "WhatsApp yalnızca hızlı sorular içindir.<br>Siparişler <a href='/tr/kayit' class='underline'>Sipariş Başlat</a> üzerinden verilir.",
            sendUsInfo: "Sipariş vermeden önce bir sorunuz mu var?",
            replyTime: "Genellikle 12 saat içinde yanıt veriyoruz.",
            whatHappensTitle: "Sonra Ne Olur?",
            step1: "Tasarımınızı ve kumaş detaylarınızı bize gönderirsiniz.",
            step2: "Fiyat, tahmini dikiş sayısı ve tahmini süre ile yanıt veririz.",
            step3: "Onayınızdan sonra, (gerekirse) dijitalleştirme yapar ve Tajima'da gerçek dikişli örnek çalıştırırız.",
            step4: "Örneğin fotoğrafını/taramasını, DST dosyasını ve iplik listesini alırsınız.",
            formTitle: "Mesaj Gönderin",
            nameLabel: "Adınız",
            namePlaceholder: "Adınızı girin",
            emailLabel: "E-posta",
            emailPlaceholder: "E-posta adresinizi girin",
            subjectLabel: "Konu",
            subjectPlaceholder: "Konu seçin",
            messageLabel: "Mesaj",
            messagePlaceholder: "Mesajınızı yazın...",
            attachLabel: "Referans dosyası ekleyin (opsiyonel)",
            attachNote: "Siparişler için lütfen <a href='/tr/kayit' class='underline'>Sipariş Başlat</a>'ı kullanın.",
            sendButton: "Mesaj Gönder",
            orderCtaNote: "Sipariş vermeye hazır mısınız? Daha hızlı işlem için <a href='/tr/kayit' class='underline'>Sipariş Başlat</a>'ı kullanın.",
            subjects: {
                quote: "Fiyat Teklifi",
                digitizing: "Dijitalleştirme Talebi",
                sample: "Onay Örneği",
                support: "Teknik Destek",
                other: "Diğer"
            },
            directComm: {
                title: "Doğrudan İletişimi Tercih Ediyor musunuz?",
                description: "Hızlı yanıtlar ve gerçek zamanlı destek için WhatsApp üzerinden bize anında ulaşın.",
                button: "WhatsApp'ta Mesaj Gönder"
            },
            validation: {
                nameRequired: "Adınızı girmeniz gerekiyor",
                emailRequired: "E-posta adresinizi girmeniz gerekiyor",
                emailInvalid: "Geçerli bir e-posta adresi girin",
                subjectRequired: "Bir konu seçin",
                messageRequired: "Mesajınızı yazın"
            }
        },
        aboutPage: {
            hero: {
                badge: "Gerçek Dikiş Onay Hizmeti",
                title1: "APPROVALSTITCH",
                title2: "Gerçek Dikiş. Gerçek Onay.",
                description: "Nakış tasarımlarının üretim koşullarında gerçekte nasıl davrandığını gösteren gerçek dikişli onay sonuçları sunuyoruz."
            },
            whatWeDo: {
                badge: "Ne Yapıyoruz",
                title: "Gerçek Dikişli Onay Sonuçları",
                description: "ApprovalStitch, bir nakış tasarımının gerçek üretim koşullarında nasıl davrandığını gösteren gerçek dikişli onay sonuçları sunar.",
                detail: "Ekran simülasyonlarına, temiz PDF'lere veya teorik önizlemelere güvenmek yerine, tasarımın seçtiğiniz kumaşta gerçek dikiş koşullarında nasıl performans gösterdiğini kanıtlıyoruz. Bu, onayların varsayımlara değil, gerçekliğe dayanarak yapılmasını sağlar."
            },
            whyMatters: {
                badge: "Neden Önemli",
                title: "Neden Gerçek Dikişli Onay Numuneleri?",
                description: "Nakış tasarımları ekranda genellikle doğru görünür, ancak dikildikten sonra farklı davranır.",
                factors: [
                    "Costly mistakes",
                    "Rejections",
                    "Production delays",
                    "Brand risk"
                ],
                conclusion: "ApprovalStitch is built on over 35 years of real embroidery production experience — not studio assumptions."
            },
            whatYouReceive: {
                badge: "Ne Alırsınız",
                title: "Eksiksiz Onay Paketi",
                item1: "Müşterinize sunmak için gerçek dikişli onay sonucu",
                item2: "Makine operatörünüz için detaylı üretim referans kartı",
                item3: "Onay ve üretimi hizalayan net görsel referans",
                conclusion: "Bu, onay, kurulum ve nihai üretim arasında tutarlılık yaratır."
            },
            noMachines: {
                badge: "Avantajlar",
                title: "Makine Yok. Personel Yok.",
                description: "ApprovalStitch şu ihtiyaçları ortadan kaldırır:",
                items: [
                    "Numune makinelerine yatırım yapma",
                    "Onay işi için operatör tahsis etme",
                    "Deneme çalışmalarını yönetmek için dahili zaman harcama"
                ],
                conclusion: "Onay dikiş sürecini biz yönetiyoruz, böylece ekibiniz üretime odaklanabilir."
            },
            experience: {
                badge: "Deneyim",
                title: "Üretim Deneyimi Üzerine Kurulu",
                years: "35+",
                yearsLabel: "Yıllık Deneyim",
                description: "ApprovalStitch is built on over 35 years of real embroidery production experience — not studio assumptions.<br>We understand how designs behave on real machines, real fabrics, under real production pressure."
            },
            whoIsFor: {
                badge: "Kimler İçin",
                title: "ApprovalStitch Kimler İçin?",
                description: "ApprovalStitch şunlar için tasarlanmıştır:",
                audiences: [
                    "Nakış üreticileri",
                    "Giyim ve kurumsal kıyafet tedarikçileri",
                    "Üretim ve tedarik ekipleri",
                    "Güvenilir onay kararları gerektiren markalar"
                ],
                conclusion: "Onaylarınızın gerçek üretim sonuçlarını yansıtması gerekiyorsa, ApprovalStitch iş akışınıza doğal olarak uyum sağlar."
            },
            finalCta: {
                title: "Başlamaya Hazır mısınız?",
                tagline: "Gerçek dikiş onayı, üretim imzası için hazır.",
                cta: "Siparişinizi Başlatın"
            }
        },
        pricingPage: {
            hero: {
                badge: "Fiyatlandırma",
                title: "Şeffaf, Basit, Doğru Fiyat",
                description: "Tahmini yok, sürpriz yok. Dikişli onay örnekleri için net, basit fiyatlandırma."
            },
            plans: {
                plan1: {
                    name: "Onay Örneği",
                    description: "İlk test veya hızlı kontrol",
                    features: [
                        "Nakış dosyanızı (DST / EMB / PES) yüklersiniz",
                        "<strong>Bize ulaştığı şekilde</strong> dikiyoruz (ön düzenleme yok)",
                        "Gerçek dikiş fotoğrafı + <strong>Onay Kartı</strong> teslim edilir"
                    ],
                    notIncluded: [
                        "DST düzenleme / temizleme"
                    ],
                    bestFor: "İlk test veya hızlı kontrol için",
                    cta: "Sipariş Başlat"
                },
                plan2: {
                    name: "DST Düzeltme + Onay Örneği",
                    priceNote: "+$10 yükseltme ($25 ödendiyse)",
                    description: "İnceleme sonrası düzenleme gerektirebilecek tasarımlar için",
                    features: [
                        "Nakış dosyanızı (DST / EMB / PES) yüklersiniz",
                        "Sadece <strong>küçük düzeltmeler</strong> yapıyoruz (yoğunluk, çekme telafisi, temizleme, overlok dikişleri vb.) <br /><i>(Tamamen yeniden dijitalleştirme değil)</i>",
                        "Düzenlemeden sonra <strong>yeniden dikiyoruz</strong>",
                        "Güncellenmiş dikiş fotoğrafı + <strong>Güncellenmiş Onay Kartı</strong> teslim edilir"
                    ],
                    notIncluded: [
                        "Sıfırdan profesyonel dijitalleştirme (DST)"
                    ],
                    bestFor: "İlk incelemeden sonra ayarlama gerektiren tasarımlar",
                    cta: "Sipariş Başlat",
                    popular: "Tavsiye Edilen"
                },
                plan3: {
                    name: "Yeni Dijitalleştirme + Onay Örneği",
                    description: "Vuruş sayısına göre özel fiyatlandırma",
                    howItCalculated: "Simple pricing by stitch count",
                    calculationDetails: [
                        "Up to 7,000 stitches → $50 flat",
                        "7,001–30,000 stitches → +$3 per 1,000 stitches",
                        "30,000+ stitches → $155 flat",
                        "We calculate the stitch count for you and apply this pricing — no surprises."
                    ],
                    features: [
                        "Dilediğiniz formatta (AI, PDF, JPG vb.) tasarım yükleyin",
                        "Vuruş sayısına göre size özel fiyat teklifi. <i>(Göndereceğiniz tasarıma göre vuruş adedi hesaplanarak size fiyat teklifi yapılır)</i>",
                        "Sıfırdan profesyonel dijitalleştirme (DST)",
                        "Gerçek makinede dikiş numunesi ve Onay Kartı dahildir"
                    ],
                    bestFor: "Elinizde DST dosyası yoksa veya<br>yeni bir tasarım dikilecekse",
                    cta: "Fiyat Teklifi Al"
                },
                included: "Dahil",
                notIncluded: "Dahil Değil",
                bestForLabel: "Kimler için:"
            },
            faq: {
                title: "Sıkça Sorulan Sorular",
                q1: "Hangi dosya formatlarını kabul ediyorsunuz?",
                a1: "Onay Örneği ve DST Düzeltme için mevcut DST dosyanıza ihtiyacımız var. Tam Dijitalleştirme için AI, PDF, PNG, JPG ve diğer yaygın görüntü formatlarını kabul ediyoruz.",
                q2: "'Onay Kartı' nedir?",
                a2: "Tasarımınızı gerçek bir Tajima nakış makinesinde çalıştırıp, seri üretime geçmeden önce onaylamanız için ölçümler, renk kodları ve dikiş detaylarıyla yüksek çözünürlüklü bir tarama gönderiyoruz.",
                q3: "$25'ten $35 pakete yükseltme yapabilir miyim?",
                a3: "Evet! Onay Örneği ($25) ile başladıysanız ve düzenlemeye ihtiyacınız varsa, sadece $10 daha ödeyerek DST Düzeltme paketine yükseltebilirsiniz.",
                q4: "Ne kadar sürer?",
                a4: "Standart siparişler 24-48 saat içinde tamamlanır. Hızlandırılmış teslim için bizimle iletişime geçebilirsiniz.",
                customQuoteTitle: "Özel Bir Teklif Mi Gerekiyor?",
                customQuoteDesc: "Yüksek hacim, çoklu tasarımlar veya özel gereksinimler için bize ulaşın.",
                contactUs: "Bize Ulaşın"
            }
        },
        servicesPage: {
            hero: {
                badge: "Endüstriyel Standartlar",
                title: "Hizmetlerimiz",
                description: "Sadece dosya hazırlamıyor, sonucu Tajima makinelerimizde gerçek dikişle kanıtlıyoruz."
            },
            mainServices: {
                approval: {
                    title: "Onay Örneği (Stitch Proof)",
                    desc: "Mevcut DST dosyanızı kalibre edilmiş Tajima makinelerimizde işliyor ve size yüksek çözünürlüklü taramasını gönderiyoruz.",
                    includes: [
                        "Gerçek dikiş testi",
                        "Yüksek çözünürlüklü tarama",
                        "İplik renk föyü",
                        "Üretim föyü"
                    ],
                    startingAt: "Şu fiyattan başlayan"
                },
                fix: {
                    title: "Dosya Düzeltme & Çözüm",
                    desc: "Sorunlu dosyalarınızı analiz eder, teknik hataları düzeltir ve sonucu dikiş yaparak kanıtlarız.",
                    includes: [
                        "Teknik hata analizi",
                        "Yoğunluk & alt dikiş düzeltme",
                        "Yeniden dikiş testi",
                        "Düzenlenmiş DST teslimi"
                    ],
                    startingAt: "Şu fiyattan başlayan"
                },
                digitizing: {
                    title: "Tam Dijitalleştirme",
                    desc: "Çizimlerinizi sıfırdan, endüstriyel standartlarda en temiz dikiş yollarıyla dijitalleştiriyoruz.",
                    includes: [
                        "Vektör/Görselden dijitalleştirme",
                        "Kumaşa özel ayarlama",
                        "Tüm makine formatları",
                        "Kanıt dikişi dahil"
                    ],
                    startingAt: "Şu fiyattan başlayan"
                }
            },
            technicalExpertise: {
                title: "Teknik Uzmanlık",
                description: "35 yılı aşkın tecrübemizle nakışın tüm teknik detaylarına hakimiz.",
                item1Title: "Yoğunluk ve Alt Dikiş",
                item1Desc: "Her kumaş türü için optimize edilmiş yapı.",
                item2Title: "Push-Pull Telafisi",
                item2Desc: "Kumaş esnemesini önleyen hassas ayarlar.",
                item3Title: "İplik ve İğne Seçimi",
                item3Desc: "En iyi sonuçlar için uzman eşleşmeleri.",
                item4Title: "Tela Seçimi",
                item4Desc: "Kumaşa özel destekleme tavsiyeleri.",
                item5Title: "Küçük Yazı Ayarı",
                item5Desc: "Okunabilir ince yazı dijitalleştirmesi.",
                item6Title: "Kumaş Analizi",
                item6Desc: "Farklı materyaller için endüstriyel testler."
            },
            stitchLab: {
                title: "Gerçek Stitch Lab Deneyimi",
                description: "Simülasyonlar yanıltıcı olabilir. Biz tasarımlarınızı endüstriyel Tajima makinelerinde gerçek kumaşlara işleyerek tüm hataları üretimden önce eliyoruz.",
                machinePark: "Makine Parkuru",
                scanQuality: "Tarama Kalitesi"
            },
            finalCTA: {
                title: "Dosyanızı Test Etmeye Başlayın",
                description: "Bugün siparişinizi verin, 24-48 saat içinde üretim onayınızı alın.",
                cta: "Sipariş Ver"
            }
        },
        faqsPage: {
            hero: {
                badge: "Sıkça Sorulan Sorular",
                title: "Sorularınızın Yanıtları Burada",
                description: "Dijitalleştirme sürecimiz, onay numunelerimiz ve endüstriyel nakış standartlarımız hakkında bilmeniz gereken her şey."
            },
            categories: {
                services: "Hizmetler ve Fiyatlandırma",
                technical: "Teknik Detaylar",
                turnaround: "Teslimat ve Destek"
            },
            questions: {
                q1: "Onay Kartı (Approval Card) nedir?",
                a1: "Onay Kartı, tasarımınızın gerçek bir Tajima nakış makinesinde dikilmiş yüksek çözünürlüklü taramasıdır. Hassas ölçümler, renk kodları, dikiş sayıları ve yoğunluk tekniklerini içerir; böylece seri üretime geçmeden önce sonuçtan %100 emin olabilirsiniz.",
                q2: "Toplu sipariş indirimi sunuyor musunuz?",
                a2: "Evet! Tekli siparişler için fiyatlandırmamız şeffaf olsa da, aylık yüksek hacimli dijitalleştirme ihtiyacı olan firmalar için özel fiyatlandırma sunuyoruz. Kurumsal hesap için lütfen bizimle iletişime geçin.",
                q3: "'Fix Your DST' hizmeti nasıl çalışır?",
                a3: "Eğer iyi çalışmayan mevcut bir DST dosyanız varsa, bize gönderirsiniz. Analiz eder, teknik sorunları (yoğunluk, alt dikiş, yol planlama) düzeltir ve ardından düzeltmeyi kanıtlamak için dikeriz. Denemeler için değil, çözüm için ödeme yaparsınız.",
                q4: "Hangi dosya formatlarını kabul ediyorsunuz?",
                a4: "Yeni dijitalleştirme için AI, PDF, PNG, JPG ve EPS kabul ediyoruz. Düzenleme/düzeltme için öncelikle DST dosyalarıyla çalışıyoruz, ancak EMB, PES, JEF ve HUS dosyalarını da işleyebiliriz.",
                q5: "Numuneler için hangi makineler kullanılıyor?",
                a5: "En yüksek hassasiyeti sağlamak ve üretim hattınıza mükemmel şekilde yansımasını garanti etmek için yalnızca Tajima endüstriyel nakış makinelerini (TFMX ve TMBR serisi) kullanıyoruz.",
                q6: "3D Puff veya özel ipliklerle çalışabiliyor musunuz?",
                a6: "Kesinlikle. 3D Puff, aplike ve özel iplik yolları (metalik, ateşe dayanıklı) konusunda uzmanız. Yükleme yaparken gereksinimlerinizi belirtmeniz yeterlidir.",
                q7: "Standart teslimat süreniz nedir?",
                a7: "Dijital dosyalar ve dikişli taramalar genellikle 24-48 saat içinde teslim edilir. Ek ücret karşılığında acil servis (12 saat) mevcuttur.",
                q8: "Numuneden memnun kalmazsam ne olur?",
                a8: "Hedefimiz üretime hazır mükemmelliktir. Numune, özel kumaşınız ve makine tipiniz için gereken yüksek kalite standartlarını karşılayana kadar revizyon sunuyoruz.",
                q9: "Final dosyalarımı nasıl teslim alırım?",
                a9: "Dijital taramayı onaylayıp bakiyeyi ödediğinizde, üretime hazır DST dosyaları ve teknik föyler panelinizde anında indirilmeye hazır hale gelir."
            },
            stillQuestions: {
                title: "Hala Sorularınız mı Var?",
                description: "Aradığınız cevabı bulamadınız mı? Teknik destek ekibimize ulaşın.",
                contactBtn: "Destekle İletişime Geç",
                whatsappBtn: "Bizimle Sohbet Edin"
            },
            searchPlaceholder: "Soruların içinde ara..."
        },
        notFound: {
            title: "Sayfa Bulunamadı",
            description: "Oops! Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.",
            backHome: "Ana Sayfaya Dön",
            contactSupport: "Destek Ekibine Ulaş"
        }
    },
    en: {
        common: {
            loading: "Loading...",
            error: "An error occurred",
            success: "Operation successful",
            save: "Save",
            update: "Update",
            cancel: "Cancel",
            delete: "Delete",
            edit: "Edit",
            back: "Back",
            send: "Send",
            welcome: "Welcome",
            logout: "Sign Out",
            profile: "Profile",
            settings: "Settings",
            confirmDelete: "Are you sure you want to delete?",
            deleteSuccess: "File deleted",
            notAvailable: "N/A"
        },
        notifications: {
            title: "Notifications",
            noNotifications: "No notifications yet",
            markAllRead: "Mark all as read",
            clearAll: "Clear all",
            orderUpdate: "Order Update",
            newComment: "New Message",
            system: "System",
            viewOrder: "View Order",
            unread: "Unread",
            now: "Now",
            ago: "ago"
        },
        auth: {
            login: "Sign In",
            register: "Sign Up",
            email: "Email",
            password: "Password",
            forgotPassword: "Forgot Password?",
            noAccount: "Don't have an account?",
            haveAccount: "Already have an account?",
            createAccount: "Create Account",
            fullName: "Full Name",
            firstName: "First Name",
            lastName: "Last Name",
            confirmPassword: "Password (Confirm)",
            rememberMe: "Remember me",
            registerDesc: "Manage your embroidery digitizing orders",
            creatingAccount: "Creating account...",
            loginPage: {
                signIn: "Sign In",
                createAccount: "Create Account",
                welcomeBack: "Welcome Back",
                getStarted: "Get Started",
                enterDetails: "Enter your details to access your design dashboard.",
                createAccountDesc: "Create your account to start digitizing.",
                emailAddress: "Email Address",
                emailPlaceholder: "you@company.com",
                password: "Password",
                forgotPassword: "Forgot Password?",
                fullName: "Full Name",
                firstName: "First Name",
                lastName: "Last Name",
                fullNamePlaceholder: "John Doe",
                orContinueWith: "Or continue with",
                google: "Google",
                termsText: "By signing in, you agree to our",
                termsOfService: "Terms of Service",
                and: "and",
                privacyPolicy: "Privacy Policy",
                agree: ".",
                sidebarTitle: "Precision in every stitch.",
                sidebarDesc: "Join thousands of businesses who trust Approval Stitch for fast, high-quality digitizing and vector conversion services.",
                professionals: "10k+ Professionals",
                trustDaily: "Trust us daily"
            },
            errors: {
                alreadyRegistered: "This email address is already registered",
                registrationError: "An error occurred during registration",
                tooManyAttempts: "Too many registration attempts. Please try again later."
            }
        },
        customers: {
            title: "Customers",
            name: "Name",
            email: "Email",
            joinedAt: "Joined At",
            orderCount: "Order Count",
            noCustomers: "No customers found",
            role: "Role",
            id: "ID"
        },
        sidebar: {
            dashboard: "Dashboard",
            orders: "My Orders",
            allOrders: "All Orders",
            newOrder: "New Order",
            customers: "Customers",
            reports: "Reports",
            settings: "Settings",
            adminPanel: "Admin Panel",
            customerPanel: "Customer Panel"
        },
        dashboard: {
            totalOrders: "Total Orders",
            pending: "Pending",
            inProgress: "In Progress",
            completed: "Completed",
            recentOrders: "Recent Orders",
            noOrders: "No orders found",
            createFirstOrder: "Create your first order"
        },
        orders: {
            createTitle: "New Digitizing Order",
            createDesc: "Upload your design and specify details.",
            title: "Order Title",
            description: "Description & Notes",
            files: "Files",
            status: "Status",
            price: "Price",
            uploadFiles: "Upload Files",
            orderInfo: "Order Info",
            orderNo: "Order No",
            created: "Created",
            updated: "Last Updated",
            delivered: "Order Delivery",
            management: "Order Management",
            messages: "Messages & Order Status",
            support: "Support & Messages",
            refresh: "Auto-refresh: 30s",
            original: "Original",
            preview: "Preview",
            final: "Final",
            noFiles: "No files uploaded yet",
            backToOrders: "Back to Orders",
            updateSuccess: "Order updated successfully",
            updateError: "Error updating order",
            uploadSuccess: "Files uploaded successfully",
            uploadError: "Error uploading files",
            customerName: "Customer",
            uploadPreview: "Upload Preview",
            uploadFinal: "Upload Final",
            previewUploadLabel: "Upload Preview File",
            finalUploadLabel: "Upload Final File",
            payButton: "Make Payment",
            paymentPendingDesc: "You need to make a payment to download the final files.",
            priceApprovalTitle: "Price Approval Required",
            priceApprovalDesc: "Please approve the price set by the admin to proceed.",
            approvePrice: "Approve Price and Continue",
            priceApproved: "Price approved, order is now in progress!",
            previewApprovalTitle: "Preview Approval Required",
            previewApprovalDesc: "Review the preview files uploaded by the admin and approve to continue.",
            approvePreview: "Approve Preview and Continue",
            previewApproved: "Preview approved, order is now in progress!",
            requestRevision: "Request Revision",
            revisionTitle: "Revision Request",
            revisionPlaceholder: "Write revision details here...",
            sendRevision: "Send Request",
            revisionSuccess: "Your revision request has been sent.",
            sendPreview: "Send",
            previewSent: "Preview files sent to customer!",
            wilcomUpload: "Upload Wilcom File",
            send: "Send",
            publishSuccess: "Approval cards published to Final section!",
            publishError: "Failed to publish cards.",
            wilcom: {
                processed: "Processed",
                designName: "Design Name",
                size: "Size",
                stitches: "Stitches",
                runtime: "Runtime",
                colors: "Colors",
                designPreview: "Design Preview",
                customerCard: "Customer Approval Card",
                operatorCard: "Operator Approval Card",
                originalPdf: "Original PDF",
                reUpload: "Re-upload",
                showDetails: "Show Technical Details",
                hideDetails: "Hide Details",
                machineFormat: "Machine Format",
                colorChanges: "Color Changes",
                stops: "Stops",
                trims: "Trims",
                totalThread: "Total Thread",
                totalBobbin: "Total Bobbin",
                maxStitch: "Max Stitch",
                minStitch: "Min Stitch",
                maxJump: "Max Jump",
                colorSequence: "Color Sequence",
                selectPdf: "Select PDF",
                processing: "Processing...",
                uploadDesc: "Upload the Wilcom export PDF to generate approval cards",
                uploadTitle: "Upload Wilcom PDF",
                publishConfirm: "Are you sure you want to send the approval cards to the customer?",
                deleteWilcom: "Delete Wilcom Data",
                deleteWilcomConfirm: "All Wilcom data and approval cards will be permanently deleted. You cannot undo this action. Are you sure?"
            }
        },
        payment: {
            title: "Payment",
            billingInfo: "Billing Information",
            orderSummary: "Order Summary",
            fullName: "Full Name",
            address: "Address",
            phone: "Phone Number",
            cardNumber: "Credit Card Number",
            expiry: "Expiry Date (MM/YY)",
            cvc: "CVC",
            payNow: "Pay Now",
            totalAmount: "Total Amount",
            processing: "Processing...",
            success: "Payment Successful!",
            successDesc: "Your order is completed. You can now download the final files.",
            error: "An error occurred during payment.",
            country: "Country",
            city: "City",
            zipCode: "Zip Code",
            isCompany: "Corporate Invoice",
            companyName: "Company Name",
            taxOffice: "Tax Office",
            taxNumber: "Tax Number",
            individual: "Individual",
            corporate: "Corporate",
            addressPlaceholder: "Street address.."
        },
        header: {
            home: "Home",
            services: "Services",
            portfolio: "Portfolio",
            pricing: "Pricing",
            about: "About",
            contact: "Contact Us",
            startOrder: "Start Order",
            signIn: "Sign In",
            panel: "Dashboard"
        },
        footer: {
            rights: "© 2023 Approval Stitch Inc. All rights reserved.",
            desc: "Real stitched embroidery approvals, backed by experience since 1990<br>Trusted by production teams who need to approve before going live.",
            services: "Services",
            company: "Company",
            support: "Support",
            logoDigitizing: "Logo Digitizing",
            vectorArt: "Vector Art",
            patchDesign: "Patch Design",
            puff3d: "3D Puff",
            aboutUs: "About Us",
            contact: "Contact",
            faq: "FAQ",
            terms: "Terms of Service",
            privacy: "Privacy Policy"
        },
        landing: {
            hero: {
                badge: "Real Approval Stitch",
                titleLine1: "Real Stitched Approval Samples",
                titleLine2: "For Confident Embroidery Production",
                description: "We stitch your design on real production machines so you can approve before mass production.",
                subText: "Processed on production-grade Tajima & Barudan machines. No renders. No simulations. Just real stitched samples.",
                uploadBtn: "Start Order",
                pricingBtn: "View Samples",
                labBadge: "Real Stitch Lab",
                readyBadge: "Production Ready",
                precisionBadge: "Precision",
                stitchedReality: "Stitched Reality"
            },
            why: {
                badge: "Our Story",
                title: "Why Approval Stitch?",
                card1Title: "Real Stitch Lab Accuracy",
                card1Desc: "Real stitches. Real production behavior. We don't simulate. We test your file on a Tajima single-head machine for ultimate precision.",
                card2Title: "Technical Clarity",
                card2Desc: "Every sample includes detailed technical notes: underlay, density, pull compensation, stitch direction, and fabric-specific settings.",
                card3Title: "Production-Ready Confidence",
                card3Desc: "Calibrated approval cards with real stitched samples — measured, aligned, and color-listed. Your files aren't just \"fixed\", they're rebuilt for production."
            },
            receive: {
                badge: "What You Receive",
                title: "What You Receive",
                item1Title: "Approval Card (Client Version)",
                item1Desc: "Client-ready approval card for sign-off before production.",
                item2Title: "Approval Card (Production / Operator Version)",
                item2Desc: "Production approval card with stitch, color, and setup details.",
                item3Title: "Real stitched photos",
                item3Desc: "Photos of the real sample stitches on Tajima or Barudan Machines."
            },
            process: {
                badge: "Process",
                title: "How It Works",
                description: "A seamless flow from upload to a production-ready approval card. Tested, Verified, Ready.",
                step1Title: "Upload & Specs",
                step1Desc: "Upload DST or artwork. Select size, machine brand, fabric, and placement.",
                step2Title: "Real Approval Stitch",
                step2Desc: "We stitch a real approval sample on Tajima or Barudan production machines.",
                step3Title: "Approval Package",
                step3Desc: "You receive approval cards & real photos."
            },
            portfolio: {
                badge: "Portfolio",
                title: "Portfolio",
                description: "From intricate corporate logos to bold puff embroidery, see the quality in every stitch.",
                viewAll: "View All Projects",
                viewDesign: "View Design",
                item1Title: "Corporate Logos",
                item1Sub: "Left Chest & Hat",
                item2Title: "Custom Patches",
                item2Sub: "Merrow Border",
                item3Title: "3D Puff",
                item3Sub: "Caps & Beanies",
                item4Title: "Apparel Art",
                item4Sub: "Jackets & Hoodies"
            },
            cta: {
                rating: "5.0 Rating",
                title: "Ready to stitch your next project?",
                description: "Join thousands of satisfied customers. Upload your design today and get a quote within 12 hours.",
                startBtn: "Start Order",
                contactBtn: "Contact Sales",
                testimonial: "\"Approval Stitch has been our go-to for 3 years. The turnaround is incredibly fast, but what really matters is that the files run smooth on our machines every single time. No thread breaks, perfect density.\"",
                author: "Michael Chen",
                role: "Owner, Chen Custom Apparel"
            },
            backgroundCards: {
                clientLabel: "Client Version",
                operatorLabel: "Production / Operator Version",
                approvalCard: "Approval Card",
                approvalDocument: "Approval Document",
                description: "Professional production verification sheet. This technical document displays thread colors, stitch paths, and quality metrics required for mass manufacturing.",
                features: [
                    "High Resolution Scan",
                    "Thread Color Mapping",
                    "Production Ready Formatting"
                ]
            }
        },
        status: {
            ORDERED: "Order Received",
            APPROVAL_AWAITING: "Awaiting Preview Approval",
            REVISION: "Revision Requested",
            IN_PROGRESS: "In Progress",
            PAYMENT_PENDING: "Payment Pending",
            COMPLETED: "Completed",
            DELIVERED: "Delivered",
            CANCELLED: "Cancelled"
        },
        contactPage: {
            heroBadge: "Get In Touch",
            title: "Contact",
            subtitle: "For real stitched approval samples and production-ready approvals, reach us anytime.",
            quickContactTitle: "Quick Contact",
            email: "info@approvalstitch.com",
            whatsapp: "WhatsApp: +90 548 858 8394",
            whatsappNote: "WhatsApp is for quick questions only.<br>Orders are placed through <a href='/register' class='underline'>Start Order</a>.",
            sendUsInfo: "Have a question before placing an order?",
            replyTime: "We usually reply within 12 hours.",
            whatHappensTitle: "What happens next?",
            step1: "You send us your design and fabric details.",
            step2: "We reply with price, estimated stitch count and ETA.",
            step3: "After your approval, we digitize (if needed) and run a real stitched sample on Tajima.",
            step4: "You receive a photo/scan of the sample, the DST file and the thread list.",
            formTitle: "Send a Message",
            nameLabel: "Your Name",
            namePlaceholder: "Enter your name",
            emailLabel: "Email",
            emailPlaceholder: "Enter your email address",
            subjectLabel: "Subject",
            subjectPlaceholder: "Select a subject",
            messageLabel: "Message",
            messagePlaceholder: "Write your message...",
            attachLabel: "Attach reference file (optional)",
            attachNote: "For orders, please use <a href='/register' class='underline'>Start Order</a>.",
            sendButton: "Send Message",
            orderCtaNote: "Ready to place an order? Use <a href='/register' class='underline'>Start Order</a> for faster processing.",
            subjects: {
                quote: "Get a Quote",
                digitizing: "Digitizing Request",
                sample: "Approval Sample",
                support: "Technical Support",
                other: "Other"
            },
            directComm: {
                title: "Prefer Direct Communication?",
                description: "Reach us instantly via WhatsApp for quick responses and real-time support.",
                button: "Message on WhatsApp"
            },
            validation: {
                nameRequired: "Please enter your name",
                emailRequired: "Please enter your email",
                emailInvalid: "Please enter a valid email address",
                subjectRequired: "Please select a subject",
                messageRequired: "Please write your message"
            }
        },
        aboutPage: {
            hero: {
                badge: "Real Stitch Approval Service",
                title1: "APPROVALSTITCH",
                title2: "Real Stitch. Real Approval.",
                description: "We provide real stitched approval results that show how an embroidery design actually behaves under production conditions."
            },
            whatWeDo: {
                badge: "What We Do",
                title: "Real Stitched Approval Results",
                description: "ApprovalStitch provides real stitched approval results that show how an embroidery design actually behaves under production conditions.",
                detail: "Instead of relying on screen simulations, clean PDFs, or theoretical previews, we demonstrate how the design performs on the fabric you choose, using real stitching conditions. This allows approvals to be made based on reality, not assumptions."
            },
            whyMatters: {
                badge: "Why It Matters",
                title: "Why Real Stitched Approval Samples",
                description: "Embroidery designs often appear correct on screen, yet behave differently once stitched.",
                factors: [
                    "Costly mistakes",
                    "Rejections",
                    "Production delays",
                    "Brand risk"
                ],
                conclusion: "ApprovalStitch is built on over 35 years of real embroidery production experience — not studio assumptions."
            },
            whatYouReceive: {
                badge: "What You Receive",
                title: "Complete Approval Package",
                item1: "A real stitched approval result to present to your customer for sign-off",
                item2: "A detailed production reference card for your machine operator",
                item3: "A clear visual benchmark that aligns approval and production",
                conclusion: "This creates consistency between approval, setup, and final production."
            },
            noMachines: {
                badge: "Benefits",
                title: "No Machines to Buy. No Staff to Manage.",
                description: "ApprovalStitch removes the need to:",
                items: [
                    "Invest in sample machines",
                    "Allocate operators for approval work",
                    "Spend internal time managing trial runs"
                ],
                conclusion: "We handle the approval stitching process so your team can focus on production."
            },
            experience: {
                badge: "Experience",
                title: "Built on Production Experience",
                years: "35+",
                yearsLabel: "Years Experience",
                description: "ApprovalStitch is built on over 35 years of real embroidery production experience — not studio assumptions.<br>We understand how designs behave on real machines, real fabrics, under real production pressure."
            },
            whoIsFor: {
                badge: "Who Is It For",
                title: "Who Is ApprovalStitch For?",
                description: "ApprovalStitch is designed for:",
                audiences: [
                    "Embroidery manufacturers",
                    "Apparel and corporate wear suppliers",
                    "Production and sourcing teams",
                    "Brands that require dependable approval decisions"
                ],
                conclusion: "If your approvals must reflect real production outcomes, ApprovalStitch fits naturally into your workflow."
            },
            finalCta: {
                title: "Ready to Get Started?",
                tagline: "Real stitch approval, ready for production sign-off.",
                cta: "Start Your Order"
            }
        },
        pricingPage: {
            hero: {
                badge: "Pricing",
                title: "Transparency. Simplicity. Real Value.",
                description: "No estimates, no surprises. Clear, simple pricing for stitched approval samples."
            },
            plans: {
                plan1: {
                    name: "Approval Sample",
                    description: "First test or quick check",
                    features: [
                        "Upload your embroidery file (DST / EMB / PES)",
                        "We stitch it <strong>exactly as provided</strong> (no pre-editing)",
                        "Real stitched photo + <strong>Approval Card</strong> delivered"
                    ],
                    notIncluded: [
                        "DST editing / cleanup"
                    ],
                    bestFor: "First test / quick check",
                    cta: "Start Order"
                },
                plan2: {
                    name: "Fix Your DST + Approval Sample",
                    priceNote: "+$10 upgrade if $25 already paid",
                    description: "Designs that may require adjustments after review",
                    features: [
                        "Upload your embroidery file (DST / EMB / PES)",
                        "We do <strong>small fixes only</strong> (density, pull comp, trims, lock stitches, etc.) <br /><i>(No full re-digitizing)</i>",
                        "We <strong>re-stitch after editing</strong>",
                        "Updated stitched photo + <strong>Updated Approval Card</strong> delivered"
                    ],
                    notIncluded: [
                        "Professional digitizing from scratch (DST)"
                    ],
                    bestFor: "Designs that need adjustments after the first review",
                    cta: "Start Order",
                    popular: "Recommended"
                },
                plan3: {
                    name: "New Digitizing + Approval Sample",
                    description: "Custom quote based on stitch count",
                    howItCalculated: "Simple pricing by stitch count",
                    calculationDetails: [
                        "Up to 7,000 stitches → $50 flat",
                        "7,001–30,000 stitches → +$3 per 1,000 stitches",
                        "30,000+ stitches → $155 flat",
                        "We calculate the stitch count for you and apply this pricing — no surprises."
                    ],
                    features: [
                        "Upload artwork in any format (AI, PDF, JPG, etc.)",
                        "Get a custom quote based on stitch count. <i>(We calculate the stitch count based on your design and provide a quote)</i>",
                        "Professional DST digitizing from scratch",
                        "Real machine stitch sample and Approval Card included"
                    ],
                    bestFor: "When you don't have a DST file or starting a new design",
                    cta: "Get Quote"
                },
                included: "Included",
                notIncluded: "Not Included",
                bestForLabel: "Best for:"
            },
            faq: {
                title: "Frequently Asked Questions",
                q1: "What file formats do you accept?",
                a1: "For Approval Sample and Fix Your DST, we need your existing DST file. For Full Digitizing, we accept AI, PDF, PNG, JPG and other common image formats.",
                q2: "What is an 'Approval Card'?",
                a2: "We run your design on an actual Tajima embroidery machine and send you a high-resolution scan with measurements, color codes, and stitch details so you can approve it before mass production.",
                q3: "Can I upgrade from $25 to $35 package?",
                a3: "Yes! If you started with Approval Sample ($25) and need edits, you can upgrade to the Fix Your DST package for just $10 more.",
                q4: "How long does it take?",
                a4: "Standard orders are completed within 24-48 hours. Rush orders can be arranged, contact us for expedited turnaround.",
                customQuoteTitle: "Need a Custom Quote?",
                customQuoteDesc: "For high volume, multiple designs or special requirements, reach out to us.",
                contactUs: "Contact Us"
            }
        },
        servicesPage: {
            hero: {
                badge: "Industrial Standards",
                title: "Our Services",
                description: "We don't just prepare files; we prove the result with real stitching on our Tajima machines."
            },
            mainServices: {
                approval: {
                    title: "Stitch Proof (Approval)",
                    desc: "We process your existing DST file on our calibrated Tajima machines and send you a high-resolution scan.",
                    includes: [
                        "Real stitch test",
                        "High-res scan",
                        "Thread color sheet",
                        "Production sheet"
                    ],
                    startingAt: "Starting at"
                },
                fix: {
                    title: "File Correction & Solution",
                    desc: "We analyze your problematic files, fix technical errors, and prove the result by stitching.",
                    includes: [
                        "Technical error analysis",
                        "Density & underlay correction",
                        "Re-stitch test",
                        "Edited DST delivery"
                    ],
                    startingAt: "Starting at"
                },
                digitizing: {
                    title: "Full Digitizing",
                    desc: "We digitize your drawings from scratch with the cleanest stitch paths at industrial standards.",
                    includes: [
                        "Vector/Image digitizing",
                        "Fabric-specific adjustment",
                        "All machine formats",
                        "Stitch proof included"
                    ],
                    startingAt: "Starting at"
                }
            },
            technicalExpertise: {
                title: "Technical Expertise",
                description: "With over 35 years of experience, we master all technical details of embroidery.",
                item1Title: "Density and Underlay",
                item1Desc: "Structure optimized for every fabric type.",
                item2Title: "Push-Pull Compensation",
                item2Desc: "Precise settings to prevent fabric stretching.",
                item3Title: "Thread and Needle Selection",
                item3Desc: "Expert pairings for the best results.",
                item4Title: "Stabilizer Selection",
                item4Desc: "Fabric-specific backing recommendations.",
                item5Title: "Small Letter Adjustment",
                item5Desc: "Readable fine text digitizing.",
                item6Title: "Fabric Analysis",
                item6Desc: "Industrial tests for different materials."
            },
            stitchLab: {
                title: "Real Stitch Lab Experience",
                description: "Simulations can be misleading. We stitch your designs on real fabrics using industrial Tajima machines to eliminate all errors before production.",
                machinePark: "Machine Park",
                scanQuality: "Scan Quality"
            },
            finalCTA: {
                title: "Start Testing Your File",
                description: "Place your order today and receive your production approval within 24-48 hours.",
                cta: "Order Now"
            }
        },
        faqsPage: {
            hero: {
                badge: "Common Questions",
                title: "Frequently Asked Questions",
                description: "Everything you need to know about our digitizing process, approval samples, and industrial embroidery standards."
            },
            categories: {
                services: "Services & Pricing",
                technical: "Technical Details",
                turnaround: "Turnaround & Support"
            },
            questions: {
                q1: "What is an 'Approval Card'?",
                a1: "An Approval Card is a high-resolution scan of your design actually stitched on a Tajima embroidery machine. It includes precise measurements, color codes, stitch counts, and density technicals so you can be 100% sure of the result before mass production.",
                q2: "Do you offer bulk discounts?",
                a2: "Yes! While our per-design pricing is transparent for single orders, we offer tailored pricing for companies with high-volume monthly digitizing needs. Please contact us for a corporate account.",
                q3: "How does the 'Fix Your DST' service work?",
                a3: "If you have an existing DST file that isn't running well, you send it to us. We analyze it, fix the technical issues (density, underlay, pathing), and then stitch it to prove the fix. You pay for the solution, not the attempts.",
                q4: "What file formats do you accept?",
                a4: "For new digitizing, we accept AI, PDF, PNG, JPG, and EPS. For editing/fixing, we primarily work with DST files, but can handle EMB, PES, JEF, and HUS as well.",
                q5: "What machines are used for samples?",
                a5: "We only use Tajima industrial embroidery machines (TFMX and TMBR series) to ensure the highest possible precision that translates perfectly to your production floor.",
                q6: "Can handle 3D Puff or specialty threads?",
                a6: "Absolutely. We specialize in 3D Puff, appliqué, and specialty thread pathing (metallic, fire-resistant). Just specify your requirements when uploading.",
                q7: "What is your standard turnaround time?",
                a7: "Digital files and stitched scans are typically delivered within 24-48 hours. Rush service (12 hours) is available for an additional fee.",
                q8: "What if I'm not happy with the sample?",
                a8: "Our goal is production-ready perfection. We offer revisions until the sample meets the high quality standards required for your specific fabric and machine type.",
                q9: "How do I receive my final files?",
                a9: "Once you approve the digital scan and pay the balance, the production-ready DST files and technical sheets are immediately available for download in your dashboard."
            },
            stillQuestions: {
                title: "Still Have Questions?",
                description: "Can't find the answer you're looking for? Reach out to our technical support team.",
                contactBtn: "Contact Support",
                whatsappBtn: "Chat with Us"
            },
            searchPlaceholder: "Search questions..."
        },
        notFound: {
            title: "Page Not Found",
            description: "Oops! It seems like the page you are looking for has been moved, deleted, or never existed in the first place.",
            backHome: "Back to Home",
            contactSupport: "Contact Support"
        }
    }
};
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Documents/nakis/src/components/providers/language-provider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageProvider",
    ()=>LanguageProvider,
    "useLanguage",
    ()=>useLanguage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$src$2f$lib$2f$dictionary$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/src/lib/dictionary.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/next/navigation.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const LanguageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function LanguageProvider({ children, initialLang }) {
    const [language, setLanguageState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialLang);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const setLanguage = (lang)=>{
        setLanguageState(lang);
        // Complete path mapping for all pages with different slugs
        const pathMappings = {
            // Auth pages
            'login': {
                en: '/login',
                tr: '/tr/giris'
            },
            'giris': {
                en: '/login',
                tr: '/tr/giris'
            },
            'register': {
                en: '/register',
                tr: '/tr/kayit'
            },
            'kayit': {
                en: '/register',
                tr: '/tr/kayit'
            },
            'forgot-password': {
                en: '/forgot-password',
                tr: '/tr/sifremi-unuttum'
            },
            'sifremi-unuttum': {
                en: '/forgot-password',
                tr: '/tr/sifremi-unuttum'
            },
            'reset-password': {
                en: '/reset-password',
                tr: '/tr/sifre-sifirla'
            },
            'sifre-sifirla': {
                en: '/reset-password',
                tr: '/tr/sifre-sifirla'
            },
            // Public pages
            'about': {
                en: '/about',
                tr: '/tr/hakkimizda'
            },
            'hakkimizda': {
                en: '/about',
                tr: '/tr/hakkimizda'
            },
            'contact': {
                en: '/contact',
                tr: '/tr/iletisim'
            },
            'iletisim': {
                en: '/contact',
                tr: '/tr/iletisim'
            },
            'services': {
                en: '/services',
                tr: '/tr/hizmetler'
            },
            'hizmetler': {
                en: '/services',
                tr: '/tr/hizmetler'
            },
            'pricing': {
                en: '/pricing',
                tr: '/tr/fiyatlandirma'
            },
            'fiyatlandirma': {
                en: '/pricing',
                tr: '/tr/fiyatlandirma'
            },
            'faqs': {
                en: '/faqs',
                tr: '/tr/sss'
            },
            'sss': {
                en: '/faqs',
                tr: '/tr/sss'
            },
            'privacy-policy': {
                en: '/privacy-policy',
                tr: '/tr/gizlilik-politikasi'
            },
            'gizlilik-politikasi': {
                en: '/privacy-policy',
                tr: '/tr/gizlilik-politikasi'
            },
            'cookie-policy': {
                en: '/cookie-policy',
                tr: '/tr/cerez-politikasi'
            },
            'cerez-politikasi': {
                en: '/cookie-policy',
                tr: '/tr/cerez-politikasi'
            },
            'distance-sales-agreement': {
                en: '/distance-sales-agreement',
                tr: '/tr/mesafeli-satis-sozlesmesi'
            },
            'mesafeli-satis-sozlesmesi': {
                en: '/distance-sales-agreement',
                tr: '/tr/mesafeli-satis-sozlesmesi'
            },
            'delivery-and-returns': {
                en: '/delivery-and-returns',
                tr: '/tr/teslimat-ve-iade'
            },
            'teslimat-ve-iade': {
                en: '/delivery-and-returns',
                tr: '/tr/teslimat-ve-iade'
            },
            // Dashboard pages
            'dashboard': {
                en: '/dashboard',
                tr: '/tr/panel'
            },
            'panel': {
                en: '/dashboard',
                tr: '/tr/panel'
            },
            'orders': {
                en: '/orders',
                tr: '/tr/siparisler'
            },
            'siparisler': {
                en: '/orders',
                tr: '/tr/siparisler'
            },
            'settings': {
                en: '/settings',
                tr: '/tr/ayarlar'
            },
            'ayarlar': {
                en: '/settings',
                tr: '/tr/ayarlar'
            },
            'customers': {
                en: '/customers',
                tr: '/tr/musteriler'
            },
            'musteriler': {
                en: '/customers',
                tr: '/tr/musteriler'
            },
            'reports': {
                en: '/reports',
                tr: '/tr/raporlar'
            },
            'raporlar': {
                en: '/reports',
                tr: '/tr/raporlar'
            }
        };
        // Extract the page slug from the current path
        const pathWithoutTr = pathname.replace(/^\/tr/, '');
        const segments = pathWithoutTr.split('/').filter(Boolean);
        const pageSlug = segments[0] || '';
        // Check if we have a mapping for this page
        if (pageSlug && pathMappings[pageSlug]) {
            const mapping = pathMappings[pageSlug];
            // Handle subpaths (like /orders/123 or /orders/new)
            const remainingPath = segments.slice(1).join('/');
            const basePath = lang === 'en' ? mapping.en : mapping.tr;
            const newPath = remainingPath ? `${basePath}/${remainingPath}` : basePath;
            router.push(newPath);
            return;
        }
        // Default logic for home page and unmapped paths
        if (lang === 'en') {
            const newPath = pathname.replace(/^\/tr/, '') || '/';
            router.push(newPath);
        } else {
            const newPath = pathname.startsWith('/tr') ? pathname : `/tr${pathname}`;
            router.push(newPath);
        }
    };
    const value = {
        language,
        setLanguage,
        t: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$src$2f$lib$2f$dictionary$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["translations"][language]
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/Documents/nakis/src/components/providers/language-provider.tsx",
        lineNumber: 105,
        columnNumber: 9
    }, this);
}
function useLanguage() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
}),
"[project]/Documents/nakis/src/components/cookie-banner.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CookieBanner",
    ()=>CookieBanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$src$2f$components$2f$providers$2f$language$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/src/components/providers/language-provider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function CookieBanner() {
    const { language } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$src$2f$components$2f$providers$2f$language$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLanguage"])();
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            const timer = setTimeout(()=>setIsVisible(true), 1500);
            return ()=>clearTimeout(timer);
        }
    }, []);
    const handleAccept = ()=>{
        localStorage.setItem("cookie-consent", "accepted");
        setIsVisible(false);
    };
    const handleDecline = ()=>{
        localStorage.setItem("cookie-consent", "declined");
        setIsVisible(false);
    };
    const content = {
        tr: {
            title: "Çerez Kullanımı",
            description: "Size en iyi deneyimi sunmak için çerezleri kullanıyoruz. Sitemizi kullanarak çerez politikamızı kabul etmiş sayılırsınız.",
            accept: "Kabul Et",
            decline: "Reddet",
            settings: "Ayarlar",
            policy: "Politikamız",
            link: "/tr/cerez-politikasi"
        },
        en: {
            title: "Cookie Usage",
            description: "We use cookies to provide the best experience on our website. By continuing to use our site, you agree to our cookie policy.",
            accept: "Accept",
            decline: "Decline",
            settings: "Settings",
            policy: "Our Policy",
            link: "/cookie-policy"
        }
    };
    const t = content[language] || content.en;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: isVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                y: 100,
                opacity: 0
            },
            animate: {
                y: 0,
                opacity: 1
            },
            exit: {
                y: 100,
                opacity: 0
            },
            transition: {
                type: "spring",
                damping: 25,
                stiffness: 200
            },
            className: "fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[100]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-[2rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 backdrop-blur-xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start gap-4 mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "size-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "material-symbols-outlined text-blue-600 text-2xl",
                                    children: "cookie"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/nakis/src/components/cookie-banner.tsx",
                                    lineNumber: 66,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/nakis/src/components/cookie-banner.tsx",
                                lineNumber: 65,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "text-lg font-black text-[#172136] mb-1",
                                        children: t.title
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/nakis/src/components/cookie-banner.tsx",
                                        lineNumber: 69,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-[#616f89] leading-relaxed",
                                        children: t.description
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/nakis/src/components/cookie-banner.tsx",
                                        lineNumber: 70,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/nakis/src/components/cookie-banner.tsx",
                                lineNumber: 68,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/nakis/src/components/cookie-banner.tsx",
                        lineNumber: 64,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleAccept,
                                className: "px-6 py-3 bg-[#145BEC] text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95",
                                children: t.accept
                            }, void 0, false, {
                                fileName: "[project]/Documents/nakis/src/components/cookie-banner.tsx",
                                lineNumber: 77,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleDecline,
                                className: "px-6 py-3 bg-gray-100 text-[#172136] rounded-xl font-bold text-sm hover:bg-gray-200 transition-all active:scale-95",
                                children: t.decline
                            }, void 0, false, {
                                fileName: "[project]/Documents/nakis/src/components/cookie-banner.tsx",
                                lineNumber: 83,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: t.link,
                                className: "text-xs font-bold text-[#145BEC] hover:underline ml-auto",
                                children: t.policy
                            }, void 0, false, {
                                fileName: "[project]/Documents/nakis/src/components/cookie-banner.tsx",
                                lineNumber: 89,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/nakis/src/components/cookie-banner.tsx",
                        lineNumber: 76,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/nakis/src/components/cookie-banner.tsx",
                lineNumber: 63,
                columnNumber: 21
            }, this)
        }, void 0, false, {
            fileName: "[project]/Documents/nakis/src/components/cookie-banner.tsx",
            lineNumber: 56,
            columnNumber: 17
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/nakis/src/components/cookie-banner.tsx",
        lineNumber: 54,
        columnNumber: 9
    }, this);
}
}),
"[project]/Documents/nakis/src/components/providers/theme-provider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/next-themes/dist/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
function ThemeProvider({ children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/Documents/nakis/src/components/providers/theme-provider.tsx",
        lineNumber: 10,
        columnNumber: 12
    }, this);
}
}),
"[project]/Documents/nakis/src/components/providers.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Providers",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/next-auth/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$src$2f$components$2f$providers$2f$theme$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/src/components/providers/theme-provider.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SessionProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$src$2f$components$2f$providers$2f$theme$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ThemeProvider"], {
            attribute: "class",
            defaultTheme: "system",
            enableSystem: true,
            disableTransitionOnChange: true,
            children: children
        }, void 0, false, {
            fileName: "[project]/Documents/nakis/src/components/providers.tsx",
            lineNumber: 9,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/nakis/src/components/providers.tsx",
        lineNumber: 8,
        columnNumber: 9
    }, this);
}
}),
"[project]/Documents/nakis/src/components/ui/sonner.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toaster",
    ()=>Toaster
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleCheckIcon$3e$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-ssr] (ecmascript) <export default as CircleCheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__InfoIcon$3e$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/lucide-react/dist/esm/icons/info.js [app-ssr] (ecmascript) <export default as InfoIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2Icon$3e$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$octagon$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__OctagonXIcon$3e$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/lucide-react/dist/esm/icons/octagon-x.js [app-ssr] (ecmascript) <export default as OctagonXIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TriangleAlertIcon$3e$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript) <export default as TriangleAlertIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/next-themes/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const Toaster = ({ ...props })=>{
    const { theme = "system" } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTheme"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Toaster"], {
        theme: theme,
        className: "toaster group",
        icons: {
            success: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleCheckIcon$3e$__["CircleCheckIcon"], {
                className: "size-4"
            }, void 0, false, {
                fileName: "[project]/Documents/nakis/src/components/ui/sonner.tsx",
                lineNumber: 21,
                columnNumber: 18
            }, void 0),
            info: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__InfoIcon$3e$__["InfoIcon"], {
                className: "size-4"
            }, void 0, false, {
                fileName: "[project]/Documents/nakis/src/components/ui/sonner.tsx",
                lineNumber: 22,
                columnNumber: 15
            }, void 0),
            warning: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TriangleAlertIcon$3e$__["TriangleAlertIcon"], {
                className: "size-4"
            }, void 0, false, {
                fileName: "[project]/Documents/nakis/src/components/ui/sonner.tsx",
                lineNumber: 23,
                columnNumber: 18
            }, void 0),
            error: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$octagon$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__OctagonXIcon$3e$__["OctagonXIcon"], {
                className: "size-4"
            }, void 0, false, {
                fileName: "[project]/Documents/nakis/src/components/ui/sonner.tsx",
                lineNumber: 24,
                columnNumber: 16
            }, void 0),
            loading: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2Icon$3e$__["Loader2Icon"], {
                className: "size-4 animate-spin"
            }, void 0, false, {
                fileName: "[project]/Documents/nakis/src/components/ui/sonner.tsx",
                lineNumber: 25,
                columnNumber: 18
            }, void 0)
        },
        style: {
            "--normal-bg": "var(--popover)",
            "--normal-text": "var(--popover-foreground)",
            "--normal-border": "var(--border)",
            "--border-radius": "var(--radius)"
        },
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/nakis/src/components/ui/sonner.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__9cf801be._.js.map