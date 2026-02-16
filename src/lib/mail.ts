import nodemailer from "nodemailer";

// ────────────────────────────────────────────────
// Transporter (singleton — created once, reused)
// ────────────────────────────────────────────────

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const MAIL_FROM = process.env.MAIL_FROM || "Approval Stitch <noreply@approvalstitch.com>";

// ────────────────────────────────────────────────
// Helper — all mails go through this single point
// ────────────────────────────────────────────────

async function send({
    to,
    subject,
    html,
}: {
    to: string;
    subject: string;
    html: string;
}) {
    try {
        const info = await transporter.sendMail({
            from: MAIL_FROM,
            to,
            subject,
            html,
        });
        console.log(`✅ Mail sent to ${to}  |  messageId: ${info.messageId}`);
        return info;
    } catch (err) {
        console.error(`❌ Mail failed to ${to}:`, err);
        throw err;
    }
}

// ────────────────────────────────────────────────
// Branded HTML wrapper
// ────────────────────────────────────────────────

function wrap(body: string) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="margin:0;padding:0;background:#f4f6f8;font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:40px 0;">
        <tr><td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
            <!-- Header -->
            <tr>
              <td style="background:linear-gradient(135deg,#1a365d 0%,#2563eb 100%);padding:32px 40px;text-align:center;">
                <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:-0.5px;">Approval Stitch</h1>
              </td>
            </tr>
            <!-- Body -->
            <tr>
              <td style="padding:40px;">
                ${body}
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td style="padding:24px 40px;background:#f9fafb;border-top:1px solid #e5e7eb;text-align:center;">
                <p style="margin:0;color:#9ca3af;font-size:12px;">
                  © ${new Date().getFullYear()} Approval Stitch. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </td></tr>
      </table>
    </body>
    </html>`;
}

// ────────────────────────────────────────────────
// Public API — keeps the same signatures as before
// ────────────────────────────────────────────────

export async function sendOrderCreatedEmail(to: string, orderTitle: string) {
    await send({
        to,
        subject: `Siparişiniz Alındı — ${orderTitle}`,
        html: wrap(`
            <h2 style="margin:0 0 16px;color:#1a365d;font-size:20px;">Siparişiniz Başarıyla Oluşturuldu 🎉</h2>
            <p style="margin:0 0 12px;color:#374151;font-size:15px;line-height:1.6;">
                Merhaba,<br>
                <strong>"${orderTitle}"</strong> başlıklı siparişiniz başarıyla alınmıştır.
            </p>
            <p style="margin:0 0 24px;color:#374151;font-size:15px;line-height:1.6;">
                Tasarım ekibimiz en kısa sürede incelemeye başlayacaktır. Sipariş detaylarını panelinizden takip edebilirsiniz.
            </p>
            <table cellpadding="0" cellspacing="0"><tr><td style="background:#2563eb;border-radius:10px;padding:14px 28px;">
                <a href="${process.env.AUTH_URL || 'https://www.approvalstitch.com'}/tr/siparisler" style="color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;">
                    Siparişlerime Git →
                </a>
            </td></tr></table>
        `),
    });
}

export async function sendOrderStatusUpdatedEmail(
    to: string,
    orderTitle: string,
    newStatus: string,
    price?: number
) {
    await send({
        to,
        subject: `Sipariş Durumu Güncellendi — ${orderTitle}`,
        html: wrap(`
            <h2 style="margin:0 0 16px;color:#1a365d;font-size:20px;">Sipariş Durumu Değişti</h2>
            <p style="margin:0 0 12px;color:#374151;font-size:15px;line-height:1.6;">
                Merhaba,<br>
                <strong>"${orderTitle}"</strong> başlıklı siparişinizin durumu güncellendi.
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;background:#f0f9ff;border-radius:12px;padding:20px;">
                <tr><td style="padding:16px 20px;">
                    <p style="margin:0 0 4px;color:#6b7280;font-size:13px;">Yeni Durum</p>
                    <p style="margin:0;color:#1a365d;font-size:18px;font-weight:700;">${newStatus}</p>
                    ${price ? `
                    <p style="margin:12px 0 4px;color:#6b7280;font-size:13px;">Fiyat</p>
                    <p style="margin:0;color:#1a365d;font-size:18px;font-weight:700;">${price} TL</p>
                    ` : ""}
                </td></tr>
            </table>
            <table cellpadding="0" cellspacing="0"><tr><td style="background:#2563eb;border-radius:10px;padding:14px 28px;">
                <a href="${process.env.AUTH_URL || 'https://www.approvalstitch.com'}/tr/siparisler" style="color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;">
                    Detayları Gör →
                </a>
            </td></tr></table>
        `),
    });
}

export async function sendNewCommentEmail(
    to: string,
    orderTitle: string,
    commenterName: string,
    content: string
) {
    await send({
        to,
        subject: `Yeni Mesaj — ${orderTitle}`,
        html: wrap(`
            <h2 style="margin:0 0 16px;color:#1a365d;font-size:20px;">Yeni Mesaj Aldınız 💬</h2>
            <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.6;">
                <strong>${commenterName}</strong>, <strong>"${orderTitle}"</strong> siparişine bir mesaj yazdı:
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
                <tr><td style="padding:16px 20px;background:#f9fafb;border-left:4px solid #2563eb;border-radius:0 12px 12px 0;">
                    <p style="margin:0;color:#374151;font-size:15px;line-height:1.6;font-style:italic;">
                        "${content}"
                    </p>
                </td></tr>
            </table>
            <table cellpadding="0" cellspacing="0"><tr><td style="background:#2563eb;border-radius:10px;padding:14px 28px;">
                <a href="${process.env.AUTH_URL || 'https://www.approvalstitch.com'}/tr/siparisler" style="color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;">
                    Yanıtla →
                </a>
            </td></tr></table>
        `),
    });
}

export async function sendDeleteAccountEmail(
    to: string,
    token: string,
    locale: "en" | "tr"
) {
    const confirmUrl = `${process.env.AUTH_URL || 'https://www.approvalstitch.com'}/api/user/delete-account/confirm?token=${token}`;

    if (locale === "tr") {
        await send({
            to,
            subject: "Hesap Silme Onayı — Approval Stitch",
            html: wrap(`
                <h2 style="margin:0 0 16px;color:#1a365d;font-size:20px;">Hesap Silme Talebi</h2>
                <p style="margin:0 0 12px;color:#374151;font-size:15px;line-height:1.6;">
                    Merhaba,<br>
                    Hesabınızı silme talebiniz alınmıştır. Bu işlemi onaylamak için lütfen aşağıdaki butona tıklayın:
                </p>
                <table cellpadding="0" cellspacing="0" style="margin:0 0 24px;"><tr><td style="background:#dc2626;border-radius:10px;padding:14px 28px;">
                    <a href="${confirmUrl}" style="color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;">
                        Hesabımı Sil →
                    </a>
                </td></tr></table>
                <p style="margin:0;color:#9ca3af;font-size:13px;line-height:1.6;">
                    Eğer bu talebi siz yapmadıysanız lütfen bu e-postayı dikkate almayın. Hesabınız güvende kalacaktır.
                </p>
            `),
        });
    } else {
        await send({
            to,
            subject: "Account Deletion Confirmation — Approval Stitch",
            html: wrap(`
                <h2 style="margin:0 0 16px;color:#1a365d;font-size:20px;">Account Deletion Request</h2>
                <p style="margin:0 0 12px;color:#374151;font-size:15px;line-height:1.6;">
                    Hello,<br>
                    We received a request to delete your account. To confirm this action, please click the button below:
                </p>
                <table cellpadding="0" cellspacing="0" style="margin:0 0 24px;"><tr><td style="background:#dc2626;border-radius:10px;padding:14px 28px;">
                    <a href="${confirmUrl}" style="color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;">
                        Delete My Account →
                    </a>
                </td></tr></table>
                <p style="margin:0;color:#9ca3af;font-size:13px;line-height:1.6;">
                    If you did not make this request, please ignore this email. Your account will remain safe.
                </p>
            `),
        });
    }
}

// ────────────────────────────────────────────────
// Welcome Email — sent when a new user registers
// ────────────────────────────────────────────────

export async function sendWelcomeEmail(
    to: string,
    name: string,
    locale: "en" | "tr"
) {
    const baseUrl = process.env.AUTH_URL || "https://www.approvalstitch.com";

    if (locale === "tr") {
        await send({
            to,
            subject: "Hoş Geldiniz! — Approval Stitch",
            html: wrap(`
                <h2 style="margin:0 0 16px;color:#1a365d;font-size:20px;">Hoş Geldiniz, ${name}! 🎉</h2>
                <p style="margin:0 0 12px;color:#374151;font-size:15px;line-height:1.6;">
                    Approval Stitch ailesine katıldığınız için teşekkür ederiz.
                </p>
                <p style="margin:0 0 12px;color:#374151;font-size:15px;line-height:1.6;">
                    Artık profesyonel nakış dijitalleştirme hizmetlerimizden yararlanabilir, siparişlerinizi kolayca takip edebilirsiniz.
                </p>
                <p style="margin:0 0 24px;color:#374151;font-size:15px;line-height:1.6;">
                    Hemen ilk siparişinizi oluşturmaya başlayın!
                </p>
                <table cellpadding="0" cellspacing="0"><tr><td style="background:#2563eb;border-radius:10px;padding:14px 28px;">
                    <a href="${baseUrl}/tr/siparisler/new" style="color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;">
                        İlk Siparişi Oluştur →
                    </a>
                </td></tr></table>
            `),
        });
    } else {
        await send({
            to,
            subject: "Welcome! — Approval Stitch",
            html: wrap(`
                <h2 style="margin:0 0 16px;color:#1a365d;font-size:20px;">Welcome, ${name}! 🎉</h2>
                <p style="margin:0 0 12px;color:#374151;font-size:15px;line-height:1.6;">
                    Thank you for joining Approval Stitch.
                </p>
                <p style="margin:0 0 12px;color:#374151;font-size:15px;line-height:1.6;">
                    You can now access our professional embroidery digitizing services and easily track your orders.
                </p>
                <p style="margin:0 0 24px;color:#374151;font-size:15px;line-height:1.6;">
                    Start creating your first order now!
                </p>
                <table cellpadding="0" cellspacing="0"><tr><td style="background:#2563eb;border-radius:10px;padding:14px 28px;">
                    <a href="${baseUrl}/orders/new" style="color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;">
                        Create First Order →
                    </a>
                </td></tr></table>
            `),
        });
    }
}

// ────────────────────────────────────────────────
// Password Reset Email — token valid for 15 min
// ────────────────────────────────────────────────

export async function sendPasswordResetEmail(
    to: string,
    resetUrl: string,
    locale: "en" | "tr"
) {
    if (locale === "tr") {
        await send({
            to,
            subject: "Şifre Sıfırlama — Approval Stitch",
            html: wrap(`
                <h2 style="margin:0 0 16px;color:#1a365d;font-size:20px;">Şifre Sıfırlama Talebi</h2>
                <p style="margin:0 0 12px;color:#374151;font-size:15px;line-height:1.6;">
                    Merhaba,<br>
                    Hesabınız için bir şifre sıfırlama talebi aldık. Şifrenizi sıfırlamak için aşağıdaki butona tıklayın:
                </p>
                <table cellpadding="0" cellspacing="0" style="margin:0 0 24px;"><tr><td style="background:#2563eb;border-radius:10px;padding:14px 28px;">
                    <a href="${resetUrl}" style="color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;">
                        Şifremi Sıfırla →
                    </a>
                </td></tr></table>
                <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;background:#fef3c7;border-radius:12px;">
                    <tr><td style="padding:16px 20px;">
                        <p style="margin:0;color:#92400e;font-size:13px;line-height:1.6;">
                            ⏱ Bu bağlantı <strong>15 dakika</strong> geçerlidir. Süre dolduktan sonra yeni bir sıfırlama talebi oluşturmanız gerekecektir.
                        </p>
                    </td></tr>
                </table>
                <p style="margin:0;color:#9ca3af;font-size:13px;line-height:1.6;">
                    Eğer bu talebi siz yapmadıysanız lütfen bu e-postayı dikkate almayın. Şifreniz değişmeyecektir.
                </p>
            `),
        });
    } else {
        await send({
            to,
            subject: "Password Reset — Approval Stitch",
            html: wrap(`
                <h2 style="margin:0 0 16px;color:#1a365d;font-size:20px;">Password Reset Request</h2>
                <p style="margin:0 0 12px;color:#374151;font-size:15px;line-height:1.6;">
                    Hello,<br>
                    We received a password reset request for your account. Click the button below to reset your password:
                </p>
                <table cellpadding="0" cellspacing="0" style="margin:0 0 24px;"><tr><td style="background:#2563eb;border-radius:10px;padding:14px 28px;">
                    <a href="${resetUrl}" style="color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;">
                        Reset My Password →
                    </a>
                </td></tr></table>
                <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;background:#fef3c7;border-radius:12px;">
                    <tr><td style="padding:16px 20px;">
                        <p style="margin:0;color:#92400e;font-size:13px;line-height:1.6;">
                            ⏱ This link is valid for <strong>15 minutes</strong>. After it expires, you'll need to request a new reset link.
                        </p>
                    </td></tr>
                </table>
                <p style="margin:0;color:#9ca3af;font-size:13px;line-height:1.6;">
                    If you did not request this, please ignore this email. Your password will remain unchanged.
                </p>
            `),
        });
    }
}
