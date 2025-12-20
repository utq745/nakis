import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { copyFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

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

        if (!order || !order.wilcomData) {
            return NextResponse.json({ error: "Wilcom data not found" }, { status: 404 });
        }

        const wilcomDir = join(process.cwd(), "uploads", orderId, "wilcom");
        const finalDir = join(process.cwd(), "uploads", orderId, "final");
        await mkdir(finalDir, { recursive: true });

        const shortId = orderId.slice(0, 8);

        // Files to publish
        const publishFiles = [
            {
                src: join(wilcomDir, `${orderId}_customer_approval.pdf`),
                destName: `${shortId}-customer-approval-card.pdf`,
                type: "final"
            },
            {
                src: join(wilcomDir, `${orderId}_operator_approval.pdf`),
                destName: `${shortId}-operator-approval-card.pdf`,
                type: "final"
            }
        ];

        for (const fileItem of publishFiles) {
            if (existsSync(fileItem.src)) {
                const destPath = join(finalDir, fileItem.destName);
                await copyFile(fileItem.src, destPath);

                // Check if file record already exists to avoid duplicates
                const existingFile = await prisma.file.findFirst({
                    where: {
                        orderId,
                        name: fileItem.destName,
                        type: "final"
                    }
                });

                if (!existingFile) {
                    await prisma.file.create({
                        data: {
                            name: fileItem.destName,
                            url: fileItem.destName, // Store just filename
                            type: "final",
                            orderId,
                            uploadedBy: session.user.id,
                        },
                    });
                }
            }
        }

        // Create a system comment
        await prisma.comment.create({
            data: {
                content: `🚀 Approval cards published to Final section.`,
                orderId,
                userId: session.user.id,
                isSystem: true,
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error publishing Wilcom PDFs:", error);
        return NextResponse.json(
            { error: "Failed to publish Wilcom PDFs" },
            { status: 500 }
        );
    }
}
