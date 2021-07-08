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
  UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { NoDataInterceptor } from '../interceptors/NoDataInterceptor';
import { PrismaClientExceptionFilter } from '../exception-filters/PrismaClientExceptionFilter';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards';

@Controller('users')
@UsePipes(ValidationPipe)
@UseInterceptors(ClassSerializerInterceptor, NoDataInterceptor)
@UseFilters(PrismaClientExceptionFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiTags('users')
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get(':id')
  @ApiBearerAuth('access-token')
  @ApiTags('users')
  @ApiOkResponse({ type: UserEntity })
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return await this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth('access-token')
  @ApiTags('users')
  @ApiOkResponse({ type: UserEntity })
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const existingUser = await this.usersService.findOne(+id);

    if (!existingUser) {
      throw new NotFoundException();
    }

    return await this.usersService.update(+id, updateUserDto);
  }
}
