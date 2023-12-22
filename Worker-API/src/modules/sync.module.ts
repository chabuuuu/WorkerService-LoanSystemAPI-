import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/modules/prisma.module';
import { SyncRepository } from 'src/repositories/sync.repository';
import { SyncService } from 'src/services/sync.service';
import { RedisModule } from 'src/modules/redis.module';
import { AdminsModule } from 'src/modules/admins.module';
import { MornitorModule } from 'src/modules/mornitor.module';
import { SyncController } from 'src/controllers/sync.controller';

@Module({
  providers: [SyncRepository, SyncService],
  imports: [PrismaModule, RedisModule, AdminsModule, MornitorModule],
  exports: [SyncService],
  controllers: [SyncController],
})
export class SyncModule {}
