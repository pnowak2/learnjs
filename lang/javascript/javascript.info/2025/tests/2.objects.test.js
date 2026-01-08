import { describe, it, expect } from 'vitest';
import { add } from '../src/2.fundamentals/add';

describe('Objects, the basics', () => {
  describe('Objects', () => {
    it('should declare variables', () => {
      let user = new Object()
      let user2 = {}

      expect(user).toBeInstanceOf(Object);
      expect(user2).toBeInstanceOf(Object);
    });

    it('should check literals and props', () => {
      let user = {
        name: 'piotr',
        age: 45
      };

      expect(user.name).toEqual('piotr');
      expect(user['name']).toEqual('piotr');
      expect(user.age).toBe(45);
      expect(user['age']).toBe(45);

      const key = 'name';

      expect(user[key]).toEqual('piotr');
    });

    it('should delete property', () => {
      let user = {
        name: 'piotr',
        age: 45
      };

      expect(user.name).toBeDefined();

      delete user.name;

      expect(user.name).toBeUndefined();
    });

    it('should check computed properties', () => {
      let fruit = 'orange';

      let obj = {
        [fruit]: 'sweet'
      };

      expect(obj.orange).toEqual('sweet');

      let obj2 = {
        ...obj,
        [fruit + 'frt']: 'good'
      }

      expect(obj2.orangefrt).toEqual('good');
    });

    it('should use property value shorthand', () => {
      let name = 'piotr';
      let age = 45;

      let obj = { name, age }

      expect(obj.name).toEqual('piotr');
      expect(obj.age).toBe(45);
    });

    it('should check for property existence', () => {
      let user = {
        name: 'piotr',
        age: 45
      };

      expect('name' in user).toBeTruthy();
      expect('last' in user).toBeFalsy();
    });

    it('should iterate wiht for in loop', () => {
      let user = {
        name: 'piotr',
        age: 45
      };

      let keys = []
      for (let key in user) {
        keys.push(key);
      }

      expect(keys).toEqual(['name', 'age']);
    })
  });

  describe('Object references and copying', () => {
    it('should use reference', () => {
      let user = { name: 'piotr' };
      let admin = user;

      expect(user).toBe(admin);
      expect(user) == admin;
    });

    it('should do a clone', () => {
      let user = { name: 'piotr' };
      let clone = {};

      for (let key in user) {
        clone[key] = user[key]
      }

      expect(clone).not.toBe(user);
      expect(clone).toEqual(user);
    });

    it('should clonse with Object.assign()', () => {
      let user = { name: 'piotr' };
      let other = { hasPerm: true };

      let clone = {}
      Object.assign(clone, user, other)

      expect(clone.name).toEqual('piotr');
      expect(clone.hasPerm).toEqual(true);
    });

    it('should structuredClone(object) for deep clone', () => {
      let user = {
        name: 'piotr',
        sizes: {
          height: 194,
          weight: 90
        }
      };

      let clone = structuredClone(user);

      expect(user).toEqual(clone);
      expect(user).not.toBe(clone);
    })
  });

  describe('Object methods and this', () => {
    it('should use object method', () => {
      let user = {
        name: 'piotr',
        age: 45,
        // method shorthand
        sayHi() {
          return 'hi!';
        },
        // regular method param
        sayHello: function () {
          return 'hello!';
        }
      };

      expect(user.sayHi()).toEqual('hi!');
      expect(user.sayHello()).toEqual('hello!');
    });

    it('should use this in methods', () => {
      let user = {
        name: 'piotr',
        age: 45,
        // method shorthand
        sayHi() {
          return `hi ${this.name}!`;
        }
      };

      expect(user.sayHi()).toEqual('hi piotr!');
    });

    it('should use arrow methods', () => {
      let user = {
        name: 'piotr',
        age: 45,
        sayHi() {
          let arrow = () => { return `hi ${this.name}` } // this is inherited from parent context
          return arrow();
        }
      };

      expect(user.sayHi()).toEqual('hi piotr');

    })
  });

  describe('Constructor, operator "new"', () => {
    it('should should create new object from function', () => {
      function User(name) {
        this.name = name;
        this.isAdmin = false;
      }

      let user = new User("Piotr");

      expect(user.name).toEqual('Piotr');
    });

    it('should check if function is called with new (target)', () => {
      function User(name) {
        if (!new.target) {
          return new User(name);
        }

        this.name = name;
        this.isAdmin = false;
      }

      let user = new User("Piotr");
      let user2 = User('Adam');

      expect(user.name).toEqual('Piotr');
      expect(user2.name).toEqual('Adam');
    });

    it('should add methods to costructor', () => {
      function User(name) {
        this.name = name;
        this.isAdmin = false;

        this.greet = function () {
          return 'hello ' + this.name;
        }
      }

      let user = new User("Piotr");
      expect(user.greet()).toEqual('hello Piotr');

    })
  });

  describe('Optional chaining "?"', () => {
    it('should avoid making if checks', () => {
      let user = {};

      expect(user?.address?.street).toBeUndefined();
    });

    it('should call functions which dont exist', () => {
      let user = {};

      expect(user.hello?.()).toBeUndefined();
    });
  });

  describe('Symbol type', () => {
    it('should represent unique identifier', () => {
      let id = Symbol('im id');

      expect(id.description).toEqual('im id');
    });

    it('should add hidden properties to an object', () => {
      let id = Symbol('id');

      let user = {
        name: 'Piotr',
        [id]: 1
      }

      expect(user[id]).toEqual(1);
    });

    it('should use Global Symbols', () => {
      let gbl = Symbol.for('id');
      let gbl2 = Symbol.for('id');

      expect(gbl).toBe(gbl2);
      expect(Symbol.keyFor(gbl)).toEqual('id');
      expect(Symbol.keyFor(gbl2)).toEqual('id');
    })
  });

  describe('Object to primitive conversion', () => {
    it('should convert object to primitive', () => {
      let user = {
        name: 'piotr',
        age: 45,
        [Symbol.toPrimitive](hint) {
          if(hint == 'string') {
            return this.name;
          } else if (hint == 'number'){
            return this.age
          }
        }
      };

      expect(+user).toEqual(45)
      expect(String(user)).toEqual('piotr')
    })
  })
});