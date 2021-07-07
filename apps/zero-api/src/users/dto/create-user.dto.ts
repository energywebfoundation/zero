import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsEnum } from 'class-validator';
import { UserRole } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({ example: 'testuser1@foo.bar' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Smith' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ isArray: true, enum: UserRole, enumName: 'UserRole' })
  @IsEnum(UserRole, {each: true})
  roles: UserRole[];

  @ApiProperty({ example: 'test' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
