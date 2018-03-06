import { expect } from 'chai';
// import { Reflect } from 'reflect-metadata';

describe('Decorators', () => {
  describe('Introduction', () => {
    it('should add --experimentalDecorators flag to use this feature', () => { });
    it('should compile to ES5 with decorators', () => {
      // tsc --target ES5 --experimentalDecorators
    });
    it('should use tsconfig.json to enable decorators', () => {
      // {
      //   "compilerOptions": {
      //     "target": "ES5",
      //     "experimentalDecorators": true
      //   }
      // }
    });
  });

  describe('Decorators', () => {
    it('should be special kind of declaration attachable to class declaration, method, accessor, property or parameter', () => { });
    it('should be a function which name corresponds to @expression - function expression(){}', () => {

    });
    it('should create @sealed decorator', () => {
      function sealed(target) {
        // do something with 'target'
      }
    });
  });

  describe('Decorator Factories', () => {
    it('should customize how decorator is applied.', () => { });
    it('should be a function which returns expression called by decorator at runtime', () => {
      function color(value: string) {
        return function (target) {
          return `${target} - ${value}`;
        }
      }

      const c = color('red');

      expect(c('mytarget')).to.eql('mytarget - red');
    });
  });

  describe('Decorator Composition', () => {
    it('should compose on single line', () => {
      // @f @g x;
    });

    it('should compose on multiple lines', () => {
      // @f 
      // @g 
      // x;
    });

    it('should @f @g x decorators evaluate like f(g(x))', () => {
      // 1. The expressions for each decorator are evaluated top-to-bottom.
      // 2. The results are then called as functions from bottom-to-top.
    });

    it('should do example', () => {
      function f() {
        console.log('f() evaluated');
        return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
          console.log('f() called');
        }
      }

      function g() {
        console.log('g() evaluated');
        return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
          console.log('g() called', propertyKey, descriptor);
        }
      }

      class C {
        @f() @g()
        method() {

        }
      }
    });
  });

  describe('Decorator Evaluation', () => {
    it('should follow strict order which is well defined', () => {
      // Parameter Decorators, followed by Method, Accessor, or Property Decorators are applied for each instance member.
      // Parameter Decorators, followed by Method, Accessor, or Property Decorators are applied for each static member.
      // Parameter Decorators are applied for the constructor.
      // Class Decorators are applied for the class.
    });
  });

  describe('Class Decorators', () => {
    it('should manipulate class and its properties', () => {
      function sealed(constructor: Function) {
        console.log('sealed evaluated', constructor);
        Object.defineProperty(constructor.prototype, 'greeting', {
          writable: false,
          value: 'Peter'
        });
      }

      @sealed
      class Greeter {
        greeting: string;

        greet() {
          return `Hello, ${this.greeting}`
        }
      }

      let g = new Greeter();
      // g.greeting = 'boo'; // illegal, not writable thx to decorator
      expect(g.greet()).to.eql('Hello, Peter');
    });

    it('should override the constructor extending it with new props', () => {
      function ClassDecorator(
        target: Function // The class the decorator is declared on
      ) {
        console.log("ClassDecorator called on: ", target);
      }

      @ClassDecorator
      class ClassDecoratorExample {
      }
    });
  });

  describe('Method Decorators', () => {
    // If the method decorator returns a value, it will be used as the Property Descriptor for the method.

    it('should change method in runtime', () => {
      function MethodDecorator(
        target: Object, // The prototype of the class
        propertyKey: string, // The name of the method
        descriptor: TypedPropertyDescriptor<any>
      ) {
        console.log("MethodDecorator called on: ", target, propertyKey, descriptor);
      }

      class MethodDecoratorExample {
        @MethodDecorator
        method() {
        }
      }
    });
  });

  describe('Accessor Decorators', () => {
    it('should decorate get or set props', () => {
      function configurable(value: boolean) {
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
          descriptor.configurable = value;
          descriptor.get = () => {
            return 100;
          }
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

      const p = new Point(2, 1);

      expect(p.x).to.eql(100);
    });
  });

  describe('Property Decorators', () => {
    it('should decorate property', () => {
      function PropertyDecorator(
        target: Object, // The prototype of the class
        propertyKey: string | symbol // The name of the property
      ) {
        console.log("PropertyDecorator called on: ", target, propertyKey);
      }

      class PropertyDecoratorExample {
        @PropertyDecorator
        name: string;
      }
    });
  });

  describe('Static Method Decorator', () => {
    it('should decorate static method', () => {
      function StaticMethodDecorator(
        target: Function, // the function itself and not the prototype
        propertyKey: string | symbol, // The name of the static method
        descriptor: TypedPropertyDescriptor<any>
      ) {
        console.log("StaticMethodDecorator called on: ", target, propertyKey, descriptor);
      }

      class StaticMethodDecoratorExample {
        @StaticMethodDecorator
        static staticMethod() {
        }
      }
    });
  });

  describe('Parameter Decorators', () => {
    it('should log parameters', () => {
      function ParameterDecorator(target: any, key: string, index: number) {
        console.log("ParameterDecorator called on: ", target, key, index);
      }

      class ParameterDecoratorExample {
        method(@ParameterDecorator param1: string, @ParameterDecorator param2: number) {
        }
      }

      const p = new ParameterDecoratorExample();
      p.method('one', 2);
    });
  });
});
