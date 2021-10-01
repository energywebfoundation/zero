import {
  ClassSerializerInterceptor,
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { NoDataInterceptor } from '../interceptors/NoDataInterceptor';
import { PrismaClientExceptionFilter } from '../exception-filters/PrismaClientExceptionFilter';
import { UsersService } from './users.service';
import { DraftsService } from '../drafts/drafts.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DraftDto } from '../drafts/dto/draft.dto';
import { User } from './decorators/user.decorator';
import { UserDto } from './dto/user.dto';
import { UserRole } from '@prisma/client';

@Controller('users/:userId/drafts')
@UsePipes(ValidationPipe)
@UseInterceptors(ClassSerializerInterceptor, NoDataInterceptor)
@UseFilters(PrismaClientExceptionFilter)
export class UsersDraftsController {
  constructor(
    private readonly usersService: UsersService,
    private readonly draftsService: DraftsService
  ) {}

  @Get()
  @ApiBearerAuth('access-token')
  @ApiTags('users')
  @ApiOkResponse({ type: DraftDto, isArray: true })
  findAll(
    @User() user: UserDto,
    @Param('userId', new ParseIntPipe()) userId: number
  ) {
    if (user.id !== userId && !user.roles.includes(UserRole.admin)) throw new ForbiddenException();

    return this.draftsService.findAllForUser(userId);
  }
}
