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

export async function sendDeleteAccountEmail(to: string, token: string, locale: "en" | "tr") {
    const confirmUrl = `${process.env.NEXTAUTH_URL}/api/user/delete-account/confirm?token=${token}`;

    if (locale === "tr") {
        console.log(`
        📧 [MOCK EMAIL SERVICE]
        To: ${to}
        Subject: Hesap Silme Onayı
        -------------------------------------------
        Merhaba,
        Hesabınızı silme talebiniz alınmıştır. Bu işlemi onaylamak için lütfen aşağıdaki bağlantıya tıklayın:
        
        ${confirmUrl}
        
        Eğer bu talebi siz yapmadıysanız lütfen bu e-postayı dikkate almayın.
        -------------------------------------------
        `);
    } else {
        console.log(`
        📧 [MOCK EMAIL SERVICE]
        To: ${to}
        Subject: Account Deletion Confirmation
        -------------------------------------------
        Hello,
        We received a request to delete your account. To confirm this action, please click the link below:
        
        ${confirmUrl}
        
        If you did not make this request, please ignore this email.
        -------------------------------------------
        `);
    }
}
