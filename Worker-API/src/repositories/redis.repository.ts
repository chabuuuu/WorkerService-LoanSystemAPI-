import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { Redis } from 'ioredis';
import { RedisRepositoryInterface } from 'src/domain/interface/redis.repository.interface';
import { json } from 'stream/consumers';

@Injectable()
export class RedisRepository
  implements OnModuleDestroy, RedisRepositoryInterface
{
  constructor(@Inject('RedisClient') private readonly redisClient: Redis) {}

  onModuleDestroy(): void {
    this.redisClient.disconnect();
  }

  async get(
    prefix: string,
    key: string,
  ): Promise<Object | Array<Object> | null> {
    if (key.length != 0) {
      const data = await this.redisClient.get(`${prefix}:${key}`);
      return JSON.parse(data);
    }

    const keys = await this.redisClient.keys('*');
    console.log(keys);
    var resArr: Array<Object> = new Array<Object>();
    for (var key of keys) {
      {
        var value = await this.redisClient.get(key);
        //console.log(value);
        resArr.push(JSON.parse(value));
      }
    }
    console.log(resArr);

    return resArr;
  }

  async set(prefix: string, key: string, value: string): Promise<void> {
    await this.redisClient.set(`${prefix}:${key}`, value);
  }

  async delete(prefix: string, key: string): Promise<void> {
    if (key.length != 0) {
      const respond: any = await this.redisClient.del(`${prefix}:${key}`);
      return respond;
    }

    const keys = await this.redisClient.keys(`${prefix}:*`);
    console.log(keys);
    var resArr: Array<Object> = new Array<Object>();
    let count: any = 0;
    for (var deleteKey of keys) {
      {
        await this.redisClient.del(deleteKey);
        count++;
      }
    }
    console.log(resArr);
    return count;
  }

  async setWithExpiry(
    prefix: string,
    key: string,
    value: string,
    expiry: number,
  ): Promise<void> {
    await this.redisClient.set(`${prefix}:${key}`, value, 'EX', expiry);
  }
}
