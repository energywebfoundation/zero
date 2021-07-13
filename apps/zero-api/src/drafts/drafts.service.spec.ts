import { Test, TestingModule } from '@nestjs/testing';
import { DraftsService } from './drafts.service';

describe('DraftsService', () => {
  let service: DraftsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DraftsService],
    }).compile();

    service = module.get<DraftsService>(DraftsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
