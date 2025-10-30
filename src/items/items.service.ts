import { BadRequestException, Injectable } from '@nestjs/common';
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

  async findOne(id: number) {
    const item = await this.itemsRepository.findOneBy({ id });
    if (!item) {
      throw new BadRequestException(`Item with id ${id} not found`);
    }
    return item;
  }

  create(payload: CreateItemDto) {
    const newItem = this.itemsRepository.create(payload);
    return this.itemsRepository.save(newItem);
  }

  async update(id: number, payload: UpdateItemDto) {
    try {
      const result = await this.itemsRepository.update(id, payload);
      if (result.affected === 0) {
        throw new BadRequestException(`Item with id ${id} not found`);
      }
      return result;
    } catch (error) {
      console.log(Error(error));
      throw new BadRequestException(error.message);
    }
  }

  delete(id: number) {
    return this.itemsRepository.delete(id);
  }
}
