import { Admin } from '@prisma/client';

export interface AdminInterface {
  //id: Admin['id'];
  username: Admin['username'] | null;
  password: Admin['password'] | null;
  fullname: Admin['fullname' | null];
  phone_number: Admin['phone_number'] | null;
  address: Admin['address'] | null;
}
