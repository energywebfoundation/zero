import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';

import * as request from 'supertest';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AppModule } from '../app/app.module';
import { UserEntity } from './entities/user.entity';
import { Role } from '@prisma/client';

describe('UsersController', () => {
  let app: INestApplication;
  let controller: UsersController;
  let prisma: PrismaService;

  const validPayload: CreateUserDto = {
    firstName: 'test first name',
    lastName: 'test last name',
    email: 'test-email@foo.bar',
    role: Role.Seller,
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

    controller = module.get<UsersController>(UsersController);
    prisma = module.get<PrismaService>(PrismaService);
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

  it('should respond with correct user record', async function() {
    const res = await request(app.getHttpServer())
      .post('/users')
      .send(validPayload)
      .expect(HttpStatus.CREATED);

    const userCreated = res.body as Omit<UserEntity, 'password'>;

    const userFetched = (await request(app.getHttpServer())
      .get(`/users/${userCreated.id}`)
      .send(validPayload)
      .expect(HttpStatus.OK)).body as Omit<UserEntity, 'password'>;

    expect(userCreated.email).toEqual(userFetched.email);
  });
});