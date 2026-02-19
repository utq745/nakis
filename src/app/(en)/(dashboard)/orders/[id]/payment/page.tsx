import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function PaymentPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const session = await auth();
    if (!session?.user) redirect("/login");

    const { id } = await params;
    const order = await prisma.order.findUnique({
        where: { id },
        select: {
            id: true,
            customerId: true,
        },
    });

    if (!order) redirect("/orders");
    if (order.customerId !== session.user.id) redirect("/orders");
    redirect(`/orders/${id}`);
}
