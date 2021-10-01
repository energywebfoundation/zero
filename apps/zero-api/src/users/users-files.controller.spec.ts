import { HttpStatus, INestApplication } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app/app.module';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { User, UserRole } from '@prisma/client';
import * as request from 'supertest';
import { createAndActivateUser, createDocumentDbRecord, getAuthBearerHeader, logInUser } from '../../test/helpers';
import { UsersFilesController } from './users-files.controller';
import { FilesService } from '../files/files.service';
import { FileMetadataDto } from '../files/dto/file-metadata.dto';

describe('UsersFilesController', function() {
  let app: INestApplication;
  let httpServer;
  let controller: UsersFilesController;
  let prisma: PrismaService;
  let usersService: UsersService;
  let user1: UserDto, user2: UserDto;
  let accessToken1: string;

  const password1 = 'pass1', password2 = 'pass2';

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersFilesController],
      providers: [UsersService, FilesService, PrismaService],
      imports: [AppModule]
    }).compile();

    app = module.createNestApplication();
    await app.init();

    httpServer = app.getHttpServer();

    controller = module.get<UsersFilesController>(UsersFilesController);
    prisma = module.get<PrismaService>(PrismaService);
    usersService = module.get<UsersService>(UsersService);

    await prisma.clearDatabase();


    user1 = await createAndActivateUser(usersService, prisma, {
      firstName: 'test first name 1',
      lastName: 'test last name 1',
      email: 'test-email1@foo.bar',
      roles: [UserRole.seller],
      password: password1
    } as User);

    accessToken1 = await logInUser(app, user1.email, password1);

    user2 = await createAndActivateUser(usersService, prisma, {
      firstName: 'test first name 2',
      lastName: 'test last name 2',
      email: 'test-email2@foo.bar',
      roles: [UserRole.seller],
      password: password2
    } as User);
  });

  afterAll(async () => {
    await prisma.file.deleteMany();
    await app?.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET users/:userId/files', function() {
    beforeAll(async function() {
      await createDocumentDbRecord(prisma, user2.id);
      await createDocumentDbRecord(prisma, user1.id);
      await createDocumentDbRecord(prisma, user1.id);
      await createDocumentDbRecord(prisma, user1.id);
    });

    it('should deny access when not authenticated', async function() {
      const { body } = (await request(httpServer)
        .get(`/users/${user1.id}/files`)
        .expect(HttpStatus.UNAUTHORIZED));

      expect(body.length).not.toBeDefined();
    });

    it('should respond with list of files metadata', async function() {
      const entities: FileMetadataDto[] = (await request(httpServer)
        .get(`/users/${user1.id}/files`)
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.OK)).body;

      expect(entities.length).toBeDefined();
      expect(entities.length).toEqual(3);
      expect(entities[0].id).toBeDefined();
      expect(entities[0].filename).toBeDefined();
      expect(entities[0].ownerId).toBeDefined();
      expect(entities[0].ownerId).toEqual(user1.id);
    });

    it('should respond with only metadata files owned by the user', async function() {
      const entities: FileMetadataDto[] = (await request(httpServer)
        .get(`/users/${user1.id}/files`)
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.OK)).body;

      expect(entities.filter(e => e.ownerId !== user1.id).length).toEqual(0);
    });

    it('should deny access to drafts of another user if not admin', async function() {
      const body = (await request(httpServer)
        .get(`/users/${user2.id}/files`)
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.FORBIDDEN)).body;

      expect(body.drafts).not.toBeDefined();
    });

    it('should allow access to drafts of another user when admin', async function() {
      const adminUser = await createAndActivateUser(usersService, prisma, {
        firstName: 'test first name 3',
        lastName: 'test last name 3',
        email: 'test-email3@foo.bar',
        roles: [UserRole.admin],
        password: 'admin password'
      } as User);

      const adminAccessToken = await logInUser(app, adminUser.email, 'admin password');

      const body = (await request(httpServer)
        .get(`/users/${user1.id}/files`)
        .set(getAuthBearerHeader(adminAccessToken))
        .expect(HttpStatus.OK)).body;

      expect(body.length).toEqual(3);
      expect(body.filter(f => f.ownerId !== user1.id).length).toEqual(0);
    });
  });
});
