import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { compare } from "bcryptjs";
import { sendDeleteAccountEmail } from "@/lib/mail";

export async function DELETE(request: Request) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { password, confirmation } = await request.json();

        // Require explicit confirmation text
        if (confirmation !== "DELETE MY ACCOUNT") {
            return NextResponse.json(
                { error: "Please type 'DELETE MY ACCOUNT' to confirm" },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // If user has a password (credential login), verify it
        if (user.password) {
            if (!password) {
                return NextResponse.json(
                    { error: "Password is required" },
                    { status: 400 }
                );
            }

            const isValid = await compare(password, user.password);
            if (!isValid) {
                return NextResponse.json(
                    { error: "Invalid password" },
                    { status: 400 }
                );
            }
        }

        // Generate deletion token
        const token = crypto.randomUUID();
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

        await prisma.user.update({
            where: { id: user.id },
            data: {
                deleteAccountToken: token,
                deleteAccountTokenExpires: expires,
            },
        });

        // Send confirmation email
        await sendDeleteAccountEmail(user.email, token, user.language as "en" | "tr");

        return NextResponse.json({
            message: user.language === "tr"
                ? "Hesap silme talebi alındı. Lütfen e-postanızı kontrol edin."
                : "Account deletion request received. Please check your email for confirmation.",
        });
    } catch (error) {
        console.error("Delete account error:", error);
        return NextResponse.json(
            { error: "Failed to initiate account deletion" },
            { status: 500 }
        );
    }
}
