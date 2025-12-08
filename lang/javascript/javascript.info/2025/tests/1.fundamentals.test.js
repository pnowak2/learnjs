import { describe, it, expect } from 'vitest';
import { add } from '../src/2.fundamentals/add';

describe('Fundamentals', () => {
  describe('Variables', () => {
    it('should declare variables', () => {
      let msg = 'hello';
      expect(msg).toEqual('hello');
    });

    it('should declare multiline vars', () => {
      let user = 'piotr',
        age = 45,
        message = 'hello';
      expect(user).toEqual('piotr');
      expect(age).toEqual(45);
      expect(message).toEqual('hello');
    });

    it('should use const', () => {
      const username = 'piotr';
      // username = 'buba'; not allowed

      expect(username).toEqual('piotr');
    });
  });

  describe('Data types', () => {
    describe('Number', () => {
      it('should declare use Number', () => {
        let n = 123;
        n = 12.345;

        expect(n).toEqual(12.345);
      });

      it('should use Infinity', () => {
        expect(2/0).toBe(Infinity);
      });

      it('should use Nan', () => {
        expect(2*'abc').toBe(NaN);
      });

      it('should check BigInt', () => {
        expect(Number("1" + "0".repeat(309)) + 1).toBe(Infinity);

        // append n at the end to make it bigint

        expect(BigInt("1" + "0".repeat(309)) + 1n).not.toBe(Infinity);
      });
    });

    describe('String', () => {
      it('should..', () => {
      });
    });
  });
});