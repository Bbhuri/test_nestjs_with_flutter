import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
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
        OR item.sku ILIKE :search 
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

  async create(payload: CreateItemDto) {
    try {
      const newItem = this.itemsRepository.create(payload);
      const savedItem = await this.itemsRepository.save(newItem);

      return {
        statusCode: 201,
        message: 'Item created successfully.',
        data: savedItem,
      };
    } catch (error) {
      // 🧠 Handle duplicate SKU (unique constraint violation)
      if (error.code === '23505') {
        throw new ConflictException(
          `SKU '${payload.sku}' already exists. Please use a different SKU.`,
        );
      }

      // 🧱 Handle all other errors
      throw new InternalServerErrorException({
        message: 'Failed to create item.',
        error: error.message,
      });
    }
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
