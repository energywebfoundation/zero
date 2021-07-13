import { Test, TestingModule } from '@nestjs/testing';
import { DraftsController } from './drafts.controller';
import { DraftsService } from './drafts.service';
import { PrismaService } from '../prisma/prisma.service';

describe('DraftsController', () => {
  let controller: DraftsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DraftsController],
      providers: [DraftsService, PrismaService],
    }).compile();

    controller = module.get<DraftsController>(DraftsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
