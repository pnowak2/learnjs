import { IPriceService } from './price.service.interface';

export class MockPriceService implements IPriceService {
  constructor() {

  }

  calculateTotalPrice(basePrice: number, state: string) {
    if (state === 'FL') {
      return basePrice + 0.66;
    }

    return basePrice;
  }
}
