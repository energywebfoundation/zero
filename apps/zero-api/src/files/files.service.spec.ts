import { Test, TestingModule } from '@nestjs/testing';
import { FilesService } from './files.service';
import { PrismaService } from '../prisma/prisma.service';
import { tmpdir } from 'os';
import { basename, resolve } from 'path';
import { Express } from 'express';
import { copyFile, stat } from 'fs/promises';
import { createAndActivateUser, fileExists, removeFolderContent } from '../../test/helpers';
import { UsersService } from '../users/users.service';
import { User, UserRole } from '@prisma/client';

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
});

async function createUploadedFile(testFile: string, temporaryFolder: string): Promise<Express.Multer.File> {
  const filename = basename(testFile);
  const uploadedPath = resolve(temporaryFolder, filename);

  await copyFile(testFile, uploadedPath);

  return {
    fieldname: 'file',
    originalname: filename,
    encoding: '7bit',
    mimetype: 'application/pdf',
    destination: temporaryFolder,
    filename,
    path: uploadedPath,
    size: (await stat(testFile)).size,
    buffer: null,
    stream: null
  };
}
