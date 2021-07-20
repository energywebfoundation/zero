import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateEmailConfirmationDto {
  @ApiProperty({ example: 'testuser1@foo.bar' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'test' })
  @IsNotEmpty()
  password: string;
}
