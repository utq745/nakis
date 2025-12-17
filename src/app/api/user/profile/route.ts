import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";

const profileSchema = z.object({
    name: z.string().min(2, "İsim en az 2 karakter olmalıdır"),
});

export async function PATCH(request: Request) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const validatedData = profileSchema.parse(body);

        const updatedUser = await prisma.user.update({
            where: { id: session.user.id },
            data: { name: validatedData.name },
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
