import { UsersService } from '../src/users/users.service';
import { PrismaService } from '../src/prisma/prisma.service';
import { User } from '@prisma/client';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { readdir, stat, unlink } from 'fs/promises';
import { resolve } from 'path';

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
