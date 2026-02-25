import type { Metadata } from "next";
import FixYourDstClient from "@/components/landing/fix-your-dst-content";

const serviceIsItems = [
    "Yoğunluk ve çekme telafisi (pull compensation) ayarı",
    "Alt yapı (underlay) temizliği (eksik veya aşırı kullanımlar)",
    "Saten yönü stabilizasyonu",
    "Kenar netliğinin artırılması",
    "İplik kesme (trim) ve atlama (jump) azaltılması (makul sınırlarda)",
    "Kilit dikişi (lock stitch) düzeltmeleri",
    "Küçük sıralama (sequencing) ayarlamaları",
];

const serviceIsNotItems = [
    "Görselden sıfırdan nakış tasarımı (re-digitizing) yapılmaz",
    "Şekiller baştan oluşturulmaz",
    "Yaratıcı stil değişiklikleri yapılmaz",
    "Kötü bir çizim sıfırdan yeni bir nakışa dönüştürülmez",
];

const typicalIssues = [
    "Yanlış yoğunluklar (çok kalın / çok seyrek)",
    "Zayıf alt yapı (underlay)",
    "Stabil olmayan saten kenarlar",
    "İtme / çekme bozulmaları (Push/pull)",
    "Aşırı iplik kesimi ve uzun atlamalar",
    "Dağınık başlangıç/bitiş (tie-in/off) dikişleri",
    "Kötü sıralama kaynaklı kumaş kaymaları",
    "Küçük hizalama (registration) sorunları",
];

const changesAfterFixing = [
    "Daha temiz saten kenarları",
    "Tutarlı harf kalınlığı",
    "Azaltılmış kumaş bozulması/büzülmesi",
    "Daha iyi alt yapı (underlay) desteği",
    "Daha az ip kopması",
    "Daha akıcı makine çalışması",
    "Daha öngörülebilir üretim sonuçları",
];

const rightChoiceItems = [
    "Elinizde bir DST var ancak dikişler stabil görünmüyor",
    "Kenarlar pürüzlü veya harfler içine çöküyor",
    "Çok fazla ip kesimi veya ip kopması yaşanıyor",
    "Sıfırdan çizdirmeden üretime hazır hale getirecek bir temizliğe ihtiyacınız var",
];

const notRightChoiceItems = [
    "Otomatik dönüştürülmüş (auto-digitized) dosya yapısal olarak tamamen yanlış",
    "Şekiller bozuk veya eksik",
    "Tasarımın görselden yeniden oluşturulması gerekiyor",
    "Temiz bir sıfırdan çizim mecburiyeti var",
];

const processItems = [
    "DST dosyanızı yükleyin ve kumaş + ölçü belirtin",
    "Hedeflenmiş düzeltmeleri mevcut dosyaya uygulayalım",
    "Nakış numunesini deneyip onay sonucunu size gönderelim",
];

const comparisonBlocks = [
    {
        title: "HAM DST SONUCU",
        line1: "Teslim edildiği gibi işlenir",
        line2: "Dikiş davranışı stabil değildir",
        imageSrc: "/images/fix-your-dst/raw-dst-result.webp",
        imageAlt: "Kumaş üzerinde stabil olmayan üretim sorunlarını gösteren ham DST dikiş sonucu",
    },
    {
        title: "HEDEFLENMİŞ MÜDAHALE",
        line1: "Aynı dosya içinde stabilizasyon sağlanır",
        line2: "Sıfırdan çizim (redesign) içermez",
        imageSrc: "/images/fix-your-dst/targeted-fixes-applied.webp",
        imageAlt: "DST dosyasındaki hedeflenmiş düzeltme noktalarını vurgulayan açıklamalı dikiş numunesi",
    },
    {
        title: "ÜRETİM SONUCU",
        line1: "Öngörülebilir dikiş sonucu",
        line2: "Tekrarlı üretime (seri üretime) hazır",
        imageSrc: "/images/fix-your-dst/final-stitch-result.webp",
        imageAlt: "Daha temiz saten detaylarıyla DST stabilizasyonundan sonraki nihai dikiş sonucu",
    },
];

