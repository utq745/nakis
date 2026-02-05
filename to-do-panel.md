# Proje'deki Panel Geliştirme Yol Haritası (To-Do List)

## 🔴 Kritik Eksiklikler & Mantık Hataları
- [ ] **E-posta Entegrasyonu:** (Resend, Nodemailer vb.)
    - [ ] Yeni üyelik doğrulama mailleri.
    - [ ] Şifre sıfırlama mailleri.
    - [ ] Sipariş onay maili. (Sistemde sipariş oluşturulduğunda [ORDERED] otomatik gönderilecek) hem müşteriye hem admine.
    - [ ] Sipariş iptal maili. (Sistemde sipariş iptal edildiğinde [CANCELLED] otomatik gönderilecek) hem müşteriye hem admine.
    - [ ] Sipariş hazırlanıyor maili. (Sistemde sipariş hazırlanıyor [IN_PROGRESS] olarak işaretlendiğinde otomatik gönderilecek)
    - [ ] Sipariş hazırlandı, ödeme bekleniyor maili. (Sistemde sipariş hazırlandı [PAYMENT_PENDING] olarak işaretlendiğinde otomatik gönderilecek)
    - [ ] Sipariş revizyon maili. (Sistemde sipariş revizyon talebi oluşturulduğunda [REVISION] otomatik gönderilecek) hem müşteriye hem admine.
    - [ ] Ödeme tamamlandı maili. (Sistemde ödeme tamamlandı [COMPLETED] olarak işaretlendiğinde otomatik gönderilecek) hem müşteriye hem admine.
- [ ] **Ödeme Sistemi:**
    - [x] Test ödeme entegrasyonu.
    - [ ] Gerçek ödeme entegrasyonu (iyzico).
    - [ ] Ödeme durumu takibi.
    - [ ] Fatura oluşturma mekanizması.