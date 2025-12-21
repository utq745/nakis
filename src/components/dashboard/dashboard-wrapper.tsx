"use client";

import { ReactNode } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { SidebarProvider, useSidebar } from "@/components/providers/sidebar-provider";
import { cn } from "@/lib/utils";

function DashboardContent({ children }: { children: ReactNode }) {
    const { isCollapsed } = useSidebar();

    return (
        <div className="h-screen bg-zinc-950 overflow-hidden">
            <Sidebar />
            <div className={cn(
                "h-full flex flex-col transition-all duration-300",
                isCollapsed ? "pl-16" : "pl-64"
            )}>
                <Header />
                <main className="flex-1 overflow-auto p-6">{children}</main>
            </div>
        </div>
    );
}

export function DashboardWrapper({ children }: { children: ReactNode }) {
    return (
        <SidebarProvider>
            <DashboardContent>{children}</DashboardContent>
        </SidebarProvider>
    );
}
