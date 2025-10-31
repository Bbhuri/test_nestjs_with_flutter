import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemStatus } from './entities/item.entity';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async getAll(
    @Query('name') name?: string,
    @Query('category') category?: string,
    @Query('status') status?: ItemStatus,
  ) {
    const items = await this.itemsService.findAll({
      name,
      category,
      status,
    });
    return {
      statusCode: 200,
      data: items,
    };
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }

  @Post()
  addItem(@Body() payload: CreateItemDto) {
    return this.itemsService.create(payload);
  }

  @Patch(':id')
  updateItem(@Param('id') id: string, @Body() payload: UpdateItemDto) {
    return this.itemsService.update(+id, payload);
  }

  @Delete(':id')
  deleteItem(@Param('id') id: string) {
    return this.itemsService.delete(+id);
  }
}
