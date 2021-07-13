import { Draft, DraftType, Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class DraftDto implements Draft {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: '{ "field1": "value", "field2" : [1, 2, 3] }' })
  data: Prisma.JsonValue;

  @ApiProperty({ enum: DraftType, enumName: 'DraftType' })
  draftType: DraftType

  constructor(partial: Partial<DraftDto>) {
    Object.assign(this, partial);
  }
}
