import { Test, TestingModule } from '@nestjs/testing';
import { HealthckeckService } from './healthckeck.service';

describe('HealthckeckService', () => {
  let service: HealthckeckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthckeckService]
    }).compile();

    service = module.get<HealthckeckService>(HealthckeckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
