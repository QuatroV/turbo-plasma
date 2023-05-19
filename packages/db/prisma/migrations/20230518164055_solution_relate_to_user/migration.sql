/*
  Warnings:

  - You are about to drop the column `courseUserId` on the `Solution` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Solution" DROP CONSTRAINT "Solution_courseUserId_fkey";

-- AlterTable
ALTER TABLE "Solution" DROP COLUMN "courseUserId",
ADD COLUMN     "solverId" TEXT;

-- AddForeignKey
ALTER TABLE "Solution" ADD CONSTRAINT "Solution_solverId_fkey" FOREIGN KEY ("solverId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
