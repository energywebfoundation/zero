import { Global, Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { resolve } from 'path';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: process.env.SMTP_URL,
        defaults: {
          from: {
            name: 'EW Zero',
            address: 'no-reply@energyweb.org'
          }
        },
        template: {
          dir: resolve(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true
          }
        }
      })
    })
  ],
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule {}
