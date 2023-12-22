import { Inject, Injectable } from '@nestjs/common';

import { RedisPrefixEnum } from '../domain/enum/redis-prefix-enum';
import { RedisRepository } from 'src/repositories/redis.repository';
import { AdminInterface } from 'src/domain/interface/admin.interface';
const oneDayInSeconds = 60 * 60 * 24;
const tenMinutesInSeconds = 60 * 10;

@Injectable()
export class RedisService {
  constructor(
    @Inject(RedisRepository) private readonly redisRepository: RedisRepository,
    //private repository: AdminRepository | SchedulesRepository | MornitorRepository
  ) {}

  async saveAdmin(
    adminId: string,
    adminData: AdminInterface | Object,
  ): Promise<void> {
    if (adminId.length > 0) {
      // Expiry is set to 1 day
      await this.redisRepository.setWithExpiry(
        RedisPrefixEnum.ADMIN,
        adminId,
        JSON.stringify(adminData),
        oneDayInSeconds,
      );
    }
  }

  async getAdmin(adminId: string): Promise<Object | Array<Object> | null> {
    const admin = await this.redisRepository.get(
      RedisPrefixEnum.ADMIN,
      adminId,
    );
    return admin;
  }
  async deleteAdmin(adminId: string): Promise<void> {
    const count = await this.redisRepository.delete(
      RedisPrefixEnum.ADMIN,
      adminId,
    );
  }

  async saveSchedule(schedule_id: string, token: string): Promise<void> {
    // Expiry is set to 10 minutes
    await this.redisRepository.setWithExpiry(
      RedisPrefixEnum.SCHEDULE,
      token,
      schedule_id,
      tenMinutesInSeconds,
    );
  }

  async getSchedule(token: string): Promise<Object | Array<Object> | null> {
    return await this.redisRepository.get(RedisPrefixEnum.SCHEDULE, token);
  }
}
