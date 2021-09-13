import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class ProductDto implements Product {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '29974dc9-3582-4a09-8216-24c54b5419b1' })
  facilityId: string;

  @ApiProperty({ example: 'My product' })
  name: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<ProductDto>) {
    Object.assign(this, partial);
  }
}
