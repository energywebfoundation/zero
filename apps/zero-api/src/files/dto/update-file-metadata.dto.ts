import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FileType, Prisma } from '@prisma/client';
import { IsEnum, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateFileMetadataDto {
  @ApiProperty({enum: FileType, enumName: 'FileType'})
  @IsEnum(FileType)
  fileType: FileType;

  @ApiPropertyOptional({ example: { "field1": "value", "field2" : [1, 2, 3] } })
  @IsOptional()
  meta?: Prisma.JsonValue

  @ApiPropertyOptional({ example: '9b191175-66eb-4778-985b-c54146713f74' })
  @IsOptional()
  @IsNotEmpty()
  imageOfFacilityId?: string;

  @ApiPropertyOptional({ example: '6661045a-db9e-43a6-9801-5955dffc0f92' })
  @IsOptional()
  @IsNotEmpty()
  documentOfFacilityId?: string;
}
