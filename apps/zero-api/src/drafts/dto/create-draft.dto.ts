import { DraftType, Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDraftDto {
  @ApiProperty()
  data: Prisma.JsonValue;

  @ApiProperty({ enum: DraftType, enumName: 'DraftType' })
  draftType: DraftType;
}
