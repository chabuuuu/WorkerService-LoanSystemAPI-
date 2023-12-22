import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SchedulesRepository } from 'src/repositories/schedules.repository';
import { PrismaModule } from 'src/modules/prisma.module';
import { SchedulesService } from 'src/services/schedules.service';
import { UtilsModule } from 'src/modules/utils.module';
import { ScheduleController } from 'src/controllers/schedule.controller';
import { authenticateJWT } from 'src/utils/jwtAuthenticate';
import { MessageModule } from 'src/modules/message.module';

@Module({
  providers: [SchedulesRepository, SchedulesService],
  imports: [PrismaModule, UtilsModule, MessageModule],
  exports: [SchedulesService],
  controllers: [ScheduleController],
})
export class SchedulesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(authenticateJWT).forRoutes(ScheduleController);
  }
}
