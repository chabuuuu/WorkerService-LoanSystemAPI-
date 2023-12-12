import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { SchedulesModule } from './modules/schedules.module';
import { ControllersModule } from './modules/controllers.module';
import { AdminsModule } from './modules/admins.module';
import { MornitorModule } from './modules/mornitor.module';

@Module({
  imports: [PostModule, SchedulesModule, ControllersModule, AdminsModule, MornitorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
