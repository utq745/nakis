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


## 1-2 Ocak 2026 ##

- [x] Yeni sipariş oluştururken AI, PDF, PNG, JPG, DST ve JPEG dosya formatları da seçilebiliyor
- [x] Yeni siparişte sadece 1 dosya yükleme zorunluluğu eklendi (min/max 1)
- [x] Admin panelinde dosya indirme butonu yeni sekmede açmak yerine doğrudan indiriyor
- [x] Giriş ekranına "Beni Hatırla" (Remember Me) checkbox seçeneği eklendi
- [x] Operator onay kartından sadece onay kutuları kaldırıldı
- [x] Customer onay kartına Color Grid bölümü eklendi
- [x] operator ve customer onay kartlarında CUSTOMER ARTWORK başlığı altındaki kutuya adminin preview olarak yüklediği görsel (etrafındaki boşluk kırpılmalı) konmalı.
- [x] Customer artwork görüntüsü kutunun içine sığacak şekilde crop ediliyor (object-fit: cover)
- [x] Light modda Headerdaki toggel butonunları ve admindeki order status selectbox'ının hover modundaki arkaplan rengi açık mavi olmalı
- [x] hem admin hem de müşteri panelinde order detail sayfasındaki order info kısmında tarihte yıl da görünmeli
- [x] anasayfadaki hero alanı light versiyonda arkaplan rengi #F6F7F8 olmalı
- [x] eğer müşteri sipariş oluştururken sipariş ismini boş bırakırsa, operator ve müşteri cardlarında design name olarak sisteme yüklenen wilcom dosyasındaki design name yazılmalı
- [x] müşteri sipariş oluştururken (son aşamada gönderirken) çıkan animasyon 2 saniye sürmeli ya da 2 saniye o bekletmeli.
- [x] admin panelinde dark modda Upload Wilcom File panelindeki butonların hover efektinde font rengi beyaz olmalı. (send butonu hariç)
- [x] anasayfadaki hero alanı sağ ve sol yanlarına operator ve müşteri card imajları ve %10 opacity ile arkaplanına konmalı (customer_approval_card.webp ve operator_approval_card.webp). sağa ve sola eklenen bu görseller yalnızca masaüstü görünümünde görünmeli.
- [x] bir üst maddede heroya eklenen görsellerin opacity'si light modda %20 olmalı
- [x] heronun sağ alt bölümüne  hero-barudan.webp %30 opacity ile eklenmeli (yalnızca masaüstü görünümünde görünmeli). width: 300px, height: auto. bottom: %1, right: %1
- [x] What You Receive sectionındaki başlık ve altındaki yazılar şu şekilde olmalı: 
    - Başlık: Real stitched photos
    - Alt Yazı: Photos of the real sample stitches on Tajima or Barudan Machines.
    - Başlık: Approval Card (Client Version)
    - Alt Yazı: Client-ready approval card for sign-off before production.
    - Başlık: Approval Card (Production / Operator Version)
    - Alt Yazı: Production approval card with stitch, color, and setup details.
- [x] What You Receive sectionındaki görseller şu şekilde olmalı:
    - Real stitched photos: /Users/utkusakallioglu/Documents/nakis/What_You_Receive_Real_stitched_photos.webp
    - Approval Card (Client Version): /Users/utkusakallioglu/Documents/nakis/What_You_Receive_Approval_card_client_version.webp
    - Approval Card (Production / Operator Version): /Users/utkusakallioglu/Documents/nakis/What_You_Receive_Approval_card_production_operator_version.webp
- [x] Hem anasaydadaki hem de About sayfasındaki How it works sectionındaki başlık ve altındaki yazılar şu şekilde olmalı:
    - Başlık: Upload & Specs
    - Alt Yazı: Upload DST or artwork. Select size, machine brand, fabric, and placement.
    - Başlık: Real Approval Stitch
    - Alt Yazı: We stitch a real approval sample on Tajima or Barudan production machines.
    - Başlık: Approval Package
    - Alt Yazı: You receive approval cards & real photos.


- [x] How it works sectionındaki görseller şu şekilde olmalı:
    - Upload & Specs: 
    - Real Approval Stitch: /Users/utkusakallioglu/Documents/nakis/Real-Approval-Stitch.webm videsu eklenmeli kapak olarak /Users/utkusakallioglu/Documents/nakis/howitsworks-Real-Approval-Stitch.webp görseli olmalı. kapakta ortalı bir şekilde play butonu olmalı ve tıklandığında popup olarak video oynatılmalı. popup kapısının sağ üstünde close butonu olmalı.
    - Approval Package: /Users/utkusakallioglu/Documents/nakis/Approval-Package.webp
- [x] Frequently Asked Questions bölümündeki akordiyon ikonları dark modda color-green-500 olmalı.
- [x] Pricing sayfasındaki card'ların içeriği değişecek.


