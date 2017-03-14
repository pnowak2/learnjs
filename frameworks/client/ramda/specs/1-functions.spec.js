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

  describe('.intersectionWith() - Combines two lists into a set (i.e. no duplicates) composed of those elements common to both lists.', () => {
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

      expect(result).to.eql([{id: 456, name: 'Stephen Stills'}, {id: 177, name: 'Neil Young'}]);
    });
  });
});