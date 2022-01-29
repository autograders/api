import { config as loadEnv } from 'dotenv-safe';
loadEnv();

import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import { graphqlUploadExpress } from 'graphql-upload';
import helmet from 'helmet';

import { App } from '@app';
import { AppConfig } from '@configs/app';
import { EnvConfig } from '@configs/env';
import { ExceptionFilter } from '@filters/exception';
import { ValidationPipe } from '@pipes/validation';

async function bootstrap() {
  const app = await NestFactory.create(App);

  app.use(compression());
  app.use(cookieParser());
  app.use(graphqlUploadExpress());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ExceptionFilter());
  app.enableCors(AppConfig.cors);

  if (!EnvConfig.isDev) app.use(helmet());

  await app.listen(AppConfig.port);
}

bootstrap();
