import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Logger,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Res,
  UploadedFile,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import * as multer from 'multer';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { NoDataInterceptor } from '../interceptors/NoDataInterceptor';
import { PrismaClientExceptionFilter } from '../exception-filters/PrismaClientExceptionFilter';
import { UploadFileDto } from './dto/upload-file.dto';
import { FileMetadataDto } from './dto/file-metadata.dto';
import { User } from '../users/decorators/user.decorator';
import { UserDto } from '../users/dto/user.dto';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { Public } from '../auth/decorators/public.decorator';

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
// WARNING
// ClassSerializerInterceptor, NoDataInterceptor applied per endpoint
// Because they collide with getFileContent()
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

  private readonly imagesMimeTypes = [
    'image/jpeg',
    'image/png'
  ];

  constructor(private readonly filesService: FilesService) {}

  @Post()
  @ApiBearerAuth('access-token')
  @ApiTags('files')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadFileDto })
  @ApiCreatedResponse({ type: FileMetadataDto })
  @UseInterceptors(ClassSerializerInterceptor, NoDataInterceptor, filesInterceptor)
  async uploadFiles(
    @User() user: UserDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<FileMetadataDto> {
    this.logger.debug(`${user.email} is uploading a file: ${file.originalname}`);

    const newFileRecord = await this.filesService.addFile(file, user.id);

    this.logger.debug(`${user.email} successfully uploaded the file: ${file.originalname}`);
    return new FileMetadataDto(newFileRecord);
  }

  @Get(':id/metadata')
  @ApiBearerAuth('access-token')
  @ApiTags('files')
  @ApiOkResponse({ type: FileMetadataDto })
  @UseInterceptors(ClassSerializerInterceptor, NoDataInterceptor)
  async getFileMetadata(
    @Param('id', new ParseUUIDPipe()) id: string
  ): Promise<FileMetadataDto> {
    return new FileMetadataDto(await this.filesService.getFileMetadata(id));
  }

  @Get(':id')
  @ApiBearerAuth('access-token')
  @ApiTags('files')
  @ApiOkResponse({ description: 'binary file content' })
  async getFileContent(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Res() res: Response
  ) {
    const fileMetadata = await this.filesService.getFileMetadata(id);

    if (isNil(fileMetadata)) {
      throw new NotFoundException();
    }

    res.setHeader('Content-Type', fileMetadata.mimetype);
    res.setHeader('Cache-Control', 'private, max-age=31536000, immutable');

    const stream = await this.filesService.getFileContentStream(id);

    stream.pipe(res);
  }

  @Get('/images/:id')
  @Public()
  @ApiTags('files')
  @ApiOkResponse()
  async getImage(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Res() res: Response
  ) {
    const fileMetadata = await this.filesService.getFileMetadata(id);

    if (isNil(fileMetadata) || this.imagesMimeTypes.indexOf(fileMetadata.mimetype) < 0) {
      throw new NotFoundException();
    }

    res.setHeader('Content-Type', fileMetadata.mimetype);
    res.setHeader('Cache-Control', 'private, max-age=31536000, immutable');

    const stream = await this.filesService.getFileContentStream(id);

    stream.pipe(res);
  }
}
