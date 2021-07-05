import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from '@prisma/client'

describe('UsersService', () => {
  let service: UsersService;
  const testData1: CreateUserDto = {
    firstName: 'test first name 1',
    lastName: 'test last name 1',
    email: 'test-email1@foo.bar',
    role: Role.Buyer,
    password: 'test password 1'
  };
  const testData2: CreateUserDto = {
    firstName: 'test first name 2',
    lastName: 'test last name 2',
    email: 'test-email2@foo.bar',
    role: Role.Seller,
    password: 'test password 2'
    };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);

    await Promise.all((await service.findAll()).map(async (user) => await service.remove(user.id)))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create user', async function() {
    const newUser = await service.create(testData1);

    expect(newUser).toBeDefined();
    expect(newUser.id).toBeDefined();

    const newUserFetched = await service.findOne(newUser.id)

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
    expect(bcrypt.compare(testData1.password, newUser.password));
  });

  it('email address should be unique', async function() {
    await service.create(testData1);

    await service.create({...testData2, email: testData1.email}).then(() => {
      throw('Promise should be rejected');
    }).catch((err) => {
      expect(err).toBeDefined();
      expect(err).toHaveProperty('code')
      expect(err).toHaveProperty('stack')
      expect(err).toHaveProperty('message')
      expect(err.code).toEqual('P2002');
    })
  });
});