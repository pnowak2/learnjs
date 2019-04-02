describe('4. Objects, the basics', () => {
  describe('4.1 Objects', () => {
    it('should use two syntaxes', () => {
      let o = {};
      let b = new Object();

      expect(o).toEqual(jasmine.any(Object));
      expect(o).toEqual(jasmine.any(Object));
    });

    it('should put some props inside', () => {
      let o = {
        age: 38
      };

      expect(o.age).toEqual(38);
    });

    it('should remove some props inside', () => {
      let o = {
        age: 38
      };

      expect(o.age).toEqual(38);

      delete o.age;

      expect(o.age).toBeUndefined();
    });

    it('should use multiword keys', () => {
      let o = {
        'hello world': 38
      };

      expect(o['hello world']).toEqual(38);
    });

    it('should use computed properties', () => {
      const key = 'hello world';
      let o = {
        [key]: 38
      };

      expect(o[key]).toEqual(38);
    });

    it('should use property value shorthand', () => {
      const key = 'hej', value = 'jo';
      const o = { key, value };

      expect(o.key).toEqual('hej');
      expect(o.value).toEqual('jo');
    });

    it('should make existency check', () => {
      const o = {
        name: 'peter',
        age: 38
      };

      expect('name' in o).toBe(true);
      expect('gender' in o).toBe(false);
    });

    it('should use for...in loop', () => {
      const o = {
        name: 'peter',
        age: 38
      };

      let props = '';
      let vals = '';
      for (let key in o) {
        props += key;
        vals += o[key];
      }

      expect(props).toEqual('nameage');
      expect(vals).toEqual('peter38');
    });

    it('should compare with ==', () => {
      let a = {};
      let b = {};

      expect(a == b).toBe(false);
      expect(a === b).toBe(false);
    });

    it('should compare with ===', () => {
      let a = {};
      let b = a;

      expect(a === b).toBe(true);
      expect(a == b).toBe(true);
    });

    it('should clone using manual method', () => {
      function clone(obj) {
        let result = {};

        for (let key in obj) {
          result[key] = obj[key];
        }

        return result;
      }

      const o = {
        name: 'peter',
        age: 38
      };

      const copied = clone(o);

      expect(copied.name).toEqual('peter');
      expect(copied.age).toEqual(38);
    });

    it('should clone using Object.assign', () => {
      const o = {
        name: 'peter',
        age: 38
      };

      const copied = {};

      Object.assign(copied, o);

      o.name = 'another';

      expect(copied.name).toEqual('peter');
      expect(copied.age).toEqual(38);
    });

    it('should clone using destructuring', () => {
      const o = {
        name: 'peter',
        age: 38
      };

      const copied = { ...o };

      o.name = 'another';

      expect(copied.name).toEqual('peter');
      expect(copied.age).toEqual(38);
    });
  });

  describe('4.2 Garbage collection', () => {
    it('should read the section', () => { });
  });

  describe('4.3 Symbol type', () => {
    it('should define symbol', () => {
      let s = Symbol();

      expect(s).toEqual(jasmine.any(Symbol));
    });

    it('should define symbol with description (for debug etc)', () => {
      let s = Symbol('mine');

      expect(s).toEqual(jasmine.any(Symbol));
      expect(s.description).toEqual('mine');
      expect(s.toString()).toEqual('Symbol(mine)');
    });

    it('should be unique, always', () => {
      let s1 = Symbol('id');
      let s2 = Symbol('id');

      expect(s1 != s2).toBe(true);
      expect(s1 == s2).toBe(false);
    });

    it('should create global symbol with Symbol.for(string)', () => {
      const s1 = Symbol.for('id');
      const s2 = Symbol.for('id');

      expect(s1 === s2).toBe(true);
    });

    it('should create hidden properties', () => {
      let sName = Symbol('name');

      const o = {
        [sName]: 'hidden'
      };

      expect(o[sName]).toEqual('hidden');
      expect(o['name']).toBeUndefined();
    });

    it('should skip symbols in for...in', () => {
      const iden = Symbol('id');

      const o = {
        name: 'obj',
        [iden]: 'hash'
      };

      let result = '';

      for (k in o) {
        result += o[k];
      }

      expect(result).toEqual('obj');
    });

    it('should copy also symbols using Object.assign()', () => {
      const iden = Symbol('id');

      const o = {
        name: 'obj',
        [iden]: 'hash'
      };

      const copy = Object.assign({}, o);

      expect(copy[iden]).toEqual('hash');
    });

    it('should get key for global symbol', () => {
      const s1 = Symbol.for('id');
      const s2 = Symbol('id');

      expect(Symbol.keyFor(s1)).toEqual('id');
      expect(Symbol.keyFor(s2)).toBeUndefined();
    });

  });

  describe('4.4 Object methods - this', () => {
    describe('Methods', () => {
      it('should add method old way', () => {
        let user = {
          name: 'Peter'
        };

        user.sayHi = function() {
          return `Hi, ${this.name}`;
        };

        expect(user.sayHi()).toEqual('Hi, Peter');
      });

      it('should use method shorthand', () => {
        let user = {
          name: 'Peter',
          sayHi() {
            return `Hi, ${this.name}`;
          }
        };

        expect(user.sayHi()).toEqual('Hi, Peter');
      });

      it('should this point to global object (window) in normal functions', () => {
        function sayHi() {
          return this;
        }

        expect(sayHi()).toBe(window);
      });

      it('should this point to undefined in strict mode', () => {
        function sayHi() {
          'use strict';
          return this;
        }

        expect(sayHi()).toBeUndefined();
      });

      it('should provide alternate this', () => {
        function sayHi() {
          return `Hi, ${this.name}`;
        }

        expect(sayHi.call({ name: 'Peter'})).toEqual('Hi, Peter');
      });

      describe('Arrow functions', () => {
        it('should not have own this, takes from outer normal function', () => {
          let user = {
            name: 'Peter',
            sayHi() {
              const calculate = () => this.name;

              return calculate();
            }
          };

          expect(user.sayHi()).toEqual('Peter');
        });

      });
    });
  });

  describe('4.5 Object to primitive conversion', () => {
    it('should use Symbol.toPrimitive', () => {
      const o = {
        name: 'Peter',
        age: 38,
        [Symbol.toPrimitive]: function (hint) {
          if (hint === 'number') {
            return this.age;
          }
          if (hint === 'string') {
            return `${this.name}, ${this.age}`;
          }
        }
      };

      const s = String(o);
      const n = Number(o);
      const b = Boolean(o);
      expect(s).toEqual('Peter, 38');
      expect(n).toEqual(38);
      expect(o - o).toEqual(0);
      expect(b).toEqual(true);
    });

    it('should use toString/valueOf if no Symbol.toPrimitive present', () => {
      const o = {
        name: 'Peter',
        age: 38,
        toString() {
          return `${this.name}, ${this.age}`;
        },
        valueOf() {
          return this.age;
        }
      };

      expect(String(o)).toEqual('Peter, 38');
      expect(Number(o)).toEqual(38);
    });
  });

  describe('4.6 Constructor, operator new', () => {
    describe('Constructor function', () => {
      it('should start with capital letter', () => {
        function User(name) {
          this.name = name;
        }

        const user = new User('peter');

        expect(user).toEqual(jasmine.any(User));
        expect(user.name).toEqual('peter');
      });

      it('should create new empty object called this, can be modified in constructor function, then its returned', () => { });
    });

    describe('Dual-syntax constructor: new.target', () => {
      it('should check inside constructor if called with new', () => {
        function Person(name) {
          if(!new.target) {
            return new Person(name);
          }

          this.name = name;
        }

        const p1 = Person('john'); // no new keyword
        const p2 = new Person('peter');

        expect(p1.name).toEqual('john');
        expect(p2.name).toEqual('peter');
      });
    });

    describe('Returning from constructors', () => {
      it('should return same thing which constructor returns, if not, this is returned', () => {
        function User(name) {
          this.name = name;

          return () => {
            return this.name;
          };
        }

        const u = new User('peter');

        expect(u()).toEqual('peter');
      });

      it('should return this if nothing/primitive is returned', () => {
        function User(name) {
          this.name = name;

          return;
        }

        const u = new User('peter');

        expect(u.name).toEqual('peter');
      });
    });

    describe('Methods in constructor', () => {
      it('should add methods inside', () => {
        function User(name) {
          this.name = name;

          this.sayHi = function() {
            return `Hi, ${this.name}`;
          };
        }

        const u = new User('peter');

        expect(u.sayHi()).toEqual('Hi, peter');
      });
    });
  });
});
