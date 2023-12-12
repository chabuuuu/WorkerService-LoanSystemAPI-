import { Module } from '@nestjs/common';
import { MornitorRepository } from '../repositories/mornitor.repository';
import { MornitorService } from '../services/mornitor.service';
import { PrismaModule } from 'src/modules/prisma.module';

@Module({
    providers: [MornitorRepository, MornitorService],
    imports: [PrismaModule],
    exports: [MornitorService],
})
export class MornitorModule {}
