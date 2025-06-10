/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { StoreService } from 'src/store/store.service';

export interface GoogleSheetResponse {
  range: string;
  majorDimension: string;
  values: Array<string[]>;
}

export interface StoreData {
  websiteName: string;
  switch2: string;
  switch2bundle: string;
  querySelector: string;
}

@Injectable()
export class SeedService {
  constructor(private readonly storesService: StoreService) {}

  public async populateDb() {
    try {
      const API_KEY = process.env.GOOGLE_API_KEY;
      const res = await axios.get<GoogleSheetResponse>(
        `https://sheets.googleapis.com/v4/spreadsheets/1I7oqHedKKFXbcSv-tVKWKMIr6C-3cAE3yrH3nfKOjl4/values/Sheet1?key=${API_KEY}`,
      );

      const data = res.data.values;
      const [headers, ...rows] = data;

      await this.storesService.createMany(this.formatData(rows));

      return 'Seed executed';
    } catch (error) {
      console.log(error);
    }
  }

  private formatData(data: Array<string[]>) {
    const formattedData: StoreData[] = data.map((row) => {
      const [websiteName, switch2, switch2bundle, querySelector] = row;
      return {
        websiteName,
        switch2,
        switch2bundle,
        querySelector,
      };
    });

    return formattedData;
  }
}
