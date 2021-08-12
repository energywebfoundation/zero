import { PrismaClient, UserRole } from '@prisma/client';

import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      firstName: 'Test User 1',
      lastName: 'Test User 1',
      email: 'testuser1@foo.bar',
      emailConfirmed: true,
      roles: UserRole.seller,
      password: await bcrypt.hash('test', 8)
    }
  });

  await prisma.user.create({
    data: {
      firstName: 'Test User 2',
      lastName: 'Test User 2',
      email: 'testuser2@foo.bar',
      emailConfirmed: true,
      roles: UserRole.buyer,
      password: await bcrypt.hash('test', 8)
    }
  });

  await prisma.user.create({
    data: {
      firstName: 'Test User 3',
      lastName: 'Test User 3',
      email: 'testuser3@foo.bar',
      emailConfirmed: false,
      roles: [UserRole.seller, UserRole.buyer],
      password: await bcrypt.hash('test', 8)
    }
  });

  await prisma.user.create({
    data: {
      firstName: 'Admin',
      lastName: 'Admin',
      email: 'testadmin@foo.bar',
      emailConfirmed: true,
      roles: [UserRole.admin],
      password: await bcrypt.hash('test', 8)
    }
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
