import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PasswordChangeDto {
  @ApiProperty({ example: 'old pass' })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({ example: 'old pass' })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
