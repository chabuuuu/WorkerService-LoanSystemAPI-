import { Injectable } from '@nestjs/common';
import { MornitorRepository } from 'src/repositories/mornitor.repository';
import { MornitorLog, Prisma } from '@prisma/client';
import { TeleBot } from 'src/utils/teleBot';
const si = require('systeminformation');
@Injectable()
export class MornitorService {
  constructor(private repository: MornitorRepository) {}
  async createMornitorLog(params: {
    schedule_id: MornitorLog['schedule_id'];
    status: MornitorLog['status'];
  }) {
    const { schedule_id, status } = params;
    // call repository layer
    try {
      const mornitorLog = await this.repository.createMornitorLog({
        data: {
          schedule_id,
          status,
        },
      });
      return mornitorLog;
    } catch (e) {
      throw e;
    }
    // do other things in the service layer... e.g. send email
  }
  async getMornitorLog() {
    const log = await this.repository.get({});
    return log;
  }
  async mornitor(schedule_id: number) {
    var status = '';
    si.cpuCurrentSpeed().then(async (data) => {
      console.log(data);
      status = JSON.stringify(data);
      const message = `
      status:\n 
      min: ${data.min}\n
      max: ${data.max}\n
      avg: ${data.avg}\n
      cores: ${data.cores.toString()}`;
      TeleBot.bot.sendMessage(process.env.TELE_CHAT_ID, message);
      try {
        await this.createMornitorLog({ schedule_id, status });
      } catch (error) {
        throw error;
      }
    });
  }
  async deleteMornitorLog(id: number) {
    try {
      const logDeletedCount = await this.repository.deleteMornitorLog({
        where: { id: id },
      });
      return { status: 'deleted', count: logDeletedCount };
    } catch (error) {
      throw error;
    }
  }
}
