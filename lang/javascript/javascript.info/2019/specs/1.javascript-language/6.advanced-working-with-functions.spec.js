describe('6 Advanced working with functions', () => {
  describe('6.1 Recursion and Stack', () => {
    it('should read the section', () => { });
  });

  describe('6.2 Rest parameters and spread operator', () => {
    it('should make function with any number of args', () => {
      function sumAll(...args) {
        return args.reduce((sum, arg) => sum + arg, 0);
      }

      expect(sumAll(1, 2, 3, 4)).toEqual(10);
    });

    it('should take some args, and gather rest', () => {
      function sumAll(a, b, ...args) {
        expect(a).toEqual(1);
        expect(b).toEqual(2);
        expect(args).toEqual([3, 4]);
      }

      sumAll(1, 2, 3, 4);
    });

    it('should use arguments variable', () => {
      function fn() {
        expect(arguments.length).toBe(4);
        expect(arguments[0]).toBe(1);
        expect(arguments[1]).toBe(2);
        expect(arguments[2]).toBe(3);
        expect(arguments[3]).toBe(4);

        // new way
        expect(Array.from(arguments)).toEqual([1, 2, 3, 4]);
        // old way with borrowing method
        expect([].slice.call(arguments)).toEqual([1, 2, 3, 4]);
      }

      fn(1, 2, 3, 4);
    });

    it('should use spread operator', () => {
      const nbrs = [0, 1, 2, 6, 5, 4, 3];
      const morenbrs = [16, 11, 52];
      expect(Math.max(...nbrs, ...morenbrs)).toEqual(52);
    });

    it('should user spread to merge arrays', () => {
      const arr1 = [1, 2, 3];
      const arr2 = [4, 5, 6];

      expect([...arr1, ...arr2]).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  describe('6.3 Closure', () => {
    describe('Simple examples', () => {
      it('should use most recent updated variable', () => {
        let name = 'peter';

        function hi() {
          return name;
        }

        name = 'john';

        expect(hi()).toEqual('john');
      });

      it('should have access to outer variable from parent context', () => {
        function makeWorker() {
          let name = 'peter';

          return function () {
            return name;
          };
        }

        expect(makeWorker()()).toEqual('peter');
      });
    });

    describe('Lexical environment', () => {
      it('should variable belong to internal object (lex env)', () => { });
      it('should lex env point to outer lex env', () => { });
      it('should create new lex env each time function is called', () => { });
      it('should make counter example, proving independance of lex envs', () => {
        function makeCounter() {
          let count = 0;

          return function () {
            return count++;
          };
        }

        let counter1 = makeCounter();
        let counter2 = makeCounter();

        expect(counter1()).toEqual(0);
        expect(counter1()).toEqual(1);

        expect(counter2()).toEqual(0);
        expect(counter2()).toEqual(1);
      });
    });

    describe('Code blocks and loops, IIFE', () => {
      it('should create lex env for code blocks, ifs, for, whiles, switch etc, not only for functions', () => { });
      it('should understand IIFE (immediately invoked function expression)', () => {
        (function () {
          const x = 1;
          expect(x).toEqual(1);
        })();


        expect(function () {
          console.log(x);
        }).toThrow();
      });

      it('should have many ways calling IIFE', () => {
        let result = 0;

        (function () {
          result++;
        })();

        (function () {
          result++;
        }());

        !function () {
          result++;
        }();

        +function () {
          result++;
        }();

        expect(result).toEqual(4);
      });
    });
  });

  describe('6.4 The old var', () => {
    it('should read the section', () => { });
  });

  describe('6.5 Global object', () => {
    it('should be window in browser', () => {
      expect(global).toBe(window);
    });

    it('should get it from function', () => {
      const g = (function () {
        return this;
      })();

      expect(g).toBe(window);
    });

    it('should bind var without "var" keyword to global object', () => {
      const g = (function () {
        x = 5;
      })();

      expect(global.x).toBe(5);
    });
  });

  describe('6.6 Function object, NFE', () => {
    it('should have "name" property, giving function name', () => {
      function hi() { }

      expect(hi.name).toEqual('hi');
    });

    it('should have the "length" property', () => {
      function hi(a, b) { }

      expect(hi.length).toEqual(2);
    });

    it('should add custom properties to function', () => {
      function hi() {
        hi.counter++;
      }
      hi.counter = 0;

      expect(hi.counter).toEqual(0);

      hi();

      expect(hi.counter).toEqual(1);
    });

    it('should check named function expression', () => {
      const hi = function func(who) {
        return who ? `Hej, ${who}.` : func('Anonymous');
      };

      expect(hi('Ptr')).toEqual('Hej, Ptr.');
      expect(hi()).toEqual('Hej, Anonymous.');
    });
  });

  describe('6.7 New Function syntax', () => {
    it('should create function in fly', () => {
      let sum = new Function('a', 'b', 'return a + b');

      expect(sum(1, 6)).toEqual(7);
    });

    it('should point to global lexical context', () => {
      let glob = new Function('return this');

      expect(glob()).toBe(window);
    });
  });

  describe('6.8 Scheduling', () => {
    describe('setTimeout(func, delay, ...args)', () => {
      it('should define delayed execution', (done) => {
        setTimeout((arg1, arg2) => {
          expect(arg1).toBe('a');
          expect(arg2).toBe('b');
          done();
        }, 10, 'a', 'b');
      });

      it('should cancel with clearTimeout', (done) => {
        let id = setTimeout(() => {
          throw Error();
        }, 5);

        clearTimeout(id);
        setTimeout(() => {
          done();
        }, 10);
      });
    });

    describe('setInterval(func, delay, ...args)', () => {
      it('should define delayed execution', (done) => {
        let counter = 0;
        setInterval((arg1, arg2) => {
          counter ++;
          if(counter === 3) {
            done();
          }
        }, 0, 'a', 'b');
      });

      it('should cancel with clearTimeout', (done) => {
        let id = setInterval(() => {
          throw Error();
        }, 5);

        clearInterval(id);

        setTimeout(() => {
          done();
        }, 10);
      });
    });
  });

  describe('6.9 Decorators and forwarding, call/apply', () => {
    describe('call()', () => {
      it('should call function providing custom context and params', () => {
        const o = {
          name: 'peter',
          greet(salutation) {
            return `${salutation}, ${this.name}`;
          }
        };
  
        expect(o.greet('hi')).toEqual('hi, peter');
  
        expect(o.greet.call({ name: 'john' }, 'welcome')).toEqual('welcome, john');
      });
  
      it('should cache transparently', () => {
        function memoized(fn) {
          const cache = new Map();
  
          return function(c) {
            if(cache.has(c)) {
              return cache.get(c);
            } else {
              const result = fn.call(this, c);
              cache.set(c, result);
              return result;
            }
          };
        }
  
        const obj = {
          expensive(c) {
            return c.repeat(10);
          }
        };
  
        spyOn(obj, 'expensive').and.callThrough();
  
        const notSoExpensive = memoized(obj.expensive);
  
        expect(notSoExpensive('-')).toEqual('----------');
        expect(notSoExpensive('.')).toEqual('..........');
        expect(notSoExpensive('-')).toEqual('----------');
        expect(notSoExpensive('-')).toEqual('----------');
        expect(notSoExpensive('-')).toEqual('----------');
        expect(notSoExpensive('-')).toEqual('----------');
  
        expect(obj.expensive).toHaveBeenCalledTimes(2);
      });
    });

    describe('apply()', () => {
      it('should call function providing custom context and params as array', () => {
        const o = {
          name: 'peter',
          greet(salutation) {
            return `${salutation}, ${this.name}`;
          }
        };
  
        expect(o.greet('hi')).toEqual('hi, peter');
  
        expect(o.greet.apply({ name: 'john' }, ['welcome'])).toEqual('welcome, john');
      });
  
      it('should cache transparently with any number of arguments', () => {
        function memoized(fn) {
          const cache = new Map();
  
          return function(...args) {
            const cacheKey = JSON.stringify(args);

            if(cache.has(cacheKey)) {
              return cache.get(cacheKey);
            } else {
              const result = fn.apply(this, args);
              cache.set(cacheKey, result);
              return result;
            }
          };
        }
  
        const obj = {
          sum(a, b) {
            return a + b;
          }
        };
  
        spyOn(obj, 'sum').and.callThrough();
  
        const notSoExpensiveSum = memoized(obj.sum);
  
        expect(notSoExpensiveSum(2, 3)).toEqual(5);
        expect(notSoExpensiveSum(3, 3)).toEqual(6);
        expect(notSoExpensiveSum(2, 3)).toEqual(5);
        expect(notSoExpensiveSum(2, 3)).toEqual(5);
        expect(notSoExpensiveSum(3, 3)).toEqual(6);
  
        expect(obj.sum).toHaveBeenCalledTimes(2);
      });
    });

    describe('Borrowing a method', () => {
      it('should borrow any method', () => {
        expect([].join.call([1, 2, 3], '-')).toEqual('1-2-3');
      });
    });
  });

  describe('6.10 Function binding', () => {
    it('should behave...', () => {
      
    });
  });
});