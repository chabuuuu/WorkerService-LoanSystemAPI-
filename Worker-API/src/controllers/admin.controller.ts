import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { AdminInterface } from 'src/domain/interface/admin.interface';
import { AdminsService } from 'src/services/admin.service';
import { adminSchema } from 'src/schema/admin.schema';
import { validatorFactory } from 'src/utils/validator';
import { compress, decompress } from 'compress-json'

@Controller()
export class AdminController {
  constructor(private readonly adminsSercice: AdminsService) {}

  @Post()
  async createAdmin(@Body() data: AdminInterface) {
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

  @Get('')
  async getAdmins() {
    const respond = await this.adminsSercice.get({});
    // let compressed = compress(respond)
    // const decom = decompress(compressed)
    // console.log("decompress:::" + JSON.stringify(decom));
    console.log("respond::" + respond);
    let compressed = JSON.stringify(compress(respond))
    return respond
  }
  @Put(':id')
  updateAdmins(@Param('id') id: string, @Body() data: AdminInterface) {
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
  @Post('login')
  loginAdmin(@Body() data: AdminInterface) {
    try {
      const respond = this.adminsSercice.login({data: data});
      return respond;
    } catch (error) {
      throw error;
    }
  }
}
