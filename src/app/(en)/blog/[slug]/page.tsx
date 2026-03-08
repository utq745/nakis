import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BlogPostContent } from "@/components/blog/blog-post-content";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";

// Generate metadata dynamically
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;

    const post = await prisma.blogPost.findFirst({
        where: { slug, locale: "en", status: "PUBLISHED" },
    });

    if (!post) {
        return { title: "Post Not Found | Approval Stitch" };
    }

    if (post.locale !== "en") {
        if (post.translationGroupId) {
            const translation = await prisma.blogPost.findFirst({
                where: { translationGroupId: post.translationGroupId, locale: "en", status: "PUBLISHED" },
            });
            if (translation) {
                return { title: `Redirecting...` };
            }
        }
        return { title: "Post Not Found | Approval Stitch" };
    }

    return {
        title: post.seoTitle || `${post.title} | Approval Stitch`,
        description: post.seoDescription || post.excerpt || "",
        openGraph: {
            title: post.seoTitle || post.title,
            description: post.seoDescription || post.excerpt || "",
            type: "article",
            publishedTime: post.publishedAt?.toISOString(),
            ...(post.coverImage && {
                images: [{ url: post.coverImage, width: 1200, height: 630 }],
            }),
        },
        alternates: {
            canonical: `/blog/${slug}`,
        },
    };
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const post = await prisma.blogPost.findFirst({
        where: { slug, locale: "en", status: "PUBLISHED" },
        include: {
            author: { select: { name: true, image: true } },
        },
    });

    if (!post) {
        notFound();
    }

    if (post.locale !== "en") {
        if (post.translationGroupId) {
            const translation = await prisma.blogPost.findFirst({
                where: { translationGroupId: post.translationGroupId, locale: "en", status: "PUBLISHED" },
            });
            if (translation) {
                redirect(`/blog/${translation.slug}`);
            }
        }
        redirect("/blog");
    }

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[#f8fafc] dark:bg-[#09090b] font-[family-name:var(--font-inter)] selection:bg-primary selection:text-white">
            <Header forceSolid />
            <main id="main-content" className="flex-grow pt-28 pb-20">
                <BlogPostContent post={JSON.parse(JSON.stringify(post))} locale="en" />
            </main>
            <Footer />
        </div>
    );
}
