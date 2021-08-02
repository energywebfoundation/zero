import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name, { timestamp: true });

  constructor() {
    this.logger.debug('instantiating')
  }
}
