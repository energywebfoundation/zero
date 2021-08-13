import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/guards';
import { RolesGuard } from '../auth/guards/roles.guard';
import { DraftsModule } from '../drafts/drafts.module';
import { FilesModule } from '../files/files.module';
import { HttpLoggerMiddleware } from '../middlewares/http-logger.middleware';
import { EmailModule } from '../email/email.module';
import * as Joi from 'joi';
import { ConnectionCloseMiddleware } from '../middlewares/connection-close.middleware';
import { FacilitiesModule } from '../facilities/facilities.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      validationOptions: {
        allowUnknown: true,
        abortEarly: false
      },
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),

        PORT: Joi.number().default(3333),

        DATABASE_URL: Joi.string()
          .uri({ allowRelative: false, scheme: 'postgresql' })
          .default('postgresql://postgres:postgres@localhost:5432/zero'),

        SMTP_URL: Joi.string()
          .uri({ allowRelative: false, scheme: 'smtp' })
          .default('smtp://localhost:1025'),

        UI_BASE_URL: Joi.string()
          .uri({
            allowRelative: false,
            scheme: ['http', 'https']
          })
          .default('http://localhost:3000'),

        LOG_LEVELS: Joi.string().default('log,error,warn,debug,verbose'),
        JWT_SECRET: Joi.string().required(),
        JWT_TTL: Joi.string().default('24h'),
        EMAIL_CONFIRMATION_TTL: Joi.number().min(0).default(86400),
        FILES_STORAGE: Joi.string().default('./uploaded-files'),
        UPLOADED_FILE_SIZE_LIMIT: Joi.number().min(10000),
        CORS_ORIGIN: Joi.string().default('*'),
        CORS_MAX_AGE: Joi.number().default(60)
      })
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    DraftsModule,
    FilesModule,
    EmailModule,
    FacilitiesModule,
    ProductsModule
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HttpLoggerMiddleware)
      .forRoutes('*');

    consumer
      .apply(ConnectionCloseMiddleware)
      .forRoutes('*');
  }
}
