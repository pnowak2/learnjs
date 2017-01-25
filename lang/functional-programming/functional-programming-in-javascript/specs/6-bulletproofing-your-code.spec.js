import { expect } from 'chai';
import R from 'ramda';
import _ from 'lodash';
import sinon from 'sinon';
import JSC from 'jscheck';

describe('6 Bulletproofing your code', () => {
  describe('6.3', () => {
    describe('6.3.2 Focusing on business logic instead of control flow', () => {
      const fork = function (join, func1, func2) {
        return function (val) {
          return join(func1(val), func2(val));
        };
      };

      const toLetterGrade = function (grade) {
        if (grade >= 90) return 'A';
        if (grade >= 80) return 'B';
        if (grade >= 70) return 'C';
        if (grade >= 60) return 'D';
        return 'F';
      };

      const computeAverageGrade =
        R.compose(toLetterGrade, fork(R.divide, R.sum, R.length));

      it('.toLetterGrade()', () => {
        expect(toLetterGrade(90)).to.eql('A');
        expect(toLetterGrade(80)).to.eql('B');
        expect(toLetterGrade(70)).to.eql('C');
        expect(toLetterGrade(60)).to.eql('D');
      });

      it('.computeAverageGrade()', () => {
        expect(computeAverageGrade([100, 50, 60])).to.eql('C');
      });

      it('.fork()', () => {
        const timesTwo = fork(x => x + x, R.identity, R.identity);

        expect(timesTwo(2)).to.eql(4);
        expect(timesTwo(9)).to.eql(18);
      });
    });

    describe('6.3.4 Mocking external dependencies', () => {
      let mock;

      beforeEach(() => {
        mock = sinon.mock(console)
      });

      afterEach(() => {
        mock.verify();
        mock.restore();
      });

      it('should mock dependencies', () => {
        mock.expects('log').withArgs('hello').once().returns(55);
        let result = console.log('hello');

        expect(result).to.eql(55);
      });
    });
  });

  describe('6.4 Capturing specifications with property-based testing', () => {
    describe('6.4.0 JSCheck', () => {
      const fork = function (join, func1, func2) {
        return function (val) {
          return join(func1(val), func2(val));
        };
      };

      const toLetterGrade = function (grade) {
        if (grade >= 90) return 'A';
        if (grade >= 80) return 'B';
        if (grade >= 70) return 'C';
        if (grade >= 60) return 'D';
        return 'F';
      };

      const computeAverageGrade =
        R.compose(toLetterGrade, fork(R.divide, R.sum, R.length));

      beforeEach(() => {
        JSC.clear();
        // JSC.on_report((str) => console.log(str));
      });

      it('should use multiple values as input according to specification', () => {

        JSC.on_pass((object) => {
          // expect(object.pass).to.eql(true);
          console.log('pass')
        });

        JSC.on_fail((object) => {
          expect(object.pass).to.eql(true);
          throw new Error('fd');
        });
          
        JSC.test(
          'Compute Average Grade',
          function (verdict, grades, expected) {
            return verdict(computeAverageGrade(grades) === expected);
          },
          [
            JSC.array(JSC.integer(20), JSC.number(90, 100)), 'B'
          ],
          function (grades, grade) {
            return 'Testing for an ' + grade + ' on grades: ' + grades;
          }
        );
      });
    });
  });
});