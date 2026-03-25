import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { z } from "zod";

const profileSchema = z.object({
    language: z.enum(["en", "tr"]).optional(),
    timezone: z.string().optional(),
    timeFormat: z.enum(["12", "24"]).optional(),
    billingAddress: z.string().optional(),
    image: z.string().optional(),
    name: z.string().optional(),
    email: z.string().email("Geçerli bir e-posta adresi girin").optional(),
});

export async function GET() {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                language: true,
                timezone: true,
                timeFormat: true,
                billingAddress: true,
                image: true,
                pendingEmail: true,
                pendingName: true,
                emailVerificationToken: true
            },
        });

        return NextResponse.json(user);
    } catch {
        return NextResponse.json(
            { error: "Failed to fetch profile" },
            { status: 500 }
        );
    }
}

export async function PATCH(request: Request) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const validatedData = profileSchema.parse(body);

        const currentProfile = await prisma.user.findUnique({
            where: { id: session.user.id }
        });

        if (!currentProfile) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const updateData: Prisma.UserUpdateInput = {};
        if (validatedData.language) updateData.language = validatedData.language;
        if (validatedData.timezone !== undefined) {
            try {
                Intl.DateTimeFormat("en-US", { timeZone: validatedData.timezone });
                updateData.timezone = validatedData.timezone;
            } catch {
                return NextResponse.json(
                    { error: "Geçersiz saat dilimi" },
                    { status: 400 }
                );
            }
        }
        if (validatedData.billingAddress !== undefined) updateData.billingAddress = validatedData.billingAddress;
        if (validatedData.timeFormat !== undefined) updateData.timeFormat = validatedData.timeFormat;
        if (validatedData.image !== undefined) updateData.image = validatedData.image;

        // Check if name or email is changing
        const isNameChanging = validatedData.name && validatedData.name !== currentProfile.name;
        const isEmailChanging = validatedData.email && validatedData.email !== (currentProfile.pendingEmail || currentProfile.email);

        if (isEmailChanging && validatedData.email) {
            const existingUser = await prisma.user.findUnique({
                where: { email: validatedData.email }
            });
            if (existingUser && existingUser.id !== session.user.id) {
                return NextResponse.json(
                    { error: "Bu e-posta adresi zaten kullanımda" },
                    { status: 400 }
                );
            }
        }

        // Name changes are applied directly
        if (isNameChanging && validatedData.name) {
            updateData.name = validatedData.name;
        }

        // Email changes require verification
        if (isEmailChanging && validatedData.email) {
            updateData.pendingEmail = validatedData.email;
            updateData.pendingName = validatedData.name || currentProfile.name;
            const verificationToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            updateData.emailVerificationToken = verificationToken;
            updateData.emailVerificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

            import("@/lib/mail").then(({ sendVerificationEmail }) => {
                const nameToSend = (validatedData.name || currentProfile.name || "User") as string;
                sendVerificationEmail(
                    validatedData.email!,
                    nameToSend,
                    verificationToken,
                    (validatedData.language || currentProfile.language || "en") as "en" | "tr"
                ).catch((err) => console.error("Verification email failed:", err));
            });
        }

        const updatedUser = await prisma.user.update({
            where: { id: session.user.id },
            data: updateData,
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.issues[0].message },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { error: "Profil güncellenirken hata oluştu" },
            { status: 500 }
        );
    }
}
