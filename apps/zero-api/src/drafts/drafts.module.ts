import { Module } from '@nestjs/common';
import { DraftsService } from './drafts.service';

@Module({
  providers: [DraftsService]
})
export class DraftsModule {}
