import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { MessageLog } from '@prisma/client';
import { MessageRepository } from 'src/repositories/message.repository';
import { scheduled } from 'rxjs';
const amqplib = require('amqplib');
import { rabbitmq_config } from 'src/configs/config.rabbitmq';

@Injectable()
export class MessageService extends BaseService<MessageLog, MessageRepository> {
  amqp_url_cloud = process.env.RABBITMQ_CLOUD;
  amqp_url_docker = process.env.RABBITMQ_DOCKER;
  connectionString = rabbitmq_config.connectionString
  constructor(repository: MessageRepository){
    super(repository);
  }
  async postMsg(body: any): Promise<any> {
    console.log("connect string:::" + this.connectionString);
    
    const msg = body.message;
    console.log(msg);
    
    const schedule_id = body.schedule_id;
    try {
      //1. create connect
      const conn = await amqplib.connect(this.connectionString);
      //2. create chanel
      const chanel = await conn.createChannel();
      //3. create exchange
      const nameExchange = 'backup';
      await chanel.assertExchange(nameExchange, 'fanout', {
        durable: false,
      });
      //4. publish video
      await chanel.publish(nameExchange, '', Buffer.from(msg));
      console.log('Send OK');

      // 1. gui faild => tu dong gui.
      // 2 co nhieu consumer 
      // 3 gui object, arrray, file.

      setTimeout(() => {
        conn.close();
        //process.exit(0);
      }, 2000);
      const saveLog = await super.store({data: {schedule_id: Number(schedule_id), content: msg, name_exchange: nameExchange}})
      return saveLog;
    } catch (error) {
      console.log(error.message);
    }
  }
}
