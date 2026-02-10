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
            include: { wilcomData: true },
        });

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        const isAdmin = session.user.role === "ADMIN";
        if (!isAdmin && order.customerId !== session.user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        // Determine which PDF to serve
        let pdfPath: string;
        let fileName: string;

        switch (type) {
            case "operator":
                // Only admin can access operator approval card
                if (!isAdmin) {
                    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
                }
                pdfPath = join(process.cwd(), "uploads", orderId, "wilcom", `${orderId}_operator_approval.pdf`);
                fileName = `operator_approval_${order.wilcomData?.designName || orderId}.pdf`;
                break;
            case "customer":
                pdfPath = join(process.cwd(), "uploads", orderId, "wilcom", `${orderId}_customer_approval.pdf`);
                fileName = `customer_approval_${order.wilcomData?.designName || orderId}.pdf`;
                break;
            case "original":
                // Only admin can access original Wilcom PDF
                if (!isAdmin) {
                    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
                }
                pdfPath = join(process.cwd(), "uploads", orderId, "wilcom", "wilcom.pdf");
                fileName = `wilcom_${order.wilcomData?.designName || orderId}.pdf`;
                break;
            default:
                return NextResponse.json({ error: "Invalid PDF type" }, { status: 400 });
        }

        // 1. Try serving from local filesystem first (faster)
        if (existsSync(pdfPath)) {
            const pdfBuffer = await readFile(pdfPath);
            return new NextResponse(pdfBuffer, {
                headers: {
                    "Content-Type": "application/pdf",
                    "Content-Disposition": `inline; filename="${fileName}"`,
                    "Cache-Control": "public, max-age=3600",
                },
            });
        }

        // 2. Fallback to Cloudflare R2
        try {
            const { GetObjectCommand } = await import("@aws-sdk/client-s3");
            const { s3Client, R2_BUCKET_NAME } = await import("@/lib/s3");

            let r2Key: string;
            switch (type) {
                case "operator": r2Key = `wilcom/${orderId}/operator_approval.pdf`; break;
                case "customer": r2Key = `wilcom/${orderId}/customer_approval.pdf`; break;
                case "original": r2Key = `wilcom/${orderId}/wilcom.pdf`; break;
                default: return NextResponse.json({ error: "Invalid PDF type" }, { status: 400 });
            }

            const response = await s3Client.send(new GetObjectCommand({
                Bucket: R2_BUCKET_NAME,
                Key: r2Key,
            }));

            if (!response.Body) {
                return NextResponse.json({ error: "PDF not found in R2" }, { status: 404 });
            }

            const arrayBuffer = await response.Body.transformToByteArray();
            return new NextResponse(Buffer.from(arrayBuffer), {
                headers: {
                    "Content-Type": "application/pdf",
                    "Content-Disposition": `inline; filename="${fileName}"`,
                    "Cache-Control": "public, max-age=3600",
                },
            });
        } catch (r2Error) {
            console.error("[WILCOM_PDF_R2_ERROR]", r2Error);
            return NextResponse.json({ error: "PDF not found" }, { status: 404 });
        }
    } catch (error) {
        console.error("Error serving PDF:", error);
        return NextResponse.json(
            { error: "Failed to serve PDF" },
            { status: 500 }
        );
    }
}
