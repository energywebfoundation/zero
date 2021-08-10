import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { IJWTPayload } from '../auth.service';
import { UsersService } from '../../users/users.service';
import { UserDto } from '../../users/dto/user.dto';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name, { timestamp: true });

  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: IJWTPayload): Promise<UserDto> {
    this.logger.debug(`validating: ${JSON.stringify(payload)}`);
    const user = await this.userService.findOne(payload.id);
    if (user) {
      this.logger.debug(`found user: ${JSON.stringify({ ...user, password: '[***]' })}`);
    } else {
      this.logger.warn(`user not found for the token payload: ${JSON.stringify(payload)}`);
    }

    return user;
  }

  authenticate(req: Request, options?: unknown) {
    super.authenticate(req, options);
    if (req.authInfo) {
      this.logger.warn(`authInfo=${JSON.stringify(req.authInfo)}`);
    }
  }
}
