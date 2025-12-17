"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Loader2, RefreshCw, MessageSquare } from "lucide-react";
import { toast } from "sonner";


interface Comment {
    id: string;
    content: string;
    orderId: string;
    userId: string;
    createdAt: string;
    user: {
        id: string;
        name: string | null;
        email: string;
        role: "CUSTOMER" | "ADMIN";
    };
}

interface CommentSectionProps {
    orderId: string;
    initialComments: Comment[];
}

export function CommentSection({ orderId, initialComments }: CommentSectionProps) {
    const { data: session } = useSession();
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [newComment, setNewComment] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom when new comments arrive
    useEffect(() => {
        scrollToBottom();
    }, [comments]);

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    };

    const fetchComments = async (showLoading = false) => {
        if (showLoading) setIsRefreshing(true);
        try {
            const response = await fetch(`/api/orders/${orderId}`);
            if (response.ok) {
                const order = await response.json();
                // Check if there are new comments to avoid unnecessary rerenders/scrolls if deep comparison was used (simplified here)
                if (JSON.stringify(order.comments) !== JSON.stringify(comments)) {
                    setComments(order.comments);
                    if (showLoading) toast.success("Mesajlar güncellendi");
                } else if (showLoading) {
                    toast.info("Yeni mesaj yok");
                }
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
            if (showLoading) toast.error("Mesajlar yüklenemedi");
        } finally {
            if (showLoading) setIsRefreshing(false);
        }
    };

    // Auto-refresh every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            fetchComments(false);
        }, 30000);

        return () => clearInterval(interval);
    }, [orderId, comments]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!newComment.trim() || isLoading) return;

        setIsLoading(true);

        try {
            const response = await fetch("/api/comments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    content: newComment,
                    orderId,
                }),
            });

            if (!response.ok) {
                throw new Error("Yorum eklenemedi");
            }

            const comment = await response.json();
            setComments((prev) => [...prev, comment]);
            setNewComment("");
        } catch (error) {
            toast.error("Yorum eklenirken hata oluştu");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const getInitials = (name: string | null, email: string) => {
        if (name) {
            return name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase();
        }
        return email[0].toUpperCase();
    };

    return (
        <div className="flex flex-col h-[600px] border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50">
            {/* Header */}
            <div className="p-4 border-b border-zinc-800 bg-zinc-900/80 flex items-center justify-between backdrop-blur-sm">
                <div className="flex items-center gap-2 text-zinc-100">
                    <MessageSquare className="h-5 w-5 text-violet-400" />
                    <h3 className="font-semibold">Destek & Mesajlar</h3>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-500 hidden sm:inline">
                        Her 30sn'de güncellenir
                    </span>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => fetchComments(true)}
                        disabled={isRefreshing}
                        className="text-zinc-400 hover:text-white"
                        title="Mesajları Yenile"
                    >
                        <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                    </Button>
                </div>
            </div>

            {/* Comments List */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto space-y-6 p-4 bg-zinc-950/30"
            >
                {comments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-zinc-500 space-y-2">
                        <MessageSquare className="h-10 w-10 opacity-20" />
                        <p>Henüz mesaj yok. İlk mesajı siz gönderin!</p>
                    </div>
                ) : (
                    comments.map((comment, index) => {
                        const isOwn = comment.userId === session?.user?.id;
                        const isAdmin = comment.user.role === "ADMIN";

                        // Check if previous comment was from same user to group them visually
                        const isSequence = index > 0 && comments[index - 1].userId === comment.userId;

                        return (
                            <div
                                key={comment.id}
                                className={`flex gap-3 ${isOwn ? "flex-row-reverse" : ""} ${isSequence ? "mt-1" : "mt-4"}`}
                            >
                                {!isSequence ? (
                                    <Avatar
                                        className={`h-8 w-8 mt-1 border border-zinc-800 shadow-sm ${isAdmin
                                            ? "bg-gradient-to-tr from-violet-600 to-fuchsia-600"
                                            : "bg-zinc-800"
                                            }`}
                                    >
                                        <AvatarFallback className="text-xs text-zinc-100 font-medium">
                                            {getInitials(comment.user.name, comment.user.email)}
                                        </AvatarFallback>
                                    </Avatar>
                                ) : (
                                    <div className="w-8" /> // Spacer for alignment
                                )}

                                <div
                                    className={`max-w-[75%] flex flex-col ${isOwn ? "items-end" : "items-start"
                                        }`}
                                >
                                    {!isSequence && (
                                        <div className="flex items-center gap-2 mb-1 px-1">
                                            <span className="text-xs font-medium text-zinc-300">
                                                {comment.user.name || comment.user.email}
                                            </span>
                                            {isAdmin && !isOwn && (
                                                <span className="text-[10px] px-1.5 py-px rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
                                                    Destek Ekibi
                                                </span>
                                            )}
                                            <span className="text-[10px] text-zinc-500">
                                                {new Date(comment.createdAt).toLocaleTimeString("tr-TR", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </span>
                                        </div>
                                    )}
                                    <div
                                        className={`relative rounded-2xl px-4 py-2.5 shadow-sm text-sm leading-relaxed ${isOwn
                                            ? "bg-gradient-to-br from-violet-600 to-fuchsia-700 text-white rounded-tr-sm"
                                            : "bg-zinc-800 text-zinc-100 border border-zinc-700/50 rounded-tl-sm"
                                            }`}
                                    >
                                        <p className="whitespace-pre-wrap break-words">{comment.content}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Input Form */}
            <div className="p-4 bg-zinc-900 border-t border-zinc-800">
                <form onSubmit={handleSubmit} className="flex gap-3 items-end">
                    <div className="flex-1 relative">
                        <Textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Bir mesaj yazın..."
                            className="min-h-[80px] max-h-[160px] bg-zinc-950/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-violet-500/50 focus:ring-violet-500/20 resize-none py-3 pr-10 rounded-xl"
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit(e);
                                }
                            }}
                        />
                        <div className="absolute bottom-2 right-2 text-[10px] text-zinc-500 bg-zinc-900/80 px-1.5 py-0.5 rounded pointer-events-none">
                            Enter gönderir
                        </div>
                    </div>
                    <Button
                        type="submit"
                        size="icon"
                        disabled={isLoading || !newComment.trim()}
                        className="bg-zinc-100 text-zinc-900 hover:bg-zinc-200 hover:text-zinc-950 h-[44px] w-[44px] rounded-xl shrink-0 shadow-sm transition-all active:scale-95 disabled:opacity-50"
                    >
                        {isLoading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            <Send className="h-5 w-5 ml-0.5" />
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
}
