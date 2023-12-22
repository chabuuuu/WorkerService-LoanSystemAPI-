import { Controller, Get } from '@nestjs/common';
import { SyncService } from 'src/services/sync.service';

@Controller()
export class SyncController {
  constructor(private readonly syncService: SyncService) {}
  //GET api/v1/mornitor
  @Get()
  getSync() {
    return this.syncService.getSyncLog();
  }
  @Get('start')
  startSync() {
    return this.syncService.syncDB(20);
  }
}
