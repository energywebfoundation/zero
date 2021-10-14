import { Test, TestingModule } from '@nestjs/testing';
import { HealthcheckController } from './healthcheck.controller';
import { AppModule } from '../app/app.module';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('HealthcheckController', () => {
  let controller: HealthcheckController;
  let app: INestApplication;
  let httpServer;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = module.createNestApplication();
    await app.init();

    httpServer = app.getHttpServer();

    controller = module.get<HealthcheckController>(HealthcheckController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should respond with 200 status code', async function() {
    await request(httpServer)
      .get('/healthcheck')
      .expect(HttpStatus.OK);
  });
});
