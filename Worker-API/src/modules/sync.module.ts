import { Module } from '@nestjs/common';
import { MornitorRepository } from '../repositories/mornitor.repository';
import { MornitorService } from '../services/mornitor.service';
import { PrismaModule } from 'src/modules/prisma.module';
import { SyncRepository } from 'src/repositories/sync.repository';
import { SyncService } from 'src/services/sync.service';
import { RedisModule } from './redis.module';
import { AdminsModule } from './admins.module';
import { MornitorModule } from './mornitor.module';
import { SchedulesModule } from './schedules.module';
import { SyncController } from 'src/controllers/sync.controller';

@Module({
    providers: [SyncRepository, SyncService],
    imports: [PrismaModule, RedisModule, AdminsModule, MornitorModule],
    exports: [SyncService],
    controllers: [SyncController],
})
export class SyncModule {}
