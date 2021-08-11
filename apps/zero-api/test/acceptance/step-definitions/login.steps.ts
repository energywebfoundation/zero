// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { binding, then, when, before, given} from 'cucumber-tsflow';
import { expect, assert } from 'chai';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../../../src/app/app.module';
import { INestApplication } from '@nestjs/common';
import { UsersService } from '../../../src/users/users.service';
import { AuthService } from '../../../src/auth/auth.service';
import { AuthModule } from '../../../src/auth/auth.module';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { UsersController } from '../../../src/users/users.controller';

class Context {
  public app:INestApplication;
  public usersService: UsersService;
  public authService: AuthService;
  public response;
  public username;
  public password;
  public loginResponse;
}

// tslint:disable-next-line:max-classes-per-file
@binding([Context])
export class LoginSteps {
  constructor(protected context: Context) {}

  @before()
  public async before(): Promise<void> {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, PrismaService],
      imports: [AuthModule, AppModule],
    }).compile();

    this.context.app = moduleFixture.createNestApplication();
    this.context.usersService = moduleFixture.get<UsersService>(UsersService);
    this.context.authService = moduleFixture.get<AuthService>(AuthService);
    await this.context.app.init();
  }

  // the main idea is to verify that the user is already registered into the system
  @given(/the user "([^"]*)" is registered/)
    async checkRegisteredUser(username: string) {
      expect(await this.context.usersService.findByEmail(username)).to.exists;
  };

  // inser comments here
  @given(/username "([^"]*)" and password "([^"]*)" are completed correctly/)
  async checkUsernameAndPasswordCompleted(username: string, password: string) {
    this.context.username = username;
    this.context.password = password;
    expect(username).to.not.be.null;
    expect(password).to.not.be.null;
  }

  // the main idea is to verify that the info is submitted properly
  @when(/the user submits the information/)
  async userSubmitsInfo() {
    this.context.loginResponse = await (request(this.context.app.getHttpServer())
    .post('/auth/login')
    .send({ username: this.context.username, password: this.context.password }));
   }

  @then(/the system responds with a "([^"]*)" status/)
  async statusResponse(statusResponse: number)  {
        assert.equal(this.context.loginResponse.statusCode,statusResponse);
  }
}
