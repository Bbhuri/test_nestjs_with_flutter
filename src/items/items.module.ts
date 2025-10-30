import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { ItemSeederService } from 'src/seeds/item-seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  controllers: [ItemsController],
  providers: [ItemsService, ItemSeederService],
  exports: [ItemSeederService], // 👈 optional if used elsewhere
})
export class ItemsModule {}
