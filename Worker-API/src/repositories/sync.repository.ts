import { Injectable } from '@nestjs/common';
import { Prisma, SyncLog } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service'

@Injectable()
export class SyncRepository {
    constructor(private prisma: PrismaService) {}
    async create(params: { data: Prisma.SyncLogCreateInput }): Promise<SyncLog> {
        const { data } = params;
        return this.prisma.syncLog.create({ data });
      }
    
      async get(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.SyncLogWhereUniqueInput;
        where?: Prisma.SyncLogWhereInput;
        orderBy?: Prisma.SyncLogOrderByWithRelationInput;
      }): Promise<SyncLog[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.syncLog.findMany({ skip, take, cursor, where, orderBy });
      }
    
      async delete(params: {
        where: Prisma.SyncLogWhereUniqueInput;
      }): Promise<number> {
        const { where } = params;
        if (where.id == -1){
          const respond = await this.prisma.syncLog.deleteMany({});
          return respond.count;
        }
        const respond = await this.prisma.syncLog.deleteMany({ where });
        return respond.count;
      }
}