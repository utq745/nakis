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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, Settings, Globe, LayoutDashboard, Package } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import Link from "next/link";

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
        <header className="sticky top-0 z-30 flex h-16 items-center justify-end border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-sm px-6">

            <div className="flex items-center gap-2">
                {/* Language Switcher */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                        >
                            <Globe className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-32 bg-zinc-900 border-zinc-800"
                        align="end"
                    >
                        <DropdownMenuItem
                            className="text-zinc-300 focus:text-white focus:bg-zinc-800 cursor-pointer"
                            onClick={() => setLanguage("tr")}
                        >
                            🇹🇷 Türkçe
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="text-zinc-300 focus:text-white focus:bg-zinc-800 cursor-pointer"
                            onClick={() => setLanguage("en")}
                        >
                            🇺🇸 English
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* User Menu */}
                {mounted ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="relative h-10 w-10 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500"
                            >
                                <Avatar className="h-10 w-10">
                                    <AvatarFallback className="bg-transparent text-white font-medium">
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-56 bg-zinc-900 border-zinc-800"
                            align="end"
                        >
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium text-white">
                                        {session?.user?.name}
                                    </p>
                                    <p className="text-xs text-zinc-400">{session?.user?.email}</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-zinc-800" />
                            <Link href={language === 'tr' ? '/tr/dashboard' : '/dashboard'}>
                                <DropdownMenuItem className="text-zinc-300 focus:text-white focus:bg-zinc-800 cursor-pointer">
                                    <LayoutDashboard className="mr-2 h-4 w-4" />
                                    {t.sidebar.dashboard}
                                </DropdownMenuItem>
                            </Link>
                            <Link href={language === 'tr' ? '/tr/orders' : '/orders'}>
                                <DropdownMenuItem className="text-zinc-300 focus:text-white focus:bg-zinc-800 cursor-pointer">
                                    <Package className="mr-2 h-4 w-4" />
                                    {t.sidebar.orders}
                                </DropdownMenuItem>
                            </Link>
                            <Link href={language === 'tr' ? '/tr/settings' : '/settings'}>
                                <DropdownMenuItem className="text-zinc-300 focus:text-white focus:bg-zinc-800 cursor-pointer">
                                    <Settings className="mr-2 h-4 w-4" />
                                    {t.common.settings}
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuSeparator className="bg-zinc-800" />
                            <DropdownMenuItem
                                className="text-red-400 focus:text-red-300 focus:bg-zinc-800 cursor-pointer"
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
                    >
                        <Avatar className="h-10 w-10">
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
