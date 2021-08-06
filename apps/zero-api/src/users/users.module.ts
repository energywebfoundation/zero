import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersDraftsController } from './users-drafts.controller';
import { UsersFilesController } from './users-files.controller';
import { DraftsModule } from '../drafts/drafts.module';
import { FilesModule } from '../files/files.module';
import { UsersOwnFilesController } from './users-own-files.controller';

@Module({
  controllers: [UsersController, UsersDraftsController, UsersOwnFilesController, UsersFilesController],
  imports: [DraftsModule, FilesModule],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
