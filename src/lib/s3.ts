import { S3Client } from "@aws-sdk/client-s3";

const isBuildTime = process.env.NODE_ENV === 'production' && !process.env.R2_ACCOUNT_ID;

if (!process.env.R2_ACCOUNT_ID && !isBuildTime) {
    console.warn("Warning: R2_ACCOUNT_ID is missing in environment variables");
}

export const s3Client = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
    },
});

export const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
