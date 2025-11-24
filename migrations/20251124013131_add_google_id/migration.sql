/*
  Warnings:

  - A unique constraint covering the columns `[googleId]` on the table `Shop` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Shop" ADD COLUMN     "googleId" TEXT,
ALTER COLUMN "osmId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Shop_googleId_key" ON "Shop"("googleId");
