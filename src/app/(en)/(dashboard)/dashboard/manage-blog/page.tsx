"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useLanguage } from "@/components/providers/language-provider";
import { Plus, Edit2, Trash2, Eye, Globe, Clock, RotateCcw } from "lucide-react";
import { ActionConfirmDialog } from "@/components/orders/action-confirm-dialog";
import { toast } from "sonner";

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    coverImage: string | null;
    status: string;
    locale: string;
    publishedAt: string | null;
    createdAt: string;
    author: { name: string | null };
}

export default function BlogAdminPage() {
    const { data: session } = useSession();
    const { language } = useLanguage();
    const router = useRouter();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>("ALL");
    const [deleting, setDeleting] = useState<BlogPost | null>(null);
    const [restoring, setRestoring] = useState<string | null>(null);
    const [isTrashDialogOpen, setIsTrashDialogOpen] = useState(false);
    const [isPermanentDeleteOpen, setIsPermanentDeleteOpen] = useState(false);

    const isAdmin = session?.user?.role === "ADMIN";

    useEffect(() => {
        if (!isAdmin) return;
        fetchPosts();
    }, [isAdmin, filter]);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (filter !== "ALL") params.set("status", filter);
            params.set("limit", "50");

            // Fetch both locales for admin
            const [enRes, trRes] = await Promise.all([
                fetch(`/api/blog?locale=en&${params}`),
                fetch(`/api/blog?locale=tr&${params}`),
            ]);

            const enData = await enRes.json();
            const trData = await trRes.json();

            setPosts([...(enData.posts || []), ...(trData.posts || [])].sort(
                (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            ));
        } catch (err) {
            console.error("Error fetching posts:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!deleting) return;
        const targetPost = deleting;
        try {
            const res = await fetch(`/api/blog/${targetPost.slug}?locale=${targetPost.locale}`, { method: "DELETE" });
            if (res.ok) {
                const data = await res.json();
                toast.success(data.message || (language === "tr" ? "Yazı silindi" : "Post deleted"));
                setPosts(posts.filter((p) => p.id !== targetPost.id));
            } else {
                toast.error(language === "tr" ? "Silme işlemi başarısız" : "Delete failed");
            }
        } catch (err) {
            console.error("Error deleting post:", err);
            toast.error(language === "tr" ? "Bir hata oluştu" : "An error occurred");
        } finally {
            setDeleting(null);
            setIsTrashDialogOpen(false);
            setIsPermanentDeleteOpen(false);
        }
    };

    const handleRestore = async (post: BlogPost) => {
        setRestoring(post.id);
        try {
            const res = await fetch(`/api/blog/${post.slug}?locale=${post.locale}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ restore: true }),
            });
            if (res.ok) {
                toast.success(language === "tr" ? "Yazı geri yüklendi" : "Post restored");
                setPosts(posts.filter((p) => p.id !== post.id));
            } else {
                toast.error(language === "tr" ? "Geri yükleme başarısız" : "Restore failed");
            }
        } catch (err) {
            console.error("Error restoring post:", err);
            toast.error(language === "tr" ? "Bir hata oluştu" : "An error occurred");
        } finally {
            setRestoring(null);
        }
    };

    if (!isAdmin) {
        return (
            <div className="p-8 text-center text-muted-foreground">
                {language === "tr" ? "Bu sayfaya erişim yetkiniz yok." : "You do not have access to this page."}
            </div>
        );
    }

    const newPostUrl = language === "tr" ? "/tr/panel/manage-blog/new" : "/dashboard/manage-blog/new";

    return (
        <div className="p-6 md:p-8 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">
                        {language === "tr" ? "Blog Yönetimi" : "Blog Management"}
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        {language === "tr" ? `${posts.length} yazı` : `${posts.length} posts`}
                    </p>
                </div>
                <Link
                    href={newPostUrl}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-md"
                >
                    <Plus className="w-4 h-4" />
                    {language === "tr" ? "Yeni Yazı" : "New Post"}
                </Link>
            </div>

            {/* Filters */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
                {["ALL", "PUBLISHED", "DRAFT", "TRASH"].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${filter === f
                            ? "bg-primary text-white"
                            : "bg-muted text-muted-foreground hover:bg-accent"
                            }`}
                    >
                        {f === "ALL"
                            ? language === "tr" ? "Tümü" : "All"
                            : f === "PUBLISHED"
                                ? language === "tr" ? "Yayında" : "Published"
                                : f === "DRAFT"
                                    ? language === "tr" ? "Taslak" : "Draft"
                                    : language === "tr" ? "Çöp" : "Trash"}
                    </button>
                ))}
            </div>

            {/* Posts Table */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <span className="animate-spin material-symbols-outlined text-3xl text-muted-foreground">progress_activity</span>
                </div>
            ) : posts.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground">
                    <span className="material-symbols-outlined text-5xl mb-4 block opacity-40">article</span>
                    <p className="text-lg font-medium">
                        {language === "tr" ? "Henüz blog yazısı yok" : "No blog posts yet"}
                    </p>
                    <p className="text-sm mt-1">
                        {language === "tr" ? "İlk yazınızı oluşturmaya başlayın" : "Start by creating your first post"}
                    </p>
                </div>
            ) : (
                <div className="rounded-xl border border-border overflow-hidden bg-card">
                    <table className="w-full">
                        <thead>
                            <tr className="text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border bg-muted/50">
                                <th className="text-left px-5 py-3">{language === "tr" ? "Başlık" : "Title"}</th>
                                <th className="text-left px-5 py-3 hidden md:table-cell">{language === "tr" ? "Dil" : "Locale"}</th>
                                <th className="text-left px-5 py-3">{language === "tr" ? "Durum" : "Status"}</th>
                                <th className="text-left px-5 py-3 hidden md:table-cell">{language === "tr" ? "Tarih" : "Date"}</th>
                                <th className="text-right px-5 py-3">{language === "tr" ? "İşlemler" : "Actions"}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {posts.map((post) => (
                                <tr key={post.id} className="hover:bg-muted/30 transition-colors">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            {post.coverImage && (
                                                <img
                                                    src={post.coverImage}
                                                    alt=""
                                                    className="w-10 h-10 rounded-lg object-cover shrink-0 border border-border"
                                                />
                                            )}
                                            <div>
                                                <p className="font-semibold text-sm text-foreground line-clamp-1">{post.title}</p>
                                                <p className="text-xs text-muted-foreground">/{post.slug}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 hidden md:table-cell">
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-xs font-bold text-muted-foreground">
                                            <Globe className="w-3 h-3" />
                                            {post.locale.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span
                                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${post.status === "PUBLISHED"
                                                ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                                                : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                                                }`}
                                        >
                                            {post.status === "PUBLISHED" ? (
                                                <Eye className="w-3 h-3" />
                                            ) : (
                                                <Clock className="w-3 h-3" />
                                            )}
                                            {post.status === "PUBLISHED"
                                                ? language === "tr" ? "Yayında" : "Published"
                                                : language === "tr" ? "Taslak" : "Draft"}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-xs text-muted-foreground hidden md:table-cell" suppressHydrationWarning>
                                        {new Date(post.publishedAt || post.createdAt).toLocaleDateString(
                                            language === "tr" ? "tr-TR" : "en-US",
                                            { day: "numeric", month: "short", year: "numeric" }
                                        )}
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center justify-end gap-1">
                                            {filter === "TRASH" ? (
                                                <button
                                                    onClick={() => handleRestore(post)}
                                                    disabled={restoring === post.id}
                                                    className="p-2 rounded-lg text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors disabled:opacity-50"
                                                    title="Restore"
                                                >
                                                    <RotateCcw className="w-4 h-4" />
                                                </button>
                                            ) : (
                                                <Link
                                                    href={`${language === "tr" ? "/tr/panel" : "/dashboard"}/manage-blog/${post.slug}/edit`}
                                                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Link>
                                            )}
                                            <a
                                                href={`${post.locale === "tr" ? "/tr" : ""}/blog/${post.slug}`}
                                                target="_blank"
                                                rel="noopener"
                                                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                                                title="View"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </a>
                                            <button
                                                onClick={() => {
                                                    setDeleting(post);
                                                    if (filter === "TRASH") setIsPermanentDeleteOpen(true);
                                                    else setIsTrashDialogOpen(true);
                                                }}
                                                className="p-2 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Soft Delete Dialog */}
            <ActionConfirmDialog
                isOpen={isTrashDialogOpen}
                onOpenChange={setIsTrashDialogOpen}
                onConfirm={handleDelete}
                title={language === "tr" ? "Yazıyı Çöpe At" : "Move to Trash"}
                description={language === "tr" ? "Bu yazı çöp kutusuna taşınacak. İstediğiniz zaman geri alabilirsiniz." : "This post will be moved to trash. You can restore it anytime."}
                confirmText={language === "tr" ? "Çöpe At" : "Move to Trash"}
                variant="destructive"
            />

            {/* Permanent Delete Dialog */}
            <ActionConfirmDialog
                isOpen={isPermanentDeleteOpen}
                onOpenChange={setIsPermanentDeleteOpen}
                onConfirm={handleDelete}
                title={language === "tr" ? "Kalıcı Olarak Sil" : "Delete Permanently"}
                description={language === "tr" ? "Bu işlem geri alınamaz. Yazı tamamen silinecektir." : "This action cannot be undone. The post will be permanently deleted."}
                confirmText={language === "tr" ? "Kalıcı Olarak Sil" : "Delete Permanently"}
                variant="destructive"
            />
        </div>
    );
}
