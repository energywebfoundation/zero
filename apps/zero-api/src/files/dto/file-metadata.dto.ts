import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class FileMetadataDto {
  @ApiProperty({ example: '5ff1cb39-da8b-4f0a-a17d-a5d00ea85a60' })
  id: string;

  @ApiProperty({ example: 'agreement.pdf' })
  filename: string;

  @ApiProperty({ example: 'application/pdf' })
  mimetype: string;

  @ApiProperty({ example: 1 })
  ownerId: number;

  @ApiProperty({ example: new Date() })
  uploadedAt;

  @ApiProperty({ example: new Date(Date.now() + 983) })
  processingCompletedAt;

  @Exclude()
  createdAt?: Date;

  @Exclude()
  updatedAt?: Date;

  constructor(partial: Partial<FileMetadataDto>) {
    Object.assign(this, partial);
  }
}
