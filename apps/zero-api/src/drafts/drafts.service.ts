import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateDraftDto } from './dto/create-draft.dto';
import { UpdateDraftDto } from './dto/update-draft.dto';
import { PrismaService } from '../prisma/prisma.service';
import { DraftDto } from './dto/draft.dto';

@Injectable()
export class DraftsService {
  constructor(private prisma: PrismaService) {}

  async create(userId, createDraftDto: CreateDraftDto) {
    const {
      draftType,
      data
    } = createDraftDto;

    const newRow = await this.prisma.draft.create({
      data: {
        data,
        draftType,
        userId
      }
    });

    return new DraftDto(newRow);
  }

  findAll() {
    throw new NotImplementedException('DraftsService.findAll() method is not implemented');
  }

  async findAllForUser(userId: number) {
    const rows = await this.prisma.draft.findMany({ where: { userId } });

    return rows.map(row => new DraftDto(row));
  }

  async findOne(id: number) {
    const row = await this.prisma.draft.findUnique({ where: { id } });
    if (!row) return null;

    return new DraftDto(row);
  }

  async update(id: number, updateDraftDto: UpdateDraftDto) {
    return new DraftDto(await this.prisma.draft.update({ where: { id }, data: updateDraftDto }));
  }

  remove(id: number) {
    return this.prisma.draft.deleteMany({ where: { id } });
  }
}
