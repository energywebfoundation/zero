import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Logger,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { FacilitiesService } from './facilities.service';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';
import { NoDataInterceptor } from '../interceptors/NoDataInterceptor';
import { PrismaClientExceptionFilter } from '../exception-filters/PrismaClientExceptionFilter';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../users/decorators/user.decorator';
import { UserDto } from '../users/dto/user.dto';
import { RequiredRoles } from '../auth/decorators/required-roles.decorator';
import { UserRole } from '@prisma/client';
import { FacilityDto } from './dto/facility.dto';

@Controller('facilities')
@UsePipes(ValidationPipe)
@UseInterceptors(ClassSerializerInterceptor, NoDataInterceptor)
@UseFilters(PrismaClientExceptionFilter)
@ApiBearerAuth('access-token')
@ApiTags('facilities')
export class FacilitiesController {
  private readonly logger = new Logger(FacilitiesController.name, { timestamp: true });

  constructor(private readonly facilitiesService: FacilitiesService) {}

  @Post()
  @ApiCreatedResponse({ type: FacilityDto })
  create(
    @User() user: UserDto,
    @Body() createFacilityDto: CreateFacilityDto
  ) {
    return this.facilitiesService.create(createFacilityDto, user.id);
  }

  @Get()
  @ApiOkResponse({ type: [FacilityDto] })
  @RequiredRoles(UserRole.admin)
  findAll() {
    return this.facilitiesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: FacilityDto })
  findOne(@Param('id') id: string) {
    return this.facilitiesService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: FacilityDto })
  async update(
    @User() user: UserDto,
    @Param('id') id: string,
    @Body() updateFacilityDto: UpdateFacilityDto
  ) {
    const facility = await this.facilitiesService.findOne(id);

    if (!facility) {
      this.logger.warn(`userId=${user.id} tried to update non-existing facilityId=${id}`);
      throw new NotFoundException();
    }

    if (facility && facility.ownerId !== user.id) {
      this.logger.warn(`userId=${user.id} attempts to update not-owned facilityId=${facility.id}`);
      throw new ForbiddenException(`userId=${user.id} is not an owner of facilityId=${facility.id}`);
    }

    return this.facilitiesService.update(id, updateFacilityDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: FacilityDto })
  async remove(
    @User() user: UserDto,
    @Param('id') id: string
  ) {
    const facility = await this.facilitiesService.findOne(id);

    if (!facility) {
      this.logger.warn(`userId=${user.id} tried to delete non-existing facilityId=${id}`);
      throw new NotFoundException();
    }

    if (facility && facility.ownerId !== user.id) {
      this.logger.warn(`userId=${user.id} tried to update productId=${id} of not-owned facilityId=${facility.id}`);
      throw new ForbiddenException(`userId=${user.id} is not an owner of facilityId=${facility.id}`);
    }

    return this.facilitiesService.remove(id);
  }
}
