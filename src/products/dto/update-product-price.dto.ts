import { IsNumber, Min } from 'class-validator';

export class UpdateProductPriceDto {
  @IsNumber()
  @Min(1)
  price: number;
}
