import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostMessageService } from 'src/services/pubsub/post.service';
@Controller()
export class MessageController {
  constructor(private readonly messageService: PostMessageService) {}

  @Post('send')
  async postMsg(@Body() body): Promise<string> {
    return this.messageService.postMsg(body);
  }
  @Get()
  async getMsg(): Promise<any> {
    return this.messageService.get({});
  }
}
