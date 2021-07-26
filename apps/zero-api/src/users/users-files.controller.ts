import {
  ClassSerializerInterceptor,
  Controller,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { NoDataInterceptor } from '../interceptors/NoDataInterceptor';
import { PrismaClientExceptionFilter } from '../exception-filters/PrismaClientExceptionFilter';
import { UsersService } from './users.service';
import { FilesService } from '../files/files.service';

@Controller('users/:userId/files')
@UsePipes(ValidationPipe)
@UseInterceptors(ClassSerializerInterceptor, NoDataInterceptor)
@UseFilters(PrismaClientExceptionFilter)
export class UsersFilesController {
  constructor(
    private readonly usersService: UsersService,
    private readonly filesService: FilesService
  ) {}
}
