import { Module } from '@nestjs/common';
import { AdminRepository } from '../repositories/admins.repository';
import { PrismaModule } from 'src/modules/prisma.module';
import { AdminsService } from '../services/admin.service';
import { AdminController } from 'src/controllers/admin.controller';

@Module({
    providers: [AdminRepository, AdminsService],
    imports: [PrismaModule],
    exports: [AdminsService],
    controllers: [AdminController],
})
export class AdminsModule {}
