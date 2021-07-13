import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import {UserRole} from '@prisma/client'
import { AuthModule } from './auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';

describe('AuthService', () => {
  let module: TestingModule;
  let authService: AuthService;
  let prismaService: PrismaService;
  let usersService: UsersService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AuthModule, PrismaModule, UsersModule]
    }).compile();

    authService = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    usersService = module.get<UsersService>(UsersService);

    await prismaService.clearDatabase();
  })

  afterAll(async () => {
    await module.close();
  })

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should validate a user', async function() {
    const password = 'test password';
    const user = await usersService.create({
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@foo.bar',
      password,
      roles: [UserRole.seller]
    });

    expect(await authService.validateUser(user.email, password)).toBeDefined();
    expect(await authService.validateUser('incorrect@email.com', password)).toBeNull();
    expect(await authService.validateUser(user.email, 'incorrect password')).toBeNull();
  });
});
