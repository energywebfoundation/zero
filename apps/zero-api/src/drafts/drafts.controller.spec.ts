import { HttpStatus, INestApplication } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { DraftsService } from './drafts.service';
import { UserDto } from '../users/dto/user.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app/app.module';
import { createAndActivateUser, getAuthBearerHeader, logInUser } from '../../test/helpers';
import { DraftType, User, UserRole } from '@prisma/client';
import { CreateDraftDto } from './dto/create-draft.dto';
import { DraftDto } from './dto/draft.dto';
import * as request from 'supertest';
import { UpdateDraftDto } from './dto/update-draft.dto';
import { DraftsController } from './drafts.controller';

describe('DraftsController', function() {
  let app: INestApplication;
  let httpServer;
  let controller: DraftsController;
  let prisma: PrismaService;
  let usersService: UsersService;
  let draftsService: DraftsService;

  let user1: UserDto, user2: UserDto, adminUser: UserDto;
  let accessToken1: string, adminAccessToken: string;

  const password1 = 'pass1', password2 = 'pass2';

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DraftsController],
      providers: [UsersService, DraftsService, PrismaService],
      imports: [AppModule]
    }).compile();

    app = module.createNestApplication();
    await app.init();

    httpServer = app.getHttpServer();

    controller = module.get<DraftsController>(DraftsController);
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

  describe('POST /drafts', function() {
    it('should require a logged in user', async function() {
      await request(httpServer)
        .post(`/drafts`)
        .send({ data: {}, draftType: DraftType.facility } as CreateDraftDto)
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('should create a draft for a logged in user', async function() {
      const newDraft = (await request(httpServer)
        .post(`/drafts`)
        .send({ data: {}, draftType: DraftType.facility } as CreateDraftDto)
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.CREATED)).body as DraftDto;

      expect(newDraft.userId).toEqual(user1.id);

      expect(await prisma.draft.findUnique({ where: { id: newDraft.id } })).not.toBeNull();
    });
  });

  describe('GET /drafts/:id', function() {
    it('should respond with a draft', async function() {
      const user1Draft = await draftsService.create(user1.id, { data: [], draftType: DraftType.facility });
      await draftsService.create(user2.id, { data: [], draftType: DraftType.facility });

      const draft = (await request(httpServer)
        .get(`/drafts/${user1Draft.id}`)
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.OK)).body as DraftDto;

      expect(draft.id).toEqual(user1Draft.id);
    });

    it('should respond with 404 NotFound if non-existing draftId requested', async function() {
      await draftsService.create(user1.id, { data: [], draftType: DraftType.facility });
      await draftsService.create(user2.id, { data: [], draftType: DraftType.facility });

      (await request(httpServer)
        .get(`/drafts/123`)
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.NOT_FOUND));
    });

    it('should deny access to other user\'s draft if not admin', async function() {
      await draftsService.create(user1.id, { data: [], draftType: DraftType.facility });
      const user2Draft = await draftsService.create(user2.id, { data: [], draftType: DraftType.facility });

      const body = (await request(httpServer)
        .get(`/${user2Draft.id}`)
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.NOT_FOUND)).body;

      expect(body.id).not.toBeDefined();
    });

    it('should allow access to other user\'s draft if admin', async function() {
      const { id: draftId } = await draftsService.create(user1.id, { data: [], draftType: DraftType.facility });

      const body = (await request(httpServer)
        .get(`/drafts/${draftId}`)
        .set(getAuthBearerHeader(adminAccessToken))
        .expect(HttpStatus.OK)).body as DraftDto;

      expect(body.id).toBeDefined();
      expect(body.userId).toEqual(user1.id);
    });
  });

  describe('PUT /drafts/:id', function() {
    it('should update existing draft of a logged-in user', async function() {
      const existingDraft = await draftsService.create(user1.id, { data: [], draftType: DraftType.facility });

      const draftModified = (await request(httpServer)
        .put(`/drafts/${existingDraft.id}`)
        .send({ data: {}, draftType: DraftType.facility } as UpdateDraftDto)
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.OK)).body as DraftDto;

      expect(draftModified.id).toEqual(existingDraft.id);
      expect(draftModified.data).toEqual({});
    });

    it('should update only a draft with a given id', async function() {
      const draft1 = await draftsService.create(user1.id, { data: [], draftType: DraftType.facility });
      const draft2 = await draftsService.create(user1.id, { data: [], draftType: DraftType.facility });

      await request(httpServer)
        .put(`/drafts/${draft1.id}`)
        .send({ data: {}, draftType: DraftType.facility } as UpdateDraftDto)
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.OK);

      const draft2dbRecord = await prisma.draft.findUnique({ where: { id: draft2.id } });
      expect(draft2dbRecord.data).toEqual([]);
    });

    it('should refuse to update non-existing draft', async function() {
      const existingDraft = await draftsService.create(user1.id, { data: [], draftType: DraftType.facility });

      const body = (await request(httpServer)
        .put(`/drafts/${existingDraft.id + 1}`)
        .send({ data: {}, draftType: DraftType.facility } as UpdateDraftDto)
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.NOT_FOUND)).body;

      expect(body.id).not.toBeDefined();
    });

    it('should refuse to update draft of another user if not admin', async function() {
      const anotherUsersDraft = await draftsService.create(user2.id, { data: [], draftType: DraftType.facility });

      const body = (await request(httpServer)
        .put(`/drafts/${anotherUsersDraft.id}`)
        .send({ data: {}, draftType: DraftType.facility } as UpdateDraftDto)
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.FORBIDDEN)).body;

      expect(body.id).not.toBeDefined();
    });

    it('should allow to update draft of another user if admin', async function() {
      const draft = await draftsService.create(user2.id, { data: [], draftType: DraftType.facility });

      await request(httpServer)
        .put(`/drafts/${draft.id}`)
        .send({ data: {}, draftType: DraftType.facility } as UpdateDraftDto)
        .set(getAuthBearerHeader(adminAccessToken))
        .expect(HttpStatus.OK);

      const dbRecord = await prisma.draft.findUnique({ where: { id: draft.id } });

      expect(dbRecord.userId).toEqual(user2.id);
      expect(dbRecord.data).toEqual({});
    });
  });

  describe('DELETE /drafts/:id', function() {
    it('should delete existing draft of a user', async function() {
      const existingDraft = await draftsService.create(user1.id, { data: [], draftType: DraftType.facility });

      await request(httpServer)
        .delete(`/drafts/${existingDraft.id}`)
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.OK);

      expect(await prisma.draft.findUnique({ where: { id: existingDraft.id } })).toBeNull();
    });

    it('should delete only a draft with the given id', async function() {
      const existingDraft = await draftsService.create(user1.id, { data: [], draftType: DraftType.facility });
      const anotherDraft = await draftsService.create(user1.id, { data: [], draftType: DraftType.facility });

      await request(httpServer)
        .delete(`/drafts/${existingDraft.id}`)
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.OK);

      expect(await prisma.draft.findUnique({ where: { id: anotherDraft.id } })).not.toBeNull();
    });

    it('should refuse to delete non-existing draft', async function() {
      const existingDraft = await draftsService.create(user1.id, { data: [], draftType: DraftType.facility });

      await request(httpServer)
        .delete(`/drafts/${existingDraft.id + 1}`)
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.NOT_FOUND);

      expect(await prisma.draft.findUnique({ where: { id: existingDraft.id } })).not.toBeNull();
    });

    it('should refuse to delete draft of another user if not admin', async function() {
      const existingDraft = await draftsService.create(user1.id, { data: [], draftType: DraftType.facility });
      const anotherDraft = await draftsService.create(user2.id, { data: [], draftType: DraftType.facility });

      await request(httpServer)
        .delete(`/drafts/${anotherDraft.id}`)
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.FORBIDDEN);

      expect(await prisma.draft.findUnique({ where: { id: existingDraft.id } })).not.toBeNull();
      expect(await prisma.draft.findUnique({ where: { id: anotherDraft.id } })).not.toBeNull();
    });
  });
});
