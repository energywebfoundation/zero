import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

export interface IJWTPayload {
  id: number;
  sub: string;
}

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.usersService.findByEmail(email);

    if (!user) return null;

    if (!user.emailConfirmed) {
      throw new HttpException('email not confirmed', HttpStatus.FORBIDDEN);
    }

    if (await bcrypt.compare(password, user.password)) {
      return new UserEntity(user);
    }

    return null;
  }

  async login(user: UserEntity) {
    const payload: IJWTPayload = {
      sub: user.email,
      id: user.id
    };
    return {
      accessToken: this.jwtService.sign(payload)
    }
  }
}
