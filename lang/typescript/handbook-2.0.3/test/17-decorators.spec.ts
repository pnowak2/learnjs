import { expect } from 'chai';
import * as sinon from 'sinon';
import "reflect-metadata";

describe('Decorators', () => {
  describe('Simple decorator', () => {
    it('should attach decorator', () => {
      const spy = sinon.spy();

      function myDecorator(target: Person) {
        spy(target);
        expect(target).to.eq(Person);
      }

      @myDecorator
      class Person {

      }
    });

    it('should replace method using decorator', () => {
      const spy = sinon.spy();

      function myDecorator(target: any) {
        const original = target.prototype.mtd;

        target.prototype.mtd = () => {
          spy('decorator call');
        }
      }

      @myDecorator
      class Person {
        mtd() {
          spy('class call');
        }
      }

      const p = new Person();
      p.mtd();

      expect(spy.calledWith('decorator call')).to.be.true;
      expect(spy.calledWith('class call')).to.be.false;
    });
  });

  describe('Decorator factories', () => {

    it('should make factory', () => {
      function color(value: string) {
        return function (target) {
          target.color = value;
        }
      }

      @color('#ff0000')
      class Person {
        static color;
      }

      expect(Person.color).to.eql('#ff0000');
    });

  });

  describe('Decorator composition', () => {
    it('should note the order of applying decorators', () => {
      function f(target) {
        target.prototype.named += 'f';
      }
      function g(target) {
        target.prototype.named = 'g';
      }

      @f // called second
      @g // called first
      class Person {
        named: string;
      }

      const p = new Person();

      expect(p.named).to.eql('gf');
    });
  });

  describe('Class Decorators', () => {
    it('should apply to class (will be applied to constructor function)', () => {
      function sealed(constructor: Function) {
        Object.seal(constructor);
        Object.seal(constructor.prototype);
      }

      @sealed
      class Person {
        name: string = 'original';
      }

      let p: any = new Person();

    });

    it('should replace class declaration if returns value', () => {
      function classDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
        return class extends constructor {
          newProperty = "new property";
          hello = "override";
        }
      }

      @classDecorator
      class Greeter {
        property = "property";
        hello: string;
        constructor(m: string) {
          this.hello = m;
        }
      }

      console.log(new Greeter("world"));
    });
  });

  describe('Method Decorators', () => {
    it('should declare it', () => {
      function enumerable(value: boolean) {
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
          descriptor.enumerable = false;
          console.log('enumarable');
        };
      }

      class Person {
        @enumerable(false)
        greet() {
          console.log('greet')
        }
      }

      const p = new Person();
      p.greet();
    });
  });

  describe('Accessor Decorators', () => {
    it('should declare it', () => {
      function configurable(value: boolean) {
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
          descriptor.configurable = value;
        };
      }

      class Point {
        private _x: number;
        private _y: number;
        constructor(x: number, y: number) {
          this._x = x;
          this._y = y;
        }

        @configurable(false)
        get x() { return this._x; }

        @configurable(false)
        get y() { return this._y; }
      }
    });
  });

  describe('Property Decorators', () => {
    it('should declare it', () => {
      function logProperty(target: any, key: string) {
        // Property value.
        let _val = target[key];

        // Property getter.
        const getter = function () {
          console.log(`Get: ${key} => ${_val}`);
          return _val;
        };

        // Property setter.
        const setter = function (newVal) {
          console.log(`Set: ${key} => ${newVal}`);
          _val = newVal;
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

      /**
       *  A class with a property decorator.
       */
      class Task {
        @logProperty
        public id: number;
        @logProperty
        public title: string;

        constructor(id: number, title: string) {
          this.id = id;
          this.title = title;
        }
      }

      const t = new Task(2, 'testing');

      t.id = 5;

      console.log(t.id);
    });
  });

  describe('Parameter Decorators', () => {
    class Greeter {
      greeting: string;

      constructor(message: string) {
        this.greeting = message;
      }

      @validate
      greet( @required name: string) {
        return "Hello " + name + ", " + this.greeting;
      }
    }

    const requiredMetadataKey = "required";

    function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
      let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
      existingRequiredParameters.push(parameterIndex);
      Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
    }

    function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
      let method = descriptor.value;
      descriptor.value = function () {
        let requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
        if (requiredParameters) {
          for (let parameterIndex of requiredParameters) {
            if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
              throw new Error("Missing required argument.");
            }
          }
        }

        return method.apply(this, arguments);
      }
    }
  });
});