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
                select: { id: true, name: true, email: true, role: true, notes: true, image: true },
            },
            files: {
                orderBy: { createdAt: "desc" },
            },
            comments: {
                include: {
                    user: {
                        select: { id: true, name: true, email: true, role: true, image: true },
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

    return order;
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
    const orderData = await getOrder(id, session.user.id, isAdmin);

    if (!orderData) {
        return notFound();
    }

    // Transform file URLs to secure API format and serialize dates
    const transformedFiles = orderData.files.map(file => ({
        ...file,
        url: `/api/files/${file.id}`,
        createdAt: file.createdAt.toISOString(),
    }));

    const transformedComments = orderData.comments.map(comment => ({
        ...comment,
        createdAt: comment.createdAt.toISOString(),
        user: {
            ...comment.user,
            role: comment.user.role as "ADMIN" | "CUSTOMER"
        },
        files: comment.files?.map(file => ({
            ...file,
            url: `/api/files/${file.id}`,
        })) || [],
    }));

    const transformedWilcomData = orderData.wilcomData ? {
        ...orderData.wilcomData,
        colors: JSON.parse(orderData.wilcomData.colors),
        colorSequence: JSON.parse(orderData.wilcomData.colorSequence),
        createdAt: orderData.wilcomData.createdAt.toISOString(),
        updatedAt: orderData.wilcomData.updatedAt.toISOString(),
    } : null;

    const typedOrder = {
        id: orderData.id,
        title: orderData.title || `Order #${orderData.id.slice(-6).toUpperCase()}`,
        description: orderData.description,
        status: orderData.status as any, // Cast later in component if needed
        price: orderData.price,
        customerId: orderData.customerId,
        priority: orderData.priority,
        serviceType: orderData.serviceType,
        estimatedDelivery: orderData.estimatedDelivery ? orderData.estimatedDelivery.toISOString() : null,
        createdAt: orderData.createdAt.toISOString(),
        updatedAt: orderData.updatedAt.toISOString(),
        customer: {
            ...orderData.customer,
            role: orderData.customer.role as "ADMIN" | "CUSTOMER"
        },
        files: transformedFiles,
        comments: transformedComments,
        wilcomData: transformedWilcomData,
    };

    return (
        <Providers>
            <OrderDetailClient order={typedOrder as any} isAdmin={isAdmin} />
        </Providers>
    );
}
