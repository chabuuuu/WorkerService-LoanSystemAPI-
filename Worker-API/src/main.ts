import { NestFactory } from '@nestjs/core';
import { AppModule } from './routes';
import { NestExpressApplication } from '@nestjs/platform-express';
import { jsonRequestLimitconfig } from './configs/config.request-limit-size';
import { ReceiveMessageService } from './services/pubsub/receive.service';
const morgan = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
const requestLimit = jsonRequestLimitconfig.limit;
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(morgan('dev'));
  app.use(cors());
  app.use(bodyParser.urlencoded({ limit: requestLimit, extended: true }));
  const receiveMessage = new ReceiveMessageService();
  receiveMessage.receiveNoti();
  await app.listen(3000);
}
bootstrap();
