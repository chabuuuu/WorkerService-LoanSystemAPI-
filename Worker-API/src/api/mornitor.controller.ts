import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { MornitorService } from 'src/modules/mornitor/mornitor.service';

@Controller('api/v1')
export class MornitorController {
    constructor(private readonly mornitorService: MornitorService) {}

    @Get('mornitor')
    getSchedules() {
      return this.mornitorService.getMornitorLog();
    }
}

