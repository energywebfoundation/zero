import { HttpStatus, INestApplication } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app/app.module';
import { UsersDraftsController } from './users-drafts.controller';
import { DraftsService } from '../drafts/drafts.service';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { User, UserRole, DraftType } from '@prisma/client';
import * as request from 'supertest';
import { DraftDto } from '../drafts/dto/draft.dto';
import { CreateDraftDto } from '../drafts/dto/create-draft.dto';
import { UpdateDraftDto } from '../drafts/dto/update-draft.dto';
import { createAndActivateUser, getAuthBearerHeader, logInUser } from '../../test/helpers';

describe('UsersDraftsController', function() {
  let app: INestApplication;
  let httpServer;
  let controller: UsersDraftsController;
  let prisma: PrismaService;
  let usersService: UsersService;
  let draftsService: DraftsService;

  let user1: UserDto, user2: UserDto, adminUser: UserDto;
  let accessToken1: string, adminAccessToken: string;

  const password1 = 'pass1', password2 = 'pass2';

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersDraftsController],
      providers: [UsersService, DraftsService, PrismaService],
      imports: [AppModule]
    }).compile();

    app = module.createNestApplication();
    await app.init();

    httpServer = app.getHttpServer();

    controller = module.get<UsersDraftsController>(UsersDraftsController);
    prisma = module.get<PrismaService>(PrismaService);
    usersService = module.get<UsersService>(UsersService);
    draftsService = module.get<DraftsService>(DraftsService);

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

    adminUser = await createAndActivateUser(usersService, prisma, {
      firstName: 'test first name admin',
      lastName: 'test last name admin',
      email: 'test-email-admin@foo.bar',
      roles: [UserRole.admin],
      password: 'admin password'
    } as User);

    adminAccessToken = await logInUser(app, adminUser.email, 'admin password');
  });

  afterAll(async () => {
    await app?.close();
  });

  beforeEach(async () => {
    await prisma.draft.deleteMany();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET users/:userId/drafts', function() {
    it('should respond with drafts of a logged in user', async function() {
      await draftsService.create(user1.id, { data: [], draftType: DraftType.facility });
      await draftsService.create(user1.id, { data: [], draftType: DraftType.facility });
      await draftsService.create(user1.id, { data: [], draftType: DraftType.facility });
      await draftsService.create(user2.id, { data: [], draftType: DraftType.facility });
      await draftsService.create(user2.id, { data: [], draftType: DraftType.facility });

      const drafts = (await request(httpServer)
        .get(`/users/${user1.id}/drafts`)
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.OK)).body as DraftDto[];

      expect(drafts.length).toEqual(3);
      expect(drafts.filter(d => d.userId === user1.id).length).toEqual(drafts.length);
    });

    it('should deny access to drafts of another user if not admin', async function() {
      await draftsService.create(user1.id, { data: [], draftType: DraftType.facility });
      await draftsService.create(user2.id, { data: [], draftType: DraftType.facility });

      const body = (await request(httpServer)
        .get(`/users/${user2.id}/drafts`)
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.FORBIDDEN)).body;

      expect(body.drafts).not.toBeDefined();
    });

    it('should allow access to drafts of another user if admin', async function() {
      await draftsService.create(user1.id, { data: [], draftType: DraftType.facility });
      await draftsService.create(user2.id, { data: [], draftType: DraftType.facility });

      const drafts = (await request(httpServer)
        .get(`/users/${user2.id}/drafts`)
        .set(getAuthBearerHeader(adminAccessToken))
        .expect(HttpStatus.OK)).body as DraftDto[];

      expect(drafts.length).toEqual(1);
    });
  });
});
