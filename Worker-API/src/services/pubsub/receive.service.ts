import { OnModuleInit } from '@nestjs/common';
import path from 'path';
import { rabbitmq_config } from 'src/configs/config.rabbitmq';
const amqplib = require('amqplib');
const fs = require('fs');
const connectionString = rabbitmq_config.connectionString;
export class ReceiveMessageService implements OnModuleInit {
  onModuleInit() {
    this.receiveNoti();
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
}
