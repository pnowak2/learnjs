import { IPriceService } from './price.service.interface';

export class PriceService implements IPriceService {
  constructor() {

  }

  calculateTotalPrice(basePrice: number, state: string) {
    const tax = Math.random();

    return basePrice + tax;
  }
}
