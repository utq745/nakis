import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import { passwordResetRateLimiter, getClientIP, checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
    try {
        // Rate limiting
        const clientIP = getClientIP(request);
        const rateLimitResult = await checkRateLimit(passwordResetRateLimiter, clientIP);
        if (!rateLimitResult.success) {
            return NextResponse.json(
                { error: "Too many requests. Please try again later." },
                {
                    status: 429,
                    headers: { "Retry-After": String(rateLimitResult.retryAfter) }
                }
            );
        }

        const { email, language } = await request.json();
        const locale = language === "tr" ? "tr" : "en";

        if (!email) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        // Always return success to prevent email enumeration attacks
        if (!user) {
            return NextResponse.json({
                message: locale === "tr"
                    ? "Bu e-posta adresiyle bir hesap varsa, şifre sıfırlama bağlantısı gönderildi."
                    : "If an account exists with this email, a password reset link has been sent.",
            });
        }

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
            message: locale === "tr"
                ? "Bu e-posta adresiyle bir hesap varsa, şifre sıfırlama bağlantısı gönderildi."
                : "If an account exists with this email, a password reset link has been sent.",
        });
    } catch (error) {
        console.error("Forgot password error:", error);
        return NextResponse.json(
            { error: "Failed to process request" },
            { status: 500 }
        );
    }
}
