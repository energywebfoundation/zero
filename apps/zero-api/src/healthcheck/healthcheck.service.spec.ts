import { Test, TestingModule } from '@nestjs/testing';
import { HealthcheckService } from './healthcheck.service';
import { AppModule } from '../app/app.module';

describe('HealthcheckService', () => {
  let service: HealthcheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    service = module.get<HealthcheckService>(HealthcheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
