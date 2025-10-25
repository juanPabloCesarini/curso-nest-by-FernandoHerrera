import { Car } from '../../cars/interfaces/car.interfaces';
import { v4 as uuid } from 'uuid';
export const CARS_SEED: Car[] = [
  {
    id: uuid(),
    brand: 'Toyota',
    model: 'Corolla',
  },
  {
    id: uuid(),
    brand: 'Fiat',
    model: 'Siena',
  },
  {
    id: uuid(),
    brand: 'Renault',
    model: '12',
  },
];

