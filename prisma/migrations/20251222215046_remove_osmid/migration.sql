/*
  Warnings:

  - You are about to drop the column `osmId` on the `Shop` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Shop_osmId_key";

-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "osmId";
