import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { DashboardWrapper } from "@/components/dashboard/dashboard-wrapper";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    return (
        <div suppressHydrationWarning>
            <DashboardWrapper>{children}</DashboardWrapper>
        </div>
    );
}
