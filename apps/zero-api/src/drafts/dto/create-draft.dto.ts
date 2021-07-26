import { DraftType, Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export class CreateDraftDto {
  @ApiProperty()
  data: Prisma.JsonValue;

  @ApiProperty({ enum: DraftType, enumName: 'DraftType' })
  @IsEnum(DraftType)
  draftType: DraftType;
}
