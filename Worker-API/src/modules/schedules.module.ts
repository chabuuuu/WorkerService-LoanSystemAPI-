import { Module } from '@nestjs/common';
import { SchedulesRepository } from '../repositories/schedules.repository';
import { PrismaModule } from 'src/modules/prisma.module';
import { SchedulesService } from '../services/schedules.service';
import { UtilsModule } from 'src/modules/utils.module';
import { ScheduleController } from 'src/controllers/schedule.controller';

@Module({
    providers: [SchedulesRepository, SchedulesService],
    imports: [PrismaModule, UtilsModule],
    exports: [SchedulesService],
    controllers: [ScheduleController],
})
export class SchedulesModule {}
