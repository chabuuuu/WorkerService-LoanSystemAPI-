import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MessageController } from 'src/controllers/message.controller';
import { PostMessageService } from 'src/services/pubsub/post.service';
import { MessageRepository } from 'src/repositories/message.repository';
import { PrismaModule } from 'src/modules/prisma.module';
import { corsOptions } from 'src/utils/cors.util';
const cors = require('cors');
@Module({
  controllers: [MessageController],
  providers: [PostMessageService, MessageRepository],
  exports: [PostMessageService],
  imports: [PrismaModule],
})
export class MessageModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cors(corsOptions))
      .forRoutes(MessageController);
  }
}
