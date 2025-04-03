/*
  Warnings:

  - You are about to drop the `Ingredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_IngredientToRecipe` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ingredients` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_IngredientToRecipe" DROP CONSTRAINT "_IngredientToRecipe_A_fkey";

-- DropForeignKey
ALTER TABLE "_IngredientToRecipe" DROP CONSTRAINT "_IngredientToRecipe_B_fkey";

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "ingredients" JSONB NOT NULL;
UPDATE "Recipe" SET "ingredients" = '[]' WHERE "ingredients" IS NULL;

-- DropTable
DROP TABLE "Ingredient";

-- DropTable
DROP TABLE "_IngredientToRecipe";
