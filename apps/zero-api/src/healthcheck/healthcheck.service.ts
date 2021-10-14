import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { HealthcheckDto } from './dto/healthcheck.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HealthcheckService {
  private readonly logger = new Logger(HealthcheckService.name, { timestamp: true });

  constructor(private prisma: PrismaService) {}

  async getHealth() {
    await this.prisma.user.findFirst()
      .catch((err) => {
        this.logger.error(`database is not readable: ${err}`);
        throw new InternalServerErrorException('the database is not readable');
      });

    this.logger.debug('OK');

    return new HealthcheckDto({ status: 'OK' });
  }
}
