/*
  Warnings:

  - The `category` column on the `Recipe` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `cuisineType` column on the `Recipe` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "description" TEXT NOT NULL DEFAULT 'Default description',
ADD COLUMN     "preparationTime" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "category",
ADD COLUMN     "category" TEXT[],
DROP COLUMN "cuisineType",
ADD COLUMN     "cuisineType" TEXT[];
