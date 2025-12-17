"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
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
    const scrollRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom when new comments arrive
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [comments]);

    // Set up real-time subscription using Supabase
    useEffect(() => {
        const channel = supabase
            .channel(`order-${orderId}`)
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "Comment",
                    filter: `orderId=eq.${orderId}`,
                },
                async (payload) => {
                    // Fetch the full comment with user data
                    const response = await fetch(`/api/orders/${orderId}`);
                    if (response.ok) {
                        const order = await response.json();
                        setComments(order.comments);
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [orderId]);

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
        <div className="flex flex-col h-[500px]">
            {/* Comments List */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto space-y-4 p-4 bg-zinc-800/30 rounded-lg"
            >
                {comments.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-zinc-500">
                        Henüz yorum yok. İlk yorumu siz yazın!
                    </div>
                ) : (
                    comments.map((comment) => {
                        const isOwn = comment.userId === session?.user?.id;
                        const isAdmin = comment.user.role === "ADMIN";

                        return (
                            <div
                                key={comment.id}
                                className={`flex gap-3 ${isOwn ? "flex-row-reverse" : ""}`}
                            >
                                <Avatar
                                    className={`h-8 w-8 ${isAdmin
                                            ? "bg-gradient-to-tr from-violet-500 to-fuchsia-500"
                                            : "bg-zinc-700"
                                        }`}
                                >
                                    <AvatarFallback className="text-xs text-white">
                                        {getInitials(comment.user.name, comment.user.email)}
                                    </AvatarFallback>
                                </Avatar>
                                <div
                                    className={`max-w-[70%] ${isOwn ? "items-end" : "items-start"
                                        }`}
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs text-zinc-400">
                                            {comment.user.name || comment.user.email}
                                        </span>
                                        {isAdmin && (
                                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-400">
                                                Admin
                                            </span>
                                        )}
                                        <span className="text-[10px] text-zinc-600">
                                            {new Date(comment.createdAt).toLocaleTimeString("tr-TR", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </span>
                                    </div>
                                    <div
                                        className={`rounded-2xl px-4 py-2 ${isOwn
                                                ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white"
                                                : "bg-zinc-700 text-zinc-100"
                                            }`}
                                    >
                                        <p className="text-sm whitespace-pre-wrap">{comment.content}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
                <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Mesajınızı yazın..."
                    className="min-h-[44px] max-h-[120px] bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-violet-500 resize-none"
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit(e);
                        }
                    }}
                />
                <Button
                    type="submit"
                    size="icon"
                    disabled={isLoading || !newComment.trim()}
                    className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 h-[44px] w-[44px]"
                >
                    {isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        <Send className="h-5 w-5" />
                    )}
                </Button>
            </form>
        </div>
    );
}
