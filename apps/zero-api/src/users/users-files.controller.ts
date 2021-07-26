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
import { FilesService } from '../files/files.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from './decorators/user.decorator';
import { FileMetadataDto } from '../files/dto/file-metadata.dto';
import { UserDto } from './dto/user.dto';

@Controller('users/:userId/files')
@UsePipes(ValidationPipe)
@UseInterceptors(ClassSerializerInterceptor, NoDataInterceptor)
@UseFilters(PrismaClientExceptionFilter)
export class UsersFilesController {
  constructor(
    private readonly usersService: UsersService,
    private readonly filesService: FilesService
  ) {}

  @Get()
  @ApiBearerAuth('access-token')
  @ApiTags('users')
  @ApiOkResponse({ type: [FileMetadataDto] })
  async getUserFilesMetadata(
    @User() user: UserDto,
    @Param('userId', new ParseIntPipe()) userId: number
  ): Promise<FileMetadataDto[]> {
    if (user.id !== userId) throw new ForbiddenException();

    const records = await this.filesService.getUserFilesMetadata(userId);
    return records.map(r => new FileMetadataDto(r));
  }
}
