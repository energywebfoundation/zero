import { PrismaClient, UserRole } from '@prisma/client'

import * as bcrypt  from 'bcryptjs';

const prisma = new PrismaClient()

async function main(){
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      firstName: "Test User 1",
      lastName: "Test User 1",
      email: "testuser1@foo.bar",
      userRole: UserRole.Seller,
      password: await bcrypt.hash('test', 8)
    }
  });

  await prisma.user.create({
    data: {
      firstName: "Test User 1",
      lastName: "Test User 1",
      email: "testuser2@foo.bar",
      userRole: UserRole.Buyer,
      password: await bcrypt.hash('test', 8)
    }
  });
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
