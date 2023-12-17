import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AdminRepository } from '../repositories/admins.repository';
import { PrismaModule } from 'src/modules/prisma.module';
import { AdminsService } from '../services/admin.service';
import { AdminController } from 'src/controllers/admin.controller';
import { RedisModule } from './redis.module';
import { NextFunction } from 'express';
import { authenticateJWT } from 'src/utils/jwtAuthenticate';

@Module({
  providers: [AdminRepository, AdminsService],
  imports: [PrismaModule, RedisModule],
  exports: [AdminsService, AdminRepository],
  controllers: [AdminController],
})
export class AdminsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(authenticateJWT).exclude(
        {path: 'api/v1/admin', method: RequestMethod.POST},
        {path: 'api/v1/admin/login', method: RequestMethod.POST},
      ).forRoutes(AdminController)
  }
}
