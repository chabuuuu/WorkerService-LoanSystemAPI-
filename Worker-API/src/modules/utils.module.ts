import { Module } from '@nestjs/common';
import { ErrorHandle } from '../utils/error.utils';
import { ScheduleUtil } from '../utils/schedule.utils';
import { MornitorModule } from 'src/modules/mornitor.module'

@Module({
  imports: [MornitorModule],
  providers: [ErrorHandle, ScheduleUtil],
  exports: [ErrorHandle, ScheduleUtil],
})
export class UtilsModule {}