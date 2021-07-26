import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersDraftsController } from './users-drafts.controller';
import { DraftsService } from '../drafts/drafts.service';
import { UsersFilesController } from './users-files.controller';
import { FilesService } from '../files/files.service';

@Module({
  controllers: [UsersController, UsersDraftsController, UsersFilesController],
  providers: [UsersService, DraftsService, FilesService],
  exports: [UsersService]
})
export class UsersModule {}
