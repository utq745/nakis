# Proje Geliştirme Yol Haritası (To-Do List)

## 🔴 Kritik Eksiklikler & Mantık Hataları
- [ ] **E-posta Entegrasyonu:** (Resend, Nodemailer vb.)
    - [ ] Profil değişikliği doğrulama mailleri.
    - [ ] Sipariş durum değişikliği bildirimleri.
    - [ ] Fiyat onay bildirimleri.
- [ ] **Ödeme Sistemi:**
    - [ ] Gerçek ödeme entegrasyonu (Stripe, PayTR vb.).
    - [ ] Ödeme durumu takibi.
    - [ ] Fatura oluşturma mekanizması.
- [x] **Sipariş Reddi/İptal Akışı:**
    - [x] Müşterinin fiyatı reddedebilme seçeneği.
    - [x] Sipariş iptal mekanizması ve dosya temizleme politikası:
        - [x] Sipariş iptal edildiğinde sipariş arşivlenir.
        - [x] İptal edilen siparişler 30 gün sonra silinir.

## 🟡 Önemli Geliştirmeler
- [x] **Bildirim Sistemi:**
    - [x] Push notifications veya in-app bildirim sistemi.
    - [x] Dashboard'da okunmamış bildirim sayacı.
- [x] **Sipariş Durum Akışı İyileştirmesi:**
    - [x] `PAYMENT_PENDING` / `PAYMENT_COMPLETED` durumları.
    - [x] `DELIVERED` durumu (Dosyaların indirildiğinin takibi).

- [ ] **Dosya Yönetimi:**
    - [x] Dosya versiyonlama (v1, v2...).
    - [x] Müşteri tarafında final dosyalarını toplu dosya indirme (ZIP).

## 🟢 Küçük Ama Önemli Eklemeler
- [x] **Hesap Yönetimi:**
    - [x] "Şifremi Unuttum" / Şifre sıfırlama akışı.
    - [x] Hesap silme (GDPR uyumu).
- [ ] **Admin Araçları:**
    - [ ] Sipariş arama ve gelişmiş filtreleme.
    - [x] Müşteri notları alanı (CRM basic).
- [x] **Sipariş Detayları:**
    - [x] Öncelik seviyesi (Urgent/Normal). (müşteri acil sipariş isteği için siparşi olştururken belirtebilsin. bunu seçerse yanda fiyatın artacağını belirten ikolar eklenecek)
    - [x] Tahmini teslim tarihi alanı. (default olarak 24-48 saat)

## 🔧 Teknik İyileştirmeler
- [ ] **Güvenlik:**
    - [ ] Rate limiting (brute-force koruması).
    - [ ] CSRF token kontrolü.
    - [ ] Input sanitization.
- [ ] **Performans:**
    - [ ] Resim optimizasyonu (`next/image` kullanımı).
    - [ ] Veritabanı indexleme.
    - [ ] Pagination (Sayfalama) sistemleri.
- [x] **UX (Kullanıcı Deneyimi):**
    - [x] Dark/Light mode geçişi.
