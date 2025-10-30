import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './items/items.module';
import { ItemSeederService } from './seeds/item-seeder.service';
import { Item } from './items/entities/item.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // or 'mysql'
      host: 'localhost',
      port: 5432, // or 3306 for MySQL
      username: 'postgres', // change to your local DB username
      password: '14472922', // change to your local DB password
      database: 'testdb', // must exist in your DB
      autoLoadEntities: true,
      synchronize: true, // auto-create tables
    }),
    TypeOrmModule.forFeature([Item]),
    ItemsModule,
  ],
  providers: [ItemSeederService],
})
export class AppModule {}
