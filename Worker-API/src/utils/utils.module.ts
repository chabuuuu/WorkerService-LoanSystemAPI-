import { Module } from '@nestjs/common';
import { ErrorHandle } from './error.utils';
import { ScheduleUtil } from './schedule.utils';
import { MornitorModule } from 'src/modules/mornitor/mornitor.module';

@Module({
  imports: [MornitorModule],
  providers: [ErrorHandle, ScheduleUtil],
  exports: [ErrorHandle, ScheduleUtil],
})
export class UtilsModule {}