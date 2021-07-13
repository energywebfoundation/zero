import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DraftsService } from './drafts.service';
import { CreateDraftDto } from './dto/create-draft.dto';
import { UpdateDraftDto } from './dto/update-draft.dto';

@Controller('drafts')
export class DraftsController {
  constructor(private readonly draftsService: DraftsService) {}

  @Post()
  create(@Body() createDraftDto: CreateDraftDto) {
    return this.draftsService.create(createDraftDto);
  }

  @Get()
  findAll() {
    return this.draftsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.draftsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDraftDto: UpdateDraftDto) {
    return this.draftsService.update(+id, updateDraftDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.draftsService.remove(+id);
  }
}
