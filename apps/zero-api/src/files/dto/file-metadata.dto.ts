import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FileMetadataDto {
  @ApiProperty({ example: 'files' })
  fieldname: string;

  @ApiProperty({ example: 'MyProof.pdf' })
  originalname: string;

  @ApiProperty({ example: 'application/pdf' })
  mimetype: string;

  @ApiProperty({ example: true })
  processed: boolean;

  @ApiPropertyOptional({ example: 'Internal Server Error' })
  error?: string;
}
