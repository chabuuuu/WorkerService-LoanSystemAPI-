import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
  } from '@nestjs/common';
  import { MornitorService } from 'src/services/mornitor.service';
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
      return this.syncService.syncDB(null);
    }
  }
  