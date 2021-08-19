import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
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
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.facilitiesService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({ type: FacilityDto })
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateFacilityDto: UpdateFacilityDto
  ) {
    return this.facilitiesService.update(id, updateFacilityDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: FacilityDto })
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.facilitiesService.remove(id);
  }
}
