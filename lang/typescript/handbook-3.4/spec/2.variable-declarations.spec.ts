describe('2 Variable Declarations', () => {
  describe('var declarations', () => {
    it('should declare simple var', () => {
      var a = 10;
    });

    it('should declare simple var inside function', () => {
      function f() {
        var a = 10;
        return a;
      }

      expect(f()).toEqual(10);
    });

    it('should declare/access var inside nested function', () => {
      function f() {
        var a = 10;
        return function g() {
          var b = a + 1;
          return b;
        }
      }

      expect(f()()).toEqual(11);
    });

    it('should understand hoisting issue', () => { });

    it('should understand capturing issue', (done) => {
      const spy = jasmine.createSpy();

      for (var i = 0; i < 10; i++) {
        // make closure, which remembers value from outer context in inner function
        (function (i) {
          setTimeout(() => { spy(i); });
        })(i)
      }

      setTimeout(() => {
        expect(spy).toHaveBeenCalledTimes(10);
        expect(spy).toHaveBeenCalledWith(0);
        expect(spy).toHaveBeenCalledWith(1);
        expect(spy).toHaveBeenCalledWith(2);
        expect(spy).toHaveBeenCalledWith(3);
        expect(spy).toHaveBeenCalledWith(4);
        expect(spy).toHaveBeenCalledWith(5);
        expect(spy).toHaveBeenCalledWith(6);
        expect(spy).toHaveBeenCalledWith(7);
        expect(spy).toHaveBeenCalledWith(8);
        expect(spy).toHaveBeenCalledWith(9);

        done();
      });
    });
  });

  describe('let declarations', () => {
    it('should declare variable', () => {
      let hello = 'hello';
    });

    it('should block scope variable', () => {
      function f(input: boolean): number | undefined {
        let a = 100;

        if (input) {
          let b = a + 1;
          return b;
        }

        // return b; // error, not reachable here, no hoisting like with vars
      }

      expect(f(true)).toEqual(101);
      expect(f(false)).toBeUndefined();
    });

    it('should not use variable before it has been declared', () => {
      // a = 5; // error
      let a;
    });

    it('should not declare same variable in same block scope', () => {
      let a = 5;
      // let a; // error
    });

    it('should be scoped in for, thus can use same variable names', () => {
      function sumMatrix(matrix: number[][]) {
        let sum = 0;
        for (let i = 0; i < matrix.length; i++) {
          var currentRow = matrix[i];
          for (let i = 0; i < currentRow.length; i++) {
            sum += currentRow[i];
          }
        }

        return sum;
      }

      expect(sumMatrix([[1, 2], [1, 2]])).toEqual(6);
    });

    it('should capture let variables, no need to make closure like with vars', (done) => {
      const spy = jasmine.createSpy();

      for (let i = 0; i < 10; i++) {
        setTimeout(function () { spy(i); });
      }

      setTimeout(() => {
        expect(spy).toHaveBeenCalledTimes(10);

        expect(spy).toHaveBeenCalledWith(0);
        expect(spy).toHaveBeenCalledWith(1);
        expect(spy).toHaveBeenCalledWith(2);
        expect(spy).toHaveBeenCalledWith(3);
        expect(spy).toHaveBeenCalledWith(4);
        expect(spy).toHaveBeenCalledWith(5);
        expect(spy).toHaveBeenCalledWith(6);
        expect(spy).toHaveBeenCalledWith(7);
        expect(spy).toHaveBeenCalledWith(8);
        expect(spy).toHaveBeenCalledWith(9);
        done();
      });
    });
  });

  describe('const declarations', () => {
    it('should behave like let, but cannot change reference to variable', () => {
      const num = 5;
      // num = 2; // error
    });
  });

  describe('Destructuring', () => {
    describe('Array', () => {
      it('should destructure array', () => {
        let [first, second] = [1, 2];
        expect(first).toEqual(1);
        expect(second).toEqual(2);
      });

      it('should swap values', () => {
        let first = 1;
        let second = 2;

        [second, first] = [first, second];

        expect(first).toEqual(2);
        expect(second).toEqual(1);
      });

      it('should destructure function params', () => {
        function fn([first, second]: [number, number]) {
          return first + second;
        }

        expect(fn([5, 6])).toEqual(11);
      });

      it('should capture rest elements', () => {
        let [first, ...rest] = [1, 2, 3, 4];

        expect(first).toEqual(1);
        expect(rest).toEqual([2, 3, 4]);
      });

      it('should capture n element', () => {
        let [, second] = [1, 2];
        expect(second).toEqual(2);
      });
    });

    describe('Object', () => {
      it('should destructure object', () => {
        const o = {
          name: 'peter',
          age: 38,
          position: 'dev'
        };

        let { age, position } = o;

        expect(age).toEqual(38);
        expect(position).toEqual('dev');
      });

      it('should assign without declaration', () => {
        let a, b;
        ({ a, b } = { a: 'baz', b: 101 });

        expect(a).toEqual('baz');
        expect(b).toEqual(101);
      });

      it('should capture rest props', () => {
        const o = {
          name: 'peter',
          age: 38,
          position: 'dev'
        };

        let { age, ...rest } = o;

        expect(age).toEqual(38);
        expect(rest).toEqual({
          name: 'peter',
          position: 'dev'
        });
      });

      it('should property rename', () => {
        const o = {
          name: 'peter',
          age: 38,
          position: 'dev'
        };

        let { age: a, position: p } = o;

        expect(a).toEqual(38);
        expect(p).toEqual('dev');
      });
    });

    describe('Default values', () => {
      it('should set default value in case its undefined', () => {
        const o = {
          name: 'peter',
          age: undefined,
          position: 'dev'
        };

        let { age = 100, name } = o;

        expect(age).toEqual(100);
        expect(name).toEqual('peter');
      });
    });

    describe('Function declarations', () => {
      it('should destructure with optional param', () => {
        function fn({ a, b }: { a: string, b?: number}) {
          return `${a}: ${b}`;
        }

        expect(fn({
          a: 'hello'
        })).toEqual('hello: undefined')

        expect(fn({
          a: 'hello',
          b: 5
        })).toEqual('hello: 5')
      });

      it('should destructure with default param', () => {
        function fn({ a, b = 0} = { a: ''}) {
          return a + b;
        }

        expect(fn({ a: 'hi', b: 3 })).toEqual('hi3');
        expect(fn()).toEqual('0');
      });
    });

    describe('Spread', () => {
      it('should spread array', () => {
        const arr1 = [1, 2];
        const arr2 = [3, 4];

        expect([...arr1, ...arr2]).toEqual([1, 2, 3, 4]);
      });

      it('should spread object', () => {
        const defaults = { name: 'script', age: 2 };
        expect({ ...defaults, name: 'peter' }).toEqual({
          name: 'peter',
          age: 2
        });
      });

      it('should copy class', () => {
        class A {
          a = 1;
          b = 2;
        }

        let a = new A();
        let copy = { ...a };

        expect(copy.a).toEqual(1);
        expect(copy.b).toEqual(2);
      });
    });
  });
});