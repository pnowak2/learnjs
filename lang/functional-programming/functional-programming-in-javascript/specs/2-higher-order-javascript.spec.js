import { expect } from 'chai';
import sinon from 'sinon';

import R from 'ramda';
import Person from '../src/model/person';
import Student from '../src/model/student';
import Address from '../src/model/address';

describe('2 Higher Order Javascript', () => {
  describe('2.2 Functional vs Object Oriented Programming', function () {
    describe('2.2.1 Person & Student', () => {
      beforeEach(() => {
        this.curry = new Student('Haskell', 'Curry', '111-11-1111', 'Penn State');
        this.curry.address = new Address('US');

        this.turing = new Student('Alan', 'Turing', '222-22-2222', 'Princeton');
        this.turing.address = new Address('England');

        this.church = new Student('Alonzo', 'Church', '333-33-3333', 'Princeton');
        this.church.address = new Address('US');

        this.kleene = new Student('Stephen', 'Kleene', '444-44-4444', 'Princeton');
        this.kleene.address = new Address('US');
      });

      describe('Imperative way', () => {
        it('should use loops', () => {
          expect(this.church.studentsInSameCountryAndSchool([this.curry, this.turing, this.kleene])).to.eql([this.kleene]);
        });
      });

      describe('More functional way', () => {
        function selector(country, school) {
          return function (student) {
            return student.address.country === country && student.school === school;
          }
        }

        function findStudentsBy(friends, sel) {
          return friends.filter(sel);
        }

        it('.selector()', () => {
          var mySelector = selector('England', 'Princeton');

          expect(mySelector(this.turing)).to.be.true;
        });

        it('.findStudentsBy()', () => {
          let found = findStudentsBy(
            [this.curry, this.turing, this.church, this.kleene],
            selector('US', 'Princeton')
          );

          expect(found).to.eql([this.church, this.kleene]);
        });
      });
    });

    describe('2.2.2 Treating objects as Values ', () => {
      it('should create Value Objects to assure immutability', () => {
        let zipCode = (code, location) => {
          let _code = code;
          let _location = location;

          return {
            code: function () {
              return _code;
            },
            location: function () {
              return _location;
            },
            fromString: function (str) {
              let parts = str.split('-');
              return zipCode(parts[0], parts[1]);
            },
            toString: function () {
              return _code + '-' + _location;
            }
          }
        }

        expect(zipCode('43170', 'Laziska Gorne').toString()).to.eql('43170-Laziska Gorne');
        expect(zipCode('43170', 'Laziska Gorne').code()).to.eql('43170');
        expect(zipCode().fromString('43170-Mikolow').location()).to.eql('Mikolow');
      });

      it('should create Value Object with ES6 const', () => {
        function coordinate(lat, long) {
          let _lat = lat;
          let _long = long;
          return {
            latitude: function () {
              return _lat;
            },
            longitude: function () {
              return _long;
            },
            translate: function (dx, dy) {
              return coordinate(_lat + dx, _long + dy);
            },
            toString: function () {
              return '(' + _lat + ',' + _long + ')';
            }
          };
        }

        const greenwich = coordinate(51.4778, 0.0015);
        // greenwich = 2; // Not allowed, constant variable

        expect(greenwich.latitude()).to.eql(51.4778);
      });
    });

    describe('2.2.3 Deep-freezing moving parts', () => {
      it('should use Object.freeze() to disable mutation by throwing error. Makes object read-only.', () => {
        let obj = {
          name: 'piotr'
        }

        Object.freeze(obj);

        expect(function () {
          obj.name = 'andrzej';
        }).to.throw();
      });
    });

    describe('2.2.4 Navigating and modifying object graphs with lenses', () => {
      it('should manually return modified object when modified any property', () => {
        class Person2 {
          constructor(firstName, lastName) {
            this._firstName = firstName;
            this._lastName = lastName;
          }

          get firstName() {
            return this._firstName;
          }

          set firstName(firstName) {
            return new Person2(firstName, this._lastName);
          }

          get lastName() {
            return this._lastName;
          }

          set lastName(lastName) {
            return new Person2(this._firstName, lastName);
          }
        }

        let piotr = new Person2('Piotr', 'Nowak');
        expect(piotr.lastName).to.eql('Nowak');
      });

      it('should use Ramda.js to view property of object', () => {
        var person = new Person('Alonzo', 'Church', '444-44-4444');
        var lastnameLens = R.lensProp('lastname');

        expect(person.lastname).to.equal('Church');
        // same as
        expect(R.view(lastnameLens, person)).to.eql('Church');
      });

      it('should use Ramda.js to set property on object getting its copy along with modified property', () => {
        var person = new Person('Alonzo', 'Church', '444-44-4444');
        var lastnameLens = R.lensProp('lastname');

        expect(R.view(lastnameLens, person)).to.eql('Church');

        let copiedPerson = R.set(lastnameLens, 'Kowalski', person);

        expect(copiedPerson.lastname).to.eql('Kowalski');
        expect(copiedPerson._firstname).to.eql('Alonzo');
        expect(copiedPerson.firstname).to.be.undefined; // copies only own properties, not getters props..

        expect(copiedPerson).not.to.equal(person);
      });
    });
  });

  describe('2.3 Functions', () => {
    describe('2.3.1 Functions as first-class citizens', () => {
      it('should pass and use function as any other variable', () => {
        let customSort = (a, b) => {
          return a - b;
        }

        let arr = [11, 2, 22, 20, 1]
        arr.sort(customSort); // Sorting by numbers, not by string..

        expect(arr).to.eql([1, 2, 11, 20, 22]);
      });
    });

    describe('2.3.2 Higher-order functions', () => {
      it('should be possible to pass function as arg to other function', () => {
        function applyOperation(a, b, opt) {
          return opt(a, b);
        }

        var multiplier = (a, b) => a * b;
        var add = (a) => (b) => a + b;

        expect(applyOperation(2, 3, multiplier)).to.eql(6);
        expect(add(3)(4)).to.eql(7);
      });

      it('should combine higher-order functions to do more complex tasks', () => {
        function printPeople(people, selector, printer) {
          people.forEach(function (person) {
            if (selector(person)) {
              printer(person);
            }
          });
        }

        var inUs = person => person.country === 'us';

        var people = [
          { name: 'john', country: 'us' },
          { name: 'peter', country: 'pl' },
          { name: 'alice', country: 'us' }
        ]

        var spy = sinon.spy();

        printPeople(people, inUs, spy);

        expect(spy.calledTwice).to.be.true;
        expect(spy.calledWith({ name: 'john', country: 'us' })).to.be.true;
        expect(spy.calledWith({ name: 'alice', country: 'us' })).to.be.true;
        expect(spy.calledWith({ name: 'peter', country: 'pl' })).to.be.false;
      });
    });

    describe('2.3.3 Types of function invocation', () => {
      it('should use global function invocation, this keyword is undefined according to ES6/Strict mode', () => {
        function doWork() {
          this.myVar = 'Some value';
        }

        expect(function () {
          doWork();
        }).to.throw;
      });

      it('should use method invocation, this points to containing object', () => {
        var obj = {
          prop: 'my prop',
          getProp: function () {
            return this.prop
          }
        }

        expect(obj.getProp()).to.eql('my prop');
      });

      it('should use constructor invocation, using new keyword, this points to newly created object', () => {
        var MyType = function (arg) {
          this.prop = arg;
        }

        expect(new MyType('hello').prop).to.eql('hello');
      });
    });

    describe('2.3.4 Function methods (apply & call)', () => {
      it('.apply()', () => {
        let negate = function (func) {
          return function () {
            return !func.apply(null, arguments);
          }
        }

        let isNull = function (obj) { return Object.is(obj, null) };
        let isNotNull = negate(isNull);

        expect(isNull(null)).to.be.true;
        expect(isNotNull(5)).to.be.true;
        expect(isNotNull(null)).to.be.false;
      });
    });
  });

  describe('2.4 Closures and Scopes', () => {
    it('should make simple closure', () => {
      let makeAddFunction = (amount) => {
        return function(number) {
          return number + amount;
        }
      }

      let add10To = makeAddFunction(10);

      expect(add10To(5)).to.eql(15);
    });

    it('should closure have access to snapshot of variables inside and outside of scope', () => {
      var outerVar = 'outer';

      let makeInner = (params) => {
        var innerVar = 'inner';
        
        function inner(number) {
          return `I see ${outerVar} ${innerVar} and ${params}`;
        }

        return inner;
      }

      let inner = makeInner('params')

      expect(inner()).to.eql('I see outer inner and params');
    });

    describe('2.4.1 Problems iwht the global scope', () => {
      it('should..', () => {

      });
    });
  });
});