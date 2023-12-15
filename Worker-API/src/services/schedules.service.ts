import { Injectable, OnModuleInit } from '@nestjs/common';
import { SchedulesRepository } from '../repositories/schedules.repository';
import { Admin, JobSchedule, Prisma } from '@prisma/client';
import { scheduled } from 'rxjs';
import { ScheduleUtil } from 'src/utils/schedule.utils';
import { BaseService } from './base.service';

@Injectable()
export class SchedulesService
  extends BaseService<JobSchedule, SchedulesRepository>
  implements OnModuleInit
{
  constructor(
    repository: SchedulesRepository,
    private scheduleUtil: ScheduleUtil,
  ) {
    super(repository);
  }
  async onModuleInit() {
    await this.loadSchedules();
  }
  async store(params: {
    job: JobSchedule['job'];
    time: JobSchedule['time'];
    content: JobSchedule[`content`];
    scheduled: JobSchedule['scheduled'];
    adminId: Admin[`id`];
  }) {
    const { job, time, content, scheduled, adminId } = params;

    // call repository layer
    try {
      const schedule = await this.repository.store({
        data: {
          job,
          time,
          content,
          scheduled,
          Admin: {
            connect: {
              id: adminId,
            },
          },
        },
      });
      await this.loadSchedules();
      return schedule;
    } catch (e) {
      throw e;
    }
    // do other things in the service layer... e.g. send email
  }

  async get() {
    const schedules = await this.repository.get({});
    return schedules;
  }
  async delete(id: string) {
    const deletedData = await this.repository.delete({
      where: { id: Number(id) },
    });
    await this.stopSchedule(Number(id));
    return deletedData;
  }
  async loadSchedules() {
    try {
      const schedules = await this.repository.get({});
      if (schedules.length > 0) {
        for (var schedule of schedules) {
          const job = await this.scheduleUtil.handle(
            schedule.time,
            schedule.job,
            schedule.scheduled,
            schedule.id,
            schedule.content
          );
          console.log('Load job:::', schedule.job);
          await ScheduleUtil.manager.start(schedule.id.toString());
        }
      }
    } catch (error) {
      throw error;
    }
    return;
  }
  async stopSchedule(jobId: number) {
    try {
      await ScheduleUtil.manager.stop(jobId.toString());
    } catch (error) {
      throw error;
    }
  }
}
