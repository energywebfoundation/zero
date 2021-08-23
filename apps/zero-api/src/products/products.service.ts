import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductDto } from './dto/product.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto): Promise<ProductDto> {
    return new ProductDto(await this.prisma.product.create({ data: createProductDto }));
  }

  async findAll(): Promise<ProductDto[]> {
    return (await this.prisma.product.findMany()).map((row) => new ProductDto(row));
  }

  async findOne(id: number): Promise<ProductDto> {
    const dbRecord = await this.prisma.product.findUnique({ where: { id } });
    if (!dbRecord) return null;
    return new ProductDto(dbRecord);
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<ProductDto> {
    return new ProductDto(await this.prisma.product.update({ where: { id }, data: updateProductDto }));
  }

  async remove(id: number): Promise<ProductDto> {
    return await this.prisma.product.delete({ where: { id } });
  }
}
