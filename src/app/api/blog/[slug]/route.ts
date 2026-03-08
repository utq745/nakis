import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { randomUUID } from "node:crypto";

// GET /api/blog/[slug] — Get a single blog post
export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;

        const session = await auth();
        const isAdmin = session?.user?.role === "ADMIN";

        const { searchParams } = new URL(request.url);
        const locale = searchParams.get("locale");

        const post = await prisma.blogPost.findFirst({
            where: {
                slug,
                ...(locale && { locale }),
                ...(!isAdmin && { deletedAt: null })
            },
            include: {
                author: {
                    select: { name: true, image: true },
                },
            },
            orderBy: { createdAt: "desc" }
        });

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        // Non-admins can only see published posts
        if (!isAdmin && post.status !== "PUBLISHED") {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        // If admin, find the translated post
        let translation = null;
        if (isAdmin && post.translationGroupId) {
            translation = await prisma.blogPost.findFirst({
                where: {
                    translationGroupId: post.translationGroupId,
                    id: { not: post.id },
                },
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    locale: true,
                },
            });
        }

        return NextResponse.json({ post, translation });
    } catch (error) {
        console.error("[BLOG_GET_ERROR]", error);
        return NextResponse.json(
            { error: "Failed to fetch blog post" },
            { status: 500 }
        );
    }
}

// PUT /api/blog/[slug] — Update a blog post (admin only)
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { slug } = await params;
        const body = await request.json();
        const {
            title,
            slug: newSlug,
            content,
            excerpt,
            coverImage,
            status,
            locale,
            seoTitle,
            seoDescription,
            translationGroupId,
        } = body;

        const { searchParams } = new URL(request.url);
        const queryLocale = searchParams.get("locale");

        const existingPost = await prisma.blogPost.findFirst({
            where: {
                slug,
                ...(queryLocale && { locale: queryLocale })
            },
        });

        if (!existingPost) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        // If slug is being changed, check uniqueness with counter
        let finalSlug = slug;
        const normalizedNewSlug = newSlug ? newSlug.toLowerCase().replace(/[^a-z0-9-]/g, "-") : undefined;

        if (normalizedNewSlug && normalizedNewSlug !== slug) {
            finalSlug = normalizedNewSlug;
            let counter = 1;

            while (true) {
                const slugExists = await prisma.blogPost.findFirst({
                    where: { slug: finalSlug, locale: locale || existingPost.locale },
                });
                if (!slugExists) break;

                finalSlug = `${normalizedNewSlug}-${counter}`;
                counter++;
            }
        }

        // Handle publishedAt logic
        let publishedAt = existingPost.publishedAt;
        if (status === "PUBLISHED" && !existingPost.publishedAt) {
            publishedAt = new Date();
        } else if (status === "DRAFT") {
            publishedAt = null;
        }

        const post = await prisma.blogPost.update({
            where: { id: existingPost.id },
            data: {
                ...(title !== undefined && { title }),
                slug: finalSlug,
                ...(content !== undefined && { content }),
                ...(excerpt !== undefined && { excerpt: excerpt || null }),
                ...(coverImage !== undefined && { coverImage: coverImage || null }),
                ...(status !== undefined && { status }),
                ...(locale !== undefined && { locale }),
                ...(seoTitle !== undefined && { seoTitle: seoTitle || null }),
                ...(seoDescription !== undefined && { seoDescription: seoDescription || null }),
                translationGroupId: translationGroupId || existingPost.translationGroupId || randomUUID(),
                publishedAt,
                // If explicitly restoring
                ...(body.restore && { deletedAt: null }),
            },
        });

        return NextResponse.json({ post });
    } catch (error) {
        console.error("[BLOG_UPDATE_ERROR]", error);
        return NextResponse.json(
            { error: "Failed to update blog post" },
            { status: 500 }
        );
    }
}

// DELETE /api/blog/[slug] — Delete a blog post (admin only)
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { slug } = await params;

        const { searchParams } = new URL(request.url);
        const locale = searchParams.get("locale");

        const post = await prisma.blogPost.findFirst({
            where: {
                slug,
                ...(locale && { locale })
            },
        });

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        if (post.deletedAt) {
            // Permanently delete if already in trash
            await prisma.blogPost.delete({
                where: { id: post.id },
            });
            return NextResponse.json({ message: "Post permanently deleted" });
        } else {
            // Soft delete
            await prisma.blogPost.update({
                where: { id: post.id },
                data: { deletedAt: new Date(), status: "DRAFT" },
            });
            return NextResponse.json({ message: "Post moved to trash" });
        }
    } catch (error) {
        console.error("[BLOG_DELETE_ERROR]", error);
        return NextResponse.json(
            { error: "Failed to delete blog post" },
            { status: 500 }
        );
    }
}
