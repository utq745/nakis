import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

// Dynamic import to avoid build-time evaluation

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id: orderId } = await params;

        // Check if order exists
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: { wilcomData: true },
        });

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        // Get the uploaded file
        const formData = await request.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            );
        }

        // Validate file type
        if (!file.name.endsWith(".pdf")) {
            return NextResponse.json(
                { error: "Only PDF files are accepted" },
                { status: 400 }
            );
        }

        // Create directory for order files
        const uploadDir = join(process.cwd(), "uploads", orderId, "wilcom");
        await mkdir(uploadDir, { recursive: true });

        // Save the uploaded PDF
        const wilcomPdfPath = join(uploadDir, "wilcom.pdf");
        const bytes = await file.arrayBuffer();
        await writeFile(wilcomPdfPath, Buffer.from(bytes));

        // Process the Wilcom PDF (dynamic import to avoid build-time issues)
        const { processWilcomPdf } = await import("@/lib/wilcom-parser");
        const result = await processWilcomPdf(
            wilcomPdfPath,
            orderId,
            uploadDir
        );

        // Create or update WilcomData in database
        const wilcomData = await prisma.wilcomData.upsert({
            where: { orderId },
            create: {
                orderId,
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
                leftMm: result.data.leftMm,
                rightMm: result.data.rightMm,
                upMm: result.data.upMm,
                downMm: result.data.downMm,
                areaMm2: result.data.areaMm2,
                colors: JSON.stringify(result.data.colors),
                colorSequence: JSON.stringify(result.data.colorSequence),
                designImageUrl: result.designImagePath
                    ? `/api/orders/${orderId}/wilcom/image/design`
                    : null,
                operatorApprovalPdf: `/api/orders/${orderId}/wilcom/pdf/operator`,
                customerApprovalPdf: `/api/orders/${orderId}/wilcom/pdf/customer`,
                wilcomPdfUrl: `/api/orders/${orderId}/wilcom/pdf/original`,
                designLastSaved: result.data.designLastSaved,
                datePrinted: result.data.datePrinted,
            },
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
                leftMm: result.data.leftMm,
                rightMm: result.data.rightMm,
                upMm: result.data.upMm,
                downMm: result.data.downMm,
                areaMm2: result.data.areaMm2,
                colors: JSON.stringify(result.data.colors),
                colorSequence: JSON.stringify(result.data.colorSequence),
                designImageUrl: result.designImagePath
                    ? `/api/orders/${orderId}/wilcom/image/design`
                    : null,
                operatorApprovalPdf: `/api/orders/${orderId}/wilcom/pdf/operator`,
                customerApprovalPdf: `/api/orders/${orderId}/wilcom/pdf/customer`,
                wilcomPdfUrl: `/api/orders/${orderId}/wilcom/pdf/original`,
                designLastSaved: result.data.designLastSaved,
                datePrinted: result.data.datePrinted,
                updatedAt: new Date(),
            },
        });

        // Create a system comment to notify about the wilcom upload
        await prisma.comment.create({
            data: {
                content: `📋 Wilcom PDF uploaded and processed | Design: ${result.data.designName} | Size: ${result.data.widthMm.toFixed(1)}mm x ${result.data.heightMm.toFixed(1)}mm | Stitches: ${result.data.stitchCount.toLocaleString()}`,
                orderId,
                userId: session.user.id,
                isSystem: true,
            },
        });

        return NextResponse.json({
            success: true,
            wilcomData: {
                ...wilcomData,
                colors: result.data.colors,
                colorSequence: result.data.colorSequence,
            },
        });
    } catch (error) {
        console.error("Error processing Wilcom PDF:", error);
        return NextResponse.json(
            { error: "Failed to process Wilcom PDF" },
            { status: 500 }
        );
    }
}

// GET endpoint to fetch wilcom data for an order
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id: orderId } = await params;

        // Check order access
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: { wilcomData: true },
        });

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        const isAdmin = session.user.role === "ADMIN";
        if (!isAdmin && order.customerId !== session.user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        if (!order.wilcomData) {
            return NextResponse.json({ wilcomData: null });
        }

        return NextResponse.json({
            wilcomData: {
                ...order.wilcomData,
                colors: JSON.parse(order.wilcomData.colors),
                colorSequence: JSON.parse(order.wilcomData.colorSequence),
            },
        });
    } catch (error) {
        console.error("Error fetching Wilcom data:", error);
        return NextResponse.json(
            { error: "Failed to fetch Wilcom data" },
            { status: 500 }
        );
    }
}
