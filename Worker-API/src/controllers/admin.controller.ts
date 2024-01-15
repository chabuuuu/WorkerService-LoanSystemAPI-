import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AdminInterface } from 'src/domain/interface/admin.interface';
import { AdminsService } from 'src/services/admin.service';
import { adminSchema } from 'src/schema/admin.schema';
import { validatorFactory } from 'src/utils/validator';
import { compress, decompress } from 'compress-json';
import { ApiBasicAuth, ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminDTO } from 'src/domain/dto/admin.dto';
import { AdminLoginDTO } from 'src/domain/dto/admin_login.dto';

@Controller()
export class AdminController {
  constructor(private readonly adminsSercice: AdminsService) {}
  @ApiTags('Admin')
  @ApiOperation({ summary: 'Create new admin' })
  @Post()
  async createAdmin(@Body() data: AdminDTO) {
    try {
      const newAdminSchema = adminSchema;
      newAdminSchema.required = ['username', 'password', 'fullname'];
      const validateAdmin = validatorFactory(newAdminSchema);
      const validatedData: AdminInterface = validateAdmin.verify(data);
      console.log(validatedData);

      const respond = await this.adminsSercice.store(validatedData);
      return respond;
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  @ApiTags('Admin')
  @ApiOperation({ summary: 'Get admin list' })
  @Get('')
  @ApiBearerAuth('JWT-auth')// This is the one that needs to match the name in main.ts
  async getAdmins() {
    const respond = await this.adminsSercice.get({});
    // let compressed = compress(respond)
    // const decom = decompress(compressed)
    // console.log("decompress:::" + JSON.stringify(decom));
    console.log('respond::' + respond);
    let compressed = JSON.stringify(compress(respond));
    return respond;
  }
  @ApiTags('Admin')
  @ApiOperation({ summary: 'Update Admin With ID' })
  @Put(':id')
  @ApiBearerAuth('JWT-auth')// This is the one that needs to match the name in main.ts

  updateAdmins(@Param('id') id: string, @Body() data: AdminDTO) {
    try {
      const putAdminSchema = adminSchema;
      const validateAdmin = validatorFactory(putAdminSchema);
      const validatedData: AdminInterface = validateAdmin.verify(data);
      const respond = this.adminsSercice.update({
        where: { id: Number(id) },
        data: data,
      });
      return respond;
    } catch (error) {
      throw error;
    }
  }
  @ApiTags('Admin')
  @ApiOperation({ summary: 'Delete Admin With ID' })
  @Delete(':id')
  @ApiBearerAuth('JWT-auth')// This is the one that needs to match the name in main.ts

  deleteAdmins(@Param('id') id: string) {
    try {
      const respond = this.adminsSercice.delete({
        where: { id: Number(id) },
      });
      return respond;
    } catch (error) {
      throw error;
    }
  }
  @ApiTags('Admin')
  @ApiOperation({ summary: 'GET JWT Token' })
  @Post('login')
  loginAdmin(@Body() data: AdminLoginDTO) {
    try {
      const respond = this.adminsSercice.login({ data: data });
      return respond;
    } catch (error) {
      throw error;
    }
  }
}
