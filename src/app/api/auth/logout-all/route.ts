import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST() {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Delete all sessions for the current user
        await prisma.$transaction([
            prisma.user.update({
                where: { id: session.user.id },
                data: { sessionVersion: { increment: 1 } },
            }),
            prisma.session.deleteMany({
                where: { userId: session.user.id }
            }),
        ]);

        return NextResponse.json({
            message: "All sessions have been terminated",
        });
    } catch (error) {
        console.error("Logout all sessions error:", error);
        return NextResponse.json(
            { error: "Failed to logout from all devices" },
            { status: 500 }
        );
    }
}
