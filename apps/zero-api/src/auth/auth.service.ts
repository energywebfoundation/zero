import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { UserDto } from '../users/dto/user.dto';
import { JwtService } from '@nestjs/jwt';

export interface IJWTPayload {
  id: number;
  sub: string;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name, { timestamp: true });

  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<UserDto> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      this.logger.warn(`user (${email}) is not registered in the system`);
      return null;
    }

    if (!user.emailConfirmed) {
      this.logger.warn(`${email} is not confirmed`);
      throw new HttpException('email not confirmed', HttpStatus.FORBIDDEN);
    }

    if (await bcrypt.compare(password, user.password)) {
      return new UserDto(user);
    }

    this.logger.warn(`wrong password provided for ${email}`);

    return null;
  }

  async login(user: UserDto) {
    const payload: IJWTPayload = {
      sub: user.email,
      id: user.id
    };

    this.logger.debug(`signing a new token: ${JSON.stringify(payload)}`);

    return {
      accessToken: this.jwtService.sign(payload)
    }
  }
}
