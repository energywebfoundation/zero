import { PrismaClient } from '@prisma/client'

import * as bcrypt  from 'bcryptjs';

const prisma = new PrismaClient()

async function main(){
  await prisma.user.create({
    data: {
      name: "Test User 1",
      email: "testuser1@foo.bar",
      password: await bcrypt.hash('test', 8)
    }
  });

  await prisma.user.create({
    data: {
      name: "Test User 2",
      email: "testuser2@foo.bar",
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
