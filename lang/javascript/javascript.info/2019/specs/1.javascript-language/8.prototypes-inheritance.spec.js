describe('8 Prototypes, Inheritance', () => {
  describe('8.1 Prototypal inheritance', () => {
    it('should object have a hidden __proto__ property', () => {
      const o = {
        name: 'peter'
      };

      expect(o.__proto__).toEqual(jasmine.any(Object));
    });

    it('should set __proto__ to make simple inheritance', () => {
      const animal = {
        eats: true,
        walk() {
          return 'walking..';
        },
        sleep() {
          this.isSleeping = true;
        }
      };

      const rabbit = {
        jumps: true,
        __proto__: animal,
        walk() {
          return 'bounce bounce';
        }
      };

      const longEar = {
        earLength: 10,
        walk() {
          return 'boing boing';
        },
        __proto__: rabbit
      };

      rabbit.sleep();

      expect(animal.eats).toBe(true);
      expect(animal.walk()).toEqual('walking..');
      expect(animal.isSleeping).toBeUndefined();

      expect(rabbit.jumps).toBe(true);
      expect(rabbit.eats).toBe(true);
      expect(rabbit.earLength).toBeUndefined();
      expect(rabbit.walk()).toEqual('bounce bounce');
      expect(rabbit.isSleeping).toBe(true);

      expect(longEar.jumps).toBe(true);
      expect(longEar.eats).toBe(true);
      expect(longEar.earLength).toEqual(10);
      expect(longEar.walk()).toEqual('boing boing');
    });
  });

  describe('8.2 F.prototype', () => {
    it('should be an object for each Function', () => {
      let animal = {
        eats: true
      };

      function Rabbit(name) {
        this.name = name;
      }

      Rabbit.prototype = animal;

      const rabbit = new Rabbit('roger');

      expect(rabbit.name).toEqual('roger');
      expect(rabbit.eats).toBe(true);
    });

    it('should have default prototype property which has constructor function', () => {
      function Rabbit() { }
      expect(Rabbit.prototype.constructor).toBe(Rabbit);

      const rabbit = new Rabbit();

      expect(rabbit.constructor).toBe(Rabbit);
    });

    it('should create another object referencing objects constructor', () => {
      function Rabbit() { }
      const rabbit = new Rabbit();

      const rabbit2 = new rabbit.constructor();

      expect(rabbit2).toEqual(jasmine.any(Rabbit));
    });

    it('should extend prototype with props and recreating constructor', () => {
      function Rabbit() { }
      Rabbit.prototype = {
        jumps: true,
        constructor: Rabbit
      };

      const rabbit = new Rabbit();

      const rabbit2 = new rabbit.constructor();

      expect(rabbit2.jumps).toBe(true);
      expect(rabbit2).toEqual(jasmine.any(Rabbit));
    });
  });

  describe('8.3 Native Prototypes', () => {
    describe('Object.prototype', () => {
      it('should have access to all Object api from any object', () => {
        const o = new Object();
        // Object.prototype api accessible to o

        expect(o.toString).toEqual(jasmine.any(Function));
        expect(o.__proto__).toBe(Object.prototype);
      });

      it('should not be prototype over object', () => {
        const o = new Object();
        expect(o.__proto__.__proto__).toBeNull();
        expect(Object.prototype.__proto__).toBeNull();
      });
    });

    describe('Other built-in prototypes', () => {
      it('should have array props', () => {
        expect([].__proto__).toBe(Array.prototype);
        expect([].__proto__.__proto__).toBe(Object.prototype);
        expect([].__proto__.__proto__.__proto__).toBeNull();
        expect([].__proto__.join).toEqual(jasmine.any(Function));
      });

      it('should have Function props', () => {
        expect(function () { }.__proto__).toBe(Function.prototype);
        expect(function () { }.__proto__.__proto__).toBe(Object.prototype);
        expect(function () { }.__proto__.__proto__.__proto__).toBeNull();
      });

      it('should polyfill native object', () => {
        if (!String.prototype.repeatTwo) {
          String.prototype.repeatN = function (n) {
            return [...Array(n).values()].map(i => this).join('');
          };
        }

        expect('test'.repeatN(3)).toEqual('testtesttest');
      });
    });
  });

  describe('8.4 Prototype methods', () => {
    describe('Object.create(proto, descriptor)', () => {
      it('should create obj without prototype', () => {
        const o = Object.create(null);
        expect(o.__proto__).toBeUndefined();
      });

      it('should create new object with given proto and descriptors', () => {
        const animal = {
          eats: true
        };

        const dog = Object.create(animal, {
          barks: {
            value: true
          },
          wags: {
            value: true
          }
        });

        expect(dog.eats).toBe(true);
        expect(dog.barks).toBe(true);
        expect(dog.wags).toBe(true);

        // same thing
        expect(dog.__proto__).toBe(animal);
        expect(Object.getPrototypeOf(dog)).toBe(animal);
      });
    });

    describe('Object.getPrototypeOf(obj)', () => {
      it('should retrieve prototype from object', () => {
        const animal = {
          eats: true
        };

        const dog = Object.create(animal);

        expect(Object.getPrototypeOf(dog)).toBe(animal);
        expect(Object.getPrototypeOf(animal)).toBe(Object.prototype);
      });
    });
  });

  describe('8.5 Getting all properties', () => {
    describe('Object.keys/values/entries', () => {
      it('should get all own, enumarable properties', () => {
        const parent = {
          walks: true
        };

        const o = {
          name: 'peter',
          age: 38,
          __proto__: parent
        };

        expect(Object.keys(o)).toEqual(['name', 'age']);
        expect(Object.values(o)).toEqual(['peter', 38]);
        expect(Object.entries(o)).toEqual([['name', 'peter'], ['age', 38]]);
      });
    });

    describe('Object.getOwnPropertySymbols(obj)', () => {
      it('should get own symbolic props', () => {
        const parent = {
          walks: true
        };

        const o = {
          name: 'peter',
          age: 38,
          [Symbol.iterator]: function () { },
          __proto__: parent
        };

        expect(Object.getOwnPropertySymbols(o)).toEqual([Symbol.iterator]);
      });
    });

    describe('Object.getOwnPropertyNames(obj)', () => {
      it('should get own props', () => {
        const parent = {
          walks: true
        };

        const o = {
          name: 'peter',
          age: 38, 
          [Symbol.iterator]: function () { },
          __proto__: parent
        };

        expect(Object.getOwnPropertyNames(o)).toEqual(['name', 'age']);
      });
    });

    describe('Reflect.ownKeys(obj)', () => {
      it('should get own props including symbols', () => {
        const parent = {
          walks: true
        };

        const o = {
          name: 'peter',
          age: 38, 
          [Symbol.iterator]: function () { },
          __proto__: parent
        };

        expect(Reflect.ownKeys(o)).toEqual(['name', 'age', Symbol.iterator]);
      });
    });

    describe('for..in loop with hasOwnProperty(prop)', () => {
      it('should get own and proto props', () => {
        const parent = {
          walks: true
        };

        const o = {
          name: 'peter',
          age: 38, 
          [Symbol.iterator]: function () { },
          __proto__: parent
        };

        const allProps = [];
        const ownProps = [];

        for(let p in o) {
          allProps.push(p);
          if(o.hasOwnProperty(p)) {
            ownProps.push(p);
          }
        }

        // note Object.prototype ones are not listed, because they're not enumareble
        expect(allProps).toEqual(['name', 'age', 'walks']);
        expect(ownProps).toEqual(['name', 'age']);
      });
    });
  });
});
