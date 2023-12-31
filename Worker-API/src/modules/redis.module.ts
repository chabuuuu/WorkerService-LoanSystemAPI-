import { Module } from '@nestjs/common';
import { RedisService } from 'src/services/redis.service';
import { redisClientFactory } from 'src/redis/redis.client';
import { RedisRepository } from 'src/repositories/redis.repository';
import { PrismaModule } from 'src/modules/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [redisClientFactory, RedisRepository, RedisService],

  exports: [RedisService],
})
export class RedisModule {}
