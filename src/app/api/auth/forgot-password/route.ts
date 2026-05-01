import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import { passwordResetRateLimiter, getClientIP, checkRateLimit } from "@/lib/rate-limit";

import { translations, Locale } from "@/lib/dictionary";

export async function POST(request: Request) {
    let locale: Locale = "en";
    try {
        const body = await request.json();
        const { email, language } = body;
        locale = language === "tr" ? "tr" : "en";
        const t = translations[locale];

        // Rate limiting
        const clientIP = getClientIP(request);
        const rateLimitResult = await checkRateLimit(passwordResetRateLimiter, clientIP);
        if (!rateLimitResult.success) {
            return NextResponse.json(
                { error: t.auth.errors.tooManyAttempts },
                {
                    status: 429,
                    headers: { "Retry-After": String(rateLimitResult.retryAfter) }
                }
            );
        }

        const isDev = process.env.NODE_ENV !== "production";
        if (isDev) console.log(`[FORGOT_PASSWORD] Requested for: ${email} (Locale: ${locale})`);

        if (!email) {
            return NextResponse.json(
                { error: t.auth.validation.emailRequired },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (isDev) console.log(`[FORGOT_PASSWORD] User found? ${!!user}`);

        // Always return success to prevent email enumeration attacks
        if (!user) {
            if (isDev) console.log(`[FORGOT_PASSWORD] No user found. Returning early.`);
            return NextResponse.json({
                message: t.auth.messages.resetLinkSent,
            });
        }

        if (isDev) console.log(`[FORGOT_PASSWORD] Sending email to user id: ${user.id}`);

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

        // Save token to database
        await prisma.user.update({
            where: { id: user.id },
            data: {
                resetPasswordToken: resetToken,
                resetPasswordExpires: resetTokenExpiry,
            },
        });

        // Build reset URL based on language
        const baseUrl = process.env.AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
        const resetUrl = locale === "tr"
            ? `${baseUrl}/tr/sifre-sifirla?token=${resetToken}`
            : `${baseUrl}/reset-password?token=${resetToken}`;

        // Send password reset email
        const { sendPasswordResetEmail } = await import("@/lib/mail");
        await sendPasswordResetEmail(user.email!, resetUrl, locale);

        return NextResponse.json({
            message: t.auth.messages.resetLinkSent,
        });
    } catch (error) {
        console.error("Forgot password error:", error);
        const t = translations[locale];
        return NextResponse.json(
            { error: t.common.error || "Failed to process request" },
            { status: 500 }
        );
    }
}
