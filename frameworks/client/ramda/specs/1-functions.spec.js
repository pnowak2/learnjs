import { expect } from 'chai';
import * as R from 'ramda';

describe('Ramda', () => {
  describe('.__ - A special placeholder value used to specify "gaps" within curried functions, allowing partial application of any combination of arguments, regardless of their positions.', () => {
    it('should be special placeholder for specifying gaps', () => {
      expect(R.__).to.eql({ '@@functional/placeholder': true });
    });

    it('should provide placeholder gap for curried function', () => {
      const sum = (a, b) => a + b;
      const curriedSum = R.curry(sum);
      const sumAdd12 = curriedSum(R.__, 12);

      expect(sumAdd12(3)).to.eql(15);
    });
  });

  describe('.add() - Adds two values.', () => {
    it('should add two values', () => {
      expect(R.add(2, 8)).to.eql(10);
      expect(R.add(2)(5)).to.eql(7);
    });
  });

  describe('.addIndex() - Creates a new list iteration function from an existing one by adding two new parameters to its callback function: the current index, and the entire list', () => {
    it('should add index and list to callback', () => {
      var mapIndexed = R.addIndex(R.map);
      // map does not provide index to its callback, so addIndex will provide one
      const result = mapIndexed(
        /* map fn */
        (val, idx) => idx + '-' + val,
        /* array to map */
        ['f', 'o', 'o', 'b', 'a', 'r']
      );

      expect(result).to.eql(['0-f', '1-o', '2-o', '3-b', '4-a', '5-r'])
    });
  });

  describe('.adjust() - Applies a function to the value at the given index of an array, returning a new copy of the array with the element at the given index replaced with the result of the function application.', () => {
    it('should replace given element in array using function passed as first argument', () => {
      const result = R.adjust(R.add(10), 1, [1, 9, 3]);
      const resultCurried = R.adjust(R.add(10), 1);
      expect(result).to.eql([1, 19, 3]);
      expect(resultCurried([1, 9, 3])).to.eql([1, 19, 3]);
    });
  });

  describe('.all() - Returns true if all elements of the list match the predicate, false if there are any that dont.', () => {
    it('should return true if all numbers satisfy predicate', () => {
      expect(R.all(R.equals(5), [5, 5, 5, 5])).to.be.true;
      expect(R.all(R.equals(5), [5, 5, 5, 4])).to.be.false;
    });
  });

  describe('.allPass() - Takes a list of predicates and returns a predicate that returns true for a given list of arguments if every one of the provided predicates is satisfied by those arguments.', () => {
    it('should check for more predicates all passing', () => {
      const isQueen = (card) => R.contains('Q');
      const isKing = (card) => R.contains('K');

      const isSpade = (card) => R.contains('S');
      const isHeart = (card) => R.contains('H');

      const isQueenOfSpades = R.allPass([isQueen, isSpade]);
      const isKingOfHearts = R.allPass([isKing, isHeart]);

      expect(isQueenOfSpades('QS')).to.be.true;
      expect(isQueenOfSpades('KH')).to.be.true;
    });
  });

  describe('.always() - Returns a function that always returns the given value. Note that for non-primitives the value returned is a reference to the original value.', () => {
    it('should always return given param when calling the function', () => {
      const fn = R.always('testing');

      expect(fn()).to.eql('testing');
    });
  });

  describe('.and() - Returns true if both arguments are true; false otherwise.', () => {
    it('should give truthy only if both args are true', () => {
      expect(R.and(true, true)).to.be.true;
      expect(R.and('a', 'b')).to.eql('b');
      expect(R.and(true, false)).to.be.false;
      expect(R.and(false, true)).to.be.false;
      expect(R.and(false, false)).to.be.false;
    });
  });

  describe('.any() - Returns true if at least one of elements of the list match the predicate, false otherwise.', () => {
    it('should ', () => {

    });
  });
});