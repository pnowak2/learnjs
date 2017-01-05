import { expect } from 'chai';
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
      it('should..', () => {

      });
    });
  });
});