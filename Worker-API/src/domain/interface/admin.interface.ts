import { ApiProperty } from '@nestjs/swagger';
import { Admin } from '@prisma/client';

// export class AdminInterface {
//   //id: Admin['id'];
//   @ApiProperty()
//   username: Admin['username'] | null;
//   @ApiProperty()
//   password: Admin['password'] | null;
//   @ApiProperty()
//   fullname: Admin['fullname' | null];
//   @ApiProperty() 
//   phone_number: Admin['phone_number'] | null;
//   @ApiProperty() 
//   address: Admin['address'] | null;
// }

export class AdminInterface {
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