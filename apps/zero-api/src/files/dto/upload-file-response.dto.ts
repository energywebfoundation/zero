import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { FileMetadataDto } from './file-metadata.dto';

@Exclude()
export class UploadFileResponseDto extends PartialType(PickType(FileMetadataDto, ['id'])){
  @Expose()
  @ApiProperty({ example: '5ff1cb39-da8b-4f0a-a17d-a5d00ea85a60' })
  id: string;

  constructor(partial: Partial<UploadFileResponseDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
