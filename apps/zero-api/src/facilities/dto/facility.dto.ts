import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class FacilityDto {
  @ApiProperty({ example: '29974dc9-3582-4a09-8216-24c54b5419b1' })
  id: string;

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
