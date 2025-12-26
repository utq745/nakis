# SEO İyileştirmeleri - Yapılacaklar Listesi

> **Not:** Dashboard ve Auth sayfaları hariç tüm İngilizce sayfalar incelendi.
> **Son Güncelleme:** 26 Aralık 2025

---

## 🔴 KRİTİK SEVİYE (Hemen Yapılmalı)

### 1. Meta Etiketleri ve Başlıklar

#### Ana Sayfa (/)
- [x] `generateMetadata` fonksiyonu eklenmelidir (şu anda sadece layout'ta var, sayfa özelinde yok) ✅
- [x] Sayfa özelinde benzersiz bir title ve description tanımlanmalı ✅
- [x] Hero bölümündeki resme anlamlı `alt` etiketi eklenmeli (`"Embroidery hero"` çok genel) ✅

#### About Sayfası (/about)
- [x] `"use client"` direktifi kaldırılarak Server Component yapılmalı veya `generateMetadata` eklenmelidir ✅
- [x] Sayfa için özel `<title>` ve `<meta description>` tanımlanmalı ✅
- [x] Önerilen title: `"About Approval Stitch | 35+ Years of Embroidery Expertise"` ✅
- [x] Önerilen description: `"Learn about Approval Stitch's 35+ years of embroidery digitizing experience. We deliver production-ready DST files with real stitch verification on Tajima machines."` ✅

#### Contact Sayfası (/contact)
- [x] Server-side metadata eklenmelidir ✅
- [x] Önerilen title: `"Contact Us | Approval Stitch - Embroidery Digitizing Services"` ✅
- [x] Önerilen description: `"Get in touch with Approval Stitch for professional embroidery digitizing. Quick response within 12 hours. Email, WhatsApp support available."` ✅

#### Services Sayfası (/services)
- [x] Server-side metadata eklenmelidir ✅
- [x] Önerilen title: `"Our Services | Professional Embroidery Digitizing & Stitch Approval"` ✅
- [x] Önerilen description: `"Explore our embroidery digitizing services: Real Stitched Approval, Fix & Verify, Full Master Digitizing. Proven on Tajima machines."` ✅

#### Pricing Sayfası (/pricing)
- [x] Server-side metadata eklenmelidir ✅
- [x] Önerilen title: `"Pricing | Transparent Embroidery Digitizing Prices | Approval Stitch"` ✅
- [x] Önerilen description: `"Simple, transparent pricing for embroidery digitizing services. Starting at $25 for stitch approval, $35 for file fixing, $60 for full digitizing."` ✅

#### FAQs Sayfası (/faqs)
- [x] Server-side metadata eklenmelidir ✅
- [x] Önerilen title: `"Frequently Asked Questions | Approval Stitch"` ✅
- [x] Önerilen description: `"Find answers to common questions about embroidery digitizing, file formats, turnaround times, and our stitch approval process."` ✅
- [x] **FAQ Structured Data (JSON-LD)** eklenmelidir - Google'da zengin snippet görünümü için ✅

#### Privacy Policy Sayfası (/privacy-policy)
- [x] Server-side metadata eklenmelidir ✅
- [x] Önerilen title: `"Privacy Policy | Approval Stitch"` ✅
- [x] Önerilen description: `"Learn how Approval Stitch collects, uses, and protects your personal data and embroidery designs. GDPR compliant."` ✅

#### Cookie Policy Sayfası (/cookie-policy)
- [x] Server-side metadata eklenmelidir ✅
- [x] Önerilen title: `"Cookie Policy | Approval Stitch"` ✅
- [x] Önerilen description: `"Information about cookies used on Approval Stitch website. Manage your cookie preferences for analytics and functionality."` ✅

#### Distance Sales Agreement (/distance-sales-agreement)
- [x] Server-side metadata eklenmelidir ✅
- [x] Önerilen title: `"Distance Sales Agreement | Terms & Conditions | Approval Stitch"` ✅
- [x] Önerilen description: `"Read the distance sales agreement and terms for Approval Stitch embroidery digitizing services. Legal terms for online purchases."` ✅

#### 404 Not Found Sayfası
- [x] Sayfa metni lokalize edilmeli (şu anda sadece İngilizce hardcoded) ✅
- [x] `noindex` meta etiketi eklenmelidir ✅

---

## 🟠 YÜKSEK ÖNCELİK

### 2. Structured Data (JSON-LD)

- [x] **Organization Schema** eklenmeli (layout.tsx'e): ✅
  ```json
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Approval Stitch",
    "url": "https://approvalstitch.com",
    "logo": "https://approvalstitch.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+90-548-858-8394",
      "contactType": "customer service"
    }
  }
  ```

- [x] **Service Schema** eklenmeli (services sayfasına): ✅
  ```json
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Embroidery Digitizing",
    "provider": { "@type": "Organization", "name": "Approval Stitch" }
  }
  ```

- [x] **FAQ Schema** eklenmeli (faqs sayfasına) - Zengin snippet için kritik ✅

- [x] **Pricing Schema** eklenmeli (pricing sayfasına): ✅
  ```json
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "offers": {
      "@type": "Offer",
      "price": "25.00",
      "priceCurrency": "USD"
    }
  }
  ```

- [x] **BreadcrumbList Schema** tüm sayfalara eklenmeli ✅

### 3. Canonical URL ve Hreflang Etiketleri

- [x] Her sayfa için canonical URL tanımlanmalı ✅
- [x] Tüm sayfalar için hreflang etiketleri eklenmeli: ✅
  ```html
  <link rel="alternate" hreflang="en" href="https://approvalstitch.com/about" />
  <link rel="alternate" hreflang="tr" href="https://approvalstitch.com/tr/hakkimizda" />
  <link rel="alternate" hreflang="x-default" href="https://approvalstitch.com/about" />
  ```

### 4. Open Graph ve Twitter Card

- [x] Her sayfa için özel Open Graph etiketleri tanımlanmalı ✅
- [x] `og:image` her sayfa için ayarlanmalı (sayfa içeriğine uygun görseller) ✅
- [x] Twitter Card meta etiketleri eklenmeli: ✅
  ```html
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@approvalstitch" />
  ```

---

## 🟡 ORTA ÖNCELİK

### 5. Görsel Optimizasyonu

#### About Sayfası
- [x] `/images/Stitching-machine.webp` için daha açıklayıcı `alt` etiketi: `"Professional Tajima embroidery machine used for stitch approval testing"` ✅

#### Services Sayfası
- [x] `/images/Stitching-machine.webp` için `alt` güncellenmeli: `"Industrial Tajima embroidery machine in Approval Stitch laboratory"` ✅

#### Hero Bölümü
- [x] `/images/hero/embroidery-hero.webp` için daha açıklayıcı `alt`: `"High-quality embroidery digitizing sample showing detailed stitch work"` ✅

#### Portfolio Bölümü
- [x] Tüm portfolio görselleri için benzersiz ve açıklayıcı `alt` etiketleri eklenmeli ✅ (role='img' + aria-label kullanıldı)
- [x] `title` attribute'ları eklenmeli ✅

### 6. Heading Hiyerarşisi

- [x] **About sayfası:** `<h4>` tag'lerinin `<h3>` ile değiştirilmesi (heading atlama problemi) ✅
- [x] **Services sayfası:** Technical Expertise bölümündeki `<h4>` etiketleri `<h3>` olmalı ✅
- [x] **Pricing sayfası:** Plan isimleri ve FAQ soruları için doğru seviye kullanılmalı ✅
- [x] Tüm sayfalarda heading sıralaması kontrol edilmeli (h1 > h2 > h3 > h4) ✅

### 7. İç Bağlantılar (Internal Links)

- [x] Footer'da sitemap bağlantısı eklenmeli ✅
- [x] İlgili hizmetler arası çapraz bağlantılar eklenmeli ✅
- [ ] Blog veya resources bölümü oluşturulabilir (keyword targeting için) ! BU MADDEYİ ATLA ŞİMDİLİK ! 

---

## 🟢 DÜŞÜK ÖNCELİK

### 8. Performans İyileştirmeleri (Dolaylı SEO Etkisi)

- [x] `loading="lazy"` attribute'u tüm görsellere eklenmeli (Hero hariç - LCP için) ✅
- [x] Hero görseli için `fetchpriority="high"` eklenmeli ✅
- [x] Font display: swap uygulandığından emin olun ✅

### 9. Accessibility (Dolaylı SEO Etkisi)

- [x] Contact sayfasındaki form alanlarına `aria-describedby` eklenmeli (hata mesajları için) ✅
- [x] FAQ accordion'larına `role="region"` ve `aria-labelledby` eklenmeli ✅
- [x] Skip navigation link eklenmeli ✅

### 10. Sitemap ve Robots.txt

- [x] XML sitemap oluşturulmalı ve Google Search Console'a submit edilmeli ✅
- [x] robots.txt dosyası oluşturulmalı/güncellenmeli: ✅
  ```
  User-agent: *
  Allow: /
  Disallow: /dashboard/
  Disallow: /api/
  Sitemap: https://approvalstitch.com/sitemap.xml
  ```

### 11. Sayfa Hızı

- [x] Core Web Vitals optimize edilmeli (LCP, FID, CLS) ✅
- [x] Kullanılmayan JavaScript minimize edilmeli (Next.js otomatik optimizasyonu ve Gzip sıkıştırması aktif) ✅
- [x] CSS critical path optimizasyonu (Tailwind + Next.js built-in) ✅

---

## 📝 EK NOTLAR

### Layout.tsx'teki Mevcut Sorunlar:
1. `metadataBase` ~~hala placeholder URL kullanıyor~~ ✅ Güncellendi: `https://approvalstitch.com`
   - [x] Gerçek domain ile güncellenmeli ✅

2. Genel metadata çok jenerik, her sayfa için özelleştirilmeli

### Client Component Sorunu:
Çoğu sayfa `"use client"` direktifi kullanıyor, bu da server-side metadata oluşturmayı engelliyor.
**Çözüm önerileri:**
1. Her sayfa için ayrı bir `metadata.ts` dosyası oluşturun
2. Veya sayfaları server component olarak yeniden yapılandırın ve interaktif bölümleri ayrı client component'lere taşıyın

### Keywords Önerileri:
- embroidery digitizing
- stitch approval
- DST file conversion
- embroidery file format
- Tajima embroidery
- embroidery digitizing service
- stitched sample approval
- professional digitizing
- embroidery machine files





# Türkçe sayfalar için SEO İyileştirmeleri - Yapılacaklar Listesi


### Genel Sorunlar (Tüm TR Sayfaları)
1.  **Metadata ve SSR Dönüşümü (Kritik)**: 
    - [x] `fiyatlandirma`, `hakkimizda`, `hizmetler`, `iletisim`, `sss` sayfaları Server Component'e dönüştürüldü (Yasal sayfalar beklemede).
    - [x] Bu nedenlesayfalar artık kendine özgü `title` ve `meta description` üretiyor.
    - [x] **Yapıldı**: İlgili sayfalar Server Component'e dönüştürüldü. İnteraktif öğeler `_components` altına taşındı.
    - [x] Her sayfa için `generateMetadata` fonksiyonu eklendi.

2.  **Canonical URL Düzeltmesi**:
    - [x] `src/app/tr/layout.tsx` dosyasındaki sabit yapının yerine sayfa bazlı override yapıldı.
    - [x] Alt sayfaların metadata ayarlarında kendi tam URL'leri canonical olarak eklendi.
    - [x] **Yapıldı**: Her alt sayfanın metadata ayarlarında canonical URL belirtildi.

3.  **Görsel Optimizasyonu (`next/image`)**:
    - [x] Belirlenen sayfalarda (Hakkımızda, Hizmetler) `<img>` etiketleri `next/image` ile değiştirildi.

### Sayfa Bazlı Eksikler ve Yapılacaklar

#### 1. Hakkımızda Sayfası (`/tr/hakkimizda`)
- [x] **Metadata**: Başlık ve açıklama güncellendi.
- [x] **Görsel**: Makine görseli `<Image />` bileşenine çevrilerek optimize edildi.
- [x] **Schema**: `Organization` yapısal verisi eklendi.

#### 2. Hizmetler Sayfası (`/tr/hizmetler`)
- [x] **Metadata**: Başlık ve açıklama eklendi.
- [x] **Görsel**: Makine görseli `<Image />` bileşenine çevrilerek optimize edildi.
- [x] **Schema**: `Service` şeması ile hizmetler tanımlandı.

#### 3. Fiyatlandırma Sayfası (`/tr/fiyatlandirma`)
- [x] **Metadata**: Başlık ve açıklama eklendi.
- [x] **Schema**: `Product` şeması ile paket detayları eklendi.

#### 4. İletişim Sayfası (`/tr/iletisim`)
- [x] **Metadata**: Başlık ve açıklama eklendi.
- [x] **Schema**: `ContactPage` ve `LocalBusiness` şeması eklendi.

#### 5. SSS (Sıkça Sorulan Sorular) Sayfası (`/tr/sss`)
- [x] **Metadata**: Başlık ve açıklama eklendi.
- [x] **Schema (Kritik)**: `FAQPage` yapısal verisi eklendi.
- [x] **İnteraktivite**: Client component'e taşındı.

#### 6. Yasal Sayfalar (Gizlilik, Çerez, Mesafeli Satış)
- [x] **Genel**: Sayfalar Server Component'e dönüştürüldü ve metadata eklendi.
- [x] **İçerik**: Hukuki metinlerin yapısı korundu, SEO uyumlu hale getirildi.

#### 7. Landing Page (`/tr`)
- [x] **Metadata**: Başlık ve açıklama eklendi.
- [x] **Schema (Kritik)**: `WebPage` yapısal verisi eklendi.
- [x] **İnteraktivite**: Client component'e aktarıldı.