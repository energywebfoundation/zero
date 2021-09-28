import { UsersService } from '../src/users/users.service';
import { PrismaService } from '../src/prisma/prisma.service';
import { User } from '@prisma/client';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { copyFile, readdir, stat, unlink } from 'fs/promises';
import { basename, resolve } from 'path';
import { Express } from 'express';
import { tmpdir } from 'os';
import { FilesService } from '../src/files/files.service';

const temporaryFolder = tmpdir();

export async function logInUser(app: INestApplication, username: string, password: string): Promise<string> {
  return (await request(app.getHttpServer())
    .post('/auth/login')
    .send({ username, password })
    .expect(HttpStatus.OK)).body.accessToken;
}

export function getAuthBearerHeader(token: string): { Authorization: string } {
  return { Authorization: `Bearer ${token}` };
}

export async function createAndActivateUser(usersService: UsersService, prisma: PrismaService, data: User): Promise<User> {
  const newUser = await usersService.create(data);
  await usersService.confirmEmail((await prisma.emailConfirmation.findFirst({ where: { userId: newUser.id } })).id);

  return newUser;
}

export async function fileExists(path) {
  return !!(await stat(path).catch(() => false));
}

export async function removeFolderContent(path) {
  const files = await readdir(path);
  await Promise.all(files.map(file => unlink(resolve(path, file))));
}

export async function createUploadedFile(testFile: string, temporaryFolder: string): Promise<Express.Multer.File> {
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

export async function createDocumentDbRecord(prismaService: PrismaService, ownerId: number) {
  return prismaService.file.create({
    data: {
      filename: 'foo-bar.pdf',
      ownerId,
      mimetype: 'application/pdf',
      uploadedAt: new Date(),
      processingCompletedAt: new Date(Date.now() + 300)
    }
  });
}

export async function createImageDbRecord(prismaService: PrismaService, ownerId: number) {
  return prismaService.file.create({
    data: {
      filename: 'foo-bar.jpg',
      ownerId,
      mimetype: 'image/jpeg',
      uploadedAt: new Date(),
      processingCompletedAt: new Date(Date.now() + 300)
    }
  });
}
