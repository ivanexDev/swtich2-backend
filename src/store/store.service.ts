/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { Repository } from 'typeorm';
// import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  async create(createStoreDto: CreateStoreDto) {
    try {
      const store = this.storeRepository.create(createStoreDto);
      await this.storeRepository.save(store);
      return store;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Store already exist');
      }
      throw new InternalServerErrorException();
    }
  }

  async createMany(createStoreDtos: CreateStoreDto[]) {
    try {
      const stores = this.storeRepository.create(createStoreDtos);
      await this.storeRepository.save(stores);
      return stores;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('One or more stores already exist');
      }
      throw new InternalServerErrorException('Error creating stores');
    }
  }

  async findAll() {
    const stores = await this.storeRepository.find();
    if (stores.length === 0) {
      throw new InternalServerErrorException('No data');
    }
    return stores;
  }

  async findOne(id: string) {
    return await this.storeRepository.findOneBy({ id });
  }
}
