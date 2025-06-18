import { Injectable } from '@nestjs/common';
import { CreateWebsiteDto } from './dto/create-website.dto';
import { Website } from './entities/website.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WebsitesService {
  constructor(
    @InjectRepository(Website)
    private readonly websitesRepository: Repository<Website>,
  ) {}

  async create(createWebsiteDto: CreateWebsiteDto) {
    createWebsiteDto.websiteName = createWebsiteDto.websiteName.toLowerCase();

    const website = this.websitesRepository.create(createWebsiteDto);
    await this.websitesRepository.save(website);

    return website;
  }

  async createMany(createWebsiteDto: CreateWebsiteDto[]) {
    const websites = this.websitesRepository.create(createWebsiteDto);
    await this.websitesRepository.save(websites);

    return websites;
  }

  async findAll() {
    return await this.websitesRepository.find({
      relations: {
        products: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} website`;
  }
}
