import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FacilityDto } from './dto/facility.dto';
import { FileMetadataDto } from '../files/dto/file-metadata.dto';
import { mimetypeIsAnImage } from '../files/files.service';

@Injectable()
export class FacilitiesService {
  constructor(private prisma: PrismaService) {}

  async create(createFacilityDto: CreateFacilityDto, ownerId: number): Promise<FacilityDto> {
    const { images, documents, ...newFacilityData } = createFacilityDto;

    await this.validateFilesToBeLinked(images, documents);

    const { images: imagesLinked, documents: documentsLinked, ...newRecord } = await this.prisma.facility.create({
      data: {
        ...newFacilityData,
        ownerId,
        images: { connect: (images || []).map(i => ({ id: i })) },
        documents: { connect: (documents || []).map(i => ({ id: i })) }
      },
      include: {
        images: true,
        documents: true
      }
    });

    return new FacilityDto({
      ...newRecord,
      images: imagesLinked.map(i => new FileMetadataDto(i)),
      documents: documentsLinked.map(d => new FileMetadataDto(d))
    });
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
    const { images, documents, ...updateData } = updateFacilityDto;

    await this.validateFilesToBeLinked(images || [], documents || [], id);

    const { images: imagesLinked, documents: documentsLinked, ...updatedRecord } = await this.prisma.facility.update({
      where: { id },
      data: {
        ...updateData,
        images: images ? { // unlinking all old and linking new only when necessary
          set: [],
          connect: images.map(i => ({ id: i }))
        } : undefined,
        documents: documents ? { // unlinking all old and linking new only when necessary
          set: [],
          connect: documents.map(d => ({ id: d }))
        } : undefined
      },
      include: {
        images: true,
        documents: true
      }
    });

    return new FacilityDto({
      ...updatedRecord,
      images: imagesLinked.map(i => new FileMetadataDto(i)),
      documents: documentsLinked.map(d => new FileMetadataDto(d))
    });
  }

  async remove(id: string): Promise<FacilityDto> {
    return new FacilityDto(await this.prisma.facility.delete({ where: { id } }));
  }

  async validateFilesToBeLinked(imagesIds: string[], documentsIds: string[], facilityId?: string) {
    const imagesRecords = await Promise.all((imagesIds || []).map(async (id) => {
      return {
        id,
        record: await this.prisma.file.findUnique({ where: { id } })
      };
    }));

    const documentsRecords = await Promise.all((documentsIds || []).map(async (id) => {
      return {
        id,
        record: await this.prisma.file.findUnique({ where: { id } })
      };
    }));

    // checking if all of files exist
    for (const file of [...imagesRecords, ...documentsRecords]) {
      if (!file.record) {
        throw new BadRequestException(`${file.id} file does not exist`);
      }
    }

    // checking if files already bind to an existing facility
    for (const file of [...imagesRecords, ...documentsRecords]) {
      const linkedToFacilityId = file.record.imageOfFacilityId || file.record.documentOfFacilityId;
      if (linkedToFacilityId && ((!facilityId && linkedToFacilityId) || (facilityId && linkedToFacilityId !== facilityId))) {
        throw new BadRequestException(`${file.id} file is already linked to other facility`);
      }
    }

    // checking if all images are actually images
    for (const image of imagesRecords) {
      if (!mimetypeIsAnImage(image.record.mimetype)) {
        throw new BadRequestException(`${image.id} is not an image mime-type and cannot be set as a facility image`);
      }
    }
  }
}
