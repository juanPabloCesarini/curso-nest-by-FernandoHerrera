import { Brand } from 'src/brands/entities/brand.entity';
import { v4 as uuid } from 'uuid';
export const BRANDS_SEED: Brand[] = [
  {
    id: uuid(),
    name: 'Toyota',
    createdAt: Date.now(),
  },
  {
    id: uuid(),
    name: 'Fiat',
    createdAt: Date.now(),
  },
  {
    id: uuid(),
    name: 'Renault',
    createdAt: Date.now(),
  },
];


