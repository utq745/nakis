import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const token = searchParams.get("token");

        if (!token) {
            return NextResponse.json({ error: "Token is required" }, { status: 400 });
        }

        const user = await prisma.user.findFirst({
            where: {
                emailVerificationToken: token,
                emailVerificationTokenExpires: {
                    gt: new Date()
                }
            }
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }

        // Apply pending changes
        await prisma.user.update({
            where: { id: user.id },
            data: {
                name: user.pendingName || user.name,
                email: user.pendingEmail || user.email,
                pendingName: null,
                pendingEmail: null,
                emailVerificationToken: null,
                emailVerificationTokenExpires: null,
                emailVerified: new Date()
            }
        });

        // Redirect back to settings with success message
        const baseUrl = new URL(request.url).origin;
        const targetLocale = user.language === "tr" ? "/tr" : "";
        return NextResponse.redirect(`${baseUrl}${targetLocale}/settings?verified=true`);
    } catch (error) {
        console.error("Verification error:", error);
        return NextResponse.json({ error: "Verification failed" }, { status: 500 });
    }
}
