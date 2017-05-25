import { expect } from 'chai';

describe('Variable Declarations', () => {
  describe('Var declarations', () => {
    it('should use traditional declaration', () => {
      var a = 10;
    });

    it('should declare var inside a function', () => {
      function f() {
        var message = 'hello world';

        return message;
      }

      expect(f()).to.eql('hello world');
    });

    it('should access var inside a function', () => {
      function f() {
        var message = 'hello world';
        return function g() {
          return 'inside ' + message
        }
      }

      var g = f();
      expect(g()).to.eql('inside hello world');
    });

    describe('Scoping rules', () => {
      it('should check if variable is accessible outside the scope', () => {
        function f(shouldInitialize: boolean) {
          if (shouldInitialize) {
            var x = 10;
          }

          return x;
        }

        expect(f(true)).to.eql(10);
        expect(f(false)).to.eql(undefined);
      });

      it('should declare variable with same name multiple times', () => {
        var x = 5;
        var x = 6;

        expect(x).to.eql(6);
      });
    });
  });

  describe('Let declarations', () => {
    it('should declare let variable', () => {
      let hello = "Hello!";
    });

    describe('Block scoping', () => {
      it('should be not visible outside block', () => {
        function f(input: boolean) {
          let a = 100;

          if (input) {
            let b = a + 1;
            return b;
          }

          // return b; // throws error, b not declared in this block
        }
      });

      it('should give error if used without let declaration', () => {
        // a++;
        // let a; // will throw

        a++;
        var a; // legal, but unsecure, hoisting etc.
      });
    });

    describe('Re-declaratiosn and Shadowing', () => {
      it('should not allow to redeclare same variable with let', () => {
        let x = 10;
        // let x = 20; // throws an error

        function f(y: number) {
          // let y = 5; // illegal, duplicate declaration
        }

        function g(condition: boolean, y: number) {
          if (condition) {
            let y = 5; // valid, locally scoped, shadowed
          }
        }
      });
    });

    describe('Block-scoped variable capturing', () => {
      it('should capture, still have access to var even if block is already executed', () => {
        function city() {
          let getCity;

          if (true) {
            let city = 'Bruxelles';
            getCity = function () {
              return city
            }
          }

          return getCity();
        }

        expect(city()).to.eql('Bruxelles');
      });

      it('should not be needed anymore to make IIFEs to capture variable value', () => {
        for (let i = 0; i < 10; i++) {
          setTimeout(function () { console.log(i); }, 100 * i);
        }
      });
    });
  });

  describe('Const declarations', () => {
    it('should declare const, same as let but cannot redefine once assigned a value', () => {
      const num = 9;
    });

    it('should not redeclare', () => {
      const kitty = {
        name: 'Majka',
        age: 7
      }

      // kitty = {}; // not allowed

      kitty.name = 'Other cat'; // allowed, not changing the kitty reference itself;

      expect(kitty.name).to.eql('Other cat');
    });
  });

  describe('Destructuring', () => {
    it('should destructure array', () => {
      let input = [1, 2];

      let [first, second] = input;

      expect(first).to.eql(1);
      expect(second).to.eql(2);
    });

    it('should swap items in array', () => {
      let first = 'f',
        second = 's';

      let arr = [first, second];

      [second, first] = [first, second];

      expect(first).to.eql('s');
      expect(second).to.eql('f');
    });

    it('should destructure with function params', () => {
      function f([first, second]: [string, string]) {
        return `${second}, ${first}`;
      }

      expect(f(['hello', 'world'])).to.eql('world, hello');
    });

    it('should use ... syntax for remaining items', () => {
      let [first, ...rest] = [1, 2, 3, 4, 5];

      expect(first).to.eql(1);
      expect(rest).to.eql([2, 3, 4, 5]);
    });

    it('should ignore items which i dont care about', () => {
      let [, second, ...rest] = [1, 2, 3, 4, 5];

      expect(second).to.eql(2);
    });

    it('should destructure object', () => {
      let obj = {
        name: 'piotr',
        age: 37
      }

      let { name, age } = obj;

      expect(name).to.eql('piotr');
      expect(age).to.eql(37);
    });

    it('should destructure object with ... rest items', () => {
      let obj = {
        name: 'piotr',
        age: 37,
        gender: 'male'
      }

      let { name, ...rest }: { name: string } = obj;

      expect(name).to.eql('piotr');
      expect(rest).to.eql({
        age: 37,
        gender: 'male'
      })
    });

    it('should destructure with property renaming', () => {
      let obj = {
        name: 'piotr',
        age: 37
      }

      let { name: imie, age: wiek }: { name: string, age: number } = obj;

      expect(imie).to.eql('piotr');
      expect(wiek).to.eql(37);
    });
  });

  describe('Default values', () => {
    it('should assign default values to params', () => {
      function f(input: string = 'default') {
        return input;
      }

      expect(f()).to.eql('default');
      expect(f('custom')).to.eql('custom');
    });
  });

  describe('Function declarations', () => {
    
  });
});
