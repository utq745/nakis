import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { CustomersContent } from "./customers-content";

export default async function CustomersPage() {
    const session = await auth();

    if (!session || session.user?.role !== "ADMIN") {
        redirect("/dashboard");
    }

    const customers = await prisma.user.findMany({
        include: {
            _count: {
                select: { orders: true }
            }
        },
        orderBy: { createdAt: "desc" }
    });

    const serializedCustomers = customers.map((customer: typeof customers[number]) => ({
        ...customer,
        createdAt: customer.createdAt.toISOString()
    }));

    return <CustomersContent customers={serializedCustomers} />;
}
