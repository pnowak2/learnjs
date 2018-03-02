import { expect } from 'chai';

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
      function classDecorator<T extends { new(...args: any[]): any }>(constructor: T) {
        return class extends constructor {
          newProperty = 'im new';
          hello = 'override';
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

      let g = new Greeter('bonjour');

      expect(g.hello).to.eql('override');
      expect((g as any).newProperty).to.eql('im new');
    });
  });

  describe('Method Decorators', () => {
    it('should behave...', () => {

    });
  });
});
