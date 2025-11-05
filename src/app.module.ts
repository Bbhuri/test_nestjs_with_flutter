import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './items/items.module';
import { ItemSeederService } from './seeds/item-seeder.service';
import { Item } from './items/entities/item.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'oracle',
      host: 'localhost',
      port: 1521, // default Oracle port
      username: 'MYRTARF',
      password: 'MYRTARF',
      sid: 'FREE', // or the service name, e.g., 'XE' or 'FREEPDB1'
      synchronize: true,
      autoLoadEntities: true,
    }),

    TypeOrmModule.forFeature([Item]),
    ItemsModule,
  ],
  providers: [ItemSeederService],
})
export class AppModule {}
