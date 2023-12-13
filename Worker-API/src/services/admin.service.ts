import { Inject, Injectable } from '@nestjs/common';
import { Admin, Prisma } from '@prisma/client';
import { AdminRepository } from '../repositories/admins.repository';
import { RedisService } from './redis.service';
import { BaseService } from './base.service';
import { AdminInterface } from 'src/domain/interface/admin.interface';

@Injectable()
export class AdminsService extends BaseService<Admin, AdminRepository> {
    constructor(
      repository: AdminRepository,
      @Inject(RedisService) private readonly redisService: RedisService) {
        super(repository)
      }

    async store(params: AdminInterface) : Promise<Admin>
     {
        try {
            const admin = await this.repository.store({
                data: params
              });
              await this.redisService.saveAdmin(admin.id.toString(), admin);
              return admin;
        } catch (e) {
              throw e
        }    
        // do other things in the service layer... e.g. send email
      }
    
      async get(params: any) : Promise<Object> {
        //const admins = await this.repository.get({});
        
        //console.log(typeof Admin);
        
        const redis_admins = await this.redisService.getAdmin("");
        return {data: redis_admins, source: "redis"};
      }
}