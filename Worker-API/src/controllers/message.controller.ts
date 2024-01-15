import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MessageDTO } from 'src/domain/dto/message/message.dto';
import { PostMessageService } from 'src/services/pubsub/post.service';
@Controller()
export class MessageController {
  constructor(private readonly messageService: PostMessageService) {}
  @ApiTags('Message')
  @ApiOperation({ summary: 'Send message' })
  @Post('send')
  async postMsg(@Body() body: MessageDTO): Promise<string> {
    return this.messageService.postMsg(body);
  }
  @ApiTags('Message')
  @ApiOperation({ summary: 'Get all messages' })
  @Get()
  async getMsg(): Promise<any> {
    return this.messageService.get({});
  }
}
