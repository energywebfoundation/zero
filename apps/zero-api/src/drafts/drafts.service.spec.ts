import { Test, TestingModule } from '@nestjs/testing';
import { DraftsService } from './drafts.service';
import { PrismaService } from '../prisma/prisma.service';
import { User, UserRole, DraftType } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { DraftDto } from './dto/draft.dto';
import { UserEntity } from '../users/entities/user.entity';

describe('DraftsService', () => {
  let module: TestingModule;
  let prisma: PrismaService;
  let service: DraftsService;
  let usersService: UsersService;

  let user: User;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [DraftsService, PrismaService, UsersService]
    }).compile();

    service = module.get<DraftsService>(DraftsService);
    prisma = module.get<PrismaService>(PrismaService);
    usersService = module.get<UsersService>(UsersService);

    await prisma.clearDatabase();
  });

  beforeEach(async () => {
    await prisma.draft.deleteMany();
    await prisma.user.deleteMany();

    user = await usersService.create({
      firstName: 'test first name',
      lastName: 'test last name',
      email: 'test-email@foo.bar',
      roles: [UserRole.seller],
      password: 'a secret'
    });
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', function() {
    it('should create a record', async function() {
      const data = {
        draftType: DraftType.facility,
        data: { f1: 'val1', f2: ['v1', 'v2'] }
      };

      await service.create(user.id, data);

      const draftsFetched = await prisma.draft.findMany();
      expect(draftsFetched.length).toEqual(1);
      expect(draftsFetched[0].userId).toEqual(user.id);
      expect(draftsFetched[0].draftType).toEqual(data.draftType);
      expect(draftsFetched[0].data).toEqual(data.data);
    });
  });

  describe('findOne()', function() {
    let existing: DraftDto;
    const data = {
      draftType: DraftType.facility,
      data: { f1: 'val1', f2: ['v1', 'v2'] }
    };

    beforeEach(async () => {
      existing = (await service.create(user.id, data));
    });

    it('should return existing record', async function() {
      const fetchedRecord = await service.findOne(existing.id);
      expect(fetchedRecord).not.toBeNull();
      expect(fetchedRecord.id).toEqual(existing.id);
    });

    it('should return null when non-existing id requested', async function() {
      const result = await service.findOne(existing.id + 1);
      expect(result).toBeNull();
    });
  });

  describe('update()', function() {
    const data = {
      draftType: DraftType.facility,
      data: { f1: 'val1', f2: ['v1', 'v2'] }
    };

    it('should update existing record', async function() {
      const existingRecordId = (await service.create(user.id, data)).id;
      const result = await service.update(existingRecordId, { data: { f3: 'v3' } });

      expect(result).not.toBeNull();

      const updatedRecord = await service.findOne(existingRecordId);
      expect(updatedRecord.data).toEqual({ f3: 'v3' });
    });

    it('should reject when updating non-existing record', async function() {
      const existingRecordId = (await service.create(user.id, data)).id;
      await service.update(existingRecordId + 1, { data: { f3: 'v3' } }).then(() => {
        throw('Promise should be rejected');
      }).catch((err) => {
        expect(err).toBeDefined();
        expect(err.code).toEqual('P2025');
      });
    });
  });

  describe('findAllForUser()', function() {
    let anotherUser: UserEntity;
    beforeEach(async () => {
      const data = {
        draftType: DraftType.facility,
        data: { f1: 'val1', f2: ['v1', 'v2'] }
      };

      anotherUser = await usersService.create({
        firstName: 'test first name',
        lastName: 'test last name',
        email: 'test-email2@foo.bar',
        roles: [UserRole.seller],
        password: 'a secret'
      });

      await service.create(user.id, data);
      await service.create(user.id, data);
      await service.create(anotherUser.id, data);

    });

    it('should return all rows of a user', async function() {
      const userRows = await service.findAllForUser(user.id);

      expect(userRows.length).toEqual(2);
    });

    it('should not return rows of other users', async function() {
      const userRows = await service.findAllForUser(user.id);

      expect(userRows.filter(row => row.userId === anotherUser.id).length).toEqual(0);
    });
  });

  describe('remove()', function() {
    let rows: DraftDto[] = [];
    beforeEach(async () => {
      const data = {
        draftType: DraftType.facility,
        data: { f1: 'val1', f2: ['v1', 'v2'] }
      };

      rows = [];

      rows.push(await service.create(user.id, data));
      rows.push(await service.create(user.id, data));
      rows.push(await service.create(user.id, data));
    });

    it('should remove a row with a given id', async function() {
      await service.remove(rows[0].id);
      expect(await prisma.draft.findUnique({ where: { id: rows[0].id } })).toBeNull();
    });

    it('should not remove other rows', async function() {
      await service.remove(rows[0].id);

      expect(await prisma.draft.findUnique({ where: { id: rows[1].id } })).not.toBeNull();
      expect(await prisma.draft.findUnique({ where: { id: rows[2].id } })).not.toBeNull();
    });
  });
});
