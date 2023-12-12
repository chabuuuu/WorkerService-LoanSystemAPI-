import { Injectable } from '@nestjs/common';
import { Admin, MornitorLog, Prisma } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service'

@Injectable()
export class MornitorRepository {
    constructor(private prisma: PrismaService) {}
    async createMornitorLog(params: { data: Prisma.MornitorLogCreateInput }): Promise<MornitorLog> {
        const { data } = params;
        return this.prisma.mornitorLog.create({ data });
      }
    
      async getMornitorLog(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.MornitorLogWhereUniqueInput;
        where?: Prisma.MornitorLogWhereInput;
        orderBy?: Prisma.MornitorLogOrderByWithRelationInput;
      }): Promise<MornitorLog[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.mornitorLog.findMany({ skip, take, cursor, where, orderBy });
      }
    
      async deleteMornitorLog(params: {
        where: Prisma.MornitorLogWhereUniqueInput;
      }): Promise<number> {
        const { where } = params;
        if (where.id == -1){
          const respond = await this.prisma.mornitorLog.deleteMany({});
          return respond.count;
        }
        const respond = await this.prisma.mornitorLog.deleteMany({ where });
        return respond.count;
      }
}