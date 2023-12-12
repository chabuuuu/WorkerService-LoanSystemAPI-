import { Injectable } from '@nestjs/common';
import { Admin, Prisma } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class AdminRepository {
    constructor(private prisma: PrismaService) {}
    async createAdmin(params: { data: Prisma.AdminCreateInput }): Promise<Admin> {
        const { data } = params;
        return this.prisma.admin.create({ data });
      }
    
      async getAdmins(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.AdminWhereUniqueInput;
        where?: Prisma.AdminWhereInput;
        orderBy?: Prisma.AdminOrderByWithRelationInput;
      }): Promise<Admin[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.admin.findMany({ skip, take, cursor, where, orderBy });
      }
    
      async updateAdmin(params: {
        where: Prisma.AdminWhereUniqueInput;
        data: Prisma.AdminUpdateInput;
      }): Promise<Admin> {
        const { where, data } = params;
        return this.prisma.admin.update({ where, data });
      }
    
      async deleteAdmin(params: {
        where: Prisma.AdminWhereUniqueInput;
      }): Promise<Admin> {
        const { where } = params;
        return this.prisma.admin.delete({ where });
      }
}