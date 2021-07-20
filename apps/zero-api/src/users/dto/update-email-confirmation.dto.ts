import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateEmailConfirmationDto {
  @ApiProperty({ example: '22c026e5-2f67-4ccd-9299-c79b91cb9438' })
  @IsNotEmpty()
  token: string;
}
