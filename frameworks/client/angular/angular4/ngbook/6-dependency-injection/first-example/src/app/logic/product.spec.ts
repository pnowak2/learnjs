import { MockPriceService } from './../services/mock-price.service';
import { Product } from './product';

describe('Product', () => {
  let product: Product;

  beforeEach(() => {
    const service = new MockPriceService();
    product = new Product(service, 11);
  });

  describe('.price()', () => {
    it('should calculate base on base price and state', () => {
      const result = product.totalPrice('FL');

      expect(result).toEqual(11.66);
    });
  });
});
