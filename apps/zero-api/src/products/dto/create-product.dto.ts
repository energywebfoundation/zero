import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'My product' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  facilityId: number;
}
