import { s3Client, R2_BUCKET_NAME } from "./s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import prisma from "./prisma";
import { readFile } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function syncOrderToCloudflare(orderId: string) {
    if (!R2_BUCKET_NAME) {
        console.warn("[SYNC_CLOUDFLARE] R2_BUCKET_NAME is not configured.");
        return;
    }

    console.log(`[SYNC_CLOUDFLARE] Starting sync for order ${orderId} to Cloudflare R2...`);
    
    // 1. Sync all files in `file` table
    const files = await prisma.file.findMany({ where: { orderId } });
    for (const f of files) {
        let localPath: string;
        
        if (f.url.includes("/")) {
            // If URL contains slashes, it's already a relative path from 'uploads/'
            localPath = join(process.cwd(), "uploads", f.url);
        } else {
            // Otherwise it's a simple filename relative to orderId/type/
            localPath = join(process.cwd(), "uploads", f.orderId, f.type, f.url);
        }
        
        if (existsSync(localPath)) {
            const buffer = await readFile(localPath);
            
            const ext = f.name.split(".").pop()?.toLowerCase();
            const contentTypes: Record<string, string> = {
                png: "image/png",
                jpg: "image/jpeg",
                jpeg: "image/jpeg",
                pdf: "application/pdf"
            };
            const contentType = contentTypes[ext || ""] || "application/octet-stream";
            
            await s3Client.send(new PutObjectCommand({
                Bucket: R2_BUCKET_NAME,
                Key: f.url,
                Body: buffer,
                ContentType: contentType,
            })).catch(e => console.error(`[SYNC_CLOUDFLARE] Failed to sync ${f.url}:`, e));
        }
    }
    
    // 2. Sync Wilcom specific files (if they exist)
    const wilcomDir = join(process.cwd(), "uploads", orderId, "wilcom");
    const wilcomFiles = [
        "wilcom.pdf", 
        `${orderId}_customer_approval.pdf`, 
        `${orderId}_operator_approval.pdf`,
        `${orderId}_design.png`,
        `${orderId}_artwork.png`
    ];
    
    for (const wf of wilcomFiles) {
        const localPath = join(wilcomDir, wf);
        if (existsSync(localPath)) {
            let keyName = wf;
            if (wf === `${orderId}_customer_approval.pdf`) keyName = "customer_approval.pdf";
            if (wf === `${orderId}_operator_approval.pdf`) keyName = "operator_approval.pdf";
            if (wf === `${orderId}_design.png`) keyName = "design.png";
            if (wf === `${orderId}_artwork.png`) keyName = "artwork.png";
            
            const ext = wf.split(".").pop()?.toLowerCase();
            const contentType = ext === "pdf" ? "application/pdf" : ext === "png" ? "image/png" : "application/octet-stream";
            
            const r2Key = `wilcom/${orderId}/${keyName}`;
            const buffer = await readFile(localPath);
            await s3Client.send(new PutObjectCommand({
                Bucket: R2_BUCKET_NAME,
                Key: r2Key,
                Body: buffer,
                ContentType: contentType
            })).catch(e => console.error(`[SYNC_CLOUDFLARE] Failed to sync ${r2Key}:`, e));
        }
    }
    
    console.log(`[SYNC_CLOUDFLARE] Finished sync for order ${orderId}`);
}
