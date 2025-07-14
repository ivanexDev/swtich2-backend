import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  async createMany(createProductDto: CreateProductDto[]) {
    try {
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  async updatePrice(id: string, updateProductPriceDto: UpdateProductDto) {
    console.log({ id, updateProductPriceDto });
    try {
      await this.productRepository.update(id, updateProductPriceDto);

      return await this.productRepository.findOne({ where: { id } });
    } catch (error) {
      console.log(error);
    }
  }

  async count() {
    try {
      return await this.productRepository.count();
    } catch (error) {
      console.log(error);
    }
  }
}
