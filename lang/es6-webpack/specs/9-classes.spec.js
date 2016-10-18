import { expect } from 'chai';

describe('Classes', () => {
  it('should implement ES5 Way', () => {
    function PersonType(name) {
      this.name = name;
    }

    PersonType.prototype.sayName = function () {
      return this.name;
    };

    var pt = new PersonType('piotr');

    expect(pt.sayName()).to.eql('piotr');
    expect(pt).to.be.instanceof(PersonType);
  });

  describe('Class Declarations', () => {
    it('should do class declaration without class keyword at all, same effect', () => {
      let PersonType = (function () {
        const PersonType = function (name) {
          if (typeof new.target === 'undefined') {
            throw new Error('Constructor must be called with new.');
          }

          this.name = name;
        };

        Object.defineProperty(PersonType.prototype, 'sayName', {
          value: function () {
            return this.name;
          },
          enumerable: false,
          writable: true,
          configurable: true
        });

        return PersonType;
      })();

      var pt = new PersonType('piotr');

      expect(pt.sayName()).to.eql('piotr');
      expect(pt).to.be.instanceof(PersonType);
    });

    it('should declare a class', () => {
      class PersonClass {
        constructor(name) {
          this.name = name;
        }

        sayName() {
          return this.name;
        }
      }

      let pc = new PersonClass('piotr');

      expect(pc.sayName()).to.eql('piotr');
      expect(pc).to.be.instanceof(PersonClass);
      expect(typeof PersonClass).to.eql('function');
      expect(typeof pc.sayName).to.eql('function');
    });
  });

  describe('Class Expression', () => {
    it('should use class expression', () => {
      let PersonClass = class {
        constructor(name) {
          this.name = name;
        }

        sayName() {
          return this.name;
        }
      };

      let pc = new PersonClass('piotr');

      expect(pc.sayName());
    });
  });

  describe('Classes as First-Class Citizens', () => {
    it('should pass class as arg to function', () => {
      let createObj = (classDef) => {
        return new classDef();
      };

      let obj = createObj(class {
        sayHi() {
          return 'Hi!';
        }
      });

      expect(obj.sayHi()).to.eql('Hi!');
    });

    it('should provide accessor properties', () => {
      class CustomHtmlElement {
        constructor(element) {
          this.element = element;
        }

        get html() {
          return this.element.innerHTML;
        }

        set html(value) {
          this.element.innerHTML = value;
        }
      }

      let el = new CustomHtmlElement({
        innerHTML: 'html'
      });

      expect(el.element.innerHTML).to.eql('html');

      expect(Object.getOwnPropertyDescriptor(CustomHtmlElement.prototype, 'html').get).to.be.a('function');
    });

    it('should provide computed member names', () => {
      let methodName = 'sayName';
      let customProp = 'myProp';

      class Person {
        constructor(name) {
          this.name = name;
        }

        [methodName]() {
          return this.name;
        }

        get [customProp]() {
          return 'hello prop';
        }
      }

      let p = new Person('valor');

      expect(p.sayName()).to.eql('valor');
      expect(p.myProp).to.eql('hello prop');
    });
  });

  describe('Generator Methods', () => {
    it('should declare iterator method on class', () => {
      class Person {
        *createIterator() {
          yield 2;
          yield 5;
        }
      }

      let p = new Person();
      let pit = p.createIterator();

      expect(pit.next().value).to.eql(2);
    });

    it('should declare default iterator', () => {
      class Person {
        *[Symbol.iterator]() {
          yield 1;
          yield 6;
        }
      }

      let p = new Person();
      let result = '';
      for (let x of p) {
        result += x;
      }

      expect(result).to.eql('16');
    });

    it('should declare default iterator with delegating to internal collection iterator', () => {
      class Person {
        constructor() {
          this.items = new Set([1, 2, 3]);
        }

        *[Symbol.iterator]() {
          yield* this.items.values();
        }
      }

      let p = new Person();
      let result = '';
      for (let x of p) {
        result += x;
      }

      expect(result).to.eql('123');
    });
  });

  describe('Static Members', () => {
    it('The ES5 way', () => {
      function Person(name) {
        this.name = name;
      }

      Person.create = function (name) {
        return new Person(name);
      };

      Person.prototype.say = function () {
        return this.name;
      };

      var p = Person.create('valor');

      expect(p.say()).to.eql('valor');
    });

    it('ES6 way with static keyword', () => {
      class Person {
        constructor(name) {
          this.name = name;
        }

        say() {
          return this.name;
        }

        static create(name) {
          return new Person(name);
        }
      }

      let p = Person.create('piotr');

      expect(p.say()).to.eql('piotr');
    });
  });

  describe('Inheritance with Derived Classes', () => {
    it('ES5 way', () => {
      function Rectangle(length, width) {
        this.length = length;
        this.width = width;
      }

      Rectangle.prototype.getArea = function () {
        return this.length * this.width;
      };

      function Square(length) {
        Rectangle.call(this, length, length);
      }

      Square.prototype = Object.create(Rectangle.prototype, {
        constructor: {
          value: Square,
          enumerable: true,
          writable: true,
          configurable: true
        }
      });

      var square = new Square(3);

      expect(square.getArea()).to.eql(9);
      expect(square).to.be.instanceOf(Rectangle);
      expect(square).to.be.instanceOf(Square);
    });

    it('ES6 way', () => {
      class Rectangle {
        constructor(length, width) {
          this.length = length;
          this.width = width;
        }

        getArea() {
          return this.length * this.width;
        }
      }

      class Square extends Rectangle {
        constructor(width) {
          super(width, width);
        }
      }

      let square = new Square(3);

      expect(square.getArea()).to.eql(9);
      expect(square).to.be.instanceOf(Rectangle);
      expect(square).to.be.instanceOf(Square);
    });

    it('should shadow class methods', () => {
      class Rectangle {
        constructor(length, width) {
          this.length = length;
          this.width = width;
        }

        getArea() {
          return this.length * this.width;
        }
      }

      class Square extends Rectangle {
        constructor(length) {
          super(length, length);
        }

        getArea() {
          return super.getArea();
        }
      }

      var square = new Square(4);

      expect(square.getArea()).to.eql(16);

    });

    it('inherited static members', () => {
      class Rectangle {
        constructor(length, width) {
          this.length = length;
          this.width = width;
        }

        getArea() {
          return this.length * this.width;
        }

        static create(length, width) {
          return new Rectangle(length, width);
        }
      }

      class Square extends Rectangle {
        constructor(length) {
          // same as Rectangle.call(this, length, length)
          super(length, length);
        }
      }

      var rect = Square.create(3, 4);

      expect(rect.getArea()).to.eql(12);
      expect(rect).to.be.instanceOf(Rectangle);
      expect(rect).not.to.be.instanceOf(Square);
    });

    it('should derive classes from expressions', () => {
      function Rectangle(length, width) {
        this.length = length;
        this.width = width;
      }

      Rectangle.prototype.getArea = function () {
        return this.length * this.width;
      };

      class Square extends Rectangle {
        constructor(width) {
          // same as Rectangle.call(this, length, length)
          super(width, width);
        }
      }

      let square = new Square(5);

      expect(square.getArea()).to.eql(25);
    });

    it('should inherit from built-ins', () => {
      class MyArray extends Array {

      }

      var colors = new MyArray();

      colors.push('red');

      expect(colors[0]).to.eql('red');
    });
  });
});
