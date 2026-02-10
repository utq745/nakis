(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/nakis/src/lib/dictionary.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/nakis/src/components/providers/language-provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageProvider",
    ()=>LanguageProvider,
    "useLanguage",
    ()=>useLanguage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$src$2f$lib$2f$dictionary$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/src/lib/dictionary.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
const LanguageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function LanguageProvider({ children, initialLang }) {
    _s();
    const [language, setLanguageState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialLang);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
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
        t: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$src$2f$lib$2f$dictionary$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["translations"][language]
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/Documents/nakis/src/components/providers/language-provider.tsx",
        lineNumber: 105,
        columnNumber: 9
    }, this);
}
_s(LanguageProvider, "PsIbKPXg2BO1Lf+UILzqLkhQd24=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = LanguageProvider;
function useLanguage() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
_s1(useLanguage, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "LanguageProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/nakis/src/components/theme-toggle.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeToggle",
    ()=>ThemeToggle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/lucide-react/dist/esm/icons/moon.js [app-client] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/lucide-react/dist/esm/icons/sun.js [app-client] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function ThemeToggle({ isAtTop = false }) {
    _s();
    const { theme, setTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const [mounted, setMounted] = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "ThemeToggle.useEffect": ()=>{
            setMounted(true);
        }
    }["ThemeToggle.useEffect"], []);
    if (!mounted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-14 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse"
        }, void 0, false, {
            fileName: "[project]/Documents/nakis/src/components/theme-toggle.tsx",
            lineNumber: 18,
            columnNumber: 13
        }, this);
    }
    const isDark = theme === "dark";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: ()=>setTheme(isDark ? "light" : "dark"),
        className: `relative w-[56px] h-8 rounded-full p-1 transition-all duration-300 focus:outline-none flex items-center ${isAtTop ? "bg-blue-50 hover:bg-white/20 dark:bg-white/10 dark:hover:bg-white/20 border border-blue-100 dark:border-white/20 backdrop-blur-sm" : "bg-blue-50 dark:bg-zinc-800 border border-blue-100 dark:border dark:border-white/10"}`,
        "aria-label": "Toggle theme",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute left-1 h-6 w-6 rounded-full z-0 bg-white",
                initial: false,
                animate: {
                    x: isDark ? 0 : 24
                },
                transition: {
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                }
            }, void 0, false, {
                fileName: "[project]/Documents/nakis/src/components/theme-toggle.tsx",
                lineNumber: 34,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 grid grid-cols-2 w-full h-full items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center h-full",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
                            className: `h-3.5 w-3.5 transition-colors duration-300 ${isDark ? "text-primary" : "text-zinc-500 dark:text-white/50"}`
                        }, void 0, false, {
                            fileName: "[project]/Documents/nakis/src/components/theme-toggle.tsx",
                            lineNumber: 50,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/nakis/src/components/theme-toggle.tsx",
                        lineNumber: 49,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center h-full",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                            className: `h-3.5 w-3.5 transition-colors duration-300 translate-x-[1.5px] ${isDark ? "text-zinc-500 dark:text-white/50" : "text-primary"}`
                        }, void 0, false, {
                            fileName: "[project]/Documents/nakis/src/components/theme-toggle.tsx",
                            lineNumber: 53,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/nakis/src/components/theme-toggle.tsx",
                        lineNumber: 52,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/nakis/src/components/theme-toggle.tsx",
                lineNumber: 48,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/nakis/src/components/theme-toggle.tsx",
        lineNumber: 25,
        columnNumber: 9
    }, this);
}
_s(ThemeToggle, "uGU5l7ciDSfqFDe6wS7vfMb29jQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c = ThemeToggle;
var _c;
__turbopack_context__.k.register(_c, "ThemeToggle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/nakis/src/components/header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Header",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// Force HMR update to resolve hydration mismatch
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$src$2f$components$2f$providers$2f$language$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/src/components/providers/language-provider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$src$2f$components$2f$theme$2d$toggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/src/components/theme-toggle.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/next-auth/react.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/next/image.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function Header({ forceSolid = false, fullWidth = false }) {
    _s();
    const { language, setLanguage, t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$src$2f$components$2f$providers$2f$language$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"])();
    const { data: session } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"])();
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [lastScrollY, setLastScrollY] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isAtTop, setIsAtTop] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(!forceSolid);
    const [mobileMenuOpen, setMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const isLoggedIn = !!session;
    const isAdmin = session?.user?.role === "ADMIN";
    const panelUrl = language === 'tr' ? '/tr/panel' : '/dashboard';
    const newOrderUrl = language === 'tr' ? '/tr/siparisler/new' : '/orders/new';
    const loginUrl = language === 'tr' ? '/tr/giris' : '/login';
    const registerUrl = language === 'tr' ? '/tr/kayit' : '/register';
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            if (forceSolid) {
                setIsAtTop(false);
                return;
            }
            const handleScroll = {
                "Header.useEffect.handleScroll": ()=>{
                    const currentScrollY = window.scrollY;
                    // Track if we are at the very top
                    setIsAtTop(currentScrollY < 20);
                    // Threshold to prevent flickering on small scrolls
                    const scrollDistance = Math.abs(currentScrollY - lastScrollY);
                    if (scrollDistance < 10 && currentScrollY > 100) return;
                    // Show header if:
                    // 1. At the top of the page (scrollY < 100)
                    // 2. Scrolling up (currentScrollY < lastScrollY)
                    if (currentScrollY < 100) {
                        setIsVisible(true);
                    } else if (currentScrollY < lastScrollY) {
                        // Scrolling up
                        setIsVisible(true);
                    } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                        // Scrolling down and past threshold
                        setIsVisible(false);
                    }
                    setLastScrollY(currentScrollY);
                }
            }["Header.useEffect.handleScroll"];
            window.addEventListener("scroll", handleScroll, {
                passive: true
            });
            return ({
                "Header.useEffect": ()=>{
                    window.removeEventListener("scroll", handleScroll);
                }
            })["Header.useEffect"];
        }
    }["Header.useEffect"], [
        lastScrollY
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: `fixed top-0 left-0 right-0 z-50 whitespace-nowrap border-b border-solid transition-all duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'} ${isAtTop ? 'bg-transparent border-transparent py-5' : 'bg-white/80 backdrop-blur-md border-b-[#e5e7eb] py-3 shadow-sm dark:bg-[#18212f]/80 dark:border-b-[#2a3441]'}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${fullWidth ? 'w-full px-4 md:px-8 xl:px-12' : 'container mx-auto px-4 md:px-6'} flex items-center justify-between`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `flex items-center gap-4 transition-colors duration-300 ${isAtTop ? 'text-primary dark:text-white' : 'text-primary dark:text-white'}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: language === 'tr' ? '/tr' : '/',
                            className: "flex items-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative h-16 w-64",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: "/images/approval-stich-logo.webp",
                                        alt: "Approval Stitch - Real Stitched Approval Sample",
                                        fill: true,
                                        priority: true,
                                        className: "object-contain dark:hidden"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/nakis/src/components/header.tsx",
                                        lineNumber: 76,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: "/images/approval-stich-logo-w.webp",
                                        alt: "Approval Stitch - Real Stitched Approval Sample",
                                        fill: true,
                                        priority: true,
                                        className: "object-contain hidden dark:block"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/nakis/src/components/header.tsx",
                                        lineNumber: 83,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/nakis/src/components/header.tsx",
                                lineNumber: 75,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/nakis/src/components/header.tsx",
                            lineNumber: 74,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/nakis/src/components/header.tsx",
                        lineNumber: 73,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-1 justify-end gap-3 md:gap-8 items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden lg:flex items-center gap-1 xl:gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        className: `px-4 py-2 rounded-lg text-sm font-bold leading-normal transition-all duration-300 ${isAtTop ? 'text-primary dark:text-white hover:bg-blue-50 dark:hover:bg-white/10' : 'text-primary dark:text-white hover:bg-blue-50 dark:hover:bg-white/10'}`,
                                        href: language === 'tr' ? '/tr' : '/',
                                        children: t.header.home
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/nakis/src/components/header.tsx",
                                        lineNumber: 95,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        className: `px-4 py-2 rounded-lg text-sm font-bold leading-normal transition-all duration-300 ${isAtTop ? 'text-primary dark:text-white hover:bg-blue-50 dark:hover:bg-white/10' : 'text-primary dark:text-white hover:bg-blue-50 dark:hover:bg-white/10'}`,
                                        href: language === 'tr' ? '/tr/hakkimizda' : '/about',
                                        children: language === 'tr' ? 'Hakkımızda' : 'About'
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/nakis/src/components/header.tsx",
                                        lineNumber: 96,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        className: `px-4 py-2 rounded-lg text-sm font-bold leading-normal transition-all duration-300 ${isAtTop ? 'text-primary dark:text-white hover:bg-blue-50 dark:hover:bg-white/10' : 'text-primary dark:text-white hover:bg-blue-50 dark:hover:bg-white/10'}`,
                                        href: language === 'tr' ? '/tr/fiyatlandirma' : '/pricing',
                                        children: t.header.pricing
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/nakis/src/components/header.tsx",
                                        lineNumber: 97,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        className: `px-4 py-2 rounded-lg text-sm font-bold leading-normal transition-all duration-300 ${isAtTop ? 'text-primary dark:text-white hover:bg-blue-50 dark:hover:bg-white/10' : 'text-primary dark:text-white hover:bg-blue-50 dark:hover:bg-white/10'}`,
                                        href: language === 'tr' ? '/tr/iletisim' : '/contact',
                                        children: t.header.contact
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/nakis/src/components/header.tsx",
                                        lineNumber: 98,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/nakis/src/components/header.tsx",
                                lineNumber: 94,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2 items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: isLoggedIn ? panelUrl : loginUrl,
                                        className: "hidden sm:inline-block",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: `h-10 px-4 rounded-lg text-sm font-bold transition-all duration-300 ${isAtTop ? 'text-primary dark:text-white hover:bg-blue-50 dark:hover:bg-white/10' : 'text-primary dark:text-white hover:bg-blue-50 dark:hover:bg-white/10'}`,
                                            children: isLoggedIn ? t.header.panel : t.header.signIn
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/nakis/src/components/header.tsx",
                                            lineNumber: 103,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/nakis/src/components/header.tsx",
                                        lineNumber: 102,
                                        columnNumber: 25
                                    }, this),
                                    !isAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: isLoggedIn ? newOrderUrl : registerUrl,
                                        className: "hidden sm:inline-block",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary-dark transition-colors shadow-md transition-all duration-300",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "truncate",
                                                children: t.header.startOrder
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/nakis/src/components/header.tsx",
                                                lineNumber: 111,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/nakis/src/components/header.tsx",
                                            lineNumber: 110,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/nakis/src/components/header.tsx",
                                        lineNumber: 109,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setLanguage(language === 'tr' ? 'en' : 'tr'),
                                        className: `relative flex items-center w-[64px] h-8 rounded-full p-1 transition-all duration-300 focus:outline-none ${isAtTop ? "bg-blue-50 hover:bg-white/20 dark:bg-white/10 dark:hover:bg-white/20 border border-blue-100 dark:border-white/20 backdrop-blur-sm" : "bg-blue-50 dark:bg-zinc-800 border border-blue-100 dark:border dark:border-white/10"}`,
                                        "aria-label": "Toggle language",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                className: "absolute left-1 h-6 w-7 rounded-full z-0 bg-white",
                                                initial: false,
                                                animate: {
                                                    x: language === 'tr' ? 28 : 0
                                                },
                                                transition: {
                                                    type: "spring",
                                                    stiffness: 500,
                                                    damping: 30
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/nakis/src/components/header.tsx",
                                                lineNumber: 125,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative z-10 grid grid-cols-2 w-full h-full items-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-center h-full",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `text-[10px] font-black transition-colors duration-300 ${language === 'en' ? 'text-primary' : 'text-zinc-500 dark:text-white/50'}`,
                                                            children: "EN"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/nakis/src/components/header.tsx",
                                                            lineNumber: 141,
                                                            columnNumber: 37
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/nakis/src/components/header.tsx",
                                                        lineNumber: 140,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-center h-full",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `text-[10px] font-black transition-colors duration-300 translate-x-[1px] ${language === 'tr' ? 'text-primary' : 'text-zinc-500 dark:text-white/50'}`,
                                                            children: "TR"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/nakis/src/components/header.tsx",
                                                            lineNumber: 144,
                                                            columnNumber: 37
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/nakis/src/components/header.tsx",
                                                        lineNumber: 143,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/nakis/src/components/header.tsx",
                                                lineNumber: 139,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/nakis/src/components/header.tsx",
                                        lineNumber: 116,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$src$2f$components$2f$theme$2d$toggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeToggle"], {
                                        isAtTop: isAtTop
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/nakis/src/components/header.tsx",
                                        lineNumber: 149,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setMobileMenuOpen(true),
                                        className: `lg:hidden flex items-center justify-center size-10 rounded-lg transition-colors ${isAtTop ? 'text-primary dark:text-white hover:bg-blue-50 dark:hover:bg-white/10' : 'text-[#111318] dark:text-white hover:bg-blue-50 dark:hover:bg-[#2a3441]'}`,
                                        "aria-label": "Open menu",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "material-symbols-outlined",
                                            children: "menu"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/nakis/src/components/header.tsx",
                                            lineNumber: 160,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/nakis/src/components/header.tsx",
                                        lineNumber: 152,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/nakis/src/components/header.tsx",
                                lineNumber: 101,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/nakis/src/components/header.tsx",
                        lineNumber: 93,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/nakis/src/components/header.tsx",
                lineNumber: 72,
                columnNumber: 13
            }, this),
            mobileMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 lg:hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
                        onClick: ()=>setMobileMenuOpen(false)
                    }, void 0, false, {
                        fileName: "[project]/Documents/nakis/src/components/header.tsx",
                        lineNumber: 170,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-0 right-0 h-screen w-[85vw] max-w-[400px] bg-white dark:bg-[#18212f] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between p-6 border-b border-[#e5e7eb] dark:border-[#2a3441]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative h-14 w-60",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    src: "/images/approval-stich-logo.webp",
                                                    alt: "Approval Stitch - Real Stitched Approval Sample",
                                                    fill: true,
                                                    className: "object-contain dark:hidden"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/nakis/src/components/header.tsx",
                                                    lineNumber: 181,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    src: "/images/approval-stich-logo-w.webp",
                                                    alt: "Approval Stitch - Real Stitched Approval Sample",
                                                    fill: true,
                                                    className: "object-contain hidden dark:block"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/nakis/src/components/header.tsx",
                                                    lineNumber: 187,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/nakis/src/components/header.tsx",
                                            lineNumber: 180,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/nakis/src/components/header.tsx",
                                        lineNumber: 179,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setMobileMenuOpen(false),
                                        className: "size-10 flex items-center justify-center rounded-lg hover:bg-[#f0f2f4] dark:hover:bg-[#2a3441] transition-colors",
                                        "aria-label": "Close menu",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "material-symbols-outlined text-[#111318] dark:text-white",
                                            children: "close"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/nakis/src/components/header.tsx",
                                            lineNumber: 200,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/nakis/src/components/header.tsx",
                                        lineNumber: 195,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/nakis/src/components/header.tsx",
                                lineNumber: 178,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                className: "flex-1 flex items-center justify-center px-6",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-1 w-full",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: language === 'tr' ? '/tr' : '/',
                                            onClick: ()=>setMobileMenuOpen(false),
                                            className: "px-6 py-3 text-center text-[#111318] dark:text-white hover:bg-[#f0f2f4] dark:hover:bg-[#2a3441] rounded-xl transition-colors font-bold text-base",
                                            children: t.header.home
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/nakis/src/components/header.tsx",
                                            lineNumber: 207,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: language === 'tr' ? '/tr/hakkimizda' : '/about',
                                            onClick: ()=>setMobileMenuOpen(false),
                                            className: "px-6 py-3 text-center text-[#111318] dark:text-white hover:bg-[#f0f2f4] dark:hover:bg-[#2a3441] rounded-xl transition-colors font-bold text-base",
                                            children: language === 'tr' ? 'Hakkımızda' : 'About'
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/nakis/src/components/header.tsx",
                                            lineNumber: 214,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: language === 'tr' ? '/tr/fiyatlandirma' : '/pricing',
                                            onClick: ()=>setMobileMenuOpen(false),
                                            className: "px-6 py-3 text-center text-[#111318] dark:text-white hover:bg-[#f0f2f4] dark:hover:bg-[#2a3441] rounded-xl transition-colors font-bold text-base",
                                            children: t.header.pricing
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/nakis/src/components/header.tsx",
                                            lineNumber: 222,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: language === 'tr' ? '/tr/iletisim' : '/contact',
                                            onClick: ()=>setMobileMenuOpen(false),
                                            className: "px-6 py-3 text-center text-[#111318] dark:text-white hover:bg-[#f0f2f4] dark:hover:bg-[#2a3441] rounded-xl transition-colors font-bold text-base",
                                            children: t.header.contact
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/nakis/src/components/header.tsx",
                                            lineNumber: 229,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "my-2 border-t border-[#e5e7eb] dark:border-[#2a3441]"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/nakis/src/components/header.tsx",
                                            lineNumber: 237,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: isLoggedIn ? panelUrl : loginUrl,
                                            onClick: ()=>setMobileMenuOpen(false),
                                            className: "px-4 py-2 text-center text-[#111318] dark:text-white hover:bg-[#f0f2f4] dark:hover:bg-[#2a3441] rounded-lg transition-colors font-bold text-sm",
                                            children: isLoggedIn ? t.header.panel : t.header.signIn
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/nakis/src/components/header.tsx",
                                            lineNumber: 239,
                                            columnNumber: 33
                                        }, this),
                                        !isAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: isLoggedIn ? newOrderUrl : registerUrl,
                                            onClick: ()=>setMobileMenuOpen(false),
                                            className: "px-4 py-2 bg-primary text-white hover:bg-primary-dark rounded-lg transition-colors font-bold text-center text-sm shadow-lg",
                                            children: t.header.startOrder
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/nakis/src/components/header.tsx",
                                            lineNumber: 247,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/nakis/src/components/header.tsx",
                                    lineNumber: 206,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/nakis/src/components/header.tsx",
                                lineNumber: 205,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pb-[3vh] px-6 text-center border-t border-[#e5e7eb] dark:border-[#2a3441] pt-6",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-[#616f89] dark:text-gray-500",
                                    children: [
                                        "© ",
                                        new Date().getFullYear(),
                                        " Approval Stitch. All rights reserved."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/nakis/src/components/header.tsx",
                                    lineNumber: 260,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/nakis/src/components/header.tsx",
                                lineNumber: 259,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/nakis/src/components/header.tsx",
                        lineNumber: 176,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/nakis/src/components/header.tsx",
                lineNumber: 168,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/nakis/src/components/header.tsx",
        lineNumber: 66,
        columnNumber: 9
    }, this);
}
_s(Header, "tLlIhsv3ckR8FRAn14dS7y/H4A0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$src$2f$components$2f$providers$2f$language$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"]
    ];
});
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/nakis/src/components/footer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Footer",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$src$2f$components$2f$providers$2f$language$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/src/components/providers/language-provider.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function Footer() {
    _s();
    const { t, language } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$src$2f$components$2f$providers$2f$language$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "w-full bg-background dark:bg-card border-t border-border py-12 px-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between gap-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-4 max-w-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative h-14 w-60",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            src: "/images/approval-stich-logo.webp",
                                            alt: "Approval Stitch - Real Stitched Approval Sample",
                                            fill: true,
                                            className: "object-contain object-left dark:hidden"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/nakis/src/components/footer.tsx",
                                            lineNumber: 16,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            src: "/images/approval-stich-logo-w.webp",
                                            alt: "Approval Stitch - Real Stitched Approval Sample",
                                            fill: true,
                                            className: "object-contain object-left hidden dark:block"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/nakis/src/components/footer.tsx",
                                            lineNumber: 22,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/nakis/src/components/footer.tsx",
                                    lineNumber: 15,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/nakis/src/components/footer.tsx",
                                lineNumber: 14,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-muted-foreground text-sm leading-relaxed",
                                children: t.footer.desc
                            }, void 0, false, {
                                fileName: "[project]/Documents/nakis/src/components/footer.tsx",
                                lineNumber: 30,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/nakis/src/components/footer.tsx",
                        lineNumber: 13,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 md:grid-cols-2 lg:flex gap-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-foreground font-bold text-sm uppercase tracking-wider",
                                        children: t.footer.company
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/nakis/src/components/footer.tsx",
                                        lineNumber: 36,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                className: "text-muted-foreground hover:text-primary transition-colors text-sm",
                                                href: language === 'tr' ? '/tr/hakkimizda' : '/about',
                                                children: language === 'tr' ? 'Hakkımızda' : 'About Us'
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/nakis/src/components/footer.tsx",
                                                lineNumber: 38,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                className: "text-muted-foreground hover:text-primary transition-colors text-sm",
                                                href: language === 'tr' ? '/tr/fiyatlandirma' : '/pricing',
                                                children: t.header.pricing
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/nakis/src/components/footer.tsx",
                                                lineNumber: 39,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                className: "text-muted-foreground hover:text-primary transition-colors text-sm",
                                                href: language === 'tr' ? '/tr/iletisim' : '/contact',
                                                children: t.footer.contact
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/nakis/src/components/footer.tsx",
                                                lineNumber: 41,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/nakis/src/components/footer.tsx",
                                        lineNumber: 37,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/nakis/src/components/footer.tsx",
                                lineNumber: 35,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-foreground font-bold text-sm uppercase tracking-wider",
                                        children: t.footer.support
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/nakis/src/components/footer.tsx",
                                        lineNumber: 45,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                className: "text-muted-foreground hover:text-primary transition-colors text-sm",
                                                href: language === 'tr' ? '/tr/sss' : '/faqs',
                                                children: t.footer.faq
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/nakis/src/components/footer.tsx",
                                                lineNumber: 47,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                className: "text-muted-foreground hover:text-primary transition-colors text-sm",
                                                href: language === 'tr' ? '/tr/cerez-politikasi' : '/cookie-policy',
                                                children: language === 'tr' ? 'Çerez Politikası' : 'Cookie Policy'
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/nakis/src/components/footer.tsx",
                                                lineNumber: 48,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                className: "text-muted-foreground hover:text-primary transition-colors text-sm",
                                                href: language === 'tr' ? '/tr/gizlilik-politikasi' : '/privacy-policy',
                                                children: t.footer.privacy
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/nakis/src/components/footer.tsx",
                                                lineNumber: 49,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                className: "text-muted-foreground hover:text-primary transition-colors text-sm",
                                                href: language === 'tr' ? '/tr/mesafeli-satis-sozlesmesi' : '/distance-sales-agreement',
                                                children: language === 'tr' ? 'Mesafeli Satış Sözleşmesi' : 'Distance Sales Agreement'
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/nakis/src/components/footer.tsx",
                                                lineNumber: 50,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                className: "text-muted-foreground hover:text-primary transition-colors text-sm",
                                                href: language === 'tr' ? '/tr/teslimat-ve-iade' : '/delivery-and-returns',
                                                children: language === 'tr' ? 'Teslimat ve İade' : 'Delivery and Returns'
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/nakis/src/components/footer.tsx",
                                                lineNumber: 51,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                className: "text-muted-foreground hover:text-primary transition-colors text-sm",
                                                href: "/sitemap.xml",
                                                children: language === 'tr' ? 'Site Haritası' : 'Sitemap'
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/nakis/src/components/footer.tsx",
                                                lineNumber: 52,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/nakis/src/components/footer.tsx",
                                        lineNumber: 46,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/nakis/src/components/footer.tsx",
                                lineNumber: 44,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/nakis/src/components/footer.tsx",
                        lineNumber: 34,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/nakis/src/components/footer.tsx",
                lineNumber: 12,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-[1280px] mx-auto mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center md:items-start gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-muted-foreground text-sm",
                                children: t.footer.rights.replace(/\d{4}/, new Date().getFullYear().toString())
                            }, void 0, false, {
                                fileName: "[project]/Documents/nakis/src/components/footer.tsx",
                                lineNumber: 59,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-muted-foreground text-xs",
                                children: [
                                    "Designed & Developed by ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "https://www.utkusakallioglu.com",
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        className: "hover:text-primary transition-colors",
                                        children: "Utku"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/nakis/src/components/footer.tsx",
                                        lineNumber: 63,
                                        columnNumber: 49
                                    }, this),
                                    "."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/nakis/src/components/footer.tsx",
                                lineNumber: 62,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/nakis/src/components/footer.tsx",
                        lineNumber: 58,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "/iyzico_colored.svg",
                                alt: language === 'tr' ? 'iyzico ile öde' : 'Pay with iyzico',
                                width: 80,
                                height: 34,
                                className: "h-[34px] w-auto opacity-90 hover:opacity-100 transition-opacity dark:hidden",
                                loading: "lazy"
                            }, void 0, false, {
                                fileName: "[project]/Documents/nakis/src/components/footer.tsx",
                                lineNumber: 67,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "/iyzico_white.svg",
                                alt: language === 'tr' ? 'iyzico ile öde' : 'Pay with iyzico',
                                width: 80,
                                height: 34,
                                className: "hidden dark:block h-[34px] w-auto opacity-90 hover:opacity-100 transition-opacity",
                                loading: "lazy"
                            }, void 0, false, {
                                fileName: "[project]/Documents/nakis/src/components/footer.tsx",
                                lineNumber: 75,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/nakis/src/components/footer.tsx",
                        lineNumber: 66,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/nakis/src/components/footer.tsx",
                lineNumber: 57,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/nakis/src/components/footer.tsx",
        lineNumber: 11,
        columnNumber: 9
    }, this);
}
_s(Footer, "xPRXa+5YJbeTpOb7fTPpYarOwsc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$src$2f$components$2f$providers$2f$language$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"]
    ];
});
_c = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/nakis/src/components/providers/theme-provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)");
"use client";
;
;
function ThemeProvider({ children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/Documents/nakis/src/components/providers/theme-provider.tsx",
        lineNumber: 10,
        columnNumber: 12
    }, this);
}
_c = ThemeProvider;
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/nakis/src/components/providers.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Providers",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/next-auth/react.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$src$2f$components$2f$providers$2f$theme$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/src/components/providers/theme-provider.tsx [app-client] (ecmascript)");
"use client";
;
;
;
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SessionProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$src$2f$components$2f$providers$2f$theme$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeProvider"], {
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
_c = Providers;
var _c;
__turbopack_context__.k.register(_c, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/internal/font/google/geist_a4b5a2fc.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "geist_a4b5a2fc-module__rHtkuW__className",
  "variable": "geist_a4b5a2fc-module__rHtkuW__variable",
});
}),
"[next]/internal/font/google/geist_a4b5a2fc.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_a4b5a2fc$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/geist_a4b5a2fc.module.css [app-client] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_a4b5a2fc$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Geist', 'Geist Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_a4b5a2fc$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_a4b5a2fc$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[next]/internal/font/google/geist_mono_f4001f50.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "geist_mono_f4001f50-module__EPczKG__className",
  "variable": "geist_mono_f4001f50-module__EPczKG__variable",
});
}),
"[next]/internal/font/google/geist_mono_f4001f50.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_mono_f4001f50$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/geist_mono_f4001f50.module.css [app-client] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_mono_f4001f50$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Geist Mono', 'Geist Mono Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_mono_f4001f50$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_mono_f4001f50$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[next]/internal/font/google/inter_ebfe5b0c.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "inter_ebfe5b0c-module__vyy85a__className",
  "variable": "inter_ebfe5b0c-module__vyy85a__variable",
});
}),
"[next]/internal/font/google/inter_ebfe5b0c.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_ebfe5b0c$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/inter_ebfe5b0c.module.css [app-client] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_ebfe5b0c$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Inter', 'Inter Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_ebfe5b0c$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_ebfe5b0c$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[project]/Documents/nakis/src/app/fonts.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_a4b5a2fc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/geist_a4b5a2fc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_mono_f4001f50$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/geist_mono_f4001f50.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_ebfe5b0c$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/inter_ebfe5b0c.js [app-client] (ecmascript)");
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
;
;
;
}),
"[next]/internal/font/google/geist_a4b5a2fc.js [app-client] (ecmascript) <export default as geistSans>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "geistSans",
    ()=>__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_a4b5a2fc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_a4b5a2fc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/geist_a4b5a2fc.js [app-client] (ecmascript)");
}),
"[next]/internal/font/google/geist_mono_f4001f50.js [app-client] (ecmascript) <export default as geistMono>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "geistMono",
    ()=>__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_mono_f4001f50$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_mono_f4001f50$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/geist_mono_f4001f50.js [app-client] (ecmascript)");
}),
"[next]/internal/font/google/inter_ebfe5b0c.js [app-client] (ecmascript) <export default as inter>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "inter",
    ()=>__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_ebfe5b0c$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_ebfe5b0c$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/inter_ebfe5b0c.js [app-client] (ecmascript)");
}),
"[project]/Documents/nakis/src/app/not-found.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NotFound
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$src$2f$components$2f$providers$2f$language$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/src/components/providers/language-provider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$src$2f$components$2f$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/src/components/header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$src$2f$components$2f$footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/src/components/footer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$src$2f$components$2f$providers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/nakis/src/components/providers.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$src$2f$app$2f$fonts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/nakis/src/app/fonts.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_a4b5a2fc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__geistSans$3e$__ = __turbopack_context__.i("[next]/internal/font/google/geist_a4b5a2fc.js [app-client] (ecmascript) <export default as geistSans>");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_mono_f4001f50$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__geistMono$3e$__ = __turbopack_context__.i("[next]/internal/font/google/geist_mono_f4001f50.js [app-client] (ecmascript) <export default as geistMono>");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_ebfe5b0c$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__inter$3e$__ = __turbopack_context__.i("[next]/internal/font/google/inter_ebfe5b0c.js [app-client] (ecmascript) <export default as inter>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function NotFoundContent() {
    _s();
    const { t, language } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$src$2f$components$2f$providers$2f$language$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col min-h-screen bg-[#f8fafc] dark:bg-[#09090b] font-[family-name:var(--font-inter)]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$src$2f$components$2f$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Header"], {}, void 0, false, {
                fileName: "[project]/Documents/nakis/src/app/not-found.tsx",
                lineNumber: 16,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-grow flex items-center justify-center p-6 pt-32",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-xl w-full text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                scale: 0.8
                            },
                            animate: {
                                opacity: 1,
                                scale: 1
                            },
                            transition: {
                                duration: 0.5
                            },
                            className: "relative mb-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-[12rem] md:text-[16rem] font-black text-primary/10 leading-none select-none",
                                    children: "404"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/nakis/src/app/not-found.tsx",
                                    lineNumber: 26,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "material-symbols-outlined text-[100px] text-primary animate-bounce",
                                        children: "search_off"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/nakis/src/app/not-found.tsx",
                                        lineNumber: 30,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Documents/nakis/src/app/not-found.tsx",
                                    lineNumber: 29,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/nakis/src/app/not-found.tsx",
                            lineNumber: 20,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                duration: 0.5,
                                delay: 0.2
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-4xl font-black text-[#172136] dark:text-white mb-6",
                                    children: t.notFound.title
                                }, void 0, false, {
                                    fileName: "[project]/Documents/nakis/src/app/not-found.tsx",
                                    lineNumber: 41,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg text-[#616f89] dark:text-gray-400 mb-10 leading-relaxed",
                                    children: t.notFound.description
                                }, void 0, false, {
                                    fileName: "[project]/Documents/nakis/src/app/not-found.tsx",
                                    lineNumber: 44,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col sm:flex-row items-center justify-center gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: language === 'tr' ? '/tr' : '/',
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "material-symbols-outlined",
                                                        children: "home"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/nakis/src/app/not-found.tsx",
                                                        lineNumber: 51,
                                                        columnNumber: 37
                                                    }, this),
                                                    t.notFound.backHome
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/nakis/src/app/not-found.tsx",
                                                lineNumber: 50,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/nakis/src/app/not-found.tsx",
                                            lineNumber: 49,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: language === 'tr' ? '/tr/iletisim' : '/contact',
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "px-8 py-4 bg-white dark:bg-[#18181b] text-[#172136] dark:text-white rounded-xl font-bold text-lg hover:bg-gray-50 dark:hover:bg-[#27272a] border border-[#e5e7eb] dark:border-[#27272a] transition-all flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "material-symbols-outlined",
                                                        children: "support_agent"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/nakis/src/app/not-found.tsx",
                                                        lineNumber: 57,
                                                        columnNumber: 37
                                                    }, this),
                                                    t.notFound.contactSupport
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/nakis/src/app/not-found.tsx",
                                                lineNumber: 56,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/nakis/src/app/not-found.tsx",
                                            lineNumber: 55,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/nakis/src/app/not-found.tsx",
                                    lineNumber: 48,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/nakis/src/app/not-found.tsx",
                            lineNumber: 36,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/nakis/src/app/not-found.tsx",
                    lineNumber: 19,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/nakis/src/app/not-found.tsx",
                lineNumber: 18,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$src$2f$components$2f$footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Footer"], {}, void 0, false, {
                fileName: "[project]/Documents/nakis/src/app/not-found.tsx",
                lineNumber: 66,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/nakis/src/app/not-found.tsx",
        lineNumber: 15,
        columnNumber: 9
    }, this);
}
_s(NotFoundContent, "xPRXa+5YJbeTpOb7fTPpYarOwsc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$src$2f$components$2f$providers$2f$language$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"]
    ];
});
_c = NotFoundContent;
function NotFound() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: "en",
        suppressHydrationWarning: true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("head", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "robots",
                        content: "noindex, nofollow"
                    }, void 0, false, {
                        fileName: "[project]/Documents/nakis/src/app/not-found.tsx",
                        lineNumber: 75,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap",
                        rel: "stylesheet"
                    }, void 0, false, {
                        fileName: "[project]/Documents/nakis/src/app/not-found.tsx",
                        lineNumber: 76,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/nakis/src/app/not-found.tsx",
                lineNumber: 74,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
                className: `${__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_a4b5a2fc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__geistSans$3e$__["geistSans"].variable} ${__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_mono_f4001f50$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__geistMono$3e$__["geistMono"].variable} ${__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_ebfe5b0c$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__inter$3e$__["inter"].variable} antialiased font-sans`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$src$2f$components$2f$providers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Providers"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$src$2f$components$2f$providers$2f$language$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LanguageProvider"], {
                        initialLang: "en",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$nakis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NotFoundContent, {}, void 0, false, {
                            fileName: "[project]/Documents/nakis/src/app/not-found.tsx",
                            lineNumber: 81,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/nakis/src/app/not-found.tsx",
                        lineNumber: 80,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Documents/nakis/src/app/not-found.tsx",
                    lineNumber: 79,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/nakis/src/app/not-found.tsx",
                lineNumber: 78,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/nakis/src/app/not-found.tsx",
        lineNumber: 73,
        columnNumber: 9
    }, this);
}
_c1 = NotFound;
var _c, _c1;
__turbopack_context__.k.register(_c, "NotFoundContent");
__turbopack_context__.k.register(_c1, "NotFound");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__f9eea66a._.js.map