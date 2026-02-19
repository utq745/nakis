import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";
import { existsSync } from "fs";
import { processWilcomPdf } from "@/lib/wilcom-parser";
import { PutObjectCommand, DeleteObjectsCommand, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client, R2_BUCKET_NAME } from "@/lib/s3";

async function streamToBuffer(stream: unknown): Promise<Buffer> {
    if (!stream || typeof (stream as AsyncIterable<Uint8Array>)[Symbol.asyncIterator] !== "function") {
        throw new Error("Unsupported stream body");
    }
    const chunks: Uint8Array[] = [];
    for await (const chunk of stream as AsyncIterable<Uint8Array>) {
        chunks.push(chunk instanceof Uint8Array ? chunk : Buffer.from(chunk));
    }
    return Buffer.concat(chunks);
}

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();

        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id: orderId } = await params;
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const uploadsDir = path.join(process.cwd(), "uploads", orderId, "wilcom");
        await fs.mkdir(uploadsDir, { recursive: true });

        const pdfPath = path.join(uploadsDir, "wilcom.pdf");
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await fs.writeFile(pdfPath, buffer);

        // Fetch order to check for user-provided title and get artwork file
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                files: {
                    where: {
                        type: { in: ["original", "preview", "final"] },
                        OR: [
                            { name: { endsWith: ".png" } },
                            { name: { endsWith: ".jpg" } },
                            { name: { endsWith: ".jpeg" } },
                            { name: { endsWith: ".webp" } },
                            { name: { endsWith: ".PNG" } },
                            { name: { endsWith: ".JPG" } },
                            { name: { endsWith: ".JPEG" } },
                            { name: { endsWith: ".WEBP" } },
                        ]
                    },
                    orderBy: {
                        createdAt: "desc" // Use the latest preview
                    },
                    take: 20
                }
            }
        });

        // Prefer admin-provided preview/scan image over original customer artwork.
        const artworkFile =
            order?.files?.find((f) => f.type === "preview") ||
            order?.files?.find((f) => f.type === "final") ||
            order?.files?.find((f) => f.type === "original");
        let artworkPath: string | null = null;
        if (artworkFile) {
            const normalizedName = artworkFile.url.includes("/")
                ? artworkFile.url.split("/").pop() || artworkFile.url
                : artworkFile.url;

            const candidates = [
                path.join(process.cwd(), "uploads", orderId, "preview", normalizedName),
                path.join(process.cwd(), "uploads", orderId, "final", normalizedName),
                path.join(process.cwd(), "uploads", orderId, "original", normalizedName),
                path.join(process.cwd(), "uploads", artworkFile.url),
                path.join(process.cwd(), "public", artworkFile.url),
            ];

            artworkPath = candidates.find((candidate) => existsSync(candidate)) || null;

            // If not found locally, pull from R2 (url field stores key for new uploads)
            if (!artworkPath && artworkFile.url) {
                try {
                    const r2Object = await s3Client.send(new GetObjectCommand({
                        Bucket: R2_BUCKET_NAME,
                        Key: artworkFile.url,
                    }));

                    if (r2Object.Body) {
                        const ext = path.extname(artworkFile.name || "") || ".png";
                        const localArtworkPath = path.join(uploadsDir, `customer_artwork${ext}`);
                        const artworkBuffer = await streamToBuffer(r2Object.Body);
                        await fs.writeFile(localArtworkPath, artworkBuffer);
                        artworkPath = localArtworkPath;
                    }
                } catch (err) {
                    console.error("[WILCOM_ARTWORK_R2_FETCH_ERROR]", err);
                }
            }
        }

        // Process the PDF
        const result = await processWilcomPdf(pdfPath, orderId, uploadsDir, order?.title, artworkPath);

        // Save/Update in database
        const wilcomData = await prisma.wilcomData.upsert({
            where: { orderId: orderId },
            update: {
                designName: result.data.designName,
                title: result.data.title,
                heightMm: result.data.heightMm,
                widthMm: result.data.widthMm,
                stitchCount: result.data.stitchCount,
                colorCount: result.data.colorCount,
                colorway: result.data.colorway,
                machineFormat: result.data.machineFormat,
                machineRuntime: result.data.machineRuntime,
                colorChanges: result.data.colorChanges,
                stops: result.data.stops,
                trims: result.data.trims,
                maxStitchMm: result.data.maxStitchMm,
                minStitchMm: result.data.minStitchMm,
                maxJumpMm: result.data.maxJumpMm,
                totalThreadM: result.data.totalThreadM,
                totalBobbinM: result.data.totalBobbinM,
                colors: JSON.stringify(result.data.colors),
                colorSequence: JSON.stringify(result.data.colorSequence),
                designImageUrl: result.artworkImagePath
                    ? `/api/orders/${orderId}/wilcom/image/artwork`
                    : (result.designImagePath ? `/api/orders/${orderId}/wilcom/image/design` : null),
                customerArtworkUrl: result.artworkImagePath ? `/api/orders/${orderId}/wilcom/image/artwork` : null,
                operatorApprovalPdf: `/api/orders/${orderId}/wilcom/pdf/operator`,
                customerApprovalPdf: `/api/orders/${orderId}/wilcom/pdf/customer`,
                wilcomPdfUrl: `/api/orders/${orderId}/wilcom/pdf/original`,
            },
            create: {
                orderId: orderId,
                designName: result.data.designName,
                title: result.data.title,
                heightMm: result.data.heightMm,
                widthMm: result.data.widthMm,
                stitchCount: result.data.stitchCount,
                colorCount: result.data.colorCount,
                colorway: result.data.colorway,
                machineFormat: result.data.machineFormat,
                machineRuntime: result.data.machineRuntime,
                colorChanges: result.data.colorChanges,
                stops: result.data.stops,
                trims: result.data.trims,
                maxStitchMm: result.data.maxStitchMm,
                minStitchMm: result.data.minStitchMm,
                maxJumpMm: result.data.maxJumpMm,
                totalThreadM: result.data.totalThreadM,
                totalBobbinM: result.data.totalBobbinM,
                colors: JSON.stringify(result.data.colors),
                colorSequence: JSON.stringify(result.data.colorSequence),
                designImageUrl: result.artworkImagePath
                    ? `/api/orders/${orderId}/wilcom/image/artwork`
                    : (result.designImagePath ? `/api/orders/${orderId}/wilcom/image/design` : null),
                customerArtworkUrl: result.artworkImagePath ? `/api/orders/${orderId}/wilcom/image/artwork` : null,
                operatorApprovalPdf: `/api/orders/${orderId}/wilcom/pdf/operator`,
                customerApprovalPdf: `/api/orders/${orderId}/wilcom/pdf/customer`,
                wilcomPdfUrl: `/api/orders/${orderId}/wilcom/pdf/original`,
            },
        });

        // 4. Upload everything to Cloudflare R2 for persistence
        try {
            const filesToUpload = [
                { path: pdfPath, key: `wilcom/${orderId}/wilcom.pdf`, contentType: 'application/pdf' },
                { path: result.operatorPdfPath, key: `wilcom/${orderId}/operator_approval.pdf`, contentType: 'application/pdf' },
                { path: result.customerPdfPath, key: `wilcom/${orderId}/customer_approval.pdf`, contentType: 'application/pdf' }
            ];

            if (result.designImagePath) {
                filesToUpload.push({ path: result.designImagePath, key: `wilcom/${orderId}/design.png`, contentType: 'image/png' });
            }
            if (result.artworkImagePath) {
                filesToUpload.push({ path: result.artworkImagePath, key: `wilcom/${orderId}/artwork.png`, contentType: 'image/png' });
            }

            await Promise.all(filesToUpload.map(async (file) => {
                const fileBuffer = await fs.readFile(file.path);
                return s3Client.send(new PutObjectCommand({
                    Bucket: R2_BUCKET_NAME,
                    Key: file.key,
                    Body: fileBuffer,
                    ContentType: file.contentType,
                }));
            }));
            console.log(`[WILCOM_POST] Successfully uploaded ${filesToUpload.length} files to R2`);
        } catch (r2Error) {
            console.error("[WILCOM_R2_UPLOAD_ERROR]", r2Error);
            // We don't fail the request if R2 upload fails, but we log it
        }

        // Note: Status changes are now handled explicitly via the UI/workflow, not automatically

        return NextResponse.json({ success: true, data: wilcomData });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error("[WILCOM_POST]", error);
        return NextResponse.json(
            { error: `Internal Server Error [v2]: ${message}` },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();

        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id: orderId } = await params;

        // Get wilcom data to find file paths
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                wilcomData: true,
            },
        });

        if (!order || !order.wilcomData) {
            return NextResponse.json({ error: "Wilcom data not found" }, { status: 404 });
        }

        // Check order status - prevent deletion if completed
        if (order.status === "COMPLETED") {
            return NextResponse.json({ error: "Cannot delete files for completed orders" }, { status: 400 });
        }

        // The files are stored in uploads/[orderId]/wilcom/
        const uploadsDir = path.join(process.cwd(), "uploads", orderId, "wilcom");

        try {
            await fs.rm(uploadsDir, { recursive: true, force: true });
        } catch (err) {
            console.error(`Failed to delete directory: ${uploadsDir}`, err);
        }

        // Delete from database
        await prisma.wilcomData.delete({
            where: { id: order.wilcomData.id },
        });

        // Delete from R2
        try {
            const listParams = {
                Bucket: R2_BUCKET_NAME,
                Prefix: `wilcom/${orderId}/`,
            };
            const listedObjects = await s3Client.send(new ListObjectsV2Command(listParams));

            if (listedObjects.Contents && listedObjects.Contents.length > 0) {
                const deleteParams = {
                    Bucket: R2_BUCKET_NAME,
                    Delete: {
                        Objects: listedObjects.Contents.map(({ Key }) => ({ Key })),
                    },
                };
                await s3Client.send(new DeleteObjectsCommand(deleteParams));
                console.log(`[WILCOM_DELETE] Deleted ${listedObjects.Contents.length} files from R2`);
            }
        } catch (r2Error) {
            console.error("[WILCOM_R2_DELETE_ERROR]", r2Error);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[WILCOM_DELETE]", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
