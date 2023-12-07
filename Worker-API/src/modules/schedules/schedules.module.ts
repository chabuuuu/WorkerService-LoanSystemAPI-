import { Module } from '@nestjs/common';
import { SchedulesRepository } from './schedules.repository';
import { PrismaModule } from 'src/database/prisma.module';
import { SchedulesService } from './schedules.service';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
    providers: [SchedulesRepository, SchedulesService],
    imports: [PrismaModule, UtilsModule],
    exports: [SchedulesService],
})
export class SchedulesModule {}
