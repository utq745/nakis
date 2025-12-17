# SEO ve Çoklu Dil (i18n) Durumu

## 📊 Mevcut Durum

### ❌ Şu Anki Sorunlar:

1. **Client-Side i18n**: Çeviriler sadece JavaScript ile tarayıcıda değiştiriliyor
2. **SEO Sorunu**: Google bot'ları sayfayı taradığında sadece varsayılan dili (İngilizce) görüyor
3. **Tek URL**: Tüm diller için tek URL (`example.com`) kullanılıyor
4. **localStorage**: Dil tercihi sadece kullanıcının tarayıcısında saklanıyor

### 🔍 Google'da Nasıl Görünür?

- **Arama sonuçları**: Sadece İngilizce içerik indekslenir
- **Meta tags**: Sadece İngilizce meta description ve title
- **Hreflang tags**: Yok (farklı dil versiyonlarını belirtmiyor)
- **Structured data**: Tek dilde

## ✅ Önerilen Çözüm: Next.js App Router i18n

### Yeni Yapı:

```
app/
├── [lang]/              # Dinamik dil segmenti
│   ├── page.tsx         # Ana sayfa
│   ├── login/
│   │   └── page.tsx     # Login sayfası
│   └── ...
├── layout.tsx           # Root layout
└── ...
```

### URL Yapısı:

- `example.com/` → İngilizce (default)
- `example.com/tr` → Türkçe
- `example.com/en` → İngilizce (explicit)

### SEO Faydaları:

1. ✅ **Server-Side Rendering**: Her dil için ayrı HTML render edilir
2. ✅ **Ayrı URL'ler**: Google her dili ayrı indeksler
3. ✅ **Hreflang Tags**: Otomatik olarak eklenebilir
4. ✅ **Meta Tags**: Her dil için ayrı meta tags
5. ✅ **Sitemap**: Her dil için ayrı sitemap
6. ✅ **Better UX**: URL'den dil belli olur

## 🚀 Uygulama Adımları

### 1. Middleware Oluştur

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'tr'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if pathname has locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect to default locale
  const locale = defaultLocale;
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

### 2. Folder Yapısını Değiştir

```
app/
├── [lang]/
│   ├── page.tsx
│   ├── login/
│   │   └── page.tsx
│   └── layout.tsx
└── layout.tsx (root)
```

### 3. Dictionary Helper

```typescript
// lib/get-dictionary.ts
import { translations, Locale } from './dictionary';

export function getDictionary(lang: Locale) {
  return translations[lang];
}
```

### 4. Server Component Kullanımı

```typescript
// app/[lang]/page.tsx
import { getDictionary } from '@/lib/get-dictionary';

export default async function Page({ params }: { params: { lang: 'en' | 'tr' } }) {
  const dict = getDictionary(params.lang);
  
  return (
    <div>
      <h1>{dict.landing.hero.titleLine1}</h1>
    </div>
  );
}
```

### 5. Metadata için generateMetadata

```typescript
export async function generateMetadata({ params }: { params: { lang: 'en' | 'tr' } }) {
  const dict = getDictionary(params.lang);
  
  return {
    title: dict.landing.hero.titleLine1,
    description: dict.landing.hero.description,
    alternates: {
      canonical: `/${params.lang}`,
      languages: {
        'en': '/en',
        'tr': '/tr',
      },
    },
  };
}
```

## 📈 SEO İyileştirmeleri

### Hreflang Tags (Otomatik)

```html
<link rel="alternate" hreflang="en" href="https://example.com/en" />
<link rel="alternate" hreflang="tr" href="https://example.com/tr" />
<link rel="alternate" hreflang="x-default" href="https://example.com/en" />
```

### Sitemap

```xml
<url>
  <loc>https://example.com/en</loc>
  <xhtml:link rel="alternate" hreflang="tr" href="https://example.com/tr"/>
</url>
<url>
  <loc>https://example.com/tr</loc>
  <xhtml:link rel="alternate" hreflang="en" href="https://example.com/en"/>
</url>
```

## 🎯 Sonuç

### Şu Anki Durum:
- ❌ Google sadece İngilizce içeriği indeksliyor
- ❌ Türkçe aramalar için görünmüyor
- ❌ SEO optimizasyonu yok

### Önerilen Çözüm Sonrası:
- ✅ Her dil ayrı indekslenir
- ✅ Türkçe aramalar için Türkçe sayfa gösterilir
- ✅ Tam SEO desteği
- ✅ Daha iyi kullanıcı deneyimi

## 💡 Hızlı Çözüm (Geçici)

Eğer şimdilik folder yapısını değiştirmek istemiyorsanız, en azından şunları ekleyin:

1. **Meta tags**: Her sayfaya dinamik meta tags
2. **Hreflang**: Manuel hreflang tags
3. **Sitemap**: İki dil için ayrı URL'ler

Ama uzun vadede **folder-based i18n routing** en iyi çözüm!

---

**Uygulama ister misiniz?** Tüm yapıyı SEO-friendly hale getirebilirim. Yaklaşık 30-45 dakika sürer.
