/*
  Warnings:

  - Made the column `rating` on table `Visit` required. This step will fail if there are existing NULL values in that column.
  - Made the column `size` on table `Visit` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Visit" ALTER COLUMN "rating" SET NOT NULL,
ALTER COLUMN "size" SET NOT NULL;
