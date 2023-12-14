import { Injectable } from '@nestjs/common';
import { MornitorService } from 'src/services/mornitor.service';
import { SyncService } from 'src/services/sync.service';
var CronJobManager = require('cron-job-manager')

@Injectable()
export class ScheduleUtil {
  public static manager = new CronJobManager();

  constructor(private mornitorService: MornitorService, 
    private syncService: SyncService) {}
  async getJob(task: string, scheduleId: string) {}
  async handle(
    time: string,
    task: string,
    scheduled,
    scheduleId: number,
  ): Promise<any> {
    const jobSchedule = ScheduleUtil.manager.add(
      scheduleId.toString(),
      time,
      () => {
        switch (task) {
          case 'mornitor':
            this.mornitorService.mornitor(scheduleId);
            break;
          case 'sync':
            this.syncService.syncDB(scheduleId);
          default:
            break;
        }
      },
      { scheduled: scheduled },
    );
    return;
  }
}
