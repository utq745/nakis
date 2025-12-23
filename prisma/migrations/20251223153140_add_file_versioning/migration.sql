-- AlterTable
ALTER TABLE "Order" ADD COLUMN "cancelledAt" DATETIME;

-- AlterTable
ALTER TABLE "User" ADD COLUMN "deleteAccountToken" TEXT;
ALTER TABLE "User" ADD COLUMN "deleteAccountTokenExpires" DATETIME;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_File" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "size" INTEGER,
    "version" INTEGER NOT NULL DEFAULT 1,
    "replacesFileId" TEXT,
    "orderId" TEXT NOT NULL,
    "commentId" TEXT,
    "uploadedBy" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "File_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "File_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_File" ("commentId", "createdAt", "id", "name", "orderId", "size", "type", "uploadedBy", "url") SELECT "commentId", "createdAt", "id", "name", "orderId", "size", "type", "uploadedBy", "url" FROM "File";
DROP TABLE "File";
ALTER TABLE "new_File" RENAME TO "File";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
