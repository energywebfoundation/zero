import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class PasswordResetDto {
  @ApiProperty({ example: '22c026e5-2f67-4ccd-9299-c79b91cb9438' })
  @IsNotEmpty()
  token: string;

  @ApiProperty({ example: 'my new password XYZ#@' })
  @IsNotEmpty()
  newPassword: string;
}
