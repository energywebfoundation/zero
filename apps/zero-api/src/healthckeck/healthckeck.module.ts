import { Module } from '@nestjs/common';
import { HealthckeckService } from './healthckeck.service';
import { HealthckeckController } from './healthckeck.controller';

@Module({
  controllers: [HealthckeckController],
  providers: [HealthckeckService]
})
export class HealthckeckModule {}
