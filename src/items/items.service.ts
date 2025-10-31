import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
  ) {}

  async findAll(filters: { search?: string }): Promise<Item[]> {
    const query: SelectQueryBuilder<Item> =
      this.itemsRepository.createQueryBuilder('item');

    if (filters.search) {
      query.andWhere(
        `(item.item_name ILIKE :search 
        OR item.category ILIKE :search 
        OR item.status::text ILIKE :search)`,
        { search: `%${filters.search}%` },
      );
    }

    query.orderBy('item.id', 'ASC');

    const items: Item[] = await query.getMany();

    return items;
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
