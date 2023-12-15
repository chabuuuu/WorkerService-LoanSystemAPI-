import { Module } from '@nestjs/common';
import { MessageController } from '../controllers/message.controller';
import { MessageService} from '../services/message.service';
import { MessageRepository } from 'src/repositories/message.repository';
import { PrismaModule } from './prisma.module';

@Module({
  controllers: [MessageController],
  providers: [MessageService, MessageRepository],
  exports: [MessageService],
  imports: [PrismaModule]
})
export class MessageModule {}
