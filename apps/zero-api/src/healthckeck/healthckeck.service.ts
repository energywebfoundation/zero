import { Injectable } from '@nestjs/common';
import { HealthcheckDto } from './dto/healthcheck.dto';

@Injectable()
export class HealthckeckService {
  getHealth() {
    return new HealthcheckDto({ status: 'OK' });
  }
}
