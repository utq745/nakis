"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, ArrowRight, User } from "lucide-react";

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    coverImage: string | null;
    publishedAt: string | null;
    createdAt: string;
    author: { name: string | null };
}

export function BlogListContent({ locale }: { locale: string }) {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    const isTR = locale === "tr";

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`/api/blog?locale=${locale}&limit=20`);
                if (res.ok) {
                    const data = await res.json();
                    setPosts(data.posts || []);
                }
            } catch (err) {
                console.error("Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [locale]);

    return (
        <div>
            {/* Hero Section */}
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary mb-6">
                    <span className="material-symbols-outlined text-sm">article</span>
                    Blog
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                    {isTR ? "Blog" : "Blog"}
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    {isTR
                        ? "Nakış dijitalleştirme, üretim ipuçları ve sektörel bilgiler hakkında yazılarımız."
                        : "Articles about embroidery digitizing, production tips, and industry insights."}
                </p>
            </div>

            {/* Posts Grid */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <span className="animate-spin material-symbols-outlined text-3xl text-muted-foreground">progress_activity</span>
                </div>
            ) : posts.length === 0 ? (
                <div className="text-center py-24 text-muted-foreground">
                    <span className="material-symbols-outlined text-6xl mb-4 block opacity-30">article</span>
                    <p className="text-lg font-medium">
                        {isTR ? "Henüz blog yazısı yok" : "No blog posts yet"}
                    </p>
                    <p className="text-sm mt-2">
                        {isTR ? "Yakında yeni yazılar eklenecek." : "New articles coming soon."}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <Link
                            key={post.id}
                            href={`${isTR ? "/tr" : ""}/blog/${post.slug}`}
                            className={`group relative bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 flex flex-col ${index === 0 ? "md:col-span-2 lg:col-span-2" : ""
                                }`}
                        >
                            {/* Cover Image */}
                            <div className={`relative overflow-hidden bg-muted ${index === 0 ? "aspect-[2/1]" : "aspect-video"}`}>
                                {post.coverImage ? (
                                    <img
                                        src={post.coverImage}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
                                        <span className="material-symbols-outlined text-4xl text-primary/30">article</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 p-6 flex flex-col">
                                {/* Meta */}
                                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                                    <span className="flex items-center gap-1" suppressHydrationWarning>
                                        <Calendar className="w-3.5 h-3.5" />
                                        {new Date(post.publishedAt || post.createdAt).toLocaleDateString(
                                            isTR ? "tr-TR" : "en-US",
                                            { day: "numeric", month: "long", year: "numeric" }
                                        )}
                                    </span>
                                    {post.author.name && (
                                        <span className="flex items-center gap-1">
                                            <User className="w-3.5 h-3.5" />
                                            {post.author.name}
                                        </span>
                                    )}
                                </div>

                                {/* Title */}
                                <h2 className={`font-bold text-foreground group-hover:text-primary transition-colors mb-3 line-clamp-2 ${index === 0 ? "text-2xl" : "text-lg"
                                    }`}>
                                    {post.title}
                                </h2>

                                {/* Excerpt */}
                                {post.excerpt && (
                                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                                        {post.excerpt}
                                    </p>
                                )}

                                {/* Read More */}
                                <div className="flex items-center gap-1.5 text-sm font-bold text-primary mt-auto">
                                    <span>{isTR ? "Devamını Oku" : "Read More"}</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
