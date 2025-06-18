import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

import { UpdateProductPriceDto } from './dto/update-product-price.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }
  @Post()
  createMany(@Body() createProductDto: CreateProductDto[]) {
    return this.productsService.createMany(createProductDto);
  }

  @Patch(':id')
  updatePrice(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateProductPriceDto: UpdateProductPriceDto,
  ) {
    return this.productsService.updatePrice(id, updateProductPriceDto);
  }
}
