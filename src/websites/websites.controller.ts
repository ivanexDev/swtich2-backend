import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { WebsitesService } from './websites.service';
import { CreateWebsiteDto } from './dto/create-website.dto';
import { instanceToPlain } from 'class-transformer';

@Controller('websites')
export class WebsitesController {
  constructor(private readonly websitesService: WebsitesService) {}

  @Post()
  create(@Body() createWebsiteDto: CreateWebsiteDto) {
    return this.websitesService.create(createWebsiteDto);
  }

  @Get()
  findAll() {
    const websites = this.websitesService.findAll();
    return instanceToPlain(websites);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.websitesService.findOne(+id);
  }
}
