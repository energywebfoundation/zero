import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { AppModule } from '../app/app.module';
import { EmailModule } from './email.module';
import * as mailhog from 'mailhog';

describe('EmailService', () => {
  let service: EmailService, mailhogClient;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    }).compile();

    service = module.get<EmailService>(EmailService);

    mailhogClient = mailhog({
      port: 8025,
      host: 'localhost',
      protocol: 'http:',
      basePath: '/api'
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have send() method defined', async function() {
    expect(service.send).toBeDefined();
  });

  it('should send email message', async function() {
    await mailhogClient.deleteAll();

    await service.send({
      from: 'test-sender@test.domain.com',
      to: 'test-recipient@test.domain.com',
      subject: 'test subject',
      html: 'test html <b>message</b>'
    });

    const messages = await mailhogClient.messages();
    expect(messages).not.toBeNull();
    expect(messages.total).toEqual(1);
  });

  describe('email sent', function() {
    let emailMessage;

    beforeAll(async function() {
      await mailhogClient.deleteAll();

      await service.send({
        from: 'test-sender@test.domain.com',
        to: 'test-recipient@test.domain.com',
        subject: 'test subject',
        text: 'test text body',
        html: 'test html <b>message</b>'
      });

      expect((await mailhogClient.messages()).total).toEqual(1);

      const messages = await mailhogClient.messages();
      emailMessage = messages.items[0];
      expect(emailMessage).toBeDefined();
    });

    it('should have correct sender', async function() {
      expect(emailMessage.from).toEqual('test-sender@test.domain.com');
    });

    it('should have correct recipient', async function() {
      expect(emailMessage.to).toEqual('test-recipient@test.domain.com');
    });

    it('should have correct subject', async function() {
      expect(emailMessage.subject).toEqual('test subject');
    });

    it('should have correct message text body', async function() {
      expect(emailMessage.text).toEqual('test text body');
    });

    it('should have correct message html body', async function() {
      expect(emailMessage.html).toEqual('test html <b>message</b>');
    });
  });
});
