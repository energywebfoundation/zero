import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Logger,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { NoDataInterceptor } from '../interceptors/NoDataInterceptor';
import { PrismaClientExceptionFilter } from '../exception-filters/PrismaClientExceptionFilter';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProductDto } from './dto/product.dto';
import { User } from '../users/decorators/user.decorator';
import { UserDto } from '../users/dto/user.dto';
import { RequiredRoles } from '../auth/decorators/required-roles.decorator';
import { UserRole } from '@prisma/client';
import { FacilitiesService } from '../facilities/facilities.service';

@Controller('products')
@UsePipes(ValidationPipe)
@UseInterceptors(ClassSerializerInterceptor, NoDataInterceptor)
@UseFilters(PrismaClientExceptionFilter)
@ApiTags('products')
@ApiBearerAuth('access-token')
export class ProductsController {
  private readonly logger = new Logger(ProductsController.name, { timestamp: true });

  constructor(
    private readonly productsService: ProductsService,
    private readonly facilitiesService: FacilitiesService
  ) {}

  @Post()
  @ApiCreatedResponse({ type: ProductDto })
  async create(
    @User() user: UserDto,
    @Body() createProductDto: CreateProductDto
  ): Promise<ProductDto> {
    const facility = await this.facilitiesService.findOne(createProductDto.facilityId);

    if (!facility) {
      throw new BadRequestException((`non-existing facilityId=${createProductDto.facilityId}`));
    }

    if (user.id !== facility.ownerId) {
      throw new ForbiddenException(`userId=${user.id} is not an owner of facilityId=${facility.id}`);
    }

    return this.productsService.create(createProductDto);
  }

  @Get()
  @RequiredRoles(UserRole.admin)
  @ApiOkResponse({ type: [ProductDto] })
  findAll(): Promise<ProductDto[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ProductDto })
  findOne(@Param('id', new ParseIntPipe()) id: number): Promise<ProductDto> {
    return this.productsService.findOne(+id);
  }

  @Put(':id')
  @ApiOkResponse({ type: ProductDto })
  async update(
    @User() user: UserDto,
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateProductDto: UpdateProductDto
  ): Promise<ProductDto> {
    const product = await this.productsService.findOne(id);
    if (!product) {
      this.logger.warn(`userId=${user.id} tried to update non-existing productId=${id}`);
      throw new NotFoundException();
    }

    const currentFacility = await this.facilitiesService.findOne(product.facilityId);
    if (currentFacility.ownerId !== user.id) {
      this.logger.warn(`userId=${user.id} tried to update productId=${id} of not-owned facilityId=${currentFacility.id}`);
      throw new ForbiddenException(`userId=${user.id} is not an owner of facilityId=${currentFacility.id}`);
    }

    if (updateProductDto.facilityId && product.facilityId !== updateProductDto.facilityId) {
      const newFacility = await this.facilitiesService.findOne(updateProductDto.facilityId);
      if (!newFacility) {
        this.logger.warn(`userId=${user.id} tried to update productId=${id} to non-existing facilityId=${updateProductDto.facilityId}`);
        throw new BadRequestException((`non-existing facilityId=${updateProductDto.facilityId}`));
      }

      if (user.id !== newFacility.ownerId) {
        this.logger.warn(`userId=${user.id} tried to update productId=${id} to not-owned facilityId=${newFacility.id}`);
        throw new ForbiddenException(`userId=${user.id} is not an owner of facilityId=${newFacility.id}`);
      }
    }

    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  async remove(
    @User() user: UserDto,
    @Param('id', new ParseIntPipe()) id: number
  ) {
    const product = await this.productsService.findOne(id);
    if (!product) {
      this.logger.warn(`userId=${user.id} tried to delete non-existing productId=${id}`);
      throw new NotFoundException();
    }

    const facility = await this.facilitiesService.findOne(product.facilityId);
    if (facility.ownerId !== user.id) {
      this.logger.warn(`userId=${user.id} tried to delete productId=${id} of not-owned facilityId=${facility.id}`);
      throw new ForbiddenException(`userId=${user.id} is not an owner of facilityId=${facility.id}`);
    }

    return this.productsService.remove(+id);
  }
}
