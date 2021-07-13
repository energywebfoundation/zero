import { Module } from '@nestjs/common';
import { DraftsService } from './drafts.service';
import { DraftsController } from './drafts.controller';

@Module({
  controllers: [DraftsController],
  providers: [DraftsService]
})
export class DraftsModule {}
