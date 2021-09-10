import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Logger,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
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
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { NoDataInterceptor } from '../interceptors/NoDataInterceptor';
import { PrismaClientExceptionFilter } from '../exception-filters/PrismaClientExceptionFilter';
import { UploadFileDto } from './dto/upload-file.dto';
import { FileMetadataDto } from './dto/file-metadata.dto';
import { User } from '../users/decorators/user.decorator';
import { UserDto } from '../users/dto/user.dto';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { Public } from '../auth/decorators/public.decorator';
import * as mimeTypes from 'mime-types';
import { UpdateFileMetadataDto } from './dto/update-file-metadata.dto';
import { UploadFileResponseDto } from './dto/upload-file-response.dto';
import { fromFile } from 'file-type';
import { extname } from 'path';

const filesInterceptor = FileInterceptor('file', {
  // TODO: use custom storage engine if required according to runtime environment requirements.
  //  This is a temporary storage for files to be processed
  storage: multer.diskStorage({}),
  limits: {
    files: parseInt(process.env.UPLOADED_FILES_COUNT_LIMIT),
    fileSize: parseInt(process.env.UPLOADED_FILE_SIZE_LIMIT)
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

  private readonly supportedDocumentsFormats = ['doc', 'docx', 'pdf', 'xml', 'ppt', 'pptx'];

  private readonly supportedImagesFormats = ['jpg', 'jpeg', 'gif', 'png'];

  constructor(private readonly filesService: FilesService) {}

  @Post()
  @ApiBearerAuth('access-token')
  @ApiTags('files')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadFileDto })
  @ApiCreatedResponse({ type: UploadFileResponseDto })
  @UseInterceptors(ClassSerializerInterceptor, NoDataInterceptor, filesInterceptor)
  async uploadFiles(
    @User() user: UserDto,
    @Body() body: UploadFileDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<UploadFileResponseDto> {
    this.logger.debug(`${user.email} is uploading a file: ${file.originalname}`);
    this.logger.debug(`form fields: ${JSON.stringify(body)}`);

    const mimetypeDetected = (await fromFile(file.path))?.mime;

    this.logger.debug(`content type detected: ${mimetypeDetected}`);

    const fileExtensionDetected = mimetypeDetected ? mimeTypes.extension(mimetypeDetected) : extname(file.originalname).split('.')[1];

    if (!fileExtensionDetected) {
      this.logger.warn(`unrecognized mimetype: ${file.mimetype}`);
      throw new BadRequestException(`unrecognized mimetype: ${file.mimetype}`);
    }

    if ([...this.supportedDocumentsFormats, ...this.supportedImagesFormats].indexOf(fileExtensionDetected) < 0) {
      this.logger.warn(`unsupported file extension detected (${fileExtensionDetected}) for ${file.mimetype} mimetype`);
      throw new BadRequestException(`unsupported mimetype (${file.mimetype})`);
    }

    this.logger.debug((`detected ${fileExtensionDetected} file extension for ${file.mimetype} mimetype`));

    const newFileRecord = await this.filesService.addFile(file.path, file.originalname, mimetypeDetected || file.mimetype, user.id);

    this.logger.debug(`${user.email} successfully uploaded the file: ${file.originalname}`);
    return newFileRecord;
  }

  @Get(':id/metadata')
  @ApiBearerAuth('access-token')
  @ApiTags('files')
  @ApiOkResponse({ type: FileMetadataDto })
  @UseInterceptors(ClassSerializerInterceptor, NoDataInterceptor)
  async getFileMetadata(
    @Param('id', new ParseUUIDPipe()) id: string
  ): Promise<FileMetadataDto> {
    return await this.filesService.getFileMetadata(id);
  }

  @Patch(':id/metadata')
  @ApiBearerAuth('access-token')
  @ApiTags('files')
  @ApiOkResponse({ type: FileMetadataDto })
  @UseInterceptors(ClassSerializerInterceptor, NoDataInterceptor)
  async updateFileMetadata(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateFileMetadataDto: UpdateFileMetadataDto
  ): Promise<FileMetadataDto> {
    return await this.filesService.updateFileMetadata(id, updateFileMetadataDto);
  }

  @Get(':id')
  @ApiBearerAuth('access-token')
  @ApiTags('files')
  @ApiResponse({status: 308, description: 'http redirect' })
  async getFileContent(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Res() res: Response
  ) {
    const url = await this.filesService.getFileUrl(id);

    if (isNil(url)) {
      throw new NotFoundException();
    }

    res.redirect(308, url);
  }

  @Get('images/:id')
  @Public()
  @ApiTags('files')
  @ApiResponse({status: 308, description: 'http redirect' })
  async getImageFileContent(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Res() res: Response
  ) {
    const url = await this.filesService.getFileUrl(id);

    if (isNil(url)) {
      throw new NotFoundException();
    }

    res.redirect(308, url);
  }

  @Delete(':id')
  @ApiBearerAuth('access-token')
  @ApiTags('files')
  @ApiOkResponse({ type: FileMetadataDto })
  async deleteFile(@Param('id', new ParseUUIDPipe()) id: string): Promise<FileMetadataDto> {
    return this.filesService.deleteFile(id);
  }
}
