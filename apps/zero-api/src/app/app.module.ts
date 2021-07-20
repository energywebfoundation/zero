import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/guards';
import { RolesGuard } from '../auth/guards/roles.guard';
import { DraftsModule } from '../drafts/drafts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    DraftsModule
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard }
  ]
})
export class AppModule {}
