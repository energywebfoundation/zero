import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { File, FileType, Prisma } from '@prisma/client';

export class FileMetadataDto implements File {
  @ApiProperty({ example: '5ff1cb39-da8b-4f0a-a17d-a5d00ea85a60' })
  id: string;

  @ApiProperty({ example: 'agreement.pdf' })
  filename: string;

  @ApiProperty({ example: 'application/pdf' })
  mimetype: string;

  @ApiProperty({ example: 1 })
  ownerId: number;

  @ApiProperty({ enum: FileType, enumName: 'FileType' })
  fileType: FileType;

  @ApiProperty({ example: 'http://localhost:3333/925884cd-c577-4ae4-af44-c7086ba609a5' })
  url: string;

  @ApiPropertyOptional({ example: '{ "field1": "value", "field2" : [1, 2, 3] }' })
  meta: Prisma.JsonValue;

  @ApiProperty({ example: new Date() })
  uploadedAt;

  @ApiProperty({ example: new Date(Date.now() + 983) })
  processingCompletedAt;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<FileMetadataDto>) {
    Object.assign(this, partial);

    this.url = `${process.env.FILES_BASE_URL}/${this.id}`;
  }
}
