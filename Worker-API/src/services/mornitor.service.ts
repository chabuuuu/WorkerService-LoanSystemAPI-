import { Injectable } from '@nestjs/common';
import { MornitorRepository } from '../repositories/mornitor.repository';
import { MornitorLog, Prisma } from '@prisma/client';
import { log } from 'console';
const si = require('systeminformation');
@Injectable()
export class MornitorService {
    constructor(private repository: MornitorRepository) {
    }
    async createMornitorLog(params: {schedule_id: MornitorLog['schedule_id'], 
    status: MornitorLog['status'] }) {
        const { schedule_id, status } = params;
        // call repository layer
        try {
            const mornitorLog = await this.repository.createMornitorLog({data:{
                schedule_id, status,
            }});
              return mornitorLog;
        } catch (e) {
              throw e
        }    
        // do other things in the service layer... e.g. send email
      }
    async getMornitorLog() {
        const log = await this.repository.getMornitorLog({});
        return log;
    }
  async mornitor(schedule_id: number){
    var status = ""
    si.cpuCurrentSpeed().then(async (data) =>{  
        console.log("status:::", data);
        status = JSON.stringify(data);
        try {
            await this.createMornitorLog({schedule_id, status});
        } catch (error) {
            throw error
        } 
    });
}
}