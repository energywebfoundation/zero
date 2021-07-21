import {
  Body,
  ClassSerializerInterceptor,
  Controller, Delete, ForbiddenException,
  Get, NotFoundException, Param, ParseIntPipe, Post, Put,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { NoDataInterceptor } from '../interceptors/NoDataInterceptor';
import { PrismaClientExceptionFilter } from '../exception-filters/PrismaClientExceptionFilter';
import { UsersService } from './users.service';
import { DraftsService } from '../drafts/drafts.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DraftDto } from '../drafts/dto/draft.dto';
import { User } from './decorators/user.decorator';
import { UserDto } from './dto/user.dto';
import { CreateDraftDto } from '../drafts/dto/create-draft.dto';
import { UpdateDraftDto } from '../drafts/dto/update-draft.dto';

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
    if (user.id !== userId) throw new ForbiddenException();

    return this.draftsService.findAllForUser(userId);
  }


  @Post()
  @ApiBearerAuth('access-token')
  @ApiTags('users')
  @ApiCreatedResponse({ type: DraftDto })
  create(
    @User() user: UserDto, @Body() createDraftDto: CreateDraftDto,
    @Param('userId', new ParseIntPipe()) userId: number
  ) {
    if (user.id !== userId) throw new ForbiddenException();

    return this.draftsService.create(user.id, createDraftDto);
  }

  @Get(':id')
  @ApiBearerAuth('access-token')
  @ApiTags('users')
  @ApiOkResponse({ type: DraftDto })
  async findOne(
    @User() user: UserDto,
    @Param('userId', new ParseIntPipe()) userId: number,
    @Param('id', new ParseIntPipe()) id: number
  ) {
    if (user.id !== userId) throw new ForbiddenException();

    const draft = await this.draftsService.findOne(id);

    if (draft?.userId !== user.id) throw new NotFoundException();

    return draft;
  }

  @Put(':id')
  @ApiBearerAuth('access-token')
  @ApiTags('users')
  @ApiOkResponse({ type: DraftDto })
  async update(
    @User() user: UserDto,
    @Param('userId', new ParseIntPipe()) userId: number,
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateDraftDto: UpdateDraftDto
  ) {
    if (user.id !== userId) throw new ForbiddenException();

    const draft = await this.draftsService.findOne(id);

    if (draft?.userId !== user.id) throw new NotFoundException();

    return this.draftsService.update(id, updateDraftDto);
  }

  @Delete(':id')
  @ApiBearerAuth('access-token')
  @ApiTags('users')
  @ApiOkResponse()
  async remove(
    @User() user: UserDto,
    @Param('userId', new ParseIntPipe()) userId: number,
    @Param('id', new ParseIntPipe()) id: number
  ) {
    if (user.id !== userId) throw new ForbiddenException();

    const draft = await this.draftsService.findOne(id);

    if (draft?.userId !== user.id) throw new NotFoundException();

    return this.draftsService.remove(id);
  }
}
