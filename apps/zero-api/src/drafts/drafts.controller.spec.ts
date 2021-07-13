import { Test, TestingModule } from '@nestjs/testing';
import { DraftsController } from './drafts.controller';
import { DraftsService } from './drafts.service';
import { PrismaService } from '../prisma/prisma.service';

describe('DraftsController', () => {
  let module: TestingModule;
  let controller: DraftsController;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [DraftsController],
      providers: [DraftsService, PrismaService],
    }).compile();

    controller = module.get<DraftsController>(DraftsController);
  });

  afterAll(async () => {
    await module.close();
  })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
