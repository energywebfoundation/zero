import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginReturnDataDTO {
    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    accessToken: string;
}
