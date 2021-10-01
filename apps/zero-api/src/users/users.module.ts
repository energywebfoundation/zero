import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DraftsModule } from '../drafts/drafts.module';
import { FilesModule } from '../files/files.module';

@Module({
  controllers: [UsersController],
  imports: [DraftsModule, FilesModule],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
