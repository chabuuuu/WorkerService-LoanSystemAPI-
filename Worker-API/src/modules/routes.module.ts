import { Module } from '@nestjs/common';
import { SchedulesModule } from 'src/modules/schedules.module';
import { ScheduleController } from '../controllers/schedule.controller';
import { AdminsModule } from 'src/modules/admins.module';
import { AdminController } from '../controllers/admin.controller';
import { MornitorModule } from 'src/modules/mornitor.module';
import { MornitorController } from '../controllers/mornitor.controller';

@Module({
  imports: [SchedulesModule, AdminsModule, MornitorModule],
  //controllers: [ScheduleController, AdminController, MornitorController],
})
export class RoutesModule {}
