import { Module } from '@nestjs/common';
import { SchedulesModule } from 'src/modules/schedules.module';
import { AdminsModule } from 'src/modules/admins.module';
import { MornitorModule } from 'src/modules/mornitor.module';

@Module({
  imports: [SchedulesModule, AdminsModule, MornitorModule],
})
export class RoutesModule {}
