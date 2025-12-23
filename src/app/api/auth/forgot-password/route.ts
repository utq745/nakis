import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import crypto from "crypto";

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

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
                message: "If an account exists with this email, a password reset link has been sent.",
            });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

        // Save token to database
        await prisma.user.update({
            where: { id: user.id },
            data: {
                resetPasswordToken: resetToken,
                resetPasswordExpires: resetTokenExpiry,
            },
        });

        // TODO: Send email with reset link
        // For now, log the token (in production, send via email service like Resend)
        const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reset-password?token=${resetToken}`;
        console.log("Password reset URL:", resetUrl);

        return NextResponse.json({
            message: "If an account exists with this email, a password reset link has been sent.",
            // Remove this in production - only for development
            ...(process.env.NODE_ENV === "development" && { resetUrl }),
        });
    } catch (error) {
        console.error("Forgot password error:", error);
        return NextResponse.json(
            { error: "Failed to process request" },
            { status: 500 }
        );
    }
}
