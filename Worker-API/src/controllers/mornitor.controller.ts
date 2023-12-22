import { Body, Controller, Delete, Get, Param } from '@nestjs/common';
import { MornitorService } from 'src/services/mornitor.service';

@Controller()
export class MornitorController {
  constructor(private readonly mornitorService: MornitorService) {}
  //GET api/v1/mornitor
  @Get()
  getMornitor() {
    return this.mornitorService.getMornitorLog();
  }
  @Delete(':id')
  deleteMornitor(@Param('id') id: string) {
    return this.mornitorService.deleteMornitorLog(Number(id));
  }
}
