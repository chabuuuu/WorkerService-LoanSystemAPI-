import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessageService } from '../services/pubsub/post.service';

@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) { }

  @Post('send')
  async postMsg(@Body() body): Promise<string> {
    return this.messageService.postMsg(body);
  }
  @Get()
  getMessage (): Promise<any>{
    return this.messageService.get({});
  }
    
  }
