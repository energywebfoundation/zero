import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class FacilityDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  ownerId: number;

  @ApiProperty({ example: 'My facility' })
  name: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<FacilityDto>) {
    Object.assign(this, partial);
  }
}
