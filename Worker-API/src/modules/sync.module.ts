// import { Module } from '@nestjs/common';
// import { MornitorRepository } from '../repositories/mornitor.repository';
// import { MornitorService } from '../services/mornitor.service';
// import { PrismaModule } from 'src/modules/prisma.module';
// import { MornitorController } from 'src/controllers/mornitor.controller';
// import { SyncRepository } from 'src/repositories/sync.repository';
// import { SyncService } from 'src/services/sync.service';
// import { RedisModule } from './redis.module';
// import { AdminsModule } from './admins.module';
// import { MornitorModule } from './mornitor.module';
// import { SchedulesModule } from './schedules.module';

// @Module({
//     providers: [SyncRepository, SyncService],
//     imports: [PrismaModule, RedisModule, AdminsModule, MornitorModule, SchedulesModule],
//     exports: [SyncService],
//     controllers: [MornitorController],
// })
// export class SyncModule {}
