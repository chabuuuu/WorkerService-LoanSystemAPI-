import { Injectable } from '@nestjs/common';
import { JobSchedule, Prisma } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class SchedulesRepository {
    constructor(private prisma: PrismaService) {}
    async createSchedule(params: { data: Prisma.JobScheduleCreateInput }): Promise<JobSchedule> {
        const { data } = params;
        return this.prisma.jobSchedule.create({ data });
      }
    
      async get(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.JobScheduleWhereUniqueInput;
        where?: Prisma.JobScheduleWhereInput;
        orderBy?: Prisma.JobScheduleOrderByWithRelationInput;
      }): Promise<JobSchedule[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.jobSchedule.findMany({ skip, take, cursor, where, orderBy });
      }
    
      async updateSchedule(params: {
        where: Prisma.JobScheduleWhereUniqueInput;
        data: Prisma.JobScheduleUpdateInput;
      }): Promise<JobSchedule> {
        const { where, data } = params;
        return this.prisma.jobSchedule.update({ where, data });
      }
    
      async deleteSchedule(params: {
        where: Prisma.JobScheduleWhereUniqueInput;
      }): Promise<JobSchedule> {
        const { where } = params;
        return this.prisma.jobSchedule.delete({ where });
      }
}