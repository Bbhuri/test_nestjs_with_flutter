import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
  ) {}

  findAll() {
    return this.itemsRepository.find();
  }

  findOne(id: number) {
    return this.itemsRepository.findOneBy({ id });
  }

  create(payload: CreateItemDto) {
    const newItem = this.itemsRepository.create(payload);
    return this.itemsRepository.save(newItem);
  }

  update(id: number, payload: UpdateItemDto) {
    return this.itemsRepository.update(id, payload);
  }

  delete(id: number) {
    return this.itemsRepository.delete(id);
  }
}
