/*
  Warnings:

  - You are about to drop the column `markId` on the `Solution` table. All the data in the column will be lost.
  - You are about to drop the `Mark` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `mark` to the `Solution` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Solution" DROP CONSTRAINT "Solution_markId_fkey";

-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_taskId_fkey";

-- AlterTable
ALTER TABLE "Solution" DROP COLUMN "markId",
ADD COLUMN     "mark" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Mark";

-- DropTable
DROP TABLE "Test";
