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
  ParseIntPipe,
  ForbiddenException,
  Put
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { NoDataInterceptor } from '../interceptors/NoDataInterceptor';
import { PrismaClientExceptionFilter } from '../exception-filters/PrismaClientExceptionFilter';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '../auth/decorators/public.decorator';
import { RequiredRoles } from '../auth/decorators/required-roles.decorator';
import { UserRole } from '@prisma/client';
import { User } from './decorators/user.decorator';
import { PasswordChangeDto } from './dto/password-change.dto';
import { PasswordResetInitDto } from './dto/password-reset-init.dto';
import { PasswordResetDto } from './dto/password-reset.dto';
import { UpdateEmailConfirmationDto } from './dto/update-email-confirmation.dto';
import { CreateEmailConfirmationDto } from './dto/create-email-confirmation.dto';

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
  @ApiOkResponse({ type: UserDto, isArray: true })
  async getAll() {
    return await this.usersService.findAll();
  }

  @Post()
  @Public()
  @ApiTags('users')
  @ApiCreatedResponse({ type: UserDto })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get('me')
  @ApiBearerAuth('access-token')
  @ApiTags('users')
  @ApiOkResponse({ type: UserDto })
  async me(@User() user: UserDto): Promise<UserDto> {
    return await this.usersService.findOne(user.id);
  }

  @Get(':id')
  @ApiBearerAuth('access-token')
  @ApiTags('users')
  @ApiOkResponse({ type: UserDto })
  async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<UserDto> {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth('access-token')
  @ApiTags('users')
  @ApiOkResponse({ type: UserDto })
  async update(@Param('id', new ParseIntPipe()) id: number, @Body() updateUserDto: UpdateUserDto) {
    const existingUser = await this.usersService.findOne(id);

    if (!existingUser) {
      throw new NotFoundException();
    }

    return await this.usersService.update(+id, updateUserDto);
  }

  @Put('/:id/password')
  @ApiBearerAuth('access-token')
  @ApiTags('users')
  @ApiOkResponse({ type: UserDto })
  @ApiForbiddenResponse()
  async passwordChange(
    @User() user: UserDto,
    @Param('id', new ParseIntPipe()) id: number,
    @Body() passwordChangeDTO: PasswordChangeDto
  ) {
    if (user.id !== id) throw new ForbiddenException();

    if (!(await this.usersService.checkPassword(id, passwordChangeDTO.oldPassword))) {
      throw new ForbiddenException();
    }

    return this.usersService.update(id, {
      password: passwordChangeDTO.newPassword
    });
  }

  @Post('password-reset-init')
  @Public()
  @ApiTags('users')
  @ApiOkResponse()
  async resetPasswordInitialize(@Body() passwordResetInitDto: PasswordResetInitDto) {
    const userId: number = (await this.usersService.findByEmail(passwordResetInitDto.email))?.id;

    if (userId) {
      await this.usersService.passwordResetInitialize(userId, 3600); // TODO: get from .env
    }

    return { status: 'OK' };
  }

  @Put('password-reset')
  @Public()
  @ApiTags('users')
  async resetPassword(@Body() body: PasswordResetDto) {

    const res = await this.usersService.validatePasswordReset(body.token)

    if (!res) {
      throw new ForbiddenException();
    }

    await this.usersService.update(res.userId, {password: body.newPassword});
    await this.usersService.passwordResetInvalidate(body.token);

    return { status: 'OK' };
  }

  @Post('email-confirmation')
  @Public()
  @ApiTags('users')
  @ApiOkResponse()
  @ApiForbiddenResponse({ description: 'unregistered email or incorrect password' })
  async createEmailConfirmation(@Body() createEmailConfirmation: CreateEmailConfirmationDto) {
    const user: UserDto = await this.usersService.findByEmail(createEmailConfirmation.email);

    if (!user) throw new ForbiddenException();

    if (!(await this.usersService.checkPassword(user.id, createEmailConfirmation.password))) throw new ForbiddenException();

    await this.usersService.createEmailConfirmation(user.id, parseInt(process.env.EMAIL_CONFIRMATION_TTL));

    return { status: 'OK' };
  }

  @Put('email-confirmation')
  @Public()
  @ApiTags('users')
  @ApiOkResponse()
  @ApiNotFoundResponse({ description: 'Invalid token provided' })
  async confirmEmail(@Body() confirmEmailDto: UpdateEmailConfirmationDto) {
    await this.usersService.confirmEmail(confirmEmailDto.token);

    return { status: 'OK' };
  }
}
