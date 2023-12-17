-- CreateTable
CREATE TABLE "SyncLog" (
    "id" SERIAL NOT NULL,
    "schedule_id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "count" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL,
    "jobScheduleId" INTEGER,

    CONSTRAINT "SyncLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SyncLog" ADD CONSTRAINT "SyncLog_jobScheduleId_fkey" FOREIGN KEY ("jobScheduleId") REFERENCES "JobSchedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
