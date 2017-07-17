import { expect } from 'chai';
import * as sinon from 'sinon';

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

});