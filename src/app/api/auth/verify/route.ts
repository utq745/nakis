import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const SITE_URL = process.env.AUTH_URL || "https://www.approvalstitch.com";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const token = searchParams.get("token");

        if (!token) {
            return NextResponse.redirect(`${SITE_URL}/login?error=InvalidToken`);
        }

        const user = await prisma.user.findFirst({
            where: {
                emailVerificationToken: token,
                emailVerificationTokenExpires: {
                    gt: new Date(),
                },
            },
        });

        if (!user) {
            return NextResponse.redirect(`${SITE_URL}/login?error=TokenExpired`);
        }

        // Check if this is a pending email change verification
        const updateData: Record<string, unknown> = {
            emailVerified: new Date(),
            emailVerificationToken: null,
            emailVerificationTokenExpires: null,
        };

        if (user.pendingEmail) {
            updateData.email = user.pendingEmail;
            updateData.pendingEmail = null;
        }
        if (user.pendingName) {
            updateData.name = user.pendingName;
            updateData.pendingName = null;
        }

        await prisma.user.update({
            where: { id: user.id },
            data: updateData,
        });

        // Redirect based on user language
        const lang = user.language === "tr" ? "tr" : "en";
        const loginPath = lang === "tr" ? "/tr/giris" : "/login";
        return NextResponse.redirect(`${SITE_URL}${loginPath}?verified=true`);
    } catch (error) {
        console.error("Verification error:", error);
        return NextResponse.redirect(`${SITE_URL}/login?error=UnknownError`);
    }
}
