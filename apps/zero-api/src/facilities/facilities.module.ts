import { Module } from '@nestjs/common';
import { FacilitiesService } from './facilities.service';
import { FacilitiesController } from './facilities.controller';

@Module({
  controllers: [FacilitiesController],
  providers: [FacilitiesService]
})
export class FacilitiesModule {}
