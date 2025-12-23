import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const token = searchParams.get("token");

        if (!token) {
            return new NextResponse("Token missing", { status: 400 });
        }

        const user = await prisma.user.findFirst({
            where: {
                deleteAccountToken: token,
                deleteAccountTokenExpires: {
                    gt: new Date(),
                },
            },
        });

        if (!user) {
            return new NextResponse("Invalid or expired token", { status: 400 });
        }

        // Perform cascading delete (GDPR)
        await prisma.$transaction(async (tx) => {
            // Delete user's orders (cascades to files, comments, wilcomData)
            await tx.order.deleteMany({
                where: { customerId: user.id },
            });

            // Delete user's comments on other orders
            await tx.comment.deleteMany({
                where: { userId: user.id },
            });

            // Delete user's sessions
            await tx.session.deleteMany({
                where: { userId: user.id },
            });

            // Delete user's accounts (OAuth links)
            await tx.account.deleteMany({
                where: { userId: user.id },
            });

            // Delete user's notifications
            await tx.notification.deleteMany({
                where: { userId: user.id },
            });

            // Finally, delete the user
            await tx.user.delete({
                where: { id: user.id },
            });
        });

        // Redirect to home page with success message
        return NextResponse.redirect(new URL("/?deleted=true", request.url));
    } catch (error) {
        console.error("Confirm delete account error:", error);
        return new NextResponse("Failed to confirm account deletion", { status: 500 });
    }
}
