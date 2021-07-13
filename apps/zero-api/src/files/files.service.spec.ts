import { Test, TestingModule } from '@nestjs/testing';
import { FilesService } from './files.service';
import { PrismaService } from '../prisma/prisma.service';

describe('FilesService', () => {
  let module: TestingModule;
  let service: FilesService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [FilesService, PrismaService]
    }).compile();

    service = module.get<FilesService>(FilesService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
