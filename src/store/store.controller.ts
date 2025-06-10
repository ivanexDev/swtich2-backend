import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
// import { UpdateStoreDto } from './dto/update-store.dto';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get()
  findAll() {
    return this.storeService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id', ParseUUIDPipe) id: string) {
    return this.storeService.findOne(id);
  }

  @Post()
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storeService.create(createStoreDto);
  }
}
