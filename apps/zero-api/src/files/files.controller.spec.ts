import { Test, TestingModule } from '@nestjs/testing';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { PrismaService } from '../prisma/prisma.service';

describe('FilesController', () => {
  let module: TestingModule;
  let controller: FilesController;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [FilesController],
      providers: [FilesService, PrismaService]
    }).compile();

    controller = module.get<FilesController>(FilesController);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
