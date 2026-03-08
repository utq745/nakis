"use client";

import { useState, useEffect, use } from "react";
import { BlogEditor } from "@/components/dashboard/blog-editor";

export default function EditBlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const [post, setPost] = useState<any>(null);
    const [translation, setTranslation] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                // Detect locale from path
                const isTr = window.location.pathname.startsWith("/tr/");
                const localeParam = isTr ? "tr" : "en";

                const res = await fetch(`/api/blog/${slug}?locale=${localeParam}`);
                if (res.ok) {
                    const data = await res.json();
                    setPost(data.post);
                    setTranslation(data.translation);
                }
            } catch (err) {
                console.error("Error fetching post:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [slug]);

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center min-h-[50vh]">
                <span className="animate-spin material-symbols-outlined text-3xl text-muted-foreground">progress_activity</span>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="p-8 text-center text-muted-foreground">
                Post not found
            </div>
        );
    }

    return (
        <div className="p-6 md:p-8">
            <BlogEditor
                mode="edit"
                initialData={{
                    id: post.id,
                    title: post.title,
                    slug: post.slug,
                    content: post.content,
                    excerpt: post.excerpt || "",
                    coverImage: post.coverImage || "",
                    status: post.status,
                    locale: post.locale,
                    seoTitle: post.seoTitle || "",
                    seoDescription: post.seoDescription || "",
                    translationGroupId: post.translationGroupId || "",
                }}
                translation={translation}
            />
        </div>
    );
}
