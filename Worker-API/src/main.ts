import { NestFactory } from '@nestjs/core';
import { AppModule } from './routes';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ReceiveMessageService } from './services/pubsub/receive.service';
import methods from 'cache-manager-redis-store';
import helmet from "helmet";
const morgan = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
const config = require('config');

//const requestLimit = jsonRequestLimitconfig.limit;
const requestLimit = config.get('request-limit.limit');

var corsOptions = {
  origin: config.get('cors.origin'),
  methods: config.get('cors.methods'),
}
console.log(corsOptions);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(morgan('dev'));
  app.use(helmet());
  //app.use(cors(corsOptions));
  app.enableCors(corsOptions);
  app.use(bodyParser.urlencoded({ limit: requestLimit, extended: true }));
  const receiveMessage = new ReceiveMessageService();
  receiveMessage.receiveNoti();
  receiveMessage.broadcastConsumer('A', 'fanout-exchange')
  await app.listen(3000);
}
bootstrap();
