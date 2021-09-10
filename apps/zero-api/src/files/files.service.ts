import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
// This is a hack to make Multer available in the Express namespace
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from 'multer';
import { unlink } from 'fs/promises';
import { File } from '@prisma/client';
import { createReadStream } from 'fs';
import { FileMetadataDto } from './dto/file-metadata.dto';
import { UpdateFileMetadataDto } from './dto/update-file-metadata.dto';
import { UploadFileResponseDto } from './dto/upload-file-response.dto';
import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class FilesService {
  private readonly logger = new Logger(FilesService.name, { timestamp: true });

  private readonly s3client = new S3Client({ region: process.env.AWS_REGION });

  constructor(private prisma: PrismaService) {}

  async addFile(filePath: string, originalFileName: string, mimetype: string, ownerId: number): Promise<UploadFileResponseDto> {
    this.logger.debug(`processing file: ${JSON.stringify({ originalFileName, mimetype, filePath })}`);

    return this.prisma.$transaction(async (prisma) => {
      let fileRecord: File = await prisma.file.create({
        data: {
          filename: originalFileName,
          ownerId,
          mimetype: mimetype,
          uploadedAt: new Date()
        }
      });
      this.logger.debug(`new record created: ${JSON.stringify(fileRecord)}`);

      const start = Date.now();

      await this.s3client.send(new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET,
        Key: fileRecord.id,
        CacheControl: 'max-age=0',
        ContentDisposition: `attachment; filename=${originalFileName}`,
        ACL: 'public-read',
        Body: createReadStream(filePath)
      }));

      this.logger.debug(`${filePath} uploaded to S3 on key ${fileRecord.id} in ${(Date.now() - start) / 1000}s`);
      this.logger.debug(`file url: https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${fileRecord.id}`);

      this.logger.debug(`finished file processing: ${JSON.stringify({ originalFileName, mimetype, filePath })}`);
      fileRecord = await prisma.file.update({
        where: { id: fileRecord.id },
        data: { processingCompletedAt: new Date() }
      });

      this.logger.debug(`removing temporary file: ${filePath}`);
      unlink(filePath);

      return new UploadFileResponseDto(fileRecord);
    }).catch((err) => {
      this.logger.error(err);
      this.logger.debug(`removing temporary file: ${filePath}`);
      unlink(filePath);
      throw err;
    });
  }

  async deleteFile(fileId: string) {
    this.logger.debug(`removing file id=${fileId}`);
    return this.prisma.$transaction(async () => {
      this.logger.debug(`removing file database record id=${fileId}`);
      const recordDeleted = await this.prisma.file.delete({ where: { id: fileId } });

      this.logger.debug(`removing file from the S3 storage bucket=${process.env.AWS_BUCKET} key=${fileId}`)
      await this.s3client.send(new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET,
        Key: fileId
      }));

      return new FileMetadataDto(recordDeleted);
    }).catch((err) => {
      this.logger.error(err);
      this.logger.warn(`rolling back changes`);
      throw err;
    });
  }

  async getFileMetadata(fileId: string): Promise<FileMetadataDto> {
    const dbRecord = await this.prisma.file.findUnique({ where: { id: fileId } });

    if (!dbRecord) {
      return null;
    }

    return new FileMetadataDto(await this.prisma.file.findUnique({ where: { id: fileId } }));
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
