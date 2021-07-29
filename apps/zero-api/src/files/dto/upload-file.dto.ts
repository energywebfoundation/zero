import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FileType } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class UploadFileDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: unknown;

  @ApiProperty({enum: FileType, enumName: 'FileType'})
  @IsEnum(FileType)
  fileType: FileType;

  @ApiPropertyOptional({ example: '{ "field1": "value", "field2" : [1, 2, 3] }' })
  @IsOptional()
  meta?: string
}
