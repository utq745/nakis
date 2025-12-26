import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { readFile } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user) {
            const url = new URL(request.url);
            const referer = request.headers.get("referer");
            const isTurkish = referer?.includes("/tr/") || request.headers.get("accept-language")?.startsWith("tr");
            const loginPath = isTurkish ? "/tr/giris" : "/login";
            return NextResponse.redirect(new URL(loginPath, url.origin));
        }

        const { id } = await params;

        // Get file from database
        const file = await prisma.file.findUnique({
            where: { id },
            include: {
                order: {
                    select: { customerId: true, status: true }
                }
            }
        });

        if (!file) {
            return NextResponse.json({ error: "File not found" }, { status: 404 });
        }

        const isAdmin = session.user.role === "ADMIN";

        // Ownership check
        if (!isAdmin && file.order.customerId !== session.user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        // PAYMENT PROTECTION: If it's a final file, check if payment is done
        if (file.type === "final" && !isAdmin) {
            const allowedStatuses = ["PAYMENT_COMPLETED", "DELIVERED", "COMPLETED"];
            if (!allowedStatuses.includes(file.order.status)) {
                return NextResponse.json(
                    { error: "Payment required to access final files" },
                    { status: 402 }
                );
            }

            // DELIVERED tracking: Update status if not already delivered/completed
            if (file.order.status === "PAYMENT_COMPLETED") {
                await prisma.order.update({
                    where: { id: file.orderId },
                    data: { status: "DELIVERED" }
                }).catch(err => console.error("DELIVERED_UPDATE_ERROR:", err));
            }
        }

        // Determine file path - check both old (public) and new (uploads) locations
        let filePath: string | null = null;

        // Extract filename from URL or use url directly if it's just a filename
        const urlPath = file.url;
        const filename = urlPath.includes("/") ? urlPath.split("/").pop() || "" : urlPath;

        // New secure path (uploads/{orderId}/{type}/{filename})
        const securePath = join(process.cwd(), "uploads", file.orderId, file.type, filename);

        // Old public path (public/uploads/{orderId}/{type}/{filename})
        const publicPath = join(process.cwd(), "public", urlPath);

        // Also check if URL is the old format /uploads/...
        const oldPublicPath = join(process.cwd(), "public", "uploads", file.orderId, file.type, filename);

        if (existsSync(securePath)) {
            filePath = securePath;
        } else if (existsSync(publicPath)) {
            filePath = publicPath;
        } else if (existsSync(oldPublicPath)) {
            filePath = oldPublicPath;
        }

        if (!filePath) {
            console.error("File not found:", { securePath, publicPath, oldPublicPath });
            return NextResponse.json({ error: "File not found on disk" }, { status: 404 });
        }

        // Determine content type
        const ext = file.name.split(".").pop()?.toLowerCase();
        const contentTypes: Record<string, string> = {
            // Images
            png: "image/png",
            jpg: "image/jpeg",
            jpeg: "image/jpeg",
            gif: "image/gif",
            webp: "image/webp",
            svg: "image/svg+xml",
            // Documents
            pdf: "application/pdf",
            ai: "application/postscript",
            eps: "application/postscript",
            // Embroidery files
            dst: "application/octet-stream",
            dts: "application/octet-stream",
            pes: "application/octet-stream",
            jef: "application/octet-stream",
            exp: "application/octet-stream",
            vp3: "application/octet-stream",
            hus: "application/octet-stream",
            // Archives
            zip: "application/zip",
            rar: "application/x-rar-compressed",
        };

        const contentType = contentTypes[ext || ""] || "application/octet-stream";

        // Check if request wants to view inline or download
        const url = new URL(request.url);
        const download = url.searchParams.get("download") === "true";

        // Memory-efficient streaming
        const { createReadStream, statSync } = await import("fs");
        const stats = statSync(filePath);
        const stream = createReadStream(filePath);

        // Convert Node stream to Web Stream for Next.js
        const readableStream = new ReadableStream({
            start(controller) {
                stream.on("data", (chunk) => {
                    // Ensure chunk is a Buffer/Uint8Array
                    const data = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
                    controller.enqueue(new Uint8Array(data));
                });
                stream.on("end", () => controller.close());
                stream.on("error", (err) => controller.error(err));
            },
            cancel() {
                stream.destroy();
            }
        });

        // Return file with proper headers
        return new NextResponse(readableStream, {
            headers: {
                "Content-Type": contentType,
                "Content-Disposition": (download || file.type === "final")
                    ? `attachment; filename="${encodeURIComponent(file.name)}"`
                    : `inline; filename="${encodeURIComponent(file.name)}"`,
                "Content-Length": stats.size.toString(),
                "Cache-Control": "private, max-age=3600",
                "X-Content-Type-Options": "nosniff", // Security: prevent MIME sniffing
                "Content-Security-Policy": "default-src 'none'; img-src 'self'; style-src 'unsafe-inline';", // Security: restrictive CSP
            },
        });
    } catch (error) {
        console.error("Error serving file:", error);
        return NextResponse.json(
            { error: "Failed to serve file" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const { id } = await params;

        // Get file from database with order status
        const file = await prisma.file.findUnique({
            where: { id },
            include: {
                order: {
                    select: { status: true }
                }
            }
        });

        if (!file) {
            return NextResponse.json({ error: "File not found" }, { status: 404 });
        }

        // Check if deletion is allowed based on order status
        if (file.order.status === "PAYMENT_PENDING" || file.order.status === "COMPLETED") {
            return NextResponse.json(
                { error: "Cannot delete files when payment is pending or order is completed" },
                { status: 400 }
            );
        }

        // Determine file path
        const urlPath = file.url;
        const filename = urlPath.includes("/") ? urlPath.split("/").pop() || "" : urlPath;

        const securePath = join(process.cwd(), "uploads", file.orderId, file.type, filename);
        const publicPath = join(process.cwd(), "public", urlPath);
        const oldPublicPath = join(process.cwd(), "public", "uploads", file.orderId, file.type, filename);

        let filePathToDelete: string | null = null;
        if (existsSync(securePath)) filePathToDelete = securePath;
        else if (existsSync(publicPath)) filePathToDelete = publicPath;
        else if (existsSync(oldPublicPath)) filePathToDelete = oldPublicPath;

        // Delete from database
        await prisma.file.delete({
            where: { id }
        });

        // Delete from disk if found
        if (filePathToDelete) {
            const { unlink } = await import("fs/promises");
            await unlink(filePathToDelete).catch(err => console.error("Disk deletion error:", err));
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting file:", error);
        return NextResponse.json(
            { error: "Failed to delete file" },
            { status: 500 }
        );
    }
}