const faqItems = [
    {
        question: "Tasarımı sıfırdan baştan mı çiziyorsunuz?",
        answer: "Hayır. Sadece mevcut dosya üzerinde üretim odaklı hedeflenmiş düzeltmeler (Fix) uygulanır.",
    },
    {
        question: "DST uygun şekilde stabil hale getirilemezse ne olur?",
        answer: "Dosyanız Fix Your DST ile tamamen onarılamayacak kadar kötü durumdaysa, nakış veya düzeltme işlemine başlamadan önce mutlaka size haber veririz.",
    },
    {
        question: "Yine de bir numune işliyor musunuz?",
        answer: "Evet. Düzeltmeler mutlaka gerçek makine ve kumaş üstünde işlenerek doğrulanır.",
    },
    {
        question: "Hangi bilgileri sağlamalıyım?",
        answer: "Kumaş türü, ölçü ve mevcut dikişlerde gözlemlediğiniz sorunları belirtmelisiniz.",
    },
    {
        question: "Teslimat süresi nedir?",
        answer: "Sektörel standartlarımız gereği genellikle 24 saat içinde teslim edilir.",
    },
];

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
        },
    })),
};

export const metadata: Metadata = {
    title: "Fix Your DST | Approval Stitch",
    description:
        "Mevcut DST dosyanıza hedeflenmiş üretim düzeltmeleri gerçekleştiriyoruz ve bu düzeltmeleri kumaşta gerçek nakış ile test ederek onaylıyoruz.",
    keywords: [
        "fix your dst",
        "dst dosya onarımı",
        "nakış dosyası düzeltme",
        "üretim nakış onayı",
        "hedeflenmiş dst müdahalesi",
    ],
    alternates: {
        canonical: "/tr/fix-your-dst",
    },
};

export default function FixYourDstTrPage() {
    return (
        <FixYourDstClient
            serviceIsItems={serviceIsItems}
            serviceIsNotItems={serviceIsNotItems}
            typicalIssues={typicalIssues}
            changesAfterFixing={changesAfterFixing}
            rightChoiceItems={rightChoiceItems}
            notRightChoiceItems={notRightChoiceItems}
            processItems={processItems}
            comparisonBlocks={comparisonBlocks}
            faqItems={faqItems}
            faqSchema={faqSchema}
            translations={{
                heroTitle: "Fix Your DST Dosyası",
                heroDesc: "Mevcut DST dosyanıza üretime yönelik kritik düzeltmeler - üstelik gerçek nakış ile test edilerek onaylanır.",
                heroSubDesc: "Sıfırdan (baştan) çizim yapılmaz. Eğer dosya yapısal olarak kurtarılamayacak durumdaysa, işlemden önce bilgilendirilirsiniz.",
                buttonText: "Fix Your DST Siparişi Ver",
                realStitch: "Gerçek Nakış Numunesi",
                prodReady: "Üretime Hazır Dosya",
                whatIs: "Bu Servis Neleri Kapsar?",
                whatIsNot: "Bu Servis Neleri Kapsamaz?",
                minimalChanges: "Değişiklikler minimal tutulur - sadece dikiş stabilitesini artıran kritik müdahaleler yapılır.",
                ifNotPossible: "Eğer düzeltmeler dosyayı üretime hazır hale getiremeyecek durumda ise işleme devam etmeden önce size haber veririz.",
                compTitle: "Gerçek Üretim Karşılaştırması",
                risksTitle: "Düzelttiğimiz Tipik Sorunlar",
                risksSub: "Düzelttiğimiz Tipik Sorunlar",
                risksLabel: "ÜRETİM RİSKLERİ",
                stabilityTitle: "Düzeltmeden Sonra Neler Değişir",
                stabilitySub: "Düzeltmeden Sonra Neler Değişir",
                stabilityLabel: "GELİŞMİŞ STABİLİTE",
                rightChoiceTitle: "Ne Zaman Doğru Tercih?",
                notRightChoiceTitle: "Ne Zaman Yanlış Tercih?",
                processTitle: "Basit 3 Adım",
                turnaround: "Standart teslimat süremiz genellikle 24 saattir.",
                faqTitle: "Sıkça Sorulan Sorular",
                faqLabel: "Sorular & Cevaplar"
            }}
        />
    );
}
