import { IsString, MinLength } from 'class-validator';

export class CreateWebsiteDto {
  @IsString()
  @MinLength(1)
  websiteName: string;
}
