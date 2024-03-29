import { expect } from 'chai';
import * as R from 'ramda';
import sinon from 'sinon';

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
    it('should return true if at least one element from list satisfies the predicate', () => {
      const anyOddNumber = R.any(val => val % 2 === 0);
      const anyEvenNumber = R.any(val => val % 2 !== 0);

      expect(anyOddNumber([1, 2, 5])).to.be.true;
      expect(anyEvenNumber([2, 4, 6])).to.be.false;
    });
  });

  describe('.anyPass() - Takes a list of predicates and returns a predicate that returns true for a given list of arguments if at least one of the provided predicates is satisfied by those arguments.', () => {
    it('should check for more predicates where at least one is passing', () => {
      const isSpade = (card) => R.contains('S');
      const isHeart = (card) => R.contains('H');

      const isRed = R.anyPass([isHeart, isSpade]);

      expect(isRed('QS')).to.be.true;
      expect(isRed('KH')).to.be.true;
    });
  });

  describe('.ap() - ap applies a list of functions to a list of values.', () => {
    it('should apply list of functions to values and concatenate them sequentially in output array', () => {
      const add5 = R.add(5);
      const mul3 = R.multiply(3);

      const result = R.ap([add5, mul3], [1, 2, 3]);
      expect(result).to.eql([/* result of addition */ 6, 7, 8, /* result of multiplication */ 3, 6, 9]);

      const greet = val => `hello ${val}`;
      expect(R.ap([greet], ['piotr', 'andrzej'])).to.eql(['hello piotr', 'hello andrzej']);
    });
  });

  describe('.aperture() - Returns a new list, composed of n-tuples of consecutive elements If n is greater than the length of the list, an empty list is returned.', () => {
    it('should group elements from list to groups of given size taking from consecutive elements', () => {
      const list = [1, 2, 3, 4, 5];
      const result = R.aperture(3, list);

      expect(result).to.eql([[1, 2, 3], [2, 3, 4], [3, 4, 5]]);
    });
  });

  describe('.append() - Returns a new list containing the contents of the given list, followed by the given element.', () => {
    it('should create new list (copy) with passed element at the end of the list', () => {
      const list = ['a', 'b', 'c'];
      const result = R.append('d', list);

      expect(result).not.to.equal(list);
      expect(result).to.eql(['a', 'b', 'c', 'd']);
    });
  });

  describe('.apply() - Applies function fn to the argument list args. This is useful for creating a fixed-arity function from a variadic function. fn should be a bound function if context is significant.', () => {
    it('should apply function to set of args', () => {

      const result = R.apply(Math.max, [1, 2]);
      // same us imho..
      const result2 = Math.max(...[1, 2, 3]);

      expect(result).to.eql(2);
      expect(result2).to.eql(3);
    });
  });

  describe('.applySpec() - Given a spec object recursively mapping properties to functions, creates a function producing an object of the same structure, by mapping each property to the result of calling its associated function with the supplied arguments.', () => {
    it('should make function which gets recipe how the end result structure should look like and later executes it. Watch for arity of subfunctions though..', () => {
      const makeResult = R.applySpec({
        sum: R.add,
        nested: {
          mul: R.multiply
        }
      });

      expect(makeResult(2, 4)).to.eql({
        sum: 6,
        nested: {
          mul: 8
        }
      });
    });
  });


  describe('.ascend() - Makes an ascending comparator function out of a function that returns a value that can be compared with < and >.', () => {
    it('should provide comparator function used as comparator for sorting', () => {
      const people = [
        { name: 'piotr', age: 37 },
        { name: 'andrzej', age: 24 },
        { name: 'hania', age: 17 },
      ]
      const byAge = R.ascend(obj => obj.age); // returns curried function with two params (a, b) to compare

      const sorted = R.sort(byAge, people);

      expect(sorted).to.eql([
        { name: 'hania', age: 17 },
        { name: 'andrzej', age: 24 },
        { name: 'piotr', age: 37 },
      ]);
    });
  });


  describe('.assoc() - Makes a shallow clone of an object, setting or overriding the specified property with the given value. Note that this copies and flattens prototype properties onto the new object as well. All non-primitive properties are copied by reference.', () => {
    it('should make shallow clone - creates copy of the given object and overrides/creates given property to it', () => {
      const myObj = { a: 1, b: 2 };
      const result = R.assoc('b', 5, myObj);

      expect(result).to.eql({ a: 1, b: 5 });
    });
  });

  describe('.assocPath() - Makes a shallow clone of an object, setting or overriding the nodes required to create the given path, and placing the specific value at the tail end of that path. Note that this copies and flattens prototype properties onto the new object as well. All non-primitive properties are copied by reference.', () => {
    it('should make shallow clone - creates copy of the given event nested object and overrides/creates given property to it', () => {
      const myObj = { a: 1, b: 2, c: { d: 8 } };
      const result = R.assocPath(['c', 'd'], 12, myObj);

      expect(result).to.eql({ a: 1, b: 2, c: { d: 12 } });
    });
  });

  describe('.binary() - Wraps a function of any arity (including nullary) in a function that accepts exactly 2 parameters. Any extraneous parameters will not be passed to the supplied function', () => {
    it('should make function only two args compliant', () => {
      const add = (a, b, c) => a + b + c;

      expect(add('a', 'b', 'c')).to.eql('abc');

      const add2 = R.binary(add);

      expect(add2('a', 'b', 'c')).to.eql('abundefined');
    });
  });

  describe('.bind() - Creates a function that is bound to a context. Note: R.bind does not provide the additional argument-binding capabilities of Function.prototype.bind.', () => {

    it('should bind context to function', () => {
      const ctx = { name: 'piotr' };
      const fn = function () {
        return this.name;
      }

      const boundFn = R.bind(fn, ctx);

      expect(boundFn()).to.eql('piotr');
    });

  });

  describe('.both() - A function which calls the two provided functions and returns the && of the results. It returns the result of the first function if it is false-y and the result of the second function otherwise. Note that this is short-circuited, meaning that the second function will not be invoked if the first returns a false-y value.', () => {
    it('should provide function which combines two conditions', () => {
      const isBiggerThan5 = n => n >= 5;
      const isSmallerThan25 = n => n <= 25;

      const isBetween5And25 = R.both(isBiggerThan5, isSmallerThan25);

      expect(isBetween5And25(7)).to.be.true;
      expect(isBetween5And25(26)).to.be.false;
      expect(isBetween5And25(4)).to.be.false;
    });
  });

  describe('.call() - Returns the result of calling its first argument with the remaining arguments.', () => {
    it('should call function with passed args', () => {
      const result = R.call(R.add, 1, 4);
      expect(result).to.eql(5);
    });
  });

  describe('.chain() - maps a function over a list and concatenates the results. chain is also known as flatMap in some libraries.', () => {
    it('should map over functions and concatenate resulting arrays', () => {
      var funify = n => [n + ' fun', n + ' boom'];
      const result = R.chain(funify, [1, 2, 3]);

      expect(result).to.eql(['1 fun', '1 boom', '2 fun', '2 boom', '3 fun', '3 boom']);
    });
  });

  describe('.clamp() - Restricts a number to be within a range.', () => {
    it('should restrict the number', () => {
      expect(R.clamp(1, 20, 30)).to.eql(20);
      expect(R.clamp(1, 20, 15)).to.eql(15);
      expect(R.clamp(1, 20, -30)).to.eql(1);
    });
  });

  describe('.clone() - Creates a deep copy of the value which may contain (nested) Arrays and Objects, Numbers, Strings, Booleans and Dates. Functions are assigned by reference rather than copied', () => {
    it('should make deep clone copy', () => {
      const objects = [[{}, {}], {}, {}, {}];
      const cloned = R.clone(objects);

      expect(objects).to.deep.equal(cloned);
      expect(objects).not.to.equal(cloned);
    });
  });

  describe('.comparator() - Makes a comparator function out of a function that reports whether the first element is less than the second.', () => {
    it('should make sort function used in comparator call', () => {
      const people = [
        { name: 'piotr', age: 37 },
        { name: 'andrzej', age: 24 },
        { name: 'hania', age: 17 },
      ]
      const byAgeAsc = R.comparator((a, b) => a.age < b.age); // returns curried function with two params (a, b) to compare

      const sorted = R.sort(byAgeAsc, people);

      expect(sorted).to.eql([
        { name: 'hania', age: 17 },
        { name: 'andrzej', age: 24 },
        { name: 'piotr', age: 37 },
      ]);
    });
  });

  describe('.complement() - Takes a function f and returns a function g such that if called with the same arguments when f returns a "truthy" value, g returns false and when f returns a "falsy" value g returns true.', () => {
    it('should make function that negates predicate', () => {
      const isNotNull = R.complement(val => val === null);
      expect(isNotNull('a')).to.be.true;
    });
  });

  describe('.compose() - Performs right-to-left function composition. The rightmost function may have any arity; the remaining functions must be unary.', () => {
    it('should make right to left composition', () => {
      const greeterFn = val => `Name is: ${val}`;
      const greet = R.compose(greeterFn, R.toUpper)

      expect(greet('piotr')).to.eql('Name is: PIOTR');
    });
  });

  describe('.composeK() - Returns the right-to-left Kleisli composition of the provided functions, each of which must return a value of a type supported by chain.', () => {
    it('should make right to left composition', () => {

    });
  });

  describe('.composeP() - Performs right-to-left composition of one or more Promise-returning functions. The rightmost function may have any arity; the remaining functions must be unary.', () => {
    it('should make right to left composition with promised', (done) => {
      var db = {
        users: {
          JOE: {
            name: 'Joe',
            followers: ['STEVE', 'SUZY']
          }
        }
      }

      const getUser = userId => Promise.resolve(db.users[userId]);
      const getFollowers = user => Promise.resolve(user.followers);

      const followersForUser = R.composeP(getFollowers, getUser);

      const result = followersForUser('JOE').then(followers => {
        expect(followers).to.eql(['STEVE', 'SUZY']);
        done();
      })
    });
  });

  describe('.concat() - Returns the result of concatenating the given lists or strings.', () => {
    it('should just concat..', () => {
      expect(R.concat('abc', 'def')).to.eql('abcdef');
      expect(R.concat([1, 2], [3, 4])).to.eql([1, 2, 3, 4]);
    });
  });

  describe('.cond() - Returns a function, fn, which encapsulates if/else, if/else, ... logic. R.cond takes a list of [predicate, transformer] pairs', () => {
    it('should do conditional logic', () => {
      const fn = R.cond([
        [val => val > 0, () => 'above'],
        [val => val < 0, () => 'below'],
        [val => val === 0, () => 'zero'],
      ]);

      expect(fn(5)).to.eql('above');
      expect(fn(-5)).to.eql('below');
      expect(fn(0)).to.eql('zero');
    });
  });

  describe('.construct() - Wraps a constructor function inside a curried function that can be called with the same arguments and returns the same type.', () => {
    it('should make currying constructor function possible', () => {
      function Animal(name, age) {
        this.name = name;
        this.age = age;
      };

      let AnimalConstructor = R.construct(Animal);
      let Goat = AnimalConstructor('Goat');
      let matolek = new Goat(5);

      expect(matolek.name).to.eql('Goat');
      expect(matolek.age).to.eql(5);
    });
  });

  describe('.constructN() - Wraps a constructor function inside a curried function that can be called with the same arguments and returns the same type. The arity of the function returned is specified to allow using variadic constructor functions.', () => {
    it('should make currying constructor function possible', () => {
      function Salad() {
        this.ingredients = arguments;
      };
      Salad.prototype.recipe = function () {
        var instructions = R.map((ingredient) => (
          'Add a whollop of ' + ingredient, this.ingredients)
        )
        return R.join('\n', instructions)
      }

      var ThreeLayerSalad = R.constructN(3, Salad);

      var salad = ThreeLayerSalad('Mayonnaise')('Potato Chips')('Ketchup');

      //  console.log(salad.recipe());
      // Add a whollop of Mayonnaise
      // Add a whollop of Potato Chips
      // Add a whollop of Potato Ketchup
    });
  });


  describe('.contains() - Returns true if the specified value is equal, in R.equals terms, to at least one element of the given list; false otherwise', () => {
    it('should check for presence of the value', () => {
      expect(R.contains(3, [1, 2, 3])).to.eql(true);
      expect(R.contains('hello', 'hello world')).to.eql(true);
    });
  });


  describe('.converge() - Accepts a converging function and a list of branching functions and returns a new function. When invoked, this new function is applied to some arguments, each branching function is applied to those same arguments. The results of each branching function are passed as arguments to the converging function to produce the return value.', () => {
    it('should call branching functions on same arguments and at the end results of branching functions are used as param on converging function (first param)', () => {
      let avg = R.converge(R.divide, [R.sum, R.length]);

      expect(avg([1, 2, 3, 4])).to.eql(2.5);
    });
  });

  describe('.countBy() - Counts the elements of a list according to how many match each value of a key generated by the supplied function. Returns an object mapping the keys produced by fn to the number of occurrences in the list. Note that all keys are coerced to strings because of how JavaScript objects work.', () => {
    it('should count elements passing test and return object with passed results', () => {
      let lessThan10 = R.countBy(val => val < 10);

      expect(lessThan10([1, 3, 11, 22])).to.eql({
        'true': 2,
        'false': 2
      })
    });
  });

  describe('.curry() - Returns a curried equivalent of the provided function. The curried function has two unusual capabilities. First, its arguments neednt be provided one at a time', () => {
    it('should curry the function..', () => {
      var addFourNumbers = (a, b, c, d) => a + b + c + d;
      var curriedAddFourNumbers = R.curry(addFourNumbers);
      var f = curriedAddFourNumbers(1, 2);
      var g = f(3);

      expect(g(4)).to.eql(10);
    });

    it('should curry with placeholder', () => {
      var greet = (name, age) => {
        return `hello ${name}, you are ${age}`;
      }
      var curriedGreet = R.curry(greet);
      var greet5Yrs = curriedGreet(R.__, 5);

      expect(greet5Yrs('piotr')).to.eql('hello piotr, you are 5');
    });
  });

  describe('.dec() - Decrements its argument.', () => {
    it('should decrement argument', () => {
      expect(R.dec(5)).to.eql(4);
    });
  });


  describe('.defaultTo() - Returns the second argument if it is not null, undefined or NaN otherwise the first argument is returned.', () => {
    it('should return default if falsy', () => {
      let defaultTo5 = R.defaultTo(5);

      expect(defaultTo5(null)).to.eql(5);
      expect(defaultTo5('hello')).to.eql('hello');
    });
  });

  describe('.descend() - Makes a descending comparator function out of a function that returns a value that can be compared with < and >.', () => {
    it('should provide comparator function used as comparator for sorting', () => {
      const people = [
        { name: 'piotr', age: 37 },
        { name: 'andrzej', age: 24 },
        { name: 'hania', age: 17 },
      ]
      const byAge = R.descend(obj => obj.age); // returns curried function with two params (a, b) to compare

      const sorted = R.sort(byAge, people);

      expect(sorted).to.eql([
        { name: 'piotr', age: 37 },
        { name: 'andrzej', age: 24 },
        { name: 'hania', age: 17 },
      ]);
    });
  });

  describe('.difference() - Finds the set (i.e. no duplicates) of all elements in the first list not contained in the second list. Objects and Arrays are compared are compared in terms of value equality, not reference equality.', () => {
    it('should find difference in lists', () => {
      let diff = R.difference([1, 2, 3], [2, 3, 4]);

      expect(diff).to.eql([1]);
    });
  });

  describe('.differenceWith() - Finds the set (i.e. no duplicates) of all elements in the first list not contained in the second list. Duplication is determined according to the value returned by applying the supplied predicate to two list elements.', () => {
    it('should find difference in lists with predicate', () => {
      let diff = R.differenceWith((a, b) => a.a === b.a, [{ a: 1 }], [{ a: 2 }]);

      expect(diff).to.eql([{ a: 1 }]);
    });
  });

  describe('.dissoc() - Returns a new object that does not contain a prop property.', () => {
    it('should make copy without given property', () => {
      const myObj = { a: 1, b: 2 };
      const result = R.dissoc('b', myObj);

      expect(result).to.eql({ a: 1 });
    });
  });

  describe('.dissocPath() - Makes a shallow clone of an object, omitting the property at the given path. Note that this copies and flattens prototype properties onto the new object as well. All non-primitive properties are copied by reference.', () => {
    it('should make shallow clone - without given property given by path', () => {
      const myObj = { a: 1, b: 2, c: { d: 8 } };
      const result = R.dissocPath(['c', 'd'], myObj);

      expect(result).to.eql({ a: 1, b: 2, c: {} });
    });
  });

  describe('.divide() - Divides two numbers. Equivalent to a / b.', () => {
    it('should divide two numbers', () => {
      expect(R.divide(71, 100)).to.eql(.71);

      let toHalf = R.divide(R.__, 2);

      expect(toHalf(10)).to.eql(5);
    });
  });

  describe('.drop() - Returns all but the first n elements of the given list, string, or transducer/transformer (or object with a drop method).', () => {
    it('should remove first n elements from list/string making copy', () => {
      expect(R.drop(2, ['foo', 'bar', 'baz'])).to.eql(['baz']);
      expect(R.drop(3, 'ramda')).to.eql('da');
    });
  });

  describe('.dropLast() - Returns a list containing all but the last n elements of the given list.', () => {
    it('should remove last n elements from list/string making copy', () => {
      expect(R.dropLast(2, ['foo', 'bar', 'baz'])).to.eql(['foo']);
      expect(R.dropLast(3, 'ramda')).to.eql('ra');
    });
  });

  describe('.dropLastWhile() - Returns a new list excluding all the tailing elements of a given list which satisfy the supplied predicate function. It passes each value from the right to the supplied predicate function, skipping elements until the predicate function returns a falsy value. The predicate function is applied to one argument: (value).', () => {
    it('should remove last n elements which pass predicate function starting from end (tail), then stops and returns result', () => {
      var lteThree = x => x <= 3;
      var result = R.dropLastWhile(lteThree, [1, 2, 3, 4, 3, 2, 1]);

      expect(result).to.eql([1, 2, 3, 4]);
    });
  });

  describe('.dropRepeats() - Returns a new list without any consecutively repeating elements. R.equals is used to determine equality.', () => {
    it('should remove duplicates which are siblings in the list', () => {
      var result = R.dropRepeats([1, 2, 2, 4, 4, 4, 1]);

      expect(result).to.eql([1, 2, 4, 1]);
    });
  });

  describe('.dropRepeatsWith() - Returns a new list without any consecutively repeating elements. Equality is determined by applying the supplied predicate to each pair of consecutive elements. The first element in a series of equal elements will be preserved.', () => {
    it('should remove duplicates which are siblings in the list with predicate', () => {
      var l = [1, -1, 1, 3, 4, -4, -4, -5, 5, 3, 3];
      var result = R.dropRepeatsWith(R.eqBy(Math.abs), l);

      expect(result).to.eql([1, 3, 4, -5, 3])
    });
  });

  describe('.dropWhile() - Returns a new list excluding the leading elements of a given list which satisfy the supplied predicate function.', () => {
    it('should remove duplicates from beginning as long as predicate works', () => {
      var lteTwo = x => x <= 2;
      var result = R.dropWhile(lteTwo, [1, 2, 3, 4, 3, 2, 1]);

      expect(result).to.eql([3, 4, 3, 2, 1]);
    });
  });

  describe('.either() - A function wrapping calls to the two functions in an || operation, returning the result of the first function if it is truth-y and the result of the second function otherwise', () => {
    it('should behave like || or', () => {
      var gt10 = x => x > 10;
      var even = x => x % 2 === 0;
      var biggerThan10OrEven = R.either(gt10, even);

      expect(biggerThan10OrEven(101)).to.be.true;
      expect(biggerThan10OrEven(8)).to.be.true;
      expect(biggerThan10OrEven(9)).to.be.false;
    });
  });

  describe('.empty() - Returns the empty value of its arguments type.', () => {
    it('should behave like || or', () => {
      expect(R.empty([1, 2, 3])).to.eql([]);     //=> []
      expect(R.empty('unicorns')).to.eql('');    //=> ''
      expect(R.empty({ x: 1, y: 2 })).to.eql({});  //=> {}
    });
  });

  describe('.eqBy() - Takes a function and two values in its domain and returns true if the values map to the same value in the codomain; false otherwise.', () => {
    it('should check equality with function given', () => {
      expect(R.eqBy(Math.abs, 5, -5)).to.eql(true);
    });
  });

  describe('.eqProps() - Reports whether two objects have the same value, in R.equals terms, for the specified property. Useful as a curried predicate.', () => {
    it('should check equality of given prop in two objects', () => {
      var o1 = { a: 1, b: 2, c: 3, d: 4 };
      var o2 = { a: 10, b: 20, c: 3, d: 40 };
      expect(R.eqProps('a', o1, o2)).to.be.false;
      expect(R.eqProps('c', o1, o2)).to.be.true;
    });
  });

  describe('.equals() - Returns true if its arguments are equivalent, false otherwise. Handles cyclical data structures.', () => {
    it('should check equality ', () => {
      expect(R.equals(1, 1)).to.be.true;
      expect(R.equals(1, '1')).to.be.false;
      expect(R.equals({}, {})).to.be.true;
    });
  });

  describe('.evolve() - Creates a new object by recursively evolving a shallow copy of object, according to the transformation functions. All non-primitive properties are copied by reference.', () => {
    it('should check evolve', () => {
      var tomato = { firstName: '  Tomato ', data: { elapsed: 100, remaining: 1400 }, id: 123 };
      var transformations = {
        firstName: R.trim,
        lastName: R.trim, // Will not get invoked.
        data: { elapsed: R.add(1), remaining: R.add(-1) }
      };

      var result = R.evolve(transformations, tomato);

      expect(result).to.eql({
        firstName: 'Tomato', data: { elapsed: 101, remaining: 1399 }, id: 123
      });
    });
  });

  describe('.F() - A function that always returns false. Any passed in parameters are ignored.', () => {
    it('should return false', () => {
      expect(R.F()).to.be.false;
    });
  });

  describe('.filter() - Takes a predicate and a "filterable", and returns a new filterable of the same type containing the members of the given filterable which satisfy the given predicate.', () => {
    it('should return filtered result', () => {
      var isEven = n => n % 2 === 0;

      expect(R.filter(isEven, [1, 2, 3, 4])).to.eql([2, 4]);
      expect(R.filter(isEven, { a: 1, b: 2, c: 3, d: 4 })).to.eql({ b: 2, d: 4 });
    });
  });

  describe('.find() - Returns the first element of the list which matches the predicate, or undefined if no element matches.', () => {
    it('should return first result found', () => {
      var xs = [{ a: 1 }, { a: 2 }, { a: 3 }];
      var result = R.find(R.propEq('a', 2))(xs);

      expect(result).to.eql({ a: 2 });
    });
  });

  describe('.findIndex() - Returns the index of the first element of the list which matches the predicate, or -1 if no element matches.', () => {
    it('should return index of the first result found', () => {
      var xs = [{ a: 1 }, { a: 2 }, { a: 3 }];
      var result = R.findIndex(R.propEq('a', 2))(xs);

      expect(result).to.eql(1);
    });
  });

  describe('.findLast() - Returns the last element of the list which matches the predicate, or undefined if no element matches.', () => {
    it('should return last result found', () => {
      var xs = [{ a: 1, b: 0 }, { a: 1, b: 1 }];
      var result = R.findLast(R.propEq('a', 1))(xs);

      expect(result).to.eql({ a: 1, b: 1 });
    });
  });

  describe('.findLastIndex() - Returns the index of the last element of the list which matches the predicate, or -1 if no element matches.', () => {
    it('should return index of the last result found', () => {
      var xs = [{ a: 1, b: 0 }, { a: 1, b: 1 }];
      var result = R.findLastIndex(R.propEq('a', 1))(xs);

      expect(result).to.eql(1);
    });
  });

  describe('.flatten() - Returns a new list by pulling every item out of it (and all its sub-arrays) and putting them in a new array, depth-first.', () => {
    it('should flatten list', () => {
      var result = R.flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);

      expect(result).to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    });
  });

  describe('.flip() - Returns a new function much like the supplied one, except that the first two arguments order is reversed.', () => {
    it('should flip two first args', () => {
      var mergeThree = (a, b, c) => [].concat(a, b, c);

      expect(mergeThree(1, 2, 3)).to.eql([1, 2, 3]);
      expect(R.flip(mergeThree)(1, 2, 3)).to.eql([2, 1, 3]);
    });
  });

  describe('.forEach() - Iterate over an input list, calling a provided function fn for each element in the list.', () => {
    it('should iterate over list', () => {
      var result = [];
      var process = x => result.push('boo' + x);
      R.forEach(process, [1, 2, 3]);

      expect(result).to.eql(['boo1', 'boo2', 'boo3']);
    });
  });

  describe('.forEachObjIndexed() - Iterate over an input object, calling a provided function fn for each key and value in the object.', () => {
    it('should iterate over object keys and values', () => {
      var result = [];
      var process = (val, key, obj) => result.push('' + val + key);
      R.forEachObjIndexed(process, { x: 1, y: 2 });

      expect(result).to.eql(['1x', '2y']);
    });
  });

  describe('.fromPairs() - Creates a new object from a list key-value pairs. If a key appears in multiple pairs, the rightmost pair is included in the object.', () => {
    it('should make object from array pairs', () => {
      var result = R.fromPairs([['a', 1], ['b', 2], ['c', 3]]);

      expect(result).to.eql({
        a: 1,
        b: 2,
        c: 3
      })
    });
  });

  describe('.groupBy() - Splits a list into sub-lists stored in an object, based on the result of calling a String-returning function on each element, and grouping the results according to values returned.', () => {
    it('should group by given criteria', () => {
      var byGrade = R.groupBy(function (student) {
        var score = student.score;
        return score < 65 ? 'F' :
          score < 70 ? 'D' :
            score < 80 ? 'C' :
              score < 90 ? 'B' : 'A';
      });

      var students = [
        { name: 'Abby', score: 84 },
        { name: 'Eddy', score: 58 },
        { name: 'Jack', score: 99 }
      ];

      expect(byGrade(students)).to.eql({
        'A': [{ name: 'Jack', score: 99 }],
        'B': [{ name: 'Abby', score: 84 }],
        'F': [{ name: 'Eddy', score: 58 }],
      });
    });
  });

  describe('.groupWith() - Takes a list and returns a list of lists where each sublists elements are all "equal" according to the provided equality function.', () => {
    it('should group according equality of elements in the list', () => {
      const isVowel = v => 'aeiouy'.indexOf(v) !== -1;
      const result = R.groupWith(R.eqBy(isVowel), 'aestiou');

      expect(result).to.eql(['ae', 'st', 'iou']);
    });
  });

  describe('.gt() - Returns true if the first argument is greater than the second; false otherwise.', () => {
    it('should do gt', () => {
      expect(R.gt(2, 1)).to.be.true;
      expect(R.gt(2, 2)).to.be.false;
    });
  });

  describe('.gte() - Returns true if the first argument is greater than or equal the second; false otherwise.', () => {
    it('should do gt', () => {
      expect(R.gte(2, 2)).to.be.true;
    });
  });

  describe('.has() - Returns whether or not an object has an own property with the specified name.', () => {
    it('should check if object has own property with name', () => {
      var hasName = R.has('name');

      expect(hasName({ name: 'alice' })).to.be.true;
      expect(hasName({ name: 'bob' })).to.be.true;
      expect(hasName({})).to.be.false;
    });
  });

  describe('.hasIn() - Returns whether or not an object or its prototype chain has a property with the specified name.', () => {
    it('should check if object has or its prototype has prop', () => {
      function Rectangle(width, height) {
        this.width = width;
        this.height = height;
      }
      Rectangle.prototype.area = function () {
        return this.width * this.height;
      };

      var square = new Rectangle(2, 2);
      expect(R.hasIn('width', square)).to.be.true;
      expect(R.hasIn('area', square)).to.be.true;
    });
  });

  describe('.head() - Returns the first element of the given list or string. In some libraries this function is named first.', () => {
    it('should get first element', () => {
      expect(R.head(['fi', 'fo', 'fum'])).to.eql('fi');
    });
  });

  describe('.identical() - Returns true if its arguments are identical, false otherwise. Values are identical if they reference the same memory. NaN is identical to NaN; 0 and -0 are not identical.', () => {
    it('should check for elements to be identical', () => {
      expect(R.identical(1, 1)).to.be.true;
      expect(R.identical(1, '1')).to.be.false;
    });
  });

  describe('.identity() - A function that does nothing but return the parameter supplied to it. Good as a default or placeholder function.', () => {
    it('should return its argument', () => {
      expect(R.identity(1)).to.eql(1);
    });
  });

  describe('.ifElse() - Creates a function that will process either the onTrue or the onFalse function depending upon the result of the condition predicate.', () => {
    it('should replace if else statements', () => {
      var incCount = R.ifElse(
        R.has('count'),
        R.over(R.lensProp('count'), R.inc),
        R.assoc('count', 1)
      );

      expect(incCount({})).to.eql({ count: 1 })
      expect(incCount({ count: 1 })).to.eql({ count: 2 })
    });
  });

  describe('.inc() - Increments its argument.', () => {
    it('should increment its argument', () => {
      expect(R.inc(4)).to.eql(5);
    });
  });

  describe('.indexBy() - Given a function that generates a key, turns a list of objects into an object indexing the objects by the given key.', () => {
    it('should index elements to objects', () => {
      var list = [{ id: 'xyz', title: 'A' }, { id: 'abc', title: 'B' }];
      var result = R.indexBy(R.prop('id'), list);
      expect(result).to.eql({ abc: { id: 'abc', title: 'B' }, xyz: { id: 'xyz', title: 'A' } });
    });
  });

  describe('.indexOf() - Returns the position of the first occurrence of an item in an array, or -1 if the item is not included in the array.', () => {
    it('should return position of element in the list', () => {
      expect(R.indexOf(3, [1, 2, 3, 4])).to.eql(2);
    });
  });

  describe('.init() - Returns all but the last element of the given list or string.', () => {
    it('should return everything except last element', () => {
      expect(R.init([1, 2, 3])).to.eql([1, 2]);
    });
  });

  describe('.insert() - Inserts the supplied element into the list, at index index.', () => {
    it('should insert at given position', () => {
      expect(R.insert(2, 'x', [1, 2, 3, 4])).to.eql([1, 2, 'x', 3, 4]);
    });
  });

  describe('.insertAll() - Inserts the sub-list into the list, at index index.', () => {
    it('should insert at given position', () => {
      expect(R.insertAll(2, ['x', 'y', 'z'], [1, 2, 3, 4])).to.eql([1, 2, 'x', 'y', 'z', 3, 4]);
    });
  });

  describe('.intersection() - Combines two lists into a set (i.e. no duplicates) composed of those elements common to both lists.', () => {
    it('should intersect lists', () => {
      expect(R.intersection([1, 2, 3, 4], [7, 6, 5, 4, 3])).to.eql([3, 4]);
    });
  });

  describe('.intersectionWith() - Combines two lists into a set (i.e. no duplicates) composed of those elements common to both lists. Duplication is determined according to the value returned by applying the supplied predicate to two list elements.', () => {
    it('should combine lists to a set', () => {
      var buffaloSpringfield = [
        { id: 824, name: 'Richie Furay' },
        { id: 956, name: 'Dewey Martin' },
        { id: 313, name: 'Bruce Palmer' },
        { id: 456, name: 'Stephen Stills' },
        { id: 177, name: 'Neil Young' }
      ];
      var csny = [
        { id: 204, name: 'David Crosby' },
        { id: 456, name: 'Stephen Stills' },
        { id: 539, name: 'Graham Nash' },
        { id: 177, name: 'Neil Young' }
      ];

      var result = R.intersectionWith(R.eqBy(R.prop('id')), buffaloSpringfield, csny);

      expect(result).to.eql([{ id: 456, name: 'Stephen Stills' }, { id: 177, name: 'Neil Young' }]);
    });
  });

  describe('.intersperse() - Creates a new list with the separator interposed between elements.', () => {
    it('should put given element between items', () => {
      expect(R.intersperse('x', ['a', 'b', 'c'])).to.eql(['a', 'x', 'b', 'x', 'c']);
    });
  });

  describe('.into() - Transforms the items of the list with the transducer and appends the transformed items to the accumulator using an appropriate iterator function based on the accumulator type.', () => {
    it('should map items in array with transducer and put them to another array', () => {
      var numbers = [1, 2, 3, 4];
      var transducer = R.compose(R.map(R.add(1)), R.take(2));

      var result = R.into([], transducer, numbers);

      expect(result).to.eql([2, 3]);
    });
  });

  describe('.invert() - Same as R.invertObj, however this accounts for objects with duplicate values by putting the values into an array.', () => {
    it('should invert keys with values grouping them', () => {
      var raceResultsByFirstName = {
        first: 'alice',
        second: 'jake',
        third: 'alice',
      };

      var result = R.invert(raceResultsByFirstName);

      expect(result).to.eql({
        alice: ['first', 'third'],
        jake: ['second']
      })
    });
  });

  describe('.invertObj() - Returns a new object with the keys of the given object as values, and the values of the given object, which are coerced to strings, as keys. Note that the last key found is preferred when handling the same value.', () => {
    it('should invert keys with values', () => {
      var raceResults = {
        first: 'alice',
        second: 'jake'
      };
      var result = R.invertObj(raceResults);

      expect(result).to.eql({ 'alice': 'first', 'jake': 'second' })
    });
  });

  describe('.invoker() - Turns a named method with a specified arity into a function that can be called directly supplied with arguments and a target object.', () => {
    it('should invoke function with arity', () => {
      var sliceFrom = R.invoker(1, 'slice');
      var result = sliceFrom(6, 'abcdefghijklm');

      expect(result).to.eql('ghijklm');
    });
  });

  describe('.is() - See if an object (val) is an instance of the supplied constructor. This function will check up the inheritance chain, if any.', () => {
    it('should check if object is of given type', () => {
      expect(R.is(String, 's')).to.be.true;
    });
  });

  describe('.isEmpty() - Returns true if the given value is its types empty value; false otherwise.', () => {
    it('should check emptyness', () => {
      expect(R.isEmpty('')).to.be.true;
      expect(R.isEmpty([])).to.be.true;
    });
  });

  describe('.isNil() - Checks if the input value is null or undefined.', () => {
    it('should check null or undefined', () => {
      expect(R.isNil(undefined)).to.be.true;
      expect(R.isNil(null)).to.be.true;
      expect(R.isNil(0)).to.be.false;
    });
  });

  describe('.join() - Returns a string made by inserting the separator between each element and concatenating all the elements into a single string.', () => {
    it('should join with specified separator', () => {
      expect(R.join('|', [1, 2, 3])).to.eql('1|2|3');
    });
  });

  describe('.juxt() - juxt applies a list of functions to a list of values.', () => {
    it('should apply array of functions to array of args, returning also array with same size', () => {
      expect(R.juxt([Math.min, Math.max])(3, 4, 9, -3)).to.eql([-3, 9]);
    });
  });

  describe('.keys() - Returns a list containing the names of all the enumerable own properties of the supplied object.', () => {
    it('should return list of keys of the object', () => {
      expect(R.keys({ a: 1, b: 2, c: 3 })).to.eql(['a', 'b', 'c']);
    });
  });

  describe('.keysIn() - Returns a list containing the names of all the properties of the supplied object, including prototype properties.', () => {
    it('should return list of keys including prototype chain', () => {
      var F = function () { this.x = 'X'; };
      F.prototype.y = 'Y';
      var f = new F();

      expect(R.keysIn(f)).to.eql(['x', 'y']);
    });
  });

  describe('.last() - Returns the last element of the given list or string.', () => {
    it('should return last element', () => {
      expect(R.last(['fi', 'fo', 'fum'])).to.eql('fum');
    });
  });

  describe('.lastIndexOf() - Returns the position of the last occurrence of an item in an array, or -1 if the item is not included in the array.', () => {
    it('should return position of last found element', () => {
      expect(R.lastIndexOf(3, [-1, 3, 3, 0, 1, 2, 3, 4])).to.eql(6);
    });
  });

  describe('.length() - Returns the number of elements in the array by returning list.length.', () => {
    it('should return list length', () => {
      expect(R.length([1, 2, 3])).to.eql(3);
    });
  });

  describe('.lens() - Returns a lens for the given getter and setter functions. The getter "gets" the value of the focus; the setter "sets" the value of the focus. The setter should not mutate the data structure.', () => {
    it('should return lens by providing getter and setter. Moves focus to property of the object with immutable fashion..', () => {
      var xLens = R.lens(R.prop('x'), R.assoc('x'));

      expect(R.view(xLens, { x: 1, y: 2 })).to.eql(1);
    });
  });

  describe('.lensIndex() - Returns a lens whose focus is the specified index.', () => {
    it('should return lens at given index. no need to provide getter and setter like in .lens() version.', () => {
      var headLens = R.lensIndex(0);
      var atZero = R.view(headLens, ['a', 'b', 'c']);

      expect(atZero).to.eql('a');

      var setAtZero = R.set(headLens, 'x', ['a', 'b', 'c']);

      expect(setAtZero).to.eql(['x', 'b', 'c']);

      var setUppCase = R.over(headLens, R.toUpper, ['a', 'b', 'c']);

      expect(setUppCase).to.eql(['A', 'b', 'c']);
    });
  });

  describe('.lensPath() - Returns a lens whose focus is the specified path.', () => {
    it('should return lens which is focused on the path given.', () => {
      var xHeadYLens = R.lensPath(['x', 0, 'y']);

      var result = R.view(xHeadYLens, { x: [{ y: 2, z: 3 }, { y: 4, z: 5 }] });

      expect(result).to.eql(2);
    });
  });

  describe('.lensProp() - Returns a lens whose focus is the specified property.', () => {
    it('should return property pointed by lens', () => {
      var xLens = R.lensProp('x');

      var result = R.view(xLens, { x: 1, y: 2 });

      expect(result).to.eql(1);
    });
  });

  describe('.lift() - Lifts a function of arity > 1 so that it may "map over" a list, Function or other object that satisfies the FantasyLand Apply spec.', () => {
    it('should ?', () => {
      var madd3 = R.lift((a, b, c) => a + b + c);

      var result = madd3([1, 2, 3], [1, 2, 3], [1]);

      expect(result).to.eql([3, 4, 5, 4, 5, 6, 5, 6, 7]);
    });
  });

  describe('.liftN() - Lifts a function to be the specified arity, so that it may "map over" that many lists, Functions or other objects that satisfy the FantasyLand Apply spec.', () => {
    it('should ?', () => {
      var madd3 = R.liftN(3, (...args) => R.sum(args));
      var result = madd3([1, 2, 3], [1, 2, 3], [1]);

      expect(result).to.eql([3, 4, 5, 4, 5, 6, 5, 6, 7]);
    });
  });

  describe('.lt() - Returns true if the first argument is less than the second; false otherwise.', () => {
    it('should return true of first arg less than second', () => {
      expect(R.lt(1, 1)).to.be.false;
      expect(R.lt(1, 2)).to.be.true;
    });
  });

  describe('.lte() - Returns true if the first argument is less than or equal the second; false otherwise.', () => {
    it('should return true of first arg less than or equal second', () => {
      expect(R.lte(1, 1)).to.be.true;
      expect(R.lte(1, 2)).to.be.true;
      expect(R.lte(2, 1)).to.be.false;
    });
  });

  describe('.map() - Takes a function and a functor, applies the function to each of the functors values, and returns a functor of the same shape.', () => {
    it('should work like normal map does', () => {
      var double = x => x * 2;

      var result = R.map(double, [1, 2, 3]);

      expect(result).to.eql([2, 4, 6]);
    });
  });

  describe('.mapAccum() - The mapAccum function behaves like a combination of map and reduce; it applies a function to each element of a list, passing an accumulating parameter from left to right, and returning a final value of this accumulator together with the new list.', () => {
    it('should ?', () => {
      var digits = ['1', '2', '3', '4'];
      var appender = (a, b) => [a + b, a + b];

      var result = R.mapAccum(appender, 0, digits);

      expect(result).to.eql(['01234', ['01', '012', '0123', '01234']]);
    });
  });

  describe('.mapAccumRight() - The mapAccumRight function behaves like a combination of map and reduce; it applies a function to each element of a list, passing an accumulating parameter from right to left, and returning a final value of this accumulator together with the new list.', () => {
    it('should ?', () => {
      var digits = ['1', '2', '3', '4'];
      var append = (a, b) => [a + b, a + b];

      var result = R.mapAccumRight(append, 5, digits);

      expect(result).to.eql([['12345', '2345', '345', '45'], '12345']);
    });
  });

  describe('.mapObjIndexed() - An Object-specific version of map. The function is applied to three arguments: (value, key, obj). If only the value is significant, use map instead.', () => {
    it('should work as map but for objects', () => {
      var values = { x: 1, y: 2, z: 3 };
      var prependKeyAndDouble = (num, key, obj) => key + (num * 2);

      var result = R.mapObjIndexed(prependKeyAndDouble, values);

      expect(result).to.eql({ x: 'x2', y: 'y4', z: 'z6' });
    });
  });

  describe('.match() - Tests a regular expression against a String. Note that this function will return an empty array when there are no matches.', () => {
    it('should test against string, returning null for non matches', () => {
      var result = R.match(/([a-z]a)/g, 'bananas');
      expect(result).to.eql(['ba', 'na', 'na']);
    });
  });

  describe('.mathMod() - mathMod behaves like the modulo operator should mathematically, unlike the % operator (and by extension, R.modulo).', () => {
    it('should do modulo math operator, requires integer arguments', () => {
      var clock = R.mathMod(R.__, 12);

      expect(clock(15)).to.eql(3);
      expect(clock(24)).to.eql(0);
    });
  });

  describe('.max() - Returns the larger of its two arguments.', () => {
    it('should give bigger argument', () => {
      expect(R.max(5, 12)).to.eql(12);
    });
  });

  describe('.maxBy() - Takes a function and two values, and returns whichever value produces the larger result when passed to the provided function.', () => {
    it('should give bigger argument using provided function', () => {
      var square = n => n * n;

      var result = R.maxBy(square, -3, 2); //=> -3

      expect(result).to.eql(-3);
    });
  });

  describe('.mean() - Returns the mean of the given list of numbers.', () => {
    it('should calculate mean', () => {
      expect(R.mean([1, 2, 3])).to.eql(2);
    });
  });

  describe('.median() - Returns the median of the given list of numbers.', () => {
    it('should calculate median', () => {
      expect(R.median([2, 9, 7])).to.eql(7);
    });
  });

  describe('.memoize() - Creates a new function that, when invoked, caches the result of calling fn for a given argument set and returns the result. Subsequent calls to the memoized fn with the same argument set will not result in an additional call to fn; instead, the cached result for that set of arguments will be returned.', () => {
    it('should cache results for given arguments', () => {
      var count = 0;

      var factorial = R.memoize(n => {
        count += 1;
        return R.product(R.range(1, n + 1));
      });

      factorial(5); //=> 120
      factorial(5); //=> 120
      factorial(5); //=> 120

      expect(count).to.eql(1);
    });
  });

  describe('.merge() - Create a new object with the own properties of the first object merged with the own properties of the second object. If a key exists in both objects, the value from the second object will be used.', () => {
    it('should just merge objects', () => {
      var result = R.merge({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
      expect(result).to.eql({ 'name': 'fred', 'age': 40 });
    });
  });

  describe('.mergeAll() - Merges a list of objects together into one object.', () => {
    it('should just merge list of objects', () => {
      var result = R.mergeAll([{ foo: 1 }, { bar: 2 }, { baz: 3 }]);
      expect(result).to.eql({ foo: 1, bar: 2, baz: 3 });
    });
  });

  describe('.mergeWith() - Creates a new object with the own properties of the two provided objects. If a key exists in both objects, the provided function is applied to the values associated with the key in each object, with the result being used as the value associated with the key in the returned object. The key will be excluded from the returned object if the resulting value is undefined.', () => {
    it('should merge objects, making decision if key exists in both objects', () => {
      var result = R.mergeWith(R.concat,
        { a: true, values: [10, 20] },
        { b: true, values: [15, 35] });

      expect(result).to.eql({ a: true, b: true, values: [10, 20, 15, 35] });
    });
  });

  describe('.mergeWithKey() - Creates a new object with the own properties of the two provided objects. If a key exists in both objects, the provided function is applied to the key and the values associated with the key in each object, with the result being used as the value associated with the key in the returned object. The key will be excluded from the returned object if the resulting value is undefined.', () => {
    it('should ?', () => {
      let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
      let result = R.mergeWithKey(concatValues,
        { a: true, thing: 'foo', values: [10, 20] },
        { b: true, thing: 'bar', values: [15, 35] });

      expect(result).to.eql({ a: true, b: true, thing: 'bar', values: [10, 20, 15, 35] });
    });
  });

  describe('.min() - Returns the smaller of its two arguments.', () => {
    it('should return smaller value', () => {
      expect(R.min(789, 123)).to.eql(123);
    });
  });

  describe('.minBy() - Takes a function and two values, and returns whichever value produces the smaller result when passed to the provided function.', () => {
    it('should return smaller value by given function', () => {
      var square = n => n * n;
      var result = R.minBy(square, -3, 2);

      expect(result).to.eql(2);
    });
  });

  describe('.modulo() - Divides the first parameter by the second and returns the remainder. Note that this function preserves the JavaScript-style behavior for modulo. For mathematical modulo see mathMod.', () => {
    it('should return reminder', () => {
      expect(R.modulo(17, 3)).to.eql(2);
    });
  });

  describe('.multiply() - Multiplies two numbers. Equivalent to a * b but curried.', () => {
    it('should multiply values', () => {
      expect(R.multiply(3, 4)).to.eql(12);
    });
  });

  describe('.nAry() - Wraps a function of any arity (including nullary) in a function that accepts exactly n parameters. Any extraneous parameters will not be passed to the supplied function.', () => {
    it('should make function n-ary, ingoring rest of params', () => {
      var takesTwoArgs = (a, b) => [a, b];

      expect(takesTwoArgs.length).to.eql(2);

      var takesOneArg = R.nAry(1, takesTwoArgs);

      expect(takesOneArg.length).to.eql(1);
    });
  });

  describe('.negate() - Negates its argument.', () => {
    it('should negate argument', () => {
      expect(R.negate(4)).to.eql(-4);
    });
  });

  describe('.none() - Returns true if no elements of the list match the predicate, false otherwise.', () => {
    it('should negate argument', () => {
      var isEven = n => n % 2 === 0;

      expect(R.none(isEven, [1, 3, 5, 7, 9, 11])).to.be.true;
    });
  });

  describe('.not() -  function that returns the ! of its argument. It will return true when passed false-y value, and false when passed a truth-y one.', () => {
    it('should ! argument', () => {
      var isEven = n => n % 2 === 0;

      expect(R.not(true)).to.be.false;
    });
  });

  describe('.nth() - Returns the nth element of the given list or string. If n is negative the element at index length + n is returned.', () => {
    it('should get nth arg of the list', () => {
      expect(R.nth(2, [1, 2, 3, 4])).to.be.eql(3);
    });
  });

  describe('.nthArg() - Returns a function which returns its nth argument.', () => {
    it('should get function which returns nth argument', () => {
      const fnWith2Arg = R.nthArg(2);
      expect(fnWith2Arg(1, 2, 3)).to.be.eql(3);
    });
  });

  describe('.objOf() - Creates an object containing a single key:value pair.', () => {
    it('should create key/value pair', () => {
      const result = R.objOf('key', 'value');
      expect(result).to.eql({ key: 'value' });
    });
  });

  describe('.of() - Returns a singleton array containing the value provided.', () => {
    it('should return array with value provided - singleton', () => {
      const result = R.of(5);
      expect(result).to.eql([5]);
    });
  });

  describe('.omit() - Returns a partial copy of an object omitting the keys specified.', () => {
    it('should return copy of object ommiting key specified', () => {
      const result = R.omit(['a'], { a: 1, b: 2, c: 3 });
      expect(result).to.eql({ b: 2, c: 3 });
    });
  });

  describe('.once() - Accepts a function fn and returns a function that guards invocation of fn such that fn can only ever be called once, no matter how many times the returned function is invoked. The first value calculated is returned in subsequent invocations.', () => {
    it('should make function callable only once', () => {
      const spy = sinon.spy();
      var addOneOnce = R.once(spy);

      addOneOnce(5);
      addOneOnce(5);
      addOneOnce(5);

      expect(spy.callCount).to.eql(1);
    });
  });

  describe('.or() - Returns true if one or both of its arguments are true. Returns false if both arguments are false.', () => {
    it('should get true if whether one of args is true', () => {
      expect(R.or(true, false)).to.be.true;
    });
  });

  describe('.over() - Returns the result of "setting" the portion of the given data structure focused by the given lens to the result of applying the given function to the focused value.', () => {
    it('should make operation over lensed element', () => {
      var headLens = R.lensIndex(0);

      var result = R.over(headLens, R.toUpper, ['foo', 'bar', 'baz']);

      expect(result).to.eql(['FOO', 'bar', 'baz']);
    });
  });

  describe('.pair() - Takes two arguments, fst and snd, and returns [fst, snd].', () => {
    it('should return array of provided args', () => {
      expect(R.pair(true, false)).to.eql([true, false]);
    });
  });

  describe('.partial() - Takes a function f and a list of arguments, and returns a function g. When applied, g returns the result of applying f to the arguments provided initially followed by the arguments provided to g.', () => {
    it('should make partial apply and return a function which now requires less arguments to call', () => {
      var multiply2 = (a, b) => a * b;
      var double = R.partial(multiply2, [2]);
      var result = double(2);

      expect(result).to.eql(4);
    });
  });

  describe('.partialRight() - Takes a function f and a list of arguments, and returns a function g. When applied, g returns the result of applying f to the arguments provided to g followed by the arguments provided initially.', () => {
    it('should make right partial apply and return a function which now requires less arguments to call', () => {
      var greet = (salutation, title, firstName, lastName) =>
        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';

      var greetMsJaneJones = R.partialRight(greet, ['Ms.', 'Jane', 'Jones']);

      var result = greetMsJaneJones('Hello');

      expect(result).to.eql('Hello, Ms. Jane Jones!');
    });
  });

  describe('.partition() - Takes a predicate and a list or other "filterable" object and returns the pair of filterable objects of the same type of elements which do and do not satisfy, the predicate, respectively.', () => {
    it('should make segragation to elements which satisfy predicate and those which dont', () => {
      var result = R.partition(R.contains('s'), ['sss', 'ttt', 'foo', 'bars']);
      expect(result).to.eql([['sss', 'bars'], ['ttt', 'foo']]);
    });
  });

  describe('.path() - Retrieve the value at a given path.', () => {
    it('should retrieve value by path with no NPEs :)', () => {
      var result = R.path(['a', 'b'], { a: { b: 2 } });

      expect(result).to.eql(2);
    });
  });

  describe('.pathEq() - Determines whether a nested path on an object has a specific value, in R.equals terms. Most likely used to filter a list.', () => {
    it('should check for element exists with given value', () => {
      var user1 = { address: { zipCode: 90210 } };
      var result = R.pathEq(['address', 'zipCode'], 90210, user1);

      expect(result).to.be.true;
    });
  });

  describe('.pathSatisfies() - Returns true if the specified object property at given path satisfies the given predicate; false otherwise.', () => {
    it('should return boolean telling if given path satisfied predicate provided', () => {
      var result = R.pathSatisfies(y => y > 0, ['x', 'y'], { x: { y: 2 } });

      expect(result).to.be.true;
    });
  });

  describe('.pick() - Returns a partial copy of an object containing only the keys specified. If the key does not exist, the property is ignored.', () => {
    it('should return copied object with given keys only', () => {
      var result = R.pick(['a', 'd'], { a: 1, b: 2, c: 3, d: 4 });

      expect(result).to.eql({ a: 1, d: 4 });
    });
  });

  describe('.pickAll() - Similar to pick except that this one includes a key: undefined pair for properties that dont exist.', () => {
    it('should return copied object with given keys only giving undefined for keys not existing', () => {
      var result = R.pickAll(['a', 'e', 'f'], { a: 1, b: 2, c: 3, d: 4 });

      expect(result).to.eql({ a: 1, e: undefined, f: undefined });
    });
  });

  describe('.pickBy() - Returns a partial copy of an object containing only the keys that satisfy the supplied predicate.', () => {
    it('should return copied object with given keys satisfying predicate', () => {
      var isUpperCase = (val, key) => key.toUpperCase() === key;
      var result = R.pickBy(isUpperCase, { a: 1, b: 2, A: 3, B: 4 });

      expect(result).to.eql({ A: 3, B: 4 });
    });
  });

  describe('.pipe() - Performs left-to-right function composition. The leftmost function may have any arity; the remaining functions must be unary.', () => {
    it('should make left to right coposition', () => {
      var f = R.pipe(Math.pow, R.negate, R.inc);

      expect(f(4, 2)).to.eql(-15);
    });
  });

  describe('.pipeK() - Returns the left-to-right Kleisli composition of the provided functions, each of which must return a value of a type supported by chain.', () => {
    it('should ?', () => {

    });
  });

  describe('.pipeP() - Performs left-to-right composition of one or more Promise-returning functions. The leftmost function may have any arity; the remaining functions must be unary.', () => {
    it('should make pipe with promises', () => {
      var promiseA = Promise.resolve(5);
      var promiseB = Promise.resolve(6);

      const loadUser = userId => Promise.resolve('user:' + userId);
      const loadAssets = assetId => Promise.resolve('assets:' + assetId);

      var piped = R.pipeP(loadUser, loadAssets);

      return piped('5')
        .then(val => {
          expect(val).to.eql('assets:user:5')
        });
    });
  });

  describe('.pluck() - Returns a new list by plucking the same named property off all objects in the list supplied.', () => {
    it('should retrieve array of pointed props', () => {
      var result = R.pluck('a')([{ a: 1 }, { a: 2 }]);

      expect(result).to.eql([1, 2]);
    });
  });

  describe('.prepend() - Returns a new list with the given element at the front, followed by the contents of the list.', () => {
    it('should return list prepended with values.', () => {
      var result = R.prepend('fee', ['fi', 'fo', 'fum']);

      expect(result).to.eql(['fee', 'fi', 'fo', 'fum']);
    });
  });

  describe('.product() - Multiplies together all the elements of a list.', () => {
    it('should make multiplication', () => {
      var result = R.product([2, 4, 6]);

      expect(result).to.eql(48);
    });
  });

  describe('.project() - Reasonable analog to SQL select statement.', () => {
    it('should select given proprs from array of objects containing those props', () => {
      var abby = { name: 'Abby', age: 7, hair: 'blond', grade: 2 };
      var fred = { name: 'Fred', age: 12, hair: 'brown', grade: 7 };
      var kids = [abby, fred];
      var result = R.project(['name', 'grade'], kids);

      expect(result).to.eql([{ name: 'Abby', grade: 2 }, { name: 'Fred', grade: 7 }]);
    });
  });

  describe('.prop() - Returns a function that when supplied an object returns the indicated property of that object, if it exists.', () => {
    it('should get prop of object', () => {
      var result = R.prop('x', { x: 100 });

      expect(result).to.eql(100);
    });
  });

  describe('.propEq() - Returns true if the specified object property is equal, in R.equals terms, to the given value; false otherwise.', () => {
    it('should return true if prop equals to given param', () => {
      var abby = { name: 'Abby', age: 7, hair: 'blond' };
      var fred = { name: 'Fred', age: 12, hair: 'brown' };
      var rusty = { name: 'Rusty', age: 10, hair: 'brown' };
      var alois = { name: 'Alois', age: 15, disposition: 'surly' };
      var kids = [abby, fred, rusty, alois];

      var hasBrownHair = R.propEq('hair', 'brown');

      var result = R.filter(hasBrownHair, kids);

      expect(result).to.eql([fred, rusty]);
    });
  });

  describe('.propIs() - Returns true if the specified object property is of the given type; false otherwise.', () => {
    it('should return true if prop is of given type', () => {
      var result = R.propIs(Number, 'x', { x: 100 });

      expect(result).to.be.true;
    });
  });

  describe('.propOr() - If the given, non-null object has an own property with the specified name, returns the value of that property. Otherwise returns the provided default value.', () => {
    it('should return prop given by name or default', () => {
      var alice = {
        name: 'ALICE',
        age: 101
      };
      var favorite = R.prop('favoriteLibrary');
      var favoriteWithDefault = R.propOr('Ramda', 'favoriteLibrary');

      var resultProp = favorite(alice);
      var resultPropOr = favoriteWithDefault(alice);

      expect(resultProp).to.be.undefined;
      expect(resultPropOr).to.eql('Ramda');
    });
  });

  describe('.props() - Acts as multiple prop: array of keys in, array of values out. Preserves order.', () => {
    it('should return array of values pointed by names', () => {
      var result1 = R.props(['x', 'y'], { x: 1, y: 2 }); //=> [1, 2]
      var result2 = R.props(['c', 'a', 'b'], { b: 2, a: 1 }); //=> [undefined, 1, 2]


      expect(result1).to.eql([1, 2]);
      expect(result2).to.eql([undefined, 1, 2]);
    });
  });

  describe('.propSatisfies() - Returns true if the specified object property satisfies the given predicate; false otherwise.', () => {
    it('should return true if prop satisfies given predicate', () => {
      var result = R.propSatisfies(x => x > 0, 'x', { x: 1, y: 2 });
      expect(result).to.be.true;
    });
  });

  describe('.range() - Returns a list of numbers from from (inclusive) to to (exclusive).', () => {
    it('should return array of numbers', () => {
      var result = R.range(1, 5);
      expect(result).to.eql([1, 2, 3, 4]);
    });
  });

  describe('.reduce() - Returns a single item by iterating through the list, successively calling the iterator function and passing it an accumulator value and the current value from the array, and then passing the result to the next call.', () => {
    it('should act as reduce well known from js core and more..', () => {
      var result = R.reduce(R.subtract, 0, [1, 2, 3, 4]) // ((((0 - 1) - 2) - 3) - 4) = -10
      expect(result).to.eql(-10);
    });
  });

  describe('.reduceBy() - Groups the elements of the list according to the result of calling the String-returning function keyFn on each element and reduces the elements of each group to a single value via the reducer function valueFn.', () => {
    it('should ?', () => {
      var reduceToNamesBy = R.reduceBy((acc, student) => acc.concat(student.name), []);
      var namesByGrade = reduceToNamesBy(function (student) {
        var score = student.score;
        return score < 65 ? 'F' :
          score < 70 ? 'D' :
            score < 80 ? 'C' :
              score < 90 ? 'B' : 'A';
      });
      var students = [{ name: 'Lucy', score: 92 },
      { name: 'Drew', score: 85 },
      // ...
      { name: 'Bart', score: 62 }];
      namesByGrade(students);
    });
  });

  describe('.reduced() - Returns a value wrapped to indicate that it is the final value of the reduce and transduce functions. The returned value should be considered a black box: the internal structure is not guaranteed to be stable.', () => {
    it('should ?', () => {
      var result = R.reduce(
        R.pipe(R.add, R.when(R.gte(R.__, 10), R.reduced)),
        0,
        [1, 2, 3, 4, 5]
      )
    });
  });

  describe('.reduceRight() - Returns a single item by iterating through the list, successively calling the iterator function and passing it an accumulator value and the current value from the array, and then passing the result to the next call.', () => {
    it('should act as reduce well known from js core but from right to left', () => {
      var result = R.reduceRight(R.subtract, 0, [1, 2, 3, 4]) // => (1 - (2 - (3 - (4 - 0)))) = -2
      expect(result).to.eql(-2);
    });
  });

  describe('.reduceWhile() - Like reduce, reduceWhile returns a single item by iterating through the list, successively calling the iterator function. reduceWhile also takes a predicate that is evaluated before each step. If the predicate returns false, it "short-circuits" the iteration and returns the current value of the accumulator.', () => {
    it('should ', () => {
      var isOdd = (acc, x) => x % 2 === 1;
      var xs = [1, 3, 5, 60, 777, 800];
      var result = R.reduceWhile(isOdd, R.add, 0, xs);

      expect(result).to.eql(9);
    });
  });

  describe('.reject() - The complement of filter.', () => {
    it('should reject by predicate', () => {
      var isOdd = (n) => n % 2 === 1;

      var result = R.reject(isOdd, [1, 2, 3, 4]);

      expect(result).to.eql([2, 4]);
    });
  });

  describe('.remove() - Removes the sub-list of list starting at index start and containing count elements. Note that this is not destructive: it returns a copy of the list with the changes. No lists have been harmed in the application of this function.', () => {
    it('should remove items from array', () => {
      var result = R.remove(2, 3, [1, 2, 3, 4, 5, 6, 7, 8]);

      expect(result).to.eql([1, 2, 6, 7, 8]);
    });
  });

  describe('.repeat() - Returns a fixed list of size n containing a specified identical value.', () => {
    it('should generate identical values n times', () => {
      var result = R.repeat('hi', 5)

      expect(result).to.eql(['hi', 'hi', 'hi', 'hi', 'hi']);
    });
  });

  describe('.replace() - Replace a substring or regex match in a string with a replacement.', () => {
    it('should generate identical values n times', () => {
      var result = R.replace(/foo/g, 'bar', 'foo foo foo');

      expect(result).to.eql('bar bar bar');
    });
  });

  describe('.reverse() - Returns a new list or string with the elements or characters in reverse order.', () => {
    it('should generate identical values n times', () => {
      var result1 = R.reverse([1, 2, 3]);
      var result2 = R.reverse('abc');

      expect(result1).to.eql([3, 2, 1]);
      expect(result2).to.eql('cba');
    });
  });

  describe('.scan() - Scan is similar to reduce, but returns a list of successively reduced values from the left.', () => {
    it('should reduce with emitting values in the meantime', () => {
      var numbers = [1, 2, 3, 4];
      var factorials = R.scan(R.multiply, 1, numbers);

      expect(factorials).to.eql([1, 1, 2, 6, 24]);
    });
  });

  describe('.sequence() - Transforms a Traversable of Applicative into an Applicative of Traversable. Dispatches to the sequence method of the second argument, if present.', () => {
    it('should ?', () => {

    });
  });

  describe('.set() - Returns the result of "setting" the portion of the given data structure focused by the given lens to the given value.', () => {
    it('should set lensed prop to given value returning copied new object', () => {
      var xLens = R.lensProp('x');
      var result = R.set(xLens, 4, { x: 1, y: 2 });

      expect(result).to.eql({ x: 4, y: 2 });
    });
  });

  describe('.slice() - Returns the elements of the given list or string (or object with a slice method) from fromIndex (inclusive) to toIndex (exclusive).', () => {
    it('should return part of the array', () => {
      var result = R.slice(1, 3, ['a', 'b', 'c', 'd']);

      expect(result).to.eql(['b', 'c']);
    });
  });

  describe('.sort() - Returns a copy of the list, sorted according to the comparator function, which should accept two values at a time and return a negative number if the first value is smaller, a positive number if its larger, and zero if they are equal. Please note that this is a copy of the list. It does not modify the original.', () => {
    it('should return copy of the list sorted with comparator function', () => {
      var diff = function (a, b) { return a - b; };
      var result = R.sort(diff, [4, 2, 7, 5]);

      expect(result).to.eql([2, 4, 5, 7]);
    });
  });

  describe('.sortBy() - Sorts the list according to the supplied function.', () => {
    it('should return copy of the list sorted with provided function', () => {
      var sortByFirstItem = R.sortBy(R.prop(0));
      var pairs = [[-1, 1], [-2, 2], [-3, 3]];
      var res = sortByFirstItem(pairs);
      expect(res).to.eql([[-3, 3], [-2, 2], [-1, 1]]);

      var alice = {
        name: 'ALICE',
        age: 101
      };
      var bob = {
        name: 'Bob',
        age: -10
      };
      var clara = {
        name: 'clara',
        age: 314.159
      };
      var people = [clara, bob, alice];
      var sortByNameCaseInsensitive = R.sortBy(R.compose(R.toLower, R.prop('name')));
      var res2 = sortByNameCaseInsensitive(people);

      expect(res2).to.eql([alice, bob, clara]);
    });
  });

  describe('.sortWith() - Sorts a list according to a list of comparators.', () => {
    it('should return copy of the list sorted with list of comparator functions', () => {
      var alice = {
        name: 'alice',
        age: 40
      };
      var bob = {
        name: 'bob',
        age: 30
      };
      var clara = {
        name: 'clara',
        age: 40
      };

      var people = [clara, bob, alice];
      var ageNameSort = R.sortWith([
        R.descend(R.prop('age')),
        R.ascend(R.prop('name'))
      ]);

      var result = ageNameSort(people);

      expect(result).to.eql([alice, clara, bob]);
    });
  });

  describe('.split() - Splits a string into an array of strings based on the given separator.', () => {
    it('should split array to strings', () => {
      var result = R.split('.', 'a.b.c.xyz.d')

      expect(result).to.eql(['a', 'b', 'c', 'xyz', 'd']);
    });
  });

  describe('.splitAt() - Splits a given list or string at a given index.', () => {
    it('should split array to strings at a given index', () => {
      var result = R.splitAt(5, 'hello world');

      expect(result).to.eql(['hello', ' world']);
    });
  });

  describe('.splitEvery() - Splits a collection into slices of the specified length.', () => {
    it('should split collection to slices with given size', () => {
      var result = R.splitEvery(3, [1, 2, 3, 4, 5, 6, 7]);

      expect(result).to.eql([[1, 2, 3], [4, 5, 6], [7]]);
    });
  });

  describe('.splitWhen() - Takes a list and a predicate and returns a pair of lists with the following properties.', () => {
    it('should split collection based on predicate result', () => {
      var result = R.splitWhen(R.equals(2), [1, 2, 3, 1, 2, 3]);

      expect(result).to.eql([[1], [2, 3, 1, 2, 3]]);
    });
  });

  describe('.substract() - Subtracts its second argument from its first argument.', () => {
    it('should just substract', () => {
      var result = R.subtract(10, 8);

      expect(result).to.eql(2);
    });
  });

  describe('.sum() - Adds together all the elements of a list.', () => {
    it('should just sum', () => {
      var result = R.sum([2, 4, 6, 8, 100, 1]);

      expect(result).to.eql(121);
    });
  });

  describe('.symmetricDifference() - Finds the set (i.e. no duplicates) of all elements contained in the first or second list, but not both.', () => {
    it('should find symmetric difference', () => {
      var result = R.symmetricDifference([1, 2, 3, 4], [7, 6, 5, 4, 3]);

      expect(result).to.eql([1, 2, 7, 6, 5]);
    });
  });

  describe('.T() - A function that always returns true. Any passed in parameters are ignored.', () => {
    it('should return true', () => {
      expect(R.T()).to.be.true;
    });
  });

  describe('.tail() - Returns all but the first element of the given list or string (or object with a tail method).', () => {
    it('should return tail', () => {
      const result = R.tail([1, 2, 3]);
      expect(result).to.eql([2, 3]);
    });
  });

  describe('.take() - Returns the first n elements of the given list, string, or transducer/transformer (or object with a take method).', () => {
    it('should return n elements from list/string/etc', () => {
      const result1 = R.take(2, ['foo', 'bar', 'baz']);
      const result2 = R.take(3, 'hello');

      expect(result1).to.eql(['foo', 'bar']);
      expect(result2).to.eql('hel');
    });
  });

  describe('.takeLast() - Returns a new list containing the last n elements of the given list. If n > list.length, returns a list of list.length elements.', () => {
    it('should return n last elements from list/string/etc', () => {
      const result1 = R.takeLast(2, ['foo', 'bar', 'baz']);
      const result2 = R.takeLast(3, 'hello');

      expect(result1).to.eql(['bar', 'baz']);
      expect(result2).to.eql('llo');
    });
  });

  describe('.takeLastWhile() - Returns a new list containing the last n elements of a given list, passing each value to the supplied predicate function, and terminating when the predicate function returns false. Excludes the element that caused the predicate function to fail. The predicate function is passed one argument: (value).', () => {
    it('should return n last elements if predicate allows', () => {
      var isNotOne = x => x !== 1;
      const result = R.takeLastWhile(isNotOne, [1, 2, 3, 4]);

      expect(result).to.eql([2, 3, 4]);
    });
  });

  describe('.takeWhile() - Returns a new list containing the first n elements of a given list, passing each value to the supplied predicate function, and terminating when the predicate function returns false. Excludes the element that caused the predicate function to fail. The predicate function is passed one argument: (value).', () => {
    it('should return list with copy of elements until predicate returns false', () => {
      var isNotFour = x => x !== 4;
      const result = R.takeWhile(isNotFour, [1, 2, 3, 4, 3, 2, 1]);

      expect(result).to.eql([1, 2, 3]);
    });
  });

  describe('.tap() - Runs the given function with the supplied object, then returns the object.', () => {
    it('should call function providing the param, then return the object', () => {

      const spy = sinon.spy();
      const result = R.tap(spy, 100);

      expect(spy.callCount).to.eql(1);
      expect(spy.calledWith(100)).to.be.true;
      expect(result).to.eql(100);
    });
  });

  describe('.test() - Determines whether a given string matches a given regular expression.', () => {
    it('should return true if matches regex', () => {
      const result = R.test(/^x/, 'xyz');

      expect(result).to.be.true;
    });
  });

  describe('.times() - Calls an input function n times, returning an array containing the results of those function calls. fn is passed one argument: The current value of n, which begins at 0 and is gradually incremented to n - 1.', () => {
    it('should return array with results', () => {
      const result = R.times(R.identity, 5);

      expect(result).to.eql([0, 1, 2, 3, 4]);
    });
  });

  describe('.toLower() - The lower case version of a string.', () => {
    it('should make lower case', () => {
      const result = R.toLower('XYZ');

      expect(result).to.eql('xyz');
    });
  });

  describe('.toPairs() - Converts an object into an array of key, value arrays. Only the objects own properties are used. Note that the order of the output array is not guaranteed to be consistent across different JS platforms.', () => {
    it('should make pairs from keys and values', () => {
      const result = R.toPairs({ a: 1, b: 2, c: 3 })

      expect(result).to.eql([['a', 1], ['b', 2], ['c', 3]]);
    });
  });

  describe('.toPairsIn() - Converts an object into an array of key, value arrays. The objects own properties and prototype properties are used. Note that the order of the output array is not guaranteed to be consistent across different JS platforms.', () => {
    it('should make pairs from keys and values including prototype chain', () => {
      var F = function () { this.x = 'X'; };
      F.prototype.y = 'Y';
      var f = new F();
      const result = R.toPairsIn(f);

      expect(result).to.eql([['x', 'X'], ['y', 'Y']]);
    });
  });

  describe('.toString() - Returns the string representation of the given value. evaling the output should result in a value equivalent to the input value.', () => {
    it('should make pairs from keys and values', () => {
      const result = R.toString([1, 2, 3]);

      expect(result).to.eql('[1, 2, 3]');
    });
  });

  describe('.toUpper() - The upper case version of a string.', () => {
    it('should make upper case', () => {
      const result = R.toUpper('xyz');

      expect(result).to.eql('XYZ');
    });
  });

  describe('.transduce() - Initializes a transducer using supplied iterator function. Returns a single item by iterating through the list, successively calling the transformed iterator function and passing it an accumulator value and the current value from the array, and then passing the result to the next call.', () => {
    it('should ?', () => {
      var numbers = [1, 2, 3, 4];
      var transducer = R.compose(R.map(R.add(1)), R.take(2));

      const result = R.transduce(transducer, R.flip(R.append), [], numbers);

      expect(result).to.eql([2, 3]);
    });
  });

  describe('.transpose() - Transposes the rows and columns of a 2D list. When passed a list of n lists of length x, returns a list of x lists of length n.', () => {
    it('should ?', () => {
      const result = R.transpose([[1, 'a'], [2, 'b'], [3, 'c']])

      expect(result).to.eql([[1, 2, 3], ['a', 'b', 'c']]);
    });
  });

  describe('.traverse() - Maps an Applicative-returning function over a Traversable, then uses sequence to transform the resulting Traversable of Applicative into an Applicative of Traversable.', () => {
    it('should ?', () => {
      // Returns `Nothing` if the given divisor is `0`
      // safeDiv = n => d => d === 0 ? Nothing() : Just(n / d)

      // R.traverse(Maybe.of, safeDiv(10), [2, 4, 5]); //=> Just([5, 2.5, 2])
      // R.traverse(Maybe.of, safeDiv(10), [2, 0, 5]); //=> Nothing
    });
  });

  describe('.trim() - Removes (strips) whitespace from both ends of the string.', () => {
    it('should trim string', () => {
      const result = R.trim('   xyz  ');
      expect(result).to.eql('xyz');
    });
  });

  describe('.tryCatch() - takes two functions, a tryer and a catcher. The returned function evaluates the tryer; if it does not throw, it simply returns the result. If the tryer does throw, the returned function evaluates the catcher function and returns its result. Note that for effective composition with this function, both the tryer and catcher functions must return the same type of results.', () => {
    it('should return value from that function which does not throw an error', () => {
      const result1 = R.tryCatch(R.prop('x'), R.F)({ x: true })
      expect(result1).to.be.true;

      const result2 = R.tryCatch(R.prop('x'), R.F)(null)
      expect(result2).to.be.false;
    });
  });

  describe('.type() - Gives a single-word string description of the (native) type of a value, returning such answers as Object, Number, Array, or Null. Does not attempt to distinguish user Object types any further, reporting them all as Object.', () => {
    it('should return type of argument as string name', () => {
      const t1 = R.type({});
      const t2 = R.type(1);
      const t3 = R.type(false);

      expect(t1).to.eql('Object');
      expect(t2).to.eql('Number');
      expect(t3).to.eql('Boolean');
    });
  });

  describe('.unapply() -  R.unapply derives a variadic function from a function which takes an array. R.unapply is the inverse of R.apply.', () => {
    it('should work as inverse of apply', () => {
      const result = R.unapply(JSON.stringify)(1, 2, 3);
      expect(result).to.eql('[1,2,3]');
    });
  });

  describe('.unary() -  Wraps a function of any arity (including nullary) in a function that accepts exactly 1 parameter. Any extraneous parameters will not be passed to the supplied function.', () => {
    it('should work as inverse of apply', () => {
      var takesTwoArgs = function (a, b) {
        return [a, b];
      };
      expect(takesTwoArgs.length).to.eql(2);
      expect(takesTwoArgs(1, 2)).to.eql([1, 2]);

      var takesOneArg = R.unary(takesTwoArgs);
      expect(takesOneArg.length).to.eql(1);
      // Only 1 argument is passed to the wrapped function
      takesOneArg(1, 2); //=> [1, undefined]
    });
  });

  describe('.uncurryN() -  Returns a function of arity n from a (manually) curried function.', () => {
    it('should uncurry to n levels making n levels arity function', () => {
      var addFour = a => b => c => d => a + b + c + d;

      var uncurriedAddFour = R.uncurryN(4, addFour);
      var result = uncurriedAddFour(1, 2, 3, 4);
      expect(result).to.eql(10);
    });
  });

  describe('.unfold() - Builds a list from a seed value. Accepts an iterator function, which returns either false to stop iteration or an array of length 2 containing the value to add to the resulting list and the seed to be used in the next call to the iterator function.', () => {
    it('should expand given value with formula provided as fn function', () => {
      var f = n => n > 50 ? false : [-n, n + 10];
      var result = R.unfold(f, 10);

      expect(result).to.eql([-10, -20, -30, -40, -50]);
    });
  });

  describe('.union() - Combines two lists into a set (i.e. no duplicates) composed of the elements of each list.', () => {
    it('should unify lists into one, with no duplicates', () => {
      var result = R.union([1, 2, 3], [2, 3, 4]);

      expect(result).to.eql([1, 2, 3, 4]);
    });
  });

  describe('.unionWith() - Combines two lists into a set (i.e. no duplicates) composed of the elements of each list. Duplication is determined according to the value returned by applying the supplied predicate to two list elements.', () => {
    it('should unify lists into one, with no duplicates, duplication is determined by predicate provided', () => {
      var l1 = [{ a: 1 }, { a: 2 }];
      var l2 = [{ a: 1 }, { a: 4 }];
      var result = R.unionWith(R.eqBy(R.prop('a')), l1, l2);

      expect(result).to.eql([{ a: 1 }, { a: 2 }, { a: 4 }]);
    });
  });

  describe('.uniq() - Returns a new list containing only one copy of each element in the original list. R.equals is used to determine equality.', () => {
    it('should return new list with unique items', () => {
      var result = R.uniq([1, 1, 2, 1])

      expect(result).to.eql([1, 2]);
    });
  });

  describe('.uniqWith() - Returns a new list containing only one copy of each element in the original list, based upon the value returned by applying the supplied predicate to two list elements. Prefers the first item if two items compare equal based on the predicate.', () => {
    it('should return new list with unique items based on predicate', () => {
      var strEq = R.eqBy(String);
      var result = R.uniqWith(strEq)([1, '1', 2, 1]);

      expect(result).to.eql([1, 2]);
    });
  });

  describe('.unless() - Tests the final argument by passing it to the given predicate function. If the predicate is not satisfied, the function will return the result of calling the whenFalseFn function with the same argument. If the predicate is satisfied, the argument is returned as is.', () => {
    it('should return value according to condition', () => {
      var coerceArray = R.unless(R.isArrayLike, R.of)
      var r1 = coerceArray([1, 2, 3]); //=> [1, 2, 3]
      var r2 = coerceArray(1);

      expect(r1).to.eql([1, 2, 3]);
      expect(r2).to.eql([1]);
    });
  });

  describe('.unnest() - Shorthand for R.chain(R.identity), which removes one level of nesting from any Chain.', () => {
    it('should unnest chain', () => {
      var result = R.unnest([[1, 2], [3, 4], [5, 6]]);

      expect(result).to.eql([1, 2, 3, 4, 5, 6]);
    });
  });

  describe('.until() - Takes a predicate, a transformation function, and an initial value, and returns a value of the same type as the initial value. It does so by applying the transformation until the predicate is satisfied, at which point it returns the satisfactory value.', () => {
    it('should call transformation as long as predicate is satisfied and returns final value', () => {
      var result = R.until(R.gt(R.__, 100), R.multiply(2))(1);

      expect(result).to.eql(128);
    });
  });

  describe('.update() - Returns a new copy of the array with the element at the provided index replaced with the given value.', () => {
    it('should replace given element at position with new value', () => {
      var result = R.update(1, 11, [0, 1, 2]);

      expect(result).to.eql([0, 11, 2]);
    });
  });

  describe('.useWith() - Accepts a function fn and a list of transformer functions and returns a new curried function. When the new function is invoked, it calls the function fn with parameters consisting of the result of calling each supplied handler on successive arguments to the new function.', () => {
    it('should ?', () => {
      R.useWith(Math.pow, [R.identity, R.identity])(3, 4); //=> 81
      R.useWith(Math.pow, [R.identity, R.identity])(3)(4); //=> 81
      R.useWith(Math.pow, [R.dec, R.inc])(3, 4); //=> 32
      R.useWith(Math.pow, [R.dec, R.inc])(3)(4); //=> 32
    });
  });

  describe('.values() - Returns a list of all the enumerable own properties of the supplied object. Note that the order of the output array is not guaranteed across different JS platforms.', () => {
    it('should return values from enumarable', () => {
      var result = R.values({ a: 1, b: 2, c: 3 });

      expect(result).to.eql([1, 2, 3]);
    });
  });

  describe('.valuesIn() - Returns a list of all the properties, including prototype properties, of the supplied object. Note that the order of the output array is not guaranteed to be consistent across different JS platforms.', () => {
    it('should return values from enumarable including prototype chain', () => {
      var F = function () { this.x = 'X'; };
      F.prototype.y = 'Y';
      var f = new F();
      var result = R.valuesIn(f);

      expect(result).to.eql(['X', 'Y']);
    });
  });

  describe('.view() - Returns a "view" of the given data structure, determined by the given lens. The lens focus determines which portion of the data structure is visible.', () => {
    it('should return view of pointed data structure', () => {
      var xLens = R.lensProp('z');
      var result = R.view(xLens, { x: 1, y: 2, z: { a: '1', b: 2 } });

      expect(result).to.eql({ a: '1', b: 2 });
    });
  });

  describe('.when() - Tests the final argument by passing it to the given predicate function. If the predicate is satisfied, the function will return the result of calling the whenTrueFn function with the same argument. If the predicate is not satisfied, the argument is returned as is.', () => {
    it('should call operation on data when predicate is satisfied, else just returning original value', () => {
      var truncate = R.when(
        R.propSatisfies(R.gt(R.__, 10), 'length'),
        R.pipe(R.take(10), R.append('…'), R.join(''))
      );

      var result = truncate('12345');
      expect(result).to.eql('12345');

      var result2 = truncate('0123456789ABC');
      expect(result2).to.eql('0123456789…');
    });
  });

  describe('.where() - Takes a spec object and a test object; returns true if the test satisfies the spec. Each of the specs own properties must be a predicate function. Each predicate is applied to the value of the corresponding property of the test object. where returns true if all the predicates return true, false otherwise.', () => {
    it('should return true if object looks like spec says', () => {
      var pred = R.where({
        a: R.equals('foo'),
        b: R.complement(R.equals('bar')),
        x: R.gt(R.__, 10),
        y: R.lt(R.__, 20)
      });

      var r1 = pred({ a: 'foo', b: 'xxx', x: 11, y: 19 });
      var r2 = pred({ a: 'xxx', b: 'xxx', x: 11, y: 19 });

      expect(r1).to.be.true;
      expect(r2).to.be.false;
    });
  });

  describe('.whereEq() - Takes a spec object and a test object; returns true if the test satisfies the spec, false otherwise. An object satisfies the spec if, for each of the specs own properties, accessing that property of the object gives the same value (in R.equals terms) as accessing that property of the spec.', () => {
    it('should return true if object matches the spec', () => {
      var pred = R.whereEq({ a: 1, b: 2 });

      var r1 = pred({ a: 1 });
      var r2 = pred({ a: 1, b: 2 });
      var r3 = pred({ a: 1, b: 2, c: 3 });

      expect(r1).to.be.false;
      expect(r2).to.be.true;
      expect(r3).to.be.true;
    });
  });

  describe('.without() - Returns a new list without values in the first argument. R.equals is used to determine equality.', () => {
    it('should return copy of list without args passed', () => {
      var result = R.without([1, 2], [1, 2, 1, 3, 4]);

      expect(result).to.eql([3, 4]);
    });
  });

  describe('.without() - Returns a new list without values in the first argument. R.equals is used to determine equality.', () => {
    it('should return copy of list without args passed', () => {
      var result = R.without([1, 2], [1, 2, 1, 3, 4]);

      expect(result).to.eql([3, 4]);
    });
  });

  describe('.xprod() - Creates a new list out of the two supplied by creating each possible pair from the lists.', () => {
    it('should return prod with all combinations possible', () => {
      var result = R.xprod([1, 2], ['a', 'b']);

      expect(result).to.eql([[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]);
    });
  });

  describe('.zip() - Creates a new list out of the two supplied by pairing up equally-positioned items from both lists. The returned list is truncated to the length of the shorter of the two input lists. Note: zip is equivalent to zipWith(function(a, b) { return [a, b] }).', () => {
    it('should zip items', () => {
      var result = R.zip([1, 2, 3], ['a', 'b', 'c']);

      expect(result).to.eql([[1, 'a'], [2, 'b'], [3, 'c']]);
    });
  });

  describe('.zipObj() - Creates a new object out of a list of keys and a list of values. Key/value pairing is truncated to the length of the shorter of the two lists. Note: zipObj is equivalent to pipe(zipWith(pair), fromPairs).', () => {
    it('should zip to object', () => {
      var result = R.zipObj(['a', 'b', 'c'], [1, 2, 3]);

      expect(result).to.eql({ a: 1, b: 2, c: 3 });
    });
  });

  describe('.zipWith() - Creates a new list out of the two supplied by applying the function to each equally-positioned pair in the lists. The returned list is truncated to the length of the shorter of the two input lists.', () => {
    it('should zip with function which decides how to combine two items from arrays.', () => {
      var f = (x, y) => {
        return x + y;
      };
      var result = R.zipWith(f, [1, 2, 3], ['a', 'b', 'c']);

      expect(result).to.eql(['1a', '2b', '3c']);
    });
  });
});
