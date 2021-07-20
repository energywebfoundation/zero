import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOkResponse, ApiUnauthorizedResponse, ApiTags } from '@nestjs/swagger';
import { LoginDataDTO } from '../auth/login-data.dto';
import { LoginResponseDataDto } from '../auth/login-response-data.dto';
import { AuthService } from '../auth/auth.service';
import { Public } from '../auth/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  @Public()
  @ApiTags('auth')
  @ApiBody({ type: LoginDataDTO })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: LoginResponseDataDto })
  @ApiUnauthorizedResponse({ description: 'unauthorized' })
  async login(@Request() req): Promise<LoginResponseDataDto> {
    return this.authService.login(req.user);
  }
}
