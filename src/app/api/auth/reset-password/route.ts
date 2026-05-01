import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";
import { z } from "zod";
import { passwordResetRateLimiter, getClientIP, checkRateLimit } from "@/lib/rate-limit";

const resetPasswordSchema = z.object({
    token: z.string().min(1, "Token is required"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
});

export async function POST(request: Request) {
    try {
        const clientIP = getClientIP(request);
        const rateLimitResult = await checkRateLimit(passwordResetRateLimiter, clientIP);
        if (!rateLimitResult.success) {
            return NextResponse.json(
                { error: "Too many attempts. Please try again later." },
                {
                    status: 429,
                    headers: { "Retry-After": String(rateLimitResult.retryAfter) },
                }
            );
        }

        const body = await request.json();
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
                { error: "Invalid or expired reset token" },
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
            message: "Password reset successfully",
        });
    } catch (error) {
        console.error("Reset password error:", error);
        return NextResponse.json(
            { error: "Failed to reset password" },
            { status: 500 }
        );
    }
}
