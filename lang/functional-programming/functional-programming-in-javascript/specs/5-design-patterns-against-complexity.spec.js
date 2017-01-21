import { expect } from 'chai';
import R from 'ramda';
import _ from 'lodash';
import sinon from 'sinon';

describe('5 Design Patterns Against Complexity', () => {
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
    describe('5.3.1 Monads: from control flow to data flow', () => {
      it('should..', () => {
        
      });
    });
  });
});