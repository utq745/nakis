"use client";

import Link from "next/link";
import Image from "next/image";
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
    Home,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/language-provider";
import { useSidebar } from "@/components/providers/sidebar-provider";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";


export function Sidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const { t, language } = useLanguage();
    const { isCollapsed, toggle } = useSidebar();

    const prefix = language === 'tr' ? '/tr' : '';
    const homeUrl = language === 'tr' ? '/tr' : '/';

    const customerNav = [
        {
            title: t.sidebar.dashboard,
            href: language === 'tr' ? '/tr/panel' : '/dashboard',
            icon: LayoutDashboard,
        },
        {
            title: t.sidebar.orders,
            href: language === 'tr' ? '/tr/siparisler' : '/orders',
            icon: Package,
        },
        {
            title: t.sidebar.newOrder,
            href: language === 'tr' ? '/tr/siparisler/new' : '/orders/new',
            icon: Plus,
        },
        {
            title: t.sidebar.settings,
            href: language === 'tr' ? '/tr/ayarlar' : '/settings',
            icon: Settings,
        },
    ];

    const adminNav = [
        {
            title: t.sidebar.dashboard,
            href: language === 'tr' ? '/tr/panel' : '/dashboard',
            icon: LayoutDashboard,
        },
        {
            title: t.sidebar.allOrders,
            href: language === 'tr' ? '/tr/siparisler' : '/orders',
            icon: Package,
        },
        {
            title: t.sidebar.customers,
            href: language === 'tr' ? '/tr/musteriler' : '/customers',
            icon: Users,
        },
        {
            title: t.sidebar.reports,
            href: language === 'tr' ? '/tr/raporlar' : '/reports',
            icon: FileText,
        },
        {
            title: t.sidebar.settings,
            href: language === 'tr' ? '/tr/ayarlar' : '/settings',
            icon: Settings,
        },
    ];

    const navItems = session?.user?.role === "ADMIN" ? adminNav : customerNav;

    return (
        <aside className={cn(
            "h-screen bg-background border-r border-border transition-all duration-300",
            isCollapsed ? "w-16" : "w-64"
        )}>
            <div className="flex h-full flex-col">
                {/* Logo */}
                <div className={cn(
                    "flex h-20 items-center border-b border-border transition-all duration-300 overflow-hidden shrink-0",
                    isCollapsed ? "justify-center px-2" : "px-6"
                )}>
                    {isCollapsed ? (
                        <div className="h-10 w-10 shrink-0 flex items-center justify-center">
                            <Image
                                src="/icon.png"
                                alt="Approval Stitch"
                                width={40}
                                height={40}
                                priority
                                className="h-10 w-10 object-contain dark:hidden"
                            />
                            <Image
                                src="/icon-white.png"
                                alt="Approval Stitch"
                                width={40}
                                height={40}
                                priority
                                className="hidden h-10 w-10 object-contain dark:block"
                            />
                        </div>
                    ) : (
                        <div className="h-[50px] flex items-center">
                            <Image
                                src="/images/approval-stich-logo-w.webp"
                                alt="Approval Stitch"
                                width={160}
                                height={50}
                                priority
                                className="object-contain shrink-0 !h-[50px] w-auto"
                                style={{ height: "50px", maxHeight: "50px" }}
                            />
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <nav className={cn(
                    "flex-1 space-y-1 py-4 transition-all duration-300",
                    isCollapsed ? "px-2" : "px-3"
                )}>
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || pathname === item.href.replace('/tr', '');
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg py-2.5 text-sm font-medium transition-all group relative",
                                    isCollapsed ? "justify-center px-2" : "px-3",
                                    isActive
                                        ? "bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 text-foreground border border-violet-500/30 font-bold"
                                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                                )}
                            >
                                <item.icon className={cn("h-5 w-5 shrink-0 transition-transform group-hover:scale-110", isActive && "text-violet-400")} />
                                {!isCollapsed && item.title}

                                {/* Custom Tooltip */}
                                {isCollapsed && (
                                    <div className="absolute left-full ml-4 px-3 py-2 bg-popover backdrop-blur-md text-foreground text-xs font-semibold rounded-xl opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap z-[100] shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-border flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full bg-violet-500" />
                                        {item.title}
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className={cn(
                    "border-t border-border transition-all duration-300",
                    isCollapsed ? "p-2" : "p-4"
                )}>
                    {/* User Info */}
                    <div className={cn(
                        "rounded-lg bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 transition-all duration-300",
                        isCollapsed ? "p-1.5" : "p-3"
                    )}>
                        {!isCollapsed ? (
                            <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9 border border-violet-500/20 shrink-0">
                                    {session?.user?.image && (
                                        <AvatarImage src={session.user.image} alt={session.user.name || ""} />
                                    )}
                                    <AvatarFallback className="bg-violet-500/10 text-violet-400 text-xs font-bold">
                                        {(session?.user?.name || session?.user?.email || "U")[0].toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="min-w-0">
                                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mb-0.5">
                                        {session?.user?.role === "ADMIN" ? t.sidebar.adminPanel : t.sidebar.customerPanel}
                                    </p>
                                    <p key={session?.user?.name || 'name'} className="text-sm text-foreground font-medium truncate">
                                        {session?.user?.name || session?.user?.email?.split('@')[0]}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-center group relative">
                                <Avatar className="h-9 w-9 border border-violet-500/20 transition-transform group-hover:scale-105">
                                    {session?.user?.image && (
                                        <AvatarImage src={session.user.image} alt={session.user.name || ""} />
                                    )}
                                    <AvatarFallback className="bg-violet-500/10 text-violet-400 text-xs font-bold">
                                        {(session?.user?.name || session?.user?.email || "U")[0].toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="absolute left-full ml-4 px-3 py-2 bg-popover backdrop-blur-md text-foreground text-xs font-semibold rounded-xl opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap z-[100] shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-border flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full bg-violet-500" />
                                    {session?.user?.name || session?.user?.email}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Back to Site Button */}
                    <Link href={homeUrl} className="block mt-4">
                        <Button
                            variant="ghost"
                            className={cn(
                                "relative w-full overflow-hidden transition-all duration-300 group/back",
                                isCollapsed
                                    ? "h-10 w-10 p-0 rounded-xl bg-violet-500/5 hover:bg-violet-500/10 border border-violet-500/10 hover:border-violet-500/30"
                                    : "h-11 px-4 rounded-xl bg-violet-500/5 hover:bg-violet-500/10 border border-violet-500/10 hover:border-violet-500/30 justify-start"
                            )}
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/10 via-transparent to-transparent opacity-0 group-hover/back:opacity-100 transition-opacity" />

                            <div className={cn(
                                "relative flex items-center transition-all duration-300",
                                isCollapsed ? "justify-center w-full" : "gap-3"
                            )}>
                                <div className="p-1.5 rounded-lg bg-violet-500/10 group-hover/back:bg-violet-500/20 transition-colors">
                                    <Home className="h-3.5 w-3.5 text-violet-400 group-hover/back:scale-110 transition-transform" />
                                </div>
                                {!isCollapsed && (
                                    <span className="text-xs font-bold text-violet-400/80 group-hover/back:text-violet-400 tracking-wide uppercase">
                                        {language === 'tr' ? 'Siteye Dön' : 'Back to Site'}
                                    </span>
                                )}
                            </div>

                            {isCollapsed && (
                                <div className="absolute left-full ml-4 px-3 py-2 bg-popover/90 backdrop-blur-md text-foreground text-[10px] font-bold uppercase tracking-widest rounded-xl opacity-0 translate-x-[-10px] group-hover/back:opacity-100 group-hover/back:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap z-[100] shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-border flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
                                    {language === 'tr' ? 'Siteye Dön' : 'Back to Site'}
                                </div>
                            )}
                        </Button>
                    </Link>
                </div>

                {/* Collapse Button */}
                <div className="border-t border-border p-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggle}
                        className="w-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors group relative"
                    >
                        {isCollapsed ? (
                            <>
                                <ChevronRight className="h-4 w-4 transition-transform group-hover:scale-110" />
                                <div className="absolute left-full ml-4 px-3 py-2 bg-popover backdrop-blur-md text-foreground text-xs font-semibold rounded-xl opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap z-[100] shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-border flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full bg-violet-500" />
                                    {language === 'tr' ? 'Genişlet' : 'Expand'}
                                </div>
                            </>
                        ) : (
                            <>
                                <ChevronLeft className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                                <span>{language === 'tr' ? 'Daralt' : 'Collapse'}</span>
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </aside>
    );
}
