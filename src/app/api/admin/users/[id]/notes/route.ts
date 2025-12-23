import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";

const notesSchema = z.object({
    notes: z.string().nullable(),
});

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();
        const { notes } = notesSchema.parse(body);

        const user = await prisma.user.update({
            where: { id },
            data: { notes },
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error("Error updating user notes:", error);
        return NextResponse.json(
            { error: "Failed to update user notes" },
            { status: 500 }
        );
    }
}
