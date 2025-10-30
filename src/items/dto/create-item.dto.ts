import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  Min,
  IsEnum,
} from 'class-validator';
import { ItemStatus } from '../entities/item.entity';

export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  item_name: string;

  @IsNotEmpty()
  @IsString()
  sku: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  quantity?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsEnum(ItemStatus)
  status?: ItemStatus = ItemStatus.OUT_OF_STOCK;
}
