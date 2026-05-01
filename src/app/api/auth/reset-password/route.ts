import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";
import { z } from "zod";
import { passwordResetRateLimiter, getClientIP, checkRateLimit } from "@/lib/rate-limit";

import { translations, Locale } from "@/lib/dictionary";

export async function POST(request: Request) {
    let locale: Locale = "en";
    try {
        const body = await request.json();
        locale = body.language === "tr" ? "tr" : "en";
        const t = translations[locale];

        const resetPasswordSchema = z.object({
            token: z.string().min(1, t.auth.errors.invalidToken),
            password: z
                .string()
                .min(8, t.auth.validation.passwordMin)
                .regex(/[^A-Za-z0-9]/, t.auth.validation.passwordSpecial),
        });

        const clientIP = getClientIP(request);
        const rateLimitResult = await checkRateLimit(passwordResetRateLimiter, clientIP);
        if (!rateLimitResult.success) {
            return NextResponse.json(
                { error: t.auth.errors.tooManyAttempts },
                {
                    status: 429,
                    headers: { "Retry-After": String(rateLimitResult.retryAfter) },
                }
            );
        }

        const parsed = resetPasswordSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.issues[0].message },
                { status: 400 }
            );
        }

        const { token, password } = parsed.data;

        // Find user with valid token
        const user = await prisma.user.findFirst({
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: {
                    gt: new Date(),
                },
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: t.auth.errors.invalidToken },
                { status: 400 }
            );
        }

        // Hash new password
        const hashedPassword = await hash(password, 12);

        // Update password and clear reset token
        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetPasswordToken: null,
                resetPasswordExpires: null,
            },
        });

        return NextResponse.json({
            message: t.auth.messages.passwordResetSuccess,
        });
    } catch (error) {
        console.error("Reset password error:", error);
        const t = translations[locale];
        return NextResponse.json(
            { error: t.auth.errors.resetFailed },
            { status: 500 }
        );
    }
}
