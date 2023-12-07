import { Injectable } from '@nestjs/common';
import { MornitorService } from 'src/modules/mornitor/mornitor.service';
// import cron from 'node-cron'
var cron = require('node-cron');

@Injectable()
export class ScheduleUtil {
constructor(private mornitorService: MornitorService){}
  async getJob(task :string, scheduleId :string){

  }
  async handle (time: string, task: string, scheduled, scheduleId: number): Promise<any>{
    const jobSchedule = cron.schedule(time,()=>{
        switch (task) {
            case 'mornitor':
                this.mornitorService.mornitor(scheduleId)
                break;
        
            default:
                break;
        }
    }, {scheduled:scheduled})
    return jobSchedule;
  }
}