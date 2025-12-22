import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Providers } from "@/components/providers";
import { OrderDetailClient } from "./order-detail-client";

async function getOrder(id: string, userId: string, isAdmin: boolean) {
    const order = await prisma.order.findUnique({
        where: { id },
        include: {
            customer: {
                select: { id: true, name: true, email: true, role: true },
            },
            files: {
                orderBy: { createdAt: "desc" },
            },
            comments: {
                include: {
                    user: {
                        select: { id: true, name: true, email: true, role: true },
                    },
                    files: {
                        select: { id: true, name: true, size: true },
                    },
                },
                orderBy: { createdAt: "asc" },
            },
            wilcomData: true,
        },
    });

    if (!order) return null;

    // Check access
    if (!isAdmin && order.customerId !== userId) {
        return null;
    }

    // Transform file URLs to secure API format
    const transformedFiles = order.files.map(file => ({
        ...file,
        url: `/api/files/${file.id}`,
    }));

    const transformedComments = order.comments.map(comment => ({
        ...comment,
        files: comment.files?.map(file => ({
            ...file,
            url: `/api/files/${file.id}`,
        })) || [],
    }));

    // Transform wilcom data if exists
    const transformedWilcomData = order.wilcomData ? {
        ...order.wilcomData,
        colors: JSON.parse(order.wilcomData.colors),
        colorSequence: JSON.parse(order.wilcomData.colorSequence),
        createdAt: order.wilcomData.createdAt.toISOString(),
        updatedAt: order.wilcomData.updatedAt.toISOString(),
    } : null;

    return {
        ...order,
        files: transformedFiles,
        comments: transformedComments,
        wilcomData: transformedWilcomData,
    };
}

export default async function OrderDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const session = await auth();
    if (!session?.user) {
        return notFound();
    }

    const { id } = await params;
    const isAdmin = session.user.role === "ADMIN";
    const order = await getOrder(id, session.user.id, isAdmin);

    if (!order) {
        return notFound();
    }

    // Cast status to OrderStatus type and ensure title is never null
    const typedOrder = {
        ...order,
        title: order.title || `Order #${order.id.slice(-6).toUpperCase()}`,
        status: order.status as import("@/types").OrderStatus,
        customer: {
            ...order.customer,
            role: order.customer.role as "ADMIN" | "CUSTOMER"
        },
        comments: order.comments.map((c: typeof order.comments[number]) => ({
            ...c,
            user: {
                ...c.user,
                role: c.user.role as "ADMIN" | "CUSTOMER"
            }
        })),
        wilcomData: order.wilcomData,
    };

    return (
        <Providers>
            <OrderDetailClient order={typedOrder} isAdmin={isAdmin} />
        </Providers>
    );
}
