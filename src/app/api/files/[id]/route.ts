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
            const loginPath = isTurkish ? "/tr/login" : "/login";
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

        // PAYMENT PROTECTION: If it's a final file and payment is pending, block download for customer
        if (file.type === "final" && file.order.status === "PAYMENT_PENDING" && !isAdmin) {
            return NextResponse.json(
                { error: "Payment required to access final files" },
                { status: 402 }
            );
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

        // Read file
        const fileBuffer = await readFile(filePath);

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

        // Return file with proper headers
        return new NextResponse(fileBuffer, {
            headers: {
                "Content-Type": contentType,
                "Content-Disposition": download
                    ? `attachment; filename="${encodeURIComponent(file.name)}"`
                    : `inline; filename="${encodeURIComponent(file.name)}"`,
                "Content-Length": fileBuffer.length.toString(),
                "Cache-Control": "private, max-age=3600",
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
