import { expect } from 'chai';
import R from 'ramda';
import _ from 'lodash';
import sinon from 'sinon';

describe('5 Design Patterns Against Complexity', () => {

  class Wrapper {
    constructor(value) {
      this._value = value
    }

    map(fn) {
      return fn(this._value)
    }

    fmap(fn) {
      return wrap(fn(this._value));
    }

    toString() {
      return `Wrapper (${this._value})`;
    }
  }

  const wrap = (val) => new Wrapper(val);

  class MWrapper {
    constructor(value) {
      this._value = value
    }

    static of(a) {
      return new MWrapper(a);
    }

    map(fn) {
      return MWrapper.of(fn(this._value));
    }

    join() {
      if (!(this._value instanceof MWrapper)) {
        return this;
      }

      return this._value.join();
    }

    toString() {
      return `MWrapper (${this._value})`;
    }
  }
  const mwrap = (val) => new MWrapper(val);

  describe('5.1 Shortfalls of imperative error handling', () => {
    describe('5.1.1 Error handling with try-catch', () => {
      it('should do try-catch in js', () => {
        try {
          throw new Error('boo!')
        } catch (e) {
          expect(e.message).to.eql('boo!');
        }
      });
    });
  });

  describe('5.2 Building a better solution: functors', () => {
    describe('5.2.1 Wrapping unsafe values', () => {
      it('should create simple Wrapper', () => {
        const wrappedValue = wrap('hello world');

        expect(wrappedValue.map(R.identity)).to.eql('hello world');
        expect(wrappedValue.map(R.toUpper)).to.eql('HELLO WORLD');
      });

      it('should create a functor with fmap(). Returns wrapped value after fn from map was applied', () => {
        const wrappedValue = wrap('another world');
        // const result = '';
        const result = wrappedValue
          .fmap(R.toUpper)
          .fmap(R.split(' '))
          .fmap(R.tap(val => console.log(val)))
          .map(R.identity)

        expect(result).to.eql(['ANOTHER', 'WORLD']);
      });

      it('should make simple add function with functor', () => {
        const add = R.curry((a, b) => a + b);
        const times = R.curry((n, a) => n * a);

        const add3 = add(3);

        const two = wrap(2);

        expect(two
          .fmap(R.tap(console.log))
          .fmap(add3)
          .fmap(R.tap(console.log))
          .fmap(add3)
          .fmap(R.tap(console.log))
          .fmap(times(3))
          .fmap(R.tap(console.log))
          .map(R.identity)
        ).to.eql(24);
      });
    });
  });

  describe('5.3 Functional error handling using monads', () => {
    class Student {
      constructor(name, address) {
        this._name = name;
        this._address = address;
      }

      get name() {
        return this._name;
      }

      get address() {
        return this._address;
      }
    }

    class Address {
      constructor(city) {
        this._city = city;
      }

      get city() {
        return this._city;
      }
    }

    describe('Reveal problem with nested functors with wrap()', () => {
      it('should check Student and Address Classes', () => {
        const s = new Student('piotr', new Address('bruxelles'));

        expect(s.name).to.eql('piotr');
        expect(s.address.city).to.eql('bruxelles');
      });

      it('should notice problem with nested Wrapper (functors)', () => {
        const find = function (db, ssn) {
          return new Student('piotr', new Address('bruxelles'));
        }

        const findStudent = function () {
          return wrap(new Student('piotr', new Address('bruxelles')));
        };

        const getAddress = function (student) {
          return wrap(student.fmap(R.prop('address')))
        }

        const studentAddress = R.compose(
          getAddress,
          findStudent
        )

        expect(studentAddress()).to.be.instanceof(Wrapper);
        expect(studentAddress().map(R.identity)).to.be.instanceof(Wrapper);
        expect(studentAddress().map(R.identity).map(R.identity).city).to.eql('bruxelles');
      });
    });

    describe('5.3.1 Monads: from control flow to data flow', () => {
      it('should create Empty monad with Wrapper', () => {
        const Empty = function (_) {

        }
        Empty.prototype.map = function () {
          return this;
        }
        Empty.prototype.fmap = function () {
          return wrap(this);
        }
        const empty = () => new Empty();

        const isEven = (n) => Number.isFinite(n) && (n % 2 === 0);
        const half = (val) => isEven(val) ? wrap(val / 2) : empty();

        expect(half(4)).to.be.instanceof(Wrapper);
        expect(half(4).map(R.identity)).to.eql(2);

        expect(half(5)).to.be.instanceof(Empty);
        expect(half(5).map(R.identity)).to.be.instanceof(Empty);

        expect(half(16).fmap(function (val) { return val / 2 }).map(R.identity)).to.eql(4);
      });

      it('should check new MWrapper (monad)', () => {
        const result = MWrapper.of('Hello Monads')
          .map(R.toUpper)
          .map(R.identity);

        expect(result._value).to.eql('HELLO MONADS');
      });

      it('should use MWrapper.join() to flatten nested structures of MWrappers', () => {
        const fortyTwo = mwrap(42);
        const doubleWrappedFortyTwo = mwrap(fortyTwo);
        const tripleWrappedFortyTwo = mwrap(doubleWrappedFortyTwo);
        
        expect(tripleWrappedFortyTwo).to.be.instanceof(MWrapper);
        expect(tripleWrappedFortyTwo._value).to.be.instanceof(MWrapper);
        expect(tripleWrappedFortyTwo._value._value).to.be.instanceof(MWrapper);
        
        expect(tripleWrappedFortyTwo.join()._value).to.eql(42);
      });

      it('should use array flatten analogy', () => {
        const result = R.flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);

        expect(result).to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
      });
    });

    describe('5.3.2 Error handling with Maybe and Either monads', () => {
      it('should..', () => {
        
      });
    });
  });
});