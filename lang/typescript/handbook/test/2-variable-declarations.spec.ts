import { expect } from 'chai';

describe('Variable declarations', () => {
  describe('Var declarations', () => {
    it('should declare with proper type', () => {
      var a = 5;
      expect(a).to.eql(5);
    });

    it('should declare var inside function', () => {
      function f() {
        var a = 5;

        expect(a).to.eql(5);
      }

      f();
    });

    it('should access var inside nested function', () => {
      function f() {
        var a = 5;
        return function g() {
          expect(a).to.eql(5);
        }
      }

      var g = f();
      g();
    });

    it('has same hoisting issue like in ES', () => {
      function f(shouldInitialize: boolean) {
        if (shouldInitialize) {
          var x = 10;
        }

        return x;
      }

      var result1 = f(false);
      var result2 = f(true);

      expect(result1).to.be.undefined;
      expect(result2).to.eql(10);
    });
  });

  describe('let declarations', () => {
    it('should be declared', () => {
      let hello = 'hello!';

      expect(hello).to.eql('hello!');
    });

    it('should use block scoping', () => {
      function f(input: boolean) {
        let a = 100;

        if (input) {
          let b = a + 1;
          return b;
        }

        // return b; // TSC Error !
      }

      let result = f(true);

      expect(result).to.eql(101);
    });
  });

  describe('Re-declarations and shadowing', () => {
    it('cannot declare more than once let variable', () => {
      let x = 10;
      // let x = 20;
    });

    it('cannot shadow function argument', () => {
      function f(input: string) {
        // let input = 'test';
      }
    });

    it('can shadow in nested block', () => {
      function f(input: string) {
        for (let i = 0; i < 2; i++) {
          let input = 5;
        }
      }
    });
  });

  describe('Block-scoped variable capturing', () => {
    function theCityThatAlwaysSleeps() {
      let getCity;

      if (true) {
        let city = "Seattle";
        getCity = function () {
          return city;
        }
      }

      return getCity();
    }

    expect(theCityThatAlwaysSleeps()).to.eql('Seattle');
  });

  describe('Const declarations', () => {
    it('should declare a constant', () => {
      const num: number = 9;

      expect(num).to.eql(9);
    });

    it('should not be possible to change const', () => {
      const obj = {
        name: 'piotr',
        age: 36
      }

      // obj = {}; // Error
      obj.name = 'valor';

      expect(obj).to.eql({
        name: 'valor',
        age: 36
      });
    });
  });

  describe('Destructuring', () => {
    it('should destructure Array', () => {
      let input = [1, 2, 3];
      let [first, , last] = input;

      expect(first).to.eql(1);
      expect(last).to.eql(3);
    });

    it('should change variables order', () => {
      let a = 2, b = 5;

      [b, a] = [a, b];

      expect(a).to.eql(5);
      expect(b).to.eql(2);
    });

    it('should destructure as arguments in function', () => {
      function f([first, last]: [number, number]) {
        return first + last
      }

      expect(f([1, 2, 3])).to.eql(3);
    });

    it('should use rest params', () => {
      function f(first, ...rest) {
        return rest.join(',');
      }

      expect(f(1, 2, 3, 4)).to.eql('2,3,4');
    });

    it('should destructure object', () => {
      let o = {
        foo: 'f',
        bar: 'b',
        gaz: 'g'
      };

      let {foo: fo, gaz} = o;

      expect(fo).to.eql('f');
      expect(gaz).to.eql('g');
    });
  });

  describe('Default values', () => {
    it('should declare default values', () => {
      function f(obj: { a: string, b: string }) {
        let {a = 'a', b = 'c'} = obj;

        expect(a).to.eql('foo');
        expect(b).to.eql('c');
      }

      f({
        a:'foo',
        b: undefined
      })
    });
  });
});