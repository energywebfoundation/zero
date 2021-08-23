import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { FacilitiesService } from '../facilities/facilities.service';

@Module({
  controllers: [ProductsController],
  providers: [FacilitiesService, ProductsService]
})
export class ProductsModule {}
