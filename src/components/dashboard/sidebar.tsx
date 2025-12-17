"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Package,
    Plus,
    Settings,
    Users,
    FileText,
    Sparkles,
} from "lucide-react";

const customerNav = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Siparişlerim",
        href: "/orders",
        icon: Package,
    },
    {
        title: "Yeni Sipariş",
        href: "/orders/new",
        icon: Plus,
    },
];

const adminNav = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Tüm Siparişler",
        href: "/orders",
        icon: Package,
    },
    {
        title: "Müşteriler",
        href: "/customers",
        icon: Users,
    },
    {
        title: "Raporlar",
        href: "/reports",
        icon: FileText,
    },
    {
        title: "Ayarlar",
        href: "/settings",
        icon: Settings,
    },
];

export function Sidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();

    const navItems = session?.user?.role === "ADMIN" ? adminNav : customerNav;

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-zinc-900 border-r border-zinc-800">
            <div className="flex h-full flex-col">
                {/* Logo */}
                <div className="flex h-16 items-center gap-2 border-b border-zinc-800 px-6">
                    <div className="p-2 rounded-lg bg-gradient-to-tr from-violet-500 to-fuchsia-500">
                        <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-lg font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                        Nakış Digitizing
                    </span>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 px-3 py-4">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                                    isActive
                                        ? "bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 text-white border border-violet-500/30"
                                        : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                                )}
                            >
                                <item.icon className={cn("h-5 w-5", isActive && "text-violet-400")} />
                                {item.title}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="border-t border-zinc-800 p-4">
                    <div className="rounded-lg bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 p-4 border border-violet-500/20">
                        <p className="text-xs text-zinc-400 mb-2">
                            {session?.user?.role === "ADMIN" ? "Admin Paneli" : "Müşteri Paneli"}
                        </p>
                        <p className="text-sm text-white truncate">
                            {session?.user?.name || session?.user?.email}
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
