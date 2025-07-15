import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DataForScrapper } from './scrapper.interface';
import { chromium } from 'playwright';
import { WebsitesService } from 'src/websites/websites.service';
import { ProductsService } from 'src/products/products.service';
import { SeedService } from 'src/seed/seed.service';

@Injectable()
export class ScrapperService implements OnModuleInit {
  private readonly logger = new Logger(ScrapperService.name);

  constructor(
    private readonly websitesService: WebsitesService,
    private readonly productsService: ProductsService,
    private readonly seedService: SeedService,
  ) {}
  @Cron('0 0,12 * * *') // 12pm y 00 am
  //@Cron('*/20 * * * * *') //20 segundos
  async getPrice() {
    const stores = await this.websitesService.findAll();

    for (const store of stores) {
      for (const product of store.products) {
        const price = await this.getPriceByScraping({
          querySelector: product.querySelector,
          url: product.url,
        });

        await this.productsService.updatePrice(product.id, {
          price: this.cleanNumber(price),
        });
      }
    }
    console.log('lista completada');
  }

  async getPriceByScraping({ querySelector, url }: DataForScrapper) {
    const browser = await chromium.launch({
      headless: false,
      // args: ['--no-sandbox'],
    });

    try {
      const context = await browser.newContext({
        userAgent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      });
      const page = await context.newPage();

      await page.goto(url);

      // Espera explícita por el selector
      await page.waitForSelector(querySelector, { timeout: 2000 });

      const price = await page.$eval(querySelector, (el) => {
        console.log(el);
        return el.textContent?.trim();
      });

      await browser.close();

      if (!price) {
        return '0';
      }

      return price;
    } catch (error) {
      this.logger.warn(`No se pudo obtener el precio para ${url}: ${error}`);
      return '0';
    } finally {
      await browser.close();
    }
  }

  cleanNumber(input: string): number {
    const cleaned = input.replace(/[^\d]/g, '');
    return Number(cleaned);
  }

  async onModuleInit() {
    await this.seedService.populateDb();
    // this.getPrice();
    // console.log(
    //   "Si quieres iniciar el scraping descomenta la linea 79 de 'scrapper.service.ts'",
    // );
  }
}
