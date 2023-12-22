import { Injectable } from '@nestjs/common';
import { MessageLog, Prisma } from '@prisma/client';
import { IBaseRepository } from 'src/domain/interface/base.repository.interface';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class MessageRepository implements IBaseRepository<MessageLog> {
  constructor(private prisma: PrismaService) {}
  get(params: any): Promise<Object> {
    return this.prisma.messageLog.findMany();
  }
  store(params: { data: Prisma.MessageLogCreateInput }): Promise<MessageLog> {
    const { data } = params;
    return this.prisma.messageLog.create({ data });
  }
  update(params: any): Promise<{
    id: number;
    schedule_id: number;
    content: string;
    name_exchange: string;
    createdAt: Date;
    updatedAt: Date;
    jobScheduleId: number;
  }> {
    throw new Error('Method not implemented.');
  }
  delete(params: any): Promise<{
    id: number;
    schedule_id: number;
    content: string;
    name_exchange: string;
    createdAt: Date;
    updatedAt: Date;
    jobScheduleId: number;
  }> {
    throw new Error('Method not implemented.');
  }
}
