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
import { LogOut, Settings, LayoutDashboard, Package } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import Link from "next/link";
import { NotificationBell } from "./notification-bell";
import { ThemeToggle } from "../theme-toggle";
import { motion } from "framer-motion";

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
                {/* Language Toggle - Like main site */}
                <button
                    onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
                    className="relative flex items-center w-[64px] h-8 rounded-full p-1 transition-colors duration-300 focus:outline-none bg-accent border border-border"
                    aria-label="Toggle language"
                >
                    {/* The sliding background */}
                    <motion.div
                        className="absolute left-1 h-6 w-7 rounded-full shadow-sm z-0 bg-white"
                        initial={false}
                        animate={{
                            x: language === 'tr' ? 28 : 0,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                        }}
                    />

                    {/* Labels container */}
                    <div className="relative z-10 grid grid-cols-2 w-full h-full items-center">
                        <div className="flex items-center justify-center h-full">
                            <span className={`text-[10px] font-black transition-colors duration-300 ${language === 'en' ? 'text-primary' : 'text-muted-foreground'}`}>EN</span>
                        </div>
                        <div className="flex items-center justify-center h-full">
                            <span className={`text-[10px] font-black transition-colors duration-300 translate-x-[1px] ${language === 'tr' ? 'text-primary' : 'text-muted-foreground'}`}>TR</span>
                        </div>
                    </div>
                </button>

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
                            <Link href={language === 'tr' ? '/tr/panel' : '/dashboard'}>
                                <DropdownMenuItem className="text-muted-foreground focus:text-foreground focus:bg-accent cursor-pointer">
                                    <LayoutDashboard className="mr-2 h-4 w-4" />
                                    {t.sidebar.dashboard}
                                </DropdownMenuItem>
                            </Link>
                            <Link href={language === 'tr' ? '/tr/siparisler' : '/orders'}>
                                <DropdownMenuItem className="text-muted-foreground focus:text-foreground focus:bg-accent cursor-pointer">
                                    <Package className="mr-2 h-4 w-4" />
                                    {t.sidebar.orders}
                                </DropdownMenuItem>
                            </Link>
                            <Link href={language === 'tr' ? '/tr/ayarlar' : '/settings'}>
                                <DropdownMenuItem className="text-muted-foreground focus:text-foreground focus:bg-accent cursor-pointer">
                                    <Settings className="mr-2 h-4 w-4" />
                                    {t.common.settings}
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuSeparator className="bg-border" />
                            <DropdownMenuItem
                                className="text-red-400 dark:text-red-400 focus:text-red-500 dark:focus:text-red-300 focus:bg-accent cursor-pointer"
                                onClick={() => signOut({ callbackUrl: language === 'tr' ? "/tr/giris" : "/login" })}
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
