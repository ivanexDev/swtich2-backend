import {
  IsNotEmpty,
  IsString,
  IsUrl,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateStoreDto {
  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  websiteName: string;

  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  @IsUrl()
  @Matches(/^https:\/\/www\..*/, {
    message: 'Website URL must start with https://www.',
  })
  switch2: string;

  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  @IsUrl()
  @Matches(/^https:\/\/www\..*/, {
    message: 'Website URL must start with https://www.',
  })
  switch2bundle: string;

  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  querySelector: string;
}
