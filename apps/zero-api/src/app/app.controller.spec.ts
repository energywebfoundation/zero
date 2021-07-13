import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { UserRole } from '@prisma/client';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { UserEntity } from '../users/entities/user.entity';
import * as request from 'supertest';
import { JwtService } from '@nestjs/jwt';

describe('AppController', () => {
  let module: TestingModule;
  let app: INestApplication;
  let prisma: PrismaService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [AppController],
      imports: [AuthModule, PrismaModule, UsersModule],
      providers: [AppService]
    }).compile();

    app = module.createNestApplication();
    await app.init();

    prisma = module.get<PrismaService>(PrismaService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);

    await prisma.clearDatabase();
  });

  afterAll(async () => {
    await app?.close();
  });

  describe('getData', () => {
    it('should return "Welcome to zero-api!"', () => {
      const appController = module.get<AppController>(AppController);
      expect(appController.getData()).toEqual({
        message: 'Welcome to zero-api!'
      });
    });
  });

  describe('auth/login endpoint', function() {
    const validPassword = 'valid pass';
    let user: UserEntity;
    beforeAll(async () => {
      user = await usersService.create({
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@foo.bar',
        password: validPassword,
        roles: [UserRole.seller],
      });
    });

    it('should accept valid username and password', async function() {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: user.email, password: validPassword })
        .expect(HttpStatus.OK);
    });

    it('should respond with a valid JWT token', async function() {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: user.email, password: validPassword })
        .expect(HttpStatus.OK);

      expect(res.body.accessToken).toBeDefined();

      const tokenDecoded = jwtService.verify(res.body.accessToken);
      expect(tokenDecoded).toBeDefined();
      expect(tokenDecoded.sub).toEqual(user.email);
    });

    it('should not accept invalid password for a known user', async function() {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: user.email, password: 'invalid password' })
        .expect(HttpStatus.UNAUTHORIZED);

      expect(res.body.accessToken).toBeUndefined();
    });

    it('should not accept unknown user', async function() {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: 'fake@email.com', password: validPassword })
        .expect(HttpStatus.UNAUTHORIZED);

      expect(res.body.accessToken).toBeUndefined();
    });
  });
});
