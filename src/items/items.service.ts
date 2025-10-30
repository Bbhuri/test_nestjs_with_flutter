import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemsService {
  private items = [
    { id: 1, name: 'Helmet' },
    { id: 2, name: 'Boots' },
  ];

  findAll() {
    return this.items;
  }

  findOne(id: number) {
    return this.items.find((item) => item.id === id);
  }

  create(name: string) {
    const newItem = { id: Date.now(), name };
    this.items.push(newItem);
    return newItem;
  }
}
