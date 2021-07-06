import { Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';

import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOkResponse, ApiUnauthorizedResponse, ApiTags } from '@nestjs/swagger';
import { LoginDataDTO } from '../auth/login-data.dto';
import { LoginReturnDataDTO } from '../auth/login-return-data.dto';
import { AuthService } from '../auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  @ApiTags('auth')
  @ApiBody({ type: LoginDataDTO })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: LoginReturnDataDTO })
  @ApiUnauthorizedResponse({ description: 'unauthorized' })
  async login(@Request() req): Promise<LoginReturnDataDTO> {
    return this.authService.login(req.user);
  }
}
