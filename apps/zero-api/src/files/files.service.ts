import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { pick } from 'lodash';
import { Express } from 'express';
// This is a hack to make Multer available in the Express namespace
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from 'multer';
import { tmpdir } from 'os';
import { dirname, resolve } from 'path';
import * as mkdirp from 'mkdirp';
import { copyFile, rename, stat, unlink } from 'fs/promises';
import { File } from '@prisma/client';
import { createReadStream, ReadStream } from 'fs';

@Injectable()
export class FilesService {
  private readonly logger = new Logger(FilesService.name, { timestamp: true });

  private readonly filesStorage = resolve(process.env.FILES_STORAGE || tmpdir());

  constructor(private prisma: PrismaService) {
    this.logger.debug('instantiating');
    this.logger.debug(`files storage set to ${this.filesStorage}`);
    mkdirp.sync(this.filesStorage);
  }

  async addFile(file: Express.Multer.File, owner: number): Promise<File> {
    this.logger.debug(`processing file: ${JSON.stringify(pick(file, ['originalname', 'path', 'size']))}`);

    try {
      let fileRecord: File = await this.prisma.file.create({
        data: {
          filename: file.originalname,
          ownerId: owner,
          mimetype: file.mimetype,
          uploadedAt: new Date()
        }
      });
      this.logger.debug(`new record created: ${JSON.stringify(fileRecord)}`);

      const source = file.path;
      const destination = resolve(this.filesStorage, fileRecord.id);

      this.logger.debug(`moving ${source} -> ${destination}`);

      await mkdirp(dirname(destination));
      await rename(source, destination).catch(async (err) => {
        if (err.code === 'EXDEV') {
          this.logger.warn(`files are on separate partitions`);
          this.logger.debug(`copying ${file.path} -> ${destination}`);
          await copyFile(file.path, destination);
          this.logger.debug(`removing ${file.path}`);
          await unlink(file.path);
        } else {
          this.logger.error(err);
          return Promise.reject(err);
        }
      });

      this.logger.debug(`moved ${file.path} -> ${destination}`);

      this.logger.debug(`finished file processing: ${JSON.stringify(pick(file, ['originalname', 'path', 'size']))}`);
      fileRecord = await this.prisma.file.update({
        where: { id: fileRecord.id },
        data: { processingCompletedAt: new Date() }
      });

      return fileRecord;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async getFileMetadata(fileId: string): Promise<File> {
    return this.prisma.file.findUnique({ where: { id: fileId } });
  }

  async getUserFilesMetadata(userId: number): Promise<File[]> {
    return this.prisma.file.findMany({ where: { ownerId: userId } });
  }

  async getFileContentStream(id): Promise<ReadStream> {
    const filePath = resolve(this.filesStorage, id);
    this.logger.debug(`creating read stream for ${id} located at ${filePath}`);

    await stat(filePath).catch((err) => {
      this.logger.error(`error accessing file ${filePath}`);
      this.logger.error(err);
      return Promise.reject(err);
    });

    return new Promise((resolve, reject) => {
      const stream = createReadStream(filePath)
        .on('open', () => {
          this.logger.debug(`read stream for ${id} opened`);
          resolve(stream);
        })
        .on('error', (err) => {
          this.logger.error(`read stream error for ${id}`);
          this.logger.error(err);
          reject(err);
        });
    });
  }
}
