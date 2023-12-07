import { Injectable } from '@nestjs/common';
const amqplib = require('amqplib');
@Injectable()
export class PostService {

    amqp_url_cloud = process.env.RABBITMQ_CLOUD
    amqp_url_docker = process.env.RABBITMQ_DOCKER
    async postMsg(body: any): Promise<string> {
        const msg = body.message;
        try {
            //1. create connect
            const conn = await amqplib.connect(this.amqp_url_docker);
            //2. create chanel
            const chanel = await conn.createChannel()
            //3. create exchange
            const nameExchange = 'video'
            await chanel.assertExchange(nameExchange, 'fanout', {
                durable: false
            })
            //4. publish video
            await chanel.publish(nameExchange, '', Buffer.from(msg))
            console.log('Send OK');
    
            setTimeout(() => {
                conn.close();
                //process.exit(0);
            }, 2000);
            return 'Done';
        } catch (error) {
            console.log(error.message);
        }
        return 'Hello World!';
      }
}
