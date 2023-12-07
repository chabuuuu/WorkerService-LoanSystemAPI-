/*
  Warnings:

  - Added the required column `content` to the `JobSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobSchedule" ADD COLUMN     "content" TEXT NOT NULL;
