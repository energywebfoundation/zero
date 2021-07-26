import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({log: ['warn', 'error']});
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
    const tables = (await this.$queryRaw(`SELECT tablename FROM pg_tables WHERE schemaname='public'`))
      .map(row => row.tablename)
      .filter(tableName => tableName !== '_prisma_migrations');

    await Promise.all(tables.map(tableName => this.$queryRaw(`TRUNCATE TABLE "public"."${tableName}" CASCADE;`)));
  }

  async resetSequences() {
    const sequences = (await this.$queryRaw(
      `SELECT c.relname FROM pg_class AS c JOIN pg_namespace AS n ON c.relnamespace = n.oid WHERE c.relkind='S' AND n.nspname='public';`
    )).map(r => r.relname);

    await Promise.all(sequences.map(sequenceName => this.$queryRaw(`ALTER SEQUENCE "public"."${sequenceName}" RESTART WITH 1;`)));
  }
}
