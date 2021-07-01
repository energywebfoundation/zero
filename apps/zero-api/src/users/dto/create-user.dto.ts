import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'testuser1@foo.bar' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Test User 1' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'test' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
