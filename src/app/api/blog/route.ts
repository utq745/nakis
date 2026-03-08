import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { randomUUID } from "node:crypto";

// GET /api/blog — List blog posts
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const locale = searchParams.get("locale") || "en";
        const status = searchParams.get("status"); // admin can filter by status
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "12");

        const session = await auth();
        const isAdmin = session?.user?.role === "ADMIN";

        const where: any = {
            locale,
            deletedAt: status === "TRASH" ? { not: null } : null,
        };

        // Non-admins can only see published posts
        if (!isAdmin) {
            where.status = "PUBLISHED";
        } else if (status && status !== "ALL" && status !== "TRASH") {
            where.status = status;
        }

        const [posts, total] = await Promise.all([
            prisma.blogPost.findMany({
                where,
                orderBy: { publishedAt: "desc" },
                skip: (page - 1) * limit,
                take: limit,
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    excerpt: true,
                    coverImage: true,
                    status: true,
                    locale: true,
                    publishedAt: true,
                    createdAt: true,
                    author: {
                        select: { name: true },
                    },
                },
            }),
            prisma.blogPost.count({ where }),
        ]);

        return NextResponse.json({
            posts,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        console.error("[BLOG_LIST_ERROR]", error);
        return NextResponse.json(
            { error: "Failed to fetch blog posts" },
            { status: 500 }
        );
    }
}

// POST /api/blog — Create a new blog post (admin only)
export async function POST(request: Request) {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const {
            title,
            slug,
            content,
            excerpt,
            coverImage,
            status,
            locale,
            seoTitle,
            seoDescription,
            translationGroupId,
        } = body;

        if (!title || !slug || !content) {
            return NextResponse.json(
                { error: "Title, slug, and content are required" },
                { status: 400 }
            );
        }

        let finalSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, "-");
        let counter = 1;

        // Loop until a unique slug is found WITHIN THE SAME LOCALE
        while (true) {
            const existing = await prisma.blogPost.findFirst({
                where: { slug: finalSlug, locale: locale || "en" },
            });
            if (!existing) break;

            finalSlug = `${slug.toLowerCase().replace(/[^a-z0-9-]/g, "-")}-${counter}`;
            counter++;
        }

        const post = await prisma.blogPost.create({
            data: {
                title,
                slug: finalSlug,
                content,
                excerpt: excerpt || null,
                coverImage: coverImage || null,
                status: status || "DRAFT",
                locale: locale || "en",
                seoTitle: seoTitle || null,
                seoDescription: seoDescription || null,
                translationGroupId: translationGroupId || randomUUID(),
                publishedAt: status === "PUBLISHED" ? new Date() : null,
                authorId: session.user.id,
            },
        });

        return NextResponse.json({ post }, { status: 201 });
    } catch (error) {
        console.error("[BLOG_CREATE_ERROR]", error);
        return NextResponse.json(
            { error: `Failed to create blog post: ${error instanceof Error ? error.message : String(error)}` },
            { status: 500 }
        );
    }
}
