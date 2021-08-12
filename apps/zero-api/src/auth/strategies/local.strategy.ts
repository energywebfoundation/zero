import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserDto } from '../../users/dto/user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name, { timestamp: true });

  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<UserDto> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      this.logger.warn(`user (${username}) not validated`);
      throw new UnauthorizedException();
    }

    this.logger.debug(`validated user: ${JSON.stringify({ ...user, password: '[***]' })}`);

    return user;
  }
}
