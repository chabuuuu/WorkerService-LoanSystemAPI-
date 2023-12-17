import { Module } from '@nestjs/common';
import { ErrorHandle } from '../utils/error.utils';
import { ScheduleUtil } from '../utils/schedule.utils';
import { MornitorModule } from 'src/modules/mornitor.module';
import { SyncModule } from './sync.module';
import { MessageModule } from './message.module';

@Module({
  imports: [MornitorModule, SyncModule, MessageModule],
  providers: [ErrorHandle, ScheduleUtil],
  exports: [ErrorHandle, ScheduleUtil],
})
export class UtilsModule {}
