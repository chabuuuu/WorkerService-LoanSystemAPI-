import { Injectable } from '@nestjs/common';
import { SchedulesRepository } from './schedules.repository';
import { Admin, JobSchedule, Prisma } from '@prisma/client';
import { scheduled } from 'rxjs';
import { ScheduleUtil } from 'src/utils/schedule.utils';
import cron from 'node-cron'

@Injectable()
export class SchedulesService {
    static jobMap: Map<string, cron.ScheduledTask>
    constructor(private repository: SchedulesRepository, private scheduleUtil: ScheduleUtil) {
        SchedulesService.jobMap = new Map();
        this.loadSchedules();
    }
    async createSchedule(params: {job: JobSchedule['job'], time: JobSchedule['time'],
     content: JobSchedule[`content`], scheduled: JobSchedule['scheduled']; adminId: Admin[`id`] }) {
        const { job, time, content, scheduled,adminId } = params;
    
        // call repository layer
        try {
            const schedule = await this.repository.createSchedule({
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
              this.loadSchedules();
              return schedule;
        } catch (e) {
              throw e
        }    
        // do other things in the service layer... e.g. send email
      }
    
      async getSchedules() {
        const schedules = await this.repository.getSchedules({});
        return schedules;
      }
      async deleteSchedule(id : string){
        await this.repository.deleteSchedule({
            where: {id: Number(id)},
        })
        this.stopSchedule(Number(id));
        this.loadSchedules();
        return {"message": "Done delete"};
      }
      async loadSchedules(){
        try {
            const schedules = await this.repository.getSchedules({});
            if (schedules.length > 0){
                for (var schedule of schedules) {
                    const job = await this.scheduleUtil.handle(schedule.time, schedule.job, schedule.scheduled, schedule.id);
                    console.log("Load job:::", schedule.job);
                    SchedulesService.jobMap.set(schedule.id.toString(), job);
                    console.log(SchedulesService.jobMap);               
                    job.start();
                }
            }
        } catch (error) {
            throw error;
        }
        return;
      }
      async stopSchedule(jobId: number) {
        const job:cron.ScheduledTask = SchedulesService.jobMap.get(jobId.toString());
        job.stop();
        SchedulesService.jobMap.delete(jobId.toString())
      }
}