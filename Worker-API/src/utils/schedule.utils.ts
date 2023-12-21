import { Injectable } from '@nestjs/common';
import { MessageService } from 'src/services/pubsub/post.service';
import { MornitorService } from 'src/services/mornitor.service';
import { SyncService } from 'src/services/sync.service';
var CronJobManager = require('cron-job-manager');

@Injectable()
export class ScheduleUtil {
  public static manager = new CronJobManager();

  constructor(
    private mornitorService: MornitorService,
    private syncService: SyncService,
    private messageService: MessageService
  ) {}
  async getJob(task: string, scheduleId: string) {}
  async handle(
    time: string,
    task: string,
    scheduled,
    scheduleId: number,
    content: string
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
          case 'backup':
            this.messageService.postMsg({message: content, schedule_id: scheduleId});
          default:
            break;
        }
      },
      { scheduled: scheduled },
    );
    return;
  }
}
