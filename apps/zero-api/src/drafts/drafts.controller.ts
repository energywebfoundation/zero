import {
  Body,
  ClassSerializerInterceptor,
  Controller, Delete,
  ForbiddenException,
  Get,
  Logger,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post, Put,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { NoDataInterceptor } from '../interceptors/NoDataInterceptor';
import { PrismaClientExceptionFilter } from '../exception-filters/PrismaClientExceptionFilter';
import { DraftsService } from './drafts.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DraftDto } from './dto/draft.dto';
import { User } from '../users/decorators/user.decorator';
import { UserDto } from '../users/dto/user.dto';
import { CreateDraftDto } from './dto/create-draft.dto';
import { UserRole } from '@prisma/client';
import { UpdateDraftDto } from './dto/update-draft.dto';

@ApiTags('drafts')
@Controller('/drafts')
@ApiBearerAuth('access-token')
@UsePipes(ValidationPipe)
@UseInterceptors(ClassSerializerInterceptor, NoDataInterceptor)
@UseFilters(PrismaClientExceptionFilter)
export class DraftsController {
  private readonly logger = new Logger(DraftsController.name, { timestamp: true });

  constructor(
    private readonly draftsService: DraftsService
  ) {}

  @Post()
  @ApiCreatedResponse({ type: DraftDto })
  async create(
    @User() user: UserDto,
    @Body() createDraftDto: CreateDraftDto
  ) {
    return this.draftsService.create(user.id, createDraftDto);
  }

  @Get(':id')
  @ApiOkResponse({ type: DraftDto })
  async findOne(
    @User() user: UserDto,
    @Param('id', new ParseIntPipe()) id: number
  ) {
    const draft = await this.draftsService.findOne(id);

    if (!draft) {
      this.logger.warn(`userId=${user.id} is trying to fetch non-existing draftId=${id}`);
      throw new NotFoundException();
    }

    if (draft.userId !== user.id && !user.roles.includes(UserRole.admin)) {
      this.logger.warn(`non-admin userId=${user.id} is trying to fetch not owned draft`);
      throw new ForbiddenException();
    }

    return this.draftsService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({ type: DraftDto })
  async update(
    @User() user: UserDto,
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateDraftDto: UpdateDraftDto
  ) {
    const draft = await this.draftsService.findOne(id);

    if (!draft) {
      this.logger.warn(`userId=${user.id} is trying to update non-existing draftId=${id}`);
      throw new NotFoundException();
    }

    if (draft.userId !== user.id && !user.roles.includes(UserRole.admin)) {
      this.logger.warn(`non-admin userId=${user.id} is trying to update not owned draft`);
      throw new ForbiddenException();
    }

    return this.draftsService.update(id, updateDraftDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: DraftDto })
  async remove(
    @User() user: UserDto,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    const draft = await this.draftsService.findOne(id);

    if (!draft) {
      this.logger.warn(`userId=${user.id} is trying to remove non-existing draftId=${id}`);
      throw new NotFoundException();
    }

    if (draft.userId !== user.id && !user.roles.includes(UserRole.admin)) {
      this.logger.warn(`non-admin userId=${user.id} is trying to remove not owned draft`);
      throw new ForbiddenException();
    }

    return this.draftsService.remove(id);
  }
}
