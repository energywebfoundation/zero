import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'My product' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '29974dc9-3582-4a09-8216-24c54b5419b1' })
  @IsString()
  @IsNotEmpty()
  facilityId: string;
}
