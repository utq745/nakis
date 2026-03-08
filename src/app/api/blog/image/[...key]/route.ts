import { NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client, R2_BUCKET_NAME } from "@/lib/s3";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ key: string[] }> }
) {
    try {
        const { key } = await params;
        const r2Key = key.join("/");

        // Only allow blog images
        if (!r2Key.startsWith("blog/")) {
            return NextResponse.json({ error: "Access denied" }, { status: 403 });
        }

        const response = await s3Client.send(new GetObjectCommand({
            Bucket: R2_BUCKET_NAME,
            Key: r2Key,
        }));

        if (!response.Body) {
            return NextResponse.json({ error: "Image not found" }, { status: 404 });
        }

        // Determine content type
        const ext = r2Key.split(".").pop()?.toLowerCase();
        const contentTypes: Record<string, string> = {
            png: "image/png",
            jpg: "image/jpeg",
            jpeg: "image/jpeg",
            gif: "image/gif",
            webp: "image/webp",
            svg: "image/svg+xml",
        };
        const contentType = contentTypes[ext || ""] || (response.ContentType as string) || "application/octet-stream";

        // Convert Body to a readable stream for the response
        // Note: In Cloudflare/Vercel/Node 18+, response.Body from AWS SDK v3 is a readable stream or async iterator
        const body = response.Body as any;

        return new NextResponse(body, {
            headers: {
                "Content-Type": contentType,
                "Content-Length": (response.ContentLength || 0).toString(),
                "Cache-Control": "public, max-age=31536000, immutable", // Cache for 1 year
            },
        });
    } catch (error) {
        console.error("Error serving blog image:", error);
        return NextResponse.json(
            { error: "Image not found" },
            { status: 404 }
        );
    }
}
