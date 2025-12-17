import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { createServerSupabaseClient } from "@/lib/supabase";

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

        const supabase = createServerSupabaseClient();
        const uploadedFiles = [];

        for (const file of files) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const fileName = `${orderId}/${type}/${Date.now()}-${file.name}`;

            const { data, error } = await supabase.storage
                .from("order-files")
                .upload(fileName, buffer, {
                    contentType: file.type,
                    upsert: false,
                });

            if (error) {
                console.error("Supabase upload error:", error);
                continue;
            }

            const { data: urlData } = supabase.storage
                .from("order-files")
                .getPublicUrl(data.path);

            const dbFile = await prisma.file.create({
                data: {
                    name: file.name,
                    url: urlData.publicUrl,
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
