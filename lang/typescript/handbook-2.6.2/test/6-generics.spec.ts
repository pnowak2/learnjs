import { expect } from 'chai';

describe('Generics', () => {
  describe('Hello World of Generics', () => {
    it('should do identity function', () => {
      function identity(arg: any): any {
        return arg;
      }

      expect(identity(5)).to.eql(5);
      expect(identity('test')).to.eql('test');
    });


    it('should annotate with T type', () => {
      function identity<T>(arg: T): T {
        return arg;
      }

      expect(identity<number>(5)).to.eql(5);
      expect(identity<string>('test')).to.eql('test');

      identity<number>(5).toExponential;
      // or with argument inference
      identity(5).toExponential;
    });

    it('should annotate with array of T to have some type known inside function', () => {
      function identity<T>(arg: Array<T>): Array<T> {
        console.log(arg.length);
        return arg;
      }

      expect(identity<number>([5])).to.eql([5]);
      expect(identity<string>(['test'])).to.eql(['test']);
    });
  });

  describe('Generic Types', () => {
    it('should declare generic function in two ways', () => {
      let fn: <T>(arg: T) => T;
      function otherFn<T>(arg: T): T { return arg };

      fn = otherFn;
    });

    it('should declare generic interface', () => {
      interface GenericIdentity {
        <T>(arg: T): T;
      }

      function identity<T>(arg: T): T {
        return arg;
      }

      let id: GenericIdentity = identity;
    });
  });

  describe('Generic Classes', () => {
    it('should declare generic class', () => {
      class GenericNumber<T> {
        zeroValue: T;
        add: (x: T, y: T) => T;
      }

      let mgn = new GenericNumber<number>();
      mgn.zeroValue = 0;
      mgn.add = (x, y) => x + y;

      expect(mgn.add(2, 3)).to.eql(5);

      let mgs = new GenericNumber<string>();
      mgs.zeroValue = 'zero';
      mgs.add = (x, y) => x + y;

      expect(mgs.add('hello, ', 'world')).to.eql('hello, world');
    });
  });

  describe('Generic Constraints', () => {
    it('should use generic which extends base type', () => {
      interface Lengthwise {
        length: number;
      }

      function loggingIdentity<T extends Lengthwise>(arg: T): T {
        console.log(arg.length);
        return arg;
      }

      expect(loggingIdentity('hello')).to.eql('hello');

      let arr: Lengthwise = [1, 2, 3, 4, 5];
    });


    it('should add generic which is property of given type', () => {
      function getProperty<T, K extends keyof T>(obj: T, key: K): any {

      }

      getProperty(5, 'toFixed'); // toFixed exists on type number
      getProperty('test', 'length');
      // getProperty('test', 'length2'); // Error, this property does not exist on string
    });

    it('should use class types in generics', () => {
      function create<T>(c: { new(): T; }): T {
        return new c();
      }

      // examples below

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
      // create(Bee).keeper.hasMask;   // typechecks!
    });

  });
});
