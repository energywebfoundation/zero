import { Test, TestingModule } from '@nestjs/testing';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { PrismaService } from '../prisma/prisma.service';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { resolve } from 'path';
import { AppModule } from '../app/app.module';
import {
  createAndActivateUser,
  fileExists,
  getAuthBearerHeader,
  logInUser,
  removeFolderContent
} from '../../test/helpers';
import { User, UserRole } from '@prisma/client';
import { UsersService } from '../users/users.service';

process.env.FILES_STORAGE = resolve(__dirname, '../../../../uploaded-files-tests');

describe('FilesController', () => {
  let module: TestingModule;
  let app: INestApplication;
  let httpServer;
  let controller: FilesController;
  let usersService: UsersService;
  let prisma: PrismaService;
  const password = 'my password';
  let user, accessToken;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [FilesController],
      providers: [FilesService, PrismaService],
      imports: [AppModule]
    }).compile();

    app = module.createNestApplication();
    await app.init();

    httpServer = app.getHttpServer();

    prisma = module.get<PrismaService>(PrismaService);
    usersService = module.get<UsersService>(UsersService);
    controller = module.get<FilesController>(FilesController);

    await prisma.clearDatabase();

    user = await createAndActivateUser(usersService, prisma, {
      firstName: 'test first name 1',
      lastName: 'test last name 1',
      email: 'test-email1@foo.bar',
      roles: [UserRole.seller],
      password: password
    } as User);

    accessToken = await logInUser(app, user.email, password);
  });

  afterAll(async () => {
    await module.close();
    await removeFolderContent(process.env.FILES_STORAGE);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST /files', function() {
    const testFilePath = resolve(__dirname, '../../test/test-files/test-file.pdf');

    beforeAll(async function() {
      expect(await fileExists(testFilePath)).toEqual(true);
    });

    it('should require logged in user', async function() {
      await request(httpServer)
        .post('/files')
        .attach('file', testFilePath)
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('should create a file', async function() {
      const newFileId: string = (await request(httpServer)
        .post('/files')
        .attach('file', testFilePath)
        .set(getAuthBearerHeader(accessToken))
        .expect(HttpStatus.CREATED)).body.id;

      expect(newFileId).toBeDefined();

      expect((await prisma.file.findUnique({ where: { id: newFileId } }))).not.toBeNull();
      expect(await fileExists(resolve(process.env.FILES_STORAGE, newFileId))).toEqual(true);
    });
  });
});
