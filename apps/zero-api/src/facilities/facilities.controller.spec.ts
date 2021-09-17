import { Test, TestingModule } from '@nestjs/testing';
import { FacilitiesController } from './facilities.controller';
import { AppModule } from '../app/app.module';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { User, UserRole } from '@prisma/client';
import { createAndActivateUser, getAuthBearerHeader, logInUser } from '../../test/helpers';
import * as request from 'supertest';
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

describe('FacilitiesController', () => {
  let controller: FacilitiesController;
  let app: INestApplication;
  let httpServer;
  let prisma: PrismaService;
  let usersService: UsersService;
  let user1: User, user2: User, adminUser: User;
  let accessToken1: string, accessToken2: string, adminAccessToken: string;

  beforeAll(async function() {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = module.createNestApplication();
    await app.init();

    httpServer = app.getHttpServer();

    controller = module.get<FacilitiesController>(FacilitiesController);

    usersService = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);

    await prisma.clearDatabase();

    user1 = await createAndActivateUser(usersService, prisma, {
      firstName: 'test first name 1',
      lastName: 'test last name 1',
      email: 'test-email1@foo.bar',
      roles: [UserRole.seller],
      password: 'password'
    } as User);

    user2 = await createAndActivateUser(usersService, prisma, {
      firstName: 'test first name 2',
      lastName: 'test last name 2',
      email: 'test-email2@foo.bar',
      roles: [UserRole.seller],
      password: 'password'
    } as User);

    accessToken1 = await logInUser(app, user1.email, 'password');
    accessToken2 = await logInUser(app, user2.email, 'password');

    adminUser = await createAndActivateUser(usersService, prisma, {
      firstName: 'admin first name',
      lastName: 'admin last name',
      email: 'admin-email1@foo.bar',
      roles: [UserRole.admin],
      password: 'admin password'
    } as User);

    adminAccessToken = await logInUser(app, adminUser.email, 'admin password');
  });

  afterAll(async function() {
    await app.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  describe('POST /facilities', function() {
    it('should require a logged in user', async function() {
      await request(httpServer)
        .post('/facilities')
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('should create a new facility', async function() {
      await prisma.facility.deleteMany();

      await request(httpServer)
        .post('/facilities')
        .send(newFacilityData)
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.CREATED);

      const dbRows = await prisma.facility.findMany();
      expect(dbRows.length).toEqual(1);
      expect(dbRows[0].name).toEqual(newFacilityData.name);
    });
  });

  describe('GET /facilities', function() {
    it('should require a logged in user', async function() {
      await request(httpServer)
        .get('/facilities')
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('should require a user to have admin role', async function() {
      await request(httpServer)
        .get('/facilities')
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.FORBIDDEN);

      await request(httpServer)
        .get('/facilities')
        .set(getAuthBearerHeader(adminAccessToken))
        .expect(HttpStatus.OK);
    });

    it('should respond with facilities list', async function() {
      await prisma.facility.deleteMany();

      await request(httpServer)
        .post('/facilities')
        .send({ ...newFacilityData, name: 'My awesome facility 1', facilityId: '1' })
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.CREATED);

      await request(httpServer)
        .post('/facilities')
        .send({ ...newFacilityData, name: 'My awesome facility 2', facilityId: '2' })
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.CREATED);

      const facilities = (await request(httpServer)
        .get('/facilities')
        .set(getAuthBearerHeader(adminAccessToken))
        .expect(HttpStatus.OK)).body;

      expect(facilities.length).toEqual(2);
      expect(facilities[0].name).toEqual('My awesome facility 1');
      expect(facilities[1].name).toEqual('My awesome facility 2');
    });
  });

  describe('GET /facilities/:id', function() {
    it('should require a logged in user', async function() {
      await request(httpServer)
        .get('/facilities/1')
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('should respond with a facility details', async function() {
      await prisma.facility.deleteMany();

      const facility = (await request(httpServer)
        .post('/facilities')
        .send({ ...newFacilityData, name: 'My second awesome facility' })
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.CREATED)).body;

      const responseBody = (await request(httpServer)
        .get(`/facilities/${facility.id}`)
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.OK)).body;

      expect(responseBody).toEqual({ ...facility });
    });

    it('should respond with 404 not found when non-existing id requested', async function() {
      await prisma.facility.deleteMany();

      const facility = (await request(httpServer)
        .post('/facilities')
        .send({ ...newFacilityData, name: 'My second awesome facility' })
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.CREATED)).body;

      const responseBody = (await request(httpServer)
        .get(`/facilities/${facility.id + 1}`)
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.NOT_FOUND)).body;

      expect(responseBody).toEqual({ 'statusCode': 404, 'message': 'Not Found' });
    });
  });

  describe('PATCH /facilities/:id', function() {
    it('should require a logged in user', async function() {
      await request(httpServer)
        .patch('/facilities/1')
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('should update a facility', async function() {
      await prisma.facility.deleteMany();

      const facility = (await request(httpServer)
        .post('/facilities')
        .send({ ...newFacilityData, name: 'My facility to be updated' })
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.CREATED)).body;

      (await request(httpServer)
        .patch(`/facilities/${facility.id}`)
        .send({ name: 'My facility name updated' })
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.OK)).body;

      const facilityUpdated = await prisma.facility.findUnique({ where: { id: facility.id } });

      expect(facilityUpdated.name).toEqual('My facility name updated');
    });

    it('should deny updating not-owned facility', async function() {
      await prisma.facility.deleteMany();

      const notOwnedFacility = (await request(httpServer)
        .post('/facilities')
        .send({ ...newFacilityData, name: 'My facility to be updated' })
        .set(getAuthBearerHeader(accessToken2))
        .expect(HttpStatus.CREATED)).body;

      await request(httpServer)
        .patch(`/facilities/${notOwnedFacility.id}`)
        .send({ name: 'My facility name updated' })
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.FORBIDDEN);
    });
  });

  describe('DELETE /facilities/:id', function() {
    it('should require a logged in user', async function() {
      await request(httpServer)
        .delete('/facilities/1')
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('should remove a facility', async function() {
      await prisma.facility.deleteMany();

      const facility = (await request(httpServer)
        .post('/facilities')
        .send({ ...newFacilityData, name: 'My facility to be updated' })
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.CREATED)).body;

      await request(httpServer)
        .delete(`/facilities/${facility.id}`)
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.OK);

      expect((await prisma.facility.findMany()).length).toEqual(0);
    });

    it('should deny deleting not-owned facility', async function() {
      await prisma.facility.deleteMany();

      const notOwnedFacility = (await request(httpServer)
        .post('/facilities')
        .send({ ...newFacilityData, name: 'My facility to be updated' })
        .set(getAuthBearerHeader(accessToken2))
        .expect(HttpStatus.CREATED)).body;

      await request(httpServer)
        .delete(`/facilities/${notOwnedFacility.id}`)
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.FORBIDDEN);
    });
  });
});
