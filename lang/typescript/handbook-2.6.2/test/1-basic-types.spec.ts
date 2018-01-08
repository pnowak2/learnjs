import { expect } from 'chai';

describe('Basic Types', () => {
  describe('Boolean', () => {
    it('should declare it', () => {
      let isDone: boolean = false;

      expect(isDone).to.be.false;
    });
  });
});
