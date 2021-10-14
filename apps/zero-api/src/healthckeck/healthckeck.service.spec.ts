import { Test, TestingModule } from '@nestjs/testing';
import { HealthckeckService } from './healthckeck.service';
import { AppModule } from '../app/app.module';

describe('HealthckeckService', () => {
  let service: HealthckeckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    service = module.get<HealthckeckService>(HealthckeckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
