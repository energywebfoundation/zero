import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { AppModule } from '../app/app.module';

describe('EmailService', () => {
  let service: EmailService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [EmailService],
    }).compile();

    service = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
