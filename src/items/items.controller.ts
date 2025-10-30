import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  getAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }

  @Post()
  addItem(@Body() payload: CreateItemDto) {
    return this.itemsService.create(payload);
  }

  @Delete(':id')
  deleteItem(@Param('id') id: string) {
    return this.itemsService.delete(+id);
  }
}
