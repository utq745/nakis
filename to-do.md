## Görsel olarak değişecek maddeler ##

- [ ] Anasayfada Heroda düşük çözürlüklerde sol ve görsel alan saçmalıyor.
- [x] Registerda üye olunmuyor. (Mail doğrulama şimdilik devre dışı bırakıldı ve rate limit artırıldı)
- [x] Login sayfasında header ile sayfa genişliği aynı değil.
- [x] Anasayfada headerda yer alan fotoğraf tam oturmalı. Şu an üstten alttan kırpılıyor. 
- [x] Anasayfada ve about sayfasındaki What You Receive bölümündeki sıralama şu şekilde olmalı: real stitched photo -> client version -> operator version
- [x] Anasayfada Why Approval Stitch? bölümünü anasayfada kaldıralım. component olarak sakla, ilerde kullanılacak.
- [x] Anasayfada müşteri yorumlarını gösteren bölümü kaldır. component olarak sakla, ilerde kullanılacak.
- [x] Anasayfada Portfoilio bölümü kaldırılacak. component olarak sakla, ilerde kullanılacak.
- [x] Coockie policy sayfasındaki Update button'ını kaldır.
- [x] Headerdaki menu linklerinin hover efektini buton gibi yap.
- [x] Headerdaki Sign In linkinin hover efektini buton gibi yap.
- [x] Mobilde gelen yan menüdeki menü linklerinin fonlarını ve aralarındaki boşluğu küçült.
- [x] Tüm sayfarladaki hero alanımn light versiyonu yok. Aynı dark versiyonundaki gibi çok hafif belirgin bir animasyon olmalı.
- [x] Anasayfadaki heroda soldaki yazı alanı dark modda fazl aydınlık olmuş, biraz koyu olmalı.
- [x] What You Receive componentinde "Real stitched photos" un görseli şu olacak: /Users/utkusakallioglu/Documents/nakis/Real_stitched_photos.webp Görselin alt etiketini "Real stitched photos" olarak değiştir.
- [ ] What You Receive componentinde "Client version" un görseli şu olacak: /Users/utkusakallioglu/Documents/nakis/Client_version.webp Görselin alt etiketini "Client version" olarak değiştir.
- [ ] What You Receive componentinde "Operator version" un görseli şu olacak: /Users/utkusakallioglu/Documents/nakis/Operator_version.webp Görselin alt etiketini "Operator version" olarak değiştir.
- [x] Tüm sayfalardaki tüm sectionlarda title altına gelen çizgi (varsa) biraz daha yukarı kaymalı.





## Panel tarafında yapılacak değişiklikler ##

- [x] paneli tam ekran değil, sitedeki gibi 1450 pixel (ya da kaçsa) genişliğinde yapalım
- [x] müşteri sipariş oluşturuken gönderdiğim ekranda kartların karşısında fiyatlar yazacak. sırasıyla 25, 35, 60 dolar
- [x] iş akışında fiyat belirleme ve fiyatı kabul etme adımlarını kaldırıyoruz. zaten fiyatlar sabit.
- [x] admin panelindeki order managment kısmındaki fiyat belirleme yerini de kaldırıyoruz.
- [x] müşteri SADECE 1. paketi seçerse eğer en ucuz paketi seçerse revizyon isteme hakkı olacak (diğer paketlerde revizyon hakkı yok). ama revizyon isterse 10 dolarlık ekstra ücret ödeyecek. yani toplam tutarına 10 dolarlık ekstra ücret ödenecek. bunu ödeme ekranında revizyon ücreti olarak göstereceğiz.


## Yeni Sipariş Akışı (Tamamlandı) ##

**Yeni Durum Akışları:**
- `ORDERED` → Sipariş alındı (başlangıç durumu)
- `APPROVAL_AWAITING` → Önizleme onayı bekleniyor (sadece Paket 1)
- `REVISION` → Revizyon istendi (sadece Paket 1, +$10)
- `IN_PROGRESS` → Sipariş hazırlanıyor
- `PAYMENT_PENDING` → Ödeme bekleniyor
- `COMPLETED` → Ödeme tamamlandı
- `DELIVERED` → Dosyalar indirildi
- `CANCELLED` → İptal edildi

**Kaldırılan Durumlar:**
- ~~WAITING_PRICE~~
- ~~PRICED~~
- ~~PRICE_ACCEPTED~~
- ~~PAYMENT_COMPLETED~~

**Yapılan Değişiklikler:**
- [x] `src/types/index.ts` - OrderStatus enum güncellendi
- [x] `src/lib/dictionary.ts` - Status etiketleri güncellendi
- [x] `prisma/schema.prisma` - Default status ORDERED olarak değiştirildi
- [x] `src/app/api/orders/route.ts` - Sipariş oluşturma ORDERED ile başlıyor
- [x] `src/app/api/orders/[id]/route.ts` - Update schema ve status labels güncellendi
- [x] Order detail client dosyaları (TR/EN) - Banner'lar yeni akışa göre güncellendi
- [x] Payment form - COMPLETED durumu kullanılıyor
- [x] Files API - COMPLETED durumu kontrol ediliyor
