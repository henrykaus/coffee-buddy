/*
  Warnings:

  - Made the column `googleId` on table `Shop` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Shop" ALTER COLUMN "googleId" SET NOT NULL;
