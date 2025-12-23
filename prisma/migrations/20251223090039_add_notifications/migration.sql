-- AlterTable
ALTER TABLE "User" ADD COLUMN "emailVerificationToken" TEXT;
ALTER TABLE "User" ADD COLUMN "emailVerificationTokenExpires" DATETIME;
ALTER TABLE "User" ADD COLUMN "pendingEmail" TEXT;
ALTER TABLE "User" ADD COLUMN "pendingName" TEXT;

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "link" TEXT,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'WAITING_PRICE',
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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("addKnockdownStitch", "createdAt", "customProduct", "customerId", "description", "garmentType", "hidden", "id", "isNotSure", "machineBrand", "price", "productType", "serviceType", "status", "title", "updatedAt") SELECT "addKnockdownStitch", "createdAt", "customProduct", "customerId", "description", "garmentType", "hidden", "id", "isNotSure", "machineBrand", "price", "productType", "serviceType", "status", "title", "updatedAt" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
