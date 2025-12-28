# Proje'deki Panel Geliştirme Yol Haritası (To-Do List)

## 🔴 Kritik Eksiklikler & Mantık Hataları
- [ ] **E-posta Entegrasyonu:** (Resend, Nodemailer vb.)
    - [ ] Yeni üyelik doğrulama mailleri.
    - [ ] Profil değişikliği doğrulama mailleri.
    - [ ] Sipariş durum değişikliği bildirimleri.
    - [ ] Fiyat onay bildirimleri.
- [ ] **Ödeme Sistemi:**
    - [x] Test ödeme entegrasyonu.
    - [ ] Gerçek ödeme entegrasyonu (iyzico).
    - [ ] Ödeme durumu takibi.
    - [ ] Fatura oluşturma mekanizması.
- [x] **Sipariş Reddi/İptal Akışı:**
    - [x] Müşterinin fiyatı reddedebilme seçeneği.
    - [x] Sipariş iptal mekanizması ve dosya temizleme politikası:
        - [x] Sipariş iptal edildiğinde sipariş arşivlenir.
        - [x] İptal edilen siparişler 30 gün sonra silinir.

## 🟡 Önemli Geliştirmeler
- [x] **Wilcom Entegrasyonu:**
    - [x] Wilcom PDF'i eklendiğinde eğer müşteri tarafından sipariş ismi verilmediyse PDF'deki ismi alıp sipariş ismi olarak kaydet.
    - [x] Operator ve customer PDF'lerinde kozmetik değişiklikler.
- [x] **Bildirim Sistemi:**
    - [x] Push notifications veya in-app bildirim sistemi.
    - [x] Bildirimler için ses efekti eklenecek.
    - [x] Bildirimler sağ alt köşede 10 saniye gösterilecek.
    - [x] Dashboard'da okunmamış bildirim sayacı.
- [x] **Sipariş Durum Akışı İyileştirmesi:**
    - [x] `PAYMENT_PENDING` / `PAYMENT_COMPLETED` durumları.
    - [x] `DELIVERED` durumu (Dosyaların indirildiğinin takibi).

- [x] **Erişilebilirlik:**
    - [x] Tüm buton ve ikon bileşenlerine aria-label ekleyin.
    - [x] Renk kontrastını kontrol edin (özellikle “badge” renkleri).

- [x] **Dosya Yönetimi:**
    - [x] Dosya versiyonlama (v1, v2...).
    - [x] Müşteri tarafında final dosyalarını toplu dosya indirme (ZIP).

## 🟢 Küçük Ama Önemli Eklemeler
- [x] **Hesap Yönetimi:**
    - [x] "Şifremi Unuttum" / Şifre sıfırlama akışı.
    - [x] Hesap silme (GDPR uyumu).
- [x] **Admin Araçları:**
    - [x] Sipariş arama ve gelişmiş filtreleme.
    - [x] Müşteri notları alanı (CRM basic).
- [x] **Sipariş Detayları:**
    - [x] Öncelik seviyesi (Urgent/Normal). (müşteri acil sipariş isteği için siparşi olştururken belirtebilsin. bunu seçerse yanda fiyatın artacağını belirten ikolar eklenecek)
    - [x] Tahmini teslim tarihi alanı. (default olarak 24-48 saat)
    - [x] Kullanıcı sipariş teklifini kabul ettikten sonra, admin sadece revizyon durumunda fiyatı değiştirebilir. 

## 🔧 Teknik İyileştirmeler
- [x] **Güvenlik:**
    - [x] Rate limiting (brute-force koruması).
    - [x] CSRF token kontrolü.
    - [x] Input sanitization.
- [x] **Performans:**
    - [x] Resim optimizasyonu (`next/image` kullanımı).
    - [x] Veritabanı indexleme.
    - [x] Pagination (Sayfalama) sistemleri.
- [x] **UX (Kullanıcı Deneyimi):**
    - [x] Dark/Light mode geçişi.
