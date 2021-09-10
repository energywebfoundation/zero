import { HttpStatus, INestApplication } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app/app.module';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { User, UserRole } from '@prisma/client';
import * as request from 'supertest';
import {
  createAndActivateUser,
  createUploadedFile,
  getAuthBearerHeader,
  logInUser,
  removeFolderContent
} from '../../test/helpers';
import { FilesService } from '../files/files.service';
import { resolve } from 'path';
import { tmpdir } from 'os';
import { FileMetadataDto } from '../files/dto/file-metadata.dto';
import { UsersOwnFilesController } from './users-own-files.controller';

describe('UsersOwnFilesController', function() {
  let app: INestApplication;
  let httpServer;
  let controller: UsersOwnFilesController;
  let prisma: PrismaService;
  let usersService: UsersService;
  let filesService: FilesService;
  const temporaryFolder = tmpdir();
  let user1: UserDto, user2: UserDto;
  let accessToken1: string;

  const password1 = 'pass1', password2 = 'pass2';

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = module.createNestApplication();
    await app.init();

    httpServer = app.getHttpServer();

    controller = module.get<UsersOwnFilesController>(UsersOwnFilesController);
    prisma = module.get<PrismaService>(PrismaService);
    usersService = module.get<UsersService>(UsersService);
    filesService = module.get<FilesService>(FilesService);

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
      const uploadedFile1 = await createUploadedFile(resolve(__dirname, '../../test/test-files/test-file.pdf'), temporaryFolder);
      await filesService.addFile(uploadedFile1.path, uploadedFile1.originalname, uploadedFile1.mimetype, user2.id);

      const uploadedFile2 = await createUploadedFile(resolve(__dirname, '../../test/test-files/test-file.pdf'), temporaryFolder);
      await filesService.addFile(uploadedFile2.path, uploadedFile2.originalname, uploadedFile2.mimetype, user1.id);

      const uploadedFile3 = await createUploadedFile(resolve(__dirname, '../../test/test-files/test-file.pdf'), temporaryFolder);
      await filesService.addFile(uploadedFile3.path, uploadedFile3.originalname, uploadedFile3.mimetype, user1.id);

      const uploadedFile4 = await createUploadedFile(resolve(__dirname, '../../test/test-files/test-file.pdf'), temporaryFolder);
      await filesService.addFile(uploadedFile4.path, uploadedFile4.originalname, uploadedFile4.mimetype, user1.id);
    }, 20000);

    it('should deny access when not authenticated', async function() {
      const { body } = (await request(httpServer)
        .get(`/users/me/files`)
        .expect(HttpStatus.UNAUTHORIZED));

      expect(body.length).not.toBeDefined();
    });

    it('should respond with list of files metadata', async function() {
      const entities: FileMetadataDto[] = (await request(httpServer)
        .get(`/users/me/files`)
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
        .get(`/users/me/files`)
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.OK)).body;

      expect(entities.filter(e => e.ownerId !== user1.id).length).toEqual(0);
    });
  });
});
