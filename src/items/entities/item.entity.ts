import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'item_name', type: 'varchar', length: 255 })
  item_name: string;

  @Column({ name: 'sku', type: 'varchar', length: 100, unique: true })
  sku: string;

  @Column({ name: 'category', type: 'varchar', length: 100, nullable: true })
  category: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  @Column({ name: 'quantity', type: 'int', default: 0 })
  quantity: number;

  @Column({
    name: 'price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  price: number;

  @Column({ name: 'status', type: 'varchar', length: 50, default: 'In Stock' })
  status: string;
}
