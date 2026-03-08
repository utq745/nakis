import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BlogPostContent } from "@/components/blog/blog-post-content";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;

    const post = await prisma.blogPost.findFirst({
        where: { slug, locale: "tr", status: "PUBLISHED" },
    });

    if (!post) {
        return { title: "Yazı Bulunamadı | Approval Stitch" };
    }

    if (post.locale !== "tr") {
        if (post.translationGroupId) {
            const translation = await prisma.blogPost.findFirst({
                where: { translationGroupId: post.translationGroupId, locale: "tr", status: "PUBLISHED" },
            });
            if (translation) {
                return { title: `Yönlendiriliyor...` };
            }
        }
        return { title: "Yazı Bulunamadı | Approval Stitch" };
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
            canonical: `/tr/blog/${slug}`,
        },
    };
}

export default async function BlogPostPageTR({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const post = await prisma.blogPost.findFirst({
        where: { slug, locale: "tr", status: "PUBLISHED" },
        include: {
            author: { select: { name: true, image: true } },
        },
    });

    if (!post) {
        notFound();
    }

    if (post.locale !== "tr") {
        if (post.translationGroupId) {
            const translation = await prisma.blogPost.findFirst({
                where: { translationGroupId: post.translationGroupId, locale: "tr", status: "PUBLISHED" },
            });
            if (translation) {
                redirect(`/tr/blog/${translation.slug}`);
            }
        }
        redirect("/tr/blog");
    }

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[#f8fafc] dark:bg-[#09090b] font-[family-name:var(--font-inter)] selection:bg-primary selection:text-white">
            <Header forceSolid />
            <main id="main-content" className="flex-grow pt-28 pb-20">
                <BlogPostContent post={JSON.parse(JSON.stringify(post))} locale="tr" />
            </main>
            <Footer />
        </div>
    );
}
