import {
  ClassSerializerInterceptor,
  Controller,
  Logger,
  Post,
  UploadedFile,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import * as multer from 'multer';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { NoDataInterceptor } from '../interceptors/NoDataInterceptor';
import { PrismaClientExceptionFilter } from '../exception-filters/PrismaClientExceptionFilter';
import { UploadFileDto } from './dto/upload-file.dto';
import { FileMetadataDto } from './dto/file-metadata.dto';
import { User } from '../users/decorators/user.decorator';
import { UserDto } from '../users/dto/user.dto';

const filesInterceptor = FileInterceptor('file', {
  // TODO: use custom storage engine if required according to runtime environment requirements.
  //  This is a temporary storage for files to be processed
  storage: multer.diskStorage({}),
  limits: {
    files: parseInt(process.env.UPLOADED_FILES_COUNT_LIMIT) || 5,
    fileSize: parseInt(process.env.UPLOADED_FILE_SIZE_LIMIT) || 1000000
  } // see https://github.com/expressjs/multer#multeropts for options
});

@Controller('files')
@UsePipes(ValidationPipe)
@UseInterceptors(ClassSerializerInterceptor, NoDataInterceptor)
@UseFilters(PrismaClientExceptionFilter)
export class FilesController {
  private readonly logger = new Logger(FilesController.name, { timestamp: true });

  private readonly supportedMimeTypes = [
    'image/jpeg',
    'image/png',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  constructor(private readonly filesService: FilesService) {}

  @Post()
  @ApiBearerAuth('access-token')
  @ApiTags('files')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadFileDto })
  @ApiCreatedResponse({ type: FileMetadataDto })
  @UseInterceptors(filesInterceptor)
  async uploadFiles(
    @User() user: UserDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<FileMetadataDto> {
    this.logger.debug(`${user.email} is uploading a file: ${file.originalname}`);

    const newFileRecord = await this.filesService.addFile(file, user.id);

    this.logger.debug(`${user.email} successfully uploaded the file: ${file.originalname}`);
    return new FileMetadataDto(newFileRecord);
  }
}
