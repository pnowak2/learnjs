var expect = require('chai').expect;
var sinon = require('sinon');

describe('4. Objects the Basics', () => {
  describe('4.1 Objects', function () {
    it('should read the section', function () { });

    describe('Creation of Object', () => {
      it('should declare as new Object()', () => {
        let user = new Object();

        expect(user).to.be.an('object');
      });

      it('should declare as literal syntax', () => {
        let user = {};

        expect(user).to.be.an('object');
      });
    });

    describe('Literals and Properties', () => {
      it('should put some props to literal object', () => {
        let user = {
          name: 'Peter',
          age: 38
        };

        expect(user.name).to.eql('Peter');
        expect(user.age).to.eql(38);
      });

      it('should put new props to literal object', () => {
        let user = {
          name: 'Peter',
          age: 38
        };

        user.isAdmin = true;

        expect(user.isAdmin).to.be.true;
      });

      it('should delete props from literal object', () => {
        let user = {
          name: 'Peter',
          age: 38
        };

        expect(user.name).to.eql('Peter');

        delete user.name;

        expect(user.name).to.be.undefined;
      });

      it('should use string multi word property names with square brackets', () => {
        let user = {
          name: 'Peter',
          age: 38,
          'likes birds': true
        };

        expect(user['likes birds']).to.be.true;
      });

      it('should use computed properties', () => {
        const prop = 'hello world';

        let user = {
          [prop]: 22
        }

        expect(user[prop]).to.eql(22);
      });

      it('should use property value shorthand', () => {
        const name = 'peter', age = 38;
        var person = {
          name, age
        };

        expect(person.name).to.eql('peter');
        expect(person.age).to.eql(38);
      });
    });

    describe('Existence check', () => {
      it('should check if property exists with undefined', () => {
        let person = {
          name: 'peter'
        }

        expect(person.age).to.eql(undefined);
      });

      it('should check if property exists with "key in object" syntax', () => {
        let person = {
          name: 'peter'
        }

        expect('name' in person).to.be.true;
        expect('age' in person).to.be.false;
      });
    });

    describe('The "for ... in" loop', () => {
      it('should iterate over object properties', () => {
        let user = {
          name: "John",
          age: 30,
          isAdmin: true
        };

        let result = '';
        for (let key in user) {
          result += `${key}|`;
        }

        expect(result).to.eql('name|age|isAdmin|')
      });
    });

    describe('Copying by reference', () => {
      it('should copy by reference', () => {
        let user = { name: 'peter' };
        let admin = user;

        expect(admin.name).to.eql('peter');

        admin.name = 'admin';

        expect(admin.name).to.eql('admin');
      });
    });

    describe('Comparison By Reference', () => {
      it('should compare by reference', () => {
        let a = {};
        let b = {};
        let c = b;

        expect(a == b).to.eql(false);
        expect(c == b).to.eql(true);
      });
    });

    describe('Const Object', () => {
      it('should be changed', () => {
        const person = {
          name: 'peter'
        };

        person.name = 'other';

        expect(person.name).to.eql('other');
      });
    });

    describe('Cloning and Merging, Object.assign()', () => {
      it('should make copy of object by hand', () => {
        let user = {
          name: 'peter',
          age: 38
        }

        let clone = {};

        for (let key in user) {
          clone[key] = user[key];
        }

        expect(clone.name).to.eql('peter');
        expect(clone.age).to.eql(38);
        expect(user).not.to.equal(clone);
        expect(user == clone).to.be.false;

        clone.name = 'other';

        expect(user.name).to.eql('peter');
        expect(clone.name).to.eql('other');
      });

      it('should make copy of object using Object.assign() (shallow copy only)', () => {
        let user = {
          name: 'peter',
          age: 38
        }

        let clone = Object.assign({}, user);

        expect(clone.name).to.eql('peter');
        expect(clone.age).to.eql(38);
        expect(user).not.to.equal(clone);
        expect(user == clone).to.be.false;

        clone.name = 'other';

        expect(user.name).to.eql('peter');
        expect(clone.name).to.eql('other');
      });

      it('should use Object.assign() to copy properties to object', () => {
        let user = { name: 'peter' };

        let perm1 = { canView: true };
        let perm2 = { canEdit: true };

        let target = Object.assign(user, perm1, perm2);

        expect(target === user).to.be.true;
        expect(user.canView).to.be.true;
        expect(user.canEdit).to.be.true;
      });
    });
  });

  describe('4.2 Garbage Collection', function () {
    it('should read the section', function () { });
  });

  describe('4.3 Symbol Type', function () {
    it('should read the section', function () { });

    describe('Symbols', () => {
      it('should define symbol', () => {
        let id = Symbol();

        expect(id).to.be.a('Symbol');
      });

      it('should define symbol with name', () => {
        let id = Symbol('id');

        expect(id).to.be.a('Symbol');
      });

      it('should be always unique', () => {
        let id1 = Symbol('id');
        let id2 = Symbol('id');

        expect(id1 == id2).to.be.false;
      });

      it('should create hidden properties', () => {
        let user = { name: 'peter' };
        let id = Symbol('id');

        user[id] = 'secret';

        expect(user[id]).to.eql('secret');
        expect(user['id']).to.be.undefined;
      });

      it('should use symbols in object literal', () => {
        const id = Symbol('id');

        let user = {
          name: 'peter',
          [id]: 'secret'
        }

        expect(user[id]).to.eql('secret');
      });

      it('should not list symbols in for in loop', () => {
        const id = Symbol('id');

        let user = {
          name: 'peter',
          [id]: 'secret'
        }

        let result = '';
        for (let key in user) {
          result += `${key}|`;
        }

        expect(result).to.eql('name|');
      });

      it('should use global symbols registry', () => {
        let id = Symbol.for('id'); // Symbol('id) is not global, not in registry, there's a difference
        let idAgain = Symbol.for('id');

        expect(id).to.be.a('Symbol');
        expect(id === idAgain).to.be.true;
      });

      it('should use .keyFor to retrieve key for given symbol', () => {
        let id = Symbol.for('myid');

        expect(Symbol.keyFor(id)).to.eql('myid');
      });

      it('should use System Symbols', () => {
        // Symbol.hasInstance
        // Symbol.isConcatSpreadable
        // Symbol.iterator
        // Symbol.toPrimitive
        // …and so on.

        let person = {
          name: 'peter',
          [Symbol.toPrimitive]: function () {
            return this.name.length;
          }
        }

        expect(person - 2).to.eql(3);
      });
    });
  });

  describe('4.4 Object Methods, this', function () {
    it('should read the section', function () { });
    describe('Method examples', () => {
      it('should add method to object', () => {
        let user = {
          name: 'John'
        }

        user.sayHi = function () {
          return 'hello';
        }

        expect(user.sayHi()).to.eql('hello');
      });

      it('should use method shorthand', () => {
        let user = {
          name: 'john',
          sayHi() {
            return 'hello';
          }
        }

        expect(user.sayHi()).to.eql('hello');
      });
    });

    describe('This in methods', () => {
      it('should access object properties with this', () => {
        let user = {
          name: 'john',
          sayHi() {
            return `hello, ${this.name}`;
          }
        }

        expect(user.sayHi()).to.eql('hello, john');
      });

      it('should swap functions using this', () => {
        let user = { name: "John" };
        let admin = { name: "Admin" };

        function sayHi() {
          return this.name;
        }

        // use the same functions in two objects
        user.f = sayHi;
        admin.f = sayHi;

        user.f(); // John  (this == user)
        admin.f(); // Admin  (this == admin)
      });

      it('should have consequences if using function without this', () => {
        function sayHi() {
          return this.name;
        }

        expect(function () {
          sayHi();
        }).to.throw();
      });
    });

    describe('Arrow functions have no this', () => {
      it('should take this from outer context instead', () => {
        let user = {
          name: 'peter',
          greet() {
            let arrow = () => {
              return this.name;
            }

            return arrow();
          }
        }

        expect(user.greet()).to.eql('peter');
      });
    });
  });

  describe('4.5 Object To Primitive Conversion', function () {
    it('should read the section', function () { });

    describe('Symbol.toPrimitive', () => {
      let user = {
        name: 'peter',
        money: 5,
        [Symbol.toPrimitive](hint) {
          return (hint === 'string') ? `name: ${this.name}` : this.money
        }
      }

      it('should call hint with string', () => {
        let result = String(user);
        expect(result).to.eql('name: peter');
      });

      it('should call hint with number', () => {
        let result = +user;
        expect(result).to.eql(5);
      });

      it('should call hint with default', () => {
        let result = user + 'test';
        expect(result).to.eql('5test');
      });
    });

    describe('toString / valueOf', () => {
      let user = {
        name: 'peter',
        money: 1000,

        // for hint="string"
        toString() {
          return `name: ${this.name}`;
        },

        // for hint="number" or "default"
        valueOf() {
          return this.money;
        }
      };

      it('should use old toString to convert to string if no Symbol.toPromitive defined', () => {
        let result = String(user);
        expect(result).to.eql('name: peter');
      });

      it('should call hint with number', () => {
        let result = +user;
        expect(result).to.eql(1000);
      });

      it('should call hint with default', () => {
        let result = user + 'test';
        expect(result).to.eql('1000test');
      });
    });
  });

  describe('4.Constructor, operator new', function () {
    it('should read the section', function () { });

    describe('Constructor Function', () => {
      it('should declare function used with new', () => {
        function Person(name) {
          // this = {};
          this.name = name;

          // return this;
        }

        const p = new Person('peter');

        expect(p.name).to.eql('peter');
      });
    });

    describe('new.target', () => {
      it('should check how function was called', () => {
         function Person(name) {
           if(!new.target) {
             throw new Error('function not called with new');
           }

           this.name = name;
         }

         expect(function() {
           Person('peter');
         }).to.throw('function not called with new');
      });
    });

    describe('Return From Constructors', () => {
      it('should return object with returned from constructor (primitives are ignored)', () => {
        function Person(name) {
          this.name = name;

          return {
            age: 'buba'
          }
        }

        let p = new Person();

        expect(p.age).to.eql('buba');
        expect(p.name).to.be.undefined;
      });
    });
  });
});

