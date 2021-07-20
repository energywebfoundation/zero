import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';

import * as request from 'supertest';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AppModule } from '../app/app.module';
import { UserEntity } from './entities/user.entity';
import { User, UserRole, EmailConfirmation } from '@prisma/client';
import { createAndActivateUser, getAuthBearerHeader, logInUser } from '../../test/helpers';

describe('UsersController', () => {
  let app: INestApplication;
  let httpServer;
  let controller: UsersController;
  let prisma: PrismaService;
  let usersService: UsersService;

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
    usersService = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);

    await prisma.clearDatabase();
  });

  afterAll(async () => {
    await app?.close();
  });

  beforeEach(async () => {
    await prisma.emailConfirmation.deleteMany();
    await prisma.user.deleteMany();
    expect((await prisma.user.findMany()).length).toEqual(0);
  });

  afterEach(async () => {
    await prisma.emailConfirmation.deleteMany();
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
      const newUser = await createAndActivateUser(usersService, prisma, validPayload as User);

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
      const newSellerUser = await createAndActivateUser(usersService, prisma, {
        ...validPayload,
        email: 'seller@foobar.com',
        roles: [UserRole.seller]
      } as User);
      expect(newSellerUser).toBeDefined();
      newSellerUserEmail = newSellerUser.email;

      const newAdminUser = await createAndActivateUser(usersService, prisma, {
        ...validPayload,
        email: 'admin@foobar.com',
        roles: [UserRole.admin]
      } as User);
      expect(newAdminUser).toBeDefined();
      newAdminUserEmail = newAdminUser.email;
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
      const newUserId = (await createAndActivateUser(usersService, prisma, validPayload as User)).id;

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
      user1 = (await createAndActivateUser(usersService, prisma, validPayload as User));
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

  describe('POST /users/password-reset-init', function() {
    let user: UserEntity;

    beforeEach(async function() {
      await prisma.passwordReset.deleteMany();
      user = (await request(app.getHttpServer())
        .post('/users')
        .send(validPayload)
        .expect(HttpStatus.CREATED)).body;
    });

    it('should accept request and create a token for existing user', async function() {
      await request(httpServer)
        .post('/users/password-reset-init')
        .send({ email: validPayload.email })
        .expect(HttpStatus.CREATED);

      const allRecords = await prisma.passwordReset.findMany();

      expect(allRecords.length).toEqual(1);

      const tokenRecord = allRecords[0];

      expect(tokenRecord.userId).toEqual(user.id);
      expect(tokenRecord.usedAt).toBeNull();
    });

    it('should accept request and not create any token for non-existing user', async function() {
      await request(httpServer)
        .post('/users/password-reset-init')
        .send({ email: 'fake@email.com' })
        .expect(HttpStatus.CREATED);

      const allRecords = await prisma.passwordReset.findMany();

      expect(allRecords.length).toEqual(0);
    });
  });

  describe('PUT /users/password-reset', function() {
    let user: UserEntity, token: string;

    beforeEach(async function() {
      await prisma.passwordReset.deleteMany();
      user = (await request(app.getHttpServer())
        .post('/users')
        .send(validPayload)
        .expect(HttpStatus.CREATED)).body;

      await request(httpServer)
        .post('/users/password-reset-init')
        .send({ email: validPayload.email })
        .expect(HttpStatus.CREATED);

      token = (await prisma.passwordReset.findFirst({ orderBy: { createdAt: 'desc' } })).id;
    });

    it('should accept request with valid token provided and change the password', async function() {
      await request(httpServer)
        .put('/users/password-reset')
        .send({ token, newPassword: 'new password' })
        .expect(HttpStatus.OK);
    });

    it('should not accept request with invalid token', async function() {
      await request(httpServer)
        .put('/users/password-reset')
        .send({ token: 'invalid token', newPassword: 'new password' })
        .expect(HttpStatus.FORBIDDEN);
    });
  });

  describe('POST /users/email-confirmation', function() {
    let user: UserEntity;
    beforeEach(async function() {
      user = await (await request(app.getHttpServer())
        .post('/users')
        .send(validPayload)
        .expect(HttpStatus.CREATED)).body;
    });

    it('should accept request for exisiting email and correct password', async function() {
      await request(app.getHttpServer())
        .post('/users/email-confirmation')
        .send({ email: validPayload.email, password: validPayload.password })
        .expect(HttpStatus.CREATED);
    });

    it('should reject request for non-existing email', async function() {
      await request(app.getHttpServer())
        .post('/users/email-confirmation')
        .send({ email: 'invalid@email.com', password: validPayload.password })
        .expect(HttpStatus.FORBIDDEN);
    });

    it('should reject request for incorrect password', async function() {
      await request(app.getHttpServer())
        .post('/users/email-confirmation')
        .send({ email: validPayload.email, password: 'invalid password' })
        .expect(HttpStatus.FORBIDDEN);
    });

    it('should create correct db record', async function() {
      await request(app.getHttpServer())
        .post('/users/email-confirmation')
        .send({ email: validPayload.email, password: validPayload.password })
        .expect(HttpStatus.CREATED);

      const dbRecord: EmailConfirmation = await prisma.emailConfirmation.findFirst();
      expect(dbRecord).toBeDefined();
      expect(dbRecord.userId).toEqual(user.id);

      const expirationExpected = new Date(Date.now() + parseInt(process.env.EMAIL_CONFIRMATION_TTL) * 1000).getTime();
      const expirationActual = dbRecord.expiresAt.getTime();
      expect(Math.abs(expirationExpected - expirationActual)).toBeLessThanOrEqual(1000);
    });
  });

  describe('PUT /users/email-confirmation', function() {
    let user: UserEntity, emailConfirmation: EmailConfirmation;
    beforeEach(async function() {
      user = await (await request(app.getHttpServer())
        .post('/users')
        .send(validPayload)
        .expect(HttpStatus.CREATED)).body;

      emailConfirmation = await prisma.emailConfirmation.findFirst({ where: { userId: user.id } });
    });

    it('should accept valid token and update db records', async function() {
      await request(app.getHttpServer())
        .put('/users/email-confirmation')
        .send({ token: emailConfirmation.id })
        .expect(HttpStatus.OK);
    });

    it('should reject invalid token', async function() {
      await request(app.getHttpServer())
        .put('/users/email-confirmation')
        .send({ token: 'invalid token' })
        .expect(HttpStatus.NOT_FOUND);
    });

    it('should reject expired token', async function() {

      await prisma.emailConfirmation.update({
        where: { id: emailConfirmation.id },
        data: { expiresAt: new Date(Date.now() - 1000) }
      });

      await request(app.getHttpServer())
        .put('/users/email-confirmation')
        .send({ token: emailConfirmation.id })
        .expect(HttpStatus.NOT_FOUND);
    });

    it('should reject already used token', async function() {
      await request(app.getHttpServer())
        .put('/users/email-confirmation')
        .send({ token: emailConfirmation.id })
        .expect(HttpStatus.OK);

      await request(app.getHttpServer())
        .put('/users/email-confirmation')
        .send({ token: emailConfirmation.id })
        .expect(HttpStatus.NOT_FOUND);
    });
  });
});


