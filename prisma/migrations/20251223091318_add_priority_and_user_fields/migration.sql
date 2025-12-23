-- AlterTable
ALTER TABLE "User" ADD COLUMN "notes" TEXT;
ALTER TABLE "User" ADD COLUMN "resetPasswordExpires" DATETIME;
ALTER TABLE "User" ADD COLUMN "resetPasswordToken" TEXT;

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
    "priority" TEXT NOT NULL DEFAULT 'NORMAL',
    "estimatedDelivery" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("addKnockdownStitch", "createdAt", "customProduct", "customerId", "description", "garmentType", "hidden", "id", "isNotSure", "machineBrand", "price", "productType", "serviceType", "status", "title", "updatedAt") SELECT "addKnockdownStitch", "createdAt", "customProduct", "customerId", "description", "garmentType", "hidden", "id", "isNotSure", "machineBrand", "price", "productType", "serviceType", "status", "title", "updatedAt" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
