import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FileType, Prisma } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateFileMetadataDto {
  @ApiProperty({enum: FileType, enumName: 'FileType'})
  @IsEnum(FileType)
  fileType: FileType;

  @ApiPropertyOptional({ example: { "field1": "value", "field2" : [1, 2, 3] } })
  @IsOptional()
  meta?: Prisma.JsonValue
}
