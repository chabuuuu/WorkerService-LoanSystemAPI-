import { Body, Controller, Get, HttpException, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { AdminInterface } from 'src/domain/interface/admin.interface';
import { AdminsService } from 'src/services/admin.service';

@Controller()
export class AdminController {
    constructor(private readonly adminsSercice: AdminsService) {}

    @Post()
    async createAdmin(@Body() data: AdminInterface) {
    try {
        const respond = await this.adminsSercice.store(data);
          return respond;
    } catch (error: any) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    }
  
    @Get()
    getAdmins() {
      return this.adminsSercice.get({});
    }
}

