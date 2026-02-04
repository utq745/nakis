import { PrismaClient } from "@prisma/client";
import { existsSync } from "fs";
import { join } from "path";
import { S3Client, HeadObjectCommand } from "@aws-sdk/client-s3";

const prisma = new PrismaClient();

// Configure R2 client (mirroring src/lib/s3.ts logic)
const s3Client = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
    },
});

const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;

async function auditFiles() {
    console.log("Starting full file audit...");
    const files = await prisma.file.findMany({
        include: {
            order: true
        }
    });

    console.log(`Found ${files.length} file records in database.`);

    const missingFiles = [];

    for (const file of files) {
        let existsOnDisk = false;
        let existsInR2 = false;

        // 1. Check disk paths (VPS paths inside container)
        const urlPath = file.url;
        const filename = urlPath.includes("/") ? urlPath.split("/").pop() || "" : urlPath;

        const pathsToCheck = [
            join(process.cwd(), "uploads", file.orderId, file.type, filename),
            join(process.cwd(), "public", urlPath),
            join(process.cwd(), "public", "uploads", file.orderId, file.type, filename)
        ];

        for (const p of pathsToCheck) {
            if (existsSync(p)) {
                existsOnDisk = true;
                break;
            }
        }

        // 2. Check R2 if not on disk (or check always to be sure)
        if (!existsOnDisk) {
            try {
                await s3Client.send(new HeadObjectCommand({
                    Bucket: R2_BUCKET_NAME,
                    Key: file.url,
                }));
                existsInR2 = true;
            } catch (err) {
                // Not found in R2
            }
        }

        if (!existsOnDisk && !existsInR2) {
            missingFiles.push({
                id: file.id,
                name: file.name,
                orderId: file.orderId,
                type: file.type,
                url: file.url,
                createdAt: file.createdAt
            });
        }
    }

    if (missingFiles.length === 0) {
        console.log("SUCCESS: No missing files found. All database records match physical files.");
    } else {
        console.log(`\nWARNING: Found ${missingFiles.length} missing files!`);
        console.log("--------------------------------------------------");
        missingFiles.forEach(f => {
            console.log(`Order: ${f.orderId} | Type: ${f.type} | Name: ${f.name} | Created: ${f.createdAt}`);
            console.log(`  Expected URL/Key: ${f.url}`);
        });
        console.log("--------------------------------------------------");
    }
}

auditFiles()
    .catch(console.error)
    .finally(async () => await prisma.$disconnect());
