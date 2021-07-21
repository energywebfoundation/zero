import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';
import * as _ from 'lodash';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole, User, EmailConfirmation } from '@prisma/client';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

describe('UsersService', () => {
  let module: TestingModule;
  let service: UsersService;
  let prisma: PrismaService;

  const testData1: CreateUserDto = {
    firstName: 'test first name 1',
    lastName: 'test last name 1',
    email: 'test-email1@foo.bar',
    roles: [UserRole.buyer],
    password: 'test password 1'
  };
  const testData2: CreateUserDto = {
    firstName: 'test first name 2',
    lastName: 'test last name 2',
    email: 'test-email2@foo.bar',
    roles: [UserRole.seller],
    password: 'test password 2'
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [UsersService]
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);

    await prisma.clearDatabase();
  });

  afterAll(async () => {
    await module.close();
  });

  beforeEach(async () => {
    await prisma.emailConfirmation.deleteMany();
    await prisma.user.deleteMany();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', function() {
    it('should create user', async function() {
      const newUser = await service.create(testData1);

      expect(newUser).toBeDefined();
      expect(newUser.id).toBeDefined();

      const newUserFetched = await service.findOne(newUser.id);

      expect(newUserFetched.email).toEqual(testData1.email);
      expect(newUserFetched.emailConfirmed).toEqual(false);
    });

    it('should create record with hashed password', async function() {
      const newUser = await service.create(testData1);
      expect(newUser.password).not.toEqual(testData1.password);
      expect(bcrypt.compare(testData1.password, newUser.password)).toBeTruthy();
    });

    it('should create a user with multiple roles', async function() {
      const newUser = await service.create({ ...testData1, roles: [UserRole.seller, UserRole.buyer, UserRole.admin] });
      expect(newUser.roles.length).toEqual(3);
      expect(newUser.roles.sort()).toEqual([UserRole.seller, UserRole.buyer, UserRole.admin].sort());

      const newUserRecord = await service.findOne(newUser.id);
      expect(newUserRecord.roles.length).toEqual(3);
      expect(newUserRecord.roles.sort()).toEqual([UserRole.seller, UserRole.buyer, UserRole.admin].sort());
    });

    it('should reject already registered email address', async function() {
      await service.create(testData1);

      await service.create({ ...testData2, email: testData1.email }).then(() => {
        throw('Promise should be rejected');
      }).catch((err) => {
        expect(err).toBeDefined();
        expect(err).toHaveProperty('code');
        expect(err).toHaveProperty('stack');
        expect(err).toHaveProperty('message');
        expect(err.code).toEqual('P2002');
      });
    });

    it('should create EmailConfirmation entity with correct expiration set', async function() {
      const user = await service.create(testData1);

      const emailConfirmationRecords: EmailConfirmation[] = await prisma.emailConfirmation.findMany();

      expect(emailConfirmationRecords.length).toEqual(1);
      expect(emailConfirmationRecords[0].userId).toEqual(user.id);

      const expectedTTL = parseInt(process.env.EMAIL_CONFIRMATION_TTL),
        actualTTL = Math.round((emailConfirmationRecords[0].expiresAt.getTime() - emailConfirmationRecords[0].createdAt.getTime()) / 1000);
      expect(actualTTL).toEqual(expectedTTL);

      expect(emailConfirmationRecords[0].confirmedAt).toEqual(null)
    });
  });

  describe('findAll()', function() {
    it('should fetch all users created', async function() {
      const u1 = await service.create(testData1);
      const u2 = await service.create(testData2);

      const users = await service.findAll();

      expect(users.length).toEqual(2);
      expect(u1.email).toEqual(testData1.email);
      expect(u2.email).toEqual(testData2.email);
    });
  });

  describe('update()', function() {
    it('should update existing user', async function() {
      const user = await service.create(testData1);

      const userUpdated = await service.update(user.id, testData2);
      expect(userUpdated).toBeDefined();

      const keysToMatch = _.omit(Object.keys(testData1), ['password', 'createdAt', 'updatedAt']);
      expect(_.pick(testData2, keysToMatch)).toMatchObject(_.pick(testData2, keysToMatch));
    });

    it('should hash password', async function() {
      const user = await service.create(testData1);
      const userUpdated = await service.update(user.id, testData2);

      expect(bcrypt.compare(testData2.password, userUpdated.password)).toBeTruthy();
    });
  });

  describe('findByEmail()', function() {
    it('should find user by email', async function() {
      await service.create(testData1);

      expect(await service.findByEmail(testData1.email)).toBeDefined();
    });

    it('should nod find any users for non existing email', async function() {
      await service.create(testData1);

      expect(await service.findByEmail('fake@email.com')).toBeNull();
    });
  });

  describe('checkPassword()', function() {
    it('should resolve to true for a correct password', async function() {
      const u1 = await service.create(testData1);

      expect(await service.checkPassword(u1.id, testData1.password)).toEqual(true);
    });

    it('should resolve to false for incorrect password', async function() {
      const u1 = await service.create(testData1);

      expect(await service.checkPassword(u1.id, 'incorrect pass')).toEqual(false);
    });

    it('should reject with NotFoundException for non existing user', async function() {
      const u1 = await service.create(testData1);

      await service.checkPassword(u1.id + 1, testData1.password)
        .then(() => {
          throw new Error('It should be rejected');
        })
        .catch((err) => {
          expect(err).toBeDefined();
          expect(err).toBeInstanceOf(NotFoundException);
        });
    });
  });

  describe('passwordResetInitialize()', function() {
    let user: User;

    beforeEach(async () => {
      user = await service.create(testData1);
    });

    it('should create a new token for existing user', async function() {
      const token = await service.passwordResetInitialize(user.id, 3600);
      expect(token).toBeDefined();

      const dbRecord = await prisma.passwordReset.findMany({ where: { id: token } });

      expect(dbRecord).not.toBeNull();
      expect(dbRecord.length).toEqual(1);
      expect(dbRecord[0].id).toEqual(token);
      expect(dbRecord[0].userId).toEqual(user.id);
    });

    it('should forbid to create a new token for non-existing user', async function() {
      await service.passwordResetInitialize(user.id + 1, 3600)
        .then(() => {
          throw new Error('Should be rejected');
        })
        .catch((err) => {
          expect(err.code).toEqual('P2003'); // foreign key constraint fail
        });
    });
  });

  describe('passwordResetInvalidate()', function() {
    let user: User, token: string;

    beforeEach(async () => {
      user = await service.create(testData1);
      token = await service.passwordResetInitialize(user.id, 3600);
    });

    it('should set usedAt field to current time for existing token', async function() {
      await service.passwordResetInvalidate(token);

      expect(new Date((await prisma.passwordReset.findUnique({ where: { id: token } })).updatedAt).getTime()).toBeLessThanOrEqual(new Date().getTime());
    });

    it('should reject for invalid token', async function() {
      await service.passwordResetInvalidate('invalid token')
        .then(() => {
          throw new Error('Should be rejected');
        })
        .catch((err) => {
          expect(err).toBeDefined();
          expect(err).toBeInstanceOf(NotFoundException);
        });
    });

    it('should reject when token expired', async function() {
      const expiredToken = await service.passwordResetInitialize(user.id, 2);

      await delay(2010);

      await service.passwordResetInvalidate(expiredToken)
        .then(() => {
          throw new Error('Should be rejected');
        })
        .catch((err) => {
          expect(err).toBeDefined();
        });
    });

    it('should reject when already used', async function() {
      await service.passwordResetInvalidate(token);

      await service.passwordResetInvalidate(token)
        .then(() => {
          throw new Error('Should be rejected');
        })
        .catch((err) => {
          expect(err).toBeDefined();
        });
    });
  });

  describe('validatePasswordReset()', function() {
    let user: User, token: string;

    beforeEach(async () => {
      user = await service.create(testData1);
      token = await service.passwordResetInitialize(user.id, 3600);
    });

    it('should resolve to true for existing and not expired password resed token', async function() {
      expect(await service.validatePasswordReset(token)).not.toBeNull();
    });

    it('should resolve to false for non-existing token', async function() {
      expect(await service.validatePasswordReset('non existing token')).toBeNull();
    });

    it('should resolve to false for expired token', async function() {
      const expiredToken = await service.passwordResetInitialize(user.id, 2);

      await delay(2010);

      expect(await service.validatePasswordReset(expiredToken)).toBeNull();
    });

    it('should resolve to false if already used', async function() {
      await service.passwordResetInvalidate(token);

      expect(await service.validatePasswordReset(token)).toBeNull();
    });
  });

  describe('createEmailConfirmation()', function() {
    let user: User, token: string;

    beforeEach(async function() {
      user = await service.create(testData1);
      token = await service.createEmailConfirmation(user.id, 10);
      expect(token).toBeDefined();
    });

    it('should create a db record', async function() {
      const dbRecord = await prisma.emailConfirmation.findUnique({ where: { id: token } });
      expect(dbRecord).toBeDefined();
    });

    it('should create db record with correct userId', async function() {
      const dbRecord = await prisma.emailConfirmation.findUnique({ where: { id: token } });
      expect(dbRecord.userId).toEqual(user.id);
    });

    it('should create db record with correct expiration and valid', async function() {
      const dbRecord = await prisma.emailConfirmation.findUnique({ where: { id: token } });

      const expirationExpected = new Date(Date.now() + 10000).getTime();
      const expirationActual = dbRecord.expiresAt.getTime();
      expect(Math.abs(expirationExpected - expirationActual)).toBeLessThanOrEqual(1000);

      expect(dbRecord.valid).toEqual(true);
    });

    it('should invalidate all previous tokens', async function() {
      await service.createEmailConfirmation(user.id, 10);
      await service.createEmailConfirmation(user.id, 10);
      await service.createEmailConfirmation(user.id, 10);
      await service.createEmailConfirmation(user.id, 10);

      const records = await prisma.emailConfirmation.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' }
      });

      expect(records[0].valid).toEqual(true);

      expect(records.filter(r => r.valid).length).toEqual(1);
      expect(records.filter(r => !r.valid).length).toEqual(5);
    });
  });

  describe('confirmEmail()', function() {
    let user: UserDto, emailConfirmation: EmailConfirmation;

    beforeEach(async function() {
      user = await service.create(testData1);
      emailConfirmation = await prisma.emailConfirmation.findFirst({ where: { userId: user.id } });
    });

    it('should accept valid token', async function() {
      await service.confirmEmail(emailConfirmation.id);
    });


    it('should update User.emailConfirmed and emailConfirmationRecord.confirmed fields', async function() {
      await service.confirmEmail(emailConfirmation.id);

      const userRecord: User = await prisma.user.findUnique({ where: { id: user.id } });
      expect(userRecord.emailConfirmed).toEqual(true);

      const emailConfirmationRecord: EmailConfirmation = await prisma.emailConfirmation.findUnique({ where: { id: emailConfirmation.id } });
      expect(emailConfirmationRecord.confirmedAt.getTime() - Date.now()).toBeLessThanOrEqual(1000);
    });

    it('should reject invalid token', async function() {
      await service.confirmEmail('invalid token')
        .then(() => {
          throw new Error('should be rejected');
        })
        .catch((err) => {
          expect(err).toBeDefined();
          expect(err.response.statusCode).toEqual(404);
        });
    });

    it('should reject expired token', async function() {
      await prisma.emailConfirmation.update({where: {id: emailConfirmation.id}, data: {expiresAt: new Date(Date.now() - 1000)}});

      await service.confirmEmail(emailConfirmation.id)
        .then(() => {
          throw new Error('should be rejected');
        })
        .catch((err) => {
          expect(err).toBeDefined();
          expect(err.response.statusCode).toEqual(404);
        });
    });

    it('should reject already used token', async function() {
      await service.confirmEmail(emailConfirmation.id);

      await service.confirmEmail(emailConfirmation.id)
        .then(() => {
          throw new Error('should be rejected');
        })
        .catch((err) => {
          expect(err).toBeDefined();
          expect(err.response.statusCode).toEqual(404);
        });
    });
  });
});

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
