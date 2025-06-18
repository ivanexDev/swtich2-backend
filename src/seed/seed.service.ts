import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { ProductsService } from 'src/products/products.service';
import { WebsitesService } from 'src/websites/websites.service';

export interface GoogleSheetResponse {
  range: string;
  majorDimension: string;
  values: Array<string[]>;
}

export interface StoreData {
  websiteName: string;
  productName: string;
  url: string;
  querySelector: string;
}

@Injectable()
export class SeedService {
  constructor(
    private readonly productsService: ProductsService,
    private readonly websitesService: WebsitesService,
  ) {}

  public async populateDb() {
    try {
      const API_KEY = process.env.GOOGLE_API_KEY;
      const res = await axios.get<GoogleSheetResponse>(
        `https://sheets.googleapis.com/v4/spreadsheets/1I7oqHedKKFXbcSv-tVKWKMIr6C-3cAE3yrH3nfKOjl4/values/Sheet1?key=${API_KEY}`,
      );

      const data = res.data.values;
      const [, ...rows] = data;

      const formatedData = this.formatData(rows);
      const allWebsites = this.getWebsiteNames(formatedData);

      await this.websitesService.createMany(allWebsites);
      await this.productsService.createMany(formatedData as CreateProductDto[]);

      return 'Seed executed';
    } catch (error) {
      console.log(error);
    }
  }

  private formatData(data: Array<string[]>) {
    const formattedData: StoreData[] = data.map((row) => {
      const [websiteName, productName, url, querySelector] = row;
      return {
        websiteName,
        productName,
        url,
        querySelector,
      };
    });

    return formattedData;
  }

  private getWebsiteNames(arr: StoreData[]) {
    const websitesNames = [
      ...new Set(arr.map((website) => website.websiteName)),
    ];

    return websitesNames.map((website) => {
      return { websiteName: website };
    });
  }
}
