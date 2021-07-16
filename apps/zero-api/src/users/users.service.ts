import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UserEntity } from './entities/user.entity';

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
        password: await this.hashPassword(password)
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
    const data = await this.prisma.user.findUnique(({where: {email}}));
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
}
