"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Loader2, RefreshCw, MessageSquare, Paperclip, X, FileIcon } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/components/providers/language-provider";


interface Comment {
    id: string;
    content: string;
    orderId: string;
    userId: string;
    createdAt: string;
    isSystem?: boolean;
    attachments?: {
        id: string;
        name: string;
        url: string;
        size: number | null;
    }[];
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
    const { t, language } = useLanguage();
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [newComment, setNewComment] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Translations
    const texts = {
        en: {
            supportMessages: "Messages & Revision Requests",
            refreshEvery: "Refreshes every 30s",
            refreshMessages: "Refresh Messages",
            noMessages: "No messages yet. Send the first message!",
            supportTeam: "Support Team",
            writeMessage: "Write a message...",
            messagesUpdated: "Messages updated",
            noNewMessages: "No new messages",
            failedToLoad: "Failed to load messages",
            failedToSend: "Failed to send message",
            attachFile: "Attach file",
            removeFile: "Remove file",
        },
        tr: {
            supportMessages: "Mesajlar ve Revizyon Talepleri",
            refreshEvery: "Her 30sn'de güncellenir",
            refreshMessages: "Mesajları Yenile",
            noMessages: "Henüz mesaj yok. İlk mesajı siz gönderin!",
            supportTeam: "Destek Ekibi",
            writeMessage: "Bir mesaj yazın...",
            messagesUpdated: "Mesajlar güncellendi",
            noNewMessages: "Yeni mesaj yok",
            failedToLoad: "Mesajlar yüklenemedi",
            failedToSend: "Mesaj gönderilemedi",
            attachFile: "Dosya ekle",
            removeFile: "Dosyayı kaldır",
        }
    };

