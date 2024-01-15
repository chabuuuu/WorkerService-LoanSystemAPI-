import { Body, Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MornitorService } from 'src/services/mornitor.service';

@Controller()
export class MornitorController {
  constructor(private readonly mornitorService: MornitorService) {}
  //GET api/v1/mornitor
  @ApiTags('Mornitor Log')
  @ApiOperation({ summary: 'Get all mornitor logs' })
  @Get()
  getMornitor() {
    return this.mornitorService.getMornitorLog();
  }
  @ApiTags('Mornitor Log')
  @ApiOperation({ summary: 'Delete mornitor log with id, set ID = -1 will delete all' })
  @Delete(':id')
  deleteMornitor(@Param('id') id: string) {
    return this.mornitorService.deleteMornitorLog(Number(id));
  }
}
