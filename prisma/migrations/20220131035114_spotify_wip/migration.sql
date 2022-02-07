/*
  Warnings:

  - Made the column `userId` on table `PLaylist` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `duration` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PLaylist" DROP CONSTRAINT "PLaylist_userId_fkey";

-- AlterTable
ALTER TABLE "PLaylist" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "duration" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "PLaylist" ADD CONSTRAINT "PLaylist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
