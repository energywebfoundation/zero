import { Injectable } from '@nestjs/common';
import { CreateDraftDto } from './dto/create-draft.dto';
import { UpdateDraftDto } from './dto/update-draft.dto';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class DraftsService {
  constructor(private prisma: PrismaService) {}

  create(createDraftDto: CreateDraftDto) {
    return 'This action adds a new draft';
  }

  findAll() {
    return `This action returns all drafts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} draft`;
  }

  update(id: number, updateDraftDto: UpdateDraftDto) {
    return `This action updates a #${id} draft`;
  }

  remove(id: number) {
    return `This action removes a #${id} draft`;
  }
}
