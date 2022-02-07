/*
  Warnings:

  - You are about to drop the column `email` on the `PLaylist` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `PLaylist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "PLaylist_email_key";

-- AlterTable
ALTER TABLE "PLaylist" DROP COLUMN "email",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "url" TEXT NOT NULL;
