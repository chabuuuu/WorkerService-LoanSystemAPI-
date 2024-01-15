import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ScheduleDTO } from 'src/domain/dto/schedule/schedule.dto';
import { SchedulesService } from 'src/services/schedules.service';

@Controller()
export class ScheduleController {
  constructor(private readonly schedulesService: SchedulesService) {}
  //POST api/v1/schedule
  @ApiTags('Schedule')
  @ApiOperation({ summary: 'Create new schedule' })
  @Post()
  @ApiBearerAuth('JWT-auth')// This is the one that needs to match the name in main.ts
  async createSchedule(
    @Body()
    data: ScheduleDTO,
  ) {
    const { job, time, content, scheduled, adminId } = data;
    try {
      const respond = await this.schedulesService.store({
        job,
        time,
        content,
        scheduled: Boolean(scheduled),
        adminId: Number(adminId),
      });
      return respond;
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  //GET api/v1/schedule
  @ApiTags('Schedule')
  @ApiOperation({ summary: 'Get all schedule available' })
  @Get()
  @ApiBearerAuth('JWT-auth')// This is the one that needs to match the name in main.ts
  getSchedules() {
    return this.schedulesService.get();
  }
  //Delete api/v1/schedule
  @ApiTags('Schedule')
  @ApiOperation({ summary: 'Delete schedule available with ID' })
  @Delete(':id')
  @ApiBearerAuth('JWT-auth')// This is the one that needs to match the name in main.ts
  async deleteSchedule(@Param('id') id: string) {
    return await this.schedulesService.delete(id);
  }
}
