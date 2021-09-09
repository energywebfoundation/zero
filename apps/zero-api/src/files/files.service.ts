import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { pick } from 'lodash';
import { Express } from 'express';
// This is a hack to make Multer available in the Express namespace
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from 'multer';
import { File } from '@prisma/client';
import { createReadStream } from 'fs';
import { FileMetadataDto } from './dto/file-metadata.dto';
import { UpdateFileMetadataDto } from './dto/update-file-metadata.dto';
import { UploadFileResponseDto } from './dto/upload-file-response.dto';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class FilesService {
  private readonly logger = new Logger(FilesService.name, { timestamp: true });

  private readonly s3client = new S3Client({ region: process.env.AWS_REGION });

  constructor(private prisma: PrismaService) {}

  async addFile(file: Express.Multer.File, fileExtension: string, owner: number): Promise<UploadFileResponseDto> {
    this.logger.debug(`processing file: ${JSON.stringify(pick(file, ['originalname', 'path', 'size']))}`);

    try {
      let fileRecord: File = await this.prisma.file.create({
        data: {
          filename: file.originalname,
          fileExtension,
          ownerId: owner,
          mimetype: file.mimetype,
          uploadedAt: new Date()
        }
      });
      this.logger.debug(`new record created: ${JSON.stringify(fileRecord)}`);

      const start = Date.now();

      await this.s3client.send(new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET,
        Key: fileRecord.id,
        CacheControl: 'max-age=0',
        ContentDisposition: `attachment; filename=${file.originalname}`,
        ACL: 'public-read',
        Body: createReadStream(file.path)
      }));

      this.logger.debug(`moved ${file.path} uploaded to S3 on key ${fileRecord.id} in ${(Date.now() - start) / 1000}s`);
      this.logger.debug(`file url: https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${fileRecord.id}`);

      this.logger.debug(`finished file processing: ${JSON.stringify(pick(file, ['originalname', 'path', 'size']))}`);
      fileRecord = await this.prisma.file.update({
        where: { id: fileRecord.id },
        data: { processingCompletedAt: new Date() }
      });

      return new UploadFileResponseDto(fileRecord);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async getFileMetadata(fileId: string): Promise<File> {
    return this.prisma.file.findUnique({ where: { id: fileId } });
  }

  async getFileUrl(fileId: string): Promise<string> {
    const metadata = await this.getFileMetadata(fileId);

    if (!metadata) {
      return null;
    }

    return `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${metadata.id}`;
  }

  async updateFileMetadata(fileId: string, data: UpdateFileMetadataDto): Promise<FileMetadataDto> {
    return new FileMetadataDto(await this.prisma.file.update({ where: { id: fileId }, data }));
  }

  async getUserFilesMetadata(userId: number): Promise<FileMetadataDto[]> {
    if (!(await this.prisma.user.findUnique({ where: { id: userId } }))) {
      return null;
    }

    return (await this.prisma.file.findMany({ where: { ownerId: userId } })).map(r => new FileMetadataDto(r));
  }
}
