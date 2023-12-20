import { NestFactory } from '@nestjs/core';
import { AppModule } from './routes';
import { NestExpressApplication } from '@nestjs/platform-express';
const morgan = require('morgan');
const compression = require('compression');
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(morgan('dev'));
  //app.use(compression());
  await app.listen(3000);
}
bootstrap();
