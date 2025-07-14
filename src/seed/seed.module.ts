import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { WebsitesModule } from 'src/websites/websites.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [WebsitesModule, ProductsModule],
  exports: [SeedService],
})
export class SeedModule {}
