import { Module } from '@nestjs/common';
import { AdminRepository } from '../repositories/admins.repository';
import { PrismaModule } from 'src/modules/prisma.module';
import { AdminsService } from '../services/admin.service';

@Module({
    providers: [AdminRepository, AdminsService],
    imports: [PrismaModule],
    exports: [AdminsService],
})
export class AdminsModule {}
