import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseFilters,
  Patch,
  NotFoundException,
  ParseIntPipe
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { NoDataInterceptor } from '../interceptors/NoDataInterceptor';
import { PrismaClientExceptionFilter } from '../exception-filters/PrismaClientExceptionFilter';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '../auth/decorators/public.decorator';
import { RequiredRoles } from '../auth/decorators/required-roles.decorator';
import { UserRole } from '@prisma/client';
import { User } from './decorators/user.decorator';

@Controller('users')
@UsePipes(ValidationPipe)
@UseInterceptors(ClassSerializerInterceptor, NoDataInterceptor)
@UseFilters(PrismaClientExceptionFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiBearerAuth('access-token')
  @RequiredRoles(UserRole.admin)
  @ApiTags('users')
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async getAll() {
    return await this.usersService.findAll();
  }

  @Post()
  @Public()
  @ApiTags('users')
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get('me')
  @ApiBearerAuth('access-token')
  @ApiTags('users')
  @ApiOkResponse({ type: UserEntity })
  async me(@User() user: UserEntity): Promise<UserEntity>{
    return await this.usersService.findOne(user.id);
  }

  @Get(':id')
  @ApiBearerAuth('access-token')
  @ApiTags('users')
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<UserEntity> {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth('access-token')
  @ApiTags('users')
  @ApiOkResponse({ type: UserEntity })
  async update(@Param('id', new ParseIntPipe()) id: number, @Body() updateUserDto: UpdateUserDto) {
    const existingUser = await this.usersService.findOne(id);

    if (!existingUser) {
      throw new NotFoundException();
    }

    return await this.usersService.update(+id, updateUserDto);
  }
}
