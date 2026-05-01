import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { compare, hash } from "bcryptjs";

const passwordSchema = z.object({
    currentPassword: z.string().min(1, "Mevcut şifre gerekli"),
    newPassword: z
        .string()
        .min(8, "Yeni şifre en az 8 karakter olmalıdır")
        .regex(/[^A-Za-z0-9]/, "Şifre en az bir özel karakter içermeli"),
});

export async function PATCH(request: Request) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const validatedData = passwordSchema.parse(body);

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
        });

        if (!user) {
            return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 });
        }

        // OAuth users don't have a password
        if (!user.password) {
            return NextResponse.json(
                { error: "Sosyal medya ile giriş yapan kullanıcılar şifre değiştiremez" },
                { status: 400 }
            );
        }

        const isPasswordValid = await compare(
            validatedData.currentPassword,
            user.password
        );

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Mevcut şifre yanlış" },
                { status: 400 }
            );
        }

        const hashedPassword = await hash(validatedData.newPassword, 12);

        await prisma.user.update({
            where: { id: session.user.id },
            data: { password: hashedPassword },
        });

        return NextResponse.json({ message: "Şifre güncellendi" });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.issues[0].message },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { error: "Şifre güncellenirken hata oluştu" },
            { status: 500 }
        );
    }
}
