"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Bell, MessageSquare, Package, Info, Trash2, CheckCircle2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/providers/language-provider";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Notification {
    id: string;
    title: string;
    message: string;
    type: "ORDER_UPDATE" | "COMMENT" | "SYSTEM";
    link?: string;
    read: boolean;
    createdAt: string;
}

// Notification sound effect (base64 encoded short beep)
const playNotificationSound = () => {
    try {
        const audio = new Audio("/notification.mp3");
        audio.volume = 0.5;
        audio.play().catch(() => {
            // Audio play failed (browser policy), silently ignore
        });
    } catch (error) {
        // Audio not supported
    }
};

export function NotificationBell() {
    const { t, language } = useLanguage();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const prevUnreadCountRef = useRef<number>(0);
    const isInitialLoad = useRef(true);
    const isFetchingRef = useRef(false);
    const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const getBilingualText = useCallback((text: string) => {
        if (!text.includes(" | ")) return text;
        const parts = text.split(" | ");
        return language === "tr" ? parts[1].trim() : parts[0].trim();
    }, [language]);

    const fetchNotifications = useCallback(async () => {
        if (isFetchingRef.current) return;
        if (typeof document !== "undefined" && document.hidden) return;

        isFetchingRef.current = true;
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000);
            const res = await fetch("/api/notifications", { signal: controller.signal });
            clearTimeout(timeoutId);
            if (res.ok) {
                const data = await res.json();
                const newUnreadCount = data.unreadCount;

                // Check if there are new notifications (not on initial load)
                if (!isInitialLoad.current && newUnreadCount > prevUnreadCountRef.current) {
                    const newNotifications = data.notifications.filter(
                        (n: Notification) => !n.read
                    );
                    const latestNotification = newNotifications[0];

                    // Play sound
                    playNotificationSound();

                    // Show toast notification
                    if (latestNotification) {
                        toast(getBilingualText(latestNotification.title), {
                            description: getBilingualText(latestNotification.message),
                            duration: 10000,
                            position: "bottom-right",
                            icon: latestNotification.type === "ORDER_UPDATE" ? "📦" :
                                latestNotification.type === "COMMENT" ? "💬" : "ℹ️",
                            action: latestNotification.link ? {
                                label: language === "tr" ? "Görüntüle" : "View",
                                onClick: () => {
                                    window.location.href = language === "tr" && !latestNotification.link.startsWith("/tr")
                                        ? `/tr${latestNotification.link}`
                                        : latestNotification.link;
                                },
                            } : undefined,
                        });
                    }
                }

                prevUnreadCountRef.current = newUnreadCount;
                isInitialLoad.current = false;

                setNotifications(data.notifications);
                setUnreadCount(newUnreadCount);
            }
        } catch (error) {
            // Keep this silent in production-like environments to reduce noisy console logs on transient network issues.
            if (process.env.NODE_ENV === "development") {
                console.error("Failed to fetch notifications:", error);
            }
        } finally {
            setLoading(false);
            isFetchingRef.current = false;
        }
    }, [language]);

    useEffect(() => {
        fetchNotifications();
        // Poll less aggressively to reduce API pressure and timeout cascades.
        pollIntervalRef.current = setInterval(fetchNotifications, 120000);

        const onVisibilityChange = () => {
            if (!document.hidden) {
                fetchNotifications();
            }
        };

        document.addEventListener("visibilitychange", onVisibilityChange);
        return () => {
            if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
            document.removeEventListener("visibilitychange", onVisibilityChange);
        };
    }, [fetchNotifications]);

    const markAsRead = async (id: string) => {
        try {
            const res = await fetch("/api/notifications", {
                method: "PATCH",
                body: JSON.stringify({ id }),
            });
            if (res.ok) {
                setNotifications((prev) =>
                    prev.map((n) => (n.id === id ? { ...n, read: true } : n))
                );
                setUnreadCount((prev) => Math.max(0, prev - 1));
            }
        } catch (error) {
            console.error("Failed to mark as read:", error);
        }
    };

    const markAllRead = async () => {
        try {
            const res = await fetch("/api/notifications", {
                method: "PATCH",
                body: JSON.stringify({ readAll: true }),
            });
            if (res.ok) {
                setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
                setUnreadCount(0);
            }
        } catch (error) {
            console.error("Failed to mark all as read:", error);
        }
    };

    const deleteNotification = async (id: string) => {
        try {
            const res = await fetch("/api/notifications", {
                method: "DELETE",
                body: JSON.stringify({ id }),
            });
            if (res.ok) {
                const deleted = notifications.find(n => n.id === id);
                if (deleted && !deleted.read) {
                    setUnreadCount(prev => Math.max(0, prev - 1));
                }
                setNotifications((prev) => prev.filter((n) => n.id !== id));
            }
        } catch (error) {
            console.error("Failed to delete notification:", error);
        }
    };

    const clearAll = async () => {
        try {
            const res = await fetch("/api/notifications", {
                method: "DELETE",
                body: JSON.stringify({ deleteAll: true }),
            });
            if (res.ok) {
                setNotifications([]);
                setUnreadCount(0);
            }
        } catch (error) {
            console.error("Failed to clear notifications:", error);
        }
    };

    const getIcon = (type: Notification["type"]) => {
        switch (type) {
            case "ORDER_UPDATE":
                return <Package className="h-4 w-4 text-violet-400" />;
            case "COMMENT":
                return <MessageSquare className="h-4 w-4 text-fuchsia-400" />;
            default:
                return <Info className="h-4 w-4 text-blue-400" />;
        }
    };

    const formatTime = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) return t.notifications.now;
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ${t.notifications.ago}`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ${t.notifications.ago}`;
        return date.toLocaleDateString(language === "tr" ? "tr-TR" : "en-US");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    aria-label={unreadCount > 0 ? `${unreadCount} unread notifications` : "Notifications"}
                >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-2 right-2 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-fuchsia-500 border-2 border-background"></span>
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-[420px] bg-popover border-border p-0 overflow-hidden shadow-2xl"
                align="end"
            >
                <div className="p-4 flex items-center justify-between bg-popover/50 backdrop-blur-md border-b border-border">
                    <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
                        {t.notifications.title}
                        {unreadCount > 0 && (
                            <Badge variant="secondary" className="bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20 px-1.5 py-0 text-[10px]">
                                {unreadCount} {t.notifications.unread.toLowerCase()}
                            </Badge>
                        )}
                    </h3>
                    <div className="flex gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent"
                            onClick={(e) => {
                                e.stopPropagation();
                                markAllRead();
                            }}
                            title={t.notifications.markAllRead}
                            aria-label={t.notifications.markAllRead}
                        >
                            <CheckCircle2 className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-red-400 hover:bg-accent"
                            onClick={(e) => {
                                e.stopPropagation();
                                clearAll();
                            }}
                            title={t.notifications.clearAll}
                            aria-label={t.notifications.clearAll}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-accent">
                    <AnimatePresence initial={false}>
                        {notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <motion.div
                                    key={notification.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className={cn(
                                        "group relative flex gap-3 p-4 border-b border-border/50 hover:bg-accent/50 transition-all cursor-pointer",
                                        !notification.read && "bg-violet-500/5"
                                    )}
                                    onClick={() => markAsRead(notification.id)}
                                >
                                    <div className="flex-shrink-0 mt-1">
                                        <div className={cn(
                                            "h-8 w-8 rounded-full flex items-center justify-center bg-accent group-hover:bg-accent/80 transition-colors",
                                            !notification.read && "ring-1 ring-violet-500/50"
                                        )}>
                                            {getIcon(notification.type)}
                                        </div>
                                    </div>
                                    <div className="flex-grow min-w-0 pr-8">
                                        <div className="flex justify-between items-start mb-1">
                                            <p className={cn(
                                                "text-xs font-medium truncate pr-2",
                                                notification.read ? "text-muted-foreground" : "text-foreground"
                                            )}>
                                                {getBilingualText(notification.title)}
                                            </p>
                                            <span className="text-[10px] text-muted-foreground/50 whitespace-nowrap">
                                                {formatTime(notification.createdAt)}
                                            </span>
                                        </div>
                                        <p className={cn(
                                            "text-xs line-clamp-2",
                                            notification.read ? "text-muted-foreground/70" : "text-muted-foreground"
                                        )}>
                                            {getBilingualText(notification.message)}
                                        </p>

                                        {notification.link && (
                                            <Link
                                                href={language === "tr" && !notification.link.startsWith("/tr")
                                                    ? `/tr${notification.link}`
                                                    : notification.link}
                                                className="mt-2 text-[10px] font-medium text-violet-400 hover:text-violet-300 flex items-center gap-1"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    markAsRead(notification.id);
                                                }}
                                            >
                                                {t.notifications.viewOrder} →
                                            </Link>
                                        )}
                                    </div>

                                    <button
                                        className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1.5 text-muted-foreground hover:text-red-400 transition-all"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteNotification(notification.id);
                                        }}
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </button>

                                    {!notification.read && (
                                        <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-violet-500 rounded-full" />
                                    )}
                                </motion.div>
                            ))
                        ) : (
                            <div className="p-10 text-center">
                                <Bell className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-20" />
                                <p className="text-sm text-muted-foreground">
                                    {loading ? t.common.loading : t.notifications.noNotifications}
                                </p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
