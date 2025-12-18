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

        if (!orderId || files.length === 0) {
            return NextResponse.json(
                { error: "orderId and files are required" },
                { status: 400 }
            );
        }

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

        // Use secure uploads directory (outside public)
        const uploadDir = join(process.cwd(), "uploads", orderId, type);
        await mkdir(uploadDir, { recursive: true });

        for (const file of files) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Generate secure filename with UUID
            const uuid = crypto.randomUUID();
            const ext = file.name.split(".").pop() || "";
            const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
            const fileName = `${uuid}-${safeName}`;
            const filePath = join(uploadDir, fileName);

            await writeFile(filePath, buffer);

            // Store API URL path (not public path)
            const apiUrl = `/api/files`;  // Will be: /api/files/{fileId}

            const dbFile = await prisma.file.create({
                data: {
                    name: file.name,
                    url: fileName,  // Store just filename, URL will be constructed via API
                    type,
                    size: file.size,
                    orderId,
                    uploadedBy: session.user.id,
                },
            });

            uploadedFiles.push({
                ...dbFile,
                url: `/api/files/${dbFile.id}`,  // Return API URL
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
