/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { INestApplication, Logger, LogLevel } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import { getSwaggerDocumentationConfig } from './swagger/SwaggerDocumentConfig';
import {intersection} from 'lodash';
import { PrismaService } from './prisma/prisma.service';

const logger = new Logger('bootstrap', { timestamp: true });
const webserverLogger = new Logger('webserver', { timestamp: true });

logger.log('starting');

let app: INestApplication;

async function bootstrap() {
  app = await NestFactory.create(AppModule, {
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

  const server = app.getHttpServer();

  server.on('connection', connectionHandler);

  const prisma = app.get<PrismaService>(PrismaService);

  prisma.$on('beforeExit', async function() {
    logger.log('Prisma client "beforeExit" event, initiating shut down routine');

    // hacky way of enabling shutdown hooks because prisma handles stop signals itself
    logger.debug('awaiting application closed');
    await app.close();
    logger.debug('application closed');
  });
}

bootstrap()
  .then(() => logger.log('all done'))
  .catch(err => {
    logger.error(err);
    console.log(err);

    if (app) {
      logger.debug('calling app.close()');
      app.close().then(() => {
        logger.debug('exiting process with code 1 after app.close()');
        process.exit(1);
      });
    } else {
      logger.debug('app is undefined, exiting process with code 1');
      process.exit(1);
    }
  });

function getLogLevelsFromEnv(): LogLevel[] {
  const allowedLogLevels: LogLevel[] = ['log', 'error', 'warn', 'debug', 'verbose'];
  const envLogLevels = (process.env.LOG_LEVELS).split(',') as LogLevel[];

  return intersection(allowedLogLevels, envLogLevels) as LogLevel[]
}

function connectionHandler(socket) {
  webserverLogger.debug(`connection from ${socket.remoteAddress}:${socket.remotePort}`);

  const start = Date.now();

  socket.on('close', (error) => {
    webserverLogger.debug(`connection from ${socket.remoteAddress}:${socket.remotePort} closed${error ? ' with error' : ''}, ` +
      `${socket.bytesRead} bytes read, ${socket.bytesWritten} bytes written, ${Date.now() - start}ms elapsed`);
  })
}
