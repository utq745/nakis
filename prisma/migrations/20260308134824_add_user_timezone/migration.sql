/*
  Warnings:

  - A unique constraint covering the columns `[slug,locale]` on the table `BlogPost` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "BlogPost_slug_key";

-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN "deletedAt" DATETIME;
ALTER TABLE "BlogPost" ADD COLUMN "translationGroupId" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PRICE_ACCEPTED',
    "price" REAL,
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    "machineBrand" TEXT,
    "serviceType" TEXT,
    "productType" TEXT,
    "garmentType" TEXT,
    "isNotSure" BOOLEAN NOT NULL DEFAULT false,
    "customProduct" TEXT,
    "addKnockdownStitch" BOOLEAN NOT NULL DEFAULT false,
    "customerId" TEXT NOT NULL,
    "priority" TEXT NOT NULL DEFAULT 'NORMAL',
    "estimatedDelivery" DATETIME,
    "cancelledAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("addKnockdownStitch", "cancelledAt", "createdAt", "customProduct", "customerId", "description", "estimatedDelivery", "garmentType", "hidden", "id", "isNotSure", "machineBrand", "price", "priority", "productType", "serviceType", "status", "title", "updatedAt") SELECT "addKnockdownStitch", "cancelledAt", "createdAt", "customProduct", "customerId", "description", "estimatedDelivery", "garmentType", "hidden", "id", "isNotSure", "machineBrand", "price", "priority", "productType", "serviceType", "status", "title", "updatedAt" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE INDEX "Order_customerId_idx" ON "Order"("customerId");
CREATE INDEX "Order_status_idx" ON "Order"("status");
CREATE INDEX "Order_createdAt_idx" ON "Order"("createdAt");
CREATE INDEX "Order_priority_idx" ON "Order"("priority");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "emailVerified" DATETIME,
    "password" TEXT,
    "name" TEXT,
    "image" TEXT,
    "role" TEXT NOT NULL DEFAULT 'CUSTOMER',
    "language" TEXT NOT NULL DEFAULT 'en',
    "timezone" TEXT NOT NULL DEFAULT 'Europe/Istanbul',
    "billingAddress" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "emailVerificationToken" TEXT,
    "emailVerificationTokenExpires" DATETIME,
    "pendingEmail" TEXT,
    "pendingName" TEXT,
    "notes" TEXT,
    "resetPasswordExpires" DATETIME,
    "resetPasswordToken" TEXT,
    "deleteAccountToken" TEXT,
    "deleteAccountTokenExpires" DATETIME,
    "sessionVersion" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_User" ("billingAddress", "createdAt", "deleteAccountToken", "deleteAccountTokenExpires", "email", "emailVerificationToken", "emailVerificationTokenExpires", "emailVerified", "id", "image", "language", "name", "notes", "password", "pendingEmail", "pendingName", "resetPasswordExpires", "resetPasswordToken", "role", "sessionVersion", "updatedAt") SELECT "billingAddress", "createdAt", "deleteAccountToken", "deleteAccountTokenExpires", "email", "emailVerificationToken", "emailVerificationTokenExpires", "emailVerified", "id", "image", "language", "name", "notes", "password", "pendingEmail", "pendingName", "resetPasswordExpires", "resetPasswordToken", "role", "sessionVersion", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "BlogPost_translationGroupId_idx" ON "BlogPost"("translationGroupId");

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_slug_locale_key" ON "BlogPost"("slug", "locale");
