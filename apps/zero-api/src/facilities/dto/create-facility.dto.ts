import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFacilityDto {
  @ApiProperty({ example: 'My facility' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
