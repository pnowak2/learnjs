describe('6 Generics', () => {
  describe('Hellow World of Generics', () => {
    it('should build identity function', () => {
      function identity<T>(arg: T): T {
        return arg;
      }

      expect(identity(5)).toBe(5);
      expect(identity('abc')).toBe('abc');
      expect(identity<number>(5)).toBe(5);
    });
  });

  describe('Working with Generic Type Variables', () => {
    it('should T act as any/all', () => {
      function identity<T>(arg: T): T {
        // arg.length // error, any type
        return arg;
      }
    });

    it('should T act as any/all', () => {
      function identity<T>(arg: Array<T>): Array<T> {
        arg.length // possible
        return arg;
      }
    });
  });

  describe('Generic Types', () => {
    it('should declare generic function', () => {
      function identity<T>(arg: T): T {
        return arg;
      }

      // same as
      let fn: <T>(arg: T) => T;

      // thus can assign it..
      fn = identity;
    });

    it('should declare object with generic function', () => {
      function identity<T>(arg: T): T {
        return arg;
      }

      // same as
      let fn: { <T>(arg: T): T };

      // thus can assign it..
      fn = identity;
    });

    it('should create generic interface', () => {
      interface GenericIdentity1<T> {
        (arg: T): T;
      }

      // or
      interface GenericIdentity2 {
        <T>(arg: T): T;
      }
    });
  });

  describe('Generic Classes', () => {
    it('should make classic pretty generic', () => {
      class GenericNumber<T> {
        zeroValue: T;
        add: (x: T, y: T) => T;

        constructor(z: T, a: (x: T, y: T) => T) {
          this.zeroValue = z;
          this.add = a;
        }
      }

      let m = new GenericNumber<number>(0, function (x: number, y: number) { return x + y });

      expect(m.add(2, 3)).toEqual(5);
    });
  });

  describe('Generic Constraints', () => {
    it('should allow for generic type extend from another type', () => {
      interface Lengthwise {
        length: number;
      }

      function loggin<T extends Lengthwise>(arg: T) {
        arg.length; // can call length now..
      }

      loggin([5]);
      loggin(Object.keys({}));
      loggin({ length: 2 });
      // loggin(5); // error, no length property
    });

    it('should check for K param being known key of T', () => {
      function getProp<T, K extends keyof T>(obj: T, key: K) {
        return obj[key];
      }

      let x = { a: 1, b: 2, c: 3 };

      expect(getProp(x, 'a')).toEqual(1);
      expect(getProp(x, 'b')).toEqual(2);
      expect(getProp(x, 'c')).toEqual(3);
      // expect(getProp(x, 'd')).toEqual(3); // error, d is not a key of x
    });

    it('should make parametrized constructor type factory', () => {
      class BeeKeeper {
        hasMask: boolean = true;
      }

      function create<T>(c: { new(): T }): T {
        return new c();
      }

      expect(create(BeeKeeper).hasMask).toBe(true);
    });
  });
});