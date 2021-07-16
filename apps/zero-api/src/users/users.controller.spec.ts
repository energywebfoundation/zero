import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';

import * as request from 'supertest';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AppModule } from '../app/app.module';
import { UserEntity } from './entities/user.entity';
import { UserRole } from '@prisma/client';

describe('UsersController', () => {
  let app: INestApplication;
  let httpServer;
  let controller: UsersController;
  let prisma: PrismaService;

  const validPayload: CreateUserDto = {
    firstName: 'test first name',
    lastName: 'test last name',
    email: 'test-email@foo.bar',
    roles: [UserRole.seller],
    password: 'a secret'
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, PrismaService],
      imports: [AppModule]
    }).compile();

    app = module.createNestApplication();
    await app.init();

    httpServer = app.getHttpServer();

    controller = module.get<UsersController>(UsersController);
    prisma = module.get<PrismaService>(PrismaService);

    await prisma.clearDatabase();
  });

  afterAll(async () => {
    await app?.close();
  });

  beforeEach(async () => {
    await prisma.user.deleteMany();
    expect((await prisma.user.findMany()).length).toEqual(0);
  });

  afterEach(async () => {
    await prisma.user.deleteMany();
    expect((await prisma.user.findMany()).length).toEqual(0);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST /users', function() {
    it('should accept valid payload and create a user', async function() {
      const res = await request(app.getHttpServer())
        .post('/users')
        .send(validPayload)
        .expect(HttpStatus.CREATED);

      expect(res).toBeDefined();

      const userCreated = res.body as Omit<UserEntity, 'password'>;

      expect(userCreated.id).toBeDefined();
      expect(userCreated.firstName).toEqual(validPayload.firstName);
      expect(userCreated.email).toEqual(validPayload.email);

      const dbRecord = await prisma.user.findUnique({ where: { id: userCreated.id } });
      expect(dbRecord).toBeDefined();
      expect(dbRecord.firstName).toEqual(validPayload.firstName);
      expect(dbRecord.lastName).toEqual(validPayload.lastName);
      expect(dbRecord.email).toEqual(validPayload.email);
    });

    it('should not accept payloads with invalid email', async function() {
      const payload: CreateUserDto = { ...validPayload, email: 'this is not a valid email' };

      await request(app.getHttpServer())
        .post('/users')
        .send(payload)
        .expect(HttpStatus.BAD_REQUEST);

      expect((await prisma.user.findMany()).length).toEqual(0);
    });

    it('should not accept payloads with an empty password', async function() {
      const payload: CreateUserDto = { ...validPayload, password: '' };

      await request(app.getHttpServer())
        .post('/users')
        .send(payload)
        .expect(HttpStatus.BAD_REQUEST);

      expect((await prisma.user.findMany()).length).toEqual(0);
    });

    it('should not accept payloads with an empty firstName', async function() {
      const payload: CreateUserDto = { ...validPayload, firstName: '' };

      await request(app.getHttpServer())
        .post('/users')
        .send(payload)
        .expect(HttpStatus.BAD_REQUEST);

      expect((await prisma.user.findMany()).length).toEqual(0);
    });

    it('should not accept payloads with an empty lastName', async function() {
      const payload: CreateUserDto = { ...validPayload, lastName: '' };

      await request(app.getHttpServer())
        .post('/users')
        .send(payload)
        .expect(HttpStatus.BAD_REQUEST);

      expect((await prisma.user.findMany()).length).toEqual(0);
    });

    it('should not accept invalid user role', async function() {
      const payload = { ...validPayload, roles: ['fake role'] };

      await request(app.getHttpServer())
        .post('/users')
        .send(payload)
        .expect(HttpStatus.BAD_REQUEST);

      expect((await prisma.user.findMany()).length).toEqual(0);
    });

    it('should accept multiple roles', async function() {
      const payload = { ...validPayload, roles: [UserRole.seller, UserRole.buyer] };

      const newUserData = (await request(app.getHttpServer())
        .post('/users')
        .send(payload)
        .expect(HttpStatus.CREATED)).body;

      expect(newUserData.roles.length).toEqual(2);

      expect((await prisma.user.findUnique({ where: { id: newUserData.id } })).roles.sort()).toEqual([UserRole.seller, UserRole.buyer].sort());
    });

    it('should respond with correct user record', async function() {
      const res = await request(app.getHttpServer())
        .post('/users')
        .send(validPayload)
        .expect(HttpStatus.CREATED);

      const userCreated = res.body as Omit<UserEntity, 'password'>;
      expect(userCreated.email).toEqual(validPayload.email);

      const userDbRecord = await prisma.user.findUnique({ where: { email: validPayload.email } });
      expect(userDbRecord.email).toEqual(validPayload.email);
    });
  });

  describe('PATCH /users/:id', function() {
    it('should not update an email', async function() {
      const newUser: UserEntity | null = (await request(app.getHttpServer())
        .post('/users')
        .send(validPayload)
        .expect(HttpStatus.CREATED)).body as UserEntity;

      expect(newUser).toBeDefined();

      const accessToken = await logInUser(app, validPayload.email, validPayload.password);
      expect(accessToken).toBeDefined();

      const updateResponseBody = (await request(httpServer)
        .patch(`/users/${newUser.id}`)
        .send({ email: 'modified@email.com' })
        .set(getAuthBearerHeader(accessToken))
        .expect(HttpStatus.OK)).body;

      expect(updateResponseBody.email).not.toEqual('modified@email.com');

      const userUpdatedDbRecord = await prisma.user.findUnique({ where: { id: newUser.id } });
      expect(userUpdatedDbRecord.email).not.toEqual('modified@email.com');
    });
  });

  describe('GET /users', function() {
    let newSellerUserEmail: string, newAdminUserEmail: string;

    beforeAll(async function() {
      await prisma.user.deleteMany();
    });

    beforeEach(async function() {
      newSellerUserEmail = (await request(httpServer)
        .post('/users')
        .send({ ...validPayload, email: 'seller@foobar.com', roles: [UserRole.seller] })
        .expect(HttpStatus.CREATED)).body.email;
      expect(newSellerUserEmail).toBeDefined();

      newAdminUserEmail = (await request(httpServer)
        .post('/users')
        .send({ ...validPayload, email: 'admin@foobar.com', roles: [UserRole.admin] })
        .expect(HttpStatus.CREATED)).body.email;
      expect(newAdminUserEmail).toBeDefined();
    });

    it('should require an admin role', async function() {
      const adminAccessToken = await logInUser(app, newAdminUserEmail, validPayload.password);
      expect(adminAccessToken).toBeDefined();

      const sellerAccessToken = await logInUser(app, newSellerUserEmail, validPayload.password);
      expect(sellerAccessToken).toBeDefined();

      await request(httpServer)
        .get('/users')
        .set(getAuthBearerHeader(adminAccessToken))
        .expect(HttpStatus.OK);

      await request(httpServer)
        .get('/users')
        .set(getAuthBearerHeader(sellerAccessToken))
        .expect(HttpStatus.FORBIDDEN);
    });
  });

  describe('GET /users/me', function() {
    beforeAll(async function() {
      await prisma.user.deleteMany();
    });

    it('should deny access when no access token provided', async function() {
      await request(httpServer)
        .get('/users/me')
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('should respond with a data of the logged in user', async function() {
      const newUserId = (await request(httpServer)
        .post('/users')
        .send(validPayload)
        .expect(HttpStatus.CREATED)).body.id;

      await request(httpServer)
        .post('/users')
        .send({ ...validPayload, email: 'another@email.com' })
        .expect(HttpStatus.CREATED);

      const accessToken = await logInUser(app, validPayload.email, validPayload.password);

      const data = (await request(httpServer)
        .get('/users/me')
        .set(getAuthBearerHeader(accessToken))
        .expect(HttpStatus.OK)).body;

      expect(data.email).toEqual(validPayload.email);
      expect(data.id).toEqual(newUserId);
    });
  });

  describe('PUT /users/:id/password', function() {
    let user1: UserEntity, user2: UserEntity;
    let accessToken1: string;

    beforeEach(async () => {
      user1 = (await request(httpServer)
        .post('/users')
        .send(validPayload)
        .expect(HttpStatus.CREATED)).body;

      accessToken1 = await logInUser(app, user1.email, validPayload.password);
    });

    it('should change password when valid old password provided', async function() {
      await request(httpServer)
        .put(`/users/${user1.id}/password`)
        .send({
          oldPassword: validPayload.password,
          newPassword: 'new pass'
        })
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.OK);
    });

    it('should forbid to change password when invalid old password provided', async function() {
      await request(httpServer)
        .put(`/users/${user1.id}/password`)
        .send({
          oldPassword: 'invalid password',
          newPassword: 'new pass'
        })
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.FORBIDDEN);
    });

    it('should forbid when changing password to other user', async function() {
      user2 = (await request(httpServer)
        .post('/users')
        .send({ ...validPayload, email: 'another@email.com' })
        .expect(HttpStatus.CREATED)).body;

      await request(httpServer)
        .put(`/users/${user2.id}/password`)
        .send({
          oldPassword: validPayload.password,
          newPassword: 'new pass'
        })
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.FORBIDDEN);
    });
  });
});

async function logInUser(app: INestApplication, username: string, password: string): Promise<string> {
  return (await request(app.getHttpServer())
    .post('/auth/login')
    .send({ username, password })
    .expect(HttpStatus.OK)).body.accessToken;
}

function getAuthBearerHeader(token: string): { Authorization: string } {
  return { Authorization: `Bearer ${token}` };
}
