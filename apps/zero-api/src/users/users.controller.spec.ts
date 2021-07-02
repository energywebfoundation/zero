import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';

import * as request from 'supertest';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AppModule } from '../app/app.module';
import { UserEntity } from './entities/user.entity';

describe('UsersController', () => {
  let app: INestApplication;
  let controller: UsersController;
  let prisma: PrismaService;

  const validPayload: CreateUserDto = {
    name: 'test name',
    email: 'test-email@foo.bar',
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
    expect(userCreated.name).toEqual(validPayload.name);
    expect(userCreated.email).toEqual(validPayload.email);

    const dbRecord = await prisma.user.findUnique({ where: { id: userCreated.id } });
    expect(dbRecord).toBeDefined();
    expect(dbRecord.name).toEqual(validPayload.name);
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

  it('should not accept payloads with an empty name', async function() {
    const payload: CreateUserDto = { ...validPayload, name: '' };

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
