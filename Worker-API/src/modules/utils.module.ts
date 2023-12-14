import { Module } from '@nestjs/common';
import { ErrorHandle } from '../utils/error.utils';
import { ScheduleUtil } from '../utils/schedule.utils';
import { MornitorModule } from 'src/modules/mornitor.module';
import { SyncModule } from './sync.module';

@Module({
  imports: [MornitorModule, SyncModule],
  providers: [ErrorHandle, ScheduleUtil],
  exports: [ErrorHandle, ScheduleUtil],
})
export class UtilsModule {}
