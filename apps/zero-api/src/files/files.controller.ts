import {
  BadRequestException,
  ClassSerializerInterceptor,
  Controller,
  HttpException,
  Logger,
  Post,
  UploadedFiles,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { FilesService } from './files.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { pick } from 'lodash';
import * as multer from 'multer';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { NoDataInterceptor } from '../interceptors/NoDataInterceptor';
import { PrismaClientExceptionFilter } from '../exception-filters/PrismaClientExceptionFilter';
import { UploadFileDto } from './dto/upload-file.dto';
import { FileMetadataDto } from './dto/file-metadata.dto';
import { User } from '../users/decorators/user.decorator';
import { UserDto } from '../users/dto/user.dto';

const filesInterceptor = AnyFilesInterceptor({
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
  @ApiCreatedResponse({ isArray: true, type: FileMetadataDto })
  @UseInterceptors(filesInterceptor)
  async uploadFiles(
    @User() user: UserDto,
    @UploadedFiles() files: Express.Multer.File[]
  ): Promise<FileMetadataDto[]> {
    if (files.length === 0) {
      this.logger.warn(`${user.email} is trying to upload 0 files`);
      throw new BadRequestException('at least one file required');
    }

    this.logger.debug(`${user.email} is uploading ${files.length} file(s)`);

    const finalResults: FileMetadataDto[] = await Promise.all(files.map(async (file) => {
      let result: FileMetadataDto = { ...pick(file, ['fieldname', 'originalname', 'mimetype']), processed: false };

      if (this.supportedMimeTypes.includes(file.mimetype)) {
        const fileAddingResult: { id?: string; processed: boolean, err?: string } = await this.filesService.addFile(file, user.id)
          .then((result) => ({
            id: result.id,
            processed: true
          }))
          .catch((err) => ({
            processed: false,
            err: err.message
          }));

        result = { ...result, ...fileAddingResult };
      } else {
        this.logger.warn(`${user.email} is trying to upload unsupported mimetype (${file.mimetype})`);
        result = { ...result, ...{ processed: false, err: 'unsupported mimetype' } };
      }

      return result;
    }));

    if (finalResults.filter(r => r.processed === false).length > 0) {
      this.logger.error(`files not processed: ${JSON.stringify(finalResults.filter(r => r.processed === false))}`);
      throw new HttpException(finalResults, 207);
    }

    return finalResults;
  }
}
