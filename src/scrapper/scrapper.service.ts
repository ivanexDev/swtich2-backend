import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DataForScrapper } from './scrapper.interface';
import { chromium } from 'playwright';
import { WebsitesService } from 'src/websites/websites.service';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class ScrapperService {
  private readonly logger = new Logger(ScrapperService.name);

  constructor(
    private readonly websitesService: WebsitesService,
    private readonly productsService: ProductsService,
  ) {}
  @Cron('0 0,12 * * *')
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
  }

  async getPriceByScraping({ querySelector, url }: DataForScrapper) {
    const browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox'],
    });

    try {
      const context = await browser.newContext({
        userAgent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      });
      const page = await context.newPage();
      await page.goto(url);

      const price = await page.$eval(querySelector, (el) =>
        el.textContent?.trim(),
      );

      await browser.close();

      if (!price) {
        return '0';
      }

      return price;
    } catch (error) {
      await browser.close();
      this.logger.warn(`No se pudo obtener el precio para ${url}: ${error}`);
      return '0';
    }
  }

  cleanNumber(input: string): number {
    const cleaned = input.replace(/[^\d]/g, '');
    return Number(cleaned);
  }

  // onModuleInit() {
  //   this.getPrice();
  // }
}
