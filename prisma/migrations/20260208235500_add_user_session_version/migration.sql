-- Add token version field for JWT session revocation ("logout all devices")
ALTER TABLE "User" ADD COLUMN "sessionVersion" INTEGER NOT NULL DEFAULT 0;
