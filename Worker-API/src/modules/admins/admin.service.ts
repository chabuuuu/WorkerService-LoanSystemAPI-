import { Injectable } from '@nestjs/common';
import { Admin, Prisma } from '@prisma/client';
import { AdminRepository } from './admins.repository';

@Injectable()
export class AdminsService {
    constructor(private repository: AdminRepository) {}
    async createAdmin(params: {username: Admin['username'], password: Admin['password'],
     fullname: Admin[`fullname`], phone_number: Admin['phone_number'], 
     address: Admin['address'] }) {
        const { username, password, fullname, phone_number, address  } = params;
    
        // call repository layer
        try {
            const admin = await this.repository.createAdmin({
                data: {
                    username, password, fullname, phone_number, address
                },
              });
              return admin;
        } catch (e) {
              throw e
        }    
        // do other things in the service layer... e.g. send email
      }
    
      async getAdmins() {
        const admins = await this.repository.getAdmins({});
        return admins;
      }
}