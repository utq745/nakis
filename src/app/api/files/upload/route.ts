import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function POST(request: Request) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await request.formData();
        const files = formData.getAll("files") as File[];
        const orderId = formData.get("orderId") as string;
        const type = formData.get("type") as string || "original";

        if (!orderId) {
            return NextResponse.json({ error: "Missing orderId in request" }, { status: 400 });
        }
        if (files.length === 0) {
            return NextResponse.json({ error: "No files provided for upload" }, { status: 400 });
        }

        // --- SECURITY VALIDATION ---
        const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
        const ALLOWED_EXTENSIONS = ['dst', 'emb', 'pdf', 'ai', 'eps', 'svg', 'png', 'jpg', 'jpeg', 'pes', 'jef', 'exp', 'vp3', 'hus'];

        for (const file of files) {
            // Check size
            if (file.size > MAX_FILE_SIZE) {
                return NextResponse.json({ error: `File ${file.name} is too large. Max size is 50MB.` }, { status: 400 });
            }

            // Check extension
            const ext = file.name.split('.').pop()?.toLowerCase();
            if (!ext || !ALLOWED_EXTENSIONS.includes(ext)) {
                return NextResponse.json({ error: `File type .${ext} is not allowed.` }, { status: 400 });
            }
        }
        // ---------------------------

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

        // Only admin can upload preview/final files
        if ((type === "preview" || type === "final") && !isAdmin) {
            return NextResponse.json(
                { error: "Only admin can upload this file type" },
                { status: 403 }
            );
        }

        const uploadedFiles = [];

        for (const file of files) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Generate secure filename with UUID
            const uuid = crypto.randomUUID();
            const ext = file.name.split(".").pop() || "";
            const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
            const fileName = `${orderId}/${type}/${uuid}-${safeName}`;

            // Upload to Cloudflare R2 using the new s3Client
            const { PutObjectCommand } = await import("@aws-sdk/client-s3");
            const { s3Client, R2_BUCKET_NAME } = await import("@/lib/s3");

            await s3Client.send(new PutObjectCommand({
                Bucket: R2_BUCKET_NAME,
                Key: fileName,
                Body: buffer,
                ContentType: file.type || "application/octet-stream",
            }));

            // Store API URL path (proxy through our server for auth checks)
            // url in DB will now be the R2 Key (fileName)

            // Check if file with same name and type already exists for versioning
            const existingFile = await prisma.file.findFirst({
                where: {
                    orderId,
                    name: file.name,
                    type,
                },
                orderBy: {
                    version: 'desc'
                }
            });

            const newVersion = existingFile ? existingFile.version + 1 : 1;
            const replacesFileId = existingFile?.id || null;

            const dbFile = await prisma.file.create({
                data: {
                    name: file.name,
                    url: fileName,  // Store the R2 Key
                    type,
                    size: file.size,
                    version: newVersion,
                    replacesFileId: replacesFileId,
                    orderId,
                    uploadedBy: session.user.id,
                },
            });

            uploadedFiles.push({
                ...dbFile,
                url: `/api/files/${dbFile.id}`,  // Always serve via our protected route
            });
        }

        // If final files were uploaded, update order status to COMPLETED
        if (type === "final" && isAdmin) {
            await prisma.order.update({
                where: { id: orderId },
                data: { status: "COMPLETED" }
            });

            // Create system message
            const systemMessageContent = `Order Status Changed: Completed | Sipariş Durumu Değişti: Tamamlandı`;
            await prisma.comment.create({
                data: {
                    content: systemMessageContent,
                    orderId: orderId,
                    userId: session.user.id,
                    isSystem: true,
                },
            });
        }

        return NextResponse.json({ files: uploadedFiles }, { status: 201 });
    } catch (error) {
        console.error("Error uploading files:", error);
        return NextResponse.json(
            { error: "Failed to upload file" },
            { status: 500 }
        );
    }
}
