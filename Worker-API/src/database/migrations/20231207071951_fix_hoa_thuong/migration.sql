/*
  Warnings:

  - You are about to drop the column `Fullname` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `Password` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `Username` on the `Admin` table. All the data in the column will be lost.
  - Added the required column `fullname` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "Fullname",
DROP COLUMN "Password",
DROP COLUMN "Username",
ADD COLUMN     "fullname" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;
