import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import archiver from "archiver";
import { createReadStream, statSync } from "fs";
import { join } from "path";
import { existsSync } from "fs";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;

        // Get order with final files
        const order = await prisma.order.findUnique({
            where: { id },
            select: {
                customerId: true,
                title: true,
                files: {
                    where: { type: "final" },
                    select: {
                        id: true,
                        name: true,
                        url: true,
                        orderId: true,
                        type: true,
                    }
                }
            }
        });

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        const isAdmin = session.user.role === "ADMIN";

        // Check ownership
        if (!isAdmin && order.customerId !== session.user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        // Check if there are any final files
        if (order.files.length === 0) {
            return NextResponse.json({ error: "No final files available" }, { status: 404 });
        }

        // Create a stream for the ZIP file
        const archive = archiver("zip", {
            zlib: { level: 9 } // Maximum compression
        });

        // Create a readable stream to pipe to the response
        const { Readable } = await import("stream");
        const readableStream = new ReadableStream({
            start(controller) {
                archive.on("data", (chunk) => {
                    controller.enqueue(new Uint8Array(chunk));
                });
                archive.on("end", () => {
                    controller.close();
                });
                archive.on("error", (err) => {
                    console.error("Archive error:", err);
                    controller.error(err);
                });
            },
            cancel() {
                archive.destroy();
            }
        });

        // Add files to archive
        for (const file of order.files) {
            const urlPath = file.url;
            const filename = urlPath.includes("/") ? urlPath.split("/").pop() || "" : urlPath;

            // Try different path locations
            let filePath: string | null = null;

            const securePath = join(process.cwd(), "uploads", file.orderId, file.type, filename);
            const publicPath = join(process.cwd(), "public", urlPath);
            const oldPublicPath = join(process.cwd(), "public", "uploads", file.orderId, file.type, filename);

            if (existsSync(securePath)) {
                filePath = securePath;
            } else if (existsSync(publicPath)) {
                filePath = publicPath;
            } else if (existsSync(oldPublicPath)) {
                filePath = oldPublicPath;
            }

            if (filePath && existsSync(filePath)) {
                try {
                    const stream = createReadStream(filePath);
                    archive.append(stream, { name: file.name });
                } catch (err) {
                    console.error(`Failed to add file ${file.name}:`, err);
                }
            } else {
                // Try fetching from R2
                try {
                    const { GetObjectCommand } = await import("@aws-sdk/client-s3");
                    const { s3Client, R2_BUCKET_NAME } = await import("@/lib/s3");

                    const response = await s3Client.send(new GetObjectCommand({
                        Bucket: R2_BUCKET_NAME,
                        Key: file.url,
                    }));

                    if (response.Body) {
                        // S3 Body in Node.js is a Readable stream
                        archive.append(response.Body as any, { name: file.name });
                    }
                } catch (r2Error) {
                    console.error(`Failed to fetch ${file.name} from R2:`, r2Error);
                }
            }
        }

        // Finalize the archive (triggers 'end' event)
        archive.finalize();

        // Generate filename
        const orderTitle = order.title || `Order_${id.slice(-6)}`;
        const safeTitle = orderTitle.replace(/[^a-zA-Z0-9-_]/g, "_");
        const zipFilename = `${safeTitle}_Finals.zip`;

        // Return the ZIP file
        return new NextResponse(readableStream, {
            headers: {
                "Content-Type": "application/zip",
                "Content-Disposition": `attachment; filename="${encodeURIComponent(zipFilename)}"`,
                "Cache-Control": "private, max-age=0",
            },
        });
    } catch (error) {
        console.error("Error creating ZIP:", error);
        return NextResponse.json(
            { error: "Failed to create ZIP file" },
            { status: 500 }
        );
    }
}