    const txt = texts[language as keyof typeof texts] || texts.en;

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
                if (JSON.stringify(order.comments) !== JSON.stringify(comments)) {
                    setComments(order.comments);
                    if (showLoading) toast.success(txt.messagesUpdated);
                } else if (showLoading) {
                    toast.info(txt.noNewMessages);
                }
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
            if (showLoading) toast.error(txt.failedToLoad);
        } finally {
            if (showLoading) setIsRefreshing(false);
        }
    };

    // Removed auto-refresh - users can manually refresh with button

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setAttachedFiles(prev => [...prev, ...files]);
        // Reset input so same file can be selected again
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const removeFile = (index: number) => {
        setAttachedFiles(prev => prev.filter((_, i) => i !== index));
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if ((!newComment.trim() && attachedFiles.length === 0) || isLoading) return;

        setIsLoading(true);

        try {
            // First upload files if any
            let uploadedFileIds: string[] = [];

            if (attachedFiles.length > 0) {
                const formData = new FormData();
                attachedFiles.forEach(file => {
                    formData.append("files", file);
                });
                formData.append("orderId", orderId);
                formData.append("type", "comment");

                const uploadResponse = await fetch("/api/files/upload", {
                    method: "POST",
                    body: formData,
                });

                if (!uploadResponse.ok) {
                    throw new Error("File upload failed");
                }

                const uploadResult = await uploadResponse.json();
                uploadedFileIds = uploadResult.files?.map((f: { id: string }) => f.id) || [];
            }

            // Then create comment
            const response = await fetch("/api/comments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    content: newComment || (attachedFiles.length > 0 ? `[${attachedFiles.length} file(s) attached]` : ""),
                    orderId,
                    fileIds: uploadedFileIds,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to add comment");
            }

            const comment = await response.json();
            setComments((prev) => [...prev, comment]);
            setNewComment("");
            setAttachedFiles([]);
        } catch (error) {
            toast.error(txt.failedToSend);
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

    const formatFileSize = (bytes: number | null) => {
        if (!bytes) return "";
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    };

    return (
        <div className="flex flex-col h-[500px] overflow-hidden bg-zinc-900/50">
            {/* Header */}
            <div className="p-4 border-b border-zinc-800 bg-zinc-900/80 flex items-center justify-between backdrop-blur-sm">
                <div className="flex items-center gap-2 text-zinc-100">
                    <MessageSquare className="h-5 w-5 text-violet-400" />
                    <h5 className="font-semibold">{txt.supportMessages}</h5>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => fetchComments(true)}
                        disabled={isRefreshing}
                        className="text-violet-400 hover:text-violet-300 hover:bg-violet-500/10 gap-1.5"
                        title={txt.refreshMessages}
                    >
                        <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                        <span className="hidden sm:inline text-xs">{txt.refreshMessages}</span>
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
                        <p>{txt.noMessages}</p>
                    </div>
                ) : (
                    comments.map((comment, index) => {
                        const isOwn = comment.userId === session?.user?.id;
                        const isAdmin = comment.user.role === "ADMIN";
                        const isSequence = index > 0 && comments[index - 1].userId === comment.userId && !comment.isSystem && !comments[index - 1].isSystem;

                        // System message - display centered with special styling
                        if (comment.isSystem) {
                            // Extract the appropriate language text from bilingual message
                            // Format: "📋 Order Status Changed: In Progress | Sipariş Durumu Değişti: İşleniyor"
                            let displayText = comment.content;
                            if (comment.content.includes(" | ")) {
                                const parts = comment.content.split(" | ");
                                displayText = language === "tr" ? parts[1] : parts[0];
                            }

                            return (
                                <div key={comment.id} className="flex justify-center my-4">
                                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20">
                                        <span className="text-sm text-amber-400">
                                            {displayText}
                                        </span>
                                        <span className="text-[10px] text-amber-500/60">
                                            {new Date(comment.createdAt).toLocaleString(language === "tr" ? "tr-TR" : "en-US", {
                                                month: "short",
                                                day: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </span>
                                    </div>
                                </div>
                            );
                        }

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
                                    <div className="w-8" />
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
                                                    {txt.supportTeam}
                                                </span>
                                            )}
                                            <span className="text-[10px] text-zinc-500">
                                                {new Date(comment.createdAt).toLocaleTimeString(language === "tr" ? "tr-TR" : "en-US", {
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

                                        {/* Attachments */}
                                        {comment.attachments && comment.attachments.length > 0 && (
                                            <div className="mt-2 space-y-1">
                                                {comment.attachments.map((file) => (
                                                    <a
                                                        key={file.id}
                                                        href={file.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${isOwn
                                                            ? "bg-white/10 hover:bg-white/20"
                                                            : "bg-zinc-700/50 hover:bg-zinc-700"
                                                            }`}
                                                    >
                                                        <FileIcon className="h-4 w-4 shrink-0" />
                                                        <span className="text-xs truncate flex-1">{file.name}</span>
                                                        <span className="text-[10px] opacity-70">{formatFileSize(file.size)}</span>
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Input Form */}
            <div className="p-4 bg-zinc-900 border-t border-zinc-800">
                {/* Attached Files Preview */}
                {attachedFiles.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                        {attachedFiles.map((file, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 rounded-lg text-sm text-zinc-300"
                            >
                                <FileIcon className="h-4 w-4 text-violet-400" />
                                <span className="truncate max-w-[150px]">{file.name}</span>
                                <button
                                    type="button"
                                    onClick={() => removeFile(index)}
                                    className="text-zinc-500 hover:text-red-400 transition-colors"
                                    title={txt.removeFile}
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex gap-3 items-end">
                    <div className="flex-1 relative">
                        <Textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder={txt.writeMessage}
                            className="min-h-[80px] max-h-[160px] bg-zinc-950/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-violet-500/50 focus:ring-violet-500/20 resize-none py-3 pr-10 rounded-xl"
                        />
                    </div>

                    {/* Buttons Column: Attachment on top, Send below */}
                    <div className="flex flex-col gap-2">
                        {/* File Attach Button */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            onChange={handleFileSelect}
                            className="hidden"
                            accept=".dst,.dts,image/*,.pdf,.ai,.eps,.svg,.zip,.rar"
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => fileInputRef.current?.click()}
                            className="text-zinc-400 hover:text-violet-400 hover:bg-violet-500/10 h-[38px] w-[38px] rounded-xl shrink-0"
                            title={txt.attachFile}
                        >
                            <Paperclip className="h-5 w-5" />
                        </Button>

                        {/* Send Button */}
                        <Button
                            type="submit"
                            size="icon"
                            disabled={isLoading || (!newComment.trim() && attachedFiles.length === 0)}
                            className="bg-violet-600 text-white hover:bg-violet-500 h-[38px] w-[38px] rounded-xl shrink-0 shadow-sm transition-all active:scale-95 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <Send className="h-5 w-5 ml-0.5" />
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
