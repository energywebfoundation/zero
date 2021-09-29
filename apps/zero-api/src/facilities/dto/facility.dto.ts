import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  DeviceOwnershipEnum,
  DeviceRegistryEnum,
  FacilityFinancialSupportTypeEnum,
  RenevableEnergySourceEnum
} from '@prisma/client';
import { FileMetadataDto } from '../../files/dto/file-metadata.dto';

export class FacilityDto {
  @ApiProperty({ example: '29974dc9-3582-4a09-8216-24c54b5419b1' })
  id: string;

  @ApiProperty({ example: 'A company name' })
  companyName: string;

  @ApiProperty({ example: 'Facility name' })
  name: string;

  @ApiProperty({ example: '123abc' })
  facilityId: string;

  @ApiProperty({ isArray: true, enum: DeviceRegistryEnum, enumName: 'EacRegistry', example: ['REC', 'I_REC'] })
  registry: DeviceRegistryEnum[];

  @ApiProperty({ example: '123abc' })
  registryId: string;

  @ApiProperty({ enum: RenevableEnergySourceEnum, enumName: 'EnergySource' })
  energySource: RenevableEnergySourceEnum;

  @ApiProperty({ example: 1000 })
  installedCapacity: number;

  @ApiPropertyOptional({ example: 400 })
  certifiedEnergy?: number;

  @ApiPropertyOptional({ example: 500 })
  energyToBeCertified?: number;

  @ApiPropertyOptional({ example: '2021-09-13T10:05:25.618Z' })
  commercialOperationDate?: Date;

  @ApiPropertyOptional({ enum: FacilityFinancialSupportTypeEnum, enumName: 'FinancialSupport' })
  financialSupport?: FacilityFinancialSupportTypeEnum;

  @ApiProperty({ example: 'PL' })
  country: string;

  @ApiPropertyOptional({ example: 'a region' })
  region?: string;

  @ApiPropertyOptional({ example: 50.067700 })
  latitude?: number;

  @ApiPropertyOptional({ example: 19.924224 })
  longitude?: number;

  @ApiPropertyOptional({ example: 'A grid operator' })
  gridOperator?: string;

  @ApiPropertyOptional({ example: 'A story text.' })
  story?: string;

  @ApiPropertyOptional({ example: 'An impact story text.' })
  impactStory?: string;

  @ApiProperty({ example: 1 })
  ownerId: number;

  @ApiProperty({ enum: DeviceOwnershipEnum, enumName: 'DeviceOwnershipEnum' })
  ownershipType: DeviceOwnershipEnum;

  @ApiProperty({ type: [FileMetadataDto] })
  images: FileMetadataDto[];

  @ApiProperty({ type: [FileMetadataDto] })
  documents: FileMetadataDto[];

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<FacilityDto>) {
    Object.assign(this, partial);
  }
}
