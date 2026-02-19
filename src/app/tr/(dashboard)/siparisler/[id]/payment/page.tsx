import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function PaymentPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const session = await auth();
    if (!session?.user) redirect("/tr/giris");

    const { id } = await params;
    const order = await prisma.order.findUnique({
        where: { id },
        select: {
            id: true,
            customerId: true,
        },
    });

    if (!order) redirect("/tr/siparisler");
    if (order.customerId !== session.user.id) redirect("/tr/siparisler");
    redirect(`/tr/siparisler/${id}`);
}
