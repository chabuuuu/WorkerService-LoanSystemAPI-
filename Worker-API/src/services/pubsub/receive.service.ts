import { OnModuleInit } from '@nestjs/common';
import path from 'path';
const amqplib = require('amqplib');
const fs = require('fs');
const config = require('config');
//const connectionString = rabbitmq_config.connectionString;
const connectionString = config.get('RabbitMQ.connectionString');
console.log("connectstring:::" + connectionString);

export class ReceiveMessageService implements OnModuleInit {
  onModuleInit() {    
    this.receiveNoti();
    this.broadcastConsumer('A', 'fanout-exchange')
  }
  async receiveNoti() {
    try {
      //1. create connect
      const conn = await amqplib.connect(connectionString);
      //2. create chanel
      const chanel = await conn.createChannel();
      //3. create exchange
      const nameExchange = 'backup-file';
      await chanel.assertExchange(nameExchange, 'fanout', {
        durable: false,
      });
      //4. create queue
      const { queue } = await chanel.assertQueue('');
      console.log('name of queue:::', queue);
      //5. Binding
      await chanel.bindQueue(queue, nameExchange, '');
      await chanel.consume(
        queue,
        async (msg: any) => {
          //console.log(msg.content.toString());
          const root = process.env.ROOT_DIR;
          const date = new Date();
          const today = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getTime()}`;
          const backupFile = `loan_system-${today}.tar`;

          await fs.writeFile(
            root + `/storage/backup/${backupFile}`,
            msg.content,
            function (err) {
              if (err) {
                console.error(err);
                return;
              }
              console.log('File đã được nhận và lưu!');
            },
          );
        },
        {
          noAck: true,
        },
      );
    } catch (error: any) {
      console.log(error.message);
    }
  }
  async broadcastConsumer(severity: any, nameExchange: any) {
    try {
      let send_type = 'fanout'
      if (nameExchange === 'direct-exchange'){
          send_type = 'direct'
      }
      
      //1. create connect
      const conn = await amqplib.connect(connectionString);
      //2. create chanel
      const chanel = await conn.createChannel()
      //3. create exchange
      await chanel.assertExchange(nameExchange, send_type, {
          durable: false
      })
      //4. create queue
      // const {queue} = await chanel.assertQueue('', {
      //     exclusive: true
      // })
      const nameQueue = 'queueA'
      console.log("name of queue:::", nameQueue);

      await chanel.assertQueue(nameQueue, {
          durable: false,
          exclusive: false
      })
      //5. Binding
      await chanel.bindQueue(nameQueue, nameExchange, severity)
      await chanel.consume(nameQueue, msg => {
          console.log(msg.content.toString());
      }, {
          noAck: true
      })
  } catch (error) {
      console.log(error.message);
  }
  }
}