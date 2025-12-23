import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";
import { processWilcomPdf } from "@/lib/wilcom-parser";

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

        // Fetch order to check for user-provided title
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            select: { title: true }
        });

        // Process the PDF
        const result = await processWilcomPdf(pdfPath, orderId, uploadsDir, order?.title);

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
                designImageUrl: `/api/orders/${orderId}/wilcom/image/design`,
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
                designImageUrl: `/api/orders/${orderId}/wilcom/image/design`,
                operatorApprovalPdf: `/api/orders/${orderId}/wilcom/pdf/operator`,
                customerApprovalPdf: `/api/orders/${orderId}/wilcom/pdf/customer`,
                wilcomPdfUrl: `/api/orders/${orderId}/wilcom/pdf/original`,
            },
        });

        // Note: Status changes are now handled explicitly via the UI/workflow, not automatically

        return NextResponse.json({ success: true, data: wilcomData });
    } catch (error) {
        console.error("[WILCOM_POST]", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
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

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[WILCOM_DELETE]", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
