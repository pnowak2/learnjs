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
        expect(2 / 0).toBe(Infinity);
      });

      it('should use Nan', () => {
        expect(2 * 'abc').toBe(NaN);
      });

      it('should check BigInt', () => {
        expect(Number("1" + "0".repeat(309)) + 1).toBe(Infinity);

        // append n at the end to make it bigint

        expect(BigInt("1" + "0".repeat(309)) + 1n).not.toBe(Infinity);
      });
    });

    describe('String', () => {
      it('should use different types', () => {
        let str = 'piotr';
        let strdbl = "nowak";
        let strbacktick = `hello ${str} ${strdbl}`

        expect(strbacktick).toEqual('hello piotr nowak');
      });
    });

    describe('Boolean', () => {
      it('should use boolean', () => {
        let bool = true;
        let truthy = Boolean('hi');

        expect(truthy).toBe(true);
      });
    });

    describe('null and undefined', () => {
      it('should use null', () => {
        let age = null;

        expect(age).toBeNull();
      });

      it('should use undefined', () => {
        let age;

        expect(age).toBeUndefined();
      });
    });

    describe('object', () => {
      it('should use object', () => {
        let obj = {};

        expect(obj).toBeTypeOf('object');
        expect(typeof (obj)).toEqual('object');
      });
    });
  });

  describe('Type Conversions', () => {
    it('should convert to string', () => {
      let str = String(5) + String(7);
      expect(str).toEqual('57');
    });

    it('should convert string to numbers', () => {
      let result = "10" / "2"
      expect(result).toEqual(5);
      expect(result).toBeTypeOf('number');
    });

    it('should explicit convert to number', () => {
      let result = Number("8") + Number("4");
      expect(result).toEqual(12);
      expect(result).toBeTypeOf('number');

      expect(Number("hello")).toBeNaN();
    });

    it('should convert to Boolean', () => {
      expect(Boolean("true")).toBe(true);
      expect(Boolean("false")).toBe(true);
      expect(Boolean("0")).toBe(true);
      expect(Boolean(1)).toBe(true);

      expect(Boolean("")).toBe(false);
      expect(Boolean(0)).toBe(false);
    })
  });
 
  describe('Basic operators, maths', () => {
    describe('Maths', () => {
      it('should perform simple math', () => {
        expect(3**3).toEqual(27);
        expect(20/4).toEqual(5);
        expect(16%3).toEqual(1);
      });

      it('numeric conversion with +', () => {
        expect(+"5").toBeTypeOf('number');
      })
    });

    describe('Bitwise operators', () => {
      it('should test few interesting ones', () => {
        expect(1 << 2).toEqual(4); // 0000 0001 => 0000 0100
        expect(7 >> 2).toEqual(1); // 0000 0111 => 0000 0011
      });
    });
  });

  describe('Comparisons', () => {
    it('should check strict equality', () => {
      expect(0 == false).toBe(true);
      expect(0 === false).toBe(false);
    })
  });

  describe('Nullish coalescing operator "??"', () => {
    it('should check for null & undefined, returns first defined value', () => {
      let a = undefined;
      let b = null;

      let result = a ?? b;

      expect(result).toBeNull();

      a = null;
      b = undefined;

      result = a ?? b;

      expect(result).toBeUndefined();

      a = null;
      b = 'hi';

      result = a ?? b;

      expect(result).toEqual('hi');
    });

    it('should compare with ||, returns first truthy value', () => {
      let a = undefined;
      let b = null;

      let result = a || b;

      expect(result).toBeNull();

      a = "0";
      b = 'hi';

      result = a || b;

      expect(result).toEqual('0');
      
    })
  });
});