import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FacilityDto } from './dto/facility.dto';

@Injectable()
export class FacilitiesService {
  constructor(private prisma: PrismaService) {}

  async create(createFacilityDto: CreateFacilityDto, ownerId: number): Promise<FacilityDto> {
    return new FacilityDto(await this.prisma.facility.create({ data: { ...createFacilityDto, ownerId } }));
  }

  async findAll(): Promise<FacilityDto[]> {
    return (await this.prisma.facility.findMany()).map(f => new FacilityDto(f));
  }

  async findOne(id: number): Promise<FacilityDto> {
    const dbRecord = await this.prisma.facility.findUnique({ where: { id } });

    if (!dbRecord) {
      return null;
    }

    return new FacilityDto(dbRecord);
  }

  async update(id: number, updateFacilityDto: UpdateFacilityDto): Promise<FacilityDto> {
    return new FacilityDto(await this.prisma.facility.update({ where: { id }, data: updateFacilityDto }));
  }

  async remove(id: number): Promise<FacilityDto> {
    return new FacilityDto(await this.prisma.facility.delete({ where: { id } }));
  }
}
