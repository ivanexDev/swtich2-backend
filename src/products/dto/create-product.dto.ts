import {
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsUrl()
  url: string;

  @IsString()
  productName: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsString()
  @MinLength(1)
  querySelector: string;

  @IsString()
  websiteName: string;
}
