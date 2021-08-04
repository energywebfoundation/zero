/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, LogLevel } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import { getSwaggerDocumentationConfig } from './swagger/SwaggerDocumentConfig';
import {intersection} from 'lodash';

const logger = new Logger('bootstrap', { timestamp: true });

logger.log('starting');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: getLogLevelsFromEnv()
  });

  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    maxAge: parseInt(process.env.CORS_MAX_AGE)
  });

  logger.log(`LOG_LEVELS=${getLogLevelsFromEnv().join()}`);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const document = SwaggerModule.createDocument(app, getSwaggerDocumentationConfig());
  SwaggerModule.setup('swagger', app, document, {
    customSiteTitle: 'Swagger documentation for Energy Web Zero API',
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = process.env.PORT;
  await app.listen(port, () => {
    logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap()
  .then(() => logger.log('all done'))
  .catch(err => {
    logger.error(err);
    console.log(err);
    process.exit(1);
  });

function getLogLevelsFromEnv(): LogLevel[] {
  const allowedLogLevels: LogLevel[] = ['log', 'error', 'warn', 'debug', 'verbose'];
  const envLogLevels = (process.env.LOG_LEVELS).split(',') as LogLevel[];

  return intersection(allowedLogLevels, envLogLevels) as LogLevel[]
}
