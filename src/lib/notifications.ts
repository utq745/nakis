import prisma from "@/lib/prisma";

export type NotificationType = "ORDER_UPDATE" | "COMMENT" | "SYSTEM";

interface CreateNotificationParams {
    userId: string;
    title: string;
    message: string;
    type: NotificationType;
    link?: string;
}

export async function createNotification({
    userId,
    title,
    message,
    type,
    link,
}: CreateNotificationParams) {
    try {
        const notification = await prisma.notification.create({
            data: {
                userId,
                title,
                message,
                type,
                link,
            },
        });
        return notification;
    } catch (error) {
        console.error("Error creating notification:", error);
        return null;
    }
}

export async function createSystemNotification(userId: string, title: string, message: string, link?: string) {
    return createNotification({
        userId,
        title,
        message,
        type: "SYSTEM",
        link,
    });
}

export async function createOrderNotification(userId: string, title: string, message: string, link?: string) {
    return createNotification({
        userId,
        title,
        message,
        type: "ORDER_UPDATE",
        link,
    });
}

export async function createCommentNotification(userId: string, title: string, message: string, link?: string) {
    return createNotification({
        userId,
        title,
        message,
        type: "COMMENT",
        link,
    });
}
