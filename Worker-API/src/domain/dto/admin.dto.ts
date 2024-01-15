import { ApiProperty } from '@nestjs/swagger';

export class AdminDTO {
    //id: Admin['id'];
    @ApiProperty()
    username: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    fullname: string;
    @ApiProperty() 
    phone_number: string;
    @ApiProperty() 
    address: string;
  }