import { HttpStatus, INestApplication } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app/app.module';
import { UsersDraftsController } from './users-drafts.controller';
import { DraftsService } from '../drafts/drafts.service';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
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

  let user1: UserEntity, user2: UserEntity;
  let accessToken1: string

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

    user2 = await createAndActivateUser(usersService, prisma,{
      firstName: 'test first name 2',
      lastName: 'test last name 2',
      email: 'test-email2@foo.bar',
      roles: [UserRole.seller],
      password: password2
    } as User);
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

    it('should deny access to drafts of another user', async function() {
      await draftsService.create(user1.id, { data: [], draftType: DraftType.facility });
      await draftsService.create(user2.id, { data: [], draftType: DraftType.facility });

      const body = (await request(httpServer)
        .get(`/users/${user2.id}/drafts`)
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.FORBIDDEN)).body;

      expect(body.drafts).not.toBeDefined();
    });
  });

  describe('POST users/:userId/drafts', function() {
    it('should create a draft for a logged in user', async function() {
      const newDraft = (await request(httpServer)
        .post(`/users/${user1.id}/drafts`)
        .send({ data: {}, draftType: DraftType.facility } as CreateDraftDto)
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.CREATED)).body as DraftDto;

      expect(newDraft.userId).toEqual(user1.id);

      expect(await prisma.draft.findUnique({ where: { id: newDraft.id } })).not.toBeNull();
    });

    it('should deny creation of a draft for another user', async function() {
      const body = (await request(httpServer)
        .post(`/users/${user2.id}/drafts`)
        .send({ data: {}, draftType: DraftType.facility } as CreateDraftDto)
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.FORBIDDEN)).body;

      expect(body.id).not.toBeDefined();

      expect((await prisma.draft.findMany()).length).toEqual(0);
    });
  });

  describe('GET users/:userId/drafts/:id', function() {
    it('should return a user\'s draft', async function() {
      const user1Draft = await draftsService.create(user1.id, { data: [], draftType: DraftType.facility });
      await draftsService.create(user2.id, { data: [], draftType: DraftType.facility });

      const draft = (await request(httpServer)
        .get(`/users/${user1.id}/drafts/${user1Draft.id}`)
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.OK)).body as DraftDto;

      expect(draft.id).toEqual(user1Draft.id);
    });

    it('should deny access to other user\' draft', async function() {
      await draftsService.create(user1.id, { data: [], draftType: DraftType.facility });
      const user2Draft = await draftsService.create(user2.id, { data: [], draftType: DraftType.facility });

      const body = (await request(httpServer)
        .get(`/users/${user1.id}/drafts/${user2Draft.id}`)
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.NOT_FOUND)).body;

      expect(body.id).not.toBeDefined();
    });
  });

  describe('PUT users/:userId/drafts/:id', function() {
    it('should update existing draft of a logged-in user', async function() {
      const existingDraft = await draftsService.create(user1.id, { data: [], draftType: DraftType.facility });

      const draftModified = (await request(httpServer)
        .put(`/users/${user1.id}/drafts/${existingDraft.id}`)
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
        .put(`/users/${user1.id}/drafts/${draft1.id}`)
        .send({ data: {}, draftType: DraftType.facility } as UpdateDraftDto)
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.OK);

      const draft2dbRecord = await prisma.draft.findUnique({ where: { id: draft2.id } });
      expect(draft2dbRecord.data).toEqual([]);
    });

    it('should refuse to update non-existing draft', async function() {
      const existingDraft = await draftsService.create(user1.id, { data: [], draftType: DraftType.facility });

      const body = (await request(httpServer)
        .put(`/users/${user1.id}/drafts/${existingDraft.id + 1}`)
        .send({ data: {}, draftType: DraftType.facility } as UpdateDraftDto)
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.NOT_FOUND)).body;

      expect(body.id).not.toBeDefined();
    });

    it('should refuse to update draft of another user\'', async function() {
      const anotherUsersDraft = await draftsService.create(user2.id, { data: [], draftType: DraftType.facility });

      const body = (await request(httpServer)
        .put(`/users/${user1.id}/drafts/${anotherUsersDraft.id + 1}`)
        .send({ data: {}, draftType: DraftType.facility } as UpdateDraftDto)
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.NOT_FOUND)).body;

      expect(body.id).not.toBeDefined();
    });
  });

  describe('DELETE users/:userId/drafts/:id', function() {
    it('should delete existing draft of a user', async function() {
      const existingDraft = await draftsService.create(user1.id, { data: [], draftType: DraftType.facility });

      await request(httpServer)
        .delete(`/users/${user1.id}/drafts/${existingDraft.id}`)
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.OK);

      expect(await prisma.draft.findUnique({ where: { id: existingDraft.id } })).toBeNull();
    });

    it('should delete only a draft with the given id', async function() {
      const existingDraft = await draftsService.create(user1.id, { data: [], draftType: DraftType.facility });
      const anotherDraft = await draftsService.create(user1.id, { data: [], draftType: DraftType.facility });

      await request(httpServer)
        .delete(`/users/${user1.id}/drafts/${existingDraft.id}`)
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.OK);

      expect(await prisma.draft.findUnique({ where: { id: anotherDraft.id } })).not.toBeNull();
    });

    it('should refuse to delete non-existing draft', async function() {
      const existingDraft = await draftsService.create(user1.id, { data: [], draftType: DraftType.facility });

      await request(httpServer)
        .delete(`/users/${user1.id}/drafts/${existingDraft.id + 1}`)
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.NOT_FOUND);

      expect(await prisma.draft.findUnique({ where: { id: existingDraft.id } })).not.toBeNull();
    });

    it('should refuse to delete draft of another user', async function() {
      const existingDraft = await draftsService.create(user1.id, { data: [], draftType: DraftType.facility });
      const anotherDraft = await draftsService.create(user2.id, { data: [], draftType: DraftType.facility });

      await request(httpServer)
        .delete(`/users/${user1.id}/drafts/${anotherDraft.id}`)
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.NOT_FOUND);

      expect(await prisma.draft.findUnique({ where: { id: existingDraft.id } })).not.toBeNull();
      expect(await prisma.draft.findUnique({ where: { id: anotherDraft.id } })).not.toBeNull();
    });
  });
});
