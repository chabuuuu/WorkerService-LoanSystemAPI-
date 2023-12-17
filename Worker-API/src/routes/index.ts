import { Module } from '@nestjs/common';
import { SchedulesModule } from '../modules/schedules.module';
import { AdminsModule } from '../modules/admins.module';
import { MornitorModule } from '../modules/mornitor.module';
import { RouterModule } from '@nestjs/core';
import { SyncModule } from 'src/modules/sync.module';
import { MessageModule } from 'src/modules/message.module';

@Module({
  imports: [
    AdminsModule,
    RouterModule.register([
      {
        path: 'api/v1/admin',
        module: AdminsModule,
      },
    ]),
    SchedulesModule,
    RouterModule.register([
      {
        path: 'api/v1/schedule',
        module: SchedulesModule,
      },
    ]),
    MornitorModule,
    RouterModule.register([
      {
        path: 'api/v1/mornitor',
        module: MornitorModule,
      },
    ]),
    SyncModule,
    RouterModule.register([
      {
        path: 'api/v1/sync',
        module: SyncModule,
      },
    ]),
    MessageModule,
    RouterModule.register([
      {
        path: 'api/v1/message',
        module: MessageModule,
      },
    ]),
  ],
})
export class AppModule {}
