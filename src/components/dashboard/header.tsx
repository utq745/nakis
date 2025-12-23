"use client";

import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, Settings, Globe, LayoutDashboard, Package, Check } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import Link from "next/link";
import { NotificationBell } from "./notification-bell";
import { ThemeToggle } from "../theme-toggle";

export function Header() {
    const { data: session } = useSession();
    const { language, setLanguage, t } = useLanguage();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const initials = session?.user?.name
        ? session.user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
        : session?.user?.email?.[0].toUpperCase() || "U";

    const dateLocale = language === "tr" ? "tr-TR" : "en-US";

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-end border-b border-border bg-background/80 backdrop-blur-sm px-6">

            <div className="flex items-center gap-2">
                {/* Language Switcher */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-foreground hover:bg-accent"
                            aria-label={language === "tr" ? "Dil Seç" : "Select Language"}
                        >
                            <Globe className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-32 bg-popover border-border"
                        align="end"
                    >
                        {language === 'tr' ? (
                            <>
                                <DropdownMenuItem
                                    className="text-foreground bg-accent cursor-default font-semibold flex items-center justify-between"
                                >
                                    Türkçe <Check className="h-3 w-3" />
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="text-muted-foreground focus:text-foreground focus:bg-accent cursor-pointer"
                                    onClick={() => setLanguage("en")}
                                >
                                    English
                                </DropdownMenuItem>
                            </>
                        ) : (
                            <>
                                <DropdownMenuItem
                                    className="text-foreground bg-accent cursor-default font-semibold flex items-center justify-between"
                                >
                                    English <Check className="h-3 w-3" />
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="text-muted-foreground focus:text-foreground focus:bg-accent cursor-pointer"
                                    onClick={() => setLanguage("tr")}
                                >
                                    Türkçe
                                </DropdownMenuItem>
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>

                <ThemeToggle />

                <NotificationBell />

                {/* User Menu */}
                {mounted ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="relative h-10 w-10 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500"
                                aria-label={language === "tr" ? "Profil Menüsü" : "Profile Menu"}
                            >
                                <Avatar className="h-10 w-10">
                                    {session?.user?.image && (
                                        <AvatarImage src={session.user.image} alt={session.user.name || ""} />
                                    )}
                                    <AvatarFallback className="bg-transparent text-white font-medium">
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-56 bg-popover border-border"
                            align="end"
                        >
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium text-foreground">
                                        {session?.user?.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">{session?.user?.email}</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-border" />
                            <Link href={language === 'tr' ? '/tr/dashboard' : '/dashboard'}>
                                <DropdownMenuItem className="text-muted-foreground focus:text-foreground focus:bg-accent cursor-pointer">
                                    <LayoutDashboard className="mr-2 h-4 w-4" />
                                    {t.sidebar.dashboard}
                                </DropdownMenuItem>
                            </Link>
                            <Link href={language === 'tr' ? '/tr/orders' : '/orders'}>
                                <DropdownMenuItem className="text-muted-foreground focus:text-foreground focus:bg-accent cursor-pointer">
                                    <Package className="mr-2 h-4 w-4" />
                                    {t.sidebar.orders}
                                </DropdownMenuItem>
                            </Link>
                            <Link href={language === 'tr' ? '/tr/settings' : '/settings'}>
                                <DropdownMenuItem className="text-muted-foreground focus:text-foreground focus:bg-accent cursor-pointer">
                                    <Settings className="mr-2 h-4 w-4" />
                                    {t.common.settings}
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuSeparator className="bg-border" />
                            <DropdownMenuItem
                                className="text-red-400 dark:text-red-400 focus:text-red-500 dark:focus:text-red-300 focus:bg-accent cursor-pointer"
                                onClick={() => signOut({ callbackUrl: language === 'tr' ? "/tr/login" : "/login" })}
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                {t.common.logout}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Button
                        variant="ghost"
                        className="relative h-10 w-10 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500"
                        aria-label={language === "tr" ? "Profil Menüsü" : "Profile Menu"}
                    >
                        <Avatar className="h-10 w-10">
                            {session?.user?.image && (
                                <AvatarImage src={session.user.image} alt={session.user.name || ""} />
                            )}
                            <AvatarFallback className="bg-transparent text-white font-medium">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                )}
            </div>
        </header>
    );
}
