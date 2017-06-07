import { expect } from 'chai';

describe('Enums', () => {
  describe('Simple enum', () => {
    it('should declare it', () => {
      enum Directions {
        Up = 1,
        Down,
        Left,
        Right
      }

      const dir: Directions = Directions.Right;

      expect(dir).to.eql(Directions.Right);
    });
  });
});