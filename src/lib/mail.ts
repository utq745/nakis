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
const SITE_URL = process.env.AUTH_URL || "https://www.approvalstitch.com";
const LOGO_URL = `${SITE_URL}/images/approval-stich-logo-w.png`;

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
// Branded HTML wrapper (Clean & Premium)
// ────────────────────────────────────────────────

function wrap(body: string) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
            body { margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }
            .container { width: 100%; max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
            .header { background-color: #0f172a; padding: 32px; text-align: center; }
            .content { padding: 48px; color: #1e293b; line-height: 1.6; }
            .footer { background-color: #f1f5f9; padding: 24px; text-align: center; color: #64748b; font-size: 12px; }
            .button { display: inline-block; padding: 14px 28px; background-color: #2563eb; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; margin-top: 24px; }
            .logo { width: 180px; height: auto; }
            h2 { color: #0f172a; font-size: 24px; font-weight: 700; margin-top: 0; margin-bottom: 20px; letter-spacing: -0.025em; }
            p { margin-top: 0; margin-bottom: 16px; font-size: 16px; color: #475569; }
            .accent-box { background-color: #f0f9ff; border-radius: 12px; padding: 24px; margin: 24px 0; border: 1px solid #e0f2fe; }
        </style>
    </head>
    <body>
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc;">
            <tr>
                <td align="center" style="padding: 20px 0;">
                    <div class="container">
                        <div class="header">
                            <a href="${SITE_URL}" target="_blank">
                                <img src="${LOGO_URL}" alt="Approval Stitch Logo" class="logo">
                            </a>
                        </div>
                        <div class="content">
                            ${body}
                        </div>
                        <div class="footer">
                            <p style="margin: 0;">&copy; ${new Date().getFullYear()} Approval Stitch Inc. All rights reserved.</p>
                            <p style="margin: 4px 0 0;">Precision in every stitch.</p>
                        </div>
                    </div>
                </td>
            </tr>
        </table>
    </body>
    </html>`;
}

// ────────────────────────────────────────────────
// Public API
// ────────────────────────────────────────────────

/**
 * Membership Verification Email
 */
export async function sendVerificationEmail(
    to: string,
    name: string,
    token: string,
    locale: "en" | "tr"
) {
    const verifyUrl = `${SITE_URL}/api/auth/verify?token=${token}`;
    const isTr = locale === "tr";

    await send({
        to,
        subject: isTr ? "E-posta Adresinizi Doğrulayın — Approval Stitch" : "Verify Your Email — Approval Stitch",
        html: wrap(`
            <h2>${isTr ? `Hoş Geldiniz, ${name}!` : `Welcome, ${name}!`}</h2>
            <p>${isTr
                ? "Approval Stitch'e katıldığınız için teşekkürler. Hesabınızı kullanmaya başlamadan önce e-posta adresinizi doğrulamanız gerekmektedir."
                : "Thanks for joining Approval Stitch. Before you can start using your account, we need to verify your email address."
            }</p>
            <a href="${verifyUrl}" class="button">${isTr ? "E-postamı Doğrula →" : "Verify My Email →"}</a>
            <p style="margin-top: 24px; font-size: 13px; color: #94a3b8;">
                ${isTr
                ? "Düğmeye tıklayamıyorsanız, bu bağlantıyı tarayıcınıza yapıştırın:"
                : "If you're having trouble clicking the button, copy and paste this link into your browser:"
            }<br>
                ${verifyUrl}
            </p>
        `),
    });
}

/**
 * Password Reset Email
 */
export async function sendPasswordResetEmail(
    to: string,
    resetUrl: string,
    locale: "en" | "tr"
) {
    const isTr = locale === "tr";

    await send({
        to,
        subject: isTr ? "Şifre Sıfırlama — Approval Stitch" : "Password Reset — Approval Stitch",
        html: wrap(`
            <h2>${isTr ? "Şifre Sıfırlama Talebi" : "Password Reset Request"}</h2>
            <p>${isTr
                ? "Hesabınız için bir şifre sıfırlama talebi aldık. Şifrenizi sıfırlamak için aşağıdaki butona tıklayın:"
                : "We received a password reset request for your account. Click the button below to reset your password:"
            }</p>
            <a href="${resetUrl}" class="button">${isTr ? "Şifremi Sıfırla →" : "Reset My Password →"}</a>
            <div class="accent-box" style="background-color: #fffbeb; border-color: #fef3c7; color: #92400e;">
                <p style="margin: 0; font-size: 14px;">
                    ⏱ ${isTr
                ? "Bu bağlantı <strong>15 dakika</strong> geçerlidir. Süre dolduktan sonra yeni bir talep oluşturmanız gerekir."
                : "This link is valid for <strong>15 minutes</strong>. After it expires, you'll need to request a new link."
            }
                </p>
            </div>
            <p style="font-size: 13px; color: #94a3b8;">
                ${isTr
                ? "Bu talebi siz yapmadıysanız lütfen bu e-postayı dikkate almayın."
                : "If you did not make this request, please ignore this email."
            }
            </p>
        `),
    });
}

/**
 * Order Created Email
 */
export async function sendOrderCreatedEmail(
    to: string,
    orderTitle: string,
    locale: "en" | "tr",
    isAdminNotification = false
) {
    const isTr = locale === "tr";
    const subject = isAdminNotification
        ? `[ADMIN] Yeni Sipariş: ${orderTitle}`
        : (isTr ? `Siparişiniz Alındı — ${orderTitle}` : `Order Received — ${orderTitle}`);

    await send({
        to,
        subject,
        html: wrap(`
            <h2>${isAdminNotification
                ? "Yeni Bir Sipariş Var!"
                : (isTr ? "Siparişiniz Başarıyla Alındı 🎉" : "Order Successfully Received 🎉")
            }</h2>
            <p>${isAdminNotification
                ? `Sistemde <strong>"${orderTitle}"</strong> başlıklı yeni bir sipariş oluşturuldu.`
                : (isTr
                    ? `Merhaba, <strong>"${orderTitle}"</strong> başlıklı siparişiniz başarıyla alınmıştır.`
                    : `Hello, your order <strong>"${orderTitle}"</strong> has been successfully received.`)
            }</p>
            <p>${isTr
                ? (isAdminNotification ? "Siparişi incelemek için paneli kullanabilirsiniz." : "Ekibimiz en kısa sürede incelemeye başlayacaktır. Detayları panelden takip edebilirsiniz.")
                : (isAdminNotification ? "You can use the dashboard to review the order." : "Our team will start reviewing it shortly. You can track the details in your dashboard.")
            }</p>
            <a href="${SITE_URL}/${isTr ? 'tr/' : ''}${isAdminNotification ? 'panel/siparisler' : 'orders'}" class="button">
                ${isAdminNotification ? (isTr ? "Siparişi Görüntüle →" : "View Order →") : (isTr ? "Siparişlerime Git →" : "Go to My Orders →")}
            </a>
        `),
    });
}

/**
 * Price Quote Email (Admin -> Customer)
 */
export async function sendPriceQuoteEmail(
    to: string,
    orderTitle: string,
    price: number,
    locale: "en" | "tr"
) {
    const isTr = locale === "tr";
    await send({
        to,
        subject: isTr ? `Fiyat Teklifi Hazır — ${orderTitle}` : `Price Quote Ready — ${orderTitle}`,
        html: wrap(`
            <h2>${isTr ? "Fiyat Teklifi Hazır! 💰" : "Your Price Quote is Ready! 💰"}</h2>
            <p>${isTr
                ? `<strong>"${orderTitle}"</strong> başlıklı siparişiniz için fiyat teklifi hazırlandı.`
                : `A price quote has been prepared for your order <strong>"${orderTitle}"</strong>.`
            }</p>
            <div class="accent-box" style="text-align: center;">
                <p style="margin: 0; font-size: 20px; font-weight: 700; color: #0f172a;">
                    ${isTr ? "Teklif Tutarı" : "Quote Amount"}: <span style="color: #2563eb;">$${price}</span>
                </p>
            </div>
            <p>${isTr
                ? "Siparişi başlatmak için teklifi panel üzerinden onaylamanız gerekmektedir. Teklifi kabul ettiğinizde ekibimiz hemen çalışmaya başlayacaktır."
                : "To start the order, you need to approve the quote via your dashboard. Once you accept, our team will begin work immediately."
            }</p>
            <a href="${SITE_URL}/${isTr ? 'tr/' : ''}orders" class="button">
                ${isTr ? "Teklifi İncele →" : "Review Quote →"}
            </a>
        `),
    });
}

/**
 * Quote Action Email (Customer -> Admin)
 */
export async function sendQuoteActionEmail(
    to: string,
    orderTitle: string,
    customerName: string,
    action: "ACCEPTED" | "REJECTED",
    locale: "en" | "tr"
) {
    const isTr = locale === "tr";
    const isAccepted = action === "ACCEPTED";
    const subject = isTr
        ? `[ADMIN] Teklif ${isAccepted ? 'Kabul Edildi' : 'Reddedildi'}: ${orderTitle}`
        : `[ADMIN] Quote ${isAccepted ? 'Accepted' : 'Rejected'}: ${orderTitle}`;

    await send({
        to,
        subject,
        html: wrap(`
            <h2>${isTr ? "Teklif Hakkında Güncelleme" : "Order Quote Update"}</h2>
            <p><strong>${customerName}</strong>, <strong>"${orderTitle}"</strong> siparişi için gönderdiğiniz fiyat teklifini <strong>${isTr ? (isAccepted ? 'KABUL ETTİ' : 'REDDETTİ') : action}</strong>.</p>
            ${isAccepted ? `
            <p>${isTr
                    ? "Müşteri ödemeye hazır veya işin başlamasını bekliyor. Lütfen siparişi hazırlamaya başlayın."
                    : "The customer is ready for payment or waiting for work to start. Please begin preparing the order."
                }</p>` : `
            <p>${isTr
                ? "Müşteri teklifi reddetti ve siparişi iptal etti."
                : "The customer rejected the quote and cancelled the order."
            }</p>`}
            <a href="${SITE_URL}/${isTr ? 'tr/' : ''}panel/siparisler" class="button">
                ${isTr ? "Siparişi Görüntüle →" : "View Order →"}
            </a>
        `),
    });
}

/**
 * Order Status: CANCELLED
 */
export async function sendOrderCancelledEmail(
    to: string,
    orderTitle: string,
    locale: "en" | "tr",
    isAdmin = false
) {
    const isTr = locale === "tr";
    const subject = isAdmin
        ? `[ADMIN] Sipariş İptal Edildi: ${orderTitle}`
        : (isTr ? `Sipariş İptal Edildi — ${orderTitle}` : `Order Cancelled — ${orderTitle}`);

    await send({
        to,
        subject,
        html: wrap(`
            <h2 style="color: #dc2626;">${isTr ? "Sipariş İptal Edildi" : "Order Cancelled"}</h2>
            <p>${isAdmin
                ? `Müşteri <strong>"${orderTitle}"</strong> başlıklı siparişi iptal etti.`
                : (isTr
                    ? `<strong>"${orderTitle}"</strong> başlıklı siparişiniz iptal edilmiştir.`
                    : `Your order <strong>"${orderTitle}"</strong> has been cancelled.`)
            }</p>
            <div class="accent-box" style="background-color: #fef2f2; border-color: #fee2e2;">
                <p style="margin: 0; color: #991b1b; font-size: 14px;">
                    ${isTr
                ? "Siparişiniz sistemde iptal edildi."
                : "Your order has been cancelled in the system."}
                </p>
            </div>
            <a href="${SITE_URL}/${isTr ? 'tr/' : ''}orders" class="button" style="background-color: #475569;">
                ${isTr ? "Paneli Görüntüle →" : "View Dashboard →"}
            </a>
        `),
    });
}

/**
 * Order Status: IN_PROGRESS
 */
export async function sendOrderInProgressEmail(
    to: string,
    orderTitle: string,
    locale: "en" | "tr"
) {
    const isTr = locale === "tr";
    await send({
        to,
        subject: isTr ? `Sipariş Hazırlanıyor — ${orderTitle}` : `Order In Progress — ${orderTitle}`,
        html: wrap(`
            <h2>${isTr ? "Siparişiniz Hazırlanıyor 🧵" : "Your Order is In Progress 🧵"}</h2>
            <p>${isTr
                ? `<strong>"${orderTitle}"</strong> başlıklı siparişiniz üretim ekibimiz tarafından işleme alınmıştır.`
                : `Your order <strong>"${orderTitle}"</strong> is being processed by our production team.`
            }</p>
            <p>${isTr
                ? "Dosyalarınız büyük bir titizlikle hazırlanıyor. Tamamlandığında size haber vereceğiz."
                : "Your files are being prepared with great care. We will notify you once completed."
            }</p>
            <a href="${SITE_URL}/${isTr ? 'tr/' : ''}orders" class="button">${isTr ? "Sipariş Detayı →" : "Order Details →"}</a>
        `),
    });
}

/**
 * Order Status: REVISION
 */
export async function sendOrderRevisionEmail(
    to: string,
    orderTitle: string,
    locale: "en" | "tr",
    isAdmin = false
) {
    const isTr = locale === "tr";
    const subject = isAdmin
        ? `[ADMIN] Revizyon Talebi: ${orderTitle}`
        : (isTr ? `Revizyon Talebi Alındı — ${orderTitle}` : `Revision Request Received — ${orderTitle}`);

    await send({
        to,
        subject,
        html: wrap(`
            <h2>${isTr ? "Revizyon Talebi" : "Revision Request"}</h2>
            <p>${isAdmin
                ? `Müşteri <strong>"${orderTitle}"</strong> başlıklı sipariş için revizyon talep etti.`
                : (isTr
                    ? `<strong>"${orderTitle}"</strong> siparişi için revizyon talebiniz alınmıştır.`
                    : `Your revision request for <strong>"${orderTitle}"</strong> has been received.`)
            }</p>
            <p>${isTr
                ? "Ekibimiz talep ettiğiniz değişiklikleri inceleyip güncelleyecektir."
                : "Our team will review and apply the requested changes."
            }</p>
            <a href="${SITE_URL}/${isTr ? 'tr/' : ''}orders" class="button">${isTr ? "Sipariş Detayı →" : "Order Details →"}</a>
        `),
    });
}

/**
 * Order Status: COMPLETED (Order Done, Files Ready)
 */
export async function sendOrderCompletedEmail(
    to: string,
    orderTitle: string,
    locale: "en" | "tr",
    isAdmin = false
) {
    const isTr = locale === "tr";
    const subject = isAdmin
        ? `[ADMIN] Sipariş Tamamlandı: ${orderTitle}`
        : (isTr ? `Siparişiniz Tamamlandı — ${orderTitle}` : `Order Completed — ${orderTitle}`);

    await send({
        to,
        subject,
        html: wrap(`
            <h2 style="color: #059669;">${isTr ? "Siparişiniz Tamamlandı! 🎉" : "Your Order is Complete! 🎉"}</h2>
            <p>${isAdmin
                ? `<strong>"${orderTitle}"</strong> başlıklı sipariş tamamlandı.`
                : (isTr
                    ? `<strong>"${orderTitle}"</strong> başlıklı siparişiniz tamamlanmıştır. Final dosyalarınız indirilmeye hazır.`
                    : `Your order <strong>"${orderTitle}"</strong> has been completed. Your final files are ready to download.`)
            }</p>
            <a href="${SITE_URL}/${isTr ? 'tr/' : ''}orders" class="button" style="background-color: #059669;">
                ${isTr ? "Dosyaları İndir →" : "Download Files →"}
            </a>
        `),
    });
}

/**
 * Order Status: DELIVERED (Files Downloaded)
 */
export async function sendOrderDeliveredEmail(
    to: string,
    orderTitle: string,
    locale: "en" | "tr"
) {
    const isTr = locale === "tr";
    await send({
        to,
        subject: isTr ? `Sipariş Teslim Edildi — ${orderTitle}` : `Order Delivered — ${orderTitle}`,
        html: wrap(`
            <h2 style="color: #059669;">${isTr ? "Sipariş Teslim Edildi ✅" : "Order Delivered ✅"}</h2>
            <p>${isTr
                ? `<strong>"${orderTitle}"</strong> başlıklı siparişinizin dosyaları başarıyla teslim edilmiştir.`
                : `The files for your order <strong>"${orderTitle}"</strong> have been successfully delivered.`
            }</p>
            <p>${isTr
                ? "Bizi tercih ettiğiniz için teşekkürler. Yeni bir sipariş oluşturmak için paneli ziyaret edebilirsiniz."
                : "Thank you for choosing us. You can visit your dashboard to create a new order."
            }</p>
            <a href="${SITE_URL}/${isTr ? 'tr/' : ''}orders" class="button" style="background-color: #059669;">
                ${isTr ? "Paneli Görüntüle →" : "View Dashboard →"}
            </a>
        `),
    });
}

/**
 * New Comment Email
 */
export async function sendNewCommentEmail(
    to: string,
    orderTitle: string,
    commenterName: string,
    content: string,
    locale: "en" | "tr" = "en"
) {
    const isTr = locale === "tr";
    await send({
        to,
        subject: isTr ? `Yeni Mesaj — ${orderTitle}` : `New Message — ${orderTitle}`,
        html: wrap(`
            <h2>${isTr ? "Yeni Mesaj Aldınız 💬" : "You Have a New Message 💬"}</h2>
            <p><strong>${commenterName}</strong>, <strong>"${orderTitle}"</strong> ${isTr ? "siparişine bir mesaj yazdı:" : "wrote a message for the order:"}</p>
            <div class="accent-box" style="font-style: italic; border-left: 4px solid #2563eb;">
                "${content}"
            </div>
            <a href="${SITE_URL}/${isTr ? 'tr/' : ''}orders" class="button">
                ${isTr ? "Yanıtla →" : "Reply →"}
            </a>
        `),
    });
}

/**
 * Welcome Email (Legacy support + branding update)
 */
export async function sendWelcomeEmail(
    to: string,
    name: string,
    locale: "en" | "tr"
) {
    const isTr = locale === "tr";
    await send({
        to,
        subject: isTr ? "Hoş Geldiniz! — Approval Stitch" : "Welcome! — Approval Stitch",
        html: wrap(`
            <h2>${isTr ? `Hoş Geldiniz, ${name}! 🎉` : `Welcome, ${name}! 🎉`}</h2>
            <p>${isTr
                ? "Approval Stitch ailesine katıldığınız için teşekkür ederiz."
                : "Thank you for joining Approval Stitch."
            }</p>
            <p>${isTr
                ? "Artık profesyonel nakış dijitalleştirme hizmetlerimizden yararlanabilir, siparişlerinizi kolayca takip edebilirsiniz."
                : "You can now access our professional embroidery digitizing services and easily track your orders."
            }</p>
            <a href="${SITE_URL}/${isTr ? 'tr/' : ''}orders/new" class="button">
                ${isTr ? "İlk Siparişi Oluştur →" : "Create First Order →"}
            </a>
        `),
    });
}

/**
 * Delete Account Email
 */
export async function sendDeleteAccountEmail(
    to: string,
    token: string,
    locale: "en" | "tr"
) {
    const confirmUrl = `${SITE_URL}/api/user/delete-account/confirm?token=${token}`;
    const isTr = locale === "tr";

    await send({
        to,
        subject: isTr ? "Hesap Silme Onayı — Approval Stitch" : "Account Deletion Confirmation — Approval Stitch",
        html: wrap(`
            <h2>${isTr ? "Hesap Silme Talebi" : "Account Deletion Request"}</h2>
            <p>${isTr
        ? "Hesabınızı silme talebiniz alınmıştır. Bu işlemi onaylamak için lütfen aşağıdaki butona tıklayın:"
        : "We received a request to delete your account. To confirm this action, please click the button below:"
    }</p>
            <a href="${confirmUrl}" class="button" style="background-color: #dc2626;">
                ${isTr ? "Hesabımı Sil →" : "Delete My Account →"}
            </a>
            <p style="margin-top: 24px; font-size: 13px; color: #94a3b8;">
                ${isTr
        ? "Eğer bu talebi siz yapmadıysanız lütfen bu e-postayı dikkate almayın. Hesabınız güvende kalacaktır."
        : "If you did not make this request, please ignore this email. Your account will remain safe."
    }
            </p>
        `),
    });
}

/**
 * New User Admin Notification — Always sent in Turkish
 */
export async function sendNewUserAdminNotification(
    to: string,
    userName: string,
    userEmail: string,
) {
    const subject = `[ADMIN] Yeni Kullanıcı Kaydı: ${userName}`;

    await send({
        to,
        subject,
        html: wrap(`
            <h2>Yeni Kullanıcı Kaydı! 👤</h2>
            <p>Sisteme <strong>${userName}</strong> adında yeni bir kullanıcı kayıt oldu.</p>
            <div class="accent-box">
                <p style="margin: 0;"><strong>E-posta:</strong> ${userEmail}</p>
                <p style="margin: 8px 0 0;"><strong>İsim:</strong> ${userName}</p>
            </div>
            <p>Kullanıcı detaylarını görmek için admin panelini ziyaret edebilirsiniz.</p>
            <a href="${SITE_URL}/tr/musteriler" class="button">
                Müşterileri Görüntüle →
            </a>
        `),
    });
}
