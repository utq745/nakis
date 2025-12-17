"use client";

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
import { Bell, LogOut, Settings, User } from "lucide-react";

export function Header() {
    const { data: session } = useSession();

    const initials = session?.user?.name
        ? session.user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
        : session?.user?.email?.[0].toUpperCase() || "U";

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-sm px-6">
            <div>
                <h1 className="text-lg font-medium text-white">Hoş Geldiniz</h1>
                <p className="text-sm text-zinc-400">
                    {new Date().toLocaleDateString("tr-TR", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </p>
            </div>

            <div className="flex items-center gap-4">
                {/* Notifications */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                >
                    <Bell className="h-5 w-5" />
                </Button>

                {/* User Menu */}
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
                        <DropdownMenuItem className="text-zinc-300 focus:text-white focus:bg-zinc-800 cursor-pointer">
                            <User className="mr-2 h-4 w-4" />
                            Profil
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-zinc-300 focus:text-white focus:bg-zinc-800 cursor-pointer">
                            <Settings className="mr-2 h-4 w-4" />
                            Ayarlar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-zinc-800" />
                        <DropdownMenuItem
                            className="text-red-400 focus:text-red-300 focus:bg-zinc-800 cursor-pointer"
                            onClick={() => signOut({ callbackUrl: "/login" })}
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Çıkış Yap
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
