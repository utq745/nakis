import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
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
                { error: "orderId ve dosyalar gerekli" },
                { status: 400 }
            );
        }

        // Check order access
        const order = await prisma.order.findUnique({
            where: { id: orderId },
        });

        if (!order) {
            return NextResponse.json({ error: "Sipariş bulunamadı" }, { status: 404 });
        }

        const isAdmin = session.user.role === "ADMIN";
        if (!isAdmin && order.customerId !== session.user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        // Only admin can upload preview/final files
        if ((type === "preview" || type === "final") && !isAdmin) {
            return NextResponse.json(
                { error: "Bu dosya türünü sadece admin yükleyebilir" },
                { status: 403 }
            );
        }

        const uploadedFiles = [];

        // Ensure upload directory exists
        const uploadDir = join(process.cwd(), "public", "uploads", orderId, type);
        await mkdir(uploadDir, { recursive: true });

        for (const file of files) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Clean filename to prevent issues
            const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
            const fileName = `${Date.now()}-${safeName}`;
            const filePath = join(uploadDir, fileName);

            await writeFile(filePath, buffer);

            // Public URL path
            const publicUrl = `/uploads/${orderId}/${type}/${fileName}`;

            const dbFile = await prisma.file.create({
                data: {
                    name: file.name,
                    url: publicUrl,
                    type,
                    size: file.size,
                    orderId,
                    uploadedBy: session.user.id,
                },
            });

            uploadedFiles.push(dbFile);
        }

        return NextResponse.json(uploadedFiles, { status: 201 });
    } catch (error) {
        console.error("Error uploading files:", error);
        return NextResponse.json(
            { error: "Dosya yüklenirken hata oluştu" },
            { status: 500 }
        );
    }
}
