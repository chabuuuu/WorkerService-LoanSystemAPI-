// import { Inject, Injectable } from '@nestjs/common';
// import {  SyncLog } from '@prisma/client';
// import { SyncRepository } from 'src/repositories/sync.repository';
// import { RedisService } from './redis.service';
// import { AdminRepository } from 'src/repositories/admins.repository';
// import { SchedulesRepository } from 'src/repositories/schedules.repository';
// import { MornitorRepository } from 'src/repositories/mornitor.repository';

// @Injectable()
// export class SyncService {
//     constructor(
//         @Inject(RedisService) private readonly redisService: RedisService) {
//     }
//     async createSyncLog(params: {schedule_id: SyncLog['schedule_id'],
//     status: SyncLog['status'], type: SyncLog['type'], count: SyncLog['count'], }) {
//         const { schedule_id, status, type, count } = params;
//         // call repository layer
//         try {
//             const test = this.repository as MornitorRepository
//             const syncLog = await this.repository.create({data:{
//                 schedule_id,status, type, count
//             }});
//               return syncLog;
//         } catch (e) {
//               throw e
//         }
//         // do other things in the service layer... e.g. send email
//       }
//     async getSyncLog() {
//         const log = await this.repository.get({});
//         return log;
//     }
//   async syncDB(schedule_id: number){
//    try {

//    } catch (error) {
//     throw error
//    }
//     }
//     async deleteMornitorLog(id: number) {
//         try {
//             const logDeletedCount = await this.repository.delete({
//                 where: {id: id}
//             });
//             return {status: "deleted", count: logDeletedCount}
//         } catch (error) {
//             throw error
//         }

//     }
// }
