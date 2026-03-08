"use client";

import Link from "next/link";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";

interface BlogPostContentProps {
    post: {
        id: string;
        title: string;
        slug: string;
        content: string;
        excerpt: string | null;
        coverImage: string | null;
        publishedAt: string | null;
        createdAt: string;
        seoTitle: string | null;
        seoDescription: string | null;
        author: { name: string | null; image: string | null };
    };
    locale: string;
}

export function BlogPostContent({ post, locale }: BlogPostContentProps) {
    const isTR = locale === "tr";

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({ title: post.title, url });
            } catch { }
        } else {
            await navigator.clipboard.writeText(url);
            alert(isTR ? "Bağlantı kopyalandı!" : "Link copied!");
        }
    };

    return (
        <article className="max-w-4xl mx-auto px-4 md:px-6">
            {/* Back link */}
            <Link
                href={`${isTR ? "/tr" : ""}/blog`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
            >
                <ArrowLeft className="w-4 h-4" />
                {isTR ? "Blog'a Dön" : "Back to Blog"}
            </Link>

            {/* Header */}
            <header className="mb-10">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
                    {post.title}
                </h1>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
                    <span className="flex items-center gap-1.5" suppressHydrationWarning>
                        <Calendar className="w-4 h-4" />
                        {new Date(post.publishedAt || post.createdAt).toLocaleDateString(
                            isTR ? "tr-TR" : "en-US",
                            { day: "numeric", month: "long", year: "numeric" }
                        )}
                    </span>
                    {post.author.name && (
                        <span className="flex items-center gap-1.5">
                            <User className="w-4 h-4" />
                            {post.author.name}
                        </span>
                    )}
                    <button
                        onClick={handleShare}
                        className="flex items-center gap-1.5 hover:text-primary transition-colors ml-auto"
                    >
                        <Share2 className="w-4 h-4" />
                        {isTR ? "Paylaş" : "Share"}
                    </button>
                </div>

                {/* Cover Image */}
                {post.coverImage && (
                    <div className="aspect-[2/1] rounded-2xl overflow-hidden bg-muted border border-border shadow-lg">
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
            </header>

            {/* Content */}
            <div
                className="prose prose-lg dark:prose-invert max-w-none
                    prose-headings:font-bold prose-headings:text-foreground
                    prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                    prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                    prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:mb-5
                    prose-a:text-primary prose-a:font-semibold hover:prose-a:underline
                    prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:rounded-r-xl
                    prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8
                    prose-ul:space-y-1 prose-ol:space-y-1
                    prose-li:text-foreground/80
                    prose-strong:text-foreground
                    prose-hr:border-border prose-hr:my-10"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-border">
                <div className="flex items-center justify-between">
                    <Link
                        href={`${isTR ? "/tr" : ""}/blog`}
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {isTR ? "Tüm Yazılar" : "All Posts"}
                    </Link>
                    <button
                        onClick={handleShare}
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
                    >
                        <Share2 className="w-4 h-4" />
                        {isTR ? "Paylaş" : "Share"}
                    </button>
                </div>
            </div>
        </article>
    );
}
