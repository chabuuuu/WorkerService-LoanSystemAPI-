import { Inject, Injectable } from '@nestjs/common';
import { Admin, Prisma } from '@prisma/client';
import { AdminRepository } from '../repositories/admins.repository';
import { RedisService } from './redis.service';

@Injectable()
export class AdminsService {
    constructor(private repository: AdminRepository,
      @Inject(RedisService) private readonly redisService: RedisService) {}

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
              await this.redisService.saveAdmin(admin.id.toString(), admin);
              return admin;
        } catch (e) {
              throw e
        }    
        // do other things in the service layer... e.g. send email
      }
    
      async getAdmins() {
        //const admins = await this.repository.getAdmins({});
        const redis_admins = await this.redisService.getAdmin("");
        return {data: redis_admins, source: "redis"};
      }
}