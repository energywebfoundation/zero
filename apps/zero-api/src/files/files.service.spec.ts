import { Test, TestingModule } from '@nestjs/testing';
import { FilesService } from './files.service';
import { PrismaService } from '../prisma/prisma.service';
import { tmpdir } from 'os';
import { resolve } from 'path';
import { Express } from 'express';
import { createAndActivateUser, createUploadedFile, fileExists, removeFolderContent } from '../../test/helpers';
import { UsersService } from '../users/users.service';
import { FileType, User, UserRole } from '@prisma/client';
import { AppModule } from '../app/app.module';
import axios from 'axios';

process.env.FILES_STORAGE = resolve(__dirname, '../../../../uploaded-files-tests');

describe('FilesService', () => {
  let module: TestingModule;
  let service: FilesService;
  let usersService: UsersService;
  let prismaService: PrismaService;
  const temporaryFolder = tmpdir();
  let user: User;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
      providers: []
    }).compile();

    service = module.get<FilesService>(FilesService);
    usersService = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);

    await prismaService.clearDatabase();

    user = await createAndActivateUser(usersService, prismaService, {
      firstName: 'test first name',
      lastName: 'test last name',
      email: 'test-email@foo.bar',
      roles: [UserRole.seller],
      password: 'a secret'
    } as User);
  });

  afterAll(async () => {
    await module.close();
  });

  beforeEach(async function() {
    await prismaService.file.deleteMany();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addFile()', function() {
    let uploadedFile: Express.Multer.File;
    const testFile = resolve(__dirname, '../../test/test-files/test-file.pdf');

    beforeEach(async function() {
      expect(await fileExists(testFile)).toEqual(true);
      uploadedFile = await createUploadedFile(testFile, temporaryFolder);
    });

    it('should create database record', async function() {
      const res = await service.addFile(uploadedFile.path, uploadedFile.originalname, uploadedFile.mimetype, user.id);

      const databaseRecord = await prismaService.file.findUnique({ where: { id: res.id } });
      expect(databaseRecord).toBeDefined();
      expect(databaseRecord.filename).toEqual(uploadedFile.originalname);
      expect(databaseRecord.ownerId).toEqual(user.id);
    });

    it('should store a file in the S3 bucket', async function() {
      const fileMetadata = await service.addFile(uploadedFile.path, uploadedFile.originalname, uploadedFile.mimetype, user.id);

      const url = `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${fileMetadata.id}`;

      const res = await axios.head(url);

      expect(res.status).toEqual(200);
      expect(res.headers['content-disposition']).toBeDefined();
      expect(res.headers['content-disposition']).toContain(`filename=${fileMetadata.filename}`);
    });
  });

  describe('getFileMetadata()', function() {
    let file;

    beforeEach(async function() {
      const uploadedFile = await createUploadedFile(resolve(__dirname, '../../test/test-files/test-file.pdf'), temporaryFolder);
      file = await service.addFile(uploadedFile.path, uploadedFile.originalname, uploadedFile.mimetype, user.id);
    });

    it('should return existing file metadata record', async function() {
      const entity = await service.getFileMetadata(file.id);
      expect(entity).not.toBeNull();
      expect(entity.ownerId).toEqual(user.id);
    });

    it('should return null when invalid file id provided', async function() {
      expect(await service.getFileMetadata('ecd9a4be-4cb4-4e68-84c8-5fdc701e1b2d')).toEqual(null);
    });
  });

  describe('updateFileMetadata()', function() {
    let file;

    beforeEach(async function() {
      const uploadedFile = await createUploadedFile(resolve(__dirname, '../../test/test-files/test-file.pdf'), temporaryFolder);
      file = await service.addFile(uploadedFile.path, uploadedFile.originalname, uploadedFile.mimetype, user.id);
    });

    it('should update file metadata record', async function() {
      const entity = await service.updateFileMetadata(
        file.id,
        {
          fileType: FileType.sustainability,
          meta: { someKey: 'some value' }
        },
        file.ownerId
      );

      expect(entity.fileType).toEqual(FileType.sustainability);
      expect(entity.meta).toEqual({ someKey: 'some value' });
    });
  });

  describe('getFileUrl()', function() {
    let file;

    beforeEach(async function() {
      const uploadedFile = await createUploadedFile(resolve(__dirname, '../../test/test-files/test-file.pdf'), temporaryFolder);
      file = await service.addFile(uploadedFile.path, uploadedFile.originalname, uploadedFile.mimetype, user.id);
    });

    it('should return a correct file S3 bucket url', async function() {
      const url = await service.getFileUrl(file.id);

      const expectedUrl = `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${file.id}`;

      expect(url).toEqual(expectedUrl);
    });
  });

  describe('getUserFilesMetadata()', function() {
    let anotherUser: User;

    beforeAll(async function() {
      anotherUser = await createAndActivateUser(usersService, prismaService, {
        firstName: 'test first name 2',
        lastName: 'test last name 2',
        email: 'test-email2@foo.bar',
        roles: [UserRole.seller],
        password: 'a secret 2'
      } as User);
    });

    beforeEach(async function() {
      const uploadedFile1 = await createUploadedFile(resolve(__dirname, '../../test/test-files/test-file.pdf'), temporaryFolder);
      await service.addFile(uploadedFile1.path, uploadedFile1.originalname, uploadedFile1.mimetype, anotherUser.id);

      const uploadedFile2 = await createUploadedFile(resolve(__dirname, '../../test/test-files/test-file.pdf'), temporaryFolder);
      await service.addFile(uploadedFile2.path, uploadedFile2.originalname, uploadedFile2.mimetype, user.id);

      const uploadedFile3 = await createUploadedFile(resolve(__dirname, '../../test/test-files/test-file.pdf'), temporaryFolder);
      await service.addFile(uploadedFile3.path, uploadedFile3.originalname, uploadedFile3.mimetype, user.id);

      const uploadedFile4 = await createUploadedFile(resolve(__dirname, '../../test/test-files/test-file.pdf'), temporaryFolder);
      await service.addFile(uploadedFile4.path, uploadedFile4.originalname, uploadedFile4.mimetype, user.id);
    });

    afterEach(async function() {
      await prismaService.file.deleteMany();
    });

    it('should return existing files metadata records of a user', async function() {
      const files = await service.getUserFilesMetadata(user.id);
      expect(files).not.toBeNull();
      expect(files.length).toEqual(3);
    });

    it('should not return files metadata of other user', async function() {
      const files = await service.getUserFilesMetadata(user.id);
      expect(files.filter(f => f.ownerId === user.id).length).toEqual(3);
    });
  });
});
