import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Admin, Prisma } from '@prisma/client';
import { AdminRepository } from '../repositories/admins.repository';
import { RedisService } from './redis.service';
import { BaseService } from './base.service';
import { AdminInterface } from 'src/domain/interface/admin.interface';
import { replaceProperties } from 'src/utils/replace-properties';
const jwt = require('jsonwebtoken');

@Injectable()
export class AdminsService extends BaseService<Admin, AdminRepository> {
  constructor(
    repository: AdminRepository,
    @Inject(RedisService) private readonly redisService: RedisService,
  ) {
    super(repository);
  }

  async store(params: AdminInterface): Promise<Admin> {
    try {
      const duplicateAdmins = await this.repository.get({
        where: 
        {
          username: params.username
        }
      })
      if (duplicateAdmins.length > 0){
        throw new HttpException ("Duplicate username", HttpStatus.BAD_REQUEST)
      }
      const admin = await this.repository.store({
        data: params,
      });
      await this.redisService.saveAdmin(admin.id.toString(), admin);
      return admin;
    } catch (e) {
      throw e;
    }
    // do other things in the service layer... e.g. send email
  }

  async get(params: any): Promise<Object> {
    //const admins = await this.repository.get({});

    //console.log(typeof Admin);

    const redis_admins = await this.redisService.getAdmin('');
    return { data: redis_admins, source: 'redis' };
  }
  async update(params: any): Promise<Admin> {
    try {
      //console.log(params);
      const id = params.where.id.toString();
      const adminData = await this.redisService.getAdmin(id);
      replaceProperties(adminData, params.data);
      console.log(adminData);
      await this.redisService.saveAdmin(id, adminData);
      const updatedData = await this.repository.update(params);
      return updatedData;
    } catch (error) {
      throw error;
    }
  }
  async login(params: any): Promise<void> {
    try {
      const result = await this.repository.get({
          where: {
              username: params.data.username,
          },
      });
      if (result.length < 1){
        throw new HttpException("Login failed. Invalid username", HttpStatus.BAD_REQUEST);
      }
      if (result[0].password === params.data.password) {
          const token = jwt.sign(
              { username: params.data.username, password: params.data.password },
              process.env.JWT_SECRET,
              { expiresIn: process.env.JWT_EXPIRES_IN },
          );
          console.log(token);
          return {status: "suscess", username: params.data.username, token: token} as any;
      } else {
          throw new HttpException("Login failed. Invalid password", HttpStatus.BAD_REQUEST);
      }
  } catch (error: any) {
      throw error
  }
    return;
  }
}
