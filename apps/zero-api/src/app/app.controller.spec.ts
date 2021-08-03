import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { User, UserRole } from '@prisma/client';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { UserDto } from '../users/dto/user.dto';
import * as request from 'supertest';
import { JwtService } from '@nestjs/jwt';
import { createAndActivateUser } from '../../test/helpers';
import { AppModule } from './app.module';

describe('AppController', () => {
  let module: TestingModule;
  let app: INestApplication;
  let prisma: PrismaService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [AppController],
      imports: [AppModule, AuthModule],
      providers: []
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

  describe('auth/login endpoint', function() {
    const validPassword = 'valid pass';
    let user: UserDto;
    beforeAll(async () => {
      user = await createAndActivateUser(usersService, prisma, {
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@foo.bar',
        password: validPassword,
        roles: [UserRole.seller],
      } as User);
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

    it('should not accept not user with not confirmed email', async function() {
      await usersService.create({
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith2@foo.bar',
        password: validPassword,
        roles: [UserRole.seller]
      });

      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: 'john.smith2@foo.bar', password: validPassword })
        .expect(HttpStatus.FORBIDDEN);

      expect(res.body.accessToken).toBeUndefined();
    });
  });
});
