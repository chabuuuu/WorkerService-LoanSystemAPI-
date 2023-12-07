import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { SchedulesModule } from './modules/schedules/schedules.module';
import { ApiModule } from './api/api.module';
import { AdminsModule } from './modules/admins/admins.module';
import { MornitorModule } from './modules/mornitor/mornitor.module';

@Module({
  imports: [PostModule, SchedulesModule, ApiModule, AdminsModule, MornitorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
