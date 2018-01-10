import { expect } from 'chai';

describe('Variable Declarations', () => {
  describe('Var declarations', () => {
    it('simple declaration', () => {
      var a = 10;
    });

    it('in function declaration', () => {
      function f() {
        var message = 'test';

        return message;
      }
    });

    it('in closure function declaration', () => {
      function f() {
        var a = 10;

        return function g() {
          var b = a + 1;
          return b;
        }
      }

      var g = f();

      expect(g()).to.eql(11);
    });

    it('scoping rules', () => {
      function fn(shouldInitialize: boolean) {
        if (shouldInitialize) {
          var x = 10;
        }

        return x;
      }

      expect(fn(undefined)).to.be.undefined;
      expect(fn(true)).to.eql(10);
    });

    it('variable capturing quirk. By the time for is ended, the i variable is already 10', () => {
      for (var i = 0; i < 10; i++) {
        setTimeout(function () {
          console.log(i);
        }, 50);
      }
    });

    it('variable capturing quirk fix with IIFE', () => {
      for (var i = 0; i < 10; i++) {
        (function (i) {
          setTimeout(function () {
            console.log(i);
          }, 50);
        })(i)
      }
    });
  });

  describe('let declarations', () => {
    it('should declare let variable', () => {
      let hello = 'hello!';
    });

    it('let scopes', () => {
      function f(input: boolean) {
        let a = 100;

        expect(a).to.eql(100);
        // expect(b).to.be.undefined; // passes
        if (input) {
          // Still okay to reference 'a'
          let b = a + 1;
          return b;
        }

        // Error: 'b' doesn't exist here
        // return b;
      }

      expect(f(undefined)).to.be.undefined;
      expect(f(true)).to.eql(101);
    });

    it('shadowing, redeclaration', () => {
      let x = 5;
      // let x = 10; // cannor redeclare..

      function fn(x, condition) {
        if (condition) {
          let x = 3;
        }

        return x;
      }
    });
  });

  describe('const declarations', () => {
    it('should declare const value', () => {
      const num = 9;
      // num = 5; // ilegal      
    });
  });

  describe('Destructuring', () => {
    it('destructuring array', () => {
      let arr = [3, 5];
      let [f, s] = arr;

      expect(f).to.eql(3);
      expect(s).to.eql(5);
    });

    it('swapping variables', () => {
      let first = 'a', second = 'b';

      [second, first] = [first, second];

      expect(first).to.eql('b');
      expect(second).to.eql('a');
    });

    it('params to function', () => {
      function fn([first, second]: [string, number]) {
        return first + second;
      }

      expect(fn(['hello', 2])).to.eql('hello2');
    });

    it('rest params', () => {
      let [first, ...other] = [1, 2, 3, 4, 5];

      expect(first).to.eql(1);
      expect(other).to.eql([2, 3, 4, 5]);
    });

    it('chosen rest params', () => {
      let [, second, third, ...rest] = [1, 2, 3, 4, 5];

      expect(second).to.eql(2);
      expect(third).to.eql(3);
      expect(rest).to.eql([4, 5]);
    });
  });

  describe('Object Desctructuring', () => {
    it('destructure object', () => {
      let o = {
        name: 'peter',
        age: 37,
        work: 'it'
      }

      let { age, work } = o;

      expect(age).to.eql(37);
      expect(work).to.eql('it');
    });

    it('destructure object with rest', () => {
      let o = {
        name: 'peter',
        age: 37,
        work: 'it'
      }

      let { age, ...rest } = o;

      expect(age).to.eql(37);
      expect(rest).to.eql({
        name: 'peter',
        work: 'it'
      });
    });
  });

  describe('Destructure Property Renaming', () => {
    it('should behave...', () => {
      let o = {
        name: 'peter',
        age: 37,
        work: 'it'
      }

      let { age: howOld }: { age: number } = o;

      expect(howOld).to.eql(37);
    });
  });

  describe('Default values', () => {
    it('should behave...', () => {
      function makeObject(whole: { a: string, b?: number }) {
        let { a, b = 5 } = whole;

        expect(a).to.eql('sie ma');
        expect(b).to.eql(5);
      }

      makeObject({
        a: 'sie ma'
      });
    });
  });

  describe('Spread', () => {
    it('spreading arrays', () => {
      let arr1 = [1, 2, 3];
      let arr2 = [4, 5, 6];

      let result = [0, ...arr1, ...arr2, 7];

      expect(result).to.eql([0, 1, 2, 3, 4, 5, 6, 7]);
    });

    it('spreading objects', () => {
      let foo = {
        name: 'peter',
        age: 37,
        work: 'it'
      }
      let bar = {
        address: 'lux'
      }

      let result = { ...foo, ...bar, other: 'boo' };

      expect(result).to.eql({
        name: 'peter',
        age: 37,
        work: 'it',
        address: 'lux',
        other: 'boo'
      })
    });
  });
});
