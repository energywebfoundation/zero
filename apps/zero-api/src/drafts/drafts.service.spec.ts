import { Test, TestingModule } from '@nestjs/testing';
import { DraftsService } from './drafts.service';
import { PrismaService } from '../prisma/prisma.service';

describe('DraftsService', () => {
  let module: TestingModule;
  let service: DraftsService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [DraftsService, PrismaService],
    }).compile();

    service = module.get<DraftsService>(DraftsService);
  });

  afterAll(async () => {
    await module.close();
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
