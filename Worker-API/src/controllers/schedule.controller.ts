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
import { SchedulesService } from 'src/services/schedules.service';

@Controller()
export class ScheduleController {
  constructor(private readonly schedulesSercice: SchedulesService) {}
  //POST api/v1/schedule
  @Post()
  async createSchedule(
    @Body()
    data: {
      job: string;
      time: string;
      scheduled: boolean;
      content: string;
      adminId: string;
    },
  ) {
    const { job, time, content, scheduled, adminId } = data;
    try {
      const respond = await this.schedulesSercice.createSchedule({
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
  @Get()
  getSchedules() {
    return this.schedulesSercice.getSchedules();
  }
  //Delete api/v1/schedule
  @Delete(':id')
  deleteSchedule(@Param('id') id: string) {
    return this.schedulesSercice.deleteSchedule(id);
  }
}
