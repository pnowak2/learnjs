import { expect } from 'chai';
import R from 'ramda';
import _ from 'lodash';
import Person from '../src/model/person';
import Address from '../src/model/address';
import { Tuple } from '../src/model/tuple';

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
    let StringPair = Tuple(String, String);

    it('.curry2() - should provide manual currying with two arguments', () => {
      
    });
  });
});