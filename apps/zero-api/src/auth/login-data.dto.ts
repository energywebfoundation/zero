import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDataDTO {
    @ApiProperty({ type: String, example: 'testuser1@foo.bar' })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({ type: String, example: 'test' })
    @IsString()
    @IsNotEmpty()
    password: string;
}
