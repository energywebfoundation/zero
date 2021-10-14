import { Test, TestingModule } from '@nestjs/testing';
import { HealthckeckController } from './healthckeck.controller';
import { AppModule } from '../app/app.module';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('HealthckeckController', () => {
  let controller: HealthckeckController;
  let app: INestApplication;
  let httpServer;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = module.createNestApplication();
    await app.init();

    httpServer = app.getHttpServer();

    controller = module.get<HealthckeckController>(HealthckeckController);
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
