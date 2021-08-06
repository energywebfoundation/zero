import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name, { timestamp: true });

  constructor(
    private readonly mailerService: MailerService
  ) {
    this.logger.debug('instantiating');
  }

  async send(sendMailOptions: ISendMailOptions) {
    try {
      this.logger.debug(`sending "${sendMailOptions.subject}" to ${JSON.stringify(sendMailOptions.to)}`);

      const result = await this.mailerService.sendMail({
        from: {
          name: 'EW Zero',
          address: 'no-reply@energyweb.org'
        },
        replyTo: 'no-reply@energyweb.org',
        ...sendMailOptions
      });

      if (result.rejected.length > 0) {
        this.logger.error(`email rejected for recipients: ${result.rejected}`);
      }

      if (result.accepted.length > 0) {
        this.logger.debug(`email accepted for recipients: ${result.accepted}`);
      } else {
        this.logger.error('no recipients accepted');
      }

      if (result.messageId) {
        this.logger.debug(`messageId=${result.messageId}`);
      }

    } catch (err) {
      this.logger.error(`error while sending email: subject=${sendMailOptions.subject} to=${JSON.stringify(sendMailOptions.to)}`);
      this.logger.error(err.toString());
      this.logger.error(JSON.stringify(err));
      throw err;
    }
  }
}
