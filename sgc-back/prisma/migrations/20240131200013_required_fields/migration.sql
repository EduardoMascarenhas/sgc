/*
  Warnings:

  - Made the column `name` on table `Client` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tel` on table `Client` required. This step will fail if there are existing NULL values in that column.
  - Made the column `coordX` on table `Client` required. This step will fail if there are existing NULL values in that column.
  - Made the column `coordY` on table `Client` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "tel" SET NOT NULL,
ALTER COLUMN "coordX" SET NOT NULL,
ALTER COLUMN "coordY" SET NOT NULL;
