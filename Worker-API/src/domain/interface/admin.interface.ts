import { Admin } from "@prisma/client";

export interface AdminInterface {
    //id: Admin['id'];
    username: Admin['username'];
    password      : Admin['password'];
    fullname      : Admin['fullname'];
    phone_number  : Admin['phone_number'];
    address       : Admin['address'];
}