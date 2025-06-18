import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebsitesModule } from 'src/websites/websites.module';

@Module({
  exports: [ProductsService],
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [TypeOrmModule.forFeature([Product]), WebsitesModule],
})
export class ProductsModule {}
