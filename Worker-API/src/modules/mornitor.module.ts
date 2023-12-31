import { Module } from '@nestjs/common';
import { MornitorRepository } from 'src/repositories/mornitor.repository';
import { MornitorService } from 'src/services/mornitor.service';
import { PrismaModule } from 'src/modules/prisma.module';
import { MornitorController } from 'src/controllers/mornitor.controller';

@Module({
  providers: [MornitorRepository, MornitorService],
  imports: [PrismaModule],
  exports: [MornitorService],
  controllers: [MornitorController],
})
export class MornitorModule {}
