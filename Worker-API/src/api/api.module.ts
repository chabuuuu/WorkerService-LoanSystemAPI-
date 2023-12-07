import { Module } from '@nestjs/common';
import { SchedulesModule } from 'src/modules/schedules/schedules.module';
import { ScheduleController } from './schedule.controller';
import { AdminsModule } from 'src/modules/admins/admins.module';
import { AdminController } from './admin.controller';
import { MornitorModule } from 'src/modules/mornitor/mornitor.module';
import { MornitorController } from './mornitor.controller';

@Module({
    imports: [SchedulesModule, AdminsModule, MornitorModule],
    controllers: [ScheduleController, AdminController, MornitorController],
})
export class ApiModule {}
