import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { MessageLog } from '@prisma/client';
import { MessageRepository } from 'src/repositories/message.repository';
import { scheduled } from 'rxjs';
const amqplib = require('amqplib');
import { rabbitmq_config } from 'src/configs/config.rabbitmq';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

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
    let tryCouner = 0;
    while(tryCouner < 10){
      try {
        //1. create connect
        const conn = await amqplib.connect(this.connectionString);
        //2. create chanel
        const chanel = await conn.createChannel();
        //3. create exchange
        const nameExchange = body.nameExchange;
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
        if (schedule_id != -1){
          const saveLog = await super.store({data: {schedule_id: Number(schedule_id), content: msg, name_exchange: nameExchange}})
          return saveLog;
        }
        return {"status": "Send ok"};
      } catch (error) {
        console.log(error.message);
      }
      console.log("Retrying send message after 5s...");
      await new Promise(resolve => setTimeout(resolve, 5000));
      tryCouner++;
    }
    throw new HttpException('Send message failed after try 10 times', HttpStatus.BAD_GATEWAY)
  }

}
