import { Body, Controller, Post } from '@nestjs/common';
import { PostService } from './post.service';
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('msg')
  async postMsg(@Body() body): Promise<string> {
    return this.postService.postMsg(body);
  }
}
