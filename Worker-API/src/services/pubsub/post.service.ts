import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from 'src/services/base.service';
import { MessageLog } from '@prisma/client';
import { MessageRepository } from 'src/repositories/message.repository';
const amqplib = require('amqplib');
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { Load_Count } from 'src/utils/LoadCount';
const config = require('config');
const loadCount = new Load_Count();
@Injectable()
export class PostMessageService extends BaseService<
  MessageLog,
  MessageRepository
> {
  connectionString = config.get('RabbitMQ.connectionString');
  constructor(repository: MessageRepository) {
    super(repository);
  }
  async postMsg(body: any): Promise<any> {
    console.log('connect string:::' + this.connectionString);

    let msg = body.message;
    //console.log(msg);

    const schedule_id = body.schedule_id;
    const send_count = body.send_count == null ? 1 : body.send_count;
    const sendType = body.send_type == null ? 'fanout' : body.send_type;
    let tryCouner = 0;
    while (tryCouner < 10) {
      try {
        //1. create connect
        const conn = await amqplib.connect(this.connectionString);
        //2. create chanel
        const chanel = await conn.createChannel();
        //3. create exchange
        const nameExchange = body.nameExchange;
        await chanel.assertExchange(nameExchange, sendType, {
          durable: false,
        });
        //4. publish video
        for (let i = 0; i < send_count; i++) {
          msg = body.message + "-count:::" + i;
          
          if (schedule_id == 0 && sendType == 'direct') {
            loadCount.increase();
            const consumer = loadCount.getCosumers();
            await chanel.publish(nameExchange, consumer, Buffer.from(msg));
            console.log(`Loan balancer count::: ${Load_Count.count}`); 
            console.log(`Consumer:: ${consumer}`);
            
          }else{
            await chanel.publish(nameExchange, '', Buffer.from(msg));
            console.log(nameExchange);
            
            console.log(msg);
            
          }     
        }
        console.log(`Send ${nameExchange} OK`);
        console.log("test");

        setTimeout(() => {
          conn.close();
          //process.exit(0);
        }, 2000);
        if (schedule_id > 0) {
          const saveLog = await super.store({
            data: {
              schedule_id: Number(schedule_id),
              content: msg,
              name_exchange: nameExchange,
            },
          });
          return saveLog;
        }
        return { status: 'Send ok' };
      } catch (error) {
        console.log(error.message);
      }
      console.log('Retrying send message after 5s...');
      await new Promise((resolve) => setTimeout(resolve, 5000));
      tryCouner++;
    }
    throw new HttpException(
      'Send message failed after try 10 times',
      HttpStatus.BAD_GATEWAY,
    );
  }
}
