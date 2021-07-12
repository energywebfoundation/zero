import { Test, TestingModule } from '@nestjs/testing';

import { AppService } from './app.service';

describe('AppService', () => {
  let module: TestingModule;
  let service: AppService;

  beforeAll(async () => {
   module = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  afterAll(async () => {
    await module.close();
  })

  describe('getData', () => {
    it('should return "Welcome to zero-api!"', () => {
      expect(service.getData()).toEqual({ message: 'Welcome to zero-api!' });
    });
  });
});
