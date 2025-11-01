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

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async getAll(@Query('search') search?: string) {
    const items = await this.itemsService.findAll({
      search,
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
  async deleteItem(@Param('id') id: string) {
    try {
      const result = await this.itemsService.delete(+id);
      if (result.affected === 0) {
        return {
          statusCode: 404,
          message: `Item id:${id} not found.`,
        };
      }
      return {
        statusCode: 200,
        message: `Item id:${id} has been deleted.`,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: `Failed to delete item id:${id}`,
        error: error.message,
      };
    }
  }
}
