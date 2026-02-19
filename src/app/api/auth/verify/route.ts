import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const token = searchParams.get("token");

        if (!token) {
            return NextResponse.redirect(new URL("/login?error=InvalidToken", request.url));
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
            return NextResponse.redirect(new URL("/login?error=TokenExpired", request.url));
        }

        await prisma.user.update({
            where: { id: user.id },
            data: {
                emailVerified: new Date(),
                emailVerificationToken: null,
                emailVerificationTokenExpires: null,
            },
        });

        return NextResponse.redirect(new URL("/login?verified=true", request.url));
    } catch (error) {
        console.error("Verification error:", error);
        return NextResponse.redirect(new URL("/login?error=UnknownError", request.url));
    }
}
