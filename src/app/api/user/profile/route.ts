import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";

const profileSchema = z.object({
    language: z.enum(["en", "tr"]).optional(),
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
                billingAddress: true,
                image: true,
                pendingEmail: true,
                pendingName: true,
                emailVerificationToken: true
            },
        });

        return NextResponse.json(user);
    } catch (error) {
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

        const updateData: any = {};
        if (validatedData.language) updateData.language = validatedData.language;
        if (validatedData.billingAddress !== undefined) updateData.billingAddress = validatedData.billingAddress;
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
        if (isEmailChanging) {
            updateData.pendingEmail = validatedData.email || currentProfile.pendingEmail || currentProfile.email;
            updateData.pendingName = validatedData.name || currentProfile.name;
            updateData.emailVerificationToken = crypto.randomUUID();
            updateData.emailVerificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

            // TODO: Send verification email to validatedData.email || currentProfile.email
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
