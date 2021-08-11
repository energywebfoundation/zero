import { Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

export class ConnectionCloseMiddleware implements NestMiddleware {
  private shutdownMode = false;
  private readonly logger = new Logger(ConnectionCloseMiddleware.name, { timestamp: true });

  use(req: Request, res: Response, next: () => void): void {
    if (this.shutdownMode) {
      this.logger.debug('shutdown mode, setting "Connection: close" response header');
      res.setHeader('Connection', 'close');
    }
    next();
  }

  async onModuleDestroy() {
    this.shutdownMode = true;
    this.logger.log('entering shutdown mode, ' +
      'all active connections are going to be closed ' +
      'after serving responses to ongoing requests');
  }
}
