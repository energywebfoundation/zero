import { Module } from '@nestjs/common';
import { HealthcheckService } from './healthcheck.service';
import { HealthcheckController } from './healthcheck.controller';

@Module({
  controllers: [HealthcheckController],
  providers: [HealthcheckService]
})
export class HealthcheckModule {}
