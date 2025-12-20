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

        // Check if file exists
        if (!existsSync(pdfPath)) {
            return NextResponse.json({ error: "PDF not found" }, { status: 404 });
        }

        // Read and return the PDF
        const pdfBuffer = await readFile(pdfPath);

        return new NextResponse(pdfBuffer, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `inline; filename="${fileName}"`,
                "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
                "Pragma": "no-cache",
                "Expires": "0",
            },
        });
    } catch (error) {
        console.error("Error serving PDF:", error);
        return NextResponse.json(
            { error: "Failed to serve PDF" },
            { status: 500 }
        );
    }
}
