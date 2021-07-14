import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';
import * as _ from 'lodash';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from '@prisma/client';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

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

    await prisma.clearDatabase()
  });

  afterAll(async () => {
    await module.close();
  })

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create user', async function() {
    const newUser = await service.create(testData1);

    expect(newUser).toBeDefined();
    expect(newUser.id).toBeDefined();

    const newUserFetched = await service.findOne(newUser.id);

    expect(newUserFetched.email).toEqual(testData1.email);
  });

  it('should fetch all users created', async function() {
    const u1 = await service.create(testData1);
    const u2 = await service.create(testData2);

    const users = await service.findAll();

    expect(users.length).toEqual(2);
    expect(u1.email).toEqual(testData1.email);
    expect(u2.email).toEqual(testData2.email);
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

  it('email address should be unique', async function() {
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

  it('should update existing user', async function() {
    const user = await service.create(testData1);

    const userUpdated = await service.update(user.id, testData2);
    expect(userUpdated).toBeDefined();

    const keysToMatch = _.omit(Object.keys(testData1), ['password', 'createdAt', 'updatedAt']);
    expect(_.pick(testData2, keysToMatch)).toMatchObject(_.pick(testData2, keysToMatch));
  });

  it('should hash password when updating a user', async function() {
    const user = await service.create(testData1);
    const userUpdated = await service.update(user.id, testData2);

    expect(bcrypt.compare(testData2.password, userUpdated.password)).toBeTruthy();
  });

  it('should find user by email', async function() {
    await service.create(testData1);

    expect(await service.findByEmail(testData1.email)).toBeDefined();
  });

  it('should nod find any users for non existing email', async function() {
    await service.create(testData1);

    expect(await service.findByEmail('fake@email.com')).toBeNull();
  });
});
