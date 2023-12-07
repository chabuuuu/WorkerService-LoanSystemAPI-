import { Module } from '@nestjs/common';
import { MornitorRepository } from './mornitor.repository';
import { MornitorService } from './mornitor.service';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
    providers: [MornitorRepository, MornitorService],
    imports: [PrismaModule],
    exports: [MornitorService],
})
export class MornitorModule {}
