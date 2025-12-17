import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Providers } from "@/components/providers";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { Toaster } from "@/components/ui/sonner";

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
        <Providers>
            <div className="min-h-screen bg-zinc-950">
                <Sidebar />
                <div className="pl-64">
                    <Header />
                    <main className="p-6">{children}</main>
                </div>
                <Toaster richColors position="top-right" />
            </div>
        </Providers>
    );
}
