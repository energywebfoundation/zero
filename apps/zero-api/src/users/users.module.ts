import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersDraftsController } from './users-drafts.controller';
import { DraftsService } from '../drafts/drafts.service';

@Module({
  controllers: [UsersController, UsersDraftsController],
  providers: [UsersService, DraftsService],
  exports: [UsersService]
})
export class UsersModule {}
