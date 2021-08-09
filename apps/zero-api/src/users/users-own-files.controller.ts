import {
  ClassSerializerInterceptor,
  Controller,
  Get,
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

@Controller('users/me/files')
@UsePipes(ValidationPipe)
@UseInterceptors(ClassSerializerInterceptor, NoDataInterceptor)
@UseFilters(PrismaClientExceptionFilter)
export class UsersOwnFilesController {
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
  ): Promise<FileMetadataDto[]> {
    return this.filesService.getUserFilesMetadata(user.id);
  }
}
