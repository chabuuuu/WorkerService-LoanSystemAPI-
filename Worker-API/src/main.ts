import { NestFactory } from '@nestjs/core';
import { AppModule } from './routes';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ReceiveMessageService } from './services/pubsub/receive.service';
import methods from 'cache-manager-redis-store';
import helmet from "helmet";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
const morgan = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
const config = require('config');

//const requestLimit = jsonRequestLimitconfig.limit;
const requestLimit = config.get('request-limit.limit');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(morgan('dev'));
  //app.use(helmet());
  //app.use(cors(corsOptions));
  //app.enableCors(corsOptions);
  app.use(bodyParser.urlencoded({ limit: requestLimit, extended: true }));
  const config = new DocumentBuilder()
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },
    'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
  )
  .setTitle('Worker Service API')
  .setDescription('API Endpoint of Worker Service')
  .setVersion('1.0')
  .addTag('Worker Service')
  .addServer(process.env.SERVER)
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const receiveMessage = new ReceiveMessageService();
  receiveMessage.receiveNoti();
  //receiveMessage.broadcastConsumer('A', 'fanout-exchange')
  await app.listen(3000);
}
bootstrap();
