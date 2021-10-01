import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { createAndActivateUser, getAuthBearerHeader, logInUser } from '../../test/helpers';
import { AppModule } from '../app/app.module';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import { User, UserRole } from '@prisma/client';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { FacilitiesService } from '../facilities/facilities.service';
import { FacilityDto } from '../facilities/dto/facility.dto';
import { CreateFacilityDto } from '../facilities/dto/create-facility.dto';

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

describe('ProductsController', () => {
  let controller: ProductsController;
  let app: INestApplication;
  let httpServer;
  let prisma: PrismaService;
  let usersService: UsersService;
  let facilitiesService: FacilitiesService;
  let user1: User, accessToken1: string;
  let adminUser: User, adminAccessToken: string;
  let user2: User, accessToken2: string;
  let facility1: FacilityDto, facility2: FacilityDto;

  beforeAll(async function() {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = module.createNestApplication();
    await app.init();

    httpServer = app.getHttpServer();

    controller = module.get<ProductsController>(ProductsController);
    usersService = module.get<UsersService>(UsersService);
    facilitiesService = module.get<FacilitiesService>(FacilitiesService);
    prisma = module.get<PrismaService>(PrismaService);

    await prisma.clearDatabase();

    user1 = await createAndActivateUser(usersService, prisma, {
      firstName: 'test first name 1',
      lastName: 'test last name 1',
      email: 'test-email1@foo.bar',
      roles: [UserRole.seller],
      password: 'password'
    } as User);

    accessToken1 = await logInUser(app, user1.email, 'password');


    user2 = await createAndActivateUser(usersService, prisma, {
      firstName: 'test first name 2',
      lastName: 'test last name 2',
      email: 'test-email2@foo.bar',
      roles: [UserRole.seller],
      password: 'password'
    } as User);

    accessToken2 = await logInUser(app, user2.email, 'password');

    adminUser = await createAndActivateUser(usersService, prisma, {
      firstName: 'admin first name',
      lastName: 'admin last name',
      email: 'admin-email1@foo.bar',
      roles: [UserRole.admin],
      password: 'admin password'
    } as User);

    adminAccessToken = await logInUser(app, adminUser.email, 'admin password');

    facility1 = await facilitiesService.create({
      ...newFacilityData,
      facilityId: 'a unique id 1',
      name: 'New facility name 1'
    }, user1.id);
    facility2 = await facilitiesService.create({
      ...newFacilityData,
      facilityId: 'a unique id 2',
      name: 'New facility name 2'
    }, user2.id);
  });

  afterAll(async function() {
    await app.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST /products', function() {
    it('should require a logged in user', async function() {
      await request(httpServer)
        .post('/products')
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('should create a new product', async function() {
      await prisma.product.deleteMany();

      await request(httpServer)
        .post('/products')
        .send({ name: 'My first awesome product', facilityId: facility1.id })
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.CREATED);

      const dbRows = await prisma.product.findMany();
      expect(dbRows.length).toEqual(1);
      expect(dbRows[0].name).toEqual('My first awesome product');
    });

    it('should deny creating a product for not-owned facility', async function() {
      await prisma.product.deleteMany();

      const resBody = (await request(httpServer)
        .post('/products')
        .send({ name: 'My first awesome product', facilityId: facility2.id })
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.FORBIDDEN)).body;

      expect(resBody).toEqual({
        'error': 'Forbidden',
        'message': `userId=${user1.id} is not an owner of facilityId=${facility2.id}`,
        'statusCode': 403
      });
    });

    it('should deny creating a product for non-existing facility', async function() {
      await prisma.product.deleteMany();

      const resBody = (await request(httpServer)
        .post('/products')
        .send({ name: 'My first awesome product', facilityId: '91fa679d-9bfe-456f-b564-d57107182068' })
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.BAD_REQUEST)).body;

      expect(resBody).toEqual({
        'error': 'Bad Request',
        'message': 'non-existing facilityId=91fa679d-9bfe-456f-b564-d57107182068',
        'statusCode': 400
      });
    });
  });

  describe('GET /products', function() {
    it('should require a logged in user', async function() {
      await request(httpServer)
        .get('/products')
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('should require a user to have admin role', async function() {
      await request(httpServer)
        .get('/products')
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.FORBIDDEN);

      await request(httpServer)
        .get('/products')
        .set(getAuthBearerHeader(adminAccessToken))
        .expect(HttpStatus.OK);
    });

    it('should respond with products list', async function() {
      await prisma.product.deleteMany();

      await request(httpServer)
        .post('/products')
        .send({ name: 'My awesome product 1', facilityId: facility1.id })
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.CREATED);

      await request(httpServer)
        .post('/products')
        .send({ name: 'My awesome product 2', facilityId: facility1.id })
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.CREATED);

      const products = (await request(httpServer)
        .get('/products')
        .set(getAuthBearerHeader(adminAccessToken))
        .expect(HttpStatus.OK)).body;

      expect(products.length).toEqual(2);
      expect(products[0].name).toEqual('My awesome product 1');
      expect(products[1].name).toEqual('My awesome product 2');
    });
  });

  describe('GET /products/:id', function() {
    it('should require a logged in user', async function() {
      await request(httpServer)
        .get('/products/1')
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('should respond with a product details', async function() {
      await prisma.product.deleteMany();

      const product = (await request(httpServer)
        .post('/products')
        .send({ name: 'My second awesome product', facilityId: facility1.id })
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.CREATED)).body;

      const responseBody = (await request(httpServer)
        .get(`/products/${product.id}`)
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.OK)).body;

      expect(responseBody).toEqual(product);
    });
  });

  describe('PUT /products/:id', function() {
    it('should require a logged in user', async function() {
      await request(httpServer)
        .put('/products/1')
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('should update a product', async function() {
      await prisma.product.deleteMany();

      const product = (await request(httpServer)
        .post('/products')
        .send({ name: 'My product to be updated', facilityId: facility1.id })
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.CREATED)).body;

      (await request(httpServer)
        .put(`/products/${product.id}`)
        .send({ name: 'My product name updated', facilityId: facility1.id })
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.OK)).body;

      const productUpdated = await prisma.product.findUnique({ where: { id: product.id } });

      expect(productUpdated.name).toEqual('My product name updated');
    });

    it('should deny updating a product of not-owned facility', async function() {
      await prisma.product.deleteMany();

      const product = (await request(httpServer)
        .post('/products')
        .send({ name: 'Not mine product to be updated', facilityId: facility2.id })
        .set(getAuthBearerHeader(accessToken2))
        .expect(HttpStatus.CREATED)).body;

      const resBody = (await request(httpServer)
        .put(`/products/${product.id}`)
        .send({ name: 'My product name updated', facilityId: facility1.id })
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.FORBIDDEN)).body;

      expect(resBody).toEqual({
        'error': 'Forbidden',
        'message': `userId=${user1.id} is not an owner of facilityId=${facility2.id}`,
        'statusCode': 403
      });
    });

    it('should deny assigning a product to not-owned facility', async function() {
      await prisma.product.deleteMany();

      const product = (await request(httpServer)
        .post('/products')
        .send({ name: 'Not mine product to be updated', facilityId: facility1.id })
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.CREATED)).body;

      const resBody = (await request(httpServer)
        .put(`/products/${product.id}`)
        .send({ name: 'My product name updated', facilityId: facility2.id })
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.FORBIDDEN)).body;

      expect(resBody).toEqual({
        'error': 'Forbidden',
        'message': `userId=${user1.id} is not an owner of facilityId=${facility2.id}`,
        'statusCode': 403
      });
    });

    it('should deny assigning a product to not-existing facility', async function() {
      await prisma.product.deleteMany();

      const product = (await request(httpServer)
        .post('/products')
        .send({ name: 'Not mine product to be updated', facilityId: facility1.id })
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.CREATED)).body;

      const resBody = (await request(httpServer)
        .put(`/products/${product.id}`)
        .send({ name: 'My product name updated', facilityId: '14b4a132-69d3-4512-86ea-784522196f6f' })
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.BAD_REQUEST)).body;

      expect(resBody).toEqual({
        'error': 'Bad Request',
        'message': 'non-existing facilityId=14b4a132-69d3-4512-86ea-784522196f6f',
        'statusCode': 400
      });
    });
  });

  describe('DELETE /products/:id', function() {
    it('should require a logged in user', async function() {
      await request(httpServer)
        .delete('/products/1')
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('should remove a product', async function() {
      await prisma.product.deleteMany();

      const product = (await request(httpServer)
        .post('/products')
        .send({ name: 'My product to be removed', facilityId: facility1.id })
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.CREATED)).body;

      await request(httpServer)
        .delete(`/products/${product.id}`)
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.OK);

      expect((await prisma.product.findMany()).length).toEqual(0);
    });

    it('should deny removing a product of not-owned facility', async function() {
      await prisma.product.deleteMany();

      const product = (await request(httpServer)
        .post('/products')
        .send({ name: 'Not mine product to be updated', facilityId: facility2.id })
        .set(getAuthBearerHeader(accessToken2))
        .expect(HttpStatus.CREATED)).body;

      const resBody = (await request(httpServer)
        .delete(`/products/${product.id}`)
        .set(getAuthBearerHeader(accessToken1))
        .expect(HttpStatus.FORBIDDEN)).body;

      expect(resBody).toEqual({
        'error': 'Forbidden',
        'message': `userId=${user1.id} is not an owner of facilityId=${facility2.id}`,
        'statusCode': 403
      });
    });
  });
});
