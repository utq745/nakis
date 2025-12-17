export async function sendOrderCreatedEmail(to: string, orderTitle: string) {
    // In a real app, use Resend, SendGrid, or Nodemailer here.
    console.log(`
    📧 [MOCK EMAIL SERVICE]
    To: ${to}
    Subject: Siparişiniz Alındı - ${orderTitle}
    -------------------------------------------
    Merhaba,
    "${orderTitle}" başlıklı siparişiniz başarıyla oluşturuldu.
    Tasarım ekibimiz en kısa sürede incelemeye başlayacaktır.
    -------------------------------------------
    `);
}

export async function sendOrderStatusUpdatedEmail(to: string, orderTitle: string, newStatus: string, price?: number) {
    console.log(`
    📧 [MOCK EMAIL SERVICE]
    To: ${to}
    Subject: Sipariş Durumu Güncellendi - ${orderTitle}
    -------------------------------------------
    Merhaba,
    "${orderTitle}" başlıklı siparişinizin durumu güncellendi: ${newStatus}
    ${price ? `Fiyat: ${price} TL` : ""}
    
    Detayları görmek için panele giriş yapın.
    -------------------------------------------
    `);
}

export async function sendNewCommentEmail(to: string, orderTitle: string, commenterName: string, content: string) {
    console.log(`
    📧 [MOCK EMAIL SERVICE]
    To: ${to}
    Subject: Yeni Mesaj - ${orderTitle}
    -------------------------------------------
    ${commenterName} bir mesaj yazdı:
    
    "${content}"
    -------------------------------------------
    `);
}
