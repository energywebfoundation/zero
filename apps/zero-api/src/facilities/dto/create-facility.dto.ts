import { IsEnum, IsISO8601, IsNotEmpty, IsNumber, IsOptional, IsString, IsArray} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  DeviceOwnershipEnum,
  DeviceRegistryEnum,
  FacilityFinancialSupportTypeEnum,
  RenevableEnergySourceEnum
} from '@prisma/client';

export class CreateFacilityDto {
  @ApiProperty({ example: 'A company name' })
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @ApiProperty({ example: 'Facility name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '123abc' })
  @IsString()
  @IsNotEmpty()
  facilityId: string;

  @ApiProperty({ isArray: true, enum: DeviceRegistryEnum, enumName: 'EacRegistry', example: ['REC', 'I_REC'] })
  @IsEnum(DeviceRegistryEnum, { each: true })
  registry: DeviceRegistryEnum[];

  @ApiProperty({ example: '123abc' })
  @IsString()
  @IsNotEmpty()
  registryId: string;

  @ApiProperty({ enum: RenevableEnergySourceEnum, enumName: 'EnergySource' })
  @IsEnum(RenevableEnergySourceEnum)
  energySource: RenevableEnergySourceEnum;

  @ApiProperty({ example: 1000 })
  @IsNumber()
  installedCapacity: number;

  @ApiPropertyOptional({ example: 400 })
  @IsOptional()
  certifiedEnergy?: number;

  @ApiPropertyOptional({ example: 500 })
  @IsOptional()
  energyToBeCertified?: number;

  @ApiPropertyOptional({ example: '2021-09-13T10:05:25.618Z' })
  @IsOptional()
  @IsISO8601({ strict: true })
  commercialOperationDate?: Date;

  @ApiPropertyOptional({ enum: FacilityFinancialSupportTypeEnum, enumName: 'FinancialSupport' })
  @IsEnum(FacilityFinancialSupportTypeEnum)
  @IsOptional()
  financialSupport?: FacilityFinancialSupportTypeEnum;

  @ApiProperty({ example: 'PL' })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiPropertyOptional({ example: 'a region' })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  region?: string;

  @ApiPropertyOptional({ example: 50.067700 })
  @IsNumber()
  @IsOptional()
  latitude?: number;

  @ApiPropertyOptional({ example: 19.924224 })
  @IsNumber()
  @IsOptional()
  longitude?: number;

  @ApiPropertyOptional({ example: 'A grid operator' })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  gridOperator?: string;

  @ApiPropertyOptional({ example: 'A story text.' })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  story?: string;

  @ApiPropertyOptional({ example: 'An impact story text.' })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  impactStory?: string;

  @ApiProperty({ enum: DeviceOwnershipEnum, enumName: 'DeviceOwnershipEnum' })
  @IsEnum(DeviceOwnershipEnum)
  ownershipType: DeviceOwnershipEnum;

  @ApiPropertyOptional({ example: ['05ef9336-64e8-4de8-8586-de54b5b41a48'] })
  @IsOptional()
  @IsArray()
  images?: string[];

  @ApiPropertyOptional({ example: ['85fe477f-6648-4cbb-b6a4-5bb9637500ec'] })
  @IsOptional()
  @IsArray()
  documents?: string[];
}
