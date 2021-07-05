import { Injectable } from '@nestjs/common';
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
      role
    } = createUserDto;

    const data = await this.prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        role,
        password: await bcrypt.hash(password, 8)
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    await this.prisma.user.delete({where: {id}});
  }
}
