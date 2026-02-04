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
            const allowedStatuses = ["COMPLETED", "DELIVERED"];
            if (!allowedStatuses.includes(file.order.status)) {
                return NextResponse.json(
                    { error: "Payment required to access final files" },
                    { status: 402 }
                );
            }

            // DELIVERED tracking: Update status if not already delivered/completed
            if (file.order.status === "COMPLETED") {
                await prisma.order.update({
                    where: { id: file.orderId },
                    data: { status: "DELIVERED" }
                }).catch(err => console.error("DELIVERED_UPDATE_ERROR:", err));
            }
        }

        // Determine file source (R2 or Local)
        const urlPath = file.url;

        // If urlPath contains a slash and doesn't exist locally, it's likely an R2 key
        const filename = urlPath.includes("/") ? urlPath.split("/").pop() || "" : urlPath;
        const securePath = join(process.cwd(), "uploads", file.orderId, file.type, filename);
        const publicPath = join(process.cwd(), "public", urlPath);
        const oldPublicPath = join(process.cwd(), "public", "uploads", file.orderId, file.type, filename);

        let fileStream: any = null;
        let fileSize = file.size;

        if (existsSync(securePath)) {
            const { createReadStream } = await import("fs");
            fileStream = createReadStream(securePath);
        } else if (existsSync(publicPath)) {
            const { createReadStream } = await import("fs");
            fileStream = createReadStream(publicPath);
        } else if (existsSync(oldPublicPath)) {
            const { createReadStream } = await import("fs");
            fileStream = createReadStream(oldPublicPath);
        } else {
            // Try fetching from R2
            try {
                const { GetObjectCommand } = await import("@aws-sdk/client-s3");
                const { s3Client, R2_BUCKET_NAME } = await import("@/lib/s3");

                const response = await s3Client.send(new GetObjectCommand({
                    Bucket: R2_BUCKET_NAME,
                    Key: file.url, // This is the R2 Key
                }));

                if (response.Body) {
                    fileStream = response.Body;
                    fileSize = Number(response.ContentLength) || file.size;
                }
            } catch (r2Error) {
                console.error("R2 Fetch Error:", r2Error);
                return NextResponse.json({ error: "File not found anywhere" }, { status: 404 });
            }
        }

        if (!fileStream) {
            return NextResponse.json({ error: "File content not found" }, { status: 404 });
        }

        // Determine content type
        const ext = file.name.split(".").pop()?.toLowerCase();
        const contentTypes: Record<string, string> = {
            png: "image/png",
            jpg: "image/jpeg",
            jpeg: "image/jpeg",
            gif: "image/gif",
            webp: "image/webp",
            svg: "image/svg+xml",
            pdf: "application/pdf",
            dst: "application/octet-stream",
            pes: "application/octet-stream",
            emb: "application/octet-stream",
            jef: "application/octet-stream",
            exp: "application/octet-stream",
            vp3: "application/octet-stream",
            hus: "application/octet-stream",
            ai: "application/postscript",
            eps: "application/postscript"
        };
        const contentType = contentTypes[ext || ""] || "application/octet-stream";

        const { searchParams } = new URL(request.url);
        const forceDownload = searchParams.get("download") === "1";

        // Determine disposition
        const disposition = (file.type === "final" || forceDownload) ? "attachment" : "inline";
        const safeName = file.name.replace(/"/g, '\\"');
        const encodedName = encodeURIComponent(file.name);

        return new NextResponse(fileStream as any, {
            headers: {
                "Content-Type": contentType,
                "Content-Disposition": `${disposition}; filename="${safeName}"; filename*=UTF-8''${encodedName}`,
                "Content-Length": (fileSize || 0).toString(),
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
