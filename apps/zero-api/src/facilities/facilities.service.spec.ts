import { Test, TestingModule } from '@nestjs/testing';
import { FacilitiesService } from './facilities.service';
import { AppModule } from '../app/app.module';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';
import { createAndActivateUser } from '../../test/helpers';
import { User, UserRole } from '@prisma/client';
import { CreateFacilityDto } from './dto/create-facility.dto';


const newFacilityData: CreateFacilityDto = {
  companyName: 'Company Name',
  name: 'Facility name',
  facilityId: 'a unique id',
  registry: ['REC', 'I_REC'],
  registryId: 'registry id',
  energySource: 'BIOMASS',
  installedCapacity: 1000,
  country: 'PL',
  ownershipType: 'OWNER'
};

describe('FacilitiesService', () => {
  let module: TestingModule;
  let prisma: PrismaService;
  let service: FacilitiesService;
  let usersService: UsersService;
  let user1: UserDto;
  let user2: UserDto;

  beforeAll(async function() {
    module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    service = module.get<FacilitiesService>(FacilitiesService);
    prisma = module.get<PrismaService>(PrismaService);
    usersService = module.get<UsersService>(UsersService);

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
  });

  afterAll(async function() {
    await module.close();
  });

  beforeEach(async function() {
    await prisma.facility.deleteMany();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', function() {
    it('should create a new db record', async function() {
      expect((await prisma.facility.findMany()).length).toEqual(0);
      const result = await service.create(newFacilityData, user1.id);

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.ownerId).toEqual(user1.id);

      const dbRecords = await prisma.facility.findMany();

      expect(dbRecords.length).toEqual(1);
      expect(dbRecords[0].name).toEqual(newFacilityData.name);

      expect(result).toEqual({ ...dbRecords[0], documents: [], images: [] });
    });
  });

  describe('findAll()', function() {
    let r1, r2, r3;

    beforeEach(async function() {
      expect((await prisma.facility.findMany()).length).toEqual(0);
      r1 = await service.create({
        ...newFacilityData,
        facilityId: 'a unique id 1',
        name: 'New facility name 1'
      }, user1.id);
      r2 = await service.create({
        ...newFacilityData,
        facilityId: 'a unique id 2',
        name: 'New facility name 2'
      }, user1.id);
      r3 = await service.create({
        ...newFacilityData,
        facilityId: 'a unique id 3',
        name: 'New facility name 3'
      }, user2.id);
    });

    it('should return all db records', async function() {
      const result = await service.findAll();

      expect(result.length).toEqual(3);
      expect(result[0].name).toEqual('New facility name 1');
      expect(result[1].name).toEqual('New facility name 2');
      expect(result[2].name).toEqual('New facility name 3');

      expect(r1).toEqual({ ...result[0], documents: [], images: [] });
      expect(r2).toEqual({ ...result[1], documents: [], images: [] });
      expect(r3).toEqual({ ...result[2], documents: [], images: [] });
    });
  });

  describe('findOne()', function() {
    it('should return a record', async function() {
      expect((await prisma.facility.findMany()).length).toEqual(0);
      const r1 = await service.create({
        ...newFacilityData,
        facilityId: 'a unique id 1',
        name: 'New facility name 1'
      }, user1.id);
      await service.create({
        ...newFacilityData,
        facilityId: 'a unique id 2',
        name: 'New facility name 2'
      }, user1.id);
      await service.create({
        ...newFacilityData,
        facilityId: 'a unique id 3',
        name: 'New facility name 3'
      }, user2.id);

      const result = await service.findOne(r1.id);

      expect(r1).toEqual(result);
    });
  });

  describe('update()', function() {
    let r1, r2, r3;

    beforeEach(async function() {
      expect((await prisma.facility.findMany()).length).toEqual(0);
      r1 = await service.create({
        ...newFacilityData,
        facilityId: 'a unique id 1',
        name: 'New facility name 1'
      }, user1.id);
      r2 = await service.create({
        ...newFacilityData,
        facilityId: 'a unique id 2',
        name: 'New facility name 2'
      }, user1.id);
      r3 = await service.create({
        ...newFacilityData,
        facilityId: 'a unique id 3',
        name: 'New facility name 3'
      }, user2.id);
    });

    it('should update a given record', async function() {
      await service.update(r1.id, { name: 'Updated facility name 1' }, user1.id);

      expect((await prisma.facility.findUnique({ where: { id: r1.id } })).name).toEqual('Updated facility name 1');

      expect({
        ...(await prisma.facility.findUnique({ where: { id: r2.id } })),
        documents: [],
        images: []
      }).toEqual(r2);
      expect({
        ...(await prisma.facility.findUnique({ where: { id: r3.id } })),
        documents: [],
        images: []
      }).toEqual(r3);
    });
  });

  describe('remove()', function() {
    let r1, r2, r3;

    beforeEach(async function() {
      expect((await prisma.facility.findMany()).length).toEqual(0);
      r1 = await service.create({
        ...newFacilityData,
        facilityId: 'a unique id 1',
        name: 'New facility name 1'
      }, user1.id);
      r2 = await service.create({
        ...newFacilityData,
        facilityId: 'a unique id 2',
        name: 'New facility name 2'
      }, user1.id);
      r3 = await service.create({
        ...newFacilityData,
        facilityId: 'a unique id 3',
        name: 'New facility name 3'
      }, user2.id);
    });

    it('should remove a given record', async function() {
      await service.remove(r1.id);

      expect((await prisma.facility.findUnique({ where: { id: r1.id } }))).toBeNull();
      expect((await prisma.facility.findUnique({ where: { id: r2.id } }))).not.toBeNull();
      expect((await prisma.facility.findUnique({ where: { id: r3.id } }))).not.toBeNull();
    });
  });
});
