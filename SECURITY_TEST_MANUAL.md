# Nakis - Güvenlik Testi Manueli
## Technical Security Testing Documentation

**Proje Adı:** Nakis - Nakış Onay Sistemi  
**Versiyon:** 0.1.0  
**Teknolojiler:** Next.js 16, React 19, Prisma ORM, NextAuth.js v5, Supabase Storage, SQLite/PostgreSQL  
**Son Güncelleme:** 31 Ocak 2026

---

## 📋 İçindekiler

1. [Proje Genel Bakış](#1-proje-genel-bakış)
2. [Mimari Yapı](#2-mimari-yapı)
3. [Authentication ve Authorization](#3-authentication-ve-authorization)
4. [API Endpoint'leri](#4-api-endpointleri)
5. [Veritabanı Şeması](#5-veritabanı-şeması)
6. [Dosya Yükleme Sistemi](#6-dosya-yükleme-sistemi)
7. [Güvenlik Kontrolleri](#7-güvenlik-kontrolleri)
8. [Test Senaryoları](#8-test-senaryoları)
9. [Potansiyel Güvenlik Açıkları](#9-potansiyel-güvenlik-açıkları)
10. [Çevresel Değişkenler](#10-çevresel-değişkenler)

---

## 1. Proje Genel Bakış

### 1.1 İş Mantığı
Nakis, nakış sektörü için bir onay sistemidir:
- **Müşteriler (CUSTOMER):** Sipariş oluşturur, dosya yükler, önizleme onaylar, ödeme yapar
- **Yöneticiler (ADMIN):** Siparişleri yönetir, Wilcom dosyası yükler, onay kartları oluşturur

### 1.2 Sipariş Akışı
```
ORDERED → APPROVAL_AWAITING → IN_PROGRESS → PAYMENT_PENDING → COMPLETED → DELIVERED
                    ↓
                REVISION (+$10) → APPROVAL_AWAITING
                    ↓
                CANCELLED
```

### 1.3 Paket Fiyatları
- **Approval Sample (Existing DST):** $25
- **Fix Your DST + Sample:** $35
- **New Digitizing + Sample:** $60

---

## 2. Mimari Yapı

### 2.1 Teknoloji Stack
| Katman | Teknoloji |
|--------|-----------|
| Frontend | Next.js 16 (App Router), React 19, TailwindCSS 4 |
| Backend | Next.js API Routes, Server Components |
| Database | Prisma ORM + SQLite (dev), PostgreSQL (prod) |
| Auth | NextAuth.js v5 (beta.30) + JWT |
| Storage | Supabase Storage + Local Filesystem |
| Validation | Zod |
| Password | bcryptjs (12 rounds) |

### 2.2 Dizin Yapısı
```
/src
├── app/
│   ├── api/              # API Route'ları
│   │   ├── auth/         # Authentication
│   │   ├── orders/       # Sipariş yönetimi
│   │   ├── files/        # Dosya erişimi
│   │   ├── comments/     # Yorum sistemi
│   │   ├── admin/        # Admin API'leri
│   │   └── user/         # Kullanıcı profili
│   └── (pages)/          # UI sayfaları
├── components/           # React bileşenleri
├── lib/                  # Utility fonksiyonları
│   ├── auth.ts           # NextAuth konfigürasyonu
│   ├── prisma.ts         # Prisma client
│   ├── rate-limit.ts     # Rate limiting
│   ├── sanitize.ts       # Input sanitization
│   ├── supabase.ts       # Supabase client
│   └── wilcom-parser.ts  # PDF parsing
├── middleware.ts         # Request middleware
└── types/                # TypeScript tipleri

/prisma
├── schema.prisma         # Veritabanı şeması
├── seed.ts               # Seed data
└── dev.db                # SQLite database (dev only)

/uploads                  # Güvenli dosya depolama (public dışında)
```

---

## 3. Authentication ve Authorization

### 3.1 Auth Konfigürasyonu (`/src/lib/auth.ts`)

**Authentication Providers:**
1. **Credentials** - Email/Password (bcryptjs hash)
2. **Google OAuth** - Google hesabı ile giriş
3. **Apple OAuth** - Apple hesabı ile giriş

**Session Strategy:** JWT (JSON Web Token)

**⚠️ Dikkat Edilmesi Gereken Noktalar:**
- `allowDangerousEmailAccountLinking: true` - OAuth ve email hesaplarını otomatik bağlar
- `trustHost: true` - Host header'a güvenir (SSRF riski olabilir)
- Email doğrulama şu an devre dışı: `emailVerified: new Date()` ile otomatik onaylanıyor

### 3.2 Roller ve Yetkilendirme

| Rol | Yetkiler |
|-----|----------|
| CUSTOMER | Kendi siparişlerini görüntüleme, oluşturma, yorum yapma, dosya yükleme |
| ADMIN | Tüm siparişleri görüntüleme, fiyat belirleme, durum değiştirme, Wilcom yükleme |

### 3.3 Session Token Yapısı
```typescript
interface JWT {
    id: string;        // Kullanıcı ID
    role: "CUSTOMER" | "ADMIN";
    image?: string;
}
```

---

## 4. API Endpoint'leri

### 4.1 Authentication API'leri

| Endpoint | Method | Yetki | Açıklama |
|----------|--------|-------|----------|
| `/api/auth/[...nextauth]` | * | Public | NextAuth handlers |
| `/api/auth/register` | POST | Public | Yeni kullanıcı kaydı |
| `/api/auth/forgot-password` | POST | Public | Şifre sıfırlama talebi |
| `/api/auth/reset-password` | POST | Public | Şifre sıfırlama |
| `/api/auth/logout-all` | POST | Auth | Tüm cihazlardan çıkış |

**Register Endpoint (`/api/auth/register/route.ts`):**
- Rate Limit: 100 istek/saat/IP
- Validation: Zod schema (email, password min 8, name min 2)
- Password: bcryptjs hash (12 rounds)

### 4.2 Orders API'leri

| Endpoint | Method | Yetki | Açıklama |
|----------|--------|-------|----------|
| `/api/orders` | GET | Auth | Sipariş listesi (Admin: tümü, Customer: kendisi) |
| `/api/orders` | POST | Auth | Yeni sipariş oluşturma |
| `/api/orders/[id]` | GET | Auth + Owner/Admin | Sipariş detayı |
| `/api/orders/[id]` | PATCH | Auth + Owner/Admin | Sipariş güncelleme |
| `/api/orders/[id]/wilcom` | POST | Admin | Wilcom PDF yükleme |
| `/api/orders/[id]/wilcom` | DELETE | Admin | Wilcom verisi silme |
| `/api/orders/[id]/wilcom/image/[type]` | GET | Auth + Owner/Admin | Wilcom görsel |
| `/api/orders/[id]/wilcom/pdf/[type]` | GET | Auth + Owner/Admin | Wilcom PDF |
| `/api/orders/[id]/download-finals` | GET | Auth + Owner/Admin | Final dosyaları ZIP |

**Müşteri Durum Değişikliği İzinleri:**
- `APPROVAL_AWAITING` → `IN_PROGRESS` (onay)
- `APPROVAL_AWAITING` → `REVISION` (revizyon talebi, +$10)
- `ORDERED` → `CANCELLED` (iptal)

### 4.3 Files API'leri

| Endpoint | Method | Yetki | Açıklama |
|----------|--------|-------|----------|
| `/api/files/[id]` | GET | Auth + Owner/Admin | Dosya indirme/görüntüleme |
| `/api/files/[id]` | DELETE | Admin | Dosya silme |

**⚠️ Kritik Güvenlik Kontrolü - Final Dosyaları:**
```typescript
if (file.type === "final" && !isAdmin) {
    const allowedStatuses = ["COMPLETED", "DELIVERED"];
    if (!allowedStatuses.includes(file.order.status)) {
        return { error: "Payment required", status: 402 };
    }
}
```

### 4.4 Comments API

| Endpoint | Method | Yetki | Açıklama |
|----------|--------|-------|----------|
| `/api/comments` | POST | Auth | Yorum ekleme |

### 4.5 User API'leri

| Endpoint | Method | Yetki | Açıklama |
|----------|--------|-------|----------|
| `/api/user/profile` | GET | Auth | Profil bilgileri |
| `/api/user/profile` | PATCH | Auth | Profil güncelleme |
| `/api/user/password` | PATCH | Auth | Şifre değiştirme |
| `/api/user/avatar` | POST | Auth | Avatar yükleme |
| `/api/user/delete-account` | POST | Auth | Hesap silme talebi |
| `/api/user/delete-account/confirm` | DELETE | Auth | Hesap silme onayı |

### 4.6 Admin API'leri

| Endpoint | Method | Yetki | Açıklama |
|----------|--------|-------|----------|
| `/api/admin/users/[id]/notes` | PATCH | Admin | Kullanıcı notları güncelleme |

---

## 5. Veritabanı Şeması

### 5.1 User Model
```prisma
model User {
  id                            String
  email                         String   @unique
  emailVerified                 DateTime?
  password                      String?           // OAuth kullanıcıları için null
  name                          String?
  image                         String?
  role                          String   @default("CUSTOMER")
  language                      String   @default("en")
  billingAddress                String?
  resetPasswordToken            String?
  resetPasswordExpires          DateTime?
  deleteAccountToken            String?
  deleteAccountTokenExpires     DateTime?
  emailVerificationToken        String?
  emailVerificationTokenExpires DateTime?
  pendingEmail                  String?
  pendingName                   String?
  notes                         String?           // Admin notları
}
```

### 5.2 Order Model
```prisma
model Order {
  id                 String   
  title              String?
  description        String?
  status             String   @default("ORDERED")
  price              Float?
  hidden             Boolean  @default(false)
  machineBrand       String?
  serviceType        String?
  productType        String?
  garmentType        String?
  isNotSure          Boolean  @default(false)
  customProduct      String?
  addKnockdownStitch Boolean  @default(false)
  customerId         String              // Foreign key to User
  priority           String   @default("NORMAL")
  estimatedDelivery  DateTime?
  cancelledAt        DateTime?
}
```

### 5.3 File Model
```prisma
model File {
  id             String
  name           String
  url            String
  type           String           // "original", "preview", "final", "comment"
  size           Int?
  version        Int    @default(1)
  replacesFileId String?
  orderId        String
  commentId      String?
  uploadedBy     String
}
```

### 5.4 WilcomData Model
```prisma
model WilcomData {
  id                  String
  orderId             String  @unique
  designName          String
  title               String?
  heightMm            Float
  widthMm             Float
  stitchCount         Int
  colorCount          Int
  colors              String         // JSON string
  colorSequence       String         // JSON string
  designImageUrl      String?
  customerArtworkUrl  String?
  operatorApprovalPdf String?
  customerApprovalPdf String?
  wilcomPdfUrl        String?
}
```

---

## 6. Dosya Yükleme Sistemi

### 6.1 Dosya Depolama
- **Güvenli Dosyalar:** `/uploads/{orderId}/{type}/filename` (public klasörü dışında)
- **Eski Dosyalar:** `/public/uploads/{orderId}/{type}/filename` (eski format, hala destekleniyor)

### 6.2 Desteklenen Dosya Tipleri
```typescript
type FileType = "original" | "preview" | "final" | "comment";

// Kabul edilen uzantılar (sipariş oluşturma):
const ALLOWED_EXTENSIONS = [
    ".ai", ".pdf", ".png", ".jpg", ".jpeg", ".dst", ".dts"
];
```

### 6.3 Dosya Erişim Kontrolleri
1. **Authentication:** Tüm dosya erişimi authentication gerektirir
2. **Authorization:** Dosya sahibi veya admin olmalı
3. **Payment Protection:** Final dosyalar ödeme yapılmadan erişilemez
4. **Download Tracking:** Final dosya indirildiğinde durum DELIVERED olur

### 6.4 Content Security Headers
```typescript
headers: {
    "X-Content-Type-Options": "nosniff",
    "Content-Security-Policy": "default-src 'none'; img-src 'self'; style-src 'unsafe-inline';",
    "Cache-Control": "private, max-age=3600",
}
```

---

## 7. Güvenlik Kontrolleri

### 7.1 Rate Limiting (`/src/lib/rate-limit.ts`)

| Endpoint | Limit | Süre | Block Süresi |
|----------|-------|------|--------------|
| Login | 5 deneme | 15 dakika | 15 dakika |
| Register | 100 deneme | 1 saat | 1 saat |
| Password Reset | 3 deneme | 1 saat | 1 saat |
| API Genel | 100 istek | 1 dakika | 1 dakika |
| File Upload | 20 yükleme | 1 saat | 30 dakika |

### 7.2 Input Sanitization (`/src/lib/sanitize.ts`)

**sanitizeString():**
- Null byte temizleme
- HTML entity escape (`<`, `>`, `&`, `"`, `'`)
- `javascript:` ve `data:` protokol temizleme
- Event handler (`on*=`) temizleme

**sanitizeHTML():**
- Script tag temizleme
- Style tag temizleme
- iframe, object, embed, form tag temizleme

**sanitizeFileName():**
- Path traversal koruması (`..`, `/`, `\`)
- Güvenli karakter whitelist (`a-zA-Z0-9._-`)
- 255 karakter limit

**sanitizeId():**
- CUID format validation
- UUID format validation

### 7.3 Middleware Güvenlik (`/src/middleware.ts`)

**Security Headers:**
```typescript
response.headers.set('X-Content-Type-Options', 'nosniff');
response.headers.set('X-Frame-Options', 'DENY');
response.headers.set('X-XSS-Protection', '1; mode=block');
response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
```

**HTTPS Enforcement:**
- Production ortamında HTTP istekleri otomatik olarak HTTPS'e yönlendirilir
- `x-forwarded-proto` header'ı kontrol edilir

**CSRF Koruması:**
- POST, PUT, PATCH, DELETE isteklerinde Origin/Referer kontrolü
- Allowed Origins: `NEXT_PUBLIC_APP_URL` ve `localhost:3000`
- `/api/auth/*` rotaları NextAuth'un kendi CSRF korumasını kullanır

### 7.4 Password Hashing
- Algoritma: bcryptjs
- Salt Rounds: 12

### 7.5 Schema Validation
- Tüm API inputları Zod ile validate edilir
- Type-safe data handling

---

## 8. Test Senaryoları

### 8.1 Authentication Testleri

#### Test A1: Brute Force Login
```bash
# 5'ten fazla başarısız login denemesi yap
for i in {1..10}; do
  curl -X POST https://domain.com/api/auth/callback/credentials \
    -H "Content-Type: application/json" \
    -d '{"email":"test@test.com","password":"wrong'$i'"}'
done
# Beklenen: 429 Too Many Requests (6. istekten sonra)
```

#### Test A2: Email Injection
```bash
curl -X POST https://domain.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com\nBcc:attacker@evil.com","password":"123456","name":"Test"}'
# Beklenen: 400 Bad Request (Zod email validation)
```

#### Test A3: SQL Injection in Login
```bash
curl -X POST https://domain.com/api/auth/callback/credentials \
  -H "Content-Type: application/json" \
  -d '{"email":"' OR 1=1--","password":"test"}'
# Beklenen: Login başarısız (Prisma parameterized queries)
```

### 8.2 Authorization Testleri

#### Test B1: IDOR - Başkasının Siparişine Erişim
```bash
# Customer A olarak login ol
# Customer B'nin sipariş ID'sine erişmeye çalış
curl https://domain.com/api/orders/CUSTOMER_B_ORDER_ID \
  -H "Authorization: Bearer CUSTOMER_A_TOKEN"
# Beklenen: 403 Unauthorized
```

#### Test B2: Customer → Admin Privilege Escalation
```bash
# Customer olarak admin-only endpoint'e erişim
curl -X PATCH https://domain.com/api/orders/ORDER_ID \
  -H "Authorization: Bearer CUSTOMER_TOKEN" \
  -d '{"price": 0}'
# Beklenen: 403 Only admins can update price
```

#### Test B3: Unauthorized Wilcom Upload
```bash
# Customer olarak Wilcom yükleme
curl -X POST https://domain.com/api/orders/ORDER_ID/wilcom \
  -H "Authorization: Bearer CUSTOMER_TOKEN" \
  -F "file=@wilcom.pdf"
# Beklenen: 401 Unauthorized
```

### 8.3 Dosya Güvenliği Testleri

#### Test C1: Path Traversal
```bash
# Dosya yüklerken path traversal
curl -X POST https://domain.com/api/orders/ORDER_ID/files \
  -H "Authorization: Bearer TOKEN" \
  -F "file=@test.pdf;filename=../../../etc/passwd"
# Beklenen: Filename sanitize edilmeli
```

#### Test C2: Payment Bypass - Final File Access
```bash
# Ödeme yapmadan final dosyaya erişim
# Sipariş durumu: IN_PROGRESS (ödeme yapılmamış)
curl https://domain.com/api/files/FINAL_FILE_ID \
  -H "Authorization: Bearer CUSTOMER_TOKEN"
# Beklenen: 402 Payment Required
```

#### Test C3: Executable File Upload
```bash
# .exe, .sh gibi executable dosya yükleme
curl -X POST https://domain.com/api/orders/ORDER_ID/files \
  -H "Authorization: Bearer TOKEN" \
  -F "file=@malware.exe"
# Beklenen: Dosya tipi reddedilmeli veya güvenli şekilde depolanmalı
```

### 8.4 XSS Testleri

#### Test D1: Comment XSS
```bash
curl -X POST https://domain.com/api/comments \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"orderId":"ORDER_ID","content":"<script>alert(1)</script>"}'
# Beklenen: Content sanitize edilmeli (&lt;script&gt;)
```

#### Test D2: Order Title XSS
```bash
curl -X POST https://domain.com/api/orders \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"<img src=x onerror=alert(1)>","serviceType":"Approval Sample"}'
# Beklenen: Title sanitize edilmeli
```

### 8.5 CSRF Testleri

#### Test E1: Cross-Origin POST
```bash
# Farklı origin'den API çağrısı
curl -X POST https://domain.com/api/orders \
  -H "Origin: https://evil.com" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"title":"test"}'
# Beklenen: 403 Forbidden - Invalid origin
```

### 8.6 Durum Geçişi Testleri

#### Test F1: Invalid Status Transition (Customer)
```bash
# Customer olarak geçersiz durum değişikliği
# ORDERED → IN_PROGRESS (doğrudan atlanamaz)
curl -X PATCH https://domain.com/api/orders/ORDER_ID \
  -H "Authorization: Bearer CUSTOMER_TOKEN" \
  -d '{"status":"IN_PROGRESS"}'
# Beklenen: 403 Forbidden status change
```

#### Test F2: Cancel After Work Started
```bash
# Sipariş başladıktan sonra iptal
# APPROVAL_AWAITING → CANCELLED
curl -X PATCH https://domain.com/api/orders/ORDER_ID \
  -H "Authorization: Bearer CUSTOMER_TOKEN" \
  -d '{"status":"CANCELLED"}'
# Beklenen: 403 (sadece ORDERED durumunda iptal edilebilir)
```

---

## 9. Potansiyel Güvenlik Açıkları

### 9.1 Yüksek Risk

| # | Açıklama | Dosya | Öneri |
|---|----------|-------|-------|
| H1 | Email doğrulama devre dışı | `/api/auth/register/route.ts:63` | Email doğrulama aktif edilmeli |
| H2 | allowDangerousEmailAccountLinking | `/lib/auth.ts:45` | Account linking güvenliği gözden geçirilmeli |
| H3 | OAuth hesaplarında password null | `/lib/auth.ts:69` | OAuth email+password linking senaryosu test edilmeli |
| H4 | Puppeteer PDF generation | `/lib/wilcom-parser.ts` | Server-side RCE riski, sandbox ayarları kontrol edilmeli |

### 9.2 Orta Risk

| # | Açıklama | Dosya | Öneri |
|---|----------|-------|-------|
| M1 | Rate limit memory-based | `/lib/rate-limit.ts` | Redis-based rate limiting önerilir |
| M2 | SQLite dev database | `/prisma/schema.prisma` | Production'da PostgreSQL kullanılmalı |
| M3 | Service role key placeholder | `/lib/supabase.ts` | Env validation eklenmeli |
| M4 | Detaylı hata mesajları console'da | Çeşitli | Production'da loglama düzeni gözden geçirilmeli |

| # | Açıklama | Dosya | Öneri |
|---|----------|-------|-------|
| ~~L1~~ | ~~trustHost: true~~ | ~~`/lib/auth.ts:40`~~ | ✅ ÇÖZÜLDÜ - AUTH_TRUST_HOST env ile kontrol |
| ~~L2~~ | ~~No HSTS header~~ | ~~`/middleware.ts`~~ | ✅ ÇÖZÜLDÜ - HSTS header eklendi |
| ~~L3~~ | ~~Origin check bypass~~ | ~~`/middleware.ts`~~ | ✅ ÇÖZÜLDÜ - Origin/Referer zorunlu hale getirildi |

---

## 10. Çevresel Değişkenler

### 10.1 Gerekli Değişkenler
```env
# Database
DATABASE_URL="postgresql://..."

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGc..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGc..."

# NextAuth
AUTH_SECRET="strong-random-secret"
AUTH_URL="https://yourdomain.com"

# OAuth (opsiyonel)
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
APPLE_CLIENT_ID="..."
APPLE_CLIENT_SECRET="..."
```

### 10.2 Production Kontrolleri
- [ ] `AUTH_SECRET` güçlü ve unique olmalı
- [ ] `DATABASE_URL` production database'i işaret etmeli
- [ ] Supabase key'leri production projesi için olmalı
- [ ] `AUTH_URL` production domain olmalı
- [ ] `.env` dosyası git'e commit edilmemeli

---

## 📝 Test Kontrol Listesi

### Authentication
- [x] Brute force koruması çalışıyor mu? ✅
- [x] Zayıf şifreler reddediliyor mu? ✅ (min 8 karakter)
- [x] Session token'ları güvenli mi? ✅
- [x] Logout tüm session'ları temizliyor mu? ✅ (`/api/auth/logout-all`)
- [x] Password reset token'ları expire oluyor mu? ✅

### Authorization
- [x] Role-based access control çalışıyor mu? ✅
- [x] IDOR açıkları var mı? ✅ Korunmuş
- [x] Privilege escalation mümkün mü? ✅ Engellendi
- [x] Customer başka customer'ın verisine erişebilir mi? ✅ Hayır

### Input Validation
- [x] XSS koruması var mı? ✅
- [x] SQL Injection koruması var mı? ✅ (Prisma)
- [x] Path traversal koruması var mı? ✅
- [x] Dosya tipi validasyonu var mı? ✅

### Business Logic
- [x] Payment bypass mümkün mü? ✅ Engellendi
- [x] Status manipulation mümkün mü? ✅ Kontrollü
- [x] Price manipulation mümkün mü? ✅ Sadece admin
- [x] Negative values kabul ediliyor mu? ✅ Engellendi (nonnegative)

### Infrastructure
- [x] HTTPS zorunlu mu? ✅ Production'da zorunlu
- [x] Security headers doğru mu? ✅ HSTS dahil
- [x] CORS policy güvenli mi? ✅
- [x] Rate limiting çalışıyor mu? ✅

---

**Bu doküman Gemini CLI tarafından güvenlik ve açık testi için kullanılabilir.**
