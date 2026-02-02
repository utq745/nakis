"use client";

import { ReactNode } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { SidebarProvider } from "@/components/providers/sidebar-provider";

function DashboardContent({ children }: { children: ReactNode }) {
    return (
        <div className="h-screen bg-background text-foreground flex overflow-hidden">
            <Sidebar />
            {/* Main content area */}
            <div className="flex-1 h-full flex flex-col min-w-0">
                <Header />
                <main className="flex-1 overflow-auto">
                    <div className="p-6 max-w-[1440px] mx-auto">
                        {children}
                    </div>
                </main>
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
