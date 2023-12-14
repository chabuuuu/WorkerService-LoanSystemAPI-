import { Injectable } from '@nestjs/common';
import { JobSchedule, Prisma } from '@prisma/client';
import { IBaseRepository } from 'src/domain/interface/base.repository.interface';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class SchedulesRepository implements IBaseRepository<JobSchedule>{
  constructor(private prisma: PrismaService) {}
  async store(params: {
    data: Prisma.JobScheduleCreateInput;
  }): Promise<JobSchedule> {
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
    return this.prisma.jobSchedule.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async update(params: {
    where: Prisma.JobScheduleWhereUniqueInput;
    data: Prisma.JobScheduleUpdateInput;
  }): Promise<JobSchedule> {
    const { where, data } = params;
    return this.prisma.jobSchedule.update({ where, data });
  }

  async delete(params: {
    where: Prisma.JobScheduleWhereUniqueInput;
  }): Promise<JobSchedule> {
    const { where } = params;
    return this.prisma.jobSchedule.delete({ where });
  }
}
