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
    it('should do', () => {
      
    });
  });
});
