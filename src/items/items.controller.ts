import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ItemsService } from './items.service';

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
  addItem(@Body('name') name: string) {
    return this.itemsService.create(name);
  }
}
