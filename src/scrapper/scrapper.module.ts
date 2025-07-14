import { Module } from '@nestjs/common';
import { ScrapperService } from './scrapper.service';
import { WebsitesModule } from 'src/websites/websites.module';
import { ProductsModule } from 'src/products/products.module';
import { SeedModule } from 'src/seed/seed.module';

@Module({
  controllers: [],
  providers: [ScrapperService],
  imports: [WebsitesModule, ProductsModule, SeedModule],
})
export class ScrapperModule {}
