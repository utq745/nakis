"use client";

import { ReactNode } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { SidebarProvider } from "@/components/providers/sidebar-provider";

function DashboardContent({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-background text-foreground flex justify-center">
            {/* Centered container for the entire dashboard */}
            <div className="w-full max-w-[1440px] h-screen overflow-hidden flex">
                <Sidebar />
                {/* Main content area */}
                <div className="flex-1 h-full flex flex-col min-w-0">
                    <Header />
                    <main className="flex-1 overflow-auto p-6">
                        {children}
                    </main>
                </div>
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
