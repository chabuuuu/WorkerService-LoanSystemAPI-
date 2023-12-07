import { Module } from '@nestjs/common';
import { AdminRepository } from './admins.repository';
import { PrismaModule } from 'src/database/prisma.module';
import { AdminsService } from './admin.service';

@Module({
    providers: [AdminRepository, AdminsService],
    imports: [PrismaModule],
    exports: [AdminsService],
})
export class AdminsModule {}
