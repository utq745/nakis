import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function POST(request: Request) {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // Validate file type
        const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: "Only JPEG, PNG, WebP, and GIF images are allowed" },
                { status: 400 }
            );
        }

        // Max 10MB
        if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json(
                { error: "File size must be under 10MB" },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Generate unique filename
        const ext = file.name.split(".").pop() || "jpg";
        const uniqueName = `blog/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;

        // Upload to Cloudflare R2
        const { PutObjectCommand } = await import("@aws-sdk/client-s3");
        const { s3Client, R2_BUCKET_NAME } = await import("@/lib/s3");

        await s3Client.send(new PutObjectCommand({
            Bucket: R2_BUCKET_NAME,
            Key: uniqueName,
            Body: buffer,
            ContentType: file.type,
            // Blog images are public by nature
            ACL: "public-read",
        }));

        // Many R2 setups use a custom domain or the public dev URL
        // If there's a public URL configured in env, we use it. 
        // Otherwise we can use a proxy route or just the R2 key if the frontend knows how to handle it.
        // For now, I'll use a predictable public URL format if R2_PUBLIC_URL exists, 
        // otherwise I'll implement a proxy route similar to files.
        const publicUrl = process.env.NEXT_PUBLIC_R2_URL
            ? `${process.env.NEXT_PUBLIC_R2_URL}/${uniqueName}`
            : `/api/blog/image/${uniqueName}`; // Fallback to proxy if no public URL

        return NextResponse.json({ url: publicUrl }, { status: 201 });
    } catch (error) {
        console.error("[BLOG_UPLOAD_ERROR]", error);
        return NextResponse.json(
            { error: `Failed to upload image: ${error instanceof Error ? error.message : String(error)}` },
            { status: 500 }
        );
    }
}
