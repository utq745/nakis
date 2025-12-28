import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { PaymentForm } from "@/components/orders/payment-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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
            title: true,
            price: true,
            status: true,
            customerId: true,
            serviceType: true,
        },
    });

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { billingAddress: true }
    }) as { billingAddress: string | null } | null;

    if (!order) redirect("/orders");
    if (order.customerId !== session.user.id) redirect("/orders");
    if (order.status !== "PAYMENT_PENDING") redirect(`/orders/${id}`);

    // Check if revision was requested (for Package 1, original price is $25, with revision it's $35+)
    const originalPrice = order.serviceType === "Approval Sample (Existing DST)" ? 25 :
        order.serviceType === "Fix Your DST + Sample" ? 35 : 60;
    const hasRevision = !!(order.serviceType === "Approval Sample (Existing DST)" &&
        order.price && order.price > originalPrice);

    return (
        <div className="container mx-auto py-8 px-4 max-w-5xl">
            <Link
                href={`/orders/${id}`}
                className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Order</span>
            </Link>

            <div className="mb-12">
                <h1 className="text-3xl font-bold text-white mb-2">Checkout</h1>
                <p className="text-zinc-400">Complete your payment to download the final embroidery files.</p>
            </div>

            <PaymentForm
                orderId={order.id}
                orderTitle={order.title || `Order #${order.id.slice(-6).toUpperCase()}`}
                price={order.price || 0}
                locale="en"
                initialBillingAddress={user?.billingAddress || ""}
                serviceType={order.serviceType || undefined}
                hasRevision={hasRevision}
            />
        </div>
    );
}
