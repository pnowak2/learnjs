import { expect } from 'chai';
import R from 'ramda';
import _ from 'lodash';
import sinon from 'sinon';
import { Wrapper, wrap } from '../src/model/functor-wrapper';
import { MonadWrapper, monadwrap } from '../src/model/monad-functor-wrapper';
import { Maybe, Just, Nothing } from '../src/model/monads/maybe.monad';
import { Either, Left, Right } from '../src/model/monads/either.monad';

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
        const result = MonadWrapper.of('Hello Monads')
          .map(R.toUpper)
          .map(R.identity);

        expect(result._value).to.eql('HELLO MONADS');
      });

      it('should use MonadWrapper.join() to flatten nested structures of MWrappers', () => {
        const fortyTwo = monadwrap(42);
        const doubleWrappedFortyTwo = monadwrap(fortyTwo);
        const tripleWrappedFortyTwo = monadwrap(doubleWrappedFortyTwo);

        expect(tripleWrappedFortyTwo).to.be.instanceof(MonadWrapper);
        expect(tripleWrappedFortyTwo._value).to.be.instanceof(MonadWrapper);
        expect(tripleWrappedFortyTwo._value._value).to.be.instanceof(MonadWrapper);

        expect(tripleWrappedFortyTwo.join()._value).to.eql(42);
      });

      it('should use array flatten analogy', () => {
        const result = R.flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);

        expect(result).to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
      });
    });

    describe('5.3.2 Error handling with Maybe and Either monads', () => {
      describe('Just Monad', () => {
        describe('API', () => {
          describe('.of()', () => {
            it('should wrap value to Just type', () => {
              expect(Maybe.of(5)).to.be.instanceof(Just);
              expect(Maybe.of(5)).to.be.instanceof(Maybe);
            });

            it('should lift value to functor and retrieve with .value', () => {
              expect(Maybe.of(5).value).to.eql(5);
            });
          });

          describe('.just()', () => {
            it('should wrap value to Just type', () => {
              expect(Maybe.just(5)).to.be.instanceof(Just);
              expect(Maybe.just(5)).to.be.instanceof(Maybe);
            });

            it('should lift value to functor and retrieve with .value', () => {
              expect(Maybe.just(5).value).to.eql(5);
            });
          });

          describe('.fromNullable()', () => {
            it('should return Just if val is defined', () => {
              expect(Maybe.fromNullable('foo')).to.be.instanceof(Just);
            });

            it('should return Just with proper value if val is defined', () => {
              expect(Maybe.fromNullable('foo').value).to.eql('foo');
            });

            it('should return Nothing if val is not defined', () => {
              expect(Maybe.fromNullable(null)).to.be.instanceof(Nothing);
            });
          });

          describe('.isJust()', () => {
            it('should return true for Just instance', () => {
              expect(Maybe.just(5).isJust).to.be.true;
            });

            it('should return false for Nothing instance', () => {
              expect(Maybe.nothing().isJust).to.be.false;
            });
          });

          describe('.isNothing()', () => {
            it('should return true for Nothing instance', () => {
              expect(Maybe.nothing().isNothing).to.be.true;
            });

            it('should return false for Nothing instance', () => {
              expect(Maybe.just(5).isNothing).to.be.false;
            });
          });

          describe('.map()', () => {
            it('should return wrapped instance of value', () => {
              let result = Maybe.just(5)
                .map(val => val * val);

              expect(result).to.be.instanceof(Just);
            });

            it('should map value provided', () => {
              let result = Maybe.just(5)
                .map(val => val * val);

              expect(result.value).to.eql(25)
            });
          });

          describe('.getOrElse()', () => {
            it('should return always wrapped value', () => {
              let result = Maybe.just(5)
                .getOrElse(6);

              expect(result).to.eql(5);
            });

            it('should return wrapped value even if other is provided', () => {
              let result = Maybe.just(5)
                .getOrElse(6);

              expect(result).to.eql(5);
            });
          });

          describe('.filter()', () => {
            it('should return Nothing if filter function returned false', () => {
              let result = Maybe.just('hello')
                .filter(val => val !== 'hello');

              expect(result).to.be.instanceof(Nothing);
            });

            it('should return value if filter function returned true', () => {
              let result = Maybe.just('hello')
                .filter(val => val === 'hello');

              expect(result).to.be.instanceof(Just);
              expect(result.value).to.eql('hello');
            });
          });
        });
      });

      describe('Nothing Monad', () => {
        describe('API', () => {
          describe('.nothing()', () => {
            it('should return Nothing type', () => {
              expect(Maybe.nothing()).to.be.instanceof(Nothing);
            });

            it('should have value undefined', () => {
              expect(Maybe.nothing()._value).to.be.undefined;
            });

            it('should throw if tried to get value', () => {
              expect(function () {
                Maybe.nothing().value;
              }).to.throw();
            });
          });

          describe('.isJust()', () => {
            it('should return true for Just instance', () => {
              expect(Maybe.just(5).isJust).to.be.true;
            });

            it('should return false for Nothing instance', () => {
              expect(Maybe.nothing().isJust).to.be.false;
            });
          });

          describe('.isNothing()', () => {
            it('should return true for Nothing instance', () => {
              expect(Maybe.nothing().isNothing).to.be.true;
            });

            it('should return false for Nothing instance', () => {
              expect(Maybe.just(5).isNothing).to.be.false;
            });
          });

          describe('.map()', () => {
            it('should return (nothing) itself', () => {
              let nthg = Maybe.nothing();
              let result = nthg.map(R.identity);

              expect(result).to.equal(nthg);
            });
          });

          describe('.getOrElse()', () => {
            it('should return always other value', () => {
              let result = Maybe.nothing()
                .getOrElse(6);

              expect(result).to.eql(6);
            });
          });

          describe('.filter()', () => {
            it('should return undefined if filter function returned false', () => {
              let result = Maybe.nothing()
                .filter(R.identity);

              expect(result).to.be.undefined;
            });
          });
        });
      });

      describe('Using Maybe Monad (to prevent null checks and error handling)', () => {
        it('should return optional (Maybe.Nothing) from uncertain function', () => {
          const find = (id) => {
            return null;
          }

          const findStudent = (id) => {
            return Maybe.fromNullable(find(id))
          }

          expect(findStudent('5')).to.be.instanceof(Nothing);
        });

        it('should return optional (Maybe.Just) from uncertain function', () => {
          const find = (id) => {
            return 'student' + id;
          }

          const findStudent = (id) => {
            return Maybe.fromNullable(find(id))
          }

          expect(findStudent('2')).to.be.instanceof(Just);
          expect(findStudent('2').value).to.eql('student2');
        });

        it('should protect from nulls', () => {
          const find = (id) => {
            return null;
          }

          const findStudent = (id) => {
            return Maybe.fromNullable(find(id))
          }

          let result = findStudent('5').getOrElse('student other');

          expect(result).to.eql('student other');
        });

        it('should use in chains with optimistic find', () => {
          const find = (id) => {
            return {
              id: 5,
              name: 'piotr',
              school: {
                address: {
                  country: 'Poland'
                }
              }
            };
          }

          const safeFindStudent = (id) => {
            return Maybe.fromNullable(find(id))
          }

          const getCountry = (student) => student
            .map(R.prop('school'))
            .map(R.prop('address'))
            .map(R.prop('country'))
            .getOrElse('Country does not exist!');

          const countryFromStudent = R.compose(
            getCountry,
            safeFindStudent
          )

          let result = countryFromStudent('5');

          expect(result).to.eql('Poland');
        });

        it('should use in chains with pesimistic find', () => {
          const find = (id) => {
            return null;
          }

          const safeFindStudent = (id) => {
            return Maybe.fromNullable(find(id));
          }

          const getCountry = (student) => student
            .map(R.prop('school'))
            .map(R.prop('address'))
            .map(R.prop('country'))
            .getOrElse('Country does not exist!');

          const countryFromStudent = R.compose(
            getCountry,
            safeFindStudent
          )

          let result = countryFromStudent('5');

          expect(result).to.eql('Country does not exist!');
        });

        it('should use function lifting to make the function return Monad instead of its value', () => {
          const lift = R.curry(function (f, value) {
            return Maybe.fromNullable(value).map(f);
          });

          let r = lift((arg) => arg);

          expect(r(88)).to.be.instanceof(Just);
          expect(r(88).value).to.eql(88);

        });
      });

      describe('Using Either monad to recover from failure', () => {
        it('should use it to store error in case it occurs (more info about what happened)', () => {
          const find = (id) => {
            return null;
          }

          const findStudent = (id) => {
            if (id) {
              return Either.right(id);
            }
            return Either.left('Not found !')
          }

          let result = findStudent()
            .map(val => val * val);

          expect(result).to.be.instanceof(Left);
          expect(result.getOrElse('problem')).to.eql('problem')
        });
      });
    });
  });


  describe('5.4 Monadic chains and compositions', () => {
    it('should', () => {

    });
  });
});