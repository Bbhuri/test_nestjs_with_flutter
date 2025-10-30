import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item, ItemStatus } from 'src/items/entities/item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemSeederService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async onApplicationBootstrap() {
    const count = await this.itemRepository.count();

    // ✅ Only seed if no data exists
    if (count === 0) {
      console.log('🌱 Seeding mock items...');

      const mockItems: Partial<Item>[] = [
        {
          item_name: 'Wireless Mouse',
          sku: 'WM-001',
          category: 'Electronics',
          description: 'A smooth wireless mouse with ergonomic design.',
          quantity: 45,
          price: 29.99,
          status: ItemStatus.IN_STOCK,
        },
        {
          item_name: 'Mechanical Keyboard',
          sku: 'MK-002',
          category: 'Electronics',
          description: 'A backlit mechanical keyboard with blue switches.',
          quantity: 8,
          price: 89.99,
          status: ItemStatus.LOW_STOCK,
        },
        {
          item_name: 'USB-C Cable',
          sku: 'UC-003',
          category: 'Accessories',
          description: 'Durable USB-C to USB-A cable, 1m length.',
          quantity: 0,
          price: 12.99,
          status: ItemStatus.OUT_OF_STOCK,
        },
        {
          item_name: 'Laptop Stand',
          sku: 'LS-004',
          category: 'Accessories',
          description: 'Aluminum adjustable laptop stand for better posture.',
          quantity: 23,
          price: 39.99,
          status: ItemStatus.IN_STOCK,
        },
        {
          item_name: 'Webcam HD',
          sku: 'WC-005',
          category: 'Electronics',
          description: 'Full HD 1080p webcam with built-in microphone.',
          quantity: 15,
          price: 59.99,
          status: ItemStatus.IN_STOCK,
        },
      ];

      await this.itemRepository.save(mockItems);
      console.log('✅ Mock items seeded successfully!');
    } else {
      console.log('ℹ️ Items already exist — skipping seeding.');
    }
  }
}
