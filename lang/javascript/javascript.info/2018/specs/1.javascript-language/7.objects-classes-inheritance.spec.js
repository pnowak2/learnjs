var expect = require('chai').expect;
var sinon = require('sinon');

describe('7. Objects, Classes, Inheritance', () => {
  describe('7.1 Property Flags And Descriptors', function () {
    it('should be configurable', () => { });
    it('should be writable', () => { });
    it('should be enumerable', () => { });

    describe('Object.getOwnPropertyDescriptor()', () => {
      it('should retrieve property descriptor', () => {
        let user = {
          name: 'peter'
        };

        let descr = Object.getOwnPropertyDescriptor(user, 'name');

        expect(descr.configurable).to.eql(true);
        expect(descr.writable).to.eql(true);
        expect(descr.enumerable).to.eql(true);
        expect(descr.value).to.eql('peter');
      });
    });

    describe('Object.defineProperty()', () => {
      it('should define property for object', () => {
        let user = {
          name: 'peter'
        };

        Object.defineProperty(user, 'age', {
          writable: false,
          configurable: false,
          enumerable: false,
          value: 12
        });

        expect(user.age).to.eql(12);
      });
    });

    describe('Object.defineProperties()', () => {
      it('should define properties for object', () => {
        let user = {
          name: 'peter'
        };

        Object.defineProperties(user, {
          age: {
            value: 38
          },
          job: {
            value: 'it guy'
          }
        });

        expect(user.age).to.eql(38);
        expect(user.job).to.eql('it guy');
      });
    });

    describe('Object.getOwnPropertyDescriptors()', () => {
      it('should get own property descriptors', () => {
        let user = {
          name: 'peter'
        };

        let descrs = Object.getOwnPropertyDescriptors(user);
        console.log(descrs);
        expect(descrs.name.value).to.eql('peter');
      });
    });

    describe('Sealing an object globally', () => {
      it('Object.preventExtensions() - forbids adding properties', () => { });
      it('Object.seal() - forbids adding / removing properites, configurable = false', () => { });
      it('Object.freeze() - forbids adding / removing / modifiying properties, configurable = false, writable = false', () => { });
      it('Object.isExtensible()', () => { });
      it('Object.isSealed()', () => { });
      it('Object.isFrozen()', () => { });
    });
  });

  describe('7.2 Property Getters and Setters', () => {
    it('should understand getters and setters', () => {
      let obj = {
        _name: '',

        get name() {
          return this._name;
        },

        set name(value) {
          this._name = value + ' [setter]';
        }
      }

      obj.name = 'john';

      expect(obj.name).to.eql('john [setter]');
    });

    it('should use accessor descriptors', () => {
      let user = {
        _age: 0,
        name: 'peter'
      };

      Object.defineProperty(user, 'age', {
        get() {
          return this._age;
        },

        set(value) {
          this._age = value;
        }
      });

      expect(user.age).to.eql(0);
    });

  });

  describe('7.3 Prototypal Inheritance', () => {
    describe('[[Prototype]] feature', () => {
      it('should do simple prototype chain', () => {
        let animal = {
          eats: true,
          walk() {
            return 'animal walk';
          }
        }

        let rabbit = {
          jumps: true
        }

        rabbit.__proto__ = animal;

        expect(rabbit.eats).to.be.true;
        expect(rabbit.jumps).to.be.true;
        expect(rabbit.walk()).to.eql('animal walk');
      });

      it('should do longer chain', () => {
        let animal = {
          eats: true,
          walk() {
            return 'animal walk';
          }
        };

        let rabbit = {
          jumps: true,
          __proto__: animal
        };

        let longEar = {
          earLength: 10,
          __proto__: rabbit
        }

        expect(longEar.eats).to.be.true;
        expect(longEar.jumps).to.be.true;
        expect(longEar.earLength).to.eql(10);
        expect(longEar.walk()).to.eql('animal walk');
      });
    });

    describe('Read/Write Rules', () => {
      it('should first find property/method in object directly', () => {
        let animal = {
          eats: true,
          walk() {
            return 'animal walk';
          }
        }

        let rabbit = {
          jumps: true,
          __proto__: animal,
          walk() {
            return 'jump, jump';
          }
        }

        expect(rabbit.walk()).to.eql('jump, jump');
      });
    });

    describe('The value of "this"', () => {
      it('should affect on current object', () => {
        let animal = {
          walk() {
            if (!this.isSleeping) {
              alert(`I walk`);
            }
          },
          sleep() {
            this.isSleeping = true;
          }
        };

        let rabbit = {
          name: "White Rabbit",
          __proto__: animal
        };

        // modifies rabbit.isSleeping
        rabbit.sleep();

        expect(rabbit.isSleeping).to.be.true;
        expect(typeof animal.isSleeping).to.eql('undefined');
      });
    });
  });

  describe('7.4 F.prototype', () => {
    describe('The "prototype" property', () => {
      it('should use functions prototype property', () => {
        let animal = {
          eats: true
        }

        function Rabbit(name) {
          this.name = name;
        }

        Rabbit.prototype = animal;

        let rabbit = new Rabbit('jumpy');

        expect(rabbit.eats).to.be.true;
        expect(rabbit.__proto__ === animal).to.be.true;
      });
    });

    describe('Default F.prototype, constructor property', () => {
      it('should have one property which points to constructor', () => {
        function Rabbit() { }
        // Rabbit.prototype = { constructor: Rabbit }
        expect(Rabbit.prototype.constructor === Rabbit).to.be.true;
        let r = new Rabbit();
        expect(r.constructor === Rabbit).to.be.true;
      });

      it('should create new instance using constructor from prototype', () => {
        function Rabbit() { };

        let r = new Rabbit();
        let r2 = new r.constructor();

        expect(r2).to.be.instanceof(Rabbit);
      });

      it('should be possible to assign anything to prototype, thus changing constructor too', () => {
        function Rabbit() { };

        Rabbit.prototype = {
          constructor: Rabbit,
          jumps: true
        }

        expect(new Rabbit().jumps).to.be.true;
        expect(new Rabbit().constructor).to.eql(Rabbit);
      });
    });
  });

  describe('7.5 Native Prototypes', () => {
    describe('Object.prototype', () => {
      it('should behave...', () => {
        
      });
    });
  });
});