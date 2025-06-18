import { Module } from '@nestjs/common';
import { ScrapperService } from './scrapper.service';
import { WebsitesModule } from 'src/websites/websites.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  controllers: [],
  providers: [ScrapperService],
  imports: [WebsitesModule, ProductsModule],
})
export class ScrapperModule {}
