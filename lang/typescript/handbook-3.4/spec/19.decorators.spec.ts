describe('19 Decorators', () => {
  describe('Are simple functions', () => {
    it('should modify its target', (done) => {
      function sealed(target) {
        expect(target).toBe(Person);
        done();
        Object.seal(target);
      }

      @sealed
      class Person {

      }
    });
  });

  describe('Decorator Factories', () => {
    it('should create function which returns decorator function', (done) => {
      function color(value: string) {
        return function (target) {
          target.prototype.color = value;
        }
      }

      @color('red')
      class Person { }

      setTimeout(() => {
        expect((<any>Person.prototype).color).toEqual('red');
        done();
      });
    });
  });

  describe('Decorators order', () => {
    it('should call as f(g(x))', (done) => {
      const fSpy = jasmine.createSpy('fSpy');
      const gSpy = jasmine.createSpy('gSpy');

      function f() {
        return fSpy;
      }

      function g() {
        return gSpy;
      }

      class C {
        @f()
        @g()
        method() {

        }
      }

      setTimeout(() => {
        expect(gSpy).toHaveBeenCalled();
        expect(gSpy).toHaveBeenCalledBefore(fSpy);
        expect(fSpy).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('Class Decorators', () => {
    it('should apply change to constructor/class itself, or can replace class itself when returned it', () => {
      function sealed(constructor: Function) {
        Object.seal(constructor);
      }

      class Person { }

      @sealed
      class Animal { }

      expect(Object.isSealed(Person)).toBe(false);
      expect(Object.isSealed(Animal)).toBe(true);
    });
  });

  describe('Method Decorators', () => {
    it('should apply change to method or replace the method itself', () => {
      function proxify(value: boolean) {
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
          const result = target[propertyKey](value);

          return Object.defineProperty(target, `${propertyKey}`, {
            ...descriptor,
            value: function () {
              return `${result} [Proxy] - ${value}`
            }
          });
        }
      }

      class Person {
        age: 2;

        @proxify(false)
        greet() {
          return 'hello world';
        }
      }

      expect((<any>new Person()).greet()).toEqual('hello world [Proxy] - false');
    });
  });

  describe('Property Decorators', () => {
    it('should change property member', () => {
      function format(format: string) {
        return function (target: any, key: string): any {
          var _val = target[key];

          // property getter
          var getter = function () {
            return _val;
          };

          // property setter
          var setter = function (newVal) {
            _val = newVal + ' ' + format;
          };

          // Delete property.
          if (delete target[key]) {
            // Create new property with getter and setter
            Object.defineProperty(target, key, {
              get: getter,
              set: setter,
              enumerable: true,
              configurable: true
            });
          }
        }
      }

      class Greeter {
        @format("[proxied]")
        greeting: string;

        constructor(message: string) {
          this.greeting = message;
        }
        greet() {
          return this.greeting;
        }
      }

      const g = new Greeter('my dear');

      expect(g.greet()).toEqual('my dear [proxied]');
    });
  });

  describe('Parameter Decorators', () => {
    it('should be able to statically have access to param of given method by its index in args list', () => {

      function required(target: any, propertyKey: string | symbol, parameterIndex: number) { }

      class Greeter {
        greeting: string;

        constructor(message: string) {
          this.greeting = message;
        }

        greet(@required name: string) {
          return "Hello " + name + ", " + this.greeting;
        }
      }

      const g = new Greeter('hi');
      g.greet('peter');
    });
  });
});