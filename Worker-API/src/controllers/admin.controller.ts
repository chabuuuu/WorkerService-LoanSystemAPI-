import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AdminsService } from 'src/services/admin.service';

@Controller()
export class AdminController {
    constructor(private readonly adminsSercice: AdminsService) {}

    @Post()
    async createAdmin(@Body() data: { 
        username: string, password: string, fullname :string,
         phone_number: string, address: string
    }) {
      const { 
        username, password, fullname, phone_number, address
    } = data;
    try {
        const respond = await this.adminsSercice.createAdmin({
            username, password, fullname, phone_number, address,
          });
          return respond;
    } catch (error: any) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    }
  
    @Get()
    getSchedules() {
      return this.adminsSercice.getAdmins();
    }
}

