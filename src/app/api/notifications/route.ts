import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const notifications = await prisma.notification.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: "desc" },
            take: 50,
        });

        const unreadCount = await prisma.notification.count({
            where: {
                userId: session.user.id,
                read: false,
            },
        });

        return NextResponse.json({ notifications, unreadCount });
    } catch (error) {
        console.error("Notifications fetch error:", error);
        return NextResponse.json(
            { error: "Failed to fetch notifications" },
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

        const { id, readAll } = await request.json();

        if (readAll) {
            await prisma.notification.updateMany({
                where: { userId: session.user.id, read: false },
                data: { read: true },
            });
            return NextResponse.json({ success: true });
        }

        if (id) {
            await prisma.notification.update({
                where: { id, userId: session.user.id },
                data: { read: true },
            });
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    } catch (error) {
        console.error("Notification update error:", error);
        return NextResponse.json(
            { error: "Failed to update notification" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id, deleteAll } = await request.json();

        if (deleteAll) {
            await prisma.notification.deleteMany({
                where: { userId: session.user.id }
            });
            return NextResponse.json({ success: true });
        }

        if (id) {
            await prisma.notification.delete({
                where: { id, userId: session.user.id }
            });
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    } catch (error) {
        console.error("Notification delete error:", error);
        return NextResponse.json(
            { error: "Failed to delete notification" },
            { status: 500 }
        );
    }
}
