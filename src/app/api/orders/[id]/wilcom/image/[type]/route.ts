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
        });

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        const isAdmin = session.user.role === "ADMIN";
        if (!isAdmin && order.customerId !== session.user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        // Determine which image to serve
        let imagePath: string;

        switch (type) {
            case "design":
                imagePath = join(process.cwd(), "uploads", orderId, "wilcom", `${orderId}_design.png`);
                break;
            case "artwork":
                imagePath = join(process.cwd(), "uploads", orderId, "wilcom", `${orderId}_artwork.png`);
                break;
            default:
                return NextResponse.json({ error: "Invalid image type" }, { status: 400 });
        }

        // Check if file exists
        if (!existsSync(imagePath)) {
            return NextResponse.json({ error: "Image not found" }, { status: 404 });
        }

        // Read and return the image
        const imageBuffer = await readFile(imagePath);

        return new NextResponse(imageBuffer, {
            headers: {
                "Content-Type": "image/png",
                "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
                "Pragma": "no-cache",
                "Expires": "0",
            },
        });
    } catch (error) {
        console.error("Error serving image:", error);
        return NextResponse.json(
            { error: "Failed to serve image" },
            { status: 500 }
        );
    }
}
