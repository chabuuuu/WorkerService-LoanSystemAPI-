-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "Username" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Fullname" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobSchedule" (
    "id" SERIAL NOT NULL,
    "job" TEXT NOT NULL,
    "scheduled" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "adminId" INTEGER,

    CONSTRAINT "JobSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotiLog" (
    "id" SERIAL NOT NULL,
    "schedule_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "jobScheduleId" INTEGER,

    CONSTRAINT "NotiLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BackupLog" (
    "id" SERIAL NOT NULL,
    "schedule_id" INTEGER NOT NULL,
    "target_db" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "jobScheduleId" INTEGER,

    CONSTRAINT "BackupLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MessageLog" (
    "id" SERIAL NOT NULL,
    "schedule_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "name_exchange" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "jobScheduleId" INTEGER,

    CONSTRAINT "MessageLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MornitorLog" (
    "id" SERIAL NOT NULL,
    "schedule_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "jobScheduleId" INTEGER,

    CONSTRAINT "MornitorLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JobSchedule" ADD CONSTRAINT "JobSchedule_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotiLog" ADD CONSTRAINT "NotiLog_jobScheduleId_fkey" FOREIGN KEY ("jobScheduleId") REFERENCES "JobSchedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BackupLog" ADD CONSTRAINT "BackupLog_jobScheduleId_fkey" FOREIGN KEY ("jobScheduleId") REFERENCES "JobSchedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageLog" ADD CONSTRAINT "MessageLog_jobScheduleId_fkey" FOREIGN KEY ("jobScheduleId") REFERENCES "JobSchedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MornitorLog" ADD CONSTRAINT "MornitorLog_jobScheduleId_fkey" FOREIGN KEY ("jobScheduleId") REFERENCES "JobSchedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
