import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Admin, SyncLog } from '@prisma/client';
import { SyncRepository } from 'src/repositories/sync.repository';
import { RedisService } from 'src/services/redis.service';
import { AdminRepository } from 'src/repositories/admins.repository';
import { AdminsService } from 'src/services/admin.service';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class SyncService implements OnModuleInit {
  async onModuleInit() {
    this.syncDB(-1);
  }
  constructor(
    @Inject(RedisService) private readonly redisService: RedisService,
    @Inject(AdminsService) private readonly adminService: AdminsService,
    private prisma: PrismaService,
    private repository: SyncRepository,
  ) {}
  async createSyncLog(params: {
    schedule_id: SyncLog['schedule_id'];
    status: SyncLog['status'];
    type: SyncLog['type'];
    count: SyncLog['count'];
  }) {
    const { schedule_id, status, type, count } = params;
    // call repository layer
    try {
      const syncLog = await this.repository.create({
        data: {
          schedule_id,
          status,
          type,
          count,
        },
      });
      return syncLog;
    } catch (e) {
      throw e;
    }
    // do other things in the service layer... e.g. send email
  }
  async getSyncLog() {
    const log = await this.repository.get({});
    return log;
  }
  async syncDB(schedule_id: number) {
    try {
      const adminRepo = new AdminRepository(this.prisma);
      const adminData: any = await adminRepo.get({});
      console.log(adminData);
      const deleteCount = await this.redisService.deleteAdmin('');
      console.log('deleteCount:::' + deleteCount);
      var count = 0;
      for (var value of adminData) {
        await this.redisService.saveAdmin(value.id.toString(), value);
        count++;
      }
      if (schedule_id > 0) {
        this.createSyncLog({
          schedule_id: schedule_id,
          status: true,
          type: 'redis/admin',
          count: count,
        });
      }
    } catch (error) {
      throw error;
    }
  }
}
