import { expect } from 'chai';

describe('Generics', () => {
  describe('Identity function', () => {
    it('should define identity fn', () => {
      function identity(arg: any): any {
        return arg;
      }
    });

    it('should make it generic', () => {
      function identity<T>(arg: T): T {
        return arg;
      }

      // call explicitly
      const result = identity<string>('hello');
      // call implicitly
      const result2 = identity(5);

      expect(result).to.eql('hello');
      expect(result2).to.eql(5);
    });
  });

  describe('Working with Generic Type Variables', () => {
    it('should be possible to pass array of T', () => {
      function identity<T>(arg: Array<T>): Array<T> {
        // length is defined here, its array
        arg.length;
        return arg;
      }

      // or same

      function identity2<T>(arg: T[]): T[] {
        // length is defined here, its array
        arg.length;
        return arg;
      }
    });
  });

  describe('Generic Types', () => {
    it('should declare function with generic type', () => {
      function identity<T>(arg: T): T {
        return arg;
      }

      let myIdentity: <T>(arg: T) => T = identity;
    });

    it('should have generic interface', () => {
      interface GenericIdentityFn<T> {
        <T>(arg: T): T;
      }

      function identity<T>(arg: T): T {
        return arg;
      }

      let myIdentity: GenericIdentityFn<number> = identity;

      // myIdentity('').charAt; // string return type
    });
  });

  describe('Generic Classes', () => {
    it('should declare generic class', () => {
      class GenericNumber<T> {
        constructor(private initial: T) {
          this.initial = initial;
        }
        zeroValue: T;
        add: (x: T, y: T) => T;
      }

      let myGenericNumber = new GenericNumber<number>(3);
      myGenericNumber.zeroValue = 5;
      myGenericNumber.add = (x, y) => x + y;
      let result = myGenericNumber.add(5, 8);

      expect(result).to.eql(13);
    });
  });

  describe('Generic Constraints', () => {
    it('should behave...', () => {
      interface Lengthwise {
        length: number;
      }

      function loggingIdentity<T extends Lengthwise>(arg: T): T {
        arg.length; // possible, because T extends Lengthwise interface !
        return arg;
      }

      loggingIdentity([5]);
      loggingIdentity({ length: 5 });
    });
  });

  it('should use type parameters in generic constraints', () => {
    // here we ensure that T is a property from object defined by T, thus "keyof"
    function getProperty<T, K extends keyof T>(obj: T, key: K) {
      return obj[key];
    }

    let x = { a: 1, b: 2, c: 3, d: 4 };

    getProperty(x, "a"); // okay
    // getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.
  });

  it('should use generic to accept constructor of a class', () => {
    class MyClass {
      greet(): string {
        return 'hello';
      }
    }

    function fn(): string { return 'test' }

    function create<T>(c: { new (): T; }): T {
      return new c();
    }

    create(MyClass).greet();
    // create(fn); // not possible, fn is not intened to use with new
  });


  it('should do same as above on another example', () => {
    class BeeKeeper {
      hasMask: boolean;
    }

    class ZooKeeper {
      nametag: string;
    }

    class Animal {
      numLegs: number;
    }

    class Bee extends Animal {
      keeper: BeeKeeper;
    }

    class Lion extends Animal {
      keeper: ZooKeeper;
    }

    function createInstance<A extends Animal>(c: new () => A): A {
      return new c();
    }

    // createInstance(Lion).keeper.nametag;  // typechecks!
    // createInstance(Bee).keeper.hasMask;   // typechecks!
  });
});