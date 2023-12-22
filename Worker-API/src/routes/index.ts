import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SchedulesModule } from '../modules/schedules.module';
import { AdminsModule } from '../modules/admins.module';
import { MornitorModule } from '../modules/mornitor.module';
import { RouterModule } from '@nestjs/core';
import { SyncModule } from 'src/modules/sync.module';
import { MessageModule } from 'src/modules/message.module';
import { ConfigModule } from '@nestjs/config';
import { TeleBot } from 'src/utils/teleBot';
const teleBot = new TeleBot();
const main_route = 'api/v1';
@Module({
  imports: [
    ConfigModule.forRoot(),
    AdminsModule,
    RouterModule.register([
      {
        path: `${main_route}/admin`,
        module: AdminsModule,
      },
    ]),
    SchedulesModule,
    RouterModule.register([
      {
        path: `${main_route}/schedule`,
        module: SchedulesModule,
      },
    ]),
    MornitorModule,
    RouterModule.register([
      {
        path: `${main_route}/mornitor`,
        module: MornitorModule,
      },
    ]),
    SyncModule,
    RouterModule.register([
      {
        path: `${main_route}/sync`,
        module: SyncModule,
      },
    ]),
    MessageModule,
    RouterModule.register([
      {
        path: `${main_route}/message`,
        module: MessageModule,
      },
    ]),
  ],
})
export class AppModule {}
