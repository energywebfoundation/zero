import { Injectable } from '@nestjs/common';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FacilityDto } from './dto/facility.dto';
import { FileMetadataDto } from '../files/dto/file-metadata.dto';

@Injectable()
export class FacilitiesService {
  constructor(private prisma: PrismaService) {}

  async create(createFacilityDto: CreateFacilityDto, ownerId: number): Promise<FacilityDto> {
    return new FacilityDto(await this.prisma.facility.create({
      data: { ...createFacilityDto, ownerId }
    }));
  }

  async findAll(): Promise<FacilityDto[]> {
    return (await this.prisma.facility.findMany()).map(f => new FacilityDto(f));
  }

  async findOne(id: string): Promise<FacilityDto> {
    const dbRecord = await this.prisma.facility.findUnique({
      where: { id },
      include: {
        images: true,
        documents: true
      }
    });

    if (!dbRecord) {
      return null;
    }

    const { images, documents, ...facility } = dbRecord;

    return new FacilityDto({
      ...facility,
      images: images.map(i => new FileMetadataDto(i)),
      documents: documents.map(i => new FileMetadataDto(i))
    });
  }

  async update(id: string, updateFacilityDto: UpdateFacilityDto): Promise<FacilityDto> {
    return new FacilityDto(await this.prisma.facility.update({ where: { id }, data: updateFacilityDto }));
  }

  async remove(id: string): Promise<FacilityDto> {
    return new FacilityDto(await this.prisma.facility.delete({ where: { id } }));
  }
}
