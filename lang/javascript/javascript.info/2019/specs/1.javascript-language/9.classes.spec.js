describe('9 Classes', () => {
  describe('9.1 Class patterns', () => {
    describe('Functional class pattern', () => {
      it('should make constructor function with private functions/data', () => {
        function User(name) {
          function formatName() {
            return `Hello, ${name}`;
          }

          this.sayHi = function () {
            return formatName();
          };
        }

        const u = new User('Peter');

        expect(u.sayHi()).toEqual('Hello, Peter');
        expect(function () {
          u.formatName();
        }).toThrow();
      });
    });

    describe('Factory class pattern', () => {
      it('should make constructor function with private functions/data', () => {
        function User(name) {
          function formatName() {
            return `Hello, ${name}`;
          }

          return {
            sayHi() {
              return formatName();
            }
          };
        }

        const u = User('Peter');

        expect(u.sayHi()).toEqual('Hello, Peter');
        expect(function () {
          u.formatName();
        }).toThrow();
      });
    });

    describe('Prototype-based class pattern', () => {
      it('should make constructor function with private functions/data', () => {
        function User(name) {
          this._name = name;
        }

        User.prototype._formatName = function () {
          return `Hello, ${this._name}`;
        };

        User.prototype.sayHi = function () {
          return this._formatName();
        };

        const u = new User('Peter');

        expect(u.sayHi()).toEqual('Hello, Peter');
        expect(u._formatName).toEqual(jasmine.any(Function));
      });
    });

    describe('Prototype-based inheritance class pattern', () => {
      it('should make constructor function with private functions/data', () => {
        function Mammal(name) {
          this.name = name;
        }

        User.prototype.eat = function () {
          return `${this.name} eats`;
        };

        function User(name) {
          this.name = name;
        }

        User.prototype.talk = function () {
          return `${this.name} talks`;
        };

        User.prototype.__proto__ = Mammal.prototype;

        const u = new User('Peter');

        expect(u.talk()).toEqual('Peter talks');
        expect(u.eat()).toEqual('Peter eats');
      });
    });
  });

  describe('9.2 Classes', () => {
    describe('The "class" syntax', () => {
      it('should make traditional approach', () => {
        function User(name) {
          this.name = name;
        }

        User.prototype.sayHi = function () {
          return `hi, ${this.name}`;
        };

        const user = new User('peter');

        expect(user.sayHi()).toEqual('hi, peter');
      });

      it('should define class using "class" syntax', () => {
        class User {
          constructor(name) {
            this.name = name;
          }

          sayHi() {
            return `hi, ${this.name}`;
          }
        }

        const user = new User('peter');

        expect(user.sayHi()).toEqual('hi, peter');
      });

      it('should be a function', () => {
        class User {
          constructor(name) {
            this.name = name;
          }

          sayHi() {
            return `hi, ${this.name}`;
          }
        }

        expect(User).toEqual(jasmine.any(Function));
        expect(User.prototype.constructor).toBe(User);
        expect(User.prototype.sayHi).toEqual(jasmine.any(Function));
      });

      it('should create class dynamically', () => {
        function makeClass(phrase) {
          return class {
            sayHi() {
              return `hi, ${phrase}`;
            }
          };
        }

        const Clazz = new makeClass('peter');
        const cl = new Clazz();

        expect(cl.sayHi()).toEqual('hi, peter');
      });
    });

    describe('Differences between classes and functions', () => {
      it('should not use class constructor without "new"', () => {
        class User { }
        expect(function () {
          User();
        }).toThrowError(`Class constructor User cannot be invoked without 'new'`);
      });

      it('should have all methods non enumerable', () => {
        class User {
          constructor(name) {
            this.name = name;
          }

          sayHi() {
            return `hi, ${this.name}`;
          }
        }

        const u = new User('peter');

        expect(Object.keys(u)).toEqual(['name']);
      });
    });

    describe('Getters/Setters, other shorthands', () => {
      it('should define get and set property', () => {
        class User {
          constructor(name) {
            this._name = name;
          }

          get name() {
            return this._name + ' [getter]';
          }

          set name(value) {
            this._name = value + ' [setter]';
          }
        }

        const u = new User('peter');

        expect(u.name).toEqual('peter [getter]');
        u.name = 'andrew';
        expect(u.name).toEqual('andrew [setter] [getter]');
      });

      it('should use computed properties', () => {
        function name() {
          return 'greet';
        }

        class User {
          [name()]() {
            return 'hello';
          }
        }

        const u = new User();

        expect(u.greet()).toEqual('hello');
      });
    });

    describe('Class properties', () => {
      it('should add class property', () => {
        class User {
          name = 'anonymous';

          sayHi() {
            return `hi, ${this.name}`;
          }
        }

        const u = new User();

        expect(u.name).toEqual('anonymous');
        expect(User.prototype.name).toBeUndefined();
        expect(u.sayHi()).toEqual('hi, anonymous');
      });
    });
  });

  describe('9.3 Class inheritance', () => {
    describe('extends, super keywords', () => {
      it('should inherit from another class', () => {
        class Animal {
          constructor(name) {
            this.speed = 0;
            this.name = name;
          }

          accelerateBy(speed) {
            this.speed += speed;
            return `${this.name} runs at ${this.speed}`;
          }

          stop() {
            this.speed = 0;
            return `${this.name} stopped`
          }
        }

        class Rabbit extends Animal {
          hide() {
            return `${this.name} hides`;
          }
        }

        const rabbit = new Rabbit('white rabbit');

        expect(Rabbit.prototype.__proto__).toBe(Animal.prototype);

        expect(rabbit.accelerateBy(5)).toEqual('white rabbit runs at 5');
        expect(rabbit.accelerateBy(2)).toEqual('white rabbit runs at 7');
        expect(rabbit.stop()).toEqual('white rabbit stopped');
        expect(rabbit.hide()).toEqual('white rabbit hides');
      });

      it('should make dynamic extends', () => {
        function fn() {
          return class {
            hi() { return 'hello' }
          }
        }

        class User extends fn() { }

        expect(new User().hi()).toEqual('hello');
      });

      it('should override method', () => {
        class User {
          constructor(name) {
            this.name = name;
          }

          greet() {
            return `hi, ${this.name}`;
          }
        }

        class Admin extends User {
          constructor(name, rights) {
            super(name);
            this.rights = rights;
          }

          greet() {
            return `${super.greet()} [${this.rights}]`;
          }
        }

        const admin = new Admin('peter', 'all');

        expect(admin.greet()).toEqual('hi, peter [all]')
      });

      it('should not arrow functions have own super, they get it from parent context', () => { });
    });

    describe('Super: internals, [[HomeObject]]', () => {
      it('should read the section', () => { });
    });
  });

  describe('9.4 Static properties and methods', () => {
    it('should recreate behaviour in functions', () => {
      function User() { }

      User.mtd = function () {
        return (this === User)
      }

      expect(User.mtd()).toBe(true);
    });

    it('should define static method', () => {
      class User {
        static mtd() {
          return (this === User)
        }
      }

      expect(User.mtd()).toBe(true);
    });

    it('should make static factory method', () => {
      class User {
        constructor(name) {
          this.name = name;
        }

        static create(name) {
          return new this(name);
        }
      }

      const u = User.create('peter');

      expect(u).toEqual(jasmine.any(User));
      expect(u.name).toEqual('peter');
    });

    it('should use static properties', () => {
      class User {
        static role = 'admin';

        static greet() {
          return 'hi';
        }
      }

      class Admin extends User {

      }

      expect(User.role).toEqual('admin');
      expect(Admin.greet()).toEqual('hi');
    });
  });

  describe('9.5 Private and protected properties and methods', () => {
    describe('No public/private/protected keywords, conventions rather', () => {
      it('should start with coffee machine example', () => {
        class CoffeeMachine {
          waterAmount = 0; // public

          constructor(power) {
            this.power = power; // public
          }
        }

        const machine = new CoffeeMachine(100);
        machine.waterAmount = 200;
      });

      it('should protect a property from external world', () => {
        class CoffeeMachine {
          _waterAmount = 0; // public

          constructor(power) {
            this.power = power; // public
          }

          get waterAmount() {
            return this._waterAmount;
          }

          set waterAmount(value) {
            if (value < 0) throw new Error('Negative water');
            this._waterAmount = value;
          }
        }

        const c = new CoffeeMachine(100);
        c.waterAmount = 100;

        expect(c.waterAmount).toEqual(100);
        expect(c._waterAmount).toEqual(100);

        expect(function () {
          c.waterAmount = -2;
        }).toThrowError('Negative water');
      });

      it('should make power propert read only', () => {
        class CoffeeMachine {
          _waterAmount = 0; // public

          constructor(power) {
            this._power = power; // public
          }

          get power() {
            return this._power;
          }

          get waterAmount() {
            return this._waterAmount;
          }

          set waterAmount(value) {
            if (value < 0) throw new Error('Negative water');
            this._waterAmount = value;
          }
        }

        const c = new CoffeeMachine(100);
        c.power = 5; // no effect
        expect(c.power).toEqual(100); // getter gets 'private' property
      });
    });

    describe('# syntax for private properties', () => {
      it('should prefix property/method with # to make it private, accessible only inside class', () => {
        // class User {
        //   #role = 'none'
        // }

        // const u = new User();
        // u.role = 5; // error, private field, not visible here
      });
    });
  });

  describe('9.6 Extending built-in classes', () => {
    it('should build power array', () => {
      class PowerArray extends Array {
        isEmpty() {
          return this.length === 0;
        }

        // makes built in methods to use Array constructor, not PowerArray, so isEmpty will not work on results from those built-ins
        // static get [Symbol.species]() {
        //   return Array;
        // }
      }

      const arr = new PowerArray(1, 2, 3);
      const filtered = arr.filter(it => it >= 2);

      expect(arr).toEqual([1, 2, 3]);
      expect(arr.isEmpty()).toBe(false);
      expect(filtered).toEqual([2, 3]);
      expect(filtered.isEmpty()).toBe(false);
    });
  });

  describe('9.7 Class checking: "instanceof"', () => {
    describe('instanceof', () => {
      it('should return true if object belongs to the class or inheriting from it', () => {
        class Rabbit { }
        const r = new Rabbit();

        expect(r instanceof Rabbit).toBe(true);
        expect(r instanceof Object).toBe(true);
        expect([] instanceof Array).toBe(true);
        expect([] instanceof Object).toBe(true);
      });

      it('should fine tune instanceof with Symbol.hasInstance(obj)', () => {
        class Animal {
          static [Symbol.hasInstance](obj) {
            if (obj.canEat) return true;
          }
        }

        const o = { canEat: true };
        const a = new Animal();

        expect(a instanceof Animal).toBe(false);
        expect(o instanceof Animal).toBe(true);
      });
    });

    describe('Symbol.toStringTag', () => {
      it('should change default to string', () => {
        let user = {
          [Symbol.toStringTag]: "User"
        };

        expect(user.toString()).toEqual('[object User]')
      });
    });
  });

  describe('9.8 Mixins', () => {
    describe('Idea of mixins', () => {
      it('should make simple example', () => {

        const baseMixin = {
          init() {
            return `initializing: ${this.name}`;
          }
        }

        const sayHiMixin = {
          sayHi() {
            return `${super.init()}, hello, ${this.name}`;
          },

          sayBye() {
            return `bye, ${this.name}`;
          }
        }

        Object.setPrototypeOf(sayHiMixin, baseMixin);

        class User {
          constructor(name) {
            this.name = name;
          }
        }

        Object.assign(User.prototype, sayHiMixin);
        const u = new User('peter');

        expect(u.sayHi()).toEqual('initializing: peter, hello, peter');
        expect(u.sayBye()).toEqual('bye, peter');
      });
    });

    describe('Event Mixin', () => {
      it('should make simple implementation', (done) => {
        const eventMixin = {
          on(evtName, handler) {
            if (!this._handlers) {
              this._handlers = {};
            }
  
            if (!this._handlers[evtName]) {
              this._handlers[evtName] = [];
            }
  
            this._handlers[evtName].push(handler);
          },
  
          off(evtName, handler) {
            const handlers = this._handlers && this._handlers[evtName];
            if (!handlers) return;
  
            for(let i = 0; i < handlers.length; i++) {
              if(handlers[i] === handler) {
                handlers.splice(i--, 1);
              }
            }
          },
  
          trigger(evtName, ...args) {
            if(!this._handlers || !this._handlers[evtName]) {
              return;
            }
  
            this._handlers[evtName].forEach(handler => handler.apply(this, args));
          }
        }
  
        class User {
          choose(val) {
            this.trigger('select', val);
          }
        }
  
        Object.assign(User.prototype, eventMixin);
  
        const u = new User();
        
        u.on('select', function(v) {
          expect(v).toEqual(123);
          expect(this).toBe(u);
          done();
        });
  
        u.choose(123);
      });
    });
  });
});