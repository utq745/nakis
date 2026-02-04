import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client, R2_BUCKET_NAME } from "../src/lib/s3";

async function checkR2() {
    const keys = [
        "c88de99a-1b7d-4baa-b959-4a16a50c3e89-WhatsApp_Image_2026-01-01_at_15.16.56.jpeg",
        "a29b608f-66b7-423a-8887-3496f62d2047-rutgers_fixed_copy.png"
    ];

    for (const key of keys) {
        console.log(`Checking R2 for key: ${key}`);
        try {
            const response = await s3Client.send(new GetObjectCommand({
                Bucket: R2_BUCKET_NAME,
                Key: key
            }));
            console.log(`Found! ContentLength: ${response.ContentLength}, ContentType: ${response.ContentType}`);
        } catch (e: any) {
            console.log(`Not found in R2: ${e.message}`);
        }
    }
}

checkR2().catch(console.error);
