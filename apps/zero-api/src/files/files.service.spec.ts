import { Test, TestingModule } from '@nestjs/testing';
import { FilesService } from './files.service';
import { PrismaService } from '../prisma/prisma.service';
import { tmpdir } from 'os';
import { basename, resolve } from 'path';
import { Express } from 'express';
import { createAndActivateUser, createUploadedFile, fileExists, removeFolderContent } from '../../test/helpers';
import { UsersService } from '../users/users.service';
import { User, UserRole } from '@prisma/client';
import { ReadStream } from 'fs';

process.env.FILES_STORAGE = resolve(__dirname, '../../../../uploaded-files-tests');

describe('FilesService', () => {
  let module: TestingModule;
  let service: FilesService;
  let usersService: UsersService;
  let prismaService: PrismaService;
  const temporaryFolder = tmpdir();
  const destinationFolder = resolve(process.env.FILES_STORAGE || tmpdir());
  let user: User;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [FilesService, PrismaService, UsersService]
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
    await removeFolderContent(destinationFolder);
  });

  beforeEach(async function() {
    await prismaService.file.deleteMany();
    await removeFolderContent(destinationFolder);
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
      const res = await service.addFile(uploadedFile, user.id);

      const databaseRecord = await prismaService.file.findUnique({ where: { id: res.id } });
      expect(databaseRecord).toBeDefined();
      expect(databaseRecord.filename).toEqual(uploadedFile.originalname);
      expect(databaseRecord.ownerId).toEqual(user.id);
    });

    it('should store a file in the destination folder', async function() {
      const res = await service.addFile(uploadedFile, user.id);

      expect(await fileExists(resolve(destinationFolder, res.id))).toEqual(true);
    });
  });

  describe('getFileMetadata()', function() {
    let file;

    beforeEach(async function() {
      const uploadedFile = await createUploadedFile(resolve(__dirname, '../../test/test-files/test-file.pdf'), temporaryFolder);
      file = await service.addFile(uploadedFile, user.id);
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

  describe('getFileContentStream()', function() {
    let file;

    beforeEach(async function() {
      const uploadedFile = await createUploadedFile(resolve(__dirname, '../../test/test-files/test-file.pdf'), temporaryFolder);
      file = await service.addFile(uploadedFile, user.id);
    });

    it('should return a file stream', async function() {
      const stream = await service.getFileContentStream(file.id);
      expect(stream).not.toBeNull();
      expect(stream).toBeInstanceOf(ReadStream);
      expect(basename(stream.path as string)).toEqual(file.id);
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

      await service.addFile(await createUploadedFile(resolve(__dirname, '../../test/test-files/test-file.pdf'), temporaryFolder), anotherUser.id)

      await service.addFile(await createUploadedFile(resolve(__dirname, '../../test/test-files/test-file.pdf'), temporaryFolder), user.id)
      await service.addFile(await createUploadedFile(resolve(__dirname, '../../test/test-files/test-file.pdf'), temporaryFolder), user.id)
      await service.addFile(await createUploadedFile(resolve(__dirname, '../../test/test-files/test-file.pdf'), temporaryFolder), user.id)
    });

    afterEach(async function() {
      await prismaService.file.deleteMany();
      await removeFolderContent(destinationFolder);
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
