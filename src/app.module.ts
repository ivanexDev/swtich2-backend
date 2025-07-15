import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedModule } from './seed/seed.module';
import { ProductsModule } from './products/products.module';
import { WebsitesModule } from './websites/websites.module';
import { ScrapperModule } from './scrapper/scrapper.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
      ssl: true,
    }),
    SeedModule,
    WebsitesModule,
    ProductsModule,
    WebsitesModule,
    ScrapperModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
