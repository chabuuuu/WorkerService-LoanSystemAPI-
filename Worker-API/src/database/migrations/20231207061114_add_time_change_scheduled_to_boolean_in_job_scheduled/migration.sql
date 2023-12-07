/*
  Warnings:

  - Added the required column `time` to the `JobSchedule` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `scheduled` on the `JobSchedule` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "JobSchedule" ADD COLUMN     "time" TEXT NOT NULL,
DROP COLUMN "scheduled",
ADD COLUMN     "scheduled" BOOLEAN NOT NULL;
