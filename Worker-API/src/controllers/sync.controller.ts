import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SyncService } from 'src/services/sync.service';

@Controller()
export class SyncController {
  constructor(private readonly syncService: SyncService) {}
  //GET api/v1/mornitor
  @ApiTags('Sync Database Log')
  @ApiOperation({ summary: 'Get sync log' })
  @Get()
  getSync() {
    return this.syncService.getSyncLog();
  }
  @ApiTags('Sync Database Log')
  @ApiOperation({ summary: 'Get sync log' })
  @Get('start')
  startSync() {
    return this.syncService.syncDB(20);
  }
}
