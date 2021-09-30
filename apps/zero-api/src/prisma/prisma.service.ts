import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({ log: ['warn', 'error'] });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async clearDatabase() {
    await this.truncate();
    await this.resetSequences();
  }

  async truncate() {
    const tables = (await this.$queryRaw<{tablename: string}[]>`SELECT tablename FROM pg_tables WHERE schemaname='public'`)
      .map(row => row.tablename)
      .filter(tableName => tableName !== '_prisma_migrations');

    for (const tableName of tables) {
      await this.$queryRaw(
        Prisma.sql([`TRUNCATE TABLE "public"."${tableName}" CASCADE;`])
      );
    }
  }

  async resetSequences() {
    const sequences = (await this.$queryRaw<{relname: string}[]>`SELECT c.relname FROM pg_class AS c JOIN pg_namespace AS n ON c.relnamespace = n.oid WHERE c.relkind='S' AND n.nspname='public';`).map(r => r.relname);

    for (const sequenceName of sequences) {
      await this.$queryRaw(
        Prisma.sql([`ALTER SEQUENCE "public"."${sequenceName}" RESTART WITH 1;`])
      );
    }
  }
}
