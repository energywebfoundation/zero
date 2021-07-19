import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UserEntity } from './entities/user.entity';
import { PasswordReset } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> | null {
    const {
      email,
      firstName,
      lastName,
      password,
      roles
    } = createUserDto;

    const data = await this.prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        roles,
        password: await this.hashPassword(password),
        emailConfirmation: {
          create: [{ expiresAt: new Date(new Date().getTime() + (parseInt(process.env.EMAIL_CONFIRMATION_TTL) || 86400) * 1000) }]
        }
      }
    });

    return new UserEntity(data);
  }

  async findAll() {
    return (await this.prisma.user.findMany()).map((row) => new UserEntity(row));
  }

  async findOne(id: number): Promise<UserEntity> | null {
    const data = await this.prisma.user.findUnique({ where: { id } });
    if (!data) return null;
    return new UserEntity(data);
  }

  async findByEmail(email: string): Promise<UserEntity> | null {
    const data = await this.prisma.user.findUnique(({ where: { email } }));
    if (!data) return null;
    return new UserEntity(data);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const {
      firstName,
      lastName,
      password,
      roles
    } = updateUserDto;

    const data = await this.prisma.user.update({
      where: { id },
      data: {
        firstName,
        lastName,
        password: password ? await this.hashPassword(password) : undefined,
        roles
      }
    });

    return new UserEntity(data);
  }

  async remove(id: number) {
    await this.prisma.user.delete({ where: { id } });
  }

  private async hashPassword(password) {
    return await bcrypt.hash(password, 8);
  }

  async checkPassword(id, password) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }

    return await bcrypt.compare(password, user.password);
  }

  async passwordResetInitialize(userId: number, ttl: number): Promise<string> {
    const expiresAt = new Date(new Date().getTime() + ttl * 1000); // TODO: set in .env
    const newItem = await this.prisma.passwordReset.create({ data: { userId, expiresAt } });

    return newItem.id;
  }

  async passwordResetInvalidate(token) {
    const tokenRecord = await this.prisma.passwordReset.findUnique({ where: { id: token } });

    if (!tokenRecord || tokenRecord.usedAt || tokenRecord.expiresAt < new Date()) {
      throw new NotFoundException();
    }

    return await this.prisma.passwordReset.update({
      where: { id: token },
      data: { usedAt: new Date() }
    });
  }

  async validatePasswordReset(token: string): Promise<PasswordReset | null> {
    const tokenRecord = await this.prisma.passwordReset.findUnique({ where: { id: token } });

    if (tokenRecord === null) return null;

    if (tokenRecord.expiresAt < new Date()) return null;

    if (tokenRecord.usedAt) return null;

    return tokenRecord;
  }

  async confirmEmail(token: string) {
    await this.prisma.emailConfirmation.findUnique({where: {id: token}});
  }
}
