import { expect } from 'chai';
import R from 'ramda';
import _ from 'lodash';
import Person from '../src/model/person';
import Address from '../src/model/address';
import { Tuple } from '../src/model/tuple';
import { curry2 } from '../src/model/curry2';
import { StringPair } from '../src/model/curry2';

describe('4 Toward modular, reusable code', () => {
  describe('4.2 Requirements for compatible functions', () => {
    describe('4.2.1 Type-compatible functions', () => {
      it('should build manual function pipeline', () => {
        // trim :: String -> String
        const trim = (str) => str.replace(/^\s*|\s*$/g, '');
        // normalize :: String -> String
        const normalize = (str) => str.replace(/\-/g, '');

        let result = normalize(trim(' 444-44-4444 ')); //-> '444444444'

        expect(result).to.eql('444444444');
      });
    });

    describe('4.2.2 Functions and arity: the case for tuples', () => {
      describe('Tuple data type', () => {
        it('should provide function', () => {
          let MyTuple = Tuple(Boolean, String);

          expect(MyTuple).to.be.a('function');
        });

        it('should not throw for defined values', () => {
          let MyTuple = Tuple(Boolean, String);

          expect(function () {
            let myTuple = new MyTuple(true, 'Success')
          }).not.to.throw();
        });

        it('should throw for null & undefined values', () => {
          let MyTuple = Tuple(Boolean, String);

          expect(function () {
            let myTuple = new MyTuple(null, undefined)
          }).to.throw();
        });

        it('should throw for incorrect arity with types & values', () => {
          let MyTuple = Tuple(Boolean, String);

          expect(function () {
            let myTuple = new MyTuple(true, 'success', 'too much')
          }).to.throw();
        });

        it('should access tuple values with underscore number property', () => {
          let MyTuple = Tuple(Boolean, String);
          let myTuple = new MyTuple(true, 'success')

          expect(myTuple._1).to.eql(true);
          expect(myTuple._2).to.eql('success');
        });

        it('should freeze access tuple values', () => {
          let MyTuple = Tuple(Boolean, String);
          let myTuple = new MyTuple(true, 'success')

          expect(function () {
            myTuple._1 = false;
          }).to.throw();
        });

        it('should provide .values() method to get array of values', () => {
          let MyTuple = Tuple(Boolean, String);
          let myTuple = new MyTuple(true, 'success')

          expect(myTuple.values()).to.eql([true, 'success']);
        });
      });

      describe('Using tuples', () => {
        it('should use tuples for isValid() function', () => {
          const Status = Tuple(Boolean, String);

          // trim :: String  -> String
          const trim = (str) => str.replace(/^\s*|\s*$/g, '');
          // normalize :: String  -> String
          const normalize = (str) => str.replace(/\-/g, '');

          // isValid :: String -> Status
          const isValid = function (str) {
            if (str.length === 0) {
              return new Status(false, 'Invald input. Expected non-empty value!');
            } else {
              return new Status(true, 'Success!');
            }
          }

          let result = isValid(normalize(trim('  444-44-4444 ')));

          expect(result.values()).to.eql([true, 'Success!']);

          expect(result._1).to.eql(true);
          expect(result._2).to.eql('Success!');

          let [isSuccessfull, validationInfo] = result.values();
          expect(isSuccessfull).to.eql(true);
          expect(validationInfo).to.eql('Success!');
        });
      });
    });
  });

  describe('4.3 Curried function evaluation', () => {
    it('.curry2() - should provide manual currying with two arguments', () => {
      const name = curry2(function (last, first) {
        return new StringPair(last, first);
      });

      expect(name('A')('B').values()).to.eql(['A', 'B']);

      let withLast = name('Curry');
      let withFirst = withLast('Haskell');

      expect(withLast).to.be.a('function');
      expect(withFirst).to.be.instanceof(StringPair);
      expect(withFirst.values()).to.eql(['Curry', 'Haskell']);
    });

    describe('4.3.1 Emulating function factories', () => {
      it('should emulate interfaces with currying', () => {
        const fetchStudentFromArray = R.curry(function (arr, ssn) {
          return `${arr} ${ssn}`
        });

        const fetchStudentFromObj = R.curry(function (obj, ssn) {
          return `${obj} ${ssn}`;
        });

        const studentFactoryFinder = function (useObj) {
          if (useObj) {
            return fetchStudentFromObj('object')
          } else {
            return fetchStudentFromArray('array')
          }
        }

        let finder = studentFactoryFinder(true);
        expect(finder('piotr')).to.eql('object piotr');

        finder = studentFactoryFinder(false);
        expect(finder('andrzej')).to.eql('array andrzej');
      });
    });
  });
  describe('4.4 Partial application and parameter binding', () => {

    describe('Partial Application', () => {
      it('should use partial application (all arguments not provided will be set to undefined as opposed to currying where function is called when all params are provided)', () => {
        const add = function (a, b, c) {
          return a + b + c;
        }

        const addTo5And3 = _.partial(add, '5', '3');

        expect(addTo5And3('2')).to.eql('532');
        expect(addTo5And3()).to.eql('53undefined');
      });

      it('should use partial with placeholder', () => {
        const add = function (a, b, c) {
          return a + b + c;
        }

        const addTo5And3 = _.partial(add, _, '5', '3');

        expect(addTo5And3('2')).to.eql('253');
      });
    });

    describe('Binding', () => {
      it('should use partial application and provide this object context', () => {
        function greet(greeting, punctuation) {
          return greeting + ' ' + this.user + punctuation;
        }

        var object = { 'user': 'fred' };

        var bound = _.bind(greet, object, 'hi');

        expect(bound('!')).to.eql('hi fred!')
      });

      it('should use partial application with placeholder and provide this object context', () => {
        function greet(greeting, punctuation) {
          return greeting + ' ' + this.user + punctuation;
        }

        var object = { 'user': 'fred' };

        var bound = _.bind(greet, object, _, '!');

        expect(bound('hi')).to.eql('hi fred!')
      });
    });
  });

  describe('4.5 Composing function pipelines', () => {
    describe('4.5.x ', () => {
      it('should ..', () => {

      });
    });
  });
});