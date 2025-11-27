/*
  Warnings:

  - A unique constraint covering the columns `[name,userId]` on the table `List` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,userId]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `List` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "List_name_key";

-- DropIndex
DROP INDEX "Movie_name_key";

-- AlterTable
ALTER TABLE "List" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "List_name_userId_key" ON "List"("name", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Movie_name_userId_key" ON "Movie"("name", "userId");

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
