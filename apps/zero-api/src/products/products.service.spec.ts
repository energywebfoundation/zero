import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { PrismaService } from '../prisma/prisma.service';
import { AppModule } from '../app/app.module';
import { UserDto } from '../users/dto/user.dto';
import { createAndActivateUser } from '../../test/helpers';
import { UsersService } from '../users/users.service';
import { User, UserRole } from '@prisma/client';
import { FacilitiesService } from '../facilities/facilities.service';
import { FacilityDto } from '../facilities/dto/facility.dto';

describe('ProductsService', () => {
  let module: TestingModule;
  let prisma: PrismaService;
  let service: ProductsService;
  let usersService: UsersService;
  let facilitiesService: FacilitiesService;
  let user1: UserDto;
  let user2: UserDto;
  let facility1: FacilityDto;
  let facility2: FacilityDto;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    prisma = module.get<PrismaService>(PrismaService);
    usersService = module.get<UsersService>(UsersService);
    facilitiesService = module.get<FacilitiesService>(FacilitiesService);

    await prisma.clearDatabase();

    user1 = await createAndActivateUser(usersService, prisma, {
      firstName: 'test first name 1',
      lastName: 'test last name 1',
      email: 'test-email1@foo.bar',
      roles: [UserRole.buyer],
      password: 'test password 1'
    } as User);

    user2 = await createAndActivateUser(usersService, prisma, {
      firstName: 'test first name 2',
      lastName: 'test last name 2',
      email: 'test-email2@foo.bar',
      roles: [UserRole.seller],
      password: 'test password 2'
    } as User);

    facility1 = await facilitiesService.create({ name: 'facility 1' }, user1.id);
    facility2 = await facilitiesService.create({ name: 'facility 2' }, user2.id);
  });

  afterAll(async function() {
    await module.close();
  });

  beforeEach(async function() {
    await prisma.product.deleteMany();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', function() {
    it('should create a new db record', async function() {
      expect((await prisma.product.findMany()).length).toEqual(0);
      const result = await service.create({ name: 'New product name', facilityId: facility1.id });

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.facilityId).toEqual(facility1.id);

      const dbRecords = await prisma.product.findMany();

      expect(dbRecords.length).toEqual(1);
      expect(dbRecords[0].name).toEqual('New product name');

      expect(result).toEqual(dbRecords[0]);
    });
  });

  describe('findAll()', function() {
    let r1, r2, r3;

    beforeEach(async function() {
      expect((await prisma.product.findMany()).length).toEqual(0);
      r1 = await service.create({ name: 'New product name 1', facilityId: facility1.id });
      r2 = await service.create({ name: 'New product name 2', facilityId: facility1.id });
      r3 = await service.create({ name: 'New product name 3', facilityId: facility2.id });
    });

    it('should return all db records', async function() {
      const result = await service.findAll();

      expect(result.length).toEqual(3);
      expect(result[0].name).toEqual('New product name 1');
      expect(result[1].name).toEqual('New product name 2');
      expect(result[2].name).toEqual('New product name 3');

      expect(r1).toEqual(result[0]);
      expect(r2).toEqual(result[1]);
      expect(r3).toEqual(result[2]);
    });
  });

  describe('findOne()', function() {
    it('should return a record', async function() {
      expect((await prisma.product.findMany()).length).toEqual(0);
      const r1 = await service.create({ name: 'New product name 1', facilityId: facility1.id });
      await service.create({ name: 'New product name 2', facilityId: facility1.id });
      await service.create({ name: 'New product name 3', facilityId: facility2.id });

      const result = await service.findOne(r1.id);

      expect(r1).toEqual(result);
    });
  });

  describe('update()', function() {
    let r1, r2, r3;

    beforeEach(async function() {
      expect((await prisma.product.findMany()).length).toEqual(0);
      r1 = await service.create({ name: 'New product name 1', facilityId: facility1.id });
      r2 = await service.create({ name: 'New product name 2', facilityId: facility1.id });
      r3 = await service.create({ name: 'New product name 3', facilityId: facility2.id });
    });

    it('should update a given record', async function() {
      await service.update(r1.id, { name: 'Updated product name 1' });

      expect((await prisma.product.findUnique({ where: { id: r1.id } })).name).toEqual('Updated product name 1');
      expect((await prisma.product.findUnique({ where: { id: r2.id } }))).toEqual(r2);
      expect((await prisma.product.findUnique({ where: { id: r3.id } }))).toEqual(r3);
    });
  });

  describe('remove()', function() {
    let r1, r2, r3;

    beforeEach(async function() {
      expect((await prisma.product.findMany()).length).toEqual(0);
      r1 = await service.create({ name: 'New product name 1', facilityId: facility1.id });
      r2 = await service.create({ name: 'New product name 2', facilityId: facility1.id });
      r3 = await service.create({ name: 'New product name 3', facilityId: facility2.id });
    });

    it('should remove a given record', async function() {
      await service.remove(r1.id);

      expect((await prisma.product.findUnique({ where: { id: r1.id } }))).toBeNull();
      expect((await prisma.product.findUnique({ where: { id: r2.id } }))).not.toBeNull();
      expect((await prisma.product.findUnique({ where: { id: r3.id } }))).not.toBeNull();
    });
  });
});
