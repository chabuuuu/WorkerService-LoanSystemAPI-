import { ApiProperty } from '@nestjs/swagger';

export class AdminLoginDTO {
    //id: Admin['id'];
    @ApiProperty()
    username: string;
    @ApiProperty()
    password: string;
  }