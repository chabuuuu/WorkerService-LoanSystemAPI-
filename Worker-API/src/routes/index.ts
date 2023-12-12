import { Module } from '@nestjs/common';
import { SchedulesModule } from '../modules/schedules.module';
import { AdminsModule } from '../modules/admins.module';
import { MornitorModule } from '../modules/mornitor.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    AdminsModule, 
    RouterModule.register([
        {
            path: 'api/v1/admin',
            module: AdminsModule,
        },
    ]
    ),
    SchedulesModule, 
    RouterModule.register([
        {
            path: 'api/v1/schedule',
            module: SchedulesModule,
        },
    ]
    ),
    MornitorModule, 
    RouterModule.register([
        {
            path: 'api/v1/mornitor',
            module: MornitorModule,
        },
    ]
    ),
],
})
export class AppModule {}
