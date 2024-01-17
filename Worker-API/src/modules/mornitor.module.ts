import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MornitorRepository } from 'src/repositories/mornitor.repository';
import { MornitorService } from 'src/services/mornitor.service';
import { PrismaModule } from 'src/modules/prisma.module';
import { MornitorController } from 'src/controllers/mornitor.controller';
import { corsOptions } from 'src/utils/cors.util';
const cors = require('cors');
@Module({
  providers: [MornitorRepository, MornitorService],
  imports: [PrismaModule],
  exports: [MornitorService],
  controllers: [MornitorController],
})
export class MornitorModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors(corsOptions)).forRoutes(MornitorController);
  }
}
