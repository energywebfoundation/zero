import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginResponseDataDto {
    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    accessToken: string;
}
