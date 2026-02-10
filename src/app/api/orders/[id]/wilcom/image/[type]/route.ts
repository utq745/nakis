import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { readFile } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string; type: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id: orderId, type } = await params;

        // Check order access
        const order = await prisma.order.findUnique({
            where: { id: orderId },
        });

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        const isAdmin = session.user.role === "ADMIN";
        if (!isAdmin && order.customerId !== session.user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        // Determine which image to serve
        let imagePath: string;
        let r2Key: string;

        switch (type) {
            case "design":
                imagePath = join(process.cwd(), "uploads", orderId, "wilcom", `${orderId}_design.png`);
                r2Key = `wilcom/${orderId}/design.png`;
                break;
            case "artwork":
                imagePath = join(process.cwd(), "uploads", orderId, "wilcom", `${orderId}_artwork.png`);
                r2Key = `wilcom/${orderId}/artwork.png`;
                break;
            default:
                return NextResponse.json({ error: "Invalid image type" }, { status: 400 });
        }

        // 1. Try serving from local filesystem first (faster)
        if (existsSync(imagePath)) {
            const imageBuffer = await readFile(imagePath);
            return new NextResponse(imageBuffer, {
                headers: {
                    "Content-Type": "image/png",
                    "Cache-Control": "public, max-age=3600",
                },
            });
        }

        // 2. Fallback to Cloudflare R2
        try {
            const { GetObjectCommand } = await import("@aws-sdk/client-s3");
            const { s3Client, R2_BUCKET_NAME } = await import("@/lib/s3");

            const response = await s3Client.send(new GetObjectCommand({
                Bucket: R2_BUCKET_NAME,
                Key: r2Key,
            }));

            if (!response.Body) {
                return NextResponse.json({ error: "Image not found in R2" }, { status: 404 });
            }

            const arrayBuffer = await response.Body.transformToByteArray();
            return new NextResponse(Buffer.from(arrayBuffer), {
                headers: {
                    "Content-Type": "image/png",
                    "Cache-Control": "public, max-age=3600",
                },
            });
        } catch (r2Error) {
            console.error("[WILCOM_IMAGE_R2_ERROR]", r2Error);
            return NextResponse.json({ error: "Image not found" }, { status: 404 });
        }
    } catch (error) {
        console.error("Error serving image:", error);
        return NextResponse.json(
            { error: "Failed to serve image" },
            { status: 500 }
        );
    }
}
