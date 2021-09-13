import { Test, TestingModule } from '@nestjs/testing';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { PrismaService } from '../prisma/prisma.service';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { basename, resolve } from 'path';
import { AppModule } from '../app/app.module';
import {
  createAndActivateUser,
  fileExists,
  getAuthBearerHeader,
  logInUser
} from '../../test/helpers';
import { FileType, User, UserRole } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { FileMetadataDto } from './dto/file-metadata.dto';
import axios from 'axios';

process.env.FILES_STORAGE = resolve(__dirname, '../../../../uploaded-files-tests');

describe('FilesController', () => {
  let module: TestingModule;
  let app: INestApplication;
  let httpServer;
  let controller: FilesController;
  let usersService: UsersService;
  let filesService: FilesService;
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
    filesService = module.get<FilesService>(FilesService);
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
        .field('meta', JSON.stringify({ meta: 'data' }))
        .attach('file', testFilePath)
        .set(getAuthBearerHeader(accessToken))
        .expect(HttpStatus.CREATED)).body.id;

      expect(newFileId).toBeDefined();

      expect((await prisma.file.findUnique({ where: { id: newFileId } }))).not.toBeNull();

      const url = `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${newFileId}`;

      const res = await axios.head(url);

      expect(res.status).toEqual(200);
    }, 10000);
  });

  describe('GET /files/:id/metadata', function() {
    const testFilePath = resolve(__dirname, '../../test/test-files/test-file.pdf');
    let fileId: string;

    beforeAll(async function() {
      expect(await fileExists(testFilePath)).toEqual(true);
      fileId = (await request(httpServer)
        .post('/files')
        .field('fileType', FileType.facility)
        .field('meta', JSON.stringify({ meta: 'data' }))
        .attach('file', testFilePath)
        .set(getAuthBearerHeader(accessToken))
        .expect(HttpStatus.CREATED)).body.id;
    });

    it('should respond with correct file metadata', async function() {
      const body: FileMetadataDto = (await request(httpServer)
        .get(`/files/${fileId}/metadata`)
        .set(getAuthBearerHeader(accessToken))
        .expect(HttpStatus.OK)).body;

      expect(body.id).toEqual(fileId);
      expect(body.ownerId).toEqual(user.id);
      expect(body.filename).toEqual(basename(testFilePath));
    });

    it('should respond with 404 Not Found for non-existing fileId', async function() {
      await request(httpServer)
        .get(`/files/00000000-0000-0000-0000-000000000000/metadata`)
        .set(getAuthBearerHeader(accessToken))
        .expect(HttpStatus.NOT_FOUND);
    });

    it('should require logged in user', async function() {
      await request(httpServer)
        .get(`/files/${fileId}/metadata`)
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });

  describe('PATCH /files/:id/metadata', function() {
    const testFilePath = resolve(__dirname, '../../test/test-files/test-file.pdf');
    let fileId: string;

    beforeAll(async function() {
      expect(await fileExists(testFilePath)).toEqual(true);
      fileId = (await request(httpServer)
        .post('/files')
        .field('fileType', FileType.facility)
        .field('meta', JSON.stringify({ meta: 'data' }))
        .attach('file', testFilePath)
        .set(getAuthBearerHeader(accessToken))
        .expect(HttpStatus.CREATED)).body.id;
    });

    it('should update database record', async function() {
      await request(httpServer)
        .patch(`/files/${fileId}/metadata`)
        .send({ fileType: FileType.sustainability, meta: { foo: 'bar' } })
        .set(getAuthBearerHeader(accessToken))
        .expect(HttpStatus.OK);

      const dbRecord = await filesService.getFileMetadata(fileId);
      expect(dbRecord.fileType).toEqual(FileType.sustainability);
      expect(dbRecord.meta).toEqual({ foo: 'bar' });
    });

    it('should respond with 404 Not Found for non-existing fileId', async function() {
      await request(httpServer)
        .patch(`/files/00000000-0000-0000-0000-000000000000/metadata`)
        .send({ fileType: FileType.sustainability, meta: {} })
        .set(getAuthBearerHeader(accessToken))
        .expect(HttpStatus.NOT_FOUND);
    });

    it('should require logged in user', async function() {
      await request(httpServer)
        .patch(`/files/${fileId}/metadata`)
        .send({ fileType: FileType.sustainability, meta: {} })
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });

  describe('GET /files/:id', function() {
    const testFilePath = resolve(__dirname, '../../test/test-files/test-file.pdf');
    let fileId: string;

    beforeAll(async function() {
      expect(await fileExists(testFilePath)).toEqual(true);
      fileId = (await request(httpServer)
        .post('/files')
        .field('fileType', FileType.facility)
        .field('meta', JSON.stringify({ meta: 'data' }))
        .attach('file', testFilePath)
        .set(getAuthBearerHeader(accessToken))
        .expect(HttpStatus.CREATED)).body.id;
    });

    it('should require valid authorization header', async function() {
      await request(httpServer)
        .get(`/files/${fileId}`)
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('should respond with a redirect to S3 bucket url', async function() {
      const res = await request(httpServer)
        .get(`/files/${fileId}`)
        .set(getAuthBearerHeader(accessToken))
        .expect(HttpStatus.PERMANENT_REDIRECT);

      expect(res.headers['location']).toBeDefined();
      expect(res.headers['location']).toEqual(`https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${fileId}`);
    });

    it('should respond with 404 Not Found for non-existing fileId', async function() {
      await request(httpServer)
        .get(`/files/00000000-0000-0000-0000-000000000000`)
        .set(getAuthBearerHeader(accessToken))
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('GET /files/images/:id', function() {
    const testImageFilePath = resolve(__dirname, '../../test/test-files/jash.jpeg');

    let imageFileId: string;

    beforeAll(async function() {
      expect(await fileExists(testImageFilePath)).toEqual(true);
      imageFileId = (await request(httpServer)
        .post('/files')
        .field('fileType', FileType.facility)
        .field('meta', JSON.stringify({ meta: 'data' }))
        .attach('file', testImageFilePath)
        .set(getAuthBearerHeader(accessToken))
        .expect(HttpStatus.CREATED)).body.id;
    }, 20000);

    describe('when no access token provided', function() {
      it('should respond with a redirect to S3 bucket url', async function() {
        const res = await request(httpServer)
          .get(`/files/images/${imageFileId}`)
          .expect(HttpStatus.PERMANENT_REDIRECT);

        expect(res.headers['location']).toBeDefined();
        expect(res.headers['location']).toEqual(`https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${imageFileId}`);
      });
    });
  });

});
