var expect = require('chai').expect;
var sinon = require('sinon');

describe('6. Advanced Working With Functions', () => {
  describe('6.1 Recursion and Stack', function () {
    it('should read the section', () => { });

    it('should write simple recursive function', () => {
      function power(val, pow) {
        if (pow === 1) {
          return val;
        } else {
          return val * power(val, pow - 1);
        }
      }

      expect(power(3, 3)).to.eql(27);
    });

    describe('The execution stack', () => {
      it('should read the section', () => { });
    });
  });

  describe('6.2 Rest Parameters and Spread Operator', () => {
    describe('Rest parameters ...', () => {
      it('should gather excessive param with rest ... operator', () => {
        function fn(p1, p2, ...rest) {
          return [p1, p2, ...rest].join(', ');
        }

        expect(fn('a', 'b', 'c', 'd')).to.eql('a, b, c, d');
      });
    });

    describe('The arguments variable', () => {
      it('should have special array-like argument in functions', () => {
        function fn() {
          let args = Array.from(arguments);
          return args.join(', ');
        }

        expect(fn(1, 2, 3, 4)).to.eql('1, 2, 3, 4');
      });
    });

    describe('Spread operator', () => {
      it('should spread array to stand-alone arguments', () => {
        expect(Math.max([1, 2, 3])).not.to.eql(3);
        expect(Math.max(...[1, 2, 3])).to.eql(3);
        expect([0, ...[1, 2, 3]]).to.eql([0, 1, 2, 3]);
      });
    });
  });
  describe('6.3 Closure', () => {
    describe('A couple of questions', () => {
      it('should use external variable', () => {
        let name = 'john';

        function fn() {
          return `hello, ${name}`;
        }

        name = 'peter';

        expect(fn()).to.eql('hello, peter');
      });

      it('should use nested context with variables', () => {
        function outer() {
          let name = 'peter';

          return function () {
            return name;
          }
        }

        let name = 'john';
        let work = outer();

        expect(work()).to.eql('peter');
      });

      it('should do counter excercise', () => {
        function makeCounter() {
          let counter = 0;

          return function () {
            return counter++;
          }
        }

        let c = makeCounter();

        expect(c()).to.eql(0);
        expect(c()).to.eql(1);
        expect(c()).to.eql(2);

        let d = makeCounter();

        expect(d()).to.eql(0);
        expect(d()).to.eql(1);
        expect(d()).to.eql(2);
      });
    });

    describe('Code blocks and Loops, IIFE', () => {
      it('should provide lexical environment in if', () => {
        let phrase = 'hello';

        if (true) {
          let user = 'peter';
        }

        // below will fail, outside of scope
        // expect(`${phrase}, ${user}`).to.eql('hello, peter');
      });

      it('should use IIFE', () => {
        (function () {
          let user = 'peter';
          expect(true).to.be.true;
        })();

        expect(typeof user).to.eql('undefined');
      });

      it('should use another IIFE expressions', () => {
        // brackets around the whole thing
        (function () {

        })();

        // brackets around the function
        (function () {

        }());

        // bitwise NOT starts the expression
        !function () {

        }();

        // Unary plus starts the expression
        +function () {

        }();
      });
    });
  });

  describe('6.4 The Old var', () => {
    it('should not have block scope', () => {
      if (true) {
        var phrase = 'peter';
      }

      expect(phrase).to.eql('peter');
    });

    it('should hoist variable to the top', () => {
      function sayHi() {
        phrase = "Hello";
        console.log(phrase);
        var phrase;
      }

      // …Is technically the same as this (moved var phrase above):

      function sayHi() {
        var phrase;
        phrase = "Hello";
        console.log(phrase);
      }
    });
  });

  describe('6.5 Global Object', () => {
    it('should be window in browser', () => {
      window.myName = 'peter';
      expect(myName).to.eql('peter');
    });

    it('should check for global defined features', () => {
      expect(typeof XMLHttpRequest).to.eql('function');
    });

    it('should use this in global window', () => {
      (function () {
        // expect(this === window).to.be.true;
      })();
    });
  });
  describe('6.6 Function Object NFE', () => {
    describe('name property', () => {
      it('should have name property', () => {
        function hello() { }
        let isNew = function () { }

        expect(hello.name).to.eql('hello');
        expect(isNew.name).to.eql('isNew');
      });

      it('should have no name', () => {
        expect((function () { }).name).to.eql('');

      });
    });

    describe('length property', () => {
      it('should return number of params', () => {
        function fn(a, b, c) { }
        expect(fn.length).to.eql(3);
      });
    });

    describe('Adding custom properties to function', () => {
      it('should provide counter property', () => {
        function fn() {
          fn.counter++;
          return 'hello';
        }

        fn.counter = 0;

        fn();
        fn();

        expect(fn.counter).to.eql(2);
      });
    });

    describe('Named Function Expression - NFE', () => {
      it('should have two names', () => {
        let fn = function myFn() {
          return 'hello';
        }

        expect(fn()).to.eql('hello');
      });

      it('should not be accessible outside function', () => {
        let fn = function myFn() {
          return 'hello: ' + typeof (myFn);
        }

        expect(typeof myFn).to.eql('undefined');
        expect(fn()).to.eql('hello: function');
      });

    });
  });

  describe('6.7 The new Function Syntax', () => {
    it('should declare function', () => {
      let sum = new Function('a', 'b', 'return a + b');
      expect(sum(1, 6)).to.eql(7);
    });
  });

  describe('6.8 Scheduling, setTimeout, setInterval', () => {
    describe('setTimeout', () => {
      it('should delay function and pass it params (IE not compatibile)', (done) => {
        setTimeout((p1, p2) => {
          expect(p1).to.eql('one');
          expect(p2).to.eql('two');
          done();
        }, 5, 'one', 'two');
      });

      it('should cancel with clearTimeout', () => {
        let id = setTimeout((done) => {
          expect(true).to.be.false;
          done();
        }, 20);

        clearTimeout(id);
      });
    });

    describe('setInterval', () => {
      it('should run function in same intervals', (done) => {
        let id = setInterval(() => {
        }, 5);

        clearInterval(id);
        done();
      });
    });
  });

  describe('6.9 Decorators, forwarding with call() and apply()', () => {
    it('should make caching wrapper', () => {
      function wrapper(fn) {
        let cache = new Map();

        return function (x) {
          if (cache.has(x)) {
            return cache.get(x);
          } else {
            let value = fn(x);
            cache.set(x, value);
            return value;
          }
        }
      }

      function slow(x) {
        slow.counter++;
        return x;
      }

      slow.counter = 0;

      let wrapped = wrapper(slow);

      expect(wrapped(1)).to.eql(1);
      expect(slow.counter).to.eql(1);
      expect(wrapped(1)).to.eql(1);
      expect(slow.counter).to.eql(1);

      expect(wrapped(2)).to.eql(2);
      expect(slow.counter).to.eql(2);
      expect(wrapped(2)).to.eql(2);
      expect(slow.counter).to.eql(2);
      expect(wrapped(2)).to.eql(2);
      expect(slow.counter).to.eql(2);
    });

    describe('Call Invocation', () => {
      it('should call function passing this object', () => {
        function fn(p1, p2) {
          return p1 + p2;
        }

        let result = fn.call(null, 2, 5);

        expect(result).to.eql(7);
      });

      it('should call function with this object', () => {
        let obj = {
          name: 'peter',
          greet(salutation) {
            return `${salutation}, ${this.name}`;
          }
        }

        expect(obj.greet('hello')).to.eql('hello, peter');
        let result = obj.greet.call({ name: 'michel' }, 'welcome');

        expect(result).to.eql('welcome, michel');
      });

      it('should apply function with this object', () => {
        let obj = {
          name: 'peter',
          greet(p1, p2) {
            return `${p1}, ${p2}, ${this.name}`;
          }
        }

        expect(obj.greet('hello', 'hi')).to.eql('hello, hi, peter');
        let result = obj.greet.apply({ name: 'michel' }, ['welcome', 'yo']);

        expect(result).to.eql('welcome, yo, michel');
      });

      it('should do method borrowing', () => {
        expect([].slice.call([1, 2, 3], 1, 2)).to.eql([2]);
      });
    });
  });

  describe('6.10 Functions Binding', () => {
    it('should write own bind function', () => {
      function bind(fn, obj) {
        return function () {
          let args = Array.prototype.slice.call(arguments, 0, arguments.length);
          return fn.apply(obj, args);
        }
      }

      function fn(param) {
        return this.name + param;
      }

      let boundFn = bind(fn, { name: 'peter' });
      expect(boundFn('nowak')).to.eql('peternowak');
    });

    it('should write own bind function, using spreads', () => {
      function bind(fn, obj) {
        return function (...params) {
          return fn.apply(obj, params);
        }
      }

      function fn(param) {
        return this.name + param;
      }

      let boundFn = bind(fn, { name: 'peter' });
      expect(boundFn('nowak')).to.eql('peternowak');
    });

    it('should use Function.prototype.bind()', () => {
      function fn(param) {
        return this.name + param;
      }

      let boundFn = fn.bind({ name: 'peter' })
      expect(boundFn('nowak')).to.eql('peternowak');
    });
  });

  describe('6.11 Currying And Partials', () => {
    it('should behave...', () => {
      function curry(fn) {
        return function curried(...args) {
          if(args.length >= fn.length) {
            return fn.apply(this, args);
          } else {
            return function(...args2) {
              return curried.apply(this, [...args, ...args2]);
            }
          }
        }
      }      

      function mul(a, b, c) {
        return a * b * c;
      }

      let dbl = curry(mul);
      expect(dbl(5)(2)(3)).to.eql(30);
    });  
  });

  describe('6.12 Arrow Functions Revisited', () => {
    it('Dont have this object', () => { }); 
    it('Cannot be run with new', () => { }); 
    it('Do not have arguments variable', () => { }); 
  });
});
